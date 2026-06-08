import paho.mqtt.client as mqtt
import json
import pandas as pd

BROKER = "localhost"
PORT = 1883
TOPIC = "pfe/mqtt/trafic"

df = pd.read_csv(r"C:\PFE\dataset\Data\FINAL_CSV\train70_reduced.csv", 
                 low_memory=False, nrows=5000)

# Essaie avec flood au lieu de dos
df_flood = df[df['target'] == 'flood'].iloc[0]
ligne = df_flood.drop(['target']).to_dict()

client = mqtt.Client(mqtt.CallbackAPIVersion.VERSION2)
client.connect(BROKER, PORT)

message = json.dumps(ligne)
client.publish(TOPIC, message)
print(f" Message envoyé !")
print(f"Classe réelle : {df_flood['target']}")

client.disconnect()