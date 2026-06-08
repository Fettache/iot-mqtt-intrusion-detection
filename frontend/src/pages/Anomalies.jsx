import { useState } from "react";
import Header from "../components/Header";
import useWebSocket from "../hooks/useWebSocket";
import { FiAlertTriangle, FiFilter } from "react-icons/fi";

function Anomalies() {
  const { anomalies } = useWebSocket();
  const [filtre, setFiltre] = useState("tous");

  const types = ["tous", "dos", "flood", "bruteforce", "slowite", "malformed", "anomalie_inconnue"];

  const typeBadge = {
    dos: "bg-red-500/20 text-red-400 border border-red-500/30",
    flood: "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30",
    bruteforce: "bg-blue-500/20 text-blue-400 border border-blue-500/30",
    slowite: "bg-purple-500/20 text-purple-400 border border-purple-500/30",
    malformed: "bg-orange-500/20 text-orange-400 border border-orange-500/30",
    anomalie_inconnue: "bg-pink-500/20 text-pink-400 border border-pink-500/30",
  };

  const anomaliesFiltrees =
    filtre === "tous" ? anomalies : anomalies.filter((a) => a.type === filtre);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="p-6">
        {/* TITRE */}
        <div className="flex items-center gap-3 mb-6">
          <FiAlertTriangle className="text-red-400" size={24} />
          <div>
            <h2 className="text-white font-bold text-xl">Anomalies Détectées</h2>
            <p className="text-gray-500 text-xs font-mono mt-1">
              {anomalies.length} anomalies détectées en temps réel
            </p>
          </div>
        </div>

        {/* FILTRES */}
        <div className="flex flex-wrap gap-2 mb-6">
          <FiFilter className="text-gray-400 mt-2" size={16} />
          {types.map((type) => (
            <button
              key={type}
              onClick={() => setFiltre(type)}
              className={`px-4 py-2 rounded-lg text-xs font-bold font-mono transition-all
                ${
                  filtre === type
                    ? "bg-cyan-400/20 text-cyan-400 border border-cyan-400/30"
                    : "bg-gray-900 text-gray-400 border border-gray-800 hover:border-gray-600"
                }`}
            >
              {type === "anomalie_inconnue" ? "⚠️ INCONNUE" : type.toUpperCase()}
            </button>
          ))}
        </div>

        {/* TABLEAU */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-gray-500 text-xs font-mono text-left pb-3">#</th>
                <th className="text-gray-500 text-xs font-mono text-left pb-3">TYPE</th>
                <th className="text-gray-500 text-xs font-mono text-left pb-3">HEURE</th>
                <th className="text-gray-500 text-xs font-mono text-left pb-3">STATUT</th>
              </tr>
            </thead>
            <tbody>
              {anomaliesFiltrees.length > 0 ? (
                anomaliesFiltrees.map((item, index) => (
                  <tr key={index} className="border-b border-gray-800/50 hover:bg-gray-800/30">
                    <td className="py-3 text-gray-500 text-xs font-mono">{index + 1}</td>
                    <td className="py-3">
                      <span
                        className={`px-2 py-1 rounded text-xs font-bold font-mono ${typeBadge[item.type] || "bg-gray-500/20 text-gray-400"}`}
                      >
                        {item.type === "anomalie_inconnue"
                          ? "⚠️ INCONNUE"
                          : item.type.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-3 text-gray-400 text-xs font-mono">{item.heure}</td>
                    <td className="py-3">
                      <span
                        className={`text-xs font-mono ${item.type === "anomalie_inconnue" ? "text-pink-400" : "text-red-400"}`}
                      >
                        {item.type === "anomalie_inconnue" ? "⚠️ Inconnue" : "🚨 Anomalie"}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="py-10 text-center text-gray-500 text-sm font-mono">
                    Aucune anomalie détectée pour l'instant...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Anomalies;