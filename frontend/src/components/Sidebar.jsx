import { Link, useLocation } from "react-router-dom";
import { FiGrid, FiAlertTriangle, FiCpu, FiInfo } from "react-icons/fi";

function Sidebar() {
  const location = useLocation();

  const menuItems = [
    { path: "/", icon: <FiGrid size={18} className="text-cyan-400" />, label: "Dashboard" },
    {
      path: "/anomalies",
      icon: <FiAlertTriangle size={18} className="text-red-400" />,
      label: "Anomalies",
    },
    {
      path: "/modeles",
      icon: <FiCpu size={18} className="text-yellow-400" />,
      label: "Modèles ML",
    },
    { path: "/about", icon: <FiInfo size={18} className="text-green-400" />, label: "À propos" },
  ];

  return (
    <div className="w-60 min-h-screen bg-gray-900 border-r border-gray-800 flex flex-col">
      {/* LOGO */}
      <div className="p-5 border-b border-gray-800">
        <h1 className="text-cyan-400 font-bold text-lg">🔍 MQTT-IDS</h1>
        <p className="text-gray-500 text-xs mt-1">IoT Anomaly Detection</p>
      </div>

      {/* MENU */}
      <nav className="flex-1 p-3 mt-2">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-1 text-sm font-semibold transition-all
              ${
                location.pathname === item.path
                  ? "bg-cyan-400/10 text-cyan-400 border border-cyan-400/20"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
              }`}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* FOOTER */}
      <div className="p-4 border-t border-gray-800">
        <div className="bg-green-400/10 border border-green-400/20 rounded-lg p-3">
          <p className="text-gray-500 text-xs mb-1">MQTT BROKER</p>
          <p className="text-green-400 text-xs font-bold flex items-center gap-2">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            localhost:1883
          </p>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
