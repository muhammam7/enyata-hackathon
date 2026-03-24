// src/pages/Sidebar.jsx
import NavIcon from "./NavIcon"; // make sure this import exists

function Sidebar({ currentPage, onNavigate, menuOpen, setMenuOpen, accountOpen, setAccountOpen }) {
  const navItems = [
    { label: "Dashboard", icon: "grid", page: "dashboard" },
    { label: "Job Requests", icon: "briefcase", badge: 2, page: "jobs" },
    { label: "Messages", icon: "message", badge: 3, page: "messages" },
    { label: "Notifications", icon: "bell", page: "notifications" },
    { label: "Transaction History", icon: "clock", page: "transactions" },
  ];

  return (
    <aside className="sidebar">
      <div>
        <div className="sidebar-brand">
          <span className="brand-name">vynder</span>
          <span className="biz-badge">Biz</span>
        </div>

        <div className="sidebar-company">TechCorp Nigeria</div>

        {/* MENU */}
        <div className="sidebar-section-label" onClick={() => setMenuOpen(!menuOpen)}>
          MENU
          <svg
            className={`section-chevron ${!menuOpen ? "collapsed" : ""}`}
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <polyline points="18 15 12 9 6 15" />
          </svg>
        </div>

        <div className={`nav-group ${!menuOpen ? "collapsed" : ""}`}>
          {navItems.map((item) => (
            <div
              key={item.page}
              className={`nav-item ${currentPage === item.page ? "active" : ""}`}
              onClick={() => onNavigate(item.page)}
            >
              <span className={`nav-icon icon-${item.icon}`}></span>
              {item.label}
              {item.badge && <span className="nav-badge">{item.badge}</span>}
            </div>
          ))}
        </div>

        {/* ACCOUNT */}
        <div className="sidebar-bottom">
          <div className="sidebar-section-label" onClick={() => setAccountOpen(!accountOpen)}>
            ACCOUNT
            <svg
              className={`section-chevron ${!accountOpen ? "collapsed" : ""}`}
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <polyline points="18 15 12 9 6 15" />
            </svg>
          </div>

          <div className={`nav-group ${!accountOpen ? "collapsed" : ""}`}>
            <div className="nav-item" onClick={() => onNavigate("settings")}>
              <NavIcon type="settings" /> Settings
            </div>
            <div className="nav-item logout">
              <NavIcon type="logout" /> Logout
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;