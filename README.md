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

## Matériel utilisé

- ESP32 DevKit ;
- capteur DHT22 ;
- câbles Dupont ;
- câble USB pour programmer et alimenter l'ESP32 ;
- ordinateur qui exécute Mosquitto, le backend FastAPI et le frontend React ;
- réseau Wi-Fi local commun entre l'ESP32 et l'ordinateur.

## Branchement ESP32 / DHT22

Le code Arduino utilise le pin `GPIO 4` pour lire le capteur DHT22 :

```cpp
#define DHTPIN 4
#define DHTTYPE DHT22
```

Branchement recommandé :

| DHT22 | ESP32 |
| --- | --- |
| VCC / + | 3V3 |
| DATA / OUT | GPIO 4 |
| GND / - | GND |

Si le DHT22 est un capteur nu à 4 broches, ajouter une résistance de tirage d'environ `10 kΩ` entre `DATA` et `VCC`. Si le DHT22 est un module prêt à l'emploi à 3 broches, cette résistance est généralement déjà intégrée.

## Ordre de lancement

1. Brancher le DHT22 à l'ESP32 selon le tableau ci-dessus.
2. Modifier dans le code Arduino le nom Wi-Fi, le mot de passe et l'adresse IP du PC :

```cpp
const char* ssid = "VOTRE_WIFI";
const char* password = "VOTRE_MOT_DE_PASSE";
const char* mqttServer = "ADRESSE_IP_DU_PC";
```

3. Lancer Mosquitto sur le PC.
4. Lancer le backend FastAPI sur le port `8001`.
5. Lancer le frontend React.
6. Uploader le code dans l'ESP32.
7. Ouvrir le moniteur série à `115200 bauds` pour vérifier l'envoi des scénarios.

L'ESP32 publie les messages sur le topic MQTT :

```text
pfe/mqtt/trafic
```

Le backend s'abonne à ce topic, applique la logique de détection et envoie les résultats au dashboard React via WebSocket.

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
