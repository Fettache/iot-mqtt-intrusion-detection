from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware
import paho.mqtt.client as mqtt
import json
import asyncio
from datetime import datetime, timezone
from predict import predict_anomalie

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

clients = []
BROKER = "localhost"
PORT = 1883
TOPIC = "pfe/mqtt/trafic"
resultats = []

DEMO_LABELS = {
    "legitimate",
    "dos",
    "flood",
    "bruteforce",
    "slowite",
    "malformed",
    "anomalie_inconnue",
}

DEMO_ALIASES = {
    "normal": "legitimate",
    "legitime": "legitimate",
    "inconnue": "anomalie_inconnue",
    "unknown": "anomalie_inconnue",
    "unknown_attack": "anomalie_inconnue",
}


def normalize_demo_label(value):
    if value is None:
        return None

    label = str(value).strip().lower().replace("-", "_").replace(" ", "_")
    label = DEMO_ALIASES.get(label, label)
    return label if label in DEMO_LABELS else None


def detect_demo_label(data):
    for key in ("demo_label", "attack_type", "mode_label", "label", "resultat"):
        label = normalize_demo_label(data.get(key))
        if label:
            return label

    mqtt_msg = str(data.get("mqtt.msg", "")).strip().lower()
    mqtt_protoname = str(data.get("mqtt.protoname", "")).strip().lower()
    mqtt_conflags = str(data.get("mqtt.conflags", "")).strip().lower()

    if mqtt_msg == "temperature":
        return "legitimate"
    if mqtt_msg == "attack":
        return "dos"
    if "flood" in mqtt_msg:
        return "flood"
    if mqtt_msg == "connect" and mqtt_conflags == "0xc2":
        return "bruteforce"
    if mqtt_msg == "slow":
        return "slowite"
    if mqtt_msg == "invalid" or mqtt_protoname == "invalid":
        return "malformed"
    if "unknown" in mqtt_msg or mqtt_protoname == "unknown":
        return "anomalie_inconnue"

    return None


def build_response(data, raw_message):
    keys = set(data.keys())

    if {"temperature", "humidity"}.issubset(keys) and len(keys) <= 3:
        temperature = float(data["temperature"])
        humidity = float(data["humidity"])
        anomalie = temperature < -10 or temperature > 60 or humidity < 0 or humidity > 100
        return {
            "resultat": "iot_sensor",
            "anomalie": anomalie,
            "data": raw_message,
            "temperature": temperature,
            "humidity": humidity,
            "timestamp": datetime.now(timezone.utc).isoformat()
        }

    demo_label = detect_demo_label(data)
    if demo_label:
        return {
            "resultat": demo_label,
            "anomalie": demo_label != "legitimate",
            "data": raw_message,
            "source": "arduino_demo",
            "timestamp": datetime.now(timezone.utc).isoformat()
        }

    resultat = predict_anomalie(data)
    return {
        "resultat": resultat,
        "anomalie": resultat != "legitimate",
        "data": raw_message,
        "timestamp": datetime.now(timezone.utc).isoformat()
    }

def on_connect(client, userdata, flags, rc, properties=None):
    print("MQTT Connecté !")
    client.subscribe(TOPIC)

def on_message(client, userdata, msg):
    message = msg.payload.decode()
    try:
        data = json.loads(message)
        reponse = build_response(data, message)

        resultats.append(reponse)
        print(f"{'Anomalie' if reponse['anomalie'] else 'Normal'} : {reponse['resultat']}")

    except Exception as e:
        print(f"Erreur : {e}")

mqtt_client = mqtt.Client(mqtt.CallbackAPIVersion.VERSION2)
mqtt_client.on_connect = on_connect
mqtt_client.on_message = on_message
mqtt_client.connect(BROKER, PORT)
mqtt_client.loop_start()

@app.get("/")
def home():
    return {"message": "✅ API FastAPI fonctionne !"}

@app.get("/resultats")
def get_resultats():
    return {"resultats": resultats[-10:]}

@app.post("/resultats/clear")
def clear_resultats():
    resultats.clear()
    return {"message": "resultats effaces", "resultats": []}

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    clients.append(websocket)
    last_sent_index = max(0, len(resultats) - 10)
    try:
        while True:
            if len(resultats) > last_sent_index:
                for item in resultats[last_sent_index:]:
                    await websocket.send_json(item)
                last_sent_index = len(resultats)
            await asyncio.sleep(0.5)
    except:
        if websocket in clients:
            clients.remove(websocket)
