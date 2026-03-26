import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Landing
import LandingPage from "./pages/LandingPage";

// Business flow
import BusinessSignup from "./pages/BusinessSignup";
import BusinessSignupStepOne from "./pages/BusinessSignupStepOne";
import Dashboard from "./pages/Dashboard2";

// Creator flow
import CreatorSignupStepOne from "./pages/CreatorSignupStepOne";
import CreatorSignupStepTwo from "./pages/CreatorSignupStepTwo";
import CreatorSignIn from "./pages/CreatorSignIn";
import ForgotPassword from "./pages/ForgotPassword";
import EnterOTP from "./pages/EnterOTP";
import ResetPassword from "./pages/ResetPassword";
import BVNVerification from "./pages/BVNVerification";
import Dashboard2 from "./pages/Dashboard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default — Landing page loads first */}
        <Route path="/" element={<LandingPage />} />

        {/* Business flow */}
        <Route path="/business/signup" element={<BusinessSignup />} />
        <Route path="/business/signup/step-one" element={<BusinessSignupStepOne />} />
        <Route path="/business/dashboard" element={<Dashboard />} />

        {/* Creator flow */}
        <Route path="/creator/signup/step-one" element={<CreatorSignupStepOne />} />
        <Route path="/creator/signup/step-two" element={<CreatorSignupStepTwo />} />
        <Route path="/creator/signin" element={<CreatorSignIn />} />
        <Route path="/creator/forgot-password" element={<ForgotPassword />} />
        <Route path="/creator/enter-otp" element={<EnterOTP />} />
        <Route path="/creator/reset-password" element={<ResetPassword />} />
        <Route path="/creator/bvn-verification" element={<BVNVerification />} />
        <Route path="/creator/dashboard2" element={<Dashboard2 />} />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}