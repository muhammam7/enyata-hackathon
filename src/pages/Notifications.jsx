import { useState } from "react";

const notificationsData = [
  {
    id: 1, type: "job_request", read: false,
    title: "Job Request Accepted",
    body: "Amara Okon accepted your request for the Product Launch Video project.",
    time: "11:42 AM", date: "Today",
    initials: "AO", color: "",
    action: "View Request",
  },
  {
    id: 2, type: "message", read: false,
    title: "New Message from Chidi Eze",
    body: "All photos uploaded to the shared drive. 47 final selects, all edited to brand spec.",
    time: "9:01 AM", date: "Today",
    initials: "CE", color: "green",
    action: "Open Message",
  },
  {
    id: 3, type: "payment", read: false,
    title: "Payment Pending Reminder",
    body: "You have an outstanding payment of ₦120,000 to Amara Okon for Product Launch Video.",
    time: "8:30 AM", date: "Today",
    initials: "💳", color: "icon",
    action: "Make Payment",
  },
  {
    id: 4, type: "brief", read: true,
    title: "New Bid on Your Brief",
    body: "Funmi Adeyemi submitted a bid on your Monthly Social Content brief — ₦65,000/month.",
    time: "3:12 PM", date: "Yesterday",
    initials: "FA", color: "orange",
    action: "View Bid",
  },
  {
    id: 5, type: "job_request", read: true,
    title: "Job Request Declined",
    body: "Adaeze Nwosu declined your request for Product Launch Video. She is fully booked through May.",
    time: "1:00 PM", date: "Yesterday",
    initials: "AN", color: "pink",
    action: "Browse Creators",
  },
  {
    id: 6, type: "payment", read: true,
    title: "Payment Confirmed",
    body: "Your payment of ₦60,000 to Funmi Adeyemi for Social Media Pack was successful.",
    time: "11:22 AM", date: "Mar 5, 2026",
    initials: "💳", color: "icon",
    action: "View Receipt",
  },
  {
    id: 7, type: "brief", read: true,
    title: "Brief Matched with Creators",
    body: "Your brief 'Product Launch Video' has been matched with 6 creators by our AI. Start reviewing bids.",
    time: "10:00 AM", date: "Mar 15, 2026",
    initials: "✦", color: "ai",
    action: "View Matches",
  },
];

const typeConfig = {
  job_request: { label: "Job Request", bg: "#f3f0ff", color: "#7b4ff0" },
  message: { label: "Message", bg: "#dbeafe", color: "#1d4ed8" },
  payment: { label: "Payment", bg: "#dcfce7", color: "#15803d" },
  brief: { label: "Brief", bg: "#fff7ed", color: "#c2410c" },
};

const avatarColors = {
  "": "linear-gradient(135deg,#6c3ce1,#4e22c4)",
  green: "linear-gradient(135deg,#22c55e,#16a34a)",
  orange: "linear-gradient(135deg,#f97316,#ea580c)",
  blue: "linear-gradient(135deg,#3b82f6,#1d4ed8)",
  pink: "linear-gradient(135deg,#ec4899,#be185d)",
  icon: "linear-gradient(135deg,#6c3ce1,#3a1a8a)",
  ai: "linear-gradient(135deg,#4e22c4,#7b4ff0)",
};

export default function Notifications() {
  const [notifications, setNotifications] = useState(notificationsData);
  const [filter, setFilter] = useState("all");

  const unreadCount = notifications.filter(n => !n.read).length;

  const filtered = notifications.filter(n => {
    if (filter === "unread") return !n.read;
    if (filter === "read") return n.read;
    return true;
  });

  const markAllRead = () => setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  const markRead = (id) => setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  const deleteNotif = (id) => setNotifications(prev => prev.filter(n => n.id !== id));

  // Group by date
  const grouped = filtered.reduce((acc, n) => {
    if (!acc[n.date]) acc[n.date] = [];
    acc[n.date].push(n);
    return acc;
  }, {});

  return (
    <div style={{ padding: "32px 36px" }}>
      {/* Header row */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {["all", "unread", "read"].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              style={{
                height: 38, padding: "0 18px", borderRadius: 50, border: "1.5px solid",
                borderColor: filter === f ? "#7b4ff0" : "#e5e7eb",
                background: filter === f ? "#7b4ff0" : "#fff",
                color: filter === f ? "#fff" : "#6b7280",
                fontFamily: "'DM Sans',sans-serif", fontSize: 13, fontWeight: 600, cursor: "pointer",
                display: "flex", alignItems: "center", gap: 6, transition: "all 0.2s",
              }}>
              {f.charAt(0).toUpperCase() + f.slice(1)}
              {f === "unread" && unreadCount > 0 && (
                <span style={{ background: filter === "unread" ? "rgba(255,255,255,0.25)" : "#7b4ff0", color: "#fff", borderRadius: 20, fontSize: 11, fontWeight: 700, padding: "1px 6px" }}>{unreadCount}</span>
              )}
            </button>
          ))}
        </div>

        {unreadCount > 0 && (
          <button onClick={markAllRead}
            style={{ height: 38, padding: "0 18px", borderRadius: 50, border: "1.5px solid #e5e7eb", background: "#fff", color: "#6b7280", fontFamily: "'DM Sans',sans-serif", fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
            Mark all as read
          </button>
        )}
      </div>

      {/* Notifications list */}
      {filtered.length === 0 ? (
        <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 14, padding: "60px 40px", textAlign: "center" }}>
          <div style={{ fontSize: 40, marginBottom: 16 }}>🔔</div>
          <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 18, fontWeight: 800, color: "#111118", marginBottom: 8 }}>All caught up</div>
          <div style={{ fontSize: 14, color: "#6b7280" }}>No notifications here.</div>
        </div>
      ) : (
        Object.entries(grouped).map(([date, items]) => (
          <div key={date} style={{ marginBottom: 28 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>{date}</div>
            <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 14, overflow: "hidden" }}>
              {items.map((n, i) => {
                const tc = typeConfig[n.type] || typeConfig.brief;
                const isLast = i === items.length - 1;
                return (
                  <div key={n.id}
                    style={{ display: "flex", alignItems: "flex-start", gap: 16, padding: "18px 20px", borderBottom: isLast ? "none" : "1px solid #f3f4f6", background: n.read ? "#fff" : "#fdfcff", position: "relative", cursor: n.read ? "default" : "pointer", transition: "background 0.15s" }}
                    onMouseEnter={e => { if (!n.read) e.currentTarget.style.background = "#f9f7ff"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = n.read ? "#fff" : "#fdfcff"; }}
                    onClick={() => !n.read && markRead(n.id)}>

                    {/* Unread dot */}
                    {!n.read && <div style={{ position: "absolute", left: 8, top: "50%", transform: "translateY(-50%)", width: 6, height: 6, borderRadius: "50%", background: "#7b4ff0" }} />}

                    {/* Avatar */}
                    <div style={{ width: 44, height: 44, borderRadius: "50%", background: avatarColors[n.color], display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Syne',sans-serif", fontSize: n.color === "icon" || n.color === "ai" ? 18 : 13, fontWeight: 700, color: "#fff", flexShrink: 0 }}>
                      {n.initials}
                    </div>

                    {/* Content */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                        <span style={{ fontFamily: "'Syne',sans-serif", fontSize: 14, fontWeight: 700, color: "#111118" }}>{n.title}</span>
                        <span style={{ background: tc.bg, color: tc.color, fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 20, flexShrink: 0 }}>{tc.label}</span>
                      </div>
                      <div style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.5, marginBottom: 8 }}>{n.body}</div>
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <button style={{ background: "#f3f0ff", color: "#7b4ff0", border: "none", borderRadius: 20, padding: "5px 14px", fontFamily: "'DM Sans',sans-serif", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
                          {n.action}
                        </button>
                        <span style={{ fontSize: 12, color: "#9ca3af" }}>{n.time}</span>
                      </div>
                    </div>

                    {/* Delete btn */}
                    <button onClick={e => { e.stopPropagation(); deleteNotif(n.id); }}
                      style={{ width: 28, height: 28, borderRadius: "50%", background: "transparent", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#d1d5db", flexShrink: 0, transition: "background 0.15s, color 0.15s" }}
                      onMouseEnter={e => { e.currentTarget.style.background = "#fef2f2"; e.currentTarget.style.color = "#ef4444"; }}
                      onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#d1d5db"; }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
