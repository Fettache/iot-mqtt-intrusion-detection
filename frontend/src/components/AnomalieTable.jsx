function AnomalieTable({ anomalies }) {
  const typeBadge = {
    dos: "bg-red-500/20 text-red-400",
    flood: "bg-yellow-500/20 text-yellow-400",
    bruteforce: "bg-blue-500/20 text-blue-400",
    slowite: "bg-purple-500/20 text-purple-400",
    malformed: "bg-orange-500/20 text-orange-400",
    anomalie_inconnue: "bg-pink-500/20 text-pink-400",
  };

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
      <h2 className="text-gray-400 text-xs font-mono tracking-widest mb-4">
        DERNIERES ANOMALIES DETECTEES
      </h2>
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
          {anomalies.length > 0 ? (
            anomalies.map((item, index) => (
              <tr key={index} className="border-b border-gray-800/50">
                <td className="py-3 text-gray-500 text-xs font-mono">{index + 1}</td>
                <td className="py-3">
                  <span
                    className={`px-2 py-1 rounded text-xs font-bold font-mono ${typeBadge[item.type] || "bg-gray-500/20 text-gray-400"}`}
                  >
                    {item.type === "anomalie_inconnue" ? "INCONNUE" : item.type.toUpperCase()}
                  </span>
                </td>
                <td className="py-3 text-gray-400 text-xs font-mono">{item.heure}</td>
                <td className="py-3">
                  <span
                    className={`text-xs font-mono ${item.type === "anomalie_inconnue" ? "text-pink-400" : "text-red-400"}`}
                  >
                    {item.type === "anomalie_inconnue" ? "Inconnue" : "Anomalie"}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="py-10 text-center text-gray-500 text-sm font-mono">
                Aucune anomalie detectee pour l'instant...
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AnomalieTable;
