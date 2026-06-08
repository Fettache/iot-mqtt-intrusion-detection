function Header() {
  return (
    <div className="flex items-center justify-between px-6 py-4 bg-gray-900 border-b border-gray-800">
      {/* GAUCHE */}
      <div>
        <h1 className="text-white font-bold text-xl">Tableau de Bord</h1>
        <p className="text-gray-500 text-xs mt-1">Détection d'anomalies IoT via protocole MQTT</p>
      </div>

      {/* DROITE */}
      <div className="flex items-center gap-3">
        <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-500/15 text-red-400 border border-red-500/30 animate-pulse">
          ⬤ LIVE
        </span>
        <span className="px-3 py-1 rounded-full text-xs font-bold bg-cyan-400/10 text-cyan-400 border border-cyan-400/20">
          XGBoost · 94.2%
        </span>
      </div>
    </div>
  );
}

export default Header;
