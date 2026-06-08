import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import useWebSocket from "../hooks/useWebSocket";

function AnomalieBarChart() {
  const { counts, total } = useWebSocket();
  const isLive = total > 0;

  const data = [
    { type: "DOS", value: isLive ? counts.dos : 0, color: "#ff3b5c" },
    { type: "Flood", value: isLive ? counts.flood : 0, color: "#ffb300" },
    { type: "Bruteforce", value: isLive ? counts.bruteforce : 0, color: "#4d9fff" },
    { type: "Slowite", value: isLive ? counts.slowite : 0, color: "#c44dff" },
    { type: "Malformed", value: isLive ? counts.malformed : 0, color: "#ff8c42" },
    { type: "Inconnue", value: isLive ? counts.anomalie_inconnue : 0, color: "#ff69b4" },
  ];

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 h-full flex flex-col">
      <h2 className="text-gray-400 text-xs font-mono tracking-widest mb-4">
        📊 ANOMALIES PAR TYPE
      </h2>
      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1a2d4d" />
            <XAxis dataKey="type" stroke="#4a6080" tick={{ fontSize: 11 }} />
            <YAxis stroke="#4a6080" tick={{ fontSize: 11 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#0d1525",
                border: "1px solid #1a2d4d",
                borderRadius: "8px",
              }}
              labelStyle={{ color: "#e2eeff" }}
            />
            <Bar dataKey="value" radius={[6, 6, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default AnomalieBarChart;
