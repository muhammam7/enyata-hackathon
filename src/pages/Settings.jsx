import { useState } from "react";

const settingsSections = ["Profile", "Notifications", "Payments", "Security", "Team"];

const Toggle = ({ checked, onChange }) => (
  <div onClick={onChange} style={{ width: 44, height: 24, borderRadius: 12, background: checked ? "#7b4ff0" : "#e5e7eb", cursor: "pointer", position: "relative", transition: "background 0.25s", flexShrink: 0 }}>
    <div style={{ position: "absolute", top: 2, left: checked ? 22 : 2, width: 20, height: 20, borderRadius: "50%", background: "#fff", boxShadow: "0 1px 4px rgba(0,0,0,0.2)", transition: "left 0.25s" }} />
  </div>
);

export default function Settings() {
  const [activeSection, setActiveSection] = useState("Profile");

  // Profile state
  const [profile, setProfile] = useState({ companyName: "TechCorp Nigeria", contactName: "Emeka Okafor", email: "techcorp@gmail.com", phone: "+234 801 234 5678", website: "techcorp.ng", industry: "Technology / Software", size: "11–50", location: "Victoria Island, Lagos" });
  const [profileSaved, setProfileSaved] = useState(false);

  // Notification prefs
  const [notifPrefs, setNotifPrefs] = useState({
    jobRequests: true, messages: true, payments: true, briefs: false,
    emailDigest: true, smsAlerts: false,
  });

  // Payment settings
  const [paymentInfo, setPaymentInfo] = useState({ bankName: "First Bank Nigeria", accountNumber: "****4523", accountName: "TechCorp Nigeria Ltd" });

  // Security
  const [twoFA, setTwoFA] = useState(false);
  const [sessions] = useState([
    { device: "Chrome · MacOS", location: "Lagos, Nigeria", time: "Now (current)", active: true },
    { device: "Firefox · Windows", location: "Lagos, Nigeria", time: "Mar 22, 2026 · 9:10 AM", active: false },
  ]);

  // Team
  const [team] = useState([
    { name: "Emeka Okafor", email: "techcorp@gmail.com", role: "Admin", initials: "EO", color: "" },
    { name: "Sola Adeyemi", email: "sola@techcorp.ng", role: "Manager", initials: "SA", color: "green" },
    { name: "Bisi Coker", email: "bisi@techcorp.ng", role: "Viewer", initials: "BC", color: "orange" },
  ]);

  const avatarColors = {
    "": "linear-gradient(135deg,#6c3ce1,#4e22c4)",
    green: "linear-gradient(135deg,#22c55e,#16a34a)",
    orange: "linear-gradient(135deg,#f97316,#ea580c)",
    blue: "linear-gradient(135deg,#3b82f6,#1d4ed8)",
  };

  const sectionIcons = {
    Profile: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
    Notifications: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>,
    Payments: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>,
    Security: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
    Team: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>,
  };

  return (
    <div style={{ display: "flex", gap: 0, height: "calc(100vh - 73px)", overflow: "hidden" }}>
      {/* Settings sidebar */}
      <div style={{ width: 220, background: "#fff", borderRight: "1px solid #e5e7eb", padding: "24px 0", flexShrink: 0, overflowY: "auto" }}>
        <div style={{ padding: "0 16px 16px", fontSize: 11, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.08em" }}>Settings</div>
        {settingsSections.map(s => (
          <div key={s} onClick={() => setActiveSection(s)}
            style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 16px", cursor: "pointer", borderRadius: 8, margin: "2px 8px", color: activeSection === s ? "#fff" : "#6b7280", background: activeSection === s ? "#7b4ff0" : "transparent", fontFamily: "'DM Sans',sans-serif", fontSize: 14, fontWeight: 500, transition: "all 0.15s" }}>
            {sectionIcons[s]}
            {s}
          </div>
        ))}
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflowY: "auto", padding: "32px 40px" }}>

        {/* ── PROFILE ── */}
        {activeSection === "Profile" && (
          <div>
            <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 18, fontWeight: 800, color: "#111118", marginBottom: 4 }}>Company Profile</div>
            <div style={{ fontSize: 13, color: "#6b7280", marginBottom: 28 }}>Update your business information visible to creators</div>

            {/* Avatar */}
            <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 14, padding: "24px 28px", marginBottom: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 24 }}>
                <div style={{ width: 64, height: 64, borderRadius: "50%", background: "linear-gradient(135deg,#6c3ce1,#4e22c4)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Syne',sans-serif", fontSize: 22, fontWeight: 800, color: "#fff" }}>TC</div>
                <div>
                  <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 16, fontWeight: 700, color: "#111118" }}>TechCorp Nigeria</div>
                  <button style={{ background: "#f3f0ff", color: "#7b4ff0", border: "none", borderRadius: 20, padding: "5px 14px", fontFamily: "'DM Sans',sans-serif", fontSize: 12, fontWeight: 600, cursor: "pointer", marginTop: 6 }}>Change Logo</button>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                {[
                  ["Company Name", "companyName", "text"],
                  ["Contact Person", "contactName", "text"],
                  ["Work Email", "email", "email"],
                  ["Phone Number", "phone", "tel"],
                  ["Website", "website", "text"],
                  ["Location", "location", "text"],
                ].map(([label, field, type]) => (
                  <div key={field}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#111118", marginBottom: 6 }}>{label}</div>
                    <input type={type} value={profile[field]} onChange={e => setProfile({ ...profile, [field]: e.target.value })}
                      style={{ width: "100%", height: 44, border: "1.5px solid #e5e7eb", borderRadius: 8, padding: "0 14px", fontFamily: "'DM Sans',sans-serif", fontSize: 14, color: "#111118", outline: "none", background: "#fff", boxSizing: "border-box", transition: "border-color 0.2s" }}
                      onFocus={e => e.target.style.borderColor = "#7b4ff0"}
                      onBlur={e => e.target.style.borderColor = "#e5e7eb"} />
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 16, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                {[["Industry", "industry", ["Technology / Software","FMCG / Consumer Goods","Finance / Fintech","Media & Entertainment","Fashion & Beauty","Food & Beverage","Education","Healthcare","Other"]],
                  ["Company Size", "size", ["1–10","11–50","51–200","200+"]]].map(([label, field, opts]) => (
                  <div key={field}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#111118", marginBottom: 6 }}>{label}</div>
                    <div style={{ position: "relative" }}>
                      <select value={profile[field]} onChange={e => setProfile({ ...profile, [field]: e.target.value })}
                        style={{ width: "100%", height: 44, border: "1.5px solid #e5e7eb", borderRadius: 8, padding: "0 36px 0 14px", fontFamily: "'DM Sans',sans-serif", fontSize: 14, color: "#111118", outline: "none", background: "#fff", cursor: "pointer", appearance: "none", boxSizing: "border-box" }}>
                        {opts.map(o => <option key={o} value={o}>{o}</option>)}
                      </select>
                      <svg style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "#6b7280" }} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
                <button onClick={() => { setProfileSaved(true); setTimeout(() => setProfileSaved(false), 2500); }}
                  style={{ height: 46, padding: "0 28px", background: profileSaved ? "#22c55e" : "#7b4ff0", color: "#fff", border: "none", borderRadius: 50, fontFamily: "'DM Sans',sans-serif", fontSize: 14, fontWeight: 700, cursor: "pointer", transition: "background 0.3s", display: "flex", alignItems: "center", gap: 8 }}>
                  {profileSaved ? <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg> Saved!</> : "Save Changes"}
                </button>
                <button style={{ height: 46, padding: "0 24px", background: "transparent", border: "1.5px solid #e5e7eb", borderRadius: 50, fontFamily: "'DM Sans',sans-serif", fontSize: 14, fontWeight: 600, color: "#6b7280", cursor: "pointer" }}>Cancel</button>
              </div>
            </div>
          </div>
        )}

        {/* ── NOTIFICATIONS ── */}
        {activeSection === "Notifications" && (
          <div>
            <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 18, fontWeight: 800, color: "#111118", marginBottom: 4 }}>Notification Preferences</div>
            <div style={{ fontSize: 13, color: "#6b7280", marginBottom: 28 }}>Choose how and when you receive alerts from Vynder</div>

            {[
              { group: "In-App Notifications", items: [
                ["jobRequests", "Job Request updates", "Get notified when a creator accepts, declines, or responds to your request"],
                ["messages", "New messages", "Alerts for new messages from creators you're working with"],
                ["payments", "Payment updates", "Confirmations, reminders, and receipt notifications"],
                ["briefs", "Brief activity", "New bids and creator matches for your posted briefs"],
              ]},
              { group: "External Channels", items: [
                ["emailDigest", "Email digest", "Receive a daily summary of all activity to your work email"],
                ["smsAlerts", "SMS alerts", "Get urgent notifications via SMS (payments, accepted requests)"],
              ]},
            ].map(section => (
              <div key={section.group} style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 14, marginBottom: 20, overflow: "hidden" }}>
                <div style={{ padding: "18px 24px", borderBottom: "1px solid #e5e7eb", fontFamily: "'Syne',sans-serif", fontSize: 14, fontWeight: 700, color: "#111118" }}>{section.group}</div>
                {section.items.map(([key, label, desc], i, arr) => (
                  <div key={key} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 24px", borderBottom: i < arr.length - 1 ? "1px solid #f3f4f6" : "none" }}>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: "#111118", marginBottom: 3 }}>{label}</div>
                      <div style={{ fontSize: 12.5, color: "#6b7280" }}>{desc}</div>
                    </div>
                    <Toggle checked={notifPrefs[key]} onChange={() => setNotifPrefs(p => ({ ...p, [key]: !p[key] }))} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        {/* ── PAYMENTS ── */}
        {activeSection === "Payments" && (
          <div>
            <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 18, fontWeight: 800, color: "#111118", marginBottom: 4 }}>Payment Settings</div>
            <div style={{ fontSize: 13, color: "#6b7280", marginBottom: 28 }}>Manage your bank account and payment preferences</div>

            <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 14, padding: "24px 28px", marginBottom: 20 }}>
              <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 14, fontWeight: 700, color: "#111118", marginBottom: 18, paddingBottom: 14, borderBottom: "1px solid #e5e7eb" }}>Linked Bank Account</div>
              <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "16px 20px", background: "#f5f6fa", borderRadius: 10, marginBottom: 18 }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: "#f3f0ff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7b4ff0" strokeWidth="1.8" strokeLinecap="round"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "#111118" }}>{paymentInfo.bankName}</div>
                  <div style={{ fontSize: 13, color: "#6b7280" }}>{paymentInfo.accountNumber} · {paymentInfo.accountName}</div>
                </div>
                <span style={{ background: "#dcfce7", color: "#15803d", fontSize: 12, fontWeight: 600, padding: "3px 10px", borderRadius: 20 }}>Verified</span>
              </div>
              <button style={{ background: "transparent", border: "1.5px solid #e5e7eb", borderRadius: 50, height: 42, padding: "0 22px", fontFamily: "'DM Sans',sans-serif", fontSize: 13, fontWeight: 600, color: "#6b7280", cursor: "pointer" }}>Change Account</button>
            </div>

            <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 14, padding: "24px 28px" }}>
              <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 14, fontWeight: 700, color: "#111118", marginBottom: 18, paddingBottom: 14, borderBottom: "1px solid #e5e7eb" }}>Spending Limits</div>
              <div style={{ fontSize: 13, color: "#6b7280", marginBottom: 16 }}>Set a monthly cap on outgoing payments for budget control</div>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ position: "relative", flex: 1 }}>
                  <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", fontSize: 14, fontWeight: 600, color: "#9ca3af" }}>₦</span>
                  <input placeholder="500,000" style={{ width: "100%", height: 44, border: "1.5px solid #e5e7eb", borderRadius: 8, paddingLeft: 30, paddingRight: 14, fontFamily: "'DM Sans',sans-serif", fontSize: 14, color: "#111118", outline: "none", boxSizing: "border-box" }}
                    onFocus={e => e.target.style.borderColor = "#7b4ff0"} onBlur={e => e.target.style.borderColor = "#e5e7eb"} />
                </div>
                <button style={{ height: 44, padding: "0 22px", background: "#7b4ff0", color: "#fff", border: "none", borderRadius: 50, fontFamily: "'DM Sans',sans-serif", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Set Limit</button>
              </div>
            </div>
          </div>
        )}

        {/* ── SECURITY ── */}
        {activeSection === "Security" && (
          <div>
            <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 18, fontWeight: 800, color: "#111118", marginBottom: 4 }}>Security</div>
            <div style={{ fontSize: 13, color: "#6b7280", marginBottom: 28 }}>Keep your account safe and control access</div>

            {/* Password */}
            <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 14, padding: "24px 28px", marginBottom: 20 }}>
              <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 14, fontWeight: 700, color: "#111118", marginBottom: 18, paddingBottom: 14, borderBottom: "1px solid #e5e7eb" }}>Change Password</div>
              {["Current Password", "New Password", "Confirm New Password"].map(label => (
                <div key={label} style={{ marginBottom: 14 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#111118", marginBottom: 6 }}>{label}</div>
                  <input type="password" placeholder="••••••••"
                    style={{ width: "100%", height: 44, border: "1.5px solid #e5e7eb", borderRadius: 8, padding: "0 14px", fontFamily: "'DM Sans',sans-serif", fontSize: 14, outline: "none", boxSizing: "border-box" }}
                    onFocus={e => e.target.style.borderColor = "#7b4ff0"} onBlur={e => e.target.style.borderColor = "#e5e7eb"} />
                </div>
              ))}
              <button style={{ height: 46, padding: "0 28px", background: "#7b4ff0", color: "#fff", border: "none", borderRadius: 50, fontFamily: "'DM Sans',sans-serif", fontSize: 14, fontWeight: 700, cursor: "pointer", marginTop: 4 }}>Update Password</button>
            </div>

            {/* 2FA */}
            <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 14, padding: "24px 28px", marginBottom: 20 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 14, fontWeight: 700, color: "#111118", marginBottom: 4 }}>Two-Factor Authentication</div>
                  <div style={{ fontSize: 13, color: "#6b7280" }}>Add an extra layer of security to your account</div>
                </div>
                <Toggle checked={twoFA} onChange={() => setTwoFA(!twoFA)} />
              </div>
              {twoFA && <div style={{ marginTop: 16, padding: "14px 18px", background: "#f3f0ff", borderRadius: 10, fontSize: 13, color: "#4e22c4", lineHeight: 1.5 }}>2FA is active. You'll receive a code on your phone each time you log in.</div>}
            </div>

            {/* Sessions */}
            <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 14, overflow: "hidden" }}>
              <div style={{ padding: "18px 24px", borderBottom: "1px solid #e5e7eb", fontFamily: "'Syne',sans-serif", fontSize: 14, fontWeight: 700, color: "#111118" }}>Active Sessions</div>
              {sessions.map((s, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 24px", borderBottom: i < sessions.length - 1 ? "1px solid #f3f4f6" : "none" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 8, background: "#f5f6fa", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="1.8" strokeLinecap="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
                    </div>
                    <div>
                      <div style={{ fontSize: 13.5, fontWeight: 600, color: "#111118" }}>{s.device}</div>
                      <div style={{ fontSize: 12, color: "#9ca3af" }}>{s.location} · {s.time}</div>
                    </div>
                  </div>
                  {s.active ? (
                    <span style={{ background: "#dcfce7", color: "#15803d", fontSize: 12, fontWeight: 600, padding: "3px 10px", borderRadius: 20 }}>Current</span>
                  ) : (
                    <button style={{ background: "#fef2f2", color: "#b91c1c", border: "none", borderRadius: 20, padding: "4px 12px", fontFamily: "'DM Sans',sans-serif", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Revoke</button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── TEAM ── */}
        {activeSection === "Team" && (
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
              <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 18, fontWeight: 800, color: "#111118" }}>Team Members</div>
              <button style={{ height: 42, padding: "0 20px", background: "#7b4ff0", color: "#fff", border: "none", borderRadius: 50, fontFamily: "'DM Sans',sans-serif", fontSize: 13, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                Invite Member
              </button>
            </div>
            <div style={{ fontSize: 13, color: "#6b7280", marginBottom: 28 }}>Manage who has access to your Vynder Biz account</div>

            <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 14, overflow: "hidden" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "#fafafa" }}>
                    {["Member", "Email", "Role", "Action"].map(h => (
                      <th key={h} style={{ fontSize: 12, fontWeight: 600, color: "#6b7280", textAlign: "left", padding: "12px 20px", borderBottom: "1px solid #e5e7eb" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {team.map((m, i) => (
                    <tr key={i} style={{ borderBottom: i < team.length - 1 ? "1px solid #f3f4f6" : "none" }}>
                      <td style={{ padding: "16px 20px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <div style={{ width: 36, height: 36, borderRadius: "50%", background: avatarColors[m.color], display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Syne',sans-serif", fontSize: 12, fontWeight: 700, color: "#fff", flexShrink: 0 }}>{m.initials}</div>
                          <span style={{ fontSize: 13.5, fontWeight: 600, color: "#111118" }}>{m.name}</span>
                        </div>
                      </td>
                      <td style={{ padding: "16px 20px", fontSize: 13, color: "#6b7280" }}>{m.email}</td>
                      <td style={{ padding: "16px 20px" }}>
                        <div style={{ position: "relative", display: "inline-block" }}>
                          <select defaultValue={m.role}
                            style={{ border: "1.5px solid #e5e7eb", borderRadius: 20, padding: "5px 28px 5px 12px", fontFamily: "'DM Sans',sans-serif", fontSize: 12, fontWeight: 600, color: "#111118", outline: "none", background: "#fff", cursor: "pointer", appearance: "none" }}>
                            <option>Admin</option>
                            <option>Manager</option>
                            <option>Viewer</option>
                          </select>
                          <svg style={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "#6b7280" }} width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
                        </div>
                      </td>
                      <td style={{ padding: "16px 20px" }}>
                        {m.role !== "Admin" ? (
                          <button style={{ background: "#fef2f2", color: "#b91c1c", border: "none", borderRadius: 20, padding: "5px 14px", fontFamily: "'DM Sans',sans-serif", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Remove</button>
                        ) : (
                          <span style={{ fontSize: 12, color: "#9ca3af" }}>—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={{ background: "#f3f0ff", border: "1px solid #d8ccff", borderRadius: 12, padding: "16px 20px", marginTop: 20 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#4e22c4", marginBottom: 4 }}>Invite via link</div>
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <input readOnly value="https://vynder.ng/invite/techcorp-abc123"
                  style={{ flex: 1, height: 40, border: "1.5px solid #d8ccff", borderRadius: 8, padding: "0 14px", fontFamily: "monospace", fontSize: 13, color: "#4e22c4", background: "#fff", outline: "none", boxSizing: "border-box" }} />
                <button style={{ height: 40, padding: "0 18px", background: "#7b4ff0", color: "#fff", border: "none", borderRadius: 8, fontFamily: "'DM Sans',sans-serif", fontSize: 13, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }}>Copy Link</button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
