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
  .left-cta:active { transform: scale(0.96); background: rgba(255,255,255,0.28); }

  /* RIGHT PANEL */
  .right-panel {
    flex: 1;
    background: var(--bg-form);
    display: flex;
    flex-direction: column;
    padding: 40px 56px 40px;
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

  .step-dot {
    width: 10px; height: 10px;
    border-radius: 50%;
  }

  .step-dot.done { background: var(--green-dot); }

  .step-pill {
    width: 32px; height: 10px;
    border-radius: 10px;
    background: var(--purple-bright);
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

  /* FORM */
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

  label span { color: var(--text-muted); font-weight: 400; }

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

  .select-wrap {
    position: relative;
  }

  .select-wrap select { cursor: pointer; padding-right: 40px; }

  .select-arrow {
    position: absolute;
    right: 14px; top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
    color: var(--text-muted);
  }

  /* SUBMIT BUTTON */
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

  @keyframes ripple {
    to { transform: scale(4); opacity: 0; }
  }

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

  /* SUCCESS OVERLAY */
  .success-overlay {
    position: fixed; inset: 0;
    background: rgba(20, 10, 60, 0.55);
    backdrop-filter: blur(6px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
    animation: fadeIn 0.3s ease;
  }

  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

  .success-card {
    background: var(--white);
    border-radius: 20px;
    padding: 48px 40px;
    text-align: center;
    max-width: 400px;
    width: 90%;
    animation: slideUp 0.35s cubic-bezier(0.34,1.56,0.64,1);
  }

  @keyframes slideUp {
    from { opacity: 0; transform: translateY(40px) scale(0.95); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }

  .success-icon {
    width: 72px; height: 72px;
    background: linear-gradient(135deg, #22c55e, #16a34a);
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    margin: 0 auto 20px;
    font-size: 32px;
  }

  .success-title {
    font-family: 'Syne', sans-serif;
    font-size: 24px;
    font-weight: 800;
    color: var(--text-dark);
    margin-bottom: 10px;
  }

  .success-sub {
    font-size: 14px;
    color: var(--text-muted);
    line-height: 1.6;
    margin-bottom: 28px;
  }

  .success-btn {
    background: var(--purple-btn);
    color: var(--white);
    border: none;
    border-radius: var(--radius-sm);
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    font-weight: 600;
    padding: 13px 32px;
    cursor: pointer;
    transition: background 0.2s, transform 0.15s;
  }

  .success-btn:hover { background: #6a40e0; }
  .success-btn:active { transform: scale(0.96); }

  input.error, select.error {
    border-color: #ef4444;
    box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
  }

  .error-msg {
    font-size: 12px;
    color: #ef4444;
    margin-top: 2px;
    display: flex;
    align-items: center;
    gap: 4px;
  }

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

export default function BusinessSignup({ onNext }) {  const [form, setForm] = useState({
    address: "",
    website: "",
    creatorType: "",
    budget: "",
    firstName: "",
    lastName: "",
    cacNumber: "",
  });

  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

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

  const validate = () => {
    const newErrors = {};
    if (!form.address.trim()) newErrors.address = "Business address is required";
    if (!form.creatorType) newErrors.creatorType = "Please select a creator type";
    if (!form.budget) newErrors.budget = "Please select a budget range";
    if (!form.firstName.trim()) newErrors.firstName = "First name is required";
    if (!form.lastName.trim()) newErrors.lastName = "Last name is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    createRipple(e);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1200);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
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
          <div className="back-link" onClick={() => {}}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back to home
          </div>

          <div className="stepper">
            <div className="step-dot done" />
            <div className="step-pill" />
          </div>

          <h2 className="form-title">Create Business Account</h2>
          <p className="form-step-label">Step 2 of 2 — Additional Details</p>

          <div className="form">
            <div className="field">
              <label>Business Address / Location</label>
              <input
                name="address"
                placeholder="e.g. Victoria Island, Lagos"
                value={form.address}
                onChange={handleChange}
                className={errors.address ? "error" : ""}
              />
              {errors.address && <span className="error-msg">⚠ {errors.address}</span>}
            </div>

            <div className="field">
              <label>Business Website <span>(optional)</span></label>
              <input
                name="website"
                placeholder="https://yourcompany.com"
                value={form.website}
                onChange={handleChange}
              />
            </div>

            <div className="field">
              <label>What type of creators do you typically need?</label>
              <div className="select-wrap">
                <select name="creatorType" value={form.creatorType} onChange={handleChange} className={errors.creatorType ? "error" : ""}>
                  <option value="" disabled>Select content creators</option>
                  <option>Video Creators</option>
                  <option>Graphic Designers</option>
                  <option>Photographers</option>
                  <option>Copywriters</option>
                  <option>Social Media Managers</option>
                  <option>Animators</option>
                  <option>Brand Strategists</option>
                  <option>Podcast Hosts</option>
                </select>
                <svg className="select-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              {errors.creatorType && <span className="error-msg">⚠ {errors.creatorType}</span>}
            </div>

            <div className="field">
              <label>Typical monthly creative budget</label>
              <div className="select-wrap">
                <select name="budget" value={form.budget} onChange={handleChange} className={errors.budget ? "error" : ""}>
                  <option value="" disabled>Select budget range</option>
                  <option>Below ₦50,000</option>
                  <option>₦50,000 — ₦150,000</option>
                  <option>₦150,000 — ₦500,000</option>
                  <option>₦500,000 — ₦1,000,000</option>
                  <option>Above ₦1,000,000</option>
                </select>
                <svg className="select-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              {errors.budget && <span className="error-msg">⚠ {errors.budget}</span>}
            </div>

            <div className="field-row">
              <div className="field">
                <label>Your First Name</label>
                <input
                  name="firstName"
                  placeholder="Emeka"
                  value={form.firstName}
                  onChange={handleChange}
                  className={errors.firstName ? "error" : ""}
                />
                {errors.firstName && <span className="error-msg">⚠ {errors.firstName}</span>}
              </div>
              <div className="field">
                <label>Your Last Name</label>
                <input
                  name="lastName"
                  placeholder="Okafor"
                  value={form.lastName}
                  onChange={handleChange}
                  className={errors.lastName ? "error" : ""}
                />
                {errors.lastName && <span className="error-msg">⚠ {errors.lastName}</span>}
              </div>
            </div>

            <div className="field">
              <label>CAC Registration Number <span>(optional)</span></label>
              <input
                name="cacNumber"
                placeholder="e.g RC1234567"
                value={form.cacNumber}
                onChange={handleChange}
              />
            </div>

            <button className="submit-btn" onClick={handleSubmit} disabled={loading}>
              {loading ? "Setting up your account..." : "Finish Setup"}
            </button>

            <p className="signin-row">
              Already have an account? <a href="#">Sign In</a>
            </p>
          </div>
        </div>
      </div>

      {/* SUCCESS OVERLAY */}
      {success && (
        <div className="success-overlay">
          <div className="success-card">
            <div className="success-icon">✓</div>
            <h3 className="success-title">Account Created!</h3>
            <p className="success-sub">
              Your Vynder business account is ready. You can now start finding creators that fit your brand.
            </p>
            <button className="success-btn" onClick={onNext}>
              Go to Dashboard
            </button>
          </div>
        </div>
      )}
    </>
  );
}
