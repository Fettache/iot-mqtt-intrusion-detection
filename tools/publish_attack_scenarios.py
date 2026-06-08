import json
import time

import paho.mqtt.client as mqtt


BROKER = "localhost"
PORT = 1883
TOPIC = "pfe/mqtt/trafic"

SCENARIOS = [
    {
        "demo_label": "legitimate",
        "mqtt.msg": "temperature",
        "temperature": 24.7,
        "humidity": 51.2,
        "scenario": "Trafic normal capteur DHT22",
    },
    {"demo_label": "dos", "mqtt.msg": "attack", "scenario": "Attaque DoS MQTT"},
    {"demo_label": "flood", "mqtt.msg": "flood-burst", "scenario": "Flood MQTT"},
    {
        "demo_label": "bruteforce",
        "mqtt.msg": "connect",
        "mqtt.conflags": "0xc2",
        "scenario": "Bruteforce connexion",
    },
    {"demo_label": "slowite", "mqtt.msg": "slow", "scenario": "SlowITe connexion lente"},
    {
        "demo_label": "malformed",
        "mqtt.msg": "invalid",
        "mqtt.protoname": "invalid",
        "scenario": "Paquet MQTT malforme",
    },
    {
        "demo_label": "anomalie_inconnue",
        "mqtt.msg": "unknown-pattern",
        "mqtt.protoname": "unknown",
        "scenario": "Anomalie inconnue",
    },
]


def main():
    client = mqtt.Client(mqtt.CallbackAPIVersion.VERSION2)
    client.connect(BROKER, PORT)
    client.loop_start()
    try:
        for scenario in SCENARIOS:
            client.publish(TOPIC, json.dumps(scenario), qos=0)
            print(f"scenario envoye: {scenario['demo_label']}")
            time.sleep(0.8)
    finally:
        client.loop_stop()
        client.disconnect()


if __name__ == "__main__":
    main()
