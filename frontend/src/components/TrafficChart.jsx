import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import useWebSocket from "../hooks/useWebSocket";
import { useState, useEffect } from "react";

function TrafficChart() {
  const { total, totalAnomalies } = useWebSocket();
  const [data, setData] = useState([]);

  useEffect(() => {
    if (total === 0) return;
    const heure = new Date().toLocaleTimeString();
    const totalNormal = total - totalAnomalies;
    setData((prev) => [
      ...prev.slice(-9),
      {
        time: heure,
        normal: totalNormal,
        anomalie: totalAnomalies,
      },
    ]);
  }, [total, totalAnomalies]);

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
      <h2 className="text-gray-400 text-xs font-mono tracking-widest mb-4">
        📈 TRAFIC MQTT EN TEMPS RÉEL
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorNormal" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00d4ff" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#00d4ff" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorAnomalie" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ff3b5c" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#ff3b5c" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#1a2d4d" />
          <XAxis dataKey="time" stroke="#4a6080" tick={{ fontSize: 11 }} />
          <YAxis stroke="#4a6080" tick={{ fontSize: 11 }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#0d1525",
              border: "1px solid #1a2d4d",
              borderRadius: "8px",
            }}
            labelStyle={{ color: "#e2eeff" }}
          />
          <Legend />
          <Area
            type="monotone"
            dataKey="normal"
            stroke="#00d4ff"
            fill="url(#colorNormal)"
            strokeWidth={2}
          />
          <Area
            type="monotone"
            dataKey="anomalie"
            stroke="#ff3b5c"
            fill="url(#colorAnomalie)"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default TrafficChart;
