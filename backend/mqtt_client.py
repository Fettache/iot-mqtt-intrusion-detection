import paho.mqtt.client as mqtt
import json
from predict import predict_anomalie

BROKER = "localhost"
PORT = 1883
TOPIC = "pfe/mqtt/trafic"

def on_connect(client, userdata, flags, rc, properties=None):
    print(f"Connecté au broker MQTT !")
    client.subscribe(TOPIC)
    print(f" En écoute sur : {TOPIC}")

def on_message(client, userdata, msg):
    message = msg.payload.decode()
    print(f" Message reçu : {message}")
    
    try:
        data = json.loads(message)
        resultat = predict_anomalie(data)

        if resultat == "legitimate":
            print(f"Trafic Normal")
        else:
            print(f"Anomalie détectée : {resultat}")
            
    except json.JSONDecodeError:
        print(f"Message pas JSON, ignoré !")
    except Exception as e:
        print(f" Erreur : {e}")

client = mqtt.Client(mqtt.CallbackAPIVersion.VERSION2)
client.on_connect = on_connect
client.on_message = on_message
client.connect(BROKER, PORT)
client.loop_forever()