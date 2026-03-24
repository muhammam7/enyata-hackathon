import { useState } from "react";
import TransactionHistory from "./pages/TransactionHistory";
import Notifications from "./pages/Notifications";
import Settings from "./pages/Settings";
import BusinessSignupStepOne from "./pages/BusinessSignupStepOne";
import BusinessSignup from "./pages/BusinessSignup";
import Dashboard from "./pages/Dashboard";

function App() {
  const [page, setPage] = useState("step1");

  if (page === "step1") {
    return <BusinessSignupStepOne onNext={() => setPage("step2")} />;
  }

  if (page === "step2") {
    return <BusinessSignup onNext={() => setPage("dashboard")} />;
  }

  if (page === "dashboard") {
    return <Dashboard page={page} onNavigate={setPage} />;
  }

  if (page === "transactions") {
    return <TransactionHistory onNavigate={setPage} />;
  }

  if (page === "notifications") {
    return <Notifications onNavigate={setPage} />;
  }

  if (page === "settings") {
    return <Settings onNavigate={setPage} />;
  }

  return null;
}

export default App;