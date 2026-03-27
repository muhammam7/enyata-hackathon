import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const BASE_URL = "http://localhost:8080/api";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --purple: #6C3FE8; --purple-light: #8B5CF6; --purple-dark: #4C1D95;
    --purple-soft: #EDE9FE; --purple-mid: #DDD6FE;
    --white: #FFFFFF; --off-white: #FAFAFA;
    --gray-50: #F8F7FF; --gray-100: #F1EFFF; --gray-200: #E5E1FF;
    --gray-400: #A09DC0; --gray-600: #6B6889; --gray-800: #2D2B45;
    --text: #1A1830; --success: #10B981; --warning: #F59E0B; --danger: #EF4444;
    --font-head: 'Syne', sans-serif; --font-body: 'DM Sans', sans-serif;
    --radius: 14px; --radius-sm: 8px;
    --shadow: 0 4px 24px rgba(108,63,232,0.10); --shadow-lg: 0 8px 40px rgba(108,63,232,0.18);
  }
  body { font-family: var(--font-body); background: var(--gray-50); color: var(--text); min-height: 100vh; }

  .dsh-wrap { display:flex; min-height:100vh; background:var(--gray-50); }

  .sidebar {
    width:248px; background:white; border-right:1px solid #F0EEF8;
    display:flex; flex-direction:column; padding:0;
    position:fixed; top:0; left:0; height:100vh; z-index:100; overflow-y:auto;
  }
  .sidebar-top { padding:28px 24px 0; }
  .sidebar-logo-row { display:flex; align-items:center; gap:8px; margin-bottom:4px; }
  .sidebar-logo { font-family:var(--font-head); font-size:22px; font-weight:800; color:var(--purple); }
  .sidebar-logo-badge { background:var(--purple-soft); color:var(--purple); font-size:10px; font-weight:700; padding:2px 8px; border-radius:20px; letter-spacing:0.3px; }
  .sidebar-org { font-size:12px; color:var(--gray-600); margin-bottom:28px; font-weight:500; }
  .sidebar-section-label {
    font-size:10px; font-weight:700; color:var(--gray-400);
    text-transform:uppercase; letter-spacing:1.2px;
    padding:0 24px; margin-bottom:6px; margin-top:4px;
    display:flex; align-items:center; justify-content:space-between; cursor:pointer;
  }
  .sidebar-section-label svg { transition:transform 0.2s; }
  .nav-item {
    display:flex; align-items:center; gap:12px; padding:11px 24px;
    font-size:14px; font-weight:500; color:var(--gray-600); cursor:pointer;
    transition:all 0.15s; margin:1px 0;
  }
  .nav-item:hover { background:var(--gray-100); color:var(--text); }
  .nav-item.active { background:var(--purple-soft); color:var(--purple); font-weight:600; border-right:3px solid var(--purple); }
  .nav-icon { font-size:16px; width:20px; text-align:center; display:flex; align-items:center; justify-content:center; }
  .nav-badge { margin-left:auto; background:var(--purple); color:white; font-size:10px; padding:2px 7px; border-radius:10px; font-weight:600; }
  .sidebar-bottom { margin-top:auto; padding-top:14px; border-top:1px solid #F0EEF8; }
  .nav-logout { color:var(--danger) !important; }
  .nav-logout:hover { background:#FEF2F2 !important; }

  .main-content { margin-left:248px; flex:1; min-height:100vh; }
  .top-bar {
    background:white; border-bottom:1px solid #F0EEF8;
    padding:14px 32px; display:flex; justify-content:space-between;
    align-items:center; position:sticky; top:0; z-index:50;
  }
  .top-bar-left { display:flex; flex-direction:column; }
  .page-title { font-family:var(--font-head); font-size:19px; font-weight:700; color:var(--text); }
  .page-subtitle { font-size:12px; color:var(--gray-600); margin-top:1px; }
  .top-bar-icons { display:flex; gap:8px; align-items:center; }
  .icon-btn {
    width:38px; height:38px; border:none; background:var(--gray-50);
    border-radius:10px; display:flex; align-items:center; justify-content:center;
    cursor:pointer; position:relative; transition:all 0.15s; color:var(--text);
  }
  .icon-btn:hover { background:var(--purple-soft); color:var(--purple); }
  .notif-badge { position:absolute; top:6px; right:6px; width:8px; height:8px; background:var(--danger); border-radius:50%; border:1.5px solid white; }
  .avatar-sm {
    width:34px; height:34px; border-radius:50%; background:var(--purple);
    display:flex; align-items:center; justify-content:center;
    color:white; font-family:var(--font-head); font-weight:700; font-size:12px; cursor:pointer;
  }
  .content-area { padding:28px 32px; }

  .wallet-bar {
    display:grid; grid-template-columns:1fr 1fr 1fr auto;
    background:linear-gradient(130deg,#4C1D95 0%,#6C3FE8 55%,#8B5CF6 100%);
    border-radius:var(--radius); margin-bottom:24px; overflow:hidden;
  }
  .wallet-section { padding:20px 26px; }
  .wallet-section + .wallet-section { border-left:1px solid rgba(255,255,255,0.12); }
  .wallet-label { font-size:11px; font-weight:600; color:rgba(255,255,255,0.65); text-transform:uppercase; letter-spacing:0.8px; margin-bottom:5px; }
  .wallet-value { font-family:var(--font-head); font-size:22px; font-weight:800; color:white; line-height:1.1; }
  .wallet-sub { font-size:12px; color:rgba(255,255,255,0.6); margin-top:3px; }
  .wallet-action { display:flex; flex-direction:column; align-items:center; justify-content:center; padding:20px 26px; gap:10px; border-left:1px solid rgba(255,255,255,0.12); }
  .withdraw-btn { background:white; color:var(--purple); border:none; padding:10px 22px; border-radius:50px; font-family:var(--font-body); font-size:13px; font-weight:700; cursor:pointer; transition:all 0.2s; white-space:nowrap; box-shadow:0 2px 12px rgba(0,0,0,0.15); }
  .withdraw-btn:hover { background:var(--purple-soft); transform:translateY(-1px); }
  .wallet-link { font-size:12px; color:rgba(255,255,255,0.7); cursor:pointer; background:none; border:none; font-family:var(--font-body); text-decoration:underline; text-underline-offset:3px; }
  .wallet-link:hover { color:white; }

  .stat-cards { display:grid; grid-template-columns:repeat(4,1fr); gap:14px; margin-bottom:24px; }
  .stat-card {
    background:white; border:1px solid #F0EEF8; border-radius:var(--radius);
    padding:18px 20px; cursor:pointer; transition:all 0.2s; position:relative;
  }
  .stat-card:hover { border-color:var(--purple-mid); box-shadow:var(--shadow); transform:translateY(-2px); }
  .stat-label { font-size:11px; color:var(--gray-600); font-weight:600; margin-bottom:8px; text-transform:uppercase; letter-spacing:0.5px; }
  .stat-value { font-family:var(--font-head); font-size:28px; font-weight:800; }
  .stat-sub { font-size:12px; color:var(--gray-600); margin-top:3px; }

  .dash-grid { display:grid; grid-template-columns:1fr 340px; gap:22px; }
  .section-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:14px; }
  .section-title-sm { font-family:var(--font-head); font-size:16px; font-weight:700; }
  .view-all { font-size:12px; color:var(--purple); cursor:pointer; font-weight:500; background:none; border:none; font-family:var(--font-body); }
  .view-all:hover { text-decoration:underline; }

  .table-wrapper { background:white; border:1px solid #F0EEF8; border-radius:var(--radius); overflow:hidden; overflow-x:auto; }
  table { width:100%; border-collapse:collapse; min-width:500px; }
  thead th { background:var(--gray-50); font-size:11px; font-weight:600; color:var(--gray-600); text-transform:uppercase; letter-spacing:0.5px; padding:12px 16px; text-align:left; border-bottom:1px solid #F0EEF8; white-space:nowrap; }
  tbody td { padding:13px 16px; font-size:13px; border-bottom:1px solid var(--gray-50); vertical-align:middle; }
  tbody tr:last-child td { border-bottom:none; }
  tbody tr:hover { background:var(--gray-50); }
  .status-badge { display:inline-flex; align-items:center; padding:4px 10px; border-radius:20px; font-size:11px; font-weight:600; gap:5px; }
  .status-success { background:#D1FAE5; color:#065F46; }
  .status-pending { background:#FEF3C7; color:#92400E; }
  .status-failed { background:#FEE2E2; color:#991B1B; }
  .status-ongoing { background:#DBEAFE; color:#1E40AF; }
  .status-review { background:#FEF3C7; color:#92400E; }
  .action-btn { background:var(--purple-soft); color:var(--purple); border:none; padding:5px 12px; border-radius:6px; font-family:var(--font-body); font-size:12px; font-weight:600; cursor:pointer; transition:all 0.15s; white-space:nowrap; }
  .action-btn:hover { background:var(--purple); color:white; }
  .type-badge { display:inline-block; padding:3px 9px; border-radius:20px; font-size:11px; font-weight:600; }
  .type-credit { background:#D1FAE5; color:#065F46; }
  .type-withdrawal { background:#FEE2E2; color:#991B1B; }

  .ai-section { background:white; border:1px solid #F0EEF8; border-radius:var(--radius); padding:18px; }
  .ai-badge-sm { display:inline-flex; align-items:center; gap:6px; background:linear-gradient(90deg,var(--purple-soft),var(--purple-mid)); color:var(--purple); font-size:11px; font-weight:700; padding:4px 12px; border-radius:20px; margin-bottom:14px; }
  .rec-card { border:1px solid #F0EEF8; border-radius:10px; padding:14px; margin-bottom:10px; transition:all 0.15s; cursor:pointer; }
  .rec-card:hover { border-color:var(--purple-light); background:var(--gray-50); }
  .rec-card:last-child { margin-bottom:0; }
  .rec-top { display:flex; align-items:center; gap:10px; margin-bottom:6px; }
  .rec-avatar { width:36px; height:36px; border-radius:50%; display:flex; align-items:center; justify-content:center; color:white; font-family:var(--font-head); font-size:13px; font-weight:700; flex-shrink:0; }
  .rec-name { font-size:14px; font-weight:600; }
  .rec-role { font-size:12px; color:var(--gray-600); }
  .rec-match { font-size:11px; color:var(--purple); font-weight:600; background:var(--purple-soft); padding:2px 8px; border-radius:10px; margin-left:auto; white-space:nowrap; }
  .rec-desc { font-size:12px; color:var(--gray-600); line-height:1.5; }

  .back-btn { display:inline-flex; align-items:center; gap:6px; font-size:13px; color:var(--gray-600); cursor:pointer; margin-bottom:20px; background:none; border:none; font-family:var(--font-body); padding:0; }
  .back-btn:hover { color:var(--purple); }

  .page-header-bar { margin-bottom:20px; }
  .page-header-bar h2 { font-family:var(--font-head); font-size:20px; font-weight:800; }
  .page-header-bar p { font-size:13px; color:var(--gray-600); margin-top:4px; }

  .filter-bar { display:flex; gap:10px; flex-wrap:wrap; margin-bottom:20px; align-items:flex-end; }
  .filter-group { display:flex; flex-direction:column; gap:4px; }
  .filter-label { font-size:11px; font-weight:600; color:var(--gray-600); text-transform:uppercase; letter-spacing:0.5px; }
  .filter-input { background:white; border:1.5px solid #F0EEF8; border-radius:var(--radius-sm); padding:9px 14px; font-family:var(--font-body); font-size:13px; color:var(--text); outline:none; transition:border-color 0.2s; min-width:140px; }
  .filter-input:focus { border-color:var(--purple); }
  .filter-btn { padding:9px 18px; border-radius:var(--radius-sm); font-family:var(--font-body); font-size:13px; font-weight:500; cursor:pointer; border:none; transition:all 0.2s; }
  .filter-btn-apply { background:var(--purple); color:white; }
  .filter-btn-apply:hover { background:var(--purple-dark); }
  .filter-btn-clear { background:white; color:var(--gray-600); border:1.5px solid #F0EEF8; }
  .filter-btn-clear:hover { border-color:var(--gray-400); color:var(--text); }

  .search-filter-row { display:flex; gap:12px; align-items:center; background:white; border:1px solid #F0EEF8; border-radius:var(--radius); padding:12px 16px; margin-bottom:16px; flex-wrap:wrap; }
  .search-input-wrap { flex:1; min-width:200px; display:flex; align-items:center; gap:8px; }
  .search-input-wrap svg { color:var(--gray-400); flex-shrink:0; }
  .search-input { border:none; outline:none; font-family:var(--font-body); font-size:13px; color:var(--text); background:transparent; flex:1; }
  .search-input::placeholder { color:var(--gray-400); }
  .status-select { border:1.5px solid #F0EEF8; border-radius:var(--radius-sm); padding:7px 12px; font-family:var(--font-body); font-size:13px; color:var(--text); outline:none; cursor:pointer; background:white; min-width:120px; }
  .status-select:focus { border-color:var(--purple); }

  .detail-stat-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(180px,1fr)); gap:14px; margin-bottom:24px; }
  .detail-stat-card { background:white; border:1px solid #F0EEF8; border-radius:var(--radius); padding:18px 20px; position:relative; }
  .detail-stat-label { font-size:11px; font-weight:600; color:var(--gray-600); text-transform:uppercase; letter-spacing:0.5px; margin-bottom:6px; }
  .detail-stat-val { font-family:var(--font-head); font-size:26px; font-weight:800; }

  .bids-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(300px,1fr)); gap:18px; }
  .bid-rec-card { background:white; border:1px solid #F0EEF8; border-radius:var(--radius); padding:22px; transition:all 0.2s; }
  .bid-rec-card:hover { border-color:var(--purple-light); box-shadow:var(--shadow); }
  .bid-rec-top { display:flex; align-items:center; gap:12px; margin-bottom:12px; }
  .bid-rec-avatar { width:46px; height:46px; border-radius:12px; display:flex; align-items:center; justify-content:center; color:white; font-family:var(--font-head); font-weight:700; font-size:16px; flex-shrink:0; }
  .bid-rec-name { font-family:var(--font-head); font-size:15px; font-weight:700; }
  .bid-rec-industry { font-size:12px; color:var(--gray-600); margin-top:2px; }
  .bid-rec-match { font-size:11px; color:var(--purple); font-weight:700; background:var(--purple-soft); padding:3px 10px; border-radius:20px; margin-left:auto; white-space:nowrap; }
  .bid-rec-desc { font-size:13px; color:var(--gray-600); line-height:1.6; margin-bottom:12px; }
  .bid-rec-tags { display:flex; gap:6px; flex-wrap:wrap; margin-bottom:14px; }
  .bid-tag { font-size:11px; background:var(--gray-100); color:var(--gray-800); padding:3px 10px; border-radius:20px; font-weight:500; }
  .bid-rec-meta { font-size:12px; color:var(--gray-600); margin-bottom:14px; }
  .bid-rec-footer { display:flex; gap:8px; }
  .btn-view-detail { flex:1; background:white; color:var(--purple); border:1.5px solid var(--purple-mid); padding:9px; border-radius:8px; font-family:var(--font-body); font-size:12px; font-weight:500; cursor:pointer; transition:all 0.15s; }
  .btn-view-detail:hover { border-color:var(--purple); background:var(--purple-soft); }
  .btn-make-bid { flex:1; background:var(--purple); color:white; border:none; padding:9px; border-radius:8px; font-family:var(--font-body); font-size:12px; font-weight:600; cursor:pointer; transition:all 0.15s; }
  .btn-make-bid:hover { background:var(--purple-dark); }

  .form-group { margin-bottom:16px; }
  .form-label { font-size:13px; font-weight:500; color:var(--gray-800); margin-bottom:6px; display:block; }
  .form-input { width:100%; background:white; border:1.5px solid #F0EEF8; border-radius:var(--radius-sm); padding:11px 14px; font-family:var(--font-body); font-size:14px; color:var(--text); transition:border-color 0.2s; outline:none; }
  .form-input:focus { border-color:var(--purple); box-shadow:0 0 0 3px rgba(108,63,232,0.1); }
  .form-input::placeholder { color:var(--gray-400); }
  .form-select { width:100%; background:white; border:1.5px solid #F0EEF8; border-radius:var(--radius-sm); padding:11px 14px; font-family:var(--font-body); font-size:14px; color:var(--text); outline:none; cursor:pointer; appearance:none; }
  .form-select:focus { border-color:var(--purple); }
  .btn-full { width:100%; background:var(--purple); color:white; border:none; padding:13px; border-radius:50px; font-family:var(--font-body); font-size:14px; font-weight:600; cursor:pointer; transition:all 0.2s; box-shadow:0 4px 16px rgba(108,63,232,0.3); }
  .btn-full:hover { background:var(--purple-dark); transform:translateY(-1px); }
  .btn-full:disabled { opacity:0.6; cursor:not-allowed; transform:none; }

  .success-box { text-align:center; padding:48px 32px; background:white; border:1px solid #F0EEF8; border-radius:20px; }
  .success-circle { width:72px; height:72px; background:#D1FAE5; border-radius:50%; display:flex; align-items:center; justify-content:center; margin:0 auto 20px; }
  .success-title { font-family:var(--font-head); font-size:22px; font-weight:800; margin-bottom:10px; }
  .success-sub { font-size:14px; color:var(--gray-600); line-height:1.65; margin-bottom:28px; }

  .submit-step-bar { display:flex; align-items:flex-start; margin-bottom:28px; background:white; border:1px solid #F0EEF8; border-radius:var(--radius); padding:20px 24px; }
  .submit-step-item { flex:1; display:flex; flex-direction:column; align-items:center; position:relative; }
  .submit-step-circle { width:32px; height:32px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:13px; font-weight:700; margin-bottom:8px; z-index:1; }
  .submit-step-circle.done { background:var(--success); color:white; }
  .submit-step-circle.active { background:var(--purple); color:white; }
  .submit-step-circle.inactive { background:var(--gray-200); color:var(--gray-600); }
  .submit-step-label { font-size:11px; font-weight:600; text-align:center; white-space:nowrap; }
  .submit-step-label.done { color:var(--success); }
  .submit-step-label.active { color:var(--purple); }
  .submit-step-label.inactive { color:var(--gray-400); }
  .submit-step-line { position:absolute; top:16px; left:50%; right:-50%; height:2px; z-index:0; }

  .submit-work-card { background:white; border:1px solid #F0EEF8; border-radius:var(--radius); padding:28px; max-width:640px; }
  .mark-complete-btn { background:#D1FAE5; color:#065F46; border:none; padding:10px 18px; border-radius:50px; font-family:var(--font-body); font-size:13px; font-weight:600; cursor:pointer; transition:all 0.2s; white-space:nowrap; }
  .mark-complete-btn:hover { background:var(--success); color:white; }
  .mark-complete-btn:disabled { background:var(--gray-100); color:var(--gray-400); cursor:not-allowed; }

  .messages-layout { display:grid; grid-template-columns:300px 1fr; height:calc(100vh - 73px); background:white; border-top:1px solid #F0EEF8; overflow:hidden; }
  .chat-list { border-right:1px solid #F0EEF8; display:flex; flex-direction:column; }
  .chat-list-header { padding:16px; border-bottom:1px solid #F0EEF8; }
  .chat-list-title { font-family:var(--font-head); font-size:16px; font-weight:700; margin-bottom:10px; }
  .chat-tabs { display:flex; gap:3px; background:var(--gray-100); border-radius:8px; padding:3px; }
  .chat-tab { flex:1; text-align:center; padding:6px; font-size:12px; font-weight:500; color:var(--gray-600); cursor:pointer; border-radius:6px; transition:all 0.15s; }
  .chat-tab.active { background:white; color:var(--text); font-weight:600; box-shadow:0 1px 4px rgba(0,0,0,0.08); }
  .chat-items { overflow-y:auto; flex:1; }
  .chat-item { display:flex; align-items:center; gap:10px; padding:12px 14px; cursor:pointer; transition:background 0.15s; border-bottom:1px solid var(--gray-50); }
  .chat-item:hover { background:var(--gray-50); }
  .chat-item.active { background:var(--purple-soft); }
  .chat-avt { width:40px; height:40px; border-radius:50%; display:flex; align-items:center; justify-content:center; color:white; font-family:var(--font-head); font-weight:700; font-size:13px; flex-shrink:0; }
  .chat-info { flex:1; min-width:0; }
  .chat-name { font-size:13px; font-weight:600; }
  .chat-preview { font-size:11px; color:var(--gray-600); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; margin-top:1px; }
  .chat-meta { display:flex; flex-direction:column; align-items:flex-end; gap:4px; }
  .chat-time { font-size:10px; color:var(--gray-400); }
  .unread-dot { width:8px; height:8px; background:var(--purple); border-radius:50%; }
  .chat-window { display:flex; flex-direction:column; }
  .chat-header { padding:14px 20px; border-bottom:1px solid #F0EEF8; display:flex; align-items:center; gap:10px; }
  .chat-header-name { font-family:var(--font-head); font-size:15px; font-weight:700; }
  .chat-header-status { font-size:11px; color:var(--success); }
  .chat-messages { flex:1; overflow-y:auto; padding:20px; display:flex; flex-direction:column; gap:12px; background:var(--gray-50); }
  .msg { max-width:65%; }
  .msg.sent { align-self:flex-end; }
  .msg.recv { align-self:flex-start; }
  .msg-bubble { padding:10px 15px; border-radius:16px; font-size:13px; line-height:1.5; }
  .msg.sent .msg-bubble { background:var(--purple); color:white; border-bottom-right-radius:4px; }
  .msg.recv .msg-bubble { background:white; color:var(--text); border:1px solid #F0EEF8; border-bottom-left-radius:4px; }
  .msg-time { font-size:10px; color:var(--gray-400); margin-top:3px; }
  .msg.sent .msg-time { text-align:right; }
  .chat-input-bar { padding:14px 20px; border-top:1px solid #F0EEF8; display:flex; gap:8px; align-items:center; background:white; }
  .chat-input { flex:1; background:var(--gray-50); border:1.5px solid #F0EEF8; border-radius:50px; padding:10px 18px; font-family:var(--font-body); font-size:13px; outline:none; transition:border-color 0.2s; }
  .chat-input:focus { border-color:var(--purple); background:white; }
  .send-btn { width:38px; height:38px; background:var(--purple); border:none; border-radius:50%; color:white; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:all 0.2s; flex-shrink:0; }
  .send-btn:hover { background:var(--purple-dark); }

  .txn-detail-grid { display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:20px; }
  .txn-detail-item label { font-size:11px; font-weight:600; color:var(--gray-400); text-transform:uppercase; letter-spacing:0.5px; display:block; margin-bottom:4px; }
  .txn-detail-item span { font-size:14px; font-weight:500; }

  .notif-item { background:white; border:1px solid #F0EEF8; border-radius:var(--radius); padding:16px 20px; display:flex; gap:14px; align-items:flex-start; transition:all 0.15s; margin-bottom:10px; }
  .notif-item:hover { border-color:var(--purple-mid); }
  .notif-item.unread { border-left:3px solid var(--purple); }
  .notif-dot-el { width:10px; height:10px; background:var(--purple); border-radius:50%; flex-shrink:0; margin-top:4px; }
  .notif-dot-el.read { background:var(--gray-400); }
  .notif-title { font-size:14px; font-weight:600; margin-bottom:3px; }
  .notif-desc { font-size:13px; color:var(--gray-600); line-height:1.5; }
  .notif-time { font-size:11px; color:var(--gray-400); margin-top:5px; }

  .profile-header-card { background:white; border:1px solid #F0EEF8; border-radius:var(--radius); padding:28px; display:flex; gap:24px; align-items:flex-start; margin-bottom:20px; flex-wrap:wrap; }
  .profile-avatar-lg { width:80px; height:80px; border-radius:50%; background:linear-gradient(135deg,var(--purple),var(--purple-light)); display:flex; align-items:center; justify-content:center; color:white; font-family:var(--font-head); font-size:24px; font-weight:800; flex-shrink:0; }
  .profile-name-lg { font-family:var(--font-head); font-size:22px; font-weight:800; margin-bottom:4px; }
  .profile-role-lg { font-size:14px; color:var(--purple); font-weight:600; margin-bottom:8px; }
  .profile-bio { font-size:13px; color:var(--gray-600); line-height:1.6; max-width:480px; }
  .profile-tags-row { display:flex; gap:8px; flex-wrap:wrap; margin-top:12px; }
  .profile-tag { font-size:11px; background:var(--purple-soft); color:var(--purple); padding:4px 12px; border-radius:20px; font-weight:500; }
  .profile-section { background:white; border:1px solid #F0EEF8; border-radius:var(--radius); padding:22px; margin-bottom:16px; }
  .profile-section-title { font-family:var(--font-head); font-size:15px; font-weight:700; margin-bottom:14px; padding-bottom:10px; border-bottom:1px solid #F0EEF8; }
  .profile-info-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(200px,1fr)); gap:14px; }
  .profile-info-label { font-size:11px; font-weight:600; color:var(--gray-400); text-transform:uppercase; letter-spacing:0.5px; display:block; margin-bottom:4px; }
  .profile-info-val { font-size:13px; font-weight:500; color:var(--text); }
  .edit-profile-btn { background:var(--purple-soft); color:var(--purple); border:none; padding:9px 18px; border-radius:8px; font-family:var(--font-body); font-size:13px; font-weight:600; cursor:pointer; transition:all 0.15s; }
  .edit-profile-btn:hover { background:var(--purple); color:white; }
  .portfolio-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(110px,1fr)); gap:10px; }
  .portfolio-item { background:var(--gray-100); border-radius:10px; aspect-ratio:1; display:flex; align-items:center; justify-content:center; font-size:12px; color:var(--gray-600); font-weight:500; border:1px solid #F0EEF8; }

  .settings-tabs { display:flex; border-bottom:2px solid #F0EEF8; margin-bottom:24px; }
  .settings-tab { padding:11px 22px; font-size:14px; font-weight:600; cursor:pointer; border-bottom:2px solid transparent; margin-bottom:-2px; transition:all 0.2s; color:var(--gray-600); background:none; border-left:none; border-right:none; border-top:none; font-family:var(--font-body); }
  .settings-tab.active { color:var(--purple); border-bottom-color:var(--purple); }
  .settings-card { background:white; border:1px solid #F0EEF8; border-radius:var(--radius); padding:26px; margin-bottom:18px; max-width:540px; }
  .settings-card-title { font-family:var(--font-head); font-size:16px; font-weight:700; margin-bottom:18px; }

  .modal-overlay { position:fixed; inset:0; background:rgba(0,0,0,0.5); backdrop-filter:blur(4px); z-index:300; display:flex; align-items:center; justify-content:center; padding:20px; }
  .modal-box { background:white; border-radius:20px; padding:32px; width:100%; max-width:420px; position:relative; animation:slideUp 0.3s cubic-bezier(0.34,1.56,0.64,1); }
  @keyframes slideUp { from{opacity:0;transform:translateY(30px) scale(0.97)} to{opacity:1;transform:translateY(0) scale(1)} }
  .modal-title { font-family:var(--font-head); font-size:20px; font-weight:800; margin-bottom:4px; }
  .modal-sub { font-size:13px; color:var(--gray-600); margin-bottom:22px; }
  .modal-close { position:absolute; top:16px; right:18px; background:none; border:none; font-size:20px; cursor:pointer; color:var(--gray-400); font-weight:700; line-height:1; }
  .modal-close:hover { color:var(--text); }
  .wdraw-balance-box { background:var(--purple-soft); border-radius:var(--radius-sm); padding:14px 18px; margin-bottom:18px; display:flex; justify-content:space-between; align-items:center; }
  .wdraw-balance-label { font-size:12px; color:var(--purple); font-weight:600; }
  .wdraw-balance-val { font-family:var(--font-head); font-size:20px; font-weight:800; color:var(--purple); }
  .wdraw-bank-info { background:var(--gray-50); border:1px solid #F0EEF8; border-radius:var(--radius-sm); padding:12px 14px; margin-bottom:18px; }
  .wdraw-bank-label { font-size:10px; font-weight:700; color:var(--gray-400); text-transform:uppercase; letter-spacing:0.5px; margin-bottom:6px; }
  .wdraw-bank-name { font-size:14px; font-weight:600; margin-bottom:2px; }
  .wdraw-bank-acct { font-size:12px; color:var(--gray-600); }
  .wdraw-success { text-align:center; padding:10px 0; }
  .wdraw-success-circle { width:60px; height:60px; background:#D1FAE5; border-radius:50%; display:flex; align-items:center; justify-content:center; margin:0 auto 14px; }
  .wdraw-success-title { font-family:var(--font-head); font-size:18px; font-weight:800; margin-bottom:6px; }
  .wdraw-success-sub { font-size:13px; color:var(--gray-600); line-height:1.6; }
  .wdraw-error-box { background:#FEF2F2; border:1px solid #FEE2E2; border-radius:var(--radius-sm); padding:12px 14px; margin-bottom:14px; font-size:13px; color:#991B1B; display:flex; align-items:flex-start; gap:8px; }

  .mc-toast { position:fixed; top:24px; left:50%; transform:translateX(-50%) translateY(-80px); background:white; border:1px solid #D1FAE5; border-left:4px solid var(--success); border-radius:12px; padding:14px 20px; display:flex; align-items:center; gap:12px; box-shadow:0 8px 32px rgba(0,0,0,0.12); z-index:500; transition:transform 0.35s cubic-bezier(0.34,1.56,0.64,1); min-width:280px; max-width:90vw; pointer-events:none; }
  .mc-toast.show { transform:translateX(-50%) translateY(0); }
  .mc-toast-icon { width:34px; height:34px; background:#D1FAE5; border-radius:50%; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
  .mc-toast-title { font-family:var(--font-head); font-size:13px; font-weight:700; color:var(--text); margin-bottom:1px; }
  .mc-toast-sub { font-size:11px; color:var(--gray-600); }

  @keyframes spin { to { transform:rotate(360deg); } }
  .spinner { width:44px; height:44px; border:3px solid var(--purple-mid); border-top-color:var(--purple); border-radius:50%; animation:spin 0.8s linear infinite; margin:0 auto 18px; }

  @media (max-width:1100px) { .stat-cards{grid-template-columns:repeat(2,1fr)} .dash-grid{grid-template-columns:1fr} }
  @media (max-width:900px) { .sidebar{display:none} .main-content{margin-left:0} .messages-layout{grid-template-columns:1fr} .txn-detail-grid{grid-template-columns:1fr} }
  @media (max-width:600px) { .stat-cards{grid-template-columns:1fr 1fr} .content-area{padding:18px 16px} .wallet-bar{grid-template-columns:1fr 1fr} }
`;

const openBriefs = [
  { id:0, initials:'TC', color:'linear-gradient(135deg,#6C3FE8,#A78BFA)', business:'TechCorp Nigeria', industry:'Tech Startup', location:'Lagos', match:96, title:'Product Launch Video', category:'Videographer', budget:'120,000 – 200,000', deadline:'Apr 25, 2026', posted:'Mar 15, 2026', desc:'Produce a high-energy product launch campaign video for our new mobile app. 60-second hero video plus 3 short clips for social media. Two-day shoot in Lagos, full creative brief available.', tags:['Videographer','Motion Graphics','Product Shoot'] },
  { id:1, initials:'BL', color:'linear-gradient(135deg,#10B981,#34D399)', business:'Bloom Agency', industry:'Marketing Agency', location:'Abuja', match:89, title:'Monthly Social Content', category:'Social Media Manager', budget:'60,000 – 80,000/month', deadline:'Ongoing', posted:'Mar 14, 2026', desc:'Seeking a social media content creator for monthly content packs across 3 brand clients — Instagram and TikTok. Consistent long-term opportunity for the right creator.', tags:['Social Media','Content Creator','Photography'] },
  { id:2, initials:'NK', color:'linear-gradient(135deg,#F59E0B,#FBBF24)', business:'NaijaKitchen', industry:'Food & Lifestyle', location:'Lagos', match:82, title:'Menu Photoshoot', category:'Photographer', budget:'80,000 – 120,000', deadline:'Apr 10, 2026', posted:'Mar 12, 2026', desc:'Brand photoshoot for our new menu launch. Looking for a photographer with food styling experience. One-time project, shoot to take place at our restaurant in Ikeja.', tags:['Photographer','Food Styling','Lifestyle'] },
  { id:3, initials:'SH', color:'linear-gradient(135deg,#3B82F6,#60A5FA)', business:'StartupHub', industry:'Co-working Space', location:'Lagos', match:78, title:'Brand Documentary', category:'Videographer', budget:'90,000 – 150,000', deadline:'May 15, 2026', posted:'Mar 11, 2026', desc:'Needs a videographer for a brand documentary showcasing our community and impact on the Lagos startup ecosystem. 5–8 minute film with founder interviews.', tags:['Videographer','Documentary','Storytelling'] },
  { id:4, initials:'GF', color:'linear-gradient(135deg,#8B5CF6,#C4B5FD)', business:'GreenFinance', industry:'Fintech', location:'Abuja', match:74, title:'Digital Campaign Content', category:'Videographer', budget:'200,000 – 350,000', deadline:'Jun 1, 2026', posted:'Mar 8, 2026', desc:'Full digital campaign for new savings product launch. Includes hero video, social clips, and graphic assets.', tags:['Content Creator','Videographer','Graphic Design'] },
];

const initialProjects = [
  { id:0, biz:'TechCorp Nigeria', bizInitials:'TC', bizColor:'linear-gradient(135deg,#6C3FE8,#A78BFA)', project:'Product Launch Video', value:'120,000', status:'In Progress', statusClass:'status-ongoing', started:'Mar 18, 2026', desc:"Produce a high-energy product launch campaign video for TechCorp Nigeria's new mobile app.", deliverable:'Final edited video (60s hero + 3 short clips)', deadline:'Apr 25, 2026', workSubmitted:false },
  { id:1, biz:'StartupHub', bizInitials:'SH', bizColor:'linear-gradient(135deg,#3B82F6,#60A5FA)', project:'Brand Documentary', value:'200,000', status:'In Review', statusClass:'status-review', started:'Mar 10, 2026', desc:"A brand documentary showcasing StartupHub's community and impact.", deliverable:'Full documentary + 2 short social cuts', deadline:'Apr 15, 2026', workSubmitted:true },
  { id:2, biz:'FoodieHub', bizInitials:'FH', bizColor:'linear-gradient(135deg,#F59E0B,#FBBF24)', project:'Recipe Video Series', value:'80,000', status:'In Progress', statusClass:'status-ongoing', started:'Mar 19, 2026', desc:'Weekly recipe video series for FoodieHub\'s YouTube and Instagram channels.', deliverable:'4 recipe videos per month (Min. 1080p)', deadline:'Ongoing retainer', workSubmitted:false },
];

const BellIcon = () => <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>;
const MsgIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>;
const SearchIcon = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>;

// ─── WITHDRAW MODAL (wired to real API) ───────────────────────────────────────
function WithdrawModal({ onClose }) {
  const [step, setStep] = useState('confirm'); // confirm | processing | success | error
  const [amount, setAmount] = useState('');
  const [apiError, setApiError] = useState('');
  const [txnRef, setTxnRef] = useState('');

  const process = async () => {
    const parsed = parseFloat(amount);
    if (!amount || isNaN(parsed) || parsed < 5000) {
      setApiError('Minimum withdrawal amount is ₦5,000.');
      return;
    }
    setApiError('');
    setStep('processing');

    try {
      const response = await fetch(`${BASE_URL}/payments/initialize`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          brandEmail: 'amara@vynder.ng', // logged-in creator email
          campaignId: 1,                 // default campaign ID for withdrawal
          amount: parsed,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // API returned error — show it
        throw new Error(data?.message || `Server error: ${response.status}`);
      }

      // Success — capture the transaction ref
      setTxnRef(data.transactionRef || data.id || '');
      setStep('success');
    } catch (err) {
      setApiError(err.message || 'Something went wrong. Please try again.');
      setStep('error');
    }
  };

  const retry = () => { setStep('confirm'); setApiError(''); };

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-box">
        <button className="modal-close" onClick={onClose}>×</button>

        {step === 'confirm' && (
          <>
            <div className="modal-title">Withdraw Funds</div>
            <div className="modal-sub">Funds will be sent to your saved payout account</div>
            <div className="wdraw-balance-box">
              <span className="wdraw-balance-label">Available Balance</span>
              <span className="wdraw-balance-val">₦195,000</span>
            </div>
            <div className="wdraw-bank-info">
              <div className="wdraw-bank-label">Paying to</div>
              <div className="wdraw-bank-name">Zenith Bank — Shalom David</div>
              <div className="wdraw-bank-acct">2045678901</div>
            </div>
            {apiError && (
              <div className="wdraw-error-box">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                {apiError}
              </div>
            )}
            <div className="form-group">
              <label className="form-label">Amount to Withdraw (₦)</label>
              <input
                className="form-input"
                type="number"
                placeholder="e.g. 50000"
                value={amount}
                onChange={e => { setAmount(e.target.value); setApiError(''); }}
              />
            </div>
            <button className="btn-full" onClick={process}>Confirm Withdrawal</button>
          </>
        )}

        {step === 'processing' && (
          <div style={{ textAlign: 'center', padding: '24px 0' }}>
            <div className="spinner" />
            <div style={{ fontFamily: 'var(--font-head)', fontSize: 15, fontWeight: 700 }}>Processing withdrawal...</div>
            <div style={{ fontSize: 12, color: 'var(--gray-600)', marginTop: 6 }}>Talking to the payment server</div>
          </div>
        )}

        {step === 'success' && (
          <div className="wdraw-success">
            <div className="wdraw-success-circle">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="3" strokeLinecap="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
            <div className="wdraw-success-title">Withdrawal Successful</div>
            <div className="wdraw-success-sub">
              ₦{parseFloat(amount).toLocaleString()} has been sent to your Zenith Bank account.
              {txnRef && <><br/><span style={{ fontFamily: 'monospace', fontSize: 11, color: 'var(--gray-400)', marginTop: 6, display: 'block' }}>Ref: {txnRef}</span></>}
            </div>
            <button className="btn-full" style={{ maxWidth: 200, margin: '18px auto 0' }} onClick={onClose}>Done</button>
          </div>
        )}

        {step === 'error' && (
          <div style={{ textAlign: 'center', padding: '10px 0' }}>
            <div style={{ width: 60, height: 60, background: '#FEE2E2', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' }}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="3" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </div>
            <div style={{ fontFamily: 'var(--font-head)', fontSize: 18, fontWeight: 800, marginBottom: 6 }}>Withdrawal Failed</div>
            <div style={{ fontSize: 13, color: 'var(--gray-600)', lineHeight: 1.6, marginBottom: 20 }}>{apiError}</div>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
              <button className="btn-full" style={{ maxWidth: 140 }} onClick={retry}>Try Again</button>
              <button className="filter-btn filter-btn-clear" onClick={onClose}>Cancel</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function OpenBriefs({ onBriefDetail }) {
  const [search, setSearch] = useState('');
  const [cat, setCat] = useState('');
  const filtered = openBriefs.filter(b =>
    (!search || b.title.toLowerCase().includes(search.toLowerCase()) || b.business.toLowerCase().includes(search.toLowerCase())) &&
    (!cat || b.category===cat)
  );
  return (
    <div className="content-area">
      <div className="page-header-bar">
        <div style={{fontFamily:'var(--font-head)',fontSize:12,fontWeight:700,color:'var(--purple)',background:'var(--purple-soft)',display:'inline-block',padding:'3px 12px',borderRadius:20,marginBottom:8,textTransform:'uppercase',letterSpacing:'0.5px'}}>AI Matched to Your Profile</div>
        <h2>Browse Open Briefs</h2>
        <p>Businesses have posted these briefs — submit a bid to be considered</p>
      </div>
      <div className="filter-bar">
        <div className="filter-group" style={{flex:1,minWidth:200}}><span className="filter-label">Search</span><input className="filter-input" type="text" placeholder="Search briefs or businesses..." value={search} onChange={e=>setSearch(e.target.value)}/></div>
        <div className="filter-group"><span className="filter-label">Category</span>
          <select className="filter-input" value={cat} onChange={e=>setCat(e.target.value)}>
            <option value="">All Categories</option>
            {['Videographer','Photographer','Social Media Manager','Graphic Designer','Copywriter'].map(c=><option key={c}>{c}</option>)}
          </select>
        </div>
        <div className="filter-group" style={{flexDirection:'row',gap:8,alignItems:'flex-end'}}>
          <button className="filter-btn filter-btn-clear" onClick={()=>{setSearch('');setCat('');}}>Clear</button>
        </div>
      </div>
      <div className="bids-grid">
        {filtered.map(b=>(
          <div className="bid-rec-card" key={b.id}>
            <div className="bid-rec-top">
              <div className="bid-rec-avatar" style={{background:b.color}}>{b.initials}</div>
              <div style={{flex:1}}><div className="bid-rec-name">{b.title}</div><div className="bid-rec-industry">{b.business} · {b.location}</div></div>
              <div className="bid-rec-match">{b.match}% match</div>
            </div>
            <div className="bid-rec-desc">{b.desc.substring(0,100)}...</div>
            <div className="bid-rec-tags">{b.tags.map(t=><span key={t} className="bid-tag">{t}</span>)}</div>
            <div className="bid-rec-meta">Budget: <strong>₦{b.budget}</strong> · Deadline: {b.deadline}</div>
            <div className="bid-rec-footer">
              <button className="btn-view-detail" onClick={()=>onBriefDetail(b)}>View Brief</button>
              <button className="btn-make-bid" onClick={()=>onBriefDetail(b)}>Submit a Bid</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function BriefDetail({ brief, onBack, onBidSubmitted }) {
  const [bidAmount, setBidAmount] = useState('');
  const [bidNote, setBidNote] = useState('');
  const [portfolio, setPortfolio] = useState('');
  const submit = () => {
    if (!bidAmount) { alert('Please enter your bid amount.'); return; }
    if (!bidNote||bidNote.trim().length<10) { alert('Please write a cover note (at least 10 characters).'); return; }
    onBidSubmitted(brief.title, brief.business);
  };
  return (
    <div className="content-area">
      <button className="back-btn" onClick={onBack}>← Back to Briefs</button>
      <div style={{background:'white',border:'1px solid #F0EEF8',borderRadius:'var(--radius)',padding:28,marginBottom:20}}>
        <div style={{display:'flex',alignItems:'center',gap:16,marginBottom:18,flexWrap:'wrap'}}>
          <div style={{width:54,height:54,borderRadius:14,background:brief.color,display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontFamily:'var(--font-head)',fontSize:17,fontWeight:700,flexShrink:0}}>{brief.initials}</div>
          <div style={{flex:1}}><div style={{fontFamily:'var(--font-head)',fontSize:20,fontWeight:800}}>{brief.title}</div><div style={{fontSize:13,color:'var(--gray-600)',marginTop:3}}>{brief.business} · {brief.industry} · {brief.location}</div></div>
          <div style={{background:'var(--purple-soft)',color:'var(--purple)',fontSize:13,fontWeight:700,padding:'5px 14px',borderRadius:20}}>{brief.match}% AI Match</div>
        </div>
        <div style={{fontSize:14,color:'var(--gray-600)',lineHeight:1.7,marginBottom:20}}>{brief.desc}</div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(150px,1fr))',gap:14,padding:16,background:'var(--gray-50)',borderRadius:'var(--radius-sm)',marginBottom:18}}>
          {[['Budget',`₦${brief.budget}`],['Deadline',brief.deadline],['Posted',brief.posted],['Category',brief.category]].map(([l,v])=>(
            <div key={l}><div style={{fontSize:11,fontWeight:600,color:'var(--gray-400)',textTransform:'uppercase',letterSpacing:'0.5px',marginBottom:4}}>{l}</div><div style={{fontSize:14,fontWeight:700}}>{v}</div></div>
          ))}
        </div>
        <div><div style={{fontSize:11,fontWeight:600,color:'var(--gray-400)',textTransform:'uppercase',letterSpacing:'0.5px',marginBottom:8}}>Skills Required</div><div style={{display:'flex',gap:8,flexWrap:'wrap'}}>{brief.tags.map(t=><span key={t} className="profile-tag">{t}</span>)}</div></div>
      </div>
      <div style={{background:'white',border:'1px solid #F0EEF8',borderRadius:'var(--radius)',padding:28}}>
        <div style={{fontFamily:'var(--font-head)',fontSize:17,fontWeight:800,marginBottom:4}}>Submit Your Bid</div>
        <div style={{fontSize:13,color:'var(--gray-600)',marginBottom:20}}>Tell {brief.business} why you're the right fit.</div>
        <div className="form-group"><label className="form-label">Your Bid Amount (₦) *</label><input className="form-input" type="number" placeholder="e.g. 140000" value={bidAmount} onChange={e=>setBidAmount(e.target.value)}/></div>
        <div className="form-group"><label className="form-label">Cover Note *</label><textarea className="form-input" rows={4} placeholder="Tell the business about your relevant experience..." value={bidNote} onChange={e=>setBidNote(e.target.value)} style={{resize:'vertical',minHeight:100}}/></div>
        <div className="form-group"><label className="form-label">Portfolio Link <span style={{fontWeight:400,color:'var(--gray-400)'}}>(optional)</span></label><input className="form-input" type="url" placeholder="https://yourportfolio.com" value={portfolio} onChange={e=>setPortfolio(e.target.value)}/></div>
        <div style={{display:'flex',gap:12,flexWrap:'wrap'}}>
          <button className="btn-full" style={{flex:1,minWidth:150}} onClick={submit}>Submit Bid</button>
          <button className="filter-btn filter-btn-clear" style={{flex:1,minWidth:110}} onClick={onBack}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

function BidsSubmitted({ onBack, onViewDetail }) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const bids = [
    {biz:'TechCorp Nigeria',proj:'Product Launch Video',amt:'120,000',status:'Accepted',statusClass:'status-success',date:'Mar 18, 2026',desc:'Promotional video for TechCorp Nigeria app launch.',duration:'2-day shoot, April 2026',note:'Hi TechCorp, I have 3 similar product launches in my portfolio.'},
    {biz:'Bloom Agency',proj:'Monthly Social Content',amt:'85,000',status:'Pending',statusClass:'status-pending',date:'Mar 15, 2026',desc:'Monthly social content for Bloom Agency clients.',duration:'Ongoing',note:''},
    {biz:'StartupHub',proj:'Brand Documentary',amt:'200,000',status:'Accepted',statusClass:'status-success',date:'Mar 10, 2026',desc:'Brand documentary for StartupHub.',duration:'3-week shoot',note:'Looking forward to telling your story.'},
    {biz:'NaijaKitchen',proj:'Menu Photoshoot',amt:'75,000',status:'Pending',statusClass:'status-pending',date:'Mar 5, 2026',desc:'Food photography for NaijaKitchen menu.',duration:'1-day shoot',note:''},
    {biz:'GreenMedia',proj:'Corporate Profile Video',amt:'60,000',status:'Declined',statusClass:'status-failed',date:'Feb 28, 2026',desc:'Corporate profile video for GreenMedia.',duration:'1-day shoot',note:''},
  ];
  const filtered = bids.filter(b=>(!search||(b.biz+b.proj).toLowerCase().includes(search.toLowerCase()))&&(!statusFilter||b.status===statusFilter));
  return (
    <div className="content-area">
      <button className="back-btn" onClick={onBack}>← Back to Dashboard</button>
      <div className="page-header-bar"><h2>Bids Submitted</h2><p>Bids you have submitted on business briefs</p></div>
      <div className="detail-stat-grid">
        {[['Total Submitted',9],['Accepted',3],['Pending Response',6],['Declined',3]].map(([l,v])=>(
          <div className="detail-stat-card" key={l}><div className="detail-stat-label">{l}</div><div className="detail-stat-val">{v}</div></div>
        ))}
      </div>
      <div className="search-filter-row">
        <div className="search-input-wrap"><SearchIcon/><input className="search-input" placeholder="Search..." value={search} onChange={e=>setSearch(e.target.value)}/></div>
        <select className="status-select" value={statusFilter} onChange={e=>setStatusFilter(e.target.value)}><option value="">All Status</option><option>Accepted</option><option>Pending</option><option>Declined</option></select>
      </div>
      <div className="table-wrapper">
        <table>
          <thead><tr><th>Business</th><th>Brief / Project</th><th>Your Bid Amount</th><th>Status</th><th>Date</th><th>Action</th></tr></thead>
          <tbody>
            {filtered.map(b=>(
              <tr key={b.proj}>
                <td><strong>{b.biz}</strong></td><td>{b.proj}</td><td>₦{b.amt}</td>
                <td><span className={`status-badge ${b.statusClass}`}>{b.status}</span></td>
                <td style={{fontSize:12,color:'var(--gray-600)'}}>{b.date}</td>
                <td><button className="action-btn" onClick={()=>onViewDetail(b)}>View Details</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function BidSubmittedDetail({ bid, onBack }) {
  return (
    <div className="content-area">
      <button className="back-btn" onClick={onBack}>← Back to Bids Submitted</button>
      <div style={{background:'white',border:'1px solid #F0EEF8',borderRadius:'var(--radius)',padding:32,maxWidth:640}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:20,flexWrap:'wrap',gap:12}}>
          <div><div style={{fontFamily:'var(--font-head)',fontSize:20,fontWeight:800,marginBottom:4}}>{bid.biz}</div><div style={{fontSize:13,color:'var(--gray-600)'}}>{bid.proj}</div></div>
          <span className={`status-badge ${bid.statusClass}`} style={{fontSize:13,padding:'5px 14px'}}>{bid.status}</span>
        </div>
        <div style={{fontSize:14,color:'var(--gray-600)',lineHeight:1.7,marginBottom:22}}>{bid.desc}</div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(150px,1fr))',gap:16,marginBottom:24}}>
          {[['Your Bid Amount',`₦${bid.amt}`],['Duration',bid.duration],['Submitted',bid.date]].map(([l,v])=>(
            <div key={l}><div style={{fontSize:11,fontWeight:600,color:'var(--gray-400)',textTransform:'uppercase',letterSpacing:'0.5px',marginBottom:4}}>{l}</div><div style={{fontFamily:'var(--font-head)',fontSize:18,fontWeight:800}}>{v}</div></div>
          ))}
        </div>
        {bid.note&&<div style={{background:'var(--gray-50)',borderLeft:'3px solid var(--purple-mid)',borderRadius:'0 8px 8px 0',padding:'12px 16px',marginBottom:20}}><div style={{fontSize:11,fontWeight:700,color:'var(--gray-400)',textTransform:'uppercase',marginBottom:6}}>Message Sent</div><div style={{fontSize:13,color:'var(--gray-600)',lineHeight:1.6}}>{bid.note}</div></div>}
        {bid.status==='Accepted'&&<div style={{background:'#D1FAE5',borderRadius:10,padding:'14px 18px'}}><div style={{fontSize:13,fontWeight:700,color:'#065F46',marginBottom:2}}>Bid Accepted — Project is now active</div><div style={{fontSize:12,color:'#065F46'}}>Head to Bid Ongoing to track progress.</div></div>}
      </div>
    </div>
  );
}

function BidsReceived({ onBack, onViewDetail }) {
  const bids = [
    {biz:'FoodieHub',bid:'Recipe Video Series',amount:'180,000',status:'Awaiting Review',statusClass:'status-pending',date:'Mar 19, 2026',desc:'FoodieHub is looking for a videographer for a weekly recipe video series.',budget:'180,000',duration:'Ongoing retainer',isAwaiting:true},
    {biz:'Lagos Fashion Week',bid:'Event Coverage',amount:'250,000',status:'Awaiting Review',statusClass:'status-pending',date:'Mar 17, 2026',desc:'Full event coverage for Lagos Fashion Week 2026.',budget:'250,000',duration:'3-day event, April 2026',isAwaiting:true},
    {biz:'TechCorp Nigeria',bid:'App Launch Promo',amount:'120,000',status:'Accepted',statusClass:'status-success',date:'Mar 10, 2026',desc:'Promotional video for TechCorp Nigeria app launch.',budget:'120,000',duration:'2-day shoot, April 2026',isAwaiting:false},
  ];
  return (
    <div className="content-area">
      <button className="back-btn" onClick={onBack}>← Back to Dashboard</button>
      <div className="page-header-bar"><h2>Bids Received</h2><p>Businesses that have reached out to hire you</p></div>
      <div className="detail-stat-grid">
        {[['Total Received',7],['Awaiting Your Review',2],['Accepted',4],['Declined',1]].map(([l,v])=>(
          <div className="detail-stat-card" key={l}><div className="detail-stat-label">{l}</div><div className="detail-stat-val">{v}</div></div>
        ))}
      </div>
      <div className="table-wrapper">
        <table>
          <thead><tr><th>Business</th><th>Bid Name</th><th>Offered Amount</th><th>Status</th><th>Received Date</th><th>Action</th></tr></thead>
          <tbody>
            {bids.map(b=>(
              <tr key={b.bid}>
                <td><strong>{b.biz}</strong></td><td>{b.bid}</td><td>₦{b.amount}</td>
                <td><span className={`status-badge ${b.statusClass}`}>{b.status}</span></td>
                <td style={{fontSize:12,color:'var(--gray-600)'}}>{b.date}</td>
                <td><button className="action-btn" onClick={()=>onViewDetail(b)}>View Details</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function BidReceivedDetail({ bid, onBack }) {
  return (
    <div className="content-area">
      <button className="back-btn" onClick={onBack}>← Back to Bids Received</button>
      <div style={{background:'white',border:'1px solid #F0EEF8',borderRadius:'var(--radius)',padding:32,maxWidth:640}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:20,flexWrap:'wrap',gap:12}}>
          <div><div style={{fontFamily:'var(--font-head)',fontSize:20,fontWeight:800,marginBottom:4}}>{bid.biz}</div><div style={{fontSize:13,color:'var(--gray-600)'}}>{bid.bid}</div></div>
          <span className={`status-badge ${bid.statusClass}`} style={{fontSize:13,padding:'5px 14px'}}>{bid.status}</span>
        </div>
        <div style={{fontSize:14,color:'var(--gray-600)',lineHeight:1.7,marginBottom:22}}>{bid.desc}</div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(150px,1fr))',gap:16,marginBottom:24}}>
          {[['Offered Amount',`₦${bid.amount}`],['Duration',bid.duration],['Received',bid.date]].map(([l,v])=>(
            <div key={l}><div style={{fontSize:11,fontWeight:600,color:'var(--gray-400)',textTransform:'uppercase',letterSpacing:'0.5px',marginBottom:4}}>{l}</div><div style={{fontFamily:'var(--font-head)',fontSize:18,fontWeight:800}}>{v}</div></div>
          ))}
        </div>
        {bid.isAwaiting ? (
          <div style={{display:'flex',gap:12,flexWrap:'wrap'}}>
            <button className="btn-full" style={{flex:1,minWidth:120}}>Accept Bid</button>
            <button style={{flex:1,minWidth:120,background:'white',color:'var(--danger)',border:'2px solid #FEE2E2',padding:13,borderRadius:50,fontFamily:'var(--font-body)',fontSize:14,fontWeight:600,cursor:'pointer'}}>Decline Bid</button>
          </div>
        ) : (
          <div style={{background:'#D1FAE5',borderRadius:10,padding:'14px 18px'}}><div style={{fontSize:13,fontWeight:700,color:'#065F46',marginBottom:2}}>Bid Accepted — Project is now active</div><div style={{fontSize:12,color:'#065F46'}}>Head to Bid Ongoing to track progress.</div></div>
        )}
      </div>
    </div>
  );
}

function BidOngoing({ onBack, onViewProject, projects }) {
  return (
    <div className="content-area">
      <button className="back-btn" onClick={onBack}>← Back to Dashboard</button>
      <div className="page-header-bar"><h2>Bids Ongoing</h2><p>Active projects currently in progress</p></div>
      <div className="table-wrapper">
        <table>
          <thead><tr><th>Business</th><th>Project / Bid Name</th><th>Value</th><th>Status</th><th>Date Started</th><th>Action</th></tr></thead>
          <tbody>
            {projects.map((p,i)=>(
              <tr key={p.id}>
                <td><strong>{p.biz}</strong></td><td>{p.project}</td><td>₦{p.value}</td>
                <td><span className={`status-badge ${p.statusClass}`}>{p.status}</span></td>
                <td style={{fontSize:12,color:'var(--gray-600)'}}>{p.started}</td>
                <td><button className="action-btn" onClick={()=>onViewProject(p,i)}>View Details</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function OngoingDetail({ project, projectIndex, onBack, onSubmitWork, onMarkComplete }) {
  return (
    <div className="content-area">
      <button className="back-btn" onClick={onBack}>← Back to Bids Ongoing</button>
      <div style={{background:'white',border:'1px solid #F0EEF8',borderRadius:'var(--radius)',padding:28,maxWidth:680}}>
        <div style={{display:'flex',alignItems:'center',gap:14,marginBottom:20,flexWrap:'wrap'}}>
          <div style={{width:52,height:52,borderRadius:'50%',background:project.bizColor,display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontFamily:'var(--font-head)',fontSize:16,fontWeight:700,flexShrink:0}}>{project.bizInitials}</div>
          <div style={{flex:1}}><div style={{fontFamily:'var(--font-head)',fontSize:19,fontWeight:800}}>{project.project}</div><div style={{fontSize:13,color:'var(--purple)',fontWeight:600,marginTop:2}}>{project.biz}</div></div>
          <span className={`status-badge ${project.statusClass}`}>{project.status}</span>
        </div>
        <div style={{fontSize:14,color:'var(--gray-600)',lineHeight:1.7,marginBottom:22}}>{project.desc}</div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(140px,1fr))',gap:16,marginBottom:22,padding:18,background:'var(--gray-50)',borderRadius:'var(--radius-sm)'}}>
          {[['Project Value',`₦${project.value}`],['Started',project.started],['Deadline',project.deadline]].map(([l,v])=>(
            <div key={l}><div style={{fontSize:11,fontWeight:600,color:'var(--gray-400)',textTransform:'uppercase',letterSpacing:'0.5px',marginBottom:3}}>{l}</div><div style={{fontFamily:'var(--font-head)',fontSize:17,fontWeight:800}}>{v}</div></div>
          ))}
        </div>
        <div style={{marginBottom:22}}><div style={{fontSize:11,fontWeight:600,color:'var(--gray-400)',textTransform:'uppercase',letterSpacing:'0.5px',marginBottom:6}}>Expected Deliverable</div><div style={{fontSize:14}}>{project.deliverable}</div></div>
        <div style={{borderTop:'1px solid #F0EEF8',paddingTop:20,display:'flex',gap:12,flexWrap:'wrap',alignItems:'center'}}>
          {project.workSubmitted
            ? <div style={{background:'#D1FAE5',borderRadius:10,padding:'10px 16px',fontSize:13,fontWeight:600,color:'#065F46'}}>Work submitted — awaiting business review</div>
            : <button className="btn-full" style={{maxWidth:200}} onClick={()=>onSubmitWork(project,projectIndex)}>Submit Work</button>
          }
          <button className="mark-complete-btn" disabled={!project.workSubmitted} onClick={()=>onMarkComplete(project.project,projectIndex)}>Mark Complete</button>
        </div>
        {!project.workSubmitted&&<div style={{fontSize:11,color:'var(--gray-400)',marginTop:8}}>Submit your work first before marking complete.</div>}
      </div>
    </div>
  );
}

function SubmitWork({ project, onBack, onSuccess, projectIndex }) {
  const [link, setLink] = useState('');
  const [type, setType] = useState('');
  const [note, setNote] = useState('');
  const submit = () => { if (!link.trim()) { alert('Please paste a delivery link.'); return; } onSuccess(project, projectIndex); };
  const steps = [{label:'Bid Accepted',done:true,active:false},{label:'Submit Work',done:false,active:true},{label:'Biz Approves',done:false,active:false},{label:'Funds Released',done:false,active:false}];
  return (
    <div className="content-area">
      <button className="back-btn" onClick={onBack}>← Back to Bids Ongoing</button>
      <div style={{maxWidth:620}}>
        <div style={{marginBottom:22}}><h2 style={{fontFamily:'var(--font-head)',fontSize:20,fontWeight:800}}>Submit Work</h2><p style={{fontSize:13,color:'var(--gray-600)',marginTop:4}}>Delivering for: {project.biz} — {project.project}</p></div>
        <div className="submit-step-bar">
          {steps.map((s,i)=>(
            <div className="submit-step-item" key={s.label}>
              {i<steps.length-1&&<div className="submit-step-line" style={{background:s.done?'var(--purple)':'var(--gray-200)'}}/>}
              <div className={`submit-step-circle ${s.done?'done':s.active?'active':'inactive'}`}>{s.done?'✓':i+1}</div>
              <div className={`submit-step-label ${s.done?'done':s.active?'active':'inactive'}`}>{s.label}</div>
            </div>
          ))}
        </div>
        <div className="submit-work-card">
          <div className="form-group"><label className="form-label">Delivery Link *</label><input className="form-input" type="url" placeholder="https://drive.google.com/..." value={link} onChange={e=>setLink(e.target.value)}/></div>
          <div className="form-group"><label className="form-label">Deliverable Type</label>
            <select className="form-select" value={type} onChange={e=>setType(e.target.value)}>
              <option value="">Select type</option>
              {['Video File','Photo / Image Gallery','Graphic Design File','Written Content / Document','Audio File','Mixed / Multiple Files','Other'].map(o=><option key={o}>{o}</option>)}
            </select>
          </div>
          <div className="form-group"><label className="form-label">Note to Business <span style={{fontWeight:400,color:'var(--gray-400)'}}>(optional)</span></label><textarea className="form-input" rows={4} placeholder="e.g. All 3 video edits are in the folder..." value={note} onChange={e=>setNote(e.target.value)} style={{resize:'vertical',minHeight:90}}/></div>
          <div style={{display:'flex',gap:12,flexWrap:'wrap'}}>
            <button className="btn-full" style={{flex:1,minWidth:150}} onClick={submit}>Submit Work</button>
            <button className="filter-btn filter-btn-clear" style={{flex:1,minWidth:110}} onClick={onBack}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function CompletedJobs({ onBack }) {
  return (
    <div className="content-area">
      <button className="back-btn" onClick={onBack}>← Back to Dashboard</button>
      <div className="page-header-bar"><h2>Completed Jobs</h2><p>All successfully delivered projects</p></div>
      <div className="detail-stat-grid" style={{gridTemplateColumns:'1fr 1fr',maxWidth:500}}>
        <div className="detail-stat-card"><div className="detail-stat-label">Total Completed</div><div className="detail-stat-val">9</div></div>
        <div className="detail-stat-card"><div className="detail-stat-label">Total Earned</div><div className="detail-stat-val">₦480,000</div></div>
      </div>
      <div className="table-wrapper">
        <table>
          <thead><tr><th>Business</th><th>Project / Bid Name</th><th>Value</th><th>Date Completed</th></tr></thead>
          <tbody>
            {[['NaijaKitchen','Menu Photoshoot','75,000','Mar 5, 2026'],['Bloom Agency','Brand Content Pack','95,000','Feb 20, 2026'],['GreenMedia','Office Event Coverage','60,000','Feb 10, 2026']].map(([b,p,v,d])=>(
              <tr key={p}><td><strong>{b}</strong></td><td>{p}</td><td>₦{v}</td><td style={{fontSize:12,color:'var(--gray-600)'}}>{d}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function TransactionHistory({ onViewTxn }) {
  const txns = [
    {id:'TXN-8821934',payer:'TechCorp Nigeria',bid:'Product Launch Video',amount:'+120,000',type:'Credit',recipient:'Amara Okon',status:'Paid',statusClass:'status-success',typeClass:'type-credit',date:'Mar 18, 2026 · 2:14 PM'},
    {id:'WDR-0034821',payer:'Zenith Bank — Shalom David',bid:'—',amount:'−95,000',type:'Withdrawal',recipient:'Zenith Bank · 2045678901',status:'Successful',statusClass:'status-success',typeClass:'type-withdrawal',date:'Mar 18, 2026 · 3:00 PM'},
    {id:'TXN-8810021',payer:'Bloom Agency',bid:'Social Media Campaign',amount:'+85,000',type:'Credit',recipient:'Amara Okon',status:'Pending',statusClass:'status-pending',typeClass:'type-credit',date:'Mar 15, 2026 · 10:05 AM'},
    {id:'TXN-8793420',payer:'StartupHub',bid:'Brand Documentary',amount:'+200,000',type:'Credit',recipient:'Amara Okon',status:'Paid',statusClass:'status-success',typeClass:'type-credit',date:'Mar 10, 2026 · 4:52 PM'},
    {id:'WDR-0031105',payer:'Zenith Bank',bid:'—',amount:'−150,000',type:'Withdrawal',recipient:'Zenith Bank · 2045678901',status:'Successful',statusClass:'status-success',typeClass:'type-withdrawal',date:'Mar 10, 2026 · 6:15 PM'},
  ];
  return (
    <div className="content-area">
      <div className="filter-bar">
        <div className="filter-group" style={{flex:1,minWidth:180}}><span className="filter-label">Search</span><input className="filter-input" type="text" placeholder="Search transactions..."/></div>
        <div className="filter-group"><span className="filter-label">Start Date</span><input className="filter-input" type="date"/></div>
        <div className="filter-group"><span className="filter-label">End Date</span><input className="filter-input" type="date"/></div>
        <div className="filter-group"><span className="filter-label">Status</span><select className="filter-input"><option>All Status</option><option>Paid</option><option>Pending</option><option>Successful</option></select></div>
        <div className="filter-group" style={{flexDirection:'row',gap:8,alignItems:'flex-end'}}><button className="filter-btn filter-btn-apply">Apply</button><button className="filter-btn filter-btn-clear">Clear</button></div>
      </div>
      <div className="table-wrapper">
        <table>
          <thead><tr><th>Type</th><th>Payer / Payee</th><th>Transaction ID</th><th>Bid Name</th><th>Amount</th><th>Status</th><th>Date / Time</th><th>Action</th></tr></thead>
          <tbody>
            {txns.map(t=>(
              <tr key={t.id}>
                <td><span className={`type-badge ${t.typeClass}`}>{t.type}</span></td>
                <td><strong>{t.payer}</strong></td>
                <td style={{fontFamily:'monospace',fontSize:11,color:'var(--gray-600)'}}>{t.id}</td>
                <td>{t.bid}</td>
                <td style={{color:t.type==='Withdrawal'?'#991B1B':'#065F46',fontWeight:700}}>{t.amount}</td>
                <td><span className={`status-badge ${t.statusClass}`}>{t.status}</span></td>
                <td style={{fontSize:11,color:'var(--gray-600)'}}>{t.date}</td>
                <td><button className="action-btn" onClick={()=>onViewTxn(t)}>View Details</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function TxnDetail({ txn, onBack }) {
  return (
    <div className="content-area">
      <button className="back-btn" onClick={onBack}>← Back to Transactions</button>
      <div style={{background:'white',border:'1px solid #F0EEF8',borderRadius:'var(--radius)',padding:32,maxWidth:620}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:24,flexWrap:'wrap',gap:12}}>
          <div><div style={{fontFamily:'var(--font-head)',fontSize:20,fontWeight:800}}>Transaction Details</div><div style={{fontFamily:'monospace',fontSize:12,color:'var(--gray-600)',marginTop:3}}>{txn.id}</div></div>
          <div style={{display:'flex',gap:8,alignItems:'center',flexWrap:'wrap'}}><span className={`type-badge ${txn.typeClass}`} style={{fontSize:12,padding:'4px 12px'}}>{txn.type}</span><span className={`status-badge ${txn.statusClass}`} style={{fontSize:12,padding:'5px 14px'}}>{txn.status}</span></div>
        </div>
        <div className="txn-detail-grid">
          {[['Payer / Sender',txn.payer],['Recipient',txn.recipient],['Bid / Project',txn.bid],['Amount',txn.amount],['Date & Time',txn.date],['Transaction ID',txn.id],['Payment Method','Vynder Wallet'],['Platform Fee',txn.type==='Withdrawal'?'—':'₦2,400']].map(([l,v])=>(
            <div className="txn-detail-item" key={l}><label>{l}</label><span style={l==='Amount'?{fontFamily:'var(--font-head)',fontSize:20,fontWeight:800,color:txn.type==='Withdrawal'?'#991B1B':'#065F46'}:{}}>{v}</span></div>
          ))}
        </div>
        <div style={{marginTop:22,paddingTop:18,borderTop:'1px solid #F0EEF8',display:'flex',gap:12,flexWrap:'wrap'}}>
          <button className="filter-btn filter-btn-apply" onClick={onBack}>Back to Transactions</button>
          <button className="filter-btn filter-btn-clear">Download Receipt</button>
        </div>
      </div>
    </div>
  );
}

function Notifications() {
  const items = [
    {unread:true,title:'New business match — TechCorp Nigeria',desc:"TechCorp Nigeria has been matched to your profile with a 96% compatibility score.",time:'Today · 11:30 AM'},
    {unread:true,title:'Your bid was accepted — StartupHub',desc:"StartupHub accepted your bid for the Brand Documentary project.",time:'Today · 9:15 AM'},
    {unread:true,title:'Payment received — ₦120,000',desc:"TechCorp Nigeria completed payment. Funds are now in your Vynder wallet.",time:'Mar 18, 2026 · 2:14 PM'},
    {unread:false,title:'New message from Bloom Agency',desc:"Bloom Agency sent you a message regarding an ongoing retainer opportunity.",time:'Mar 15, 2026 · 10:05 AM'},
    {unread:false,title:'Profile viewed by NaijaKitchen',desc:"NaijaKitchen viewed your creator profile.",time:'Mar 14, 2026 · 3:40 PM'},
  ];
  return (
    <div className="content-area">
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:20}}>
        <div><h2 style={{fontFamily:'var(--font-head)',fontSize:20,fontWeight:800}}>Notifications</h2><p style={{fontSize:13,color:'var(--gray-600)',marginTop:4}}>3 unread</p></div>
        <button className="filter-btn filter-btn-clear">Mark all as read</button>
      </div>
      {items.map((n,i)=>(
        <div key={i} className={`notif-item ${n.unread?'unread':''}`}>
          <div className={`notif-dot-el ${n.unread?'':'read'}`}/>
          <div><div className="notif-title">{n.title}</div><div className="notif-desc">{n.desc}</div><div className="notif-time">{n.time}</div></div>
        </div>
      ))}
    </div>
  );
}

function ProfilePage() {
  return (
    <div className="content-area">
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:22,flexWrap:'wrap',gap:12}}>
        <div><h2 style={{fontFamily:'var(--font-head)',fontSize:20,fontWeight:800}}>My Profile</h2><p style={{fontSize:13,color:'var(--gray-600)',marginTop:4}}>This is how businesses see you on Vynder</p></div>
        <button className="edit-profile-btn">Edit Profile</button>
      </div>
      <div className="profile-header-card">
        <div className="profile-avatar-lg">AO</div>
        <div style={{flex:1}}>
          <div className="profile-name-lg">Amara Okon</div>
          <div className="profile-role-lg">Videographer & Content Creator</div>
          <div className="profile-bio">Lagos-based videographer with 4+ years producing commercial videos, brand documentaries, and social content for businesses across Nigeria.</div>
          <div className="profile-tags-row">{['Videographer','Content Creator','Brand Films','Social Media'].map(t=><span key={t} className="profile-tag">{t}</span>)}</div>
        </div>
        <div style={{textAlign:'right',flexShrink:0}}>
          <div style={{fontSize:11,color:'var(--gray-600)',marginBottom:4,textTransform:'uppercase',letterSpacing:'0.5px',fontWeight:600}}>AI Match Score</div>
          <div style={{fontFamily:'var(--font-head)',fontSize:28,fontWeight:800,color:'var(--purple)'}}>94%</div>
          <div style={{fontSize:12,color:'var(--gray-600)'}}>avg. match with businesses</div>
        </div>
      </div>
      <div className="profile-section">
        <div className="profile-section-title">Contact & Basic Info</div>
        <div className="profile-info-grid">
          {[['Email','amara@vynder.ng'],['Location','Lagos, Nigeria'],['Starting Rate','₦150,000 per project'],['Availability','Available for new projects'],['Portfolio','amaraokon.com'],['Member Since','Jan 2026']].map(([l,v])=>(
            <div key={l}><span className="profile-info-label">{l}</span><span className="profile-info-val" style={l==='Portfolio'?{color:'var(--purple)'}:{}}>{v}</span></div>
          ))}
        </div>
      </div>
      <div className="profile-section">
        <div className="profile-section-title">Performance Summary</div>
        <div className="profile-info-grid">
          {[['Jobs Completed','9'],['Bids Won','9 of 12 sent'],['Total Earned','₦480,000'],['Response Rate','98%']].map(([l,v])=>(
            <div key={l}><span className="profile-info-label">{l}</span><span className="profile-info-val">{v}</span></div>
          ))}
        </div>
      </div>
      <div className="profile-section">
        <div className="profile-section-title">Portfolio Samples</div>
        <div className="portfolio-grid">
          {['Sample 1','Sample 2','Sample 3','Sample 4'].map(s=><div key={s} className="portfolio-item">{s}</div>)}
          <div className="portfolio-item" style={{border:'2px dashed var(--purple-mid)',color:'var(--purple)',cursor:'pointer'}}>+ Add</div>
        </div>
      </div>
    </div>
  );
}

function SettingsPage() {
  const [activeTab, setActiveTab] = useState('payout');
  const [acctNum, setAcctNum] = useState('');
  const [verifyState, setVerifyState] = useState('idle');
  const handleVerify = () => { setVerifyState('loading'); setTimeout(()=>setVerifyState('verified'),1400); };
  return (
    <div className="content-area">
      <div className="settings-tabs">
        {['payout','security','notifications'].map(t=>(
          <button key={t} className={`settings-tab ${activeTab===t?'active':''}`} onClick={()=>setActiveTab(t)}>{t.charAt(0).toUpperCase()+t.slice(1)}</button>
        ))}
      </div>
      {activeTab==='payout'&&(
        <div className="settings-card">
          <div className="settings-card-title">Payout Settings</div>
          <p style={{fontSize:13,color:'var(--gray-600)',marginBottom:20,lineHeight:1.6}}>Your bank details are private and only used by Vynder to settle payments.</p>
          <div className="form-group"><label className="form-label">Bank Name</label><select className="form-select"><option value="">Select your bank</option>{['Access Bank','First Bank','GTBank','UBA','Zenith Bank','Kuda Bank','Opay','Palmpay'].map(b=><option key={b}>{b}</option>)}</select></div>
          <div className="form-group"><label className="form-label">Account Number</label>
            <div style={{display:'flex',gap:10,alignItems:'flex-start'}}>
              <input className="form-input" type="text" placeholder="Enter 10-digit account number" maxLength={10} value={acctNum} onChange={e=>{setAcctNum(e.target.value);if(e.target.value.length!==10)setVerifyState('idle');}} style={{flex:1}}/>
              <button style={{padding:'11px 16px',background:verifyState==='verified'?'var(--success)':'var(--purple)',color:'white',border:'none',borderRadius:'var(--radius-sm)',fontFamily:'var(--font-body)',fontSize:13,fontWeight:600,cursor:acctNum.length===10?'pointer':'not-allowed',opacity:acctNum.length===10?1:0.5,whiteSpace:'nowrap',transition:'all 0.2s'}} onClick={handleVerify} disabled={acctNum.length!==10||verifyState!=='idle'}>{verifyState==='loading'?'Verifying...':verifyState==='verified'?'Verified ✓':'Verify'}</button>
            </div>
            {verifyState==='verified'&&<div style={{background:'var(--gray-50)',border:'1.5px solid var(--success)',borderRadius:'var(--radius-sm)',padding:'12px 16px',marginTop:10}}><div style={{fontSize:15,fontWeight:700}}>SHALOM DAVID</div><div style={{fontSize:12,color:'var(--success)',marginTop:3}}>Verified</div></div>}
          </div>
          <button className="btn-full" style={{marginTop:4}}>Save Payout Details</button>
        </div>
      )}
      {activeTab==='security'&&(
        <div className="settings-card" style={{maxWidth:460}}>
          <div className="settings-card-title">Change Password</div>
          <div className="form-group"><label className="form-label">Current Password</label><input className="form-input" type="password" placeholder="Enter current password"/></div>
          <div className="form-group"><label className="form-label">New Password</label><input className="form-input" type="password" placeholder="At least 8 characters"/></div>
          <div className="form-group"><label className="form-label">Confirm New Password</label><input className="form-input" type="password" placeholder="Repeat new password"/></div>
          <button className="btn-full" style={{marginTop:4}}>Update Password</button>
        </div>
      )}
      {activeTab==='notifications'&&(
        <div className="settings-card" style={{maxWidth:460}}>
          <div className="settings-card-title">Notification Preferences</div>
          <div style={{display:'flex',flexDirection:'column',gap:16}}>
            {[['New bid received','When a business sends you a bid',true],['Payment received','When a business completes payment',true],['New AI match','When AI finds a new business match',true],['Messages','When you receive a new message',false]].map(([title,desc,checked])=>(
              <div key={title} style={{display:'flex',justifyContent:'space-between',alignItems:'center',paddingBottom:16,borderBottom:'1px solid #F0EEF8'}}>
                <div><div style={{fontSize:14,fontWeight:600}}>{title}</div><div style={{fontSize:12,color:'var(--gray-600)',marginTop:2}}>{desc}</div></div>
                <div style={{width:42,height:23,borderRadius:12,background:checked?'var(--purple)':'var(--gray-200)',position:'relative',cursor:'pointer',flexShrink:0}}>
                  <div style={{position:'absolute',height:17,width:17,left:checked?22:3,bottom:3,background:'white',borderRadius:'50%',transition:'left 0.2s'}}/>
                </div>
              </div>
            ))}
          </div>
          <button className="btn-full" style={{marginTop:20}}>Save Preferences</button>
        </div>
      )}
    </div>
  );
}

function MessagesPage() {
  const convos = [
    {id:1,initials:'TC',name:'TechCorp Nigeria',preview:"Sounds good! Can you share your availability?",time:'11:42',unread:true,color:'linear-gradient(135deg,#6C3FE8,#A78BFA)',msgs:[
      {from:'recv',text:"Hi Amara! We came across your profile via Vynder.",time:'11:30 AM'},
      {from:'sent',text:"Thank you! I'd love to hear more. What's the scope?",time:'11:35 AM'},
      {from:'recv',text:"2-day shoot, late April. Budget ~₦200k.",time:'11:38 AM'},
      {from:'sent',text:"That works! Can you share a brief so I can quote formally?",time:'11:40 AM'},
      {from:'recv',text:"Sounds good! Can you share your availability for a quick call?",time:'11:42 AM'},
    ]},
    {id:2,initials:'BL',name:'Bloom Agency',preview:"We loved your portfolio. Let's talk.",time:'Tue',unread:true,color:'linear-gradient(135deg,#10B981,#34D399)',msgs:[{from:'recv',text:"We loved your portfolio. Let's talk about a retainer.",time:'Tue 2:00 PM'}]},
    {id:3,initials:'NK',name:'NaijaKitchen',preview:"Great, we'll proceed with your quote.",time:'Mon',unread:false,color:'linear-gradient(135deg,#F59E0B,#FBBF24)',msgs:[{from:'sent',text:"Sent the quote for the menu photoshoot.",time:'Mon 10:00 AM'},{from:'recv',text:"Great, we'll proceed.",time:'Mon 11:00 AM'}]},
    {id:4,initials:'SH',name:'StartupHub',preview:"Payment has been processed.",time:'Mar 10',unread:false,color:'linear-gradient(135deg,#3B82F6,#60A5FA)',msgs:[{from:'recv',text:"Payment processed. Thanks for the amazing documentary!",time:'Mar 10'}]},
  ];
  const [active, setActive] = useState(convos[0]);
  const [input, setInput] = useState('');
  const [msgs, setMsgs] = useState(convos[0].msgs);
  const [tab, setTab] = useState('All');
  const endRef = useRef(null);
  const selectConvo = (c)=>{ setActive(c); setMsgs(c.msgs); };
  const sendMsg = ()=>{
    if (!input.trim()) return;
    const m = {from:'sent',text:input.trim(),time:new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})};
    setMsgs(prev=>[...prev,m]); setInput('');
    setTimeout(()=>setMsgs(prev=>[...prev,{from:'recv',text:"Got it! I'll get on that right away.",time:new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})}]),2000);
  };
  useEffect(()=>{ endRef.current?.scrollIntoView({behavior:'smooth'}); },[msgs]);
  return (
    <div style={{padding:0,height:'calc(100vh - 73px)'}}>
      <div className="messages-layout">
        <div className="chat-list">
          <div className="chat-list-header">
            <div className="chat-list-title">Messages</div>
            <div className="chat-tabs">{['All','Unread'].map(t=><div key={t} className={`chat-tab ${tab===t?'active':''}`} onClick={()=>setTab(t)}>{t}</div>)}</div>
          </div>
          <div className="chat-items">
            {convos.filter(c=>tab==='All'||c.unread).map(c=>(
              <div key={c.id} className={`chat-item ${active?.id===c.id?'active':''}`} onClick={()=>selectConvo(c)}>
                <div className="chat-avt" style={{background:c.color}}>{c.initials}</div>
                <div className="chat-info"><div className="chat-name">{c.name}</div><div className="chat-preview">{c.preview}</div></div>
                <div className="chat-meta"><div className="chat-time">{c.time}</div>{c.unread&&<div className="unread-dot"/>}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="chat-window">
          <div className="chat-header">
            <div className="chat-avt" style={{width:34,height:34,fontSize:12,background:active?.color}}>{active?.initials}</div>
            <div><div className="chat-header-name">{active?.name}</div><div className="chat-header-status">Online</div></div>
          </div>
          <div className="chat-messages">
            {msgs.map((m,i)=>(
              <div key={i} className={`msg ${m.from==='sent'?'sent':'recv'}`}>
                <div className="msg-bubble">{m.text}</div>
                <div className="msg-time">{m.time}</div>
              </div>
            ))}
            <div ref={endRef}/>
          </div>
          <div className="chat-input-bar">
            <input className="chat-input" type="text" placeholder="Type a message..." value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&sendMsg()}/>
            <button className="send-btn" onClick={sendMsg}>↑</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Sidebar({ page, setPage, onLogout }) {
  const [menuOpen, setMenuOpen] = useState(true);
  const navItems = [
    {label:'Dashboard',icon:<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>,page:'dashboard'},
    {label:'Browse Briefs',icon:<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>,page:'briefs'},
    {label:'Messages',icon:<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,page:'messages',badge:2},
    {label:'Notifications',icon:<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>,page:'notifications'},
    {label:'Transaction History',icon:<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,page:'transactions'},
  ];
  return (
    <nav className="sidebar">
      <div className="sidebar-top">
        <div className="sidebar-logo-row">
          <span className="sidebar-logo">vynder</span>
          <span className="sidebar-logo-badge">Creator</span>
        </div>
        <div className="sidebar-org">Vynder Platform</div>
        <div className="sidebar-section-label" onClick={()=>setMenuOpen(!menuOpen)}>
          Menu
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="18 15 12 9 6 15"/></svg>
        </div>
        {menuOpen&&navItems.map(item=>(
          <div key={item.label} className={`nav-item ${page===item.page?'active':''}`} onClick={()=>setPage(item.page)}>
            <span className="nav-icon">{item.icon}</span>
            {item.label}
            {item.badge&&<span className="nav-badge">{item.badge}</span>}
          </div>
        ))}
      </div>
      <div className="sidebar-bottom">
        <div className="sidebar-section-label">Account</div>
        <div className={`nav-item ${page==='settings'?'active':''}`} onClick={()=>setPage('settings')}>
          <span className="nav-icon"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg></span>
          Settings
        </div>
        <div className={`nav-item ${page==='profile'?'active':''}`} onClick={()=>setPage('profile')}>
          <span className="nav-icon"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></span>
          My Profile
        </div>
        <div className="nav-item nav-logout" onClick={onLogout}>
          <span className="nav-icon"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg></span>
          Logout
        </div>
      </div>
    </nav>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [page, setPage] = useState('dashboard');
  const [subPage, setSubPage] = useState(null);
  const [subData, setSubData] = useState(null);
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [projects, setProjects] = useState(initialProjects);
  const [toastMsg, setToastMsg] = useState('');
  const [toastShow, setToastShow] = useState(false);

  const showToast = (msg) => { setToastMsg(msg); setToastShow(true); setTimeout(()=>setToastShow(false),4000); };
  const navToPage = (p) => { setPage(p); setSubPage(null); setSubData(null); };
  const handleLogout = () => navigate('/');

  const handleMarkComplete = (projectName, idx) => {
    setProjects(prev=>prev.map((p,i)=>i===idx?{...p,status:'Completed',statusClass:'status-success'}:p));
    showToast(`"${projectName}" marked complete. Payment moving to Available Balance.`);
    setSubPage(null);
  };
  const handleSubmitWorkSuccess = (project, idx) => {
    setProjects(prev=>prev.map((p,i)=>i===idx?{...p,workSubmitted:true}:p));
    setSubPage('submit-success');
    setSubData({project,idx});
  };

  const pageTitles = { dashboard:'Dashboard',briefs:'Browse Briefs',messages:'Messages',transactions:'Transaction History',notifications:'Notifications',profile:'My Profile',settings:'Settings' };
  const subPageTitles = {
    'brief-detail':subData?.title||'Brief Details','bid-submitted-form':'Bid Submitted',
    'bids-submitted':'Bids Submitted','bids-submitted-detail':subData?`${subData.biz} — ${subData.proj}`:'Bid Details',
    'bids-received':'Bids Received','bid-received-detail':subData?`${subData.biz} — ${subData.bid}`:'Bid Details',
    'bid-ongoing':'Bids Ongoing','ongoing-detail':subData?.project||'Project Details',
    'submit-work':'Submit Work','submit-success':'Work Submitted','completed':'Completed Jobs','txn-detail':'Transaction Details',
  };
  const currentTitle = subPage?(subPageTitles[subPage]||'Details'):(pageTitles[page]||'Dashboard');
  const currentSubtitle = subPage?'':({dashboard:"Here's your activity at a glance",briefs:'Find open briefs matched to your profile',messages:'Your conversations with businesses',transactions:'All your earnings and withdrawals',notifications:'Stay up to date',profile:'Your public creator profile',settings:'Manage your account'}[page]||'');

  const renderContent = () => {
    if (subPage==='brief-detail') return <BriefDetail brief={subData} onBack={()=>setSubPage(null)} onBidSubmitted={(t,b)=>{setSubPage('bid-submitted-form');setSubData({title:t,biz:b});}}/>;
    if (subPage==='bid-submitted-form') return (
      <div className="content-area"><div style={{maxWidth:460,margin:'60px auto'}}>
        <div className="success-box">
          <div className="success-circle"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg></div>
          <div className="success-title">Bid Submitted!</div>
          <div className="success-sub">Your bid for "{subData?.title}" has been submitted to {subData?.biz}. You'll be notified once they respond.</div>
          <button className="btn-full" style={{maxWidth:240,margin:'0 auto'}} onClick={()=>navToPage('dashboard')}>Back to Dashboard</button>
          <div style={{marginTop:12}}><span style={{fontSize:13,color:'var(--purple)',cursor:'pointer',fontWeight:500}} onClick={()=>{setSubPage(null);navToPage('briefs');}}>Browse more briefs</span></div>
        </div>
      </div></div>
    );
    if (subPage==='bids-submitted') return <BidsSubmitted onBack={()=>setSubPage(null)} onViewDetail={b=>{setSubPage('bids-submitted-detail');setSubData(b);}}/>;
    if (subPage==='bids-submitted-detail') return <BidSubmittedDetail bid={subData} onBack={()=>setSubPage('bids-submitted')}/>;
    if (subPage==='bids-received') return <BidsReceived onBack={()=>setSubPage(null)} onViewDetail={b=>{setSubPage('bid-received-detail');setSubData(b);}}/>;
    if (subPage==='bid-received-detail') return <BidReceivedDetail bid={subData} onBack={()=>setSubPage('bids-received')}/>;
    if (subPage==='bid-ongoing') return <BidOngoing onBack={()=>setSubPage(null)} onViewProject={(p,i)=>{setSubPage('ongoing-detail');setSubData({...p,idx:i});}} projects={projects}/>;
    if (subPage==='ongoing-detail') return <OngoingDetail project={subData} projectIndex={subData.idx} onBack={()=>setSubPage('bid-ongoing')} onSubmitWork={(p,i)=>{setSubPage('submit-work');setSubData({...p,idx:i});}} onMarkComplete={handleMarkComplete}/>;
    if (subPage==='submit-work') return <SubmitWork project={subData} projectIndex={subData.idx} onBack={()=>setSubPage('ongoing-detail')} onSuccess={handleSubmitWorkSuccess}/>;
    if (subPage==='submit-success') return (
      <div className="content-area"><div style={{maxWidth:440,margin:'60px auto'}}>
        <div className="success-box">
          <div className="success-circle"><svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg></div>
          <div className="success-title">Work Submitted!</div>
          <div className="success-sub">Your work for "{subData?.project?.project}" has been sent for review.</div>
          <button className="btn-full" style={{maxWidth:240,margin:'0 auto'}} onClick={()=>{setSubPage('bid-ongoing');setSubData(null);}}>Back to Ongoing</button>
          <div style={{marginTop:12}}><span style={{fontSize:13,color:'var(--purple)',cursor:'pointer',fontWeight:500}} onClick={()=>navToPage('dashboard')}>Go to Dashboard</span></div>
        </div>
      </div></div>
    );
    if (subPage==='completed') return <CompletedJobs onBack={()=>setSubPage(null)}/>;
    if (subPage==='txn-detail') return <TxnDetail txn={subData} onBack={()=>setSubPage(null)}/>;

    if (page==='dashboard') return (
      <div className="content-area">
        <div className="wallet-bar">
          <div className="wallet-section"><div className="wallet-label">Total Earned</div><div className="wallet-value">₦480,000</div><div className="wallet-sub">+18% vs last month</div></div>
          <div className="wallet-section"><div className="wallet-label">Available Balance</div><div className="wallet-value">₦195,000</div><div className="wallet-sub">Ready to withdraw</div></div>
          <div className="wallet-section"><div className="wallet-label">Pending</div><div className="wallet-value">₦85,000</div><div className="wallet-sub">Awaiting clearance</div></div>
          <div className="wallet-action"><button className="withdraw-btn" onClick={()=>setShowWithdraw(true)}>Withdraw</button><button className="wallet-link" onClick={()=>navToPage('transactions')}>View history</button></div>
        </div>
        <div style={{marginBottom:20}}>
          <h2 style={{fontFamily:'var(--font-head)',fontSize:21,fontWeight:800}}>Good morning, Amara 👋</h2>
          <p style={{fontSize:13,color:'var(--gray-600)',marginTop:4}}>Here's a summary of your activity today</p>
        </div>
        <div className="stat-cards">
          {[
            ['Bids Submitted',12,'On open briefs','bids-submitted'],
            ['Bids Received',7,'2 awaiting review','bids-received'],
            ['Bid Ongoing',3,'Active projects','bid-ongoing'],
            ['Completed Jobs',9,'All time','completed'],
          ].map(([l,v,s,sp])=>(
            <div key={l} className="stat-card" onClick={()=>setSubPage(sp)}>
              <div className="stat-label">{l}</div><div className="stat-value">{v}</div><div className="stat-sub">{s}</div>
            </div>
          ))}
        </div>
        <div className="dash-grid">
          <div>
            <div className="section-header"><span className="section-title-sm">Recent Transactions</span><button className="view-all" onClick={()=>navToPage('transactions')}>View all</button></div>
            <div className="table-wrapper">
              <table>
                <thead><tr><th>Payer</th><th>Bid Name</th><th>Amount</th><th>Status</th><th>Date</th></tr></thead>
                <tbody>
                  {[['TechCorp Nigeria','Product Launch Video','120,000','success','Paid','Mar 18'],['Bloom Agency','Social Media Campaign','85,000','pending','Pending','Mar 15'],['StartupHub','Brand Documentary','200,000','success','Paid','Mar 10']].map(([p,b,a,s,sl,d])=>(
                    <tr key={b}><td><strong>{p}</strong></td><td>{b}</td><td><strong style={{color:'#065F46'}}>₦{a}</strong></td><td><span className={`status-badge status-${s}`}>{sl}</span></td><td style={{fontSize:12,color:'var(--gray-600)'}}>{d}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <div className="section-header"><span className="section-title-sm">Open Briefs for You</span><button className="view-all" onClick={()=>navToPage('briefs')}>View all</button></div>
            <div className="ai-section">
              <div className="ai-badge-sm">✦ AI Matched to Your Profile</div>
              {openBriefs.slice(0,3).map(b=>(
                <div key={b.id} className="rec-card" onClick={()=>{setSubPage('brief-detail');setSubData(b);}}>
                  <div className="rec-top">
                    <div className="rec-avatar" style={{background:b.color}}>{b.initials}</div>
                    <div style={{flex:1}}><div className="rec-name">{b.title}</div><div className="rec-role">{b.business} · {b.location}</div></div>
                    <div className="rec-match">{b.match}%</div>
                  </div>
                  <div className="rec-desc">{b.desc.substring(0,90)}...</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
    if (page==='briefs') return <OpenBriefs onBriefDetail={b=>{setSubPage('brief-detail');setSubData(b);}}/>;
    if (page==='messages') return <MessagesPage/>;
    if (page==='transactions') return <TransactionHistory onViewTxn={t=>{setSubPage('txn-detail');setSubData(t);}}/>;
    if (page==='notifications') return <Notifications/>;
    if (page==='profile') return <ProfilePage/>;
    if (page==='settings') return <SettingsPage/>;
    return null;
  };

  return (
    <>
      <style>{styles}</style>
      <div className="dsh-wrap">
        <Sidebar page={page} setPage={navToPage} onLogout={handleLogout}/>
        <div className="main-content">
          <div className="top-bar">
            <div className="top-bar-left">
              <span className="page-title">{currentTitle}</span>
              {currentSubtitle&&<span className="page-subtitle">{currentSubtitle}</span>}
            </div>
            <div className="top-bar-icons">
              <button className="icon-btn" onClick={()=>navToPage('notifications')} title="Notifications" style={{position:'relative'}}>
                <BellIcon/><span className="notif-badge"/>
              </button>
              <button className="icon-btn" onClick={()=>navToPage('messages')} title="Messages"><MsgIcon/></button>
              <div className="avatar-sm" title="Profile" onClick={()=>navToPage('profile')}>AO</div>
            </div>
          </div>
          {renderContent()}
        </div>
      </div>

      {showWithdraw && <WithdrawModal onClose={()=>setShowWithdraw(false)} />}

      <div className={`mc-toast ${toastShow?'show':''}`}>
        <div className="mc-toast-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg></div>
        <div><div className="mc-toast-title">Project Marked Complete!</div><div className="mc-toast-sub">{toastMsg}</div></div>
      </div>
    </>
  );
}