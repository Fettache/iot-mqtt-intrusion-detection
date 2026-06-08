import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Anomalies from "./pages/Anomalies";
import Modeles from "./pages/Modeles";
import About from "./pages/About";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-gray-950 text-white">
        <Sidebar />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/anomalies" element={<Anomalies />} />
            <Route path="/modeles" element={<Modeles />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
