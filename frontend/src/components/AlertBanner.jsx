import { FiAlertTriangle, FiX } from "react-icons/fi";
import { useState } from "react";

function AlertBanner({ type, heure }) {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="flex items-center justify-between bg-red-500/10 border border-red-500/30 rounded-xl px-5 py-3 mb-6">
      {" "}
      <div className="flex items-center gap-3">
        <FiAlertTriangle className="text-red-400" size={18} />
        <p className="text-red-400 text-xs font-mono">
          ⚠️ ANOMALIE DÉTECTÉE — Type :<span className="font-bold uppercase ml-1">{type}</span>—
          Heure : {heure}
        </p>
      </div>
      <button onClick={() => setVisible(false)}>
        <FiX className="text-red-400" size={18} />
      </button>
    </div>
  );
}

export default AlertBanner;
