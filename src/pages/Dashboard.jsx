import { useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --purple-deep: #3a1a8a;
    --purple-mid: #4e22c4;
    --purple-bright: #6c3ce1;
    --purple-btn: #7b4ff0;
    --purple-light: #f3f0ff;
    --green: #22c55e;
    --green-light: #dcfce7;
    --orange: #f97316;
    --orange-light: #fff7ed;
    --red: #ef4444;
    --text-dark: #111118;
    --text-muted: #6b7280;
    --border: #e5e7eb;
    --bg: #f5f6fa;
    --white: #ffffff;
    --sidebar-w: 248px;
    --radius: 14px;
    --radius-sm: 8px;
  }

  body { font-family: 'DM Sans', sans-serif; background: var(--bg); }
  .layout { display: flex; min-height: 100vh; }

  .sidebar {
    width: var(--sidebar-w);
    background: var(--white);
    border-right: 1px solid var(--border);
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0; left: 0; bottom: 0;
    z-index: 100;
    padding: 28px 0;
    overflow-y: auto;
  }

  .sidebar-brand {
    display: flex; align-items: center; gap: 8px;
    padding: 0 24px 20px;
    border-bottom: 1px solid var(--border);
  }

  .brand-name { font-family: 'Syne', sans-serif; font-size: 22px; font-weight: 800; color: var(--text-dark); letter-spacing: -0.5px; }
  .biz-badge { background: var(--purple-light); color: var(--purple-bright); font-size: 11px; font-weight: 600; padding: 2px 8px; border-radius: 20px; }
  .sidebar-company { font-size: 13px; color: var(--text-muted); padding: 14px 24px 0; font-weight: 500; }

  .sidebar-section-label {
    font-size: 10.5px; font-weight: 700; letter-spacing: 0.08em; color: #9ca3af;
    text-transform: uppercase; padding: 18px 24px 6px;
    display: flex; align-items: center; justify-content: space-between;
    cursor: pointer; user-select: none; transition: color 0.2s;
  }

  .sidebar-section-label:hover { color: #6b7280; }
  .section-chevron { transition: transform 0.25s ease; flex-shrink: 0; }
  .section-chevron.collapsed { transform: rotate(-90deg); }

  .nav-group {
    overflow: hidden;
    max-height: 400px;
    transition: max-height 0.3s ease, opacity 0.25s ease;
    opacity: 1;
  }

  .nav-group.collapsed { max-height: 0; opacity: 0; }

  .nav-item {
    display: flex; align-items: center; gap: 12px;
    padding: 10px 24px;
    font-size: 14px; font-weight: 500; color: var(--text-muted);
    cursor: pointer; transition: background 0.15s, color 0.15s;
    position: relative; user-select: none;
  }

  .nav-item:hover { background: var(--bg); color: var(--text-dark); }

  .nav-item.active {
    background: var(--purple-btn); color: var(--white);
    margin: 2px 12px; border-radius: var(--radius-sm); padding: 10px 12px;
  }

  .nav-item.active svg { stroke: var(--white) !important; }

  .nav-badge {
    margin-left: auto; background: var(--purple-btn); color: var(--white);
    font-size: 11px; font-weight: 700; padding: 1px 7px; border-radius: 20px; min-width: 20px; text-align: center;
  }

  .nav-item.active .nav-badge { background: rgba(255,255,255,0.25); }
  .nav-icon { width: 18px; height: 18px; stroke: currentColor; fill: none; flex-shrink: 0; }
  .sidebar-bottom { margin-top: auto; border-top: 1px solid var(--border); padding-top: 4px; }
  .nav-item.logout { color: #ef4444; }
  .nav-item.logout:hover { background: #fef2f2; }
  .nav-item.logout svg { stroke: #ef4444 !important; }

  .main { margin-left: var(--sidebar-w); flex: 1; display: flex; flex-direction: column; min-height: 100vh; }

  .topbar {
    background: var(--white); border-bottom: 1px solid var(--border);
    padding: 18px 36px; display: flex; align-items: center; justify-content: space-between;
    position: sticky; top: 0; z-index: 50;
  }

  .topbar-left h1 { font-family: 'Syne', sans-serif; font-size: 20px; font-weight: 800; color: var(--text-dark); letter-spacing: -0.4px; }
  .topbar-left p { font-size: 13px; color: var(--text-muted); margin-top: 2px; }
  .topbar-right { display: flex; align-items: center; gap: 12px; }

  .icon-btn {
    width: 40px; height: 40px; border-radius: 50%;
    border: 1.5px solid var(--border); background: var(--white);
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; position: relative; transition: border-color 0.2s, background 0.2s;
  }

  .icon-btn:hover { border-color: var(--purple-bright); background: var(--purple-light); }

  .notif-dot {
    position: absolute; top: 7px; right: 7px;
    width: 8px; height: 8px; background: var(--red);
    border-radius: 50%; border: 1.5px solid var(--white);
  }

  .content { padding: 32px 36px; }

  .greeting-row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 28px; }
  .greeting-row h2 { font-family: 'Syne', sans-serif; font-size: 26px; font-weight: 800; color: var(--text-dark); letter-spacing: -0.5px; }
  .greeting-row p { font-size: 13.5px; color: var(--text-muted); margin-top: 4px; }

  .post-btn {
    display: flex; align-items: center; gap: 8px;
    background: var(--purple-btn); color: var(--white); border: none; border-radius: 50px;
    padding: 12px 22px; font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 600;
    cursor: pointer; transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
    position: relative; overflow: hidden;
  }

  .post-btn:hover { background: #6a40e0; box-shadow: 0 6px 20px rgba(108,60,225,0.3); }
  .post-btn:active { transform: scale(0.97); }

  .ripple {
    position: absolute; border-radius: 50%;
    background: rgba(255,255,255,0.3); transform: scale(0);
    animation: rippleAnim 0.55s linear; pointer-events: none;
  }

  @keyframes rippleAnim { to { transform: scale(4); opacity: 0; } }

  .stats-banner {
    background: linear-gradient(135deg, #2a0f7a 0%, #5128d4 60%, #3a1a8a 100%);
    border-radius: var(--radius); padding: 28px 32px;
    display: flex; align-items: center; margin-bottom: 24px;
    position: relative; overflow: hidden;
  }

  .stats-banner::before {
    content: ''; position: absolute; width: 260px; height: 260px;
    border-radius: 50%; background: rgba(255,255,255,0.04); top: -80px; right: 200px;
  }

  .stat-block { flex: 1; padding: 0 28px; border-right: 1px solid rgba(255,255,255,0.15); }
  .stat-block:first-child { padding-left: 0; }
  .stat-block:last-child { border-right: none; }
  .stat-label { font-size: 12.5px; color: rgba(255,255,255,0.65); font-weight: 500; margin-bottom: 8px; }
  .stat-value { font-family: 'Syne', sans-serif; font-size: 28px; font-weight: 800; color: var(--white); letter-spacing: -0.5px; margin-bottom: 8px; }
  .stat-sub { font-size: 12px; color: rgba(255,255,255,0.55); }
  .stat-badge { display: inline-flex; align-items: center; gap: 4px; padding: 3px 8px; border-radius: 20px; font-size: 11.5px; font-weight: 600; }
  .stat-badge.green { background: rgba(34,197,94,0.2); color: #4ade80; }
  .stat-badge.orange { background: rgba(249,115,22,0.2); color: #fb923c; }
  .banner-actions { display: flex; flex-direction: column; gap: 10px; padding-left: 28px; flex-shrink: 0; }

  .make-payment-btn {
    background: var(--white); color: var(--purple-btn); border: none; border-radius: 50px;
    padding: 11px 22px; font-family: 'DM Sans', sans-serif; font-size: 13.5px; font-weight: 700;
    cursor: pointer; transition: background 0.2s, transform 0.15s; white-space: nowrap;
    position: relative; overflow: hidden;
  }

  .make-payment-btn:hover { background: #f3f0ff; }
  .make-payment-btn:active { transform: scale(0.97); }

  .view-history-btn {
    background: transparent; color: rgba(255,255,255,0.8); border: none;
    font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500;
    cursor: pointer; text-decoration: underline; text-underline-offset: 2px;
    transition: color 0.2s; text-align: center;
  }

  .view-history-btn:hover { color: var(--white); }

  .metrics-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 32px; }

  .metric-card {
    background: var(--white); border: 1px solid var(--border); border-radius: var(--radius);
    padding: 20px 22px; transition: box-shadow 0.2s, transform 0.2s; cursor: default;
  }

  .metric-card:hover { box-shadow: 0 4px 20px rgba(0,0,0,0.07); transform: translateY(-2px); }
  .metric-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; }
  .metric-title { font-size: 13px; color: var(--text-muted); font-weight: 500; }
  .metric-icon { width: 34px; height: 34px; border-radius: 8px; display: flex; align-items: center; justify-content: center; }
  .metric-icon.blue { background: #eff6ff; }
  .metric-icon.purple { background: var(--purple-light); }
  .metric-icon.green { background: var(--green-light); }
  .metric-icon.orange { background: var(--orange-light); }
  .metric-value { font-family: 'Syne', sans-serif; font-size: 30px; font-weight: 800; color: var(--text-dark); letter-spacing: -0.5px; margin-bottom: 6px; }
  .metric-sub { font-size: 12px; color: var(--text-muted); }

  .bottom-grid { display: grid; grid-template-columns: 1fr 340px; gap: 24px; }

  .section-card { background: var(--white); border: 1px solid var(--border); border-radius: var(--radius); overflow: hidden; }
  .section-header { display: flex; align-items: center; justify-content: space-between; padding: 20px 24px 16px; border-bottom: 1px solid var(--border); }
  .section-title { font-family: 'Syne', sans-serif; font-size: 15px; font-weight: 700; color: var(--text-dark); }

  .view-all-btn {
    display: flex; align-items: center; gap: 4px;
    font-size: 13px; color: var(--purple-bright); font-weight: 600;
    cursor: pointer; background: none; border: none; transition: gap 0.2s;
  }

  .view-all-btn:hover { gap: 8px; }

  table { width: 100%; border-collapse: collapse; }
  thead th { font-size: 12px; font-weight: 600; color: var(--text-muted); text-align: left; padding: 12px 24px; background: #fafafa; border-bottom: 1px solid var(--border); }
  tbody tr { border-bottom: 1px solid var(--border); transition: background 0.15s; }
  tbody tr:last-child { border-bottom: none; }
  tbody tr:hover { background: #fafafa; }
  tbody td { padding: 16px 24px; font-size: 13.5px; color: var(--text-dark); font-weight: 500; }
  .amount-neg { color: var(--red); font-weight: 600; }
  .status-pill { display: inline-flex; align-items: center; padding: 4px 10px; border-radius: 20px; font-size: 12px; font-weight: 600; }
  .status-pill.pending { background: #fff7ed; color: #c2410c; }
  .status-pill.paid { background: var(--green-light); color: #15803d; }
  .status-pill.in-progress { background: var(--purple-light); color: var(--purple-btn); }

  .creators-panel { display: flex; flex-direction: column; gap: 0; }
  .ai-badge { display: inline-flex; align-items: center; gap: 6px; background: var(--purple-light); color: var(--purple-bright); font-size: 11.5px; font-weight: 600; padding: 5px 10px; border-radius: 20px; margin: 16px 20px 8px; }
  .creator-card { padding: 16px 20px; border-bottom: 1px solid var(--border); transition: background 0.15s; }
  .creator-card:last-child { border-bottom: none; }
  .creator-card:hover { background: #fafafa; }
  .creator-top { display: flex; align-items: flex-start; gap: 12px; margin-bottom: 8px; }
  .avatar { width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-family: 'Syne', sans-serif; font-size: 13px; font-weight: 700; color: var(--white); flex-shrink: 0; background: linear-gradient(135deg, #6c3ce1, #4e22c4); }
  .creator-info { flex: 1; min-width: 0; }
  .creator-name { font-size: 14px; font-weight: 600; color: var(--text-dark); }
  .creator-role { font-size: 12px; color: var(--text-muted); margin-top: 1px; }
  .creator-score { font-family: 'Syne', sans-serif; font-size: 13px; font-weight: 700; color: var(--purple-bright); background: var(--purple-light); padding: 3px 8px; border-radius: 6px; }
  .creator-desc { font-size: 12.5px; color: var(--text-muted); line-height: 1.5; margin-bottom: 10px; }
  .view-profile-btn { width: 100%; background: transparent; border: 1.5px solid var(--border); border-radius: 50px; padding: 8px; font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 600; color: var(--purple-bright); cursor: pointer; transition: background 0.2s, border-color 0.2s; }
  .view-profile-btn:hover { background: var(--purple-light); border-color: var(--purple-bright); }

  /* ── PAYMENT MODAL ── */
  .modal-overlay {
    position: fixed; inset: 0;
    background: rgba(10,5,30,0.62); backdrop-filter: blur(8px);
    display: flex; align-items: center; justify-content: center;
    z-index: 999; animation: fadeIn 0.25s ease; padding: 20px;
  }

  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

  .modal {
    background: var(--white); border-radius: 20px;
    width: 100%; max-width: 480px; max-height: 92vh; overflow-y: auto;
    animation: slideUp 0.3s cubic-bezier(0.34,1.56,0.64,1);
    box-shadow: 0 24px 80px rgba(0,0,0,0.2);
  }

  @keyframes slideUp {
    from { opacity: 0; transform: translateY(32px) scale(0.97); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }

  .modal-step { padding: 28px 32px; }
  .modal-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 4px; }
  .modal-title { font-family: 'Syne', sans-serif; font-size: 20px; font-weight: 800; color: var(--text-dark); }
  .modal-subtitle { font-size: 13px; color: var(--text-muted); margin-bottom: 22px; }

  .modal-close {
    width: 32px; height: 32px; border-radius: 50%; background: var(--bg); border: none;
    cursor: pointer; display: flex; align-items: center; justify-content: center;
    color: var(--text-muted); font-size: 18px; transition: background 0.2s; flex-shrink: 0;
  }

  .modal-close:hover { background: var(--border); }

  .modal-steps-bar {
    display: flex; align-items: center;
    margin-bottom: 24px; background: var(--bg); border-radius: 12px; padding: 4px;
  }

  .modal-step-tab {
    flex: 1; text-align: center; font-size: 12px; font-weight: 600; color: var(--text-muted);
    padding: 8px 4px; border-radius: 8px; transition: background 0.2s, color 0.2s;
  }

  .modal-step-tab.active { background: var(--white); color: var(--purple-bright); box-shadow: 0 1px 4px rgba(0,0,0,0.08); }
  .modal-step-tab.done { color: var(--green); }

  .modal-field { display: flex; flex-direction: column; gap: 5px; margin-bottom: 14px; }
  .modal-label { font-size: 13px; font-weight: 600; color: var(--text-dark); }

  .modal-input {
    height: 46px; border: 1.5px solid var(--border); border-radius: var(--radius-sm);
    padding: 0 14px; font-family: 'DM Sans', sans-serif; font-size: 14px; color: var(--text-dark);
    outline: none; transition: border-color 0.2s, box-shadow 0.2s;
    width: 100%; background: var(--white); appearance: none; -webkit-appearance: none;
  }

  .modal-input:focus { border-color: var(--purple-bright); box-shadow: 0 0 0 3px rgba(108,60,225,0.12); }
  .modal-input::placeholder { color: #adb5bd; }
  .modal-input.has-error { border-color: var(--red); }

  .modal-textarea {
    border: 1.5px solid var(--border); border-radius: var(--radius-sm);
    padding: 12px 14px; font-family: 'DM Sans', sans-serif; font-size: 14px; color: var(--text-dark);
    outline: none; transition: border-color 0.2s, box-shadow 0.2s;
    width: 100%; background: var(--white); resize: vertical; min-height: 100px; line-height: 1.5;
  }

  .modal-textarea:focus { border-color: var(--purple-bright); box-shadow: 0 0 0 3px rgba(108,60,225,0.12); }
  .modal-textarea::placeholder { color: #adb5bd; }

  .modal-select-wrap { position: relative; }
  .modal-select-wrap .modal-input { cursor: pointer; padding-right: 36px; }
  .modal-select-arrow { position: absolute; right: 12px; top: 50%; transform: translateY(-50%); pointer-events: none; color: var(--text-muted); }

  .payment-summary {
    background: var(--bg); border: 1px solid var(--border); border-radius: var(--radius-sm);
    padding: 16px; margin-bottom: 18px;
  }

  .summary-row { display: flex; justify-content: space-between; align-items: center; font-size: 13.5px; padding: 5px 0; color: var(--text-muted); }
  .summary-row span:last-child { font-weight: 600; color: var(--text-dark); }
  .summary-divider { border: none; border-top: 1px solid var(--border); margin: 10px 0; }
  .summary-total { font-size: 15px !important; }
  .summary-total span:last-child { color: var(--purple-bright) !important; font-size: 16px !important; font-family: 'Syne', sans-serif; font-weight: 800 !important; }

  .payment-methods { display: flex; flex-direction: column; gap: 10px; margin-bottom: 18px; }

  .method-option {
    border: 1.5px solid var(--border); border-radius: var(--radius-sm);
    padding: 13px 16px; cursor: pointer; transition: border-color 0.2s, background 0.2s;
    display: flex; align-items: center; gap: 14px;
  }

  .method-option:hover { border-color: var(--purple-bright); background: var(--purple-light); }
  .method-option.selected { border-color: var(--purple-bright); background: var(--purple-light); }

  .method-radio { width: 18px; height: 18px; border-radius: 50%; border: 2px solid var(--border); display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: border-color 0.2s; }
  .method-option.selected .method-radio { border-color: var(--purple-bright); }
  .method-radio-inner { width: 9px; height: 9px; border-radius: 50%; background: var(--purple-bright); opacity: 0; transition: opacity 0.2s; }
  .method-option.selected .method-radio-inner { opacity: 1; }

  .method-icon { width: 44px; height: 28px; border-radius: 5px; display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: 800; flex-shrink: 0; }
  .method-icon.interswitch { background: #e63946; color: white; font-size: 8.5px; letter-spacing: -0.2px; }
  .method-icon.card { background: linear-gradient(135deg, #1a1a2e, #16213e); color: white; font-size: 10px; }
  .method-icon.transfer { background: var(--green-light); color: var(--green); font-size: 16px; }
  .method-icon.ussd { background: #fff3cd; color: #856404; font-size: 13px; }

  .method-info { flex: 1; }
  .method-name { font-size: 13.5px; font-weight: 600; color: var(--text-dark); }
  .method-desc { font-size: 11.5px; color: var(--text-muted); margin-top: 1px; }

  .card-form {
    background: var(--bg); border: 1px solid var(--border); border-radius: var(--radius-sm);
    padding: 16px; margin-top: 10px; display: flex; flex-direction: column; gap: 12px;
    animation: fadeIn 0.2s ease;
  }

  .card-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }

  .card-input {
    height: 42px; border: 1.5px solid var(--border); border-radius: var(--radius-sm);
    padding: 0 12px; font-family: 'DM Sans', sans-serif; font-size: 14px; color: var(--text-dark);
    outline: none; transition: border-color 0.2s, box-shadow 0.2s; width: 100%; background: var(--white);
    letter-spacing: 0.03em;
  }

  .card-input:focus { border-color: var(--purple-bright); box-shadow: 0 0 0 3px rgba(108,60,225,0.1); }
  .card-input::placeholder { color: #adb5bd; letter-spacing: 0; }
  .card-input.has-error { border-color: var(--red); }

  .secure-note { display: flex; align-items: center; gap: 6px; font-size: 11.5px; color: var(--text-muted); margin-top: 2px; }

  .interswitch-badge {
    display: flex; align-items: center; gap: 10px;
    background: #fff5f5; border: 1px solid #fecaca; border-radius: 10px;
    padding: 10px 14px; margin-bottom: 16px;
  }

  .interswitch-logo {
    background: #e63946; border-radius: 4px; padding: 5px 8px;
    color: white; font-size: 8.5px; font-weight: 800; letter-spacing: -0.2px; flex-shrink: 0;
  }

  .interswitch-text { font-size: 11.5px; color: #7f1d1d; line-height: 1.4; }

  .modal-btn-row { display: flex; gap: 10px; margin-top: 10px; }

  .modal-btn-secondary {
    flex: 1; height: 48px; background: var(--bg); color: var(--text-dark);
    border: 1.5px solid var(--border); border-radius: var(--radius-sm);
    font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 600;
    cursor: pointer; transition: background 0.2s, border-color 0.2s;
  }

  .modal-btn-secondary:hover { background: var(--border); }

  .modal-submit {
    flex: 2; height: 48px; background: var(--purple-btn); color: var(--white); border: none;
    border-radius: var(--radius-sm); font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 600;
    cursor: pointer; transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
    position: relative; overflow: hidden;
  }

  .modal-submit:hover { background: #6a40e0; box-shadow: 0 4px 16px rgba(108,60,225,0.3); }
  .modal-submit:active { transform: scale(0.98); }
  .modal-submit:disabled { opacity: 0.42; cursor: not-allowed; pointer-events: none; }

  .processing-screen {
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    padding: 56px 32px; text-align: center;
  }

  .spinner {
    width: 54px; height: 54px;
    border: 3px solid var(--purple-light); border-top-color: var(--purple-bright);
    border-radius: 50%; animation: spin 0.8s linear infinite; margin-bottom: 22px;
  }

  @keyframes spin { to { transform: rotate(360deg); } }

  .processing-title { font-family: 'Syne', sans-serif; font-size: 18px; font-weight: 800; color: var(--text-dark); margin-bottom: 8px; }
  .processing-sub { font-size: 13.5px; color: var(--text-muted); line-height: 1.6; }

  .result-screen {
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    padding: 40px 32px; text-align: center;
  }

  .result-icon { width: 72px; height: 72px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 30px; margin-bottom: 20px; }
  .result-icon.success { background: linear-gradient(135deg, #22c55e, #16a34a); }
  .result-icon.failure { background: linear-gradient(135deg, #ef4444, #b91c1c); }

  .result-title { font-family: 'Syne', sans-serif; font-size: 22px; font-weight: 800; color: var(--text-dark); margin-bottom: 8px; }
  .result-sub { font-size: 13.5px; color: var(--text-muted); line-height: 1.65; margin-bottom: 12px; max-width: 320px; }

  .result-ref {
    font-size: 11.5px; color: var(--text-muted); background: var(--bg);
    border: 1px solid var(--border); border-radius: 8px; padding: 8px 14px;
    margin-bottom: 24px; font-family: monospace; letter-spacing: 0.05em;
  }

  .result-btn {
    background: var(--purple-btn); color: var(--white); border: none; border-radius: var(--radius-sm);
    padding: 13px 32px; font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 600;
    cursor: pointer; transition: background 0.2s; margin-bottom: 10px; width: 100%;
  }

  .result-btn:hover { background: #6a40e0; }

  .result-btn-outline {
    background: transparent; color: var(--purple-bright); border: 1.5px solid var(--border);
    border-radius: var(--radius-sm); padding: 12px 32px; font-family: 'DM Sans', sans-serif;
    font-size: 14px; font-weight: 600; cursor: pointer; transition: background 0.2s, border-color 0.2s; width: 100%;
  }

  .result-btn-outline:hover { background: var(--purple-light); border-color: var(--purple-bright); }

  .field-error { font-size: 12px; color: var(--red); margin-top: 2px; }

  /* ── BROWSE CREATORS PAGE ── */
  .browse-header { margin-bottom: 24px; }
  .browse-header h2 { font-family: 'Syne', sans-serif; font-size: 26px; font-weight: 800; color: var(--text-dark); letter-spacing: -0.5px; }
  .browse-header p { font-size: 13.5px; color: var(--text-muted); margin-top: 4px; }

  .ai-match-badge {
    display: inline-flex; align-items: center; gap: 6px;
    background: var(--purple-light); color: var(--purple-bright);
    font-size: 12px; font-weight: 600; padding: 6px 14px; border-radius: 20px; margin-bottom: 20px;
  }

  .browse-toolbar {
    display: flex; align-items: center; gap: 12px; margin-bottom: 24px;
  }

  .search-wrap {
    flex: 1; position: relative;
  }

  .search-icon {
    position: absolute; left: 14px; top: 50%; transform: translateY(-50%);
    color: var(--text-muted); pointer-events: none;
  }

  .search-input {
    width: 100%; height: 46px; border: 1.5px solid var(--border); border-radius: var(--radius-sm);
    padding: 0 14px 0 42px; font-family: 'DM Sans', sans-serif; font-size: 14px; color: var(--text-dark);
    outline: none; background: var(--white); transition: border-color 0.2s, box-shadow 0.2s;
  }

  .search-input:focus { border-color: var(--purple-bright); box-shadow: 0 0 0 3px rgba(108,60,225,0.1); }
  .search-input::placeholder { color: #adb5bd; }

  .filter-select {
    height: 46px; border: 1.5px solid var(--border); border-radius: var(--radius-sm);
    padding: 0 36px 0 14px; font-family: 'DM Sans', sans-serif; font-size: 13.5px; color: var(--text-dark);
    outline: none; background: var(--white); cursor: pointer; appearance: none; -webkit-appearance: none;
    transition: border-color 0.2s; min-width: 130px;
  }

  .filter-select:focus { border-color: var(--purple-bright); }

  .filter-wrap { position: relative; }
  .filter-arrow { position: absolute; right: 10px; top: 50%; transform: translateY(-50%); pointer-events: none; color: var(--text-muted); }

  .creators-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }

  .creator-grid-card {
    background: var(--white); border: 1px solid var(--border); border-radius: var(--radius);
    padding: 22px; transition: box-shadow 0.2s, transform 0.2s; cursor: default;
    display: flex; flex-direction: column; gap: 0;
  }

  .creator-grid-card:hover { box-shadow: 0 6px 24px rgba(0,0,0,0.08); transform: translateY(-2px); }

  .cgc-top { display: flex; align-items: flex-start; gap: 14px; margin-bottom: 14px; }
  .cgc-avatar { width: 48px; height: 48px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-family: 'Syne', sans-serif; font-size: 14px; font-weight: 700; color: var(--white); flex-shrink: 0; background: linear-gradient(135deg, #6c3ce1, #4e22c4); }
  .cgc-info { flex: 1; min-width: 0; }
  .cgc-name { font-size: 15px; font-weight: 700; color: var(--text-dark); }
  .cgc-role { font-size: 12.5px; color: var(--text-muted); margin-top: 2px; }
  .cgc-score { font-family: 'Syne', sans-serif; font-size: 13px; font-weight: 700; color: var(--purple-bright); background: var(--purple-light); padding: 3px 9px; border-radius: 6px; white-space: nowrap; }

  .cgc-desc { font-size: 13px; color: var(--text-muted); line-height: 1.55; margin-bottom: 14px; }

  .cgc-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 16px; }
  .cgc-tag { background: var(--bg); border: 1px solid var(--border); color: var(--text-dark); font-size: 11.5px; font-weight: 500; padding: 3px 10px; border-radius: 20px; }

  .cgc-rate { font-size: 13px; color: var(--text-muted); margin-bottom: 16px; }
  .cgc-rate strong { color: var(--text-dark); font-weight: 700; }

  .cgc-actions { display: flex; gap: 8px; margin-top: auto; }

  .cgc-btn-outline {
    flex: 1; height: 40px; background: transparent; border: 1.5px solid var(--border);
    border-radius: 50px; font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 600;
    color: var(--purple-bright); cursor: pointer; transition: background 0.2s, border-color 0.2s;
  }

  .cgc-btn-outline:hover { background: var(--purple-light); border-color: var(--purple-bright); }

  .cgc-btn-fill {
    flex: 1; height: 40px; background: var(--purple-btn); border: none;
    border-radius: 50px; font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 600;
    color: var(--white); cursor: pointer; transition: background 0.2s;
    position: relative; overflow: hidden;
  }

  .cgc-btn-fill:hover { background: #6a40e0; }

  /* ── CREATOR PROFILE PAGE ── */
  .back-btn {
    display: inline-flex; align-items: center; gap: 6px;
    font-size: 13.5px; font-weight: 600; color: var(--purple-bright);
    background: none; border: none; cursor: pointer; margin-bottom: 24px;
    transition: gap 0.2s;
  }

  .back-btn:hover { gap: 10px; }

  .profile-card {
    background: var(--white); border: 1px solid var(--border); border-radius: var(--radius);
    padding: 32px; margin-bottom: 24px;
  }

  .profile-hero { display: flex; align-items: flex-start; gap: 20px; margin-bottom: 24px; }

  .profile-avatar {
    width: 72px; height: 72px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-family: 'Syne', sans-serif; font-size: 22px; font-weight: 800; color: var(--white);
    background: linear-gradient(135deg, #6c3ce1, #4e22c4); flex-shrink: 0;
  }

  .profile-hero-info { flex: 1; }
  .profile-name { font-family: 'Syne', sans-serif; font-size: 24px; font-weight: 800; color: var(--text-dark); letter-spacing: -0.4px; }
  .profile-role { font-size: 14px; color: var(--purple-bright); font-weight: 600; margin-top: 4px; }
  .profile-desc { font-size: 14px; color: var(--text-muted); margin-top: 8px; line-height: 1.6; }

  .profile-match { font-family: 'Syne', sans-serif; font-size: 14px; font-weight: 700; color: var(--purple-bright); background: var(--purple-light); padding: 6px 14px; border-radius: 8px; white-space: nowrap; }

  .profile-stats {
    display: grid; grid-template-columns: repeat(3, 1fr);
    border: 1px solid var(--border); border-radius: var(--radius-sm);
    overflow: hidden; margin-bottom: 24px;
  }

  .profile-stat {
    padding: 18px 20px;
    border-right: 1px solid var(--border);
    background: #fafafa;
  }

  .profile-stat:last-child { border-right: none; }
  .profile-stat-label { font-size: 11.5px; color: var(--text-muted); font-weight: 500; margin-bottom: 6px; }
  .profile-stat-value { font-family: 'Syne', sans-serif; font-size: 18px; font-weight: 800; color: var(--text-dark); }
  .profile-stat-value.link { color: var(--purple-bright); font-size: 14px; font-weight: 600; cursor: pointer; text-decoration: underline; text-underline-offset: 2px; }

  .profile-section-title { font-family: 'Syne', sans-serif; font-size: 14px; font-weight: 700; color: var(--text-dark); margin-bottom: 12px; }

  .profile-tags { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 24px; }
  .profile-tag { background: var(--bg); border: 1px solid var(--border); color: var(--text-dark); font-size: 13px; font-weight: 500; padding: 5px 14px; border-radius: 20px; }

  .profile-send-btn {
    width: 100%; height: 52px; background: var(--purple-btn); color: var(--white); border: none;
    border-radius: var(--radius-sm); font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 700;
    cursor: pointer; transition: background 0.2s, box-shadow 0.2s; position: relative; overflow: hidden;
  }

  .profile-send-btn:hover { background: #6a40e0; box-shadow: 0 6px 20px rgba(108,60,225,0.3); }

  /* ── SEND JOB REQUEST MODAL ── */
  .job-modal {
    background: var(--white); border-radius: 20px;
    width: 100%; max-width: 520px; max-height: 92vh; overflow-y: auto;
    animation: slideUp 0.3s cubic-bezier(0.34,1.56,0.64,1);
    box-shadow: 0 24px 80px rgba(0,0,0,0.2);
  }

  .job-modal-inner { padding: 32px; }

  .job-modal-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px; }
  .job-modal-title { font-family: 'Syne', sans-serif; font-size: 22px; font-weight: 800; color: var(--text-dark); }
  .job-modal-to { font-size: 13px; color: var(--text-muted); margin-bottom: 24px; }
  .job-modal-to strong { color: var(--text-dark); }

  .job-date-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }

  .info-callout {
    background: var(--purple-light); border: 1px solid #d8ccff; border-radius: var(--radius-sm);
    padding: 14px 16px; font-size: 13px; color: var(--purple-mid); line-height: 1.55;
    margin-bottom: 20px;
  }

  .job-modal-btn-row { display: flex; gap: 10px; }

  .job-cancel-btn {
    flex: 1; height: 48px; background: transparent; border: 1.5px solid var(--border);
    border-radius: 50px; font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 600;
    color: var(--text-muted); cursor: pointer; transition: background 0.2s;
  }

  .job-cancel-btn:hover { background: var(--bg); }

  .job-submit-btn {
    flex: 2; height: 48px; background: var(--purple-btn); color: var(--white); border: none;
    border-radius: 50px; font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 700;
    cursor: pointer; transition: background 0.2s, box-shadow 0.2s; position: relative; overflow: hidden;
  }

  .job-submit-btn:hover { background: #6a40e0; box-shadow: 0 4px 16px rgba(108,60,225,0.3); }

  .job-success-screen {
    display: flex; flex-direction: column; align-items: center; text-align: center;
    padding: 48px 32px;
  }

  .job-success-icon {
    width: 72px; height: 72px; border-radius: 50%;
    background: linear-gradient(135deg, #6c3ce1, #4e22c4);
    display: flex; align-items: center; justify-content: center;
    font-size: 28px; margin-bottom: 20px;
  }

  @media (max-width: 1100px) {
    .metrics-grid { grid-template-columns: repeat(2, 1fr); }
    .bottom-grid { grid-template-columns: 1fr; }
    .creators-grid { grid-template-columns: repeat(2, 1fr); }
  }

  @media (max-width: 768px) {
    .sidebar { transform: translateX(-100%); }
    .main { margin-left: 0; }
    .stats-banner { flex-direction: column; gap: 20px; }
    .stat-block { border-right: none; border-bottom: 1px solid rgba(255,255,255,0.15); padding: 0 0 20px; }
    .stat-block:last-child { border-bottom: none; }
    .banner-actions { padding-left: 0; flex-direction: row; }
    .content { padding: 20px 16px; }
    .topbar { padding: 16px 20px; }
    .creators-grid { grid-template-columns: 1fr; }
  }
`;

const activity = [
  { creator: "Amara Okon", project: "Product Launch Video", amount: "₦120,000", status: "pending", date: "Mar 18, 2026" },
  { creator: "Chidi Eze", project: "Brand Photography", amount: "₦85,000", status: "paid", date: "Mar 12, 2026" },
  { creator: "Funmi Adeyemi", project: "Social Media Pack", amount: "₦60,000", status: "paid", date: "Mar 5, 2026" },
  { creator: "Tunde Balogun", project: "UI/UX Audit Report", amount: "₦45,000", status: "in-progress", date: "Feb 28, 2026" },
];

const allCreators = [
  { initials: "AO", name: "Amara Okon", role: "Videographer", location: "Lagos", score: "96%", rate: "From ₦120,000/project", tags: ["Videographer", "Brand Films", "Social Media"], desc: "Lagos-based videographer specialising in product launches, brand documentaries and social media content. 4+ years experience.", portfolio: "amaraokon.com", completedJobs: "₦120,000", startingRate: "Product Launch Video" },
  { initials: "CE", name: "Chidi Eze", role: "Photographer", location: "Lagos", score: "91%", rate: "From ₦60,000/project", tags: ["Photographer", "Food Styling", "Commercial"], desc: "Commercial and lifestyle photographer with 5+ years experience. Works with food, fashion, and tech brands across Nigeria.", portfolio: "chidieze.ng", completedJobs: "₦85,000", startingRate: "Brand Photography" },
  { initials: "FA", name: "Funmi Adeyemi", role: "Social Media Manager", location: "Abuja", score: "87%", rate: "From ₦50,000/month", tags: ["Social Media", "Content Strategy", "Copywriting"], desc: "Manages content strategy and monthly execution for 10+ brands. Specialises in Instagram and TikTok growth for Nigerian businesses.", portfolio: "funmiadeyemi.co", completedJobs: "₦60,000", startingRate: "Social Media Management" },
  { initials: "KM", name: "Kola Mensah", role: "Copywriter", location: "Lagos", score: "82%", rate: "From ₦35,000/project", tags: ["Copywriting", "B2B", "Email Campaigns"], desc: "B2B and consumer copywriter. Writes website copy, email campaigns, and brand messaging that converts.", portfolio: "kolawrites.com", completedJobs: "₦45,000", startingRate: "Copywriting Project" },
  { initials: "AN", name: "Adaeze Nwosu", role: "Graphic Designer", location: "Port Harcourt", score: "78%", rate: "From ₦40,000/project", tags: ["Graphic Design", "Branding", "UI/UX"], desc: "Brand identity and digital design specialist. Creates visual systems for startups and established brands in Nigeria.", portfolio: "adaezedesigns.ng", completedJobs: "₦50,000", startingRate: "Brand Identity" },
  { initials: "TJ", name: "Taiwo James", role: "Animator", location: "Lagos", score: "74%", rate: "From ₦80,000/project", tags: ["Animation", "Motion Graphics", "2D"], desc: "2D animator and motion graphics designer. Works on explainer videos, social ads, and branded content for tech companies.", portfolio: "taiwojames.studio", completedJobs: "₦80,000", startingRate: "Explainer Video" },
];

const VYNDER_FEE_RATE = 0.015;

function createRipple(e) {
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
}

function formatCard(val) { return val.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim(); }
function formatExpiry(val) { const c = val.replace(/\D/g, "").slice(0, 4); return c.length >= 3 ? c.slice(0,2)+"/"+c.slice(2) : c; }
function genRef() { return "VYN-" + Math.random().toString(36).substring(2, 10).toUpperCase(); }

const NavIcon = ({ type }) => {
  const paths = {
    grid: <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></>,
    briefcase: <><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/></>,
    message: <><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></>,
    bell: <><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></>,
    clock: <><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>,
    settings: <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></>,
    logout: <><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></>,
  };
  return (
    <svg className="nav-icon" viewBox="0 0 24 24" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none">
      {paths[type]}
    </svg>
  );
};

/* ── PAYMENT MODAL ── */
function PaymentModal({ onClose }) {
  const [step, setStep] = useState(1);
  const [result, setResult] = useState(null);
  const [txRef] = useState(genRef());
  const [details, setDetails] = useState({ creator: "", amount: "", note: "" });
  const [detailErrors, setDetailErrors] = useState({});
  const [method, setMethod] = useState("");
  const [card, setCard] = useState({ number: "", expiry: "", cvv: "", name: "" });
  const [cardErrors, setCardErrors] = useState({});

  const amount = parseFloat(details.amount) || 0;
  const fee = Math.round(amount * VYNDER_FEE_RATE);
  const total = amount + fee;

  const validateDetails = () => {
    const e = {};
    if (!details.creator) e.creator = "Please select a creator";
    if (!details.amount || amount <= 0) e.amount = "Enter a valid amount";
    else if (amount < 1000) e.amount = "Minimum payment is ₦1,000";
    return e;
  };

  const validateMethod = () => {
    if (!method) return { method: "Please select a payment method" };
    const e = {};
    if (method === "card" || method === "interswitch") {
      if (card.number.replace(/\s/g,"").length < 16) e.number = "Enter a valid 16-digit card number";
      if (!card.expiry || card.expiry.length < 5) e.expiry = "Enter expiry (MM/YY)";
      if (!card.cvv || card.cvv.length < 3) e.cvv = "Enter CVV";
      if (!card.name.trim()) e.name = "Enter cardholder name";
    }
    return e;
  };

  const handleDetailsNext = (e) => {
    const errs = validateDetails();
    if (Object.keys(errs).length) { setDetailErrors(errs); return; }
    createRipple(e);
    setStep(2);
  };

  const handlePay = (e) => {
    const errs = validateMethod();
    if (Object.keys(errs).length) { setCardErrors(errs); return; }
    createRipple(e);
    setStep(3);
    setTimeout(() => {
      setResult(Math.random() > 0.2 ? "success" : "failure");
      setStep(4);
    }, 2800);
  };

  const retryPayment = () => {
    setResult(null);
    setCard({ number: "", expiry: "", cvv: "", name: "" });
    setCardErrors({});
    setStep(2);
  };

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && step !== 3 && onClose()}>
      <div className="modal">
        {step === 1 && (
          <div className="modal-step">
            <div className="modal-header">
              <span className="modal-title">Make a Payment</span>
              <button className="modal-close" onClick={onClose}>×</button>
            </div>
            <p className="modal-subtitle">Send payment to a creator for completed work</p>
            <div className="modal-steps-bar">
              <div className="modal-step-tab active">① Details</div>
              <div className="modal-step-tab">② Method</div>
              <div className="modal-step-tab">③ Confirm</div>
            </div>
            <div className="modal-field">
              <label className="modal-label">Select Creator</label>
              <div className="modal-select-wrap">
                <select className={`modal-input ${detailErrors.creator ? "has-error" : ""}`} value={details.creator} onChange={(e) => { setDetails({ ...details, creator: e.target.value }); setDetailErrors({ ...detailErrors, creator: "" }); }}>
                  <option value="" disabled>Choose a creator</option>
                  <option value="amara">Amara Okon — Product Launch Video</option>
                  <option value="chidi">Chidi Eze — Brand Photography</option>
                  <option value="funmi">Funmi Adeyemi — Social Media Pack</option>
                  <option value="tunde">Tunde Balogun — UI/UX Audit</option>
                </select>
                <svg className="modal-select-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
              </div>
              {detailErrors.creator && <span className="field-error">⚠ {detailErrors.creator}</span>}
            </div>
            <div className="modal-field">
              <label className="modal-label">Amount (₦)</label>
              <input className={`modal-input ${detailErrors.amount ? "has-error" : ""}`} type="number" placeholder="e.g. 120000" value={details.amount} onChange={(e) => { setDetails({ ...details, amount: e.target.value }); setDetailErrors({ ...detailErrors, amount: "" }); }} />
              {detailErrors.amount && <span className="field-error">⚠ {detailErrors.amount}</span>}
            </div>
            <div className="modal-field">
              <label className="modal-label">Note <span style={{ color: "var(--text-muted)", fontWeight: 400 }}>(optional)</span></label>
              <input className="modal-input" placeholder="e.g. Final payment for project" value={details.note} onChange={(e) => setDetails({ ...details, note: e.target.value })} />
            </div>
            {amount > 0 && (
              <div className="payment-summary">
                <div className="summary-row"><span>Subtotal</span><span>₦{amount.toLocaleString()}</span></div>
                <div className="summary-row"><span>Vynder fee (1.5%)</span><span>₦{fee.toLocaleString()}</span></div>
                <hr className="summary-divider" />
                <div className="summary-row summary-total"><span>Total to Pay</span><span>₦{total.toLocaleString()}</span></div>
              </div>
            )}
            <div className="modal-btn-row">
              <button className="modal-btn-secondary" onClick={onClose}>Cancel</button>
              <button className="modal-submit" onClick={handleDetailsNext}>Continue →</button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="modal-step">
            <div className="modal-header">
              <span className="modal-title">Payment Method</span>
              <button className="modal-close" onClick={onClose}>×</button>
            </div>
            <p className="modal-subtitle">Total: <strong style={{ color: "var(--purple-bright)" }}>₦{total.toLocaleString()}</strong> · Choose how to pay</p>
            <div className="modal-steps-bar">
              <div className="modal-step-tab done">✓ Details</div>
              <div className="modal-step-tab active">② Method</div>
              <div className="modal-step-tab">③ Confirm</div>
            </div>
            <div className="interswitch-badge">
              <div className="interswitch-logo">INTERSWITCH</div>
              <span className="interswitch-text">Secured by Interswitch — Nigeria's trusted payment infrastructure</span>
            </div>
            <div className="payment-methods">
              {[
                { id: "interswitch", cls: "interswitch", label: "ISWIN", name: "Interswitch (Verve / Mastercard)", desc: "Pay securely via Interswitch gateway" },
                { id: "card", cls: "card", label: "VISA", name: "Debit / Credit Card", desc: "Visa, Mastercard, or Verve card" },
                { id: "transfer", cls: "transfer", label: "🏦", name: "Bank Transfer", desc: "Transfer to Vynder's designated account" },
                { id: "ussd", cls: "ussd", label: "*901#", name: "USSD", desc: "Pay via shortcode on any Nigerian network" },
              ].map((m) => (
                <div key={m.id} className={`method-option ${method === m.id ? "selected" : ""}`} onClick={() => { setMethod(m.id); setCardErrors({}); }}>
                  <div className="method-radio"><div className="method-radio-inner" /></div>
                  <div className={`method-icon ${m.cls}`}>{m.label}</div>
                  <div className="method-info">
                    <div className="method-name">{m.name}</div>
                    <div className="method-desc">{m.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            {cardErrors.method && <p className="field-error" style={{ marginBottom: 10 }}>⚠ {cardErrors.method}</p>}
            {(method === "card" || method === "interswitch") && (
              <div className="card-form">
                <div className="modal-field" style={{ marginBottom: 0 }}>
                  <label className="modal-label" style={{ fontSize: 12 }}>Card Number</label>
                  <input className={`card-input ${cardErrors.number ? "has-error" : ""}`} placeholder="0000 0000 0000 0000" value={card.number} maxLength={19} onChange={(e) => { setCard({ ...card, number: formatCard(e.target.value) }); setCardErrors({ ...cardErrors, number: "" }); }} />
                  {cardErrors.number && <span className="field-error">⚠ {cardErrors.number}</span>}
                </div>
                <div className="card-row">
                  <div className="modal-field" style={{ marginBottom: 0 }}>
                    <label className="modal-label" style={{ fontSize: 12 }}>Expiry</label>
                    <input className={`card-input ${cardErrors.expiry ? "has-error" : ""}`} placeholder="MM/YY" value={card.expiry} maxLength={5} onChange={(e) => { setCard({ ...card, expiry: formatExpiry(e.target.value) }); setCardErrors({ ...cardErrors, expiry: "" }); }} />
                    {cardErrors.expiry && <span className="field-error">⚠ {cardErrors.expiry}</span>}
                  </div>
                  <div className="modal-field" style={{ marginBottom: 0 }}>
                    <label className="modal-label" style={{ fontSize: 12 }}>CVV</label>
                    <input className={`card-input ${cardErrors.cvv ? "has-error" : ""}`} placeholder="•••" type="password" value={card.cvv} maxLength={4} onChange={(e) => { setCard({ ...card, cvv: e.target.value.replace(/\D/g,"").slice(0,4) }); setCardErrors({ ...cardErrors, cvv: "" }); }} />
                    {cardErrors.cvv && <span className="field-error">⚠ {cardErrors.cvv}</span>}
                  </div>
                </div>
                <div className="modal-field" style={{ marginBottom: 0 }}>
                  <label className="modal-label" style={{ fontSize: 12 }}>Cardholder Name</label>
                  <input className={`card-input ${cardErrors.name ? "has-error" : ""}`} placeholder="Name on card" value={card.name} onChange={(e) => { setCard({ ...card, name: e.target.value }); setCardErrors({ ...cardErrors, name: "" }); }} />
                  {cardErrors.name && <span className="field-error">⚠ {cardErrors.name}</span>}
                </div>
                <div className="secure-note">🔒 Card details are encrypted end-to-end and never stored by Vynder</div>
              </div>
            )}
            {method === "transfer" && (
              <div className="card-form" style={{ textAlign: "center", gap: 6 }}>
                <p style={{ fontSize: 12, color: "var(--text-muted)" }}>Transfer exactly ₦{total.toLocaleString()} to:</p>
                <p style={{ fontSize: 15, fontWeight: 700, color: "var(--text-dark)" }}>Vynder Payments Ltd</p>
                <p style={{ fontSize: 16, fontWeight: 700, color: "var(--purple-bright)", letterSpacing: "0.1em", fontFamily: "monospace" }}>0123 456 7890</p>
                <p style={{ fontSize: 12, color: "var(--text-muted)" }}>Zenith Bank · Use ref: <strong>{txRef}</strong></p>
              </div>
            )}
            {method === "ussd" && (
              <div className="card-form" style={{ textAlign: "center", gap: 6 }}>
                <p style={{ fontSize: 12, color: "var(--text-muted)" }}>Dial this code on your phone:</p>
                <p style={{ fontSize: 22, fontWeight: 800, color: "var(--purple-bright)", fontFamily: "monospace" }}>*322*072*{Math.floor(Math.random()*900000+100000)}#</p>
                <p style={{ fontSize: 12, color: "var(--text-muted)" }}>Works on MTN, Airtel, Glo, 9mobile · Amount: ₦{total.toLocaleString()}</p>
              </div>
            )}
            <div className="modal-btn-row" style={{ marginTop: 18 }}>
              <button className="modal-btn-secondary" onClick={() => setStep(1)}>← Back</button>
              <button className="modal-submit" onClick={handlePay}>Pay ₦{total.toLocaleString()} →</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="processing-screen">
            <div className="spinner" />
            <p className="processing-title">Processing Payment...</p>
            <p className="processing-sub">Please do not close this window.<br />Verifying with Interswitch secure gateway.</p>
          </div>
        )}

        {step === 4 && result === "success" && (
          <div className="result-screen">
            <div className="result-icon success">✓</div>
            <h3 className="result-title">Payment Successful!</h3>
            <p className="result-sub">₦{total.toLocaleString()} has been sent successfully. The creator will be notified immediately.</p>
            <div className="result-ref">Transaction Ref: {txRef}</div>
            <button className="result-btn" onClick={onClose}>Done</button>
            <button className="result-btn-outline" onClick={onClose}>View Transaction History</button>
          </div>
        )}

        {step === 4 && result === "failure" && (
          <div className="result-screen">
            <div className="result-icon failure">✕</div>
            <h3 className="result-title">Payment Failed</h3>
            <p className="result-sub">We couldn't process your payment. This may be due to insufficient funds, incorrect card details, or a network issue. Please try again.</p>
            <div className="result-ref">Failed Ref: {txRef}</div>
            <button className="result-btn" onClick={retryPayment}>Try Again</button>
            <button className="result-btn-outline" onClick={onClose}>Cancel</button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── SEND JOB REQUEST MODAL ── */
function SendJobRequestModal({ creator, onClose }) {
  const [form, setForm] = useState({ brief: "", budget: "", startDate: "", endDate: "", message: "" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.budget || isNaN(parseFloat(form.budget))) e.budget = "Enter a valid budget";
    if (!form.startDate) e.startDate = "Select a start date";
    return e;
  };

  const handleSubmit = (e) => {
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    createRipple(e);
    setTimeout(() => setSubmitted(true), 300);
  };

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="job-modal">
        {!submitted ? (
          <div className="job-modal-inner">
            <div className="job-modal-header">
              <span className="job-modal-title">Send Job Request</span>
              <button className="modal-close" onClick={onClose}>×</button>
            </div>
            <p className="job-modal-to">Sending to: <strong>{creator.name}</strong></p>

            <div className="modal-field">
              <label className="modal-label">Link to Brief</label>
              <div className="modal-select-wrap">
                <select className="modal-input" value={form.brief} onChange={(e) => setForm({ ...form, brief: e.target.value })}>
                  <option value="">Select an existing brief</option>
                  <option value="plv">Product Launch Video</option>
                  <option value="brand">Brand Photography Campaign</option>
                  <option value="social">Q2 Social Media Pack</option>
                </select>
                <svg className="modal-select-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
              </div>
            </div>

            <div className="modal-field">
              <label className="modal-label">Your Budget Offer (₦)</label>
              <input
                className={`modal-input ${errors.budget ? "has-error" : ""}`}
                placeholder="e.g. ₦120,000"
                value={form.budget}
                onChange={(e) => { setForm({ ...form, budget: e.target.value }); setErrors({ ...errors, budget: "" }); }}
              />
              {errors.budget && <span className="field-error">⚠ {errors.budget}</span>}
            </div>

            <div className="job-date-row">
              <div className="modal-field">
                <label className="modal-label">Start Date</label>
                <input
                  className={`modal-input ${errors.startDate ? "has-error" : ""}`}
                  type="date"
                  value={form.startDate}
                  onChange={(e) => { setForm({ ...form, startDate: e.target.value }); setErrors({ ...errors, startDate: "" }); }}
                />
                {errors.startDate && <span className="field-error">⚠ {errors.startDate}</span>}
              </div>
              <div className="modal-field">
                <label className="modal-label">End Date</label>
                <input
                  className="modal-input"
                  type="date"
                  value={form.endDate}
                  onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                />
              </div>
            </div>

            <div className="modal-field">
              <label className="modal-label">Message to Creator <span style={{ color: "var(--text-muted)", fontWeight: 400 }}>(optional)</span></label>
              <textarea
                className="modal-textarea"
                placeholder={`e.g. Hi ${creator.name.split(" ")[0]}, we love your work and think you'd be a great fit for this project...`}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
              />
            </div>

            <div className="info-callout">
              The creator will review your request and either accept or decline. Payment only happens once they accept.
            </div>

            <div className="job-modal-btn-row">
              <button className="job-cancel-btn" onClick={onClose}>Cancel</button>
              <button className="job-submit-btn" onClick={handleSubmit}>Send Request</button>
            </div>
          </div>
        ) : (
          <div className="job-success-screen">
            <div className="job-success-icon">✦</div>
            <h3 className="result-title">Request Sent!</h3>
            <p className="result-sub" style={{ marginBottom: 24 }}>Your job request has been sent to <strong>{creator.name}</strong>. They'll review it and respond shortly. You'll be notified once they accept or decline.</p>
            <button className="result-btn" onClick={onClose}>Done</button>
            <button className="result-btn-outline" style={{ marginTop: 10 }} onClick={onClose}>View Job Requests</button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── BROWSE CREATORS PAGE ── */
function BrowseCreators({ onViewProfile, onSendRequest }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");

  const filtered = allCreators.filter(c => {
    const matchSearch = !search || c.name.toLowerCase().includes(search.toLowerCase()) || c.role.toLowerCase().includes(search.toLowerCase()) || c.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
    const matchLocation = locationFilter === "all" || c.location === locationFilter;
    return matchSearch && matchLocation;
  });

  return (
    <div className="content">
      <div className="browse-header">
        <div className="ai-match-badge">✦ AI Matched First</div>
        <h2>Creator Directory</h2>
        <p>AI-matched creators appear at the top based on your brief history</p>
      </div>

      <div className="browse-toolbar">
        <div className="search-wrap">
          <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input className="search-input" placeholder="Search by name or skill..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className="filter-wrap">
          <select className="filter-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="all">All Status</option>
            <option value="available">Available</option>
            <option value="busy">Busy</option>
          </select>
          <svg className="filter-arrow" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
        </div>
        <div className="filter-wrap">
          <select className="filter-select" value={locationFilter} onChange={(e) => setLocationFilter(e.target.value)}>
            <option value="all">All Locations</option>
            <option value="Lagos">Lagos</option>
            <option value="Abuja">Abuja</option>
            <option value="Port Harcourt">Port Harcourt</option>
          </select>
          <svg className="filter-arrow" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
        </div>
      </div>

      <div className="creators-grid">
        {filtered.map((c) => (
          <div className="creator-grid-card" key={c.name}>
            <div className="cgc-top">
              <div className="cgc-avatar">{c.initials}</div>
              <div className="cgc-info">
                <div className="cgc-name">{c.name}</div>
                <div className="cgc-role">{c.role} · {c.location}</div>
              </div>
              <span className="cgc-score">{c.score}</span>
            </div>
            <div className="cgc-desc">{c.desc}</div>
            <div className="cgc-tags">
              {c.tags.map(t => <span key={t} className="cgc-tag">{t}</span>)}
            </div>
            <div className="cgc-rate">{c.rate}</div>
            <div className="cgc-actions">
              <button className="cgc-btn-outline" onClick={() => onViewProfile(c)}>View Profile</button>
              <button className="cgc-btn-fill" onClick={(e) => { createRipple(e); onSendRequest(c); }}>Send Request</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── CREATOR PROFILE PAGE ── */
function CreatorProfile({ creator, onBack, onSendRequest }) {
  return (
    <div className="content">
      <button className="back-btn" onClick={onBack}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
        Back to Browse Creators
      </button>

      <div className="profile-card">
        <div className="profile-hero">
          <div className="profile-avatar">{creator.initials}</div>
          <div className="profile-hero-info">
            <div className="profile-name">{creator.name}</div>
            <div className="profile-role">{creator.role} · {creator.location}</div>
            <div className="profile-desc">{creator.desc}</div>
          </div>
          <div className="profile-match">{creator.score} AI Match</div>
        </div>

        <div className="profile-stats">
          <div className="profile-stat">
            <div className="profile-stat-label">Starting Rate</div>
            <div className="profile-stat-value" style={{ fontSize: 15, fontWeight: 700 }}>{creator.startingRate}</div>
          </div>
          <div className="profile-stat">
            <div className="profile-stat-label">Jobs Completed</div>
            <div className="profile-stat-value">{creator.completedJobs}</div>
          </div>
          <div className="profile-stat">
            <div className="profile-stat-label">Portfolio</div>
            <div className="profile-stat-value link">{creator.portfolio}</div>
          </div>
        </div>

        <div className="profile-section-title">Skills</div>
        <div className="profile-tags">
          {creator.tags.map(t => <span key={t} className="profile-tag">{t}</span>)}
        </div>

        <button className="profile-send-btn" onClick={(e) => { createRipple(e); onSendRequest(creator); }}>
          Send Job Request
        </button>
      </div>
    </div>
  );
}

/* ── SIDEBAR ── */
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

        <div className="sidebar-section-label" onClick={() => setMenuOpen(!menuOpen)}>
          MENU
          <svg className={`section-chevron ${!menuOpen ? "collapsed" : ""}`} width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="18 15 12 9 6 15"/></svg>
        </div>

        <div className={`nav-group ${!menuOpen ? "collapsed" : ""}`}>
          {navItems.map((item) => (
            <div key={item.label} className={`nav-item ${currentPage === item.page || (item.page === "dashboard" && currentPage === "dashboard") ? "active" : ""}`} onClick={() => onNavigate(item.page)}>
              <NavIcon type={item.icon} />
              {item.label}
              {item.badge && <span className="nav-badge">{item.badge}</span>}
            </div>
          ))}
        </div>
      </div>

      <div className="sidebar-bottom">
        <div className="sidebar-section-label" onClick={() => setAccountOpen(!accountOpen)}>
          ACCOUNT
          <svg className={`section-chevron ${!accountOpen ? "collapsed" : ""}`} width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="18 15 12 9 6 15"/></svg>
        </div>
        <div className={`nav-group ${!accountOpen ? "collapsed" : ""}`}>
          <div className="nav-item"><NavIcon type="settings" />Settings</div>
          <div className="nav-item logout"><NavIcon type="logout" />Logout</div>
        </div>
      </div>
    </aside>
  );
}

/* ── DASHBOARD ── */
export default function App() {
  const [page, setPage] = useState("dashboard");
  const [selectedCreator, setSelectedCreator] = useState(null);
  const [showPayment, setShowPayment] = useState(false);
  const [showJobRequest, setShowJobRequest] = useState(false);
  const [jobRequestCreator, setJobRequestCreator] = useState(null);
  const [menuOpen, setMenuOpen] = useState(true);
  const [accountOpen, setAccountOpen] = useState(true);

  const getHour = () => {
    const h = new Date().getHours();
    if (h < 12) return "morning";
    if (h < 17) return "afternoon";
    return "evening";
  };

  const handleViewProfile = (creator) => {
    setSelectedCreator(creator);
    setPage("profile");
  };

  const handleSendRequest = (creator) => {
    setJobRequestCreator(creator);
    setShowJobRequest(true);
  };

  const topbarInfo = {
    dashboard: { title: "Dashboard", subtitle: "Overview of your creator activity, projects, and payments" },
    browse: { title: "Browse Creators", subtitle: "Discover and connect with vetted creators across Nigeria" },
    profile: { title: selectedCreator?.name || "Creator Profile", subtitle: `${selectedCreator?.role || ""} · ${selectedCreator?.location || ""}` },
    jobs: { title: "Job Requests", subtitle: "Manage requests sent to creators" },
    messages: { title: "Messages", subtitle: "Your conversations with creators" },
    notifications: { title: "Notifications", subtitle: "Stay updated on your projects" },
    transactions: { title: "Transaction History", subtitle: "All your payment records" },
  };

  const info = topbarInfo[page] || topbarInfo.dashboard;

  return (
    <>
      <style>{styles}</style>
      <div className="layout">
        <Sidebar
          currentPage={page}
          onNavigate={(p) => { setPage(p); setSelectedCreator(null); }}
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
          accountOpen={accountOpen}
          setAccountOpen={setAccountOpen}
        />

        <main className="main">
          <div className="topbar">
            <div className="topbar-left">
              <h1>{info.title}</h1>
              <p>{info.subtitle}</p>
            </div>
            <div className="topbar-right">
              <div className="icon-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/>
                </svg>
                <div className="notif-dot" />
              </div>
              <div className="icon-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
                </svg>
              </div>
            </div>
          </div>

          {/* DASHBOARD */}
          {page === "dashboard" && (
            <div className="content">
              <div className="greeting-row">
                <div>
                  <h2>Good {getHour()}, Emeka 👋</h2>
                  <p>Here's your business activity at a glance</p>
                </div>
                <button className="post-btn" onClick={createRipple}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                  Post a Brief
                </button>
              </div>

              <div className="stats-banner">
                <div className="stat-block">
                  <div className="stat-label">Total Spent</div>
                  <div className="stat-value">₦685,000</div>
                  <div className="stat-sub">All time</div>
                </div>
                <div className="stat-block">
                  <div className="stat-label">This Month</div>
                  <div className="stat-value">₦205,000</div>
                  <div className="stat-sub"><span className="stat-badge green">📈 +12%</span> &nbsp;vs last month</div>
                </div>
                <div className="stat-block">
                  <div className="stat-label">Pending Payment</div>
                  <div className="stat-value">₦120,000</div>
                  <div className="stat-sub"><span className="stat-badge orange">⏳ 1 awaiting</span></div>
                </div>
                <div className="banner-actions">
                  <button className="make-payment-btn" onClick={(e) => { createRipple(e); setShowPayment(true); }}>Make Payment</button>
                  <button className="view-history-btn">View history</button>
                </div>
              </div>

              <div className="metrics-grid">
                {[
                  { title: "Active Briefs", value: 4, sub: "2 receiving bids", icon: "blue", color: "#3b82f6", iconPath: <><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></> },
                  { title: "Job Requests Sent", value: 9, sub: "3 accepted", icon: "purple", color: "#7b4ff0", iconPath: <><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/></> },
                  { title: "Active Projects", value: 3, sub: "In progress", icon: "green", color: "#22c55e", iconPath: <><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></> },
                  { title: "Completed", value: 6, sub: "All time", icon: "orange", color: "#f97316", iconPath: <><polyline points="20 6 9 17 4 12"/></> },
                ].map((m) => (
                  <div className="metric-card" key={m.title}>
                    <div className="metric-header">
                      <span className="metric-title">{m.title}</span>
                      <div className={`metric-icon ${m.icon}`}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={m.color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{m.iconPath}</svg>
                      </div>
                    </div>
                    <div className="metric-value">{m.value}</div>
                    <div className="metric-sub">{m.sub}</div>
                  </div>
                ))}
              </div>

              <div className="bottom-grid">
                <div className="section-card">
                  <div className="section-header">
                    <span className="section-title">Recent Activity</span>
                    <button className="view-all-btn">View all <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg></button>
                  </div>
                  <table>
                    <thead><tr><th>Creator</th><th>Project</th><th>Amount</th><th>Status</th><th>Date</th></tr></thead>
                    <tbody>
                      {activity.map((row, i) => (
                        <tr key={i}>
                          <td style={{ fontWeight: 600 }}>{row.creator}</td>
                          <td style={{ color: "var(--text-muted)" }}>{row.project}</td>
                          <td className="amount-neg">-{row.amount}</td>
                          <td><span className={`status-pill ${row.status}`}>{row.status === "in-progress" ? "In Progress" : row.status.charAt(0).toUpperCase() + row.status.slice(1)}</span></td>
                          <td style={{ color: "var(--text-muted)" }}>{row.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="section-card creators-panel">
                  <div className="section-header">
                    <span className="section-title">Recommended Creators</span>
                    <button className="view-all-btn" onClick={() => setPage("browse")}>Browse</button>
                  </div>
                  <div className="ai-badge">✦ AI Matched to Your Briefs</div>
                  {allCreators.slice(0, 3).map((c) => (
                    <div className="creator-card" key={c.name}>
                      <div className="creator-top">
                        <div className="avatar">{c.initials}</div>
                        <div className="creator-info">
                          <div className="creator-name">{c.name}</div>
                          <div className="creator-role">{c.role} · {c.location}</div>
                        </div>
                        <span className="creator-score">{c.score}</span>
                      </div>
                      <div className="creator-desc">{c.desc}</div>
                      <button className="view-profile-btn" onClick={() => handleViewProfile(c)}>View Profile</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* BROWSE CREATORS */}
          {page === "browse" && (
            <BrowseCreators
              onViewProfile={handleViewProfile}
              onSendRequest={handleSendRequest}
            />
          )}

          {/* CREATOR PROFILE */}
          {page === "profile" && selectedCreator && (
            <CreatorProfile
              creator={selectedCreator}
              onBack={() => setPage("browse")}
              onSendRequest={handleSendRequest}
            />
          )}

          {/* PLACEHOLDER PAGES */}
          {["jobs", "messages", "notifications", "transactions"].includes(page) && (
            <div className="content">
              <div style={{ background: "var(--white)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "60px 40px", textAlign: "center" }}>
                <div style={{ fontSize: 40, marginBottom: 16 }}>🚧</div>
                <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 20, fontWeight: 800, color: "var(--text-dark)", marginBottom: 8 }}>Coming Soon</div>
                <div style={{ fontSize: 14, color: "var(--text-muted)" }}>This section is under construction.</div>
              </div>
            </div>
          )}
        </main>
      </div>

      {showPayment && <PaymentModal onClose={() => setShowPayment(false)} />}
      {showJobRequest && jobRequestCreator && (
        <SendJobRequestModal creator={jobRequestCreator} onClose={() => { setShowJobRequest(false); setJobRequestCreator(null); }} />
      )}
    </>
  );
}