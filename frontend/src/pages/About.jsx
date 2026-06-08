import Header from "../components/Header";
import {
  FiGithub,
  FiMail,
  FiUser,
  FiBook,
  FiServer,
  FiCpu,
  FiWifi,
  FiDatabase,
} from "react-icons/fi";

const technologies = [
  { nom: "Python", desc: "Backend & ML", color: "#ffb300", icon: "🐍" },
  { nom: "FastAPI", desc: "API REST", color: "#00e5a0", icon: "⚡" },
  { nom: "React", desc: "Frontend", color: "#4d9fff", icon: "⚛️" },
  { nom: "XGBoost", desc: "ML · 94.2%", color: "#ff3b5c", icon: "🏆" },
  { nom: "TensorFlow", desc: "Deep Learning", color: "#c44dff", icon: "🧠" },
  { nom: "MQTT", desc: "IoT Protocol", color: "#ff8c42", icon: "📡" },
  { nom: "Mosquitto", desc: "MQTT Broker", color: "#00d4ff", icon: "🦟" },
  { nom: "ESP32", desc: "Microcontrôleur", color: "#00e5a0", icon: "🔌" },
];

const stats = [
  { label: "Paquets Dataset", value: "231,646", color: "#00e5a0" },
  { label: "Classes", value: "6", color: "#4d9fff" },
  { label: "Features", value: "33", color: "#ffb300" },
  { label: "Accuracy", value: "94.2%", color: "#ff3b5c" },
];

const timeline = [
  { etape: "Étude bibliographique", desc: "Recherche sur IoT, MQTT et ML", color: "#4d9fff" },
  { etape: "Collecte des données", desc: "Dataset MQTTset · 231,646 paquets", color: "#00e5a0" },
  { etape: "Entraînement ML", desc: "Random Forest, XGBoost, Autoencoder", color: "#ffb300" },
  { etape: "Développement Backend", desc: "FastAPI + MQTT + WebSocket", color: "#c44dff" },
  { etape: "Développement Frontend", desc: "Dashboard React temps réel", color: "#ff3b5c" },
  { etape: "Intégration ESP32", desc: "Hardware IoT + DHT22", color: "#ff8c42" },
];

function About() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="p-6">
        {/* TITRE */}
        <div className="flex items-center gap-3 mb-6">
          <FiBook className="text-green-400" size={24} />
          <div>
            <h2 className="text-white font-bold text-xl">À Propos du Projet</h2>
            <p className="text-gray-500 text-xs font-mono mt-1">
              Projet de Fin d'Études · 2025/2026
            </p>
          </div>
        </div>

        {/* DESCRIPTION + ARCHITECTURE */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* DESCRIPTION */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <h3 className="text-cyan-400 text-xs font-mono tracking-widest mb-4">
              📋 DESCRIPTION DU PROJET
            </h3>
            <h4 className="text-white font-bold text-lg mb-2">MQTT-IDS</h4>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Système de détection d'intrusions IoT basé sur le protocole MQTT. Utilise le Machine
              Learning et le Deep Learning pour détecter les anomalies en temps réel dans le trafic
              réseau IoT.
            </p>
            <div className="bg-gray-800 rounded-lg p-3">
              <p className="text-xs font-mono text-gray-400">
                🎯 <span className="text-cyan-400">Objectif :</span> Détecter les attaques DOS,
                Flood, Bruteforce, Slowite et Malformed dans le trafic MQTT
              </p>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3">
              {[
                {
                  title: "Surveillance",
                  value: "Temps réel",
                  desc: "Suivi continu des messages MQTT",
                  color: "text-green-400",
                },
                {
                  title: "Analyse",
                  value: "ML + DL",
                  desc: "XGBoost et Autoencoder combinés",
                  color: "text-purple-400",
                },
                {
                  title: "Décision",
                  value: "Alertes",
                  desc: "Classification lisible des anomalies",
                  color: "text-cyan-400",
                },
              ].map((item) => (
                <div key={item.title} className="rounded-lg border border-gray-700 bg-gray-950/50 p-3">
                  <p className="text-[10px] uppercase tracking-widest text-gray-500">{item.title}</p>
                  <p className={`mt-1 text-sm font-bold ${item.color}`}>{item.value}</p>
                  <p className="mt-1 text-[11px] leading-snug text-gray-400">{item.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-lg border border-cyan-400/20 bg-cyan-400/10 p-3">
              <p className="text-xs leading-relaxed text-gray-300">
                <span className="font-bold text-cyan-400">Valeur ajoutée :</span> transformer le
                trafic MQTT brut en indicateurs de sécurité exploitables, afin d'aider
                l'administrateur à identifier rapidement les comportements anormaux dans un
                environnement IoT.
              </p>
            </div>
          </div>

          {/* ARCHITECTURE */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <h3 className="text-cyan-400 text-xs font-mono tracking-widest mb-4">
              🏗️ ARCHITECTURE DU SYSTÈME
            </h3>
            <div className="flex flex-col gap-3">
              {[
                {
                  icon: <FiWifi size={16} />,
                  label: "ESP32 + DHT22",
                  desc: "Capteur IoT",
                  color: "#00e5a0",
                },
                {
                  icon: "📡",
                  label: "Mosquitto Broker",
                  desc: "MQTT localhost:1883",
                  color: "#ffb300",
                },
                {
                  icon: <FiServer size={16} />,
                  label: "FastAPI Backend",
                  desc: "API REST + WebSocket",
                  color: "#4d9fff",
                },
                {
                  icon: <FiCpu size={16} />,
                  label: "XGBoost + Autoencoder",
                  desc: "Prédiction ML/DL",
                  color: "#c44dff",
                },
                {
                  icon: "⚛️",
                  label: "React Dashboard",
                  desc: "Interface temps réel",
                  color: "#ff3b5c",
                },
              ].map((item, i, arr) => (
                <div key={i}>
                  <div
                    className="flex items-center gap-3 p-2 rounded-lg"
                    style={{
                      backgroundColor: item.color + "15",
                      border: `1px solid ${item.color}30`,
                    }}
                  >
                    <span style={{ color: item.color }}>{item.icon}</span>
                    <div>
                      <p className="text-xs font-bold text-white">{item.label}</p>
                      <p className="text-xs text-gray-500 font-mono">{item.desc}</p>
                    </div>
                  </div>
                  {i < arr.length - 1 && (
                    <div className="flex justify-center">
                      <span className="text-gray-600 text-lg">↓</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* STATS DATASET */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 mb-6">
          <h3 className="text-cyan-400 text-xs font-mono tracking-widest mb-4">
            <FiDatabase className="inline mr-2" size={14} />
            DATASET · MQTTset
          </h3>
          <div className="grid grid-cols-4 gap-4">
            {stats.map((s, i) => (
              <div key={i} className="text-center p-4 rounded-lg bg-gray-800">
                <p className="text-3xl font-bold mb-1" style={{ color: s.color }}>
                  {s.value}
                </p>
                <p className="text-xs text-gray-500 font-mono">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* TECHNOLOGIES + TIMELINE */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* TECHNOLOGIES */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <h3 className="text-cyan-400 text-xs font-mono tracking-widest mb-4">
              🛠️ TECHNOLOGIES UTILISÉES
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {technologies.map((tech, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-gray-800">
                  <span className="text-xl">{tech.icon}</span>
                  <div>
                    <p className="text-sm font-bold" style={{ color: tech.color }}>
                      {tech.nom}
                    </p>
                    <p className="text-xs text-gray-500 font-mono">{tech.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* TIMELINE */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <h3 className="text-cyan-400 text-xs font-mono tracking-widest mb-4">
              📅 TIMELINE DU PROJET
            </h3>
            <div className="flex flex-col gap-3">
              {timeline.map((t, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="flex flex-col items-center">
                    <div
                      className="w-3 h-3 rounded-full mt-1"
                      style={{ backgroundColor: t.color }}
                    />
                    {i < timeline.length - 1 && (
                      <div className="w-0.5 h-6 mt-1" style={{ backgroundColor: t.color + "40" }} />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">{t.etape}</p>
                    <p className="text-xs text-gray-500 font-mono">{t.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ÉQUIPE */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
          <h3 className="text-cyan-400 text-xs font-mono tracking-widest mb-4">👥 ÉQUIPE</h3>
          <div className="grid grid-cols-3 gap-4">
            {/* ÉTUDIANT 1 */}
            <div className="text-center p-4 bg-gray-800 rounded-xl border border-cyan-500/20">
              <div className="w-16 h-16 rounded-full bg-cyan-500/20 flex items-center justify-center mx-auto mb-3">
                <FiUser className="text-cyan-400" size={28} />
              </div>
              <p className="text-white font-bold">Ilyas Najim</p>
              <p className="text-cyan-400 text-xs font-mono mt-1">Étudiant</p>
              <p className="text-gray-500 text-xs font-mono mt-1">IATE · 2025/2026</p>
            </div>

            {/* ÉTUDIANT 2 */}
            <div className="text-center p-4 bg-gray-800 rounded-xl border border-blue-500/20">
              <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-3">
                <FiUser className="text-blue-400" size={28} />
              </div>
              <p className="text-white font-bold">Mohamed Fettache</p>
              <p className="text-blue-400 text-xs font-mono mt-1">Étudiant</p>
              <p className="text-gray-500 text-xs font-mono mt-1">IATE · 2025/2026</p>
            </div>

            {/* ENCADRANT */}
            <div className="text-center p-4 bg-gray-800 rounded-xl border border-yellow-500/20">
              <div className="w-16 h-16 rounded-full bg-yellow-500/20 flex items-center justify-center mx-auto mb-3">
                <FiBook className="text-yellow-400" size={28} />
              </div>
              <p className="text-white font-bold">Mme. Fatna EL Mendili</p>
              <p className="text-yellow-400 text-xs font-mono mt-1">Encadrante</p>
              <p className="text-gray-500 text-xs font-mono mt-1">EST Meknès</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
