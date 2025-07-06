import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import routes from "tempo-routes";
import ChatInterface from "./components/patient/ChatInterface";
import DashboardView from "./components/doctor/DashboardView";
import PatientDetailView from "./components/doctor/PatientDetailView";

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/patient/chat" element={<ChatInterface />} />
          <Route path="/doctor/dashboard" element={<DashboardView />} />
          <Route path="/doctor/patientdetail" element={<PatientDetailView/>} />
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;
