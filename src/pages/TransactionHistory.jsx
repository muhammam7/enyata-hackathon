import { useState } from "react";

const transactionsData = [
  { id: "TXN-7743201", type: "Payment", creator: "Chidi Eze", project: "Brand Photography", amount: -85000, status: "paid", date: "Mar 12, 2026", time: "3:40 PM", initials: "CE", color: "green" },
  { id: "TXN-7731004", type: "Payment", creator: "Funmi Adeyemi", project: "Social Media Pack", amount: -60000, status: "paid", date: "Mar 5, 2026", time: "11:22 AM", initials: "FA", color: "orange" },
  { id: "TXN-7710882", type: "Payment", creator: "Amara Okon", project: "Product Launch Video", amount: -120000, status: "pending", date: "Mar 18, 2026", time: "9:05 AM", initials: "AO", color: "" },
  { id: "TXN-7698341", type: "Payment", creator: "Kola Mensah", project: "Website Copywriting", amount: -50000, status: "paid", date: "Feb 28, 2026", time: "2:15 PM", initials: "KM", color: "blue" },
  { id: "TXN-7654221", type: "Refund", creator: "Adaeze Nwosu", project: "Brand Identity (cancelled)", amount: 40000, status: "refunded", date: "Feb 20, 2026", time: "10:00 AM", initials: "AN", color: "pink" },
  { id: "TXN-7612009", type: "Payment", creator: "Taiwo James", project: "Explainer Video", amount: -80000, status: "paid", date: "Feb 14, 2026", time: "4:30 PM", initials: "TJ", color: "" },
];

const statusConfig = {
  paid: { label: "Paid", bg: "#dcfce7", color: "#15803d" },
  pending: { label: "Pending", bg: "#fff7ed", color: "#c2410c" },
  refunded: { label: "Refunded", bg: "#eff6ff", color: "#1d4ed8" },
  failed: { label: "Failed", bg: "#fef2f2", color: "#b91c1c" },
};

const avatarColors = {
  "": "linear-gradient(135deg,#6c3ce1,#4e22c4)",
  green: "linear-gradient(135deg,#22c55e,#16a34a)",
  orange: "linear-gradient(135deg,#f97316,#ea580c)",
  blue: "linear-gradient(135deg,#3b82f6,#1d4ed8)",
  pink: "linear-gradient(135deg,#ec4899,#be185d)",
};

const fmt = (n) => {
  const abs = Math.abs(n).toLocaleString();
  return n < 0 ? `-₦${abs}` : `+₦${abs}`;
};

export default function TransactionHistory() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selected, setSelected] = useState(null);

  const filtered = transactionsData.filter(t => {
    const matchSearch = !search ||
      t.creator.toLowerCase().includes(search.toLowerCase()) ||
      t.project.toLowerCase().includes(search.toLowerCase()) ||
      t.id.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || t.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalSpent = transactionsData.filter(t => t.amount < 0 && t.status === "paid").reduce((s, t) => s + Math.abs(t.amount), 0);
  const totalPending = transactionsData.filter(t => t.status === "pending").reduce((s, t) => s + Math.abs(t.amount), 0);
  const totalRefunded = transactionsData.filter(t => t.status === "refunded").reduce((s, t) => s + t.amount, 0);

  return (
    <div style={{ padding: "32px 36px" }}>
      {/* Summary cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginBottom: 28 }}>
        {[
          { label: "Total Paid", value: `₦${totalSpent.toLocaleString()}`, sub: "All settled payments", color: "#22c55e", bg: "#dcfce7" },
          { label: "Pending Payments", value: `₦${totalPending.toLocaleString()}`, sub: "Awaiting settlement", color: "#f97316", bg: "#fff7ed" },
          { label: "Total Refunded", value: `₦${totalRefunded.toLocaleString()}`, sub: "Returned to wallet", color: "#3b82f6", bg: "#eff6ff" },
        ].map(c => (
          <div key={c.label} style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 14, padding: "20px 24px" }}>
            <div style={{ fontSize: 13, color: "#6b7280", marginBottom: 8 }}>{c.label}</div>
            <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 26, fontWeight: 800, color: "#111118", letterSpacing: -0.5 }}>{c.value}</div>
            <div style={{ marginTop: 6, display: "inline-flex", alignItems: "center", gap: 6, background: c.bg, color: c.color, fontSize: 12, fontWeight: 600, padding: "3px 10px", borderRadius: 20 }}>{c.sub}</div>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 14, padding: "16px 20px", display: "flex", alignItems: "center", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
        {/* Search */}
        <div style={{ position: "relative", flex: 1, minWidth: 200 }}>
          <svg style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#9ca3af", pointerEvents: "none" }} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input
            value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search transactions..."
            style={{ width: "100%", height: 42, border: "1.5px solid #e5e7eb", borderRadius: 8, paddingLeft: 40, paddingRight: 14, fontFamily: "'DM Sans',sans-serif", fontSize: 14, color: "#111118", outline: "none", background: "#f5f6fa", boxSizing: "border-box" }}
          />
        </div>

        {/* Date inputs */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 13, color: "#6b7280", whiteSpace: "nowrap" }}>Start Date</span>
          <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)}
            style={{ height: 42, border: "1.5px solid #e5e7eb", borderRadius: 8, padding: "0 12px", fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: "#111118", outline: "none", background: "#fff", cursor: "pointer" }} />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 13, color: "#6b7280", whiteSpace: "nowrap" }}>End Date</span>
          <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)}
            style={{ height: 42, border: "1.5px solid #e5e7eb", borderRadius: 8, padding: "0 12px", fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: "#111118", outline: "none", background: "#fff", cursor: "pointer" }} />
        </div>

        {/* Status filter */}
        <div style={{ position: "relative" }}>
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
            style={{ height: 42, border: "1.5px solid #e5e7eb", borderRadius: 8, padding: "0 36px 0 14px", fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: "#111118", outline: "none", background: "#fff", cursor: "pointer", appearance: "none", minWidth: 130 }}>
            <option value="all">All Status</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
            <option value="refunded">Refunded</option>
            <option value="failed">Failed</option>
          </select>
          <svg style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "#6b7280" }} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
        </div>

        {/* Export btn */}
        <button style={{ height: 42, background: "#f3f0ff", color: "#7b4ff0", border: "none", borderRadius: 8, padding: "0 18px", fontFamily: "'DM Sans',sans-serif", fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 6, whiteSpace: "nowrap" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          Export CSV
        </button>
      </div>

      {/* Table */}
      <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 14, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#fafafa" }}>
              {["Type", "Creator / Recipient", "Transaction ID", "Project", "Amount", "Status", "Date / Time", "Action"].map(h => (
                <th key={h} style={{ fontSize: 12, fontWeight: 600, color: "#6b7280", textAlign: "left", padding: "12px 20px", borderBottom: "1px solid #e5e7eb" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={8} style={{ textAlign: "center", color: "#9ca3af", padding: "48px", fontSize: 14 }}>No transactions found</td></tr>
            ) : filtered.map(t => {
              const sc = statusConfig[t.status] || statusConfig.paid;
              return (
                <tr key={t.id} style={{ borderBottom: "1px solid #e5e7eb", transition: "background 0.15s" }}
                  onMouseEnter={e => e.currentTarget.style.background = "#fafafa"}
                  onMouseLeave={e => e.currentTarget.style.background = ""}>
                  <td style={{ padding: "16px 20px" }}>
                    <span style={{ background: t.amount < 0 ? "#fef2f2" : "#dcfce7", color: t.amount < 0 ? "#b91c1c" : "#15803d", fontSize: 12, fontWeight: 600, padding: "4px 10px", borderRadius: 20 }}>{t.type}</span>
                  </td>
                  <td style={{ padding: "16px 20px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: 32, height: 32, borderRadius: "50%", background: avatarColors[t.color], display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Syne',sans-serif", fontSize: 11, fontWeight: 700, color: "#fff", flexShrink: 0 }}>{t.initials}</div>
                      <span style={{ fontSize: 13.5, fontWeight: 600, color: "#111118" }}>{t.creator}</span>
                    </div>
                  </td>
                  <td style={{ padding: "16px 20px", fontSize: 13, color: "#6b7280", fontFamily: "monospace" }}>{t.id}</td>
                  <td style={{ padding: "16px 20px", fontSize: 13, color: "#6b7280" }}>{t.project}</td>
                  <td style={{ padding: "16px 20px", fontSize: 14, fontWeight: 700, color: t.amount < 0 ? "#ef4444" : "#22c55e" }}>{fmt(t.amount)}</td>
                  <td style={{ padding: "16px 20px" }}>
                    <span style={{ background: sc.bg, color: sc.color, fontSize: 12, fontWeight: 600, padding: "4px 12px", borderRadius: 20 }}>{sc.label}</span>
                  </td>
                  <td style={{ padding: "16px 20px", fontSize: 13, color: "#6b7280" }}>{t.date} · {t.time}</td>
                  <td style={{ padding: "16px 20px" }}>
                    <button onClick={() => setSelected(selected?.id === t.id ? null : t)}
                      style={{ background: "#f3f0ff", color: "#7b4ff0", border: "none", borderRadius: 20, padding: "5px 14px", fontFamily: "'DM Sans',sans-serif", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
                      View Details
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Detail drawer */}
      {selected && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(10,5,30,0.5)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999, padding: 20 }}
          onClick={() => setSelected(null)}>
          <div style={{ background: "#fff", borderRadius: 20, width: "100%", maxWidth: 480, padding: 32, animation: "slideUp 0.3s cubic-bezier(0.34,1.56,0.64,1)", boxShadow: "0 24px 80px rgba(0,0,0,0.2)" }}
            onClick={e => e.stopPropagation()}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
              <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 18, fontWeight: 800, color: "#111118" }}>Transaction Details</div>
              <button onClick={() => setSelected(null)} style={{ width: 32, height: 32, borderRadius: "50%", background: "#f5f6fa", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#6b7280", fontSize: 18 }}>×</button>
            </div>

            {/* Amount hero */}
            <div style={{ background: selected.amount < 0 ? "#fef2f2" : "#dcfce7", borderRadius: 12, padding: "20px 24px", marginBottom: 24, textAlign: "center" }}>
              <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 36, fontWeight: 800, color: selected.amount < 0 ? "#ef4444" : "#22c55e", letterSpacing: -1 }}>{fmt(selected.amount)}</div>
              <div style={{ fontSize: 13, color: "#6b7280", marginTop: 4 }}>{selected.type} · {selected.date}</div>
            </div>

            {[
              ["Transaction ID", selected.id],
              ["Creator / Recipient", selected.creator],
              ["Project", selected.project],
              ["Status", selected.status.charAt(0).toUpperCase() + selected.status.slice(1)],
              ["Date & Time", `${selected.date} at ${selected.time}`],
            ].map(([l, v]) => (
              <div key={l} style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid #f3f4f6" }}>
                <span style={{ fontSize: 13, color: "#6b7280" }}>{l}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: "#111118" }}>{v}</span>
              </div>
            ))}

            <button style={{ width: "100%", height: 48, background: "#7b4ff0", color: "#fff", border: "none", borderRadius: 50, fontFamily: "'DM Sans',sans-serif", fontSize: 14, fontWeight: 700, cursor: "pointer", marginTop: 24 }}>
              Download Receipt
            </button>
          </div>
        </div>
      )}

      <style>{`@keyframes slideUp { from { opacity:0; transform:translateY(24px) scale(0.97); } to { opacity:1; transform:translateY(0) scale(1); } }`}</style>
    </div>
  );
}
