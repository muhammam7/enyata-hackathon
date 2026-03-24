import { useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --purple-deep: #3a1a8a;
    --purple-mid: #4e22c4;
    --purple-bright: #6c3ce1;
    --purple-btn: #7b4ff0;
    --green-dot: #22c55e;
    --text-dark: #111118;
    --text-muted: #6b7280;
    --border: #e2e4ea;
    --bg-form: #f5f6fa;
    --white: #ffffff;
    --input-bg: #ffffff;
    --radius: 12px;
    --radius-sm: 8px;
    --red: #ef4444;
  }

  .page {
    display: flex;
    min-height: 100vh;
    font-family: 'DM Sans', sans-serif;
  }

  /* LEFT PANEL */
  .left-panel {
    width: 46%;
    background: linear-gradient(145deg, #2a0f7a 0%, #4e22c4 50%, #3a1a8a 100%);
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 64px 56px;
  }

  .left-panel::before {
    content: '';
    position: absolute;
    width: 420px; height: 420px;
    border-radius: 50%;
    background: rgba(255,255,255,0.05);
    top: -80px; right: -100px;
  }

  .left-panel::after {
    content: '';
    position: absolute;
    width: 300px; height: 300px;
    border-radius: 50%;
    background: rgba(255,255,255,0.04);
    bottom: -60px; left: -80px;
  }

  .brand-row {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 48px;
    position: relative; z-index: 1;
  }

  .brand-name {
    font-family: 'Syne', sans-serif;
    font-size: 26px;
    font-weight: 700;
    color: var(--white);
    letter-spacing: -0.5px;
  }

  .brand-badge {
    background: rgba(255,255,255,0.15);
    backdrop-filter: blur(8px);
    border: 1px solid rgba(255,255,255,0.2);
    color: var(--white);
    font-size: 12px;
    font-weight: 500;
    padding: 4px 12px;
    border-radius: 20px;
  }

  .left-headline {
    font-family: 'Syne', sans-serif;
    font-size: clamp(32px, 3.5vw, 48px);
    font-weight: 800;
    color: var(--white);
    line-height: 1.15;
    letter-spacing: -1px;
    margin-bottom: 20px;
    position: relative; z-index: 1;
  }

  .left-sub {
    font-size: 15px;
    color: rgba(255,255,255,0.72);
    line-height: 1.65;
    max-width: 340px;
    margin-bottom: 40px;
    position: relative; z-index: 1;
  }

  .left-cta {
    display: inline-flex;
    align-items: center;
    background: rgba(255,255,255,0.12);
    border: 1px solid rgba(255,255,255,0.25);
    color: var(--white);
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    font-weight: 500;
    padding: 13px 24px;
    border-radius: 50px;
    cursor: pointer;
    transition: background 0.2s, transform 0.15s;
    position: relative; z-index: 1;
    width: fit-content;
    user-select: none;
  }

  .left-cta:hover { background: rgba(255,255,255,0.2); }
  .left-cta:active { transform: scale(0.96); }

  /* RIGHT PANEL */
  .right-panel {
    flex: 1;
    background: var(--bg-form);
    display: flex;
    flex-direction: column;
    padding: 40px 56px;
    overflow-y: auto;
  }

  .back-link {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 14px;
    color: var(--text-muted);
    cursor: pointer;
    margin-bottom: 28px;
    transition: color 0.2s;
    user-select: none;
    width: fit-content;
  }

  .back-link:hover { color: var(--text-dark); }

  /* STEPPER */
  .stepper {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-bottom: 24px;
  }

  .step-pill {
    width: 32px; height: 10px;
    border-radius: 10px;
    background: var(--purple-bright);
  }

  .step-pill.inactive {
    background: #d1d5db;
  }

  .form-title {
    font-family: 'Syne', sans-serif;
    font-size: clamp(24px, 2.8vw, 36px);
    font-weight: 800;
    color: var(--text-dark);
    letter-spacing: -0.8px;
    margin-bottom: 6px;
  }

  .form-step-label {
    font-size: 13px;
    color: var(--text-muted);
    margin-bottom: 32px;
  }

  .form { display: flex; flex-direction: column; gap: 20px; }

  .field { display: flex; flex-direction: column; gap: 6px; }

  .field-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }

  label {
    font-size: 13.5px;
    font-weight: 500;
    color: var(--text-dark);
  }

  input, select {
    height: 48px;
    border: 1.5px solid var(--border);
    border-radius: var(--radius-sm);
    background: var(--input-bg);
    padding: 0 14px;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    color: var(--text-dark);
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
    appearance: none;
    -webkit-appearance: none;
    width: 100%;
  }

  input::placeholder { color: #adb5bd; }

  input:focus, select:focus {
    border-color: var(--purple-bright);
    box-shadow: 0 0 0 3px rgba(108, 60, 225, 0.12);
  }

  input.error, select.error {
    border-color: var(--red);
    box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
  }

  .error-msg {
    font-size: 12px;
    color: var(--red);
    margin-top: 2px;
  }

  .select-wrap { position: relative; }
  .select-wrap select { cursor: pointer; padding-right: 40px; }
  .select-arrow {
    position: absolute;
    right: 14px; top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
    color: var(--text-muted);
  }

  /* PASSWORD */
  .input-wrap { position: relative; }
  .input-wrap input { padding-right: 44px; }
  .eye-btn {
    position: absolute;
    right: 14px; top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
    color: var(--text-muted);
    display: flex;
    align-items: center;
    padding: 0;
    transition: color 0.2s;
  }
  .eye-btn:hover { color: var(--purple-bright); }

  /* PASSWORD STRENGTH */
  .strength-bar {
    display: flex;
    gap: 4px;
    margin-top: 8px;
  }

  .strength-segment {
    height: 4px;
    flex: 1;
    border-radius: 4px;
    background: #e5e7eb;
    transition: background 0.3s;
  }

  .strength-segment.weak   { background: #ef4444; }
  .strength-segment.fair   { background: #f97316; }
  .strength-segment.good   { background: #eab308; }
  .strength-segment.strong { background: #22c55e; }

  .strength-label {
    font-size: 11.5px;
    margin-top: 4px;
    font-weight: 500;
  }

  .strength-label.weak   { color: #ef4444; }
  .strength-label.fair   { color: #f97316; }
  .strength-label.good   { color: #eab308; }
  .strength-label.strong { color: #22c55e; }

  /* PASSWORD RULES */
  .pwd-rules {
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin-top: 8px;
  }

  .pwd-rule {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    color: var(--text-muted);
    transition: color 0.2s;
  }

  .pwd-rule.met { color: #22c55e; }

  .pwd-rule-dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: #d1d5db;
    transition: background 0.2s;
    flex-shrink: 0;
  }

  .pwd-rule.met .pwd-rule-dot { background: #22c55e; }

  /* SUBMIT */
  .submit-btn {
    height: 52px;
    background: var(--purple-btn);
    color: var(--white);
    border: none;
    border-radius: var(--radius);
    font-family: 'DM Sans', sans-serif;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
    margin-top: 4px;
  }

  .submit-btn:hover {
    background: #6a40e0;
    box-shadow: 0 6px 24px rgba(108, 60, 225, 0.35);
  }

  .submit-btn:active { transform: scale(0.977); }

  .submit-btn .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255,255,255,0.3);
    transform: scale(0);
    animation: ripple 0.55s linear;
    pointer-events: none;
  }

  @keyframes ripple { to { transform: scale(4); opacity: 0; } }

  .signin-row {
    text-align: center;
    font-size: 13.5px;
    color: var(--text-muted);
    margin-top: 16px;
  }

  .signin-row a {
    color: var(--purple-bright);
    font-weight: 600;
    cursor: pointer;
    text-decoration: none;
  }

  .signin-row a:hover { text-decoration: underline; }

  /* RESPONSIVE */
  @media (max-width: 860px) {
    .page { flex-direction: column; }
    .left-panel { width: 100%; padding: 48px 32px; min-height: auto; }
    .right-panel { padding: 36px 28px; }
    .field-row { grid-template-columns: 1fr; }
  }

  @media (max-width: 480px) {
    .left-panel { padding: 40px 20px; }
    .right-panel { padding: 28px 16px; }
  }
`;

const EyeIcon = ({ open }) => open ? (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
) : (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/>
    <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
);

function getStrength(pwd) {
  if (!pwd) return { score: 0, label: "", level: "" };
  let score = 0;
  if (pwd.length >= 8) score++;
  if (/[A-Z]/.test(pwd)) score++;
  if (/[0-9]/.test(pwd)) score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;
  const map = { 1: { label: "Weak", level: "weak" }, 2: { label: "Fair", level: "fair" }, 3: { label: "Good", level: "good" }, 4: { label: "Strong", level: "strong" } };
  return { score, ...(map[score] || { label: "", level: "" }) };
}

export default function BusinessSignupStepOne({ onNext }) {
  const [form, setForm] = useState({
    companyName: "",
    industry: "",
    businessSize: "",
    workEmail: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const strength = getStrength(form.password);

  const rules = [
    { label: "At least 8 characters", met: form.password.length >= 8 },
    { label: "One uppercase letter", met: /[A-Z]/.test(form.password) },
    { label: "One number", met: /[0-9]/.test(form.password) },
    { label: "One special character", met: /[^A-Za-z0-9]/.test(form.password) },
  ];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const e = {};
    if (!form.companyName.trim()) e.companyName = "Company name is required";
    if (!form.industry) e.industry = "Please select an industry";
    if (!form.businessSize) e.businessSize = "Please select a business size";
    if (!form.workEmail.trim()) e.workEmail = "Work email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.workEmail)) e.workEmail = "Enter a valid email address";
    if (!form.password) e.password = "Password is required";
    else if (form.password.length < 8) e.password = "Password must be at least 8 characters";
    if (!form.confirmPassword) e.confirmPassword = "Please confirm your password";
    else if (form.password !== form.confirmPassword) e.confirmPassword = "Passwords do not match";
    return e;
  };

  const createRipple = (e) => {
    const btn = e.currentTarget;
    const circle = document.createElement("span");
    const diameter = Math.max(btn.clientWidth, btn.clientHeight);
    const radius = diameter / 2;
    const rect = btn.getBoundingClientRect();
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${e.clientX - rect.left - radius}px`;
    circle.style.top = `${e.clientY - rect.top - radius}px`;
    circle.classList.add("ripple");
    const existing = btn.querySelector(".ripple");
    if (existing) existing.remove();
    btn.appendChild(circle);
  };

  
const handleSubmit = (e) => {
  const newErrors = validate();
  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    return;
  }
  setErrors({});
  createRipple(e);
  setTimeout(() => onNext(), 300);
};
  
  return (
    <>
      <style>{styles}</style>
      <div className="page">

        {/* LEFT */}
        <div className="left-panel">
          <div className="brand-row">
            <span className="brand-name">vynder</span>
            <span className="brand-badge">Business</span>
          </div>
          <h1 className="left-headline">Start finding creators that fit.</h1>
          <p className="left-sub">
            Join hundreds of businesses already using Vynder to hire and pay creators — without the friction.
          </p>
          <button className="left-cta">Free to create an account</button>
        </div>

        {/* RIGHT */}
        <div className="right-panel">
          <div className="back-link">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back to home
          </div>

          <div className="stepper">
            <div className="step-pill" />
            <div className="step-pill inactive" />
          </div>

          <h2 className="form-title">Create Business Account</h2>
          <p className="form-step-label">Step 1 of 2 — Business Info</p>

          <div className="form">

            {/* Company Name */}
            <div className="field">
              <label>Business / Company Name</label>
              <input
                name="companyName"
                placeholder="e.g. TechCorp Nigeria Ltd"
                value={form.companyName}
                onChange={handleChange}
                className={errors.companyName ? "error" : ""}
              />
              {errors.companyName && <span className="error-msg">⚠ {errors.companyName}</span>}
            </div>

            {/* Industry */}
            <div className="field">
              <label>Industry</label>
              <div className="select-wrap">
                <select name="industry" value={form.industry} onChange={handleChange} className={errors.industry ? "error" : ""}>
                  <option value="" disabled>Select Industry</option>
                  <option>Technology</option>
                  <option>Fashion & Apparel</option>
                  <option>Food & Beverage</option>
                  <option>Finance & Fintech</option>
                  <option>Health & Wellness</option>
                  <option>Education</option>
                  <option>Real Estate</option>
                  <option>Entertainment & Media</option>
                  <option>E-commerce & Retail</option>
                  <option>Beauty & Personal Care</option>
                  <option>Travel & Hospitality</option>
                  <option>Non-profit / NGO</option>
                  <option>Other</option>
                </select>
                <svg className="select-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              {errors.industry && <span className="error-msg">⚠ {errors.industry}</span>}
            </div>

            {/* Business Size */}
            <div className="field">
              <label>Business Size</label>
              <div className="select-wrap">
                <select name="businessSize" value={form.businessSize} onChange={handleChange} className={errors.businessSize ? "error" : ""}>
                  <option value="" disabled>Select size</option>
                  <option>Solo / Freelancer</option>
                  <option>2 — 10 employees</option>
                  <option>11 — 50 employees</option>
                  <option>51 — 200 employees</option>
                  <option>201 — 500 employees</option>
                  <option>500+ employees</option>
                </select>
                <svg className="select-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              {errors.businessSize && <span className="error-msg">⚠ {errors.businessSize}</span>}
            </div>

            {/* Work Email */}
            <div className="field">
              <label>Work Email</label>
              <input
                name="workEmail"
                type="email"
                placeholder="you@company.com"
                value={form.workEmail}
                onChange={handleChange}
                className={errors.workEmail ? "error" : ""}
              />
              {errors.workEmail && <span className="error-msg">⚠ {errors.workEmail}</span>}
            </div>

            {/* Password */}
            <div className="field">
              <label>Password</label>
              <div className="input-wrap">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="At least 8 characters"
                  value={form.password}
                  onChange={handleChange}
                  className={errors.password ? "error" : ""}
                />
                <button className="eye-btn" type="button" onClick={() => setShowPassword(!showPassword)}>
                  <EyeIcon open={showPassword} />
                </button>
              </div>
              {errors.password && <span className="error-msg">⚠ {errors.password}</span>}

              {/* Strength bar */}
              {form.password && (
                <>
                  <div className="strength-bar">
                    {[1,2,3,4].map(i => (
                      <div
                        key={i}
                        className={`strength-segment ${i <= strength.score ? strength.level : ""}`}
                      />
                    ))}
                  </div>
                  <span className={`strength-label ${strength.level}`}>{strength.label} password</span>

                  <div className="pwd-rules">
                    {rules.map((r, i) => (
                      <div key={i} className={`pwd-rule ${r.met ? "met" : ""}`}>
                        <div className="pwd-rule-dot" />
                        {r.label}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Confirm Password */}
            <div className="field">
              <label>Confirm Password</label>
              <div className="input-wrap">
                <input
                  name="confirmPassword"
                  type={showConfirm ? "text" : "password"}
                  placeholder="Re-enter your password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  className={errors.confirmPassword ? "error" : ""}
                />
                <button className="eye-btn" type="button" onClick={() => setShowConfirm(!showConfirm)}>
                  <EyeIcon open={showConfirm} />
                </button>
              </div>
              {errors.confirmPassword && <span className="error-msg">⚠ {errors.confirmPassword}</span>}
              {!errors.confirmPassword && form.confirmPassword && form.password === form.confirmPassword && (
                <span style={{ fontSize: "12px", color: "#22c55e", marginTop: "2px" }}>✓ Passwords match</span>
              )}
            </div>

            <button className="submit-btn" onClick={handleSubmit}>
              Continue
            </button>

            <p className="signin-row">
              Already have an account? <a href="#">Sign In</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
