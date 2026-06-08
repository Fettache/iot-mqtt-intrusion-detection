import Header from "../components/Header";
import { FiCpu, FiAward, FiZap, FiActivity } from "react-icons/fi";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  Legend,
} from "recharts";

const modeles = [
  {
    nom: "Random Forest",
    accuracy: 94.03,
    temps: "30 sec",
    type: "Supervisé",
    color: "#4d9fff",
    icon: "🌲",
    description: "Ensemble d'arbres de décision",
  },
  {
    nom: "XGBoost",
    accuracy: 94.2,
    temps: "8 sec",
    type: "Supervisé",
    color: "#00e5a0",
    icon: "🏆",
    description: "Gradient Boosting optimisé · Meilleur modèle",
  },
  {
    nom: "Autoencoder",
    accuracy: 85.18,
    temps: "94 sec",
    type: "Non Supervisé",
    color: "#c44dff",
    icon: "🧠",
    description: "Deep Learning · Détecte anomalies inconnues",
  },
];

const compareData = [
  { name: "Random Forest", accuracy: 94.03, color: "#4d9fff" },
  { name: "XGBoost", accuracy: 94.2, color: "#00e5a0" },
  { name: "Autoencoder", accuracy: 85.18, color: "#c44dff" },
];

const radarData = [
  { metric: "Precision", RF: 93, XGB: 94, AE: 89 },
  { metric: "Recall", RF: 94, XGB: 94, AE: 85 },
  { metric: "F1-Score", RF: 93, XGB: 94, AE: 83 },
  { metric: "Vitesse", RF: 60, XGB: 95, AE: 40 },
  { metric: "Accuracy", RF: 94, XGB: 94, AE: 85 },
];

const confusionData = [
  {
    real: "Bruteforce",
    bruteforce: 1754,
    dos: 12,
    flood: 0,
    legitimate: 180,
    malformed: 43,
    slowite: 0,
  },
  {
    real: "DOS",
    bruteforce: 45,
    dos: 16821,
    flood: 0,
    legitimate: 1350,
    malformed: 25,
    slowite: 0,
  },
  { real: "Flood", bruteforce: 0, dos: 5, flood: 34, legitimate: 42, malformed: 0, slowite: 0 },
  {
    real: "Legitimate",
    bruteforce: 12,
    dos: 145,
    flood: 0,
    legitimate: 23050,
    malformed: 46,
    slowite: 0,
  },
  {
    real: "Malformed",
    bruteforce: 28,
    dos: 18,
    flood: 0,
    legitimate: 590,
    malformed: 838,
    slowite: 0,
  },
  { real: "Slowite", bruteforce: 0, dos: 0, flood: 0, legitimate: 0, malformed: 0, slowite: 1292 },
];

const classes = ["bruteforce", "dos", "flood", "legitimate", "malformed", "slowite"];

function Modeles() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="p-6">
        {/* TITRE */}
        <div className="flex items-center gap-3 mb-6">
          <FiCpu className="text-yellow-400" size={24} />
          <div>
            <h2 className="text-white font-bold text-xl">Modèles Machine Learning</h2>
            <p className="text-gray-500 text-xs font-mono mt-1">
              Comparaison et analyse des modèles entraînés
            </p>
          </div>
        </div>

        {/* 3 CARTES MODÈLES */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {modeles.map((m, i) => (
            <div
              key={i}
              className="bg-gray-900 border border-gray-800 rounded-xl p-5"
              style={{ borderColor: m.color + "33" }}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl">{m.icon}</span>
                <span
                  className="text-xs font-mono px-2 py-1 rounded-full"
                  style={{ backgroundColor: m.color + "20", color: m.color }}
                >
                  {m.type}
                </span>
              </div>
              <h3 className="text-white font-bold text-lg mb-1">{m.nom}</h3>
              <p className="text-gray-500 text-xs font-mono mb-4">{m.description}</p>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-xs text-gray-500 font-mono">ACCURACY</p>
                  <p className="text-3xl font-bold" style={{ color: m.color }}>
                    {m.accuracy}%
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500 font-mono">ENTRAÎNEMENT</p>
                  <p className="text-sm font-mono text-gray-300">{m.temps}</p>
                </div>
              </div>
              {/* Barre de progression */}
              <div className="mt-4 bg-gray-800 rounded-full h-2">
                <div
                  className="h-2 rounded-full transition-all"
                  style={{ width: `${m.accuracy}%`, backgroundColor: m.color }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* GRAPHE COMPARAISON + RADAR */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* GRAPHE BARRES COMPARAISON */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <FiAward className="text-yellow-400" size={16} />
              <h3 className="text-gray-400 text-xs font-mono tracking-widest">
                COMPARAISON ACCURACY
              </h3>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={compareData} barSize={60}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1a2d4d" />
                <XAxis dataKey="name" stroke="#4a6080" tick={{ fontSize: 11 }} />
                <YAxis stroke="#4a6080" tick={{ fontSize: 11 }} domain={[80, 96]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0d1525",
                    border: "1px solid #1a2d4d",
                    borderRadius: "8px",
                  }}
                  formatter={(value) => [`${value}%`, "Accuracy"]}
                />
                <Bar dataKey="accuracy" radius={[6, 6, 0, 0]}>
                  {compareData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* GRAPHE RADAR */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <FiActivity className="text-cyan-400" size={16} />
              <h3 className="text-gray-400 text-xs font-mono tracking-widest">
                MÉTRIQUES COMPARÉES
              </h3>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="#1a2d4d" />
                <PolarAngleAxis dataKey="metric" tick={{ fontSize: 11, fill: "#4a6080" }} />
                <Radar
                  name="Random Forest"
                  dataKey="RF"
                  stroke="#4d9fff"
                  fill="#4d9fff"
                  fillOpacity={0.1}
                />
                <Radar
                  name="XGBoost"
                  dataKey="XGB"
                  stroke="#00e5a0"
                  fill="#00e5a0"
                  fillOpacity={0.1}
                />
                <Radar
                  name="Autoencoder"
                  dataKey="AE"
                  stroke="#c44dff"
                  fill="#c44dff"
                  fillOpacity={0.1}
                />
                <Legend />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0d1525",
                    border: "1px solid #1a2d4d",
                    borderRadius: "8px",
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* MATRICE DE CONFUSION */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <FiZap className="text-yellow-400" size={16} />
            <h3 className="text-gray-400 text-xs font-mono tracking-widest">
              MATRICE DE CONFUSION · XGBOOST
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs font-mono">
              <thead>
                <tr>
                  <th className="text-gray-500 p-2 text-left">Réel \ Prédit</th>
                  {classes.map((c) => (
                    <th key={c} className="text-cyan-400 p-2 text-center uppercase">
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {confusionData.map((row, i) => (
                  <tr key={i}>
                    <td className="text-cyan-400 p-2 font-bold uppercase">{row.real}</td>
                    {classes.map((c) => {
                      const val = row[c] || 0;
                      const isCorrect = c === row.real;
                      return (
                        <td
                          key={c}
                          className="p-2 text-center rounded"
                          style={{
                            backgroundColor: isCorrect
                              ? "#00e5a020"
                              : val > 100
                                ? "#ff3b5c15"
                                : "#1a2d4d20",
                            color: isCorrect ? "#00e5a0" : val > 100 ? "#ff3b5c" : "#4a6080",
                          }}
                        >
                          {val.toLocaleString()}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modeles;
