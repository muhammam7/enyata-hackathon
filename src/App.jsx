import { useState } from "react"
import BusinessSignupStepOne from './pages/BusinessSignupStepOne'
import BusinessSignup from './pages/BusinessSignup'
import Dashboard from './pages/Dashboard'

function App() {
  const [page, setPage] = useState("step1")

  if (page === "step1") return <BusinessSignupStepOne onNext={() => setPage("step2")} />
  if (page === "step2") return <BusinessSignup onNext={() => setPage("dashboard")} />
  if (page === "dashboard") return <Dashboard />
}

export default App