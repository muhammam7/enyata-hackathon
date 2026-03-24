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

  /* ── MY BRIEFS PAGE ── */
  .briefs-toolbar {
    display: flex; align-items: center; gap: 12px;
    background: var(--white); border: 1px solid var(--border); border-radius: var(--radius);
    padding: 16px 20px; margin-bottom: 0;
  }

  .briefs-table-wrap {
    background: var(--white); border: 1px solid var(--border); border-radius: var(--radius);
    overflow: hidden; margin-top: 16px;
  }

  .brief-status-pill { display: inline-flex; align-items: center; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; }
  .brief-status-pill.open { background: var(--purple-light); color: var(--purple-bright); }
  .brief-status-pill.active { background: #dbeafe; color: #1d4ed8; }
  .brief-status-pill.completed { background: var(--green-light); color: #15803d; }
  .brief-status-pill.closed { background: #f3f4f6; color: #6b7280; }

  .brief-action-btn {
    background: var(--purple-light); color: var(--purple-bright); border: none;
    border-radius: 20px; padding: 5px 14px; font-family: 'DM Sans', sans-serif;
    font-size: 12px; font-weight: 600; cursor: pointer; transition: background 0.2s;
    white-space: nowrap;
  }

  .brief-action-btn:hover { background: #ddd6fe; }

  /* ── POST A BRIEF PAGE ── */
  .post-brief-wrap {
    background: var(--white); border: 1px solid var(--border); border-radius: var(--radius);
    padding: 36px 40px; max-width: 860px;
  }

  .post-brief-field { display: flex; flex-direction: column; gap: 6px; margin-bottom: 22px; }
  .post-brief-label { font-size: 14px; font-weight: 600; color: var(--text-dark); }
  .post-brief-label span { font-weight: 400; color: var(--text-muted); }

  .post-brief-input {
    height: 48px; border: 1.5px solid var(--border); border-radius: var(--radius-sm);
    padding: 0 16px; font-family: 'DM Sans', sans-serif; font-size: 14px; color: var(--text-dark);
    outline: none; transition: border-color 0.2s, box-shadow 0.2s; width: 100%; background: var(--white);
    appearance: none; -webkit-appearance: none;
  }

  .post-brief-input:focus { border-color: var(--purple-bright); box-shadow: 0 0 0 3px rgba(108,60,225,0.1); }
  .post-brief-input::placeholder { color: #adb5bd; }
  .post-brief-input.has-error { border-color: var(--red); }

  .post-brief-textarea {
    border: 1.5px solid var(--border); border-radius: var(--radius-sm);
    padding: 14px 16px; font-family: 'DM Sans', sans-serif; font-size: 14px; color: var(--text-dark);
    outline: none; transition: border-color 0.2s, box-shadow 0.2s; width: 100%; background: var(--white);
    resize: vertical; min-height: 120px; line-height: 1.6;
  }

  .post-brief-textarea:focus { border-color: var(--purple-bright); box-shadow: 0 0 0 3px rgba(108,60,225,0.1); }
  .post-brief-textarea::placeholder { color: #adb5bd; }

  .post-brief-two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }

  .post-brief-select-wrap { position: relative; }
  .post-brief-select-wrap .post-brief-input { cursor: pointer; padding-right: 36px; }
  .post-brief-select-arrow { position: absolute; right: 12px; top: 50%; transform: translateY(-50%); pointer-events: none; color: var(--text-muted); }

  .post-brief-ai-note {
    background: var(--purple-light); border: 1px solid #d8ccff;
    border-radius: var(--radius-sm); padding: 16px 18px; margin-bottom: 28px;
  }

  .post-brief-ai-note strong { font-size: 13.5px; color: var(--purple-bright); display: block; margin-bottom: 4px; }
  .post-brief-ai-note p { font-size: 13px; color: var(--purple-mid); line-height: 1.5; }

  .post-brief-actions { display: flex; gap: 12px; }

  .post-brief-cancel {
    flex: 1; height: 50px; background: transparent; border: 1.5px solid var(--border);
    border-radius: 50px; font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 600;
    color: var(--text-muted); cursor: pointer; transition: background 0.2s;
  }

  .post-brief-cancel:hover { background: var(--bg); }

  .post-brief-submit {
    flex: 2; height: 50px; background: var(--purple-btn); color: var(--white); border: none;
    border-radius: 50px; font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 700;
    cursor: pointer; transition: background 0.2s, box-shadow 0.2s; position: relative; overflow: hidden;
  }

  .post-brief-submit:hover { background: #6a40e0; box-shadow: 0 6px 20px rgba(108,60,225,0.3); }

  .post-brief-success {
    display: flex; flex-direction: column; align-items: center; text-align: center; padding: 64px 40px;
  }

  .post-brief-success-icon {
    width: 80px; height: 80px; border-radius: 50%;
    background: linear-gradient(135deg, #6c3ce1, #4e22c4);
    display: flex; align-items: center; justify-content: center;
    font-size: 32px; margin-bottom: 24px;
  }

  /* ── JOB REQUESTS PAGE ── */
  .jr-stats-grid {
    display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 24px;
  }

  .jr-stat-card {
    background: var(--white); border: 1px solid var(--border); border-radius: var(--radius);
    padding: 20px 24px; display: flex; align-items: center; justify-content: space-between;
    transition: box-shadow 0.2s;
  }

  .jr-stat-card:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.06); }
  .jr-stat-label { font-size: 13px; color: var(--text-muted); font-weight: 500; margin-bottom: 8px; }
  .jr-stat-value { font-family: 'Syne', sans-serif; font-size: 32px; font-weight: 800; color: var(--text-dark); letter-spacing: -0.5px; }

  .jr-stat-icon {
    width: 40px; height: 40px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center; flex-shrink: 0;
  }

  .jr-stat-icon.total { background: #eff6ff; }
  .jr-stat-icon.accepted { background: var(--green-light); }
  .jr-stat-icon.pending { background: #fff7ed; }
  .jr-stat-icon.declined { background: #fef2f2; }

  .jr-toolbar {
    background: var(--white); border: 1px solid var(--border); border-radius: var(--radius);
    padding: 16px 20px; display: flex; align-items: center; gap: 12px; margin-bottom: 16px;
  }

  .jr-table-wrap {
    background: var(--white); border: 1px solid var(--border); border-radius: var(--radius);
    overflow: hidden;
  }

  .jr-status-pill { display: inline-flex; align-items: center; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; }
  .jr-status-pill.accepted { background: var(--green-light); color: #15803d; }
  .jr-status-pill.pending { background: #fff7ed; color: #c2410c; }
  .jr-status-pill.declined { background: #fef2f2; color: #b91c1c; }

  .jr-view-btn {
    background: var(--purple-light); color: var(--purple-bright); border: none;
    border-radius: 20px; padding: 5px 14px; font-family: 'DM Sans', sans-serif;
    font-size: 12px; font-weight: 600; cursor: pointer; transition: background 0.2s; white-space: nowrap;
  }

  .jr-view-btn:hover { background: #ddd6fe; }

  /* ── JOB REQUEST DETAIL ── */
  .jrd-card {
    background: var(--white); border: 1px solid var(--border); border-radius: var(--radius);
    padding: 32px; max-width: 860px;
  }

  .jrd-hero { display: flex; align-items: flex-start; gap: 18px; margin-bottom: 28px; }
  .jrd-avatar {
    width: 60px; height: 60px; border-radius: 50%; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
    font-family: 'Syne', sans-serif; font-size: 16px; font-weight: 800; color: var(--white);
    background: linear-gradient(135deg, #6c3ce1, #4e22c4);
  }
  .jrd-hero-info { flex: 1; }
  .jrd-name { font-family: 'Syne', sans-serif; font-size: 22px; font-weight: 800; color: var(--text-dark); letter-spacing: -0.3px; }
  .jrd-role { font-size: 14px; color: var(--purple-bright); font-weight: 600; margin-top: 2px; }
  .jrd-desc { font-size: 13.5px; color: var(--text-muted); margin-top: 10px; line-height: 1.6; }

  .jrd-status-pill { display: inline-flex; align-items: center; padding: 5px 14px; border-radius: 20px; font-size: 13px; font-weight: 700; flex-shrink: 0; }
  .jrd-status-pill.accepted { background: var(--green-light); color: #15803d; }
  .jrd-status-pill.pending { background: #fff7ed; color: #c2410c; }
  .jrd-status-pill.declined { background: #fef2f2; color: #b91c1c; }

  .jrd-meta {
    display: grid; grid-template-columns: repeat(3, 1fr);
    border: 1px solid var(--border); border-radius: var(--radius-sm);
    overflow: hidden; margin-bottom: 22px; background: #fafafa;
  }

  .jrd-meta-cell { padding: 18px 20px; border-right: 1px solid var(--border); }
  .jrd-meta-cell:last-child { border-right: none; }
  .jrd-meta-label { font-size: 12px; color: var(--text-muted); font-weight: 500; margin-bottom: 6px; }
  .jrd-meta-value { font-family: 'Syne', sans-serif; font-size: 17px; font-weight: 800; color: var(--text-dark); }

  .jrd-response {
    background: var(--purple-light); border: 1px solid #d8ccff;
    border-radius: var(--radius-sm); padding: 20px 22px; margin-bottom: 24px;
  }

  .jrd-response-label { font-size: 12px; font-weight: 700; color: var(--purple-bright); letter-spacing: 0.06em; text-transform: uppercase; margin-bottom: 8px; }
  .jrd-response-text { font-size: 14px; color: var(--text-dark); line-height: 1.65; }
  .jrd-response-empty { font-size: 13.5px; color: var(--text-muted); font-style: italic; }

  .jrd-make-payment-btn {
    width: 100%; max-width: 540px; height: 52px;
    background: var(--purple-btn); color: var(--white); border: none;
    border-radius: 50px; font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 700;
    cursor: pointer; transition: background 0.2s, box-shadow 0.2s; position: relative; overflow: hidden;
    display: block;
  }

  .jrd-make-payment-btn:hover { background: #6a40e0; box-shadow: 0 6px 20px rgba(108,60,225,0.3); }
  .jrd-make-payment-btn:disabled { opacity: 0.4; cursor: not-allowed; pointer-events: none; }

  .jrd-declined-note {
    background: #fef2f2; border: 1px solid #fecaca; border-radius: var(--radius-sm);
    padding: 14px 18px; font-size: 13.5px; color: #b91c1c; line-height: 1.5;
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

  /* ── BUSINESS PROFILE PAGE ── */
  .biz-profile-subtitle { font-size: 13.5px; color: var(--text-muted); margin-bottom: 28px; }

  .bp-card {
    background: var(--white); border: 1px solid var(--border); border-radius: var(--radius);
    padding: 28px 32px; margin-bottom: 20px;
  }

  .bp-hero { display: flex; align-items: flex-start; gap: 20px; }

  .bp-avatar {
    width: 72px; height: 72px; border-radius: 50%; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
    font-family: 'Syne', sans-serif; font-size: 22px; font-weight: 800; color: var(--white);
    background: linear-gradient(135deg, #6c3ce1, #4e22c4);
  }

  .bp-hero-info { flex: 1; }
  .bp-company-name { font-family: 'Syne', sans-serif; font-size: 24px; font-weight: 800; color: var(--text-dark); letter-spacing: -0.4px; }
  .bp-industry { font-size: 14px; color: var(--purple-bright); font-weight: 600; margin-top: 4px; }
  .bp-desc { font-size: 14px; color: var(--text-muted); margin-top: 10px; line-height: 1.65; max-width: 680px; }

  .bp-section-title {
    font-family: 'Syne', sans-serif; font-size: 16px; font-weight: 800; color: var(--text-dark);
    padding-bottom: 16px; border-bottom: 1px solid var(--border); margin-bottom: 22px;
  }

  .bp-info-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 0; }

  .bp-info-cell {
    padding: 6px 24px 16px 0; margin-right: 0;
    border-right: 1px solid var(--border); padding-right: 24px; margin-right: 24px;
  }
  .bp-info-cell:last-child { border-right: none; margin-right: 0; padding-right: 0; }
  .bp-info-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0; margin-top: 20px; padding-top: 20px; border-top: 1px solid var(--border); }
  .bp-info-label { font-size: 12px; color: var(--text-muted); font-weight: 500; margin-bottom: 6px; }
  .bp-info-value { font-size: 14px; font-weight: 600; color: var(--text-dark); }
  .bp-info-value.link { color: var(--purple-bright); cursor: pointer; text-decoration: underline; text-underline-offset: 2px; }

  .bp-activity-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0; }

  .bp-activity-cell {
    padding: 4px 32px 4px 0; border-right: 1px solid var(--border); margin-right: 32px;
  }
  .bp-activity-cell:last-child { border-right: none; margin-right: 0; padding-right: 0; }
  .bp-activity-label { font-size: 13px; color: var(--text-muted); font-weight: 500; margin-bottom: 8px; }
  .bp-activity-value { font-family: 'Syne', sans-serif; font-size: 28px; font-weight: 800; color: var(--text-dark); letter-spacing: -0.5px; }

  .bp-edit-btn {
    display: inline-flex; align-items: center; gap: 8px;
    background: var(--purple-btn); color: var(--white); border: none; border-radius: 50px;
    padding: 11px 22px; font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 600;
    cursor: pointer; transition: background 0.2s, box-shadow 0.2s; margin-top: 20px;
    position: relative; overflow: hidden;
  }
  .bp-edit-btn:hover { background: #6a40e0; box-shadow: 0 4px 16px rgba(108,60,225,0.25); }

  .topbar-avatar {
    width: 38px; height: 38px; border-radius: 50%;
    background: linear-gradient(135deg, #6c3ce1, #4e22c4);
    display: flex; align-items: center; justify-content: center;
    font-family: 'Syne', sans-serif; font-size: 13px; font-weight: 800; color: var(--white);
    cursor: pointer; transition: box-shadow 0.2s, border-color 0.2s;
    border: 2.5px solid transparent; flex-shrink: 0;
  }
  .topbar-avatar:hover { box-shadow: 0 0 0 3px var(--purple-light); border-color: var(--purple-bright); }
  .topbar-avatar.active { box-shadow: 0 0 0 3px var(--purple-light); border-color: var(--purple-bright); }
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

/* ── MY BRIEFS DATA ── */
const initialBriefs = [
  { id: 1, title: "Product Launch Video", category: "Videographer", budget: "120,000 – 200,000", status: "open", bids: 5, posted: "Mar 15, 2026" },
  { id: 2, title: "Monthly Social Content", category: "Social Media", budget: "60,000 – 80,000/mo", status: "open", bids: 8, posted: "Mar 12, 2026" },
  { id: 3, title: "Brand Photography", category: "Photographer", budget: "80,000 – 120,000", status: "active", bids: 3, posted: "Mar 5, 2026" },
  { id: 4, title: "Website Copywriting", category: "Copywriter", budget: "50,000 – 70,000", status: "completed", bids: 4, posted: "Feb 20, 2026" },
];

/* ── MY BRIEFS PAGE ── */
function MyBriefs({ onPostBrief, onBack, briefs }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = briefs.filter(b => {
    const matchSearch = !search || b.title.toLowerCase().includes(search.toLowerCase()) || b.category.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || b.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="content">
      <button className="back-btn" onClick={onBack}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
        Back to Dashboard
      </button>

      <div className="briefs-toolbar">
        <div className="search-wrap" style={{ flex: 1 }}>
          <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input className="search-input" placeholder="Search job briefs..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className="filter-wrap">
          <select className="filter-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="all">All Status</option>
            <option value="open">Open</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="closed">Closed</option>
          </select>
          <svg className="filter-arrow" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
        </div>
        <button className="post-btn" onClick={onPostBrief} style={{ borderRadius: "50px", whiteSpace: "nowrap" }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Post a Brief
        </button>
      </div>

      <div className="briefs-table-wrap">
        <table>
          <thead>
            <tr>
              <th>Brief Title</th>
              <th>Category</th>
              <th>Budget</th>
              <th>Status</th>
              <th>Bids</th>
              <th>Posted</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={7} style={{ textAlign: "center", color: "var(--text-muted)", padding: "40px" }}>No briefs found</td></tr>
            ) : filtered.map((b) => (
              <tr key={b.id}>
                <td style={{ fontWeight: 600 }}>{b.title}</td>
                <td style={{ color: "var(--text-muted)" }}>{b.category}</td>
                <td style={{ fontFamily: "monospace", fontSize: 13 }}>{b.budget}</td>
                <td>
                  <span className={`brief-status-pill ${b.status}`}>
                    {b.status.charAt(0).toUpperCase() + b.status.slice(1)}
                  </span>
                </td>
                <td style={{ fontWeight: 600, color: "var(--text-dark)" }}>{b.bids}</td>
                <td style={{ color: "var(--text-muted)" }}>{b.posted}</td>
                <td>
                  <button className="brief-action-btn">
                    {b.status === "open" ? "View Bids" : "View"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ── POST A BRIEF PAGE ── */
function PostBrief({ onBack, onSuccess }) {
  const [form, setForm] = useState({
    title: "", category: "", description: "",
    minBudget: "", maxBudget: "",
    startDate: "", endDate: "",
    projectType: "one-time", location: "remote",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const set = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
    setErrors({ ...errors, [field]: "" });
  };

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = "Brief title is required";
    if (!form.category) e.category = "Select a category";
    if (!form.description.trim()) e.description = "Please describe the project";
    if (!form.minBudget || isNaN(parseFloat(form.minBudget))) e.minBudget = "Enter a valid amount";
    if (!form.maxBudget || isNaN(parseFloat(form.maxBudget))) e.maxBudget = "Enter a valid amount";
    return e;
  };

  const handleSubmit = (e) => {
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    createRipple(e);
    setTimeout(() => setSubmitted(true), 300);
  };

  if (submitted) {
    return (
      <div className="content">
        <div className="post-brief-wrap">
          <div className="post-brief-success">
            <div className="post-brief-success-icon">✦</div>
            <h3 className="result-title">Brief Posted!</h3>
            <p className="result-sub" style={{ marginBottom: 28 }}>
              Your brief <strong>"{form.title}"</strong> is now live. Our AI is already matching it with relevant creators — you'll start receiving bids within hours.
            </p>
            <button className="result-btn" style={{ maxWidth: 320 }} onClick={() => onSuccess(form)}>View My Briefs</button>
            <button className="result-btn-outline" style={{ maxWidth: 320, marginTop: 10 }} onClick={onBack}>Back to Dashboard</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="content">
      <button className="back-btn" onClick={onBack}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
        Back to Briefs
      </button>

      <div className="post-brief-wrap">
        <div className="post-brief-field">
          <label className="post-brief-label">Brief Title</label>
          <input className={`post-brief-input ${errors.title ? "has-error" : ""}`} placeholder="e.g Product Launch Video Q2 2026" value={form.title} onChange={set("title")} />
          {errors.title && <span className="field-error">⚠ {errors.title}</span>}
        </div>

        <div className="post-brief-field">
          <label className="post-brief-label">Creator Category Needed</label>
          <div className="post-brief-select-wrap">
            <select className={`post-brief-input ${errors.category ? "has-error" : ""}`} value={form.category} onChange={set("category")}>
              <option value="">Select category</option>
              <option value="Videographer">Videographer</option>
              <option value="Photographer">Photographer</option>
              <option value="Social Media Manager">Social Media Manager</option>
              <option value="Copywriter">Copywriter</option>
              <option value="Graphic Designer">Graphic Designer</option>
              <option value="Animator">Animator</option>
              <option value="Content Creator">Content Creator</option>
            </select>
            <svg className="post-brief-select-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
          </div>
          {errors.category && <span className="field-error">⚠ {errors.category}</span>}
        </div>

        <div className="post-brief-field">
          <label className="post-brief-label">Brief Description</label>
          <textarea
            className={`post-brief-textarea ${errors.description ? "has-error" : ""}`}
            placeholder="Describe the project. Include deliverables, style references, platform, audience, etc"
            value={form.description}
            onChange={set("description")}
          />
          {errors.description && <span className="field-error">⚠ {errors.description}</span>}
        </div>

        <div className="post-brief-two-col">
          <div className="post-brief-field" style={{ marginBottom: 0 }}>
            <label className="post-brief-label">Minimum Budget (₦)</label>
            <input className={`post-brief-input ${errors.minBudget ? "has-error" : ""}`} placeholder="e.g ₦80,000" value={form.minBudget} onChange={set("minBudget")} />
            {errors.minBudget && <span className="field-error">⚠ {errors.minBudget}</span>}
          </div>
          <div className="post-brief-field" style={{ marginBottom: 0 }}>
            <label className="post-brief-label">Maximum Budget (₦)</label>
            <input className={`post-brief-input ${errors.maxBudget ? "has-error" : ""}`} placeholder="e.g ₦150,000" value={form.maxBudget} onChange={set("maxBudget")} />
            {errors.maxBudget && <span className="field-error">⚠ {errors.maxBudget}</span>}
          </div>
        </div>

        <div className="post-brief-two-col" style={{ marginTop: 22 }}>
          <div className="post-brief-field" style={{ marginBottom: 0 }}>
            <label className="post-brief-label">Start Date</label>
            <input className="post-brief-input" type="date" value={form.startDate} onChange={set("startDate")} />
          </div>
          <div className="post-brief-field" style={{ marginBottom: 0 }}>
            <label className="post-brief-label">End Date</label>
            <input className="post-brief-input" type="date" value={form.endDate} onChange={set("endDate")} />
          </div>
        </div>

        <div className="post-brief-two-col" style={{ marginTop: 22, marginBottom: 24 }}>
          <div className="post-brief-field" style={{ marginBottom: 0 }}>
            <label className="post-brief-label">Project Type</label>
            <div className="post-brief-select-wrap">
              <select className="post-brief-input" value={form.projectType} onChange={set("projectType")}>
                <option value="one-time">One-time Project</option>
                <option value="recurring">Recurring / Retainer</option>
                <option value="ongoing">Ongoing</option>
              </select>
              <svg className="post-brief-select-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
            </div>
          </div>
          <div className="post-brief-field" style={{ marginBottom: 0 }}>
            <label className="post-brief-label">Location Preference</label>
            <div className="post-brief-select-wrap">
              <select className="post-brief-input" value={form.location} onChange={set("location")}>
                <option value="remote">Remote</option>
                <option value="lagos">Lagos</option>
                <option value="abuja">Abuja</option>
                <option value="ph">Port Harcourt</option>
                <option value="any">Any Location</option>
              </select>
              <svg className="post-brief-select-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
            </div>
          </div>
        </div>

        <div className="post-brief-ai-note">
          <strong>After posting</strong>
          <p>Our AI will immediately match your brief with relevant creators. You'll start receiving bids within hours.</p>
        </div>

        <div className="post-brief-actions">
          <button className="post-brief-cancel" onClick={onBack}>Cancel</button>
          <button className="post-brief-submit" onClick={handleSubmit}>Post Brief</button>
        </div>
      </div>
    </div>
  );
}

/* ── BUSINESS PROFILE PAGE ── */
function BusinessProfile() {
  return (
    <div className="content">
      <p className="biz-profile-subtitle">This is how creators see your business on Vynder</p>

      {/* Hero card */}
      <div className="bp-card">
        <div className="bp-hero">
          <div className="bp-avatar">TC</div>
          <div className="bp-hero-info">
            <div className="bp-company-name">TechCorp Nigeria</div>
            <div className="bp-industry">Technology / Software · Lagos</div>
            <div className="bp-desc">
              We build innovative digital products for African markets. We work regularly with creators for product launches, social content, and brand campaigns.
            </div>
          </div>
        </div>
        <button className="bp-edit-btn" onClick={createRipple}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
          Edit Profile
        </button>
      </div>

      {/* Company Info card */}
      <div className="bp-card">
        <div className="bp-section-title">Company Info</div>
        <div className="bp-info-grid">
          <div className="bp-info-cell">
            <div className="bp-info-label">Contact Person</div>
            <div className="bp-info-value">Emeka Okafor</div>
          </div>
          <div className="bp-info-cell">
            <div className="bp-info-label">Work Email</div>
            <div className="bp-info-value">techcorp@gmail.com</div>
          </div>
          <div className="bp-info-cell">
            <div className="bp-info-label">Industry</div>
            <div className="bp-info-value">Technology / Software</div>
          </div>
          <div className="bp-info-cell">
            <div className="bp-info-label">Company Size</div>
            <div className="bp-info-value">11–50 employees</div>
          </div>
          <div className="bp-info-cell">
            <div className="bp-info-label">Location</div>
            <div className="bp-info-value">Victoria Island, Lagos</div>
          </div>
        </div>

        <div className="bp-info-row">
          <div className="bp-info-cell" style={{ border: "none", margin: 0, padding: 0 }}>
            <div className="bp-info-label">Website</div>
            <div className="bp-info-value link">techcorp.ng</div>
          </div>
          <div className="bp-info-cell" style={{ border: "none", margin: 0, padding: 0 }}>
            <div className="bp-info-label">CAC Number</div>
            <div className="bp-info-value">techcorp@gmail.com</div>
          </div>
          <div className="bp-info-cell" style={{ border: "none", margin: 0, padding: 0 }}>
            <div className="bp-info-label">Member Since</div>
            <div className="bp-info-value">Jan 2026</div>
          </div>
        </div>
      </div>

      {/* Hiring Activity card */}
      <div className="bp-card">
        <div className="bp-section-title">Hiring Activity</div>
        <div className="bp-activity-grid">
          <div className="bp-activity-cell">
            <div className="bp-activity-label">Total Projects</div>
            <div className="bp-activity-value">9</div>
          </div>
          <div className="bp-activity-cell">
            <div className="bp-activity-label">Creators Hired</div>
            <div className="bp-activity-value">5</div>
          </div>
          <div className="bp-activity-cell">
            <div className="bp-activity-label">Total Spent</div>
            <div className="bp-activity-value">₦685,000</div>
          </div>
          <div className="bp-activity-cell">
            <div className="bp-activity-label">Active Briefs</div>
            <div className="bp-activity-value">4</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── JOB REQUESTS DATA ── */
const jobRequestsData = [
  { id: 1, initials: "AO", creator: "Amara Okon", role: "Videographer", desc: "Lagos-based videographer specialising in product launches and brand films.", project: "Product Launch Video", amount: "₦120,000", status: "accepted", date: "Mar 15, 2026", response: "Hi TechCorp, I have 3 similar product launches in my portfolio. Available from April 20." },
  { id: 2, initials: "CE", creator: "Chidi Eze", role: "Photographer", desc: "Commercial and lifestyle photographer with 5+ years experience across Nigeria.", project: "Brand Photography", amount: "₦85,000", status: "accepted", date: "Mar 10, 2026", response: "Happy to take this on — I worked on similar brand shoots for two fintech brands recently. Let's connect." },
  { id: 3, initials: "FA", creator: "Funmi Adeyemi", role: "Social Media Manager", desc: "Manages content strategy and execution for 10+ brands monthly.", project: "Monthly Social Content", amount: "₦60,000", status: "pending", date: "Mar 12, 2026", response: "" },
  { id: 4, initials: "KM", creator: "Kola Mensah", role: "Copywriter", desc: "B2B and consumer copywriter. Writes website copy and brand messaging that converts.", project: "Website Copywriting", amount: "₦50,000", status: "pending", date: "Mar 8, 2026", response: "" },
  { id: 5, initials: "AN", creator: "Adaeze Nwosu", role: "Graphic Designer", desc: "Brand identity and digital design specialist for startups and established brands.", project: "Product Launch Video", amount: "₦150,000", status: "declined", date: "Mar 6, 2026", response: "Thank you for reaching out. I'm fully booked through May and can't commit to this timeline." },
  { id: 6, initials: "TJ", creator: "Taiwo James", role: "Animator", desc: "2D animator and motion graphics designer for tech brands and social ads.", project: "Brand Animation", amount: "₦90,000", status: "accepted", date: "Mar 3, 2026", response: "Excited about this project! I've done similar 2D brand animations — let's align on the style guide." },
  { id: 7, initials: "AO", creator: "Amara Okon", role: "Videographer", desc: "Lagos-based videographer specialising in product launches and brand films.", project: "Q2 Social Media Pack", amount: "₦75,000", status: "declined", date: "Feb 28, 2026", response: "I specialise in longer-form video; this project scope isn't the right fit for my style. Apologies." },
  { id: 8, initials: "KM", creator: "Kola Mensah", role: "Copywriter", desc: "B2B and consumer copywriter. Writes website copy and brand messaging that converts.", project: "Email Campaign Copy", amount: "₦35,000", status: "pending", date: "Feb 25, 2026", response: "" },
  { id: 9, initials: "CE", creator: "Chidi Eze", role: "Photographer", desc: "Commercial and lifestyle photographer with 5+ years experience across Nigeria.", project: "Event Photography", amount: "₦65,000", status: "pending", date: "Feb 20, 2026", response: "" },
];

/* ── PAYMENT MODAL FOR JOB REQUEST (pre-fills creator + amount) ── */
function PaymentModalForRequest({ request, onClose }) {
  const [step, setStep] = useState(2); // skip to method since details are pre-filled
  const [result, setResult] = useState(null);
  const [txRef] = useState(genRef());
  const [method, setMethod] = useState("");
  const [card, setCard] = useState({ number: "", expiry: "", cvv: "", name: "" });
  const [cardErrors, setCardErrors] = useState({});

  const amount = parseFloat(request.amount.replace(/[₦,]/g, "")) || 0;
  const fee = Math.round(amount * VYNDER_FEE_RATE);
  const total = amount + fee;

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

  const handlePay = (e) => {
    const errs = validateMethod();
    if (Object.keys(errs).length) { setCardErrors(errs); return; }
    createRipple(e);
    setStep(3);
    setTimeout(() => { setResult(Math.random() > 0.2 ? "success" : "failure"); setStep(4); }, 2800);
  };

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && step !== 3 && onClose()}>
      <div className="modal">
        {step === 2 && (
          <div className="modal-step">
            <div className="modal-header">
              <span className="modal-title">Make Payment</span>
              <button className="modal-close" onClick={onClose}>×</button>
            </div>
            <p className="modal-subtitle">
              Paying <strong>{request.creator}</strong> for <strong>{request.project}</strong>
              <br/>Total: <strong style={{ color: "var(--purple-bright)" }}>₦{total.toLocaleString()}</strong>
            </p>
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
              <button className="modal-btn-secondary" onClick={onClose}>Cancel</button>
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
            <p className="result-sub">₦{total.toLocaleString()} has been sent to {request.creator}. They'll be notified immediately.</p>
            <div className="result-ref">Transaction Ref: {txRef}</div>
            <button className="result-btn" onClick={onClose}>Done</button>
            <button className="result-btn-outline" onClick={onClose}>View Transaction History</button>
          </div>
        )}
        {step === 4 && result === "failure" && (
          <div className="result-screen">
            <div className="result-icon failure">✕</div>
            <h3 className="result-title">Payment Failed</h3>
            <p className="result-sub">We couldn't process your payment. Please check your card details or try another method.</p>
            <div className="result-ref">Failed Ref: {txRef}</div>
            <button className="result-btn" onClick={() => { setResult(null); setCard({ number:"", expiry:"", cvv:"", name:"" }); setCardErrors({}); setStep(2); }}>Try Again</button>
            <button className="result-btn-outline" onClick={onClose}>Cancel</button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── JOB REQUESTS PAGE ── */
function JobRequests() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selected, setSelected] = useState(null);
  const [showPayment, setShowPayment] = useState(false);

  const filtered = jobRequestsData.filter(r => {
    const matchSearch = !search ||
      r.creator.toLowerCase().includes(search.toLowerCase()) ||
      r.project.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || r.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const total = jobRequestsData.length;
  const accepted = jobRequestsData.filter(r => r.status === "accepted").length;
  const pending = jobRequestsData.filter(r => r.status === "pending").length;
  const declined = jobRequestsData.filter(r => r.status === "declined").length;

  // ── DETAIL VIEW ──
  if (selected) {
    return (
      <div className="content">
        <button className="back-btn" onClick={() => setSelected(null)}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
          Back to Job Requests
        </button>

        <div className="jrd-card">
          <div className="jrd-hero">
            <div className="jrd-avatar">{selected.initials}</div>
            <div className="jrd-hero-info">
              <div className="jrd-name">{selected.creator}</div>
              <div className="jrd-role">{selected.role}</div>
              <div className="jrd-desc">{selected.desc}</div>
            </div>
            <span className={`jrd-status-pill ${selected.status}`}>
              {selected.status.charAt(0).toUpperCase() + selected.status.slice(1)}
            </span>
          </div>

          <div className="jrd-meta">
            <div className="jrd-meta-cell">
              <div className="jrd-meta-label">Project</div>
              <div className="jrd-meta-value" style={{ fontSize: 15, fontWeight: 700 }}>{selected.project}</div>
            </div>
            <div className="jrd-meta-cell">
              <div className="jrd-meta-label">Budget Offered</div>
              <div className="jrd-meta-value">{selected.amount}</div>
            </div>
            <div className="jrd-meta-cell">
              <div className="jrd-meta-label">Request Sent</div>
              <div className="jrd-meta-value" style={{ fontSize: 15 }}>{selected.date}</div>
            </div>
          </div>

          <div className="jrd-response">
            <div className="jrd-response-label">Creator's Response</div>
            {selected.response
              ? <p className="jrd-response-text">{selected.response}</p>
              : <p className="jrd-response-empty">No response yet — the creator hasn't replied to this request.</p>
            }
          </div>

          {selected.status === "accepted" && (
            <button className="jrd-make-payment-btn" onClick={(e) => { createRipple(e); setShowPayment(true); }}>
              Make Payment
            </button>
          )}
          {selected.status === "pending" && (
            <button className="jrd-make-payment-btn" disabled>Awaiting Creator Response</button>
          )}
          {selected.status === "declined" && (
            <div className="jrd-declined-note">
              ✕ This creator declined your request. You can browse for another creator with a similar skill set.
            </div>
          )}
        </div>

        {showPayment && (
          <PaymentModalForRequest request={selected} onClose={() => setShowPayment(false)} />
        )}
      </div>
    );
  }

  // ── LIST VIEW ──
  return (
    <div className="content">
      <div className="jr-stats-grid">
        {[
          { label: "Total Sent", value: total, cls: "total", icon: <><polyline points="20 6 9 17 4 12"/></>, stroke: "#3b82f6" },
          { label: "Accepted", value: accepted, cls: "accepted", icon: <><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></>, stroke: "#22c55e" },
          { label: "Pending", value: pending, cls: "pending", icon: <><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>, stroke: "#f97316" },
          { label: "Declined", value: declined, cls: "declined", icon: <><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></>, stroke: "#ef4444" },
        ].map((s) => (
          <div className="jr-stat-card" key={s.label}>
            <div>
              <div className="jr-stat-label">{s.label}</div>
              <div className="jr-stat-value">{s.value}</div>
            </div>
            <div className={`jr-stat-icon ${s.cls}`}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={s.stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{s.icon}</svg>
            </div>
          </div>
        ))}
      </div>

      <div className="jr-toolbar">
        <div className="search-wrap" style={{ flex: 1 }}>
          <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input className="search-input" placeholder="Search job requests..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className="filter-wrap">
          <select className="filter-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="all">All Status</option>
            <option value="accepted">Accepted</option>
            <option value="pending">Pending</option>
            <option value="declined">Declined</option>
          </select>
          <svg className="filter-arrow" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
        </div>
      </div>

      <div className="jr-table-wrap">
        <table>
          <thead>
            <tr>
              <th>Creator</th>
              <th>Project</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
              <th style={{ textAlign: "center" }}>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={6} style={{ textAlign: "center", color: "var(--text-muted)", padding: "40px" }}>No requests found</td></tr>
            ) : filtered.map((r) => (
              <tr key={r.id}>
                <td style={{ fontWeight: 600 }}>{r.creator}</td>
                <td style={{ color: "var(--text-muted)" }}>{r.project}</td>
                <td style={{ fontWeight: 600 }}>{r.amount}</td>
                <td><span className={`jr-status-pill ${r.status}`}>{r.status.charAt(0).toUpperCase() + r.status.slice(1)}</span></td>
                <td style={{ color: "var(--text-muted)" }}>{r.date}</td>
                <td style={{ textAlign: "center" }}>
                  <button className="jr-view-btn" onClick={() => setSelected(r)}>View Details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
  const [briefs, setBriefs] = useState(initialBriefs);

  const handleBriefPosted = (form) => {
    const newBrief = {
      id: briefs.length + 1,
      title: form.title,
      category: form.category,
      budget: `${Number(form.minBudget).toLocaleString()} – ${Number(form.maxBudget).toLocaleString()}`,
      status: "open",
      bids: 0,
      posted: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }),
    };
    setBriefs([newBrief, ...briefs]);
    setPage("briefs");
  };

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
    briefs: { title: "My Briefs", subtitle: "All job briefs you have posted" },
    "post-brief": { title: "Post a New Brief", subtitle: "Tell creators what you need. Be as specific as possible for better matches." },
    "business-profile": { title: "Business Profile", subtitle: "This is how creators see your business on Vynder" },
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
              <div
                className={`topbar-avatar ${page === "business-profile" ? "active" : ""}`}
                onClick={() => setPage("business-profile")}
                title="Business Profile"
              >TC</div>
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
                <button className="post-btn" onClick={(e) => { createRipple(e); setPage("briefs"); }}>
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

          {/* MY BRIEFS */}
          {page === "briefs" && (
            <MyBriefs
              briefs={briefs}
              onPostBrief={() => setPage("post-brief")}
              onBack={() => setPage("dashboard")}
            />
          )}

          {/* POST A BRIEF */}
          {page === "post-brief" && (
            <PostBrief
              onBack={() => setPage("briefs")}
              onSuccess={handleBriefPosted}
            />
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

          {/* BUSINESS PROFILE */}
          {page === "business-profile" && <BusinessProfile />}

          {/* JOB REQUESTS */}
          {page === "jobs" && <JobRequests />}

          {/* PLACEHOLDER PAGES */}
          {["messages", "notifications", "transactions"].includes(page) && (
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