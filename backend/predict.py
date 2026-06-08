import pickle
from pathlib import Path

import numpy as np

MODELS_DIR = Path(__file__).resolve().parents[1] / "models"

xgb_model = None
autoencoder = None
threshold = None
scaler = None
le = None
models_error = None

colonnes_texte = {"mqtt.msg", "mqtt.protoname"}
colonnes_hex = {"tcp.flags", "mqtt.conack.flags", "mqtt.conflags", "mqtt.hdrflags"}


def to_number(value, default=0.0):
    if value is None or value == "":
        return default

    if isinstance(value, (int, float, np.integer, np.floating)):
        return float(value)

    text = str(value).strip()

    try:
        if text.lower().startswith("0x"):
            return float(int(text, 16))
        return float(text)
    except ValueError:
        return default


def prepare_features(data_dict):
    data = dict(data_dict)
    feature_names = list(getattr(scaler, "feature_names_in_", []))
    is_partial = bool(feature_names) and len(set(feature_names) - set(data.keys())) > 0

    conack_flags = int(to_number(data.get("mqtt.conack.flags"), 0))
    conflags = int(to_number(data.get("mqtt.conflags"), 0))
    hdrflags = int(to_number(data.get("mqtt.hdrflags"), 0))

    defaults = {
        "mqtt.conack.flags.reserved": conack_flags >> 1,
        "mqtt.conack.flags.sp": conack_flags & 1,
        "mqtt.conflag.cleansess": (conflags >> 1) & 1,
        "mqtt.conflag.passwd": (conflags >> 6) & 1,
        "mqtt.conflag.qos": (conflags >> 3) & 3,
        "mqtt.conflag.reserved": conflags & 1,
        "mqtt.conflag.retain": (conflags >> 5) & 1,
        "mqtt.conflag.uname": (conflags >> 7) & 1,
        "mqtt.conflag.willflag": (conflags >> 2) & 1,
        "mqtt.dupflag": (hdrflags >> 3) & 1,
        "mqtt.willmsg": 0,
        "mqtt.willmsg_len": 0,
        "mqtt.willtopic": 0,
        "mqtt.willtopic_len": 0,
    }

    if not feature_names:
        feature_names = list(data.keys())

    values = []
    scaler_means = getattr(scaler, "mean_", [])
    for index, name in enumerate(feature_names):
        if name in data:
            raw_value = data[name]
        elif name in defaults:
            raw_value = defaults[name]
        elif len(scaler_means) > index:
            raw_value = scaler_means[index]
        else:
            raw_value = 0

        if name in colonnes_texte:
            values.append(0.0)
        elif name in colonnes_hex:
            values.append(to_number(raw_value))
        else:
            values.append(to_number(raw_value))

    return values, is_partial


def charger_modeles():
    global xgb_model, autoencoder, threshold, scaler, le, models_error

    try:
        import tensorflow as tf

        with open(MODELS_DIR / "xgb_model.pkl", "rb") as f:
            xgb_model = pickle.load(f)

        autoencoder = tf.keras.models.load_model(MODELS_DIR / "autoencoder.keras")

        with open(MODELS_DIR / "autoencoder_threshold.pkl", "rb") as f:
            threshold = pickle.load(f)

        with open(MODELS_DIR / "scaler.pkl", "rb") as f:
            scaler = pickle.load(f)

        with open(MODELS_DIR / "label_encoder.pkl", "rb") as f:
            le = pickle.load(f)

        models_error = None
        print("Modeles charges avec succes !")
    except Exception as e:
        models_error = e
        print(f"Modeles non charges : {e}")


charger_modeles()


def predict_anomalie(data_dict):
    try:
        if models_error is not None:
            print(f"Prediction impossible, modeles non charges : {models_error}")
            return "erreur_modeles_non_charges"

        valeurs, is_partial = prepare_features(data_dict)
        data_scaled = scaler.transform([valeurs])

        xgb_pred = xgb_model.predict(data_scaled)
        xgb_label = le.inverse_transform(xgb_pred)[0]

        print(f"Prediction XGBoost : {xgb_label}")

        if xgb_label == "legitimate" and not is_partial:
            reconstruction = autoencoder.predict(data_scaled, verbose=0)
            mse = float(np.mean(np.power(data_scaled - reconstruction, 2)))
            print(f"MSE Autoencoder : {mse}")
            if mse > threshold:
                return "anomalie_inconnue"

        return xgb_label

    except Exception:
        import traceback

        traceback.print_exc()
        return "erreur"
