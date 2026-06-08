import useWebSocket from "../hooks/useWebSocket";

function DonutChart() {
  const { total, totalAnomalies, counts } = useWebSocket();
  const totalNormal = Math.max(total - totalAnomalies, 0);
  const isLive = total > 0;

  const allData = [
    { name: "Legitime", value: isLive ? totalNormal : 0, color: "#00e5a0" },
    { name: "DOS", value: isLive ? counts.dos : 0, color: "#ff3b5c" },
    { name: "Bruteforce", value: isLive ? counts.bruteforce : 0, color: "#4d9fff" },
    { name: "Flood", value: isLive ? counts.flood : 0, color: "#ffb300" },
    { name: "Slowite", value: isLive ? counts.slowite : 0, color: "#c44dff" },
    { name: "Malformed", value: isLive ? counts.malformed : 0, color: "#ff8c42" },
    { name: "Inconnue", value: isLive ? counts.anomalie_inconnue : 0, color: "#ff69b4" },
  ];

  const data = allData.filter((d) => d.value > 0);
  const totalValues = data.reduce((sum, d) => sum + d.value, 0);

  const polarToCartesian = (cx, cy, r, angle) => {
    const rad = ((angle - 90) * Math.PI) / 180;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
  };

  const arcPath = (cx, cy, r, start, end) => {
    if (end - start >= 359.9) {
      return `M ${cx} ${cy - r} A ${r} ${r} 0 1 1 ${cx - 0.01} ${cy - r}`;
    }
    const s = polarToCartesian(cx, cy, r, start);
    const e = polarToCartesian(cx, cy, r, end);
    const large = end - start > 180 ? 1 : 0;
    return `M ${s.x} ${s.y} A ${r} ${r} 0 ${large} 1 ${e.x} ${e.y}`;
  };

  let cumulative = 0;
  const segments =
    totalValues > 0
      ? data.map((d) => {
          const start = (cumulative / totalValues) * 360;
          cumulative += d.value;
          const end = (cumulative / totalValues) * 360;
          return { ...d, start, end };
        })
      : [];

  return (
    <div
      className="bg-gray-900 border border-gray-800 rounded-xl p-5"
      style={{ minHeight: "370px" }}
    >
      <h2 className="text-gray-400 text-xs font-mono tracking-widest mb-4">
        REPARTITION DU TRAFIC
      </h2>
      <div className="flex justify-center mb-4">
        <svg width="200" height="200" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="75" fill="none" stroke="#1f2937" strokeWidth="28" />
          {segments.map((seg, i) => (
            <path
              key={i}
              d={arcPath(100, 100, 75, seg.start, seg.end)}
              stroke={seg.color}
              strokeWidth="28"
              fill="none"
              strokeLinecap="butt"
            />
          ))}
          <circle cx="100" cy="100" r="55" fill="#111827" />
          <text x="100" y="95" textAnchor="middle" fill="#ffffff" fontSize="16" fontWeight="bold">
            {total.toLocaleString()}
          </text>
          <text x="100" y="115" textAnchor="middle" fill="#6b7280" fontSize="10">
            paquets
          </text>
        </svg>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {allData.map((d, i) => (
          <div key={i} className="flex items-center gap-2">
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: 2,
                backgroundColor: d.color,
                flexShrink: 0,
              }}
            />
            <span className="text-xs font-mono text-gray-400">{d.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DonutChart;
