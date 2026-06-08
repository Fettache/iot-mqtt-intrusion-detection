import { FiWifi, FiCheckCircle, FiAlertTriangle, FiZap } from "react-icons/fi";

function MetricCard({ label, value, change, color }) {
  const styles = {
    blue: "border-t-cyan-400 text-cyan-400",
    green: "border-t-green-400 text-green-400",
    red: "border-t-red-400 text-red-400",
    yellow: "border-t-yellow-400 text-yellow-400",
  };

  const icons = {
    blue: <FiWifi size={24} className="text-cyan-400 opacity-40" />,
    green: <FiCheckCircle size={24} className="text-green-400 opacity-40" />,
    red: <FiAlertTriangle size={24} className="text-red-400 opacity-40" />,
    yellow: <FiZap size={24} className="text-yellow-400 opacity-40" />,
  };

  return (
    <div
      className={`bg-gray-900 border border-gray-800 border-t-2 ${styles[color]} rounded-xl p-5 hover:-translate-y-1 transition-transform`}
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-500 text-xs font-mono tracking-widest mb-2">{label}</p>
          <p className={`text-3xl font-black ${styles[color]}`}>{value}</p>
          <p className="text-gray-500 text-xs mt-2 font-mono">{change}</p>
        </div>
        <span>{icons[color]}</span>
      </div>
    </div>
  );
}

export default MetricCard;
