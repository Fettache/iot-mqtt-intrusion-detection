import Header from "../components/Header";
import MetricCard from "../components/MetricCard";
import TrafficChart from "../components/TrafficChart";
import DonutChart from "../components/DonutChart";
import AnomalieBarChart from "../components/BarChart";
import AnomalieTable from "../components/AnomalieTable";
import AlertBanner from "../components/AlertBanner";
import useWebSocket from "../hooks/useWebSocket";

function Dashboard() {
  const { anomalies, lastAnomalie, total, totalAnomalies, lastSensor, socketStatus } =
    useWebSocket();

  const totalNormal = total - totalAnomalies;
  const pourcentageNormal = total > 0 ? ((totalNormal / total) * 100).toFixed(1) : 0;
  const pourcentageAnomalie = total > 0 ? ((totalAnomalies / total) * 100).toFixed(1) : 0;
  const tableauAnomalies = anomalies.slice(0, 10);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <div className="px-6 pt-4">
        <div
          className={`inline-flex rounded border px-3 py-1 text-xs font-mono ${
            socketStatus === "connecte"
              ? "border-green-500/30 bg-green-500/10 text-green-400"
              : "border-red-500/30 bg-red-500/10 text-red-400"
          }`}
        >
          WebSocket : {socketStatus}
        </div>
      </div>

      {lastAnomalie && (
        <div className="px-6 pt-4">
          <AlertBanner type={lastAnomalie.type} heure={lastAnomalie.heure} />
        </div>
      )}

      <div className="p-6">
        <div className="grid grid-cols-4 gap-4 mb-6">
          <MetricCard
            label="PAQUETS TOTAL"
            value={total || "0"}
            change="paquets recus"
            color="blue"
          />
          <MetricCard
            label="TRAFIC NORMAL"
            value={totalNormal || "0"}
            change={`${pourcentageNormal}% du total`}
            color="green"
          />
          <MetricCard
            label="ANOMALIES"
            value={totalAnomalies || "0"}
            change={`${pourcentageAnomalie}% du total`}
            color="red"
          />
          <MetricCard
            label={lastSensor ? "CAPTEUR DHT22" : "ACCURACY ML"}
            value={lastSensor ? `${Number(lastSensor.temperature).toFixed(1)}C` : "94.2%"}
            change={
              lastSensor
                ? `${Number(lastSensor.humidity).toFixed(1)}% humidite`
                : "XGBoost - Meilleur modele"
            }
            color="yellow"
          />
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6" style={{ minHeight: "370px" }}>
          <div className="col-span-2" style={{ minHeight: "370px" }}>
            <TrafficChart />
          </div>
          <div className="col-span-1" style={{ minHeight: "370px" }}>
            <DonutChart />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 items-stretch">
          <div className="h-full">
            <AnomalieBarChart />
          </div>
          <div className="h-full">
            <AnomalieTable anomalies={tableauAnomalies} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
