# MQTT-IDS

MQTT-IDS est une plateforme de détection d'intrusions pour un environnement IoT basé sur le protocole MQTT. Le projet combine un ESP32 avec capteur DHT22, un broker Mosquitto, un backend FastAPI, des modèles de Machine Learning / Deep Learning et une interface React de supervision en temps réel.

## Architecture

```text
ESP32 / DHT22
    -> Mosquitto Broker
        -> Backend FastAPI
            -> XGBoost + Autoencoder
                -> Dashboard React via WebSocket
```

## Fonctionnalités

- publication de messages MQTT depuis ESP32 ;
- simulation de 7 scénarios : legitimate, DoS, Flood, Bruteforce, SlowITe, Malformed et anomalie inconnue ;
- réception des messages MQTT dans FastAPI ;
- classification avec XGBoost et vérification d'anomalie avec Autoencoder ;
- diffusion temps réel des résultats avec WebSocket ;
- tableau de bord React avec statistiques, anomalies et page modèles.

## Structure du projet

```text
backend/      API FastAPI, client MQTT et moteur de prédiction
frontend/     Interface React / Vite
arduino/      Code ESP32 de démonstration
models/       Modèles entraînés et objets de prétraitement
dataset/      Note de récupération du dataset
notebooks/    Expérimentations ML/DL
scripts/      Scripts utiles au projet
tools/        Outils de démonstration et génération documentaire
```

## Prérequis

- Python 3.13 ou version compatible ;
- Node.js et npm ;
- Mosquitto Broker ;
- Arduino IDE avec les bibliothèques `WiFi`, `PubSubClient` et `DHT`.

## Installation du backend

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
```

Lancer l'API :

```bash
uvicorn main:app --reload --app-dir . --port 8001
```

## Installation du frontend

```bash
cd frontend
npm install
npm run dev
```

Interface par défaut :

```text
http://localhost:5173
```

## Lancer Mosquitto

Exemple sous Windows :

```bash
cd "C:\Program Files\mosquitto"
mosquitto -v -c mosquitto.conf
```

Le broker doit écouter sur le port MQTT `1883`.

## Code Arduino

Avant l'upload vers l'ESP32, modifier dans `arduino/mqtt_ids_demo/mqtt_ids_demo.ino` :

```cpp
const char* ssid = "VOTRE_WIFI";
const char* password = "VOTRE_MOT_DE_PASSE";
const char* mqttServer = "ADRESSE_IP_DU_PC";
```

L'adresse IP doit être celle du PC qui exécute Mosquitto.

## Dataset

Le dataset complet n'est pas versionné dans GitHub car il contient des fichiers volumineux. Voir `dataset/README.md`.

## Rapport

Le rapport final du projet est disponible ici : [`docs/rapport-pfe.pdf`](docs/rapport-pfe.pdf).

## Auteurs

- Mohamed Fettache
- Ilyas Najim
