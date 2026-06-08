import { createContext, useContext, useEffect, useRef, useState } from "react";

const WebSocketContext = createContext();
const emptyCounts = {
  dos: 0,
  flood: 0,
  bruteforce: 0,
  slowite: 0,
  malformed: 0,
  anomalie_inconnue: 0,
};

export function WebSocketProvider({ children }) {
  const [anomalies, setAnomalies] = useState([]);
  const [lastAnomalie, setLastAnomalie] = useState(null);
  const [total, setTotal] = useState(0);
  const [totalAnomalies, setTotalAnomalies] = useState(0);
  const [counts, setCounts] = useState(emptyCounts);
  const [lastSensor, setLastSensor] = useState(null);
  const [socketStatus, setSocketStatus] = useState("connexion");
  const lastPacketAt = useRef(null);

  const resetLiveData = () => {
    setAnomalies([]);
    setLastAnomalie(null);
    setTotal(0);
    setTotalAnomalies(0);
    setCounts(emptyCounts);
    setLastSensor(null);
  };

  const handlePacket = (data) => {
    const heure = new Date().toLocaleTimeString();
    lastPacketAt.current = Date.now();
    setTotal((prev) => prev + 1);

    if (data.temperature !== undefined && data.humidity !== undefined) {
      setLastSensor({
        temperature: data.temperature,
        humidity: data.humidity,
        heure,
      });
    }

    if (data.anomalie) {
      setTotalAnomalies((prev) => prev + 1);
      setLastAnomalie({ type: data.resultat, heure });
      setAnomalies((prev) => [{ type: data.resultat, heure }, ...prev].slice(0, 50));
      setCounts((prev) => ({
        ...prev,
        [data.resultat]: (prev[data.resultat] || 0) + 1,
      }));
    }
  };

  useEffect(() => {
    const ws = new WebSocket("ws://127.0.0.1:8001/ws");

    ws.onopen = () => {
      setSocketStatus("connecte");
      resetLiveData();
    };

    ws.onmessage = (event) => {
      handlePacket(JSON.parse(event.data));
    };

    ws.onerror = () => {
      setSocketStatus("erreur");
    };

    ws.onclose = () => {
      setSocketStatus("deconnecte");
    };

    const staleTimer = window.setInterval(() => {
      if (lastPacketAt.current && Date.now() - lastPacketAt.current > 10000) {
        lastPacketAt.current = null;
        resetLiveData();
      }
    }, 2000);

    return () => {
      window.clearInterval(staleTimer);
      ws.close();
    };
  }, []);

  return (
    <WebSocketContext.Provider
      value={{
        anomalies,
        lastAnomalie,
        total,
        totalAnomalies,
        counts,
        lastSensor,
        socketStatus,
      }}
    >
      {children}
    </WebSocketContext.Provider>
  );
}

export function useWebSocketContext() {
  return useContext(WebSocketContext);
}
