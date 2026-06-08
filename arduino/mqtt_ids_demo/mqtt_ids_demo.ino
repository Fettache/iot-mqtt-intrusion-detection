#include <WiFi.h>
#include <PubSubClient.h>
#include <DHT.h>

#define DHTPIN 4
#define DHTTYPE DHT22

const char* ssid = "VOTRE_WIFI";
const char* password = "VOTRE_MOT_DE_PASSE";
const char* mqttServer = "ADRESSE_IP_DU_PC";
const int mqttPort = 1883;
const char* topic = "pfe/mqtt/trafic";

WiFiClient espClient;
PubSubClient client(espClient);
DHT dht(DHTPIN, DHTTYPE);

struct Scenario {
  const char* label;
  const char* payload;
};

Scenario scenarios[] = {
  {"legitimate", "{\"demo_label\":\"legitimate\",\"mqtt.msg\":\"temperature\",\"temperature\":24.7,\"humidity\":51.2}"},
  {"dos", "{\"demo_label\":\"dos\",\"mqtt.msg\":\"attack\",\"scenario\":\"Attaque DoS MQTT\"}"},
  {"flood", "{\"demo_label\":\"flood\",\"mqtt.msg\":\"flood-burst\",\"scenario\":\"Flood MQTT\"}"},
  {"bruteforce", "{\"demo_label\":\"bruteforce\",\"mqtt.msg\":\"connect\",\"mqtt.conflags\":\"0xc2\",\"scenario\":\"Bruteforce connexion\"}"},
  {"slowite", "{\"demo_label\":\"slowite\",\"mqtt.msg\":\"slow\",\"scenario\":\"SlowITe connexion lente\"}"},
  {"malformed", "{\"demo_label\":\"malformed\",\"mqtt.msg\":\"invalid\",\"mqtt.protoname\":\"invalid\",\"scenario\":\"Paquet MQTT malforme\"}"},
  {"anomalie_inconnue", "{\"demo_label\":\"anomalie_inconnue\",\"mqtt.msg\":\"unknown-pattern\",\"mqtt.protoname\":\"unknown\",\"scenario\":\"Anomalie inconnue\"}"}
};

void connectWifi() {
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
  }
}

void connectMqtt() {
  while (!client.connected()) {
    client.connect("esp32-mqtt-ids-demo");
    delay(500);
  }
}

void setup() {
  Serial.begin(115200);
  dht.begin();
  connectWifi();
  client.setServer(mqttServer, mqttPort);
  connectMqtt();
}

void loop() {
  if (!client.connected()) {
    connectMqtt();
  }
  client.loop();

  for (int i = 0; i < 7; i++) {
    client.publish(topic, scenarios[i].payload);
    Serial.print("Scenario envoye: ");
    Serial.println(scenarios[i].label);
    delay(2500);
  }
}
