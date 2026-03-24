import { useState, useRef, useEffect } from "react";

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

  /* ── AUTH PAGES ── */
  .auth-wrap {
    min-height: 100vh; display: flex; align-items: stretch;
  }

  .auth-left {
    flex: 1; background: linear-gradient(145deg, #1a0860 0%, #4e22c4 55%, #2a1080 100%);
    display: flex; flex-direction: column; justify-content: center; align-items: flex-start;
    padding: 60px 64px; position: relative; overflow: hidden;
  }

  .auth-left::before {
    content: ''; position: absolute; width: 420px; height: 420px; border-radius: 50%;
    background: rgba(255,255,255,0.04); top: -100px; right: -80px;
  }
  .auth-left::after {
    content: ''; position: absolute; width: 260px; height: 260px; border-radius: 50%;
    background: rgba(255,255,255,0.05); bottom: -60px; left: 40px;
  }

  .auth-brand { display: flex; align-items: center; gap: 10px; margin-bottom: 56px; }
  .auth-brand-name { font-family: 'Syne', sans-serif; font-size: 28px; font-weight: 800; color: #fff; letter-spacing: -0.5px; }
  .auth-brand-badge { background: rgba(255,255,255,0.15); color: rgba(255,255,255,0.9); font-size: 12px; font-weight: 600; padding: 3px 10px; border-radius: 20px; }

  .auth-left-headline { font-family: 'Syne', sans-serif; font-size: 38px; font-weight: 800; color: #fff; line-height: 1.2; letter-spacing: -1px; margin-bottom: 20px; max-width: 380px; }
  .auth-left-sub { font-size: 15px; color: rgba(255,255,255,0.65); line-height: 1.7; max-width: 340px; margin-bottom: 48px; }

  .auth-features { display: flex; flex-direction: column; gap: 16px; }
  .auth-feature { display: flex; align-items: center; gap: 14px; }
  .auth-feature-icon { width: 36px; height: 36px; border-radius: 10px; background: rgba(255,255,255,0.12); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .auth-feature-text { font-size: 14px; color: rgba(255,255,255,0.8); font-weight: 500; }

  .auth-right {
    width: 520px; background: var(--white); display: flex; flex-direction: column;
    justify-content: center; padding: 60px 56px; overflow-y: auto;
  }

  .auth-form-brand { font-family: 'Syne', sans-serif; font-size: 20px; font-weight: 800; color: var(--text-dark); margin-bottom: 40px; }

  .auth-title { font-family: 'Syne', sans-serif; font-size: 26px; font-weight: 800; color: var(--text-dark); letter-spacing: -0.5px; margin-bottom: 6px; }
  .auth-subtitle { font-size: 14px; color: var(--text-muted); margin-bottom: 32px; }

  .auth-field { display: flex; flex-direction: column; gap: 6px; margin-bottom: 16px; }
  .auth-label { font-size: 13.5px; font-weight: 600; color: var(--text-dark); }

  .auth-input {
    height: 48px; border: 1.5px solid var(--border); border-radius: var(--radius-sm);
    padding: 0 16px; font-family: 'DM Sans', sans-serif; font-size: 14px; color: var(--text-dark);
    outline: none; transition: border-color 0.2s, box-shadow 0.2s; width: 100%; background: var(--white);
    appearance: none; -webkit-appearance: none;
  }
  .auth-input:focus { border-color: var(--purple-bright); box-shadow: 0 0 0 3px rgba(108,60,225,0.1); }
  .auth-input::placeholder { color: #adb5bd; }
  .auth-input.has-error { border-color: var(--red); }
  .auth-input-wrap { position: relative; }
  .auth-input-wrap .auth-input { padding-right: 44px; }
  .auth-eye-btn { position: absolute; right: 14px; top: 50%; transform: translateY(-50%); background: none; border: none; cursor: pointer; color: var(--text-muted); padding: 0; display: flex; align-items: center; }
  .auth-eye-btn:hover { color: var(--text-dark); }

  .auth-forgot { text-align: right; margin-top: -8px; margin-bottom: 16px; }
  .auth-forgot a { font-size: 13px; color: var(--purple-bright); font-weight: 600; cursor: pointer; text-decoration: none; }
  .auth-forgot a:hover { text-decoration: underline; }

  .auth-btn {
    width: 100%; height: 50px; background: var(--purple-btn); color: var(--white); border: none;
    border-radius: var(--radius-sm); font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 700;
    cursor: pointer; transition: background 0.2s, box-shadow 0.2s; margin-top: 4px;
    position: relative; overflow: hidden;
  }
  .auth-btn:hover { background: #6a40e0; box-shadow: 0 6px 20px rgba(108,60,225,0.3); }
  .auth-btn:active { transform: scale(0.99); }
  .auth-btn:disabled { opacity: 0.5; cursor: not-allowed; pointer-events: none; }

  .auth-divider { display: flex; align-items: center; gap: 14px; margin: 20px 0; }
  .auth-divider-line { flex: 1; height: 1px; background: var(--border); }
  .auth-divider-text { font-size: 12.5px; color: var(--text-muted); font-weight: 500; white-space: nowrap; }

  .auth-switch { text-align: center; font-size: 13.5px; color: var(--text-muted); margin-top: 20px; }
  .auth-switch a { color: var(--purple-bright); font-weight: 700; cursor: pointer; text-decoration: none; }
  .auth-switch a:hover { text-decoration: underline; }

  .field-error { font-size: 12px; color: var(--red); margin-top: 2px; }

  /* Create Business Account steps */
  .cba-steps-bar { display: flex; align-items: center; gap: 0; margin-bottom: 28px; }
  .cba-step-item { display: flex; align-items: center; gap: 0; flex: 1; }
  .cba-step-circle {
    width: 28px; height: 28px; border-radius: 50%; border: 2px solid var(--border);
    display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700;
    color: var(--text-muted); background: var(--white); flex-shrink: 0; transition: all 0.3s;
  }
  .cba-step-circle.active { border-color: var(--purple-bright); color: var(--purple-bright); background: var(--purple-light); }
  .cba-step-circle.done { border-color: var(--green); color: var(--white); background: var(--green); }
  .cba-step-label { font-size: 11px; font-weight: 600; color: var(--text-muted); white-space: nowrap; margin-left: 8px; transition: color 0.3s; }
  .cba-step-label.active { color: var(--purple-bright); }
  .cba-step-label.done { color: var(--green); }
  .cba-step-line { flex: 1; height: 1.5px; background: var(--border); margin: 0 8px; transition: background 0.3s; }
  .cba-step-line.done { background: var(--green); }

  .cba-two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }

  .auth-select-wrap { position: relative; }
  .auth-select-wrap .auth-input { cursor: pointer; padding-right: 36px; }
  .auth-select-arrow { position: absolute; right: 12px; top: 50%; transform: translateY(-50%); pointer-events: none; color: var(--text-muted); }

  .auth-check-row { display: flex; align-items: flex-start; gap: 10px; margin-bottom: 16px; cursor: pointer; }
  .auth-check-box { width: 18px; height: 18px; border: 1.5px solid var(--border); border-radius: 4px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 1px; transition: background 0.2s, border-color 0.2s; }
  .auth-check-box.checked { background: var(--purple-btn); border-color: var(--purple-btn); }
  .auth-check-text { font-size: 13px; color: var(--text-muted); line-height: 1.5; }
  .auth-check-text a { color: var(--purple-bright); font-weight: 600; cursor: pointer; }

  .cba-success { display: flex; flex-direction: column; align-items: center; text-align: center; padding: 20px 0; }
  .cba-success-icon { width: 72px; height: 72px; border-radius: 50%; background: linear-gradient(135deg, #6c3ce1, #4e22c4); display: flex; align-items: center; justify-content: center; font-size: 28px; margin-bottom: 20px; }
  .cba-success-title { font-family: 'Syne', sans-serif; font-size: 22px; font-weight: 800; color: var(--text-dark); margin-bottom: 8px; }
  .cba-success-sub { font-size: 14px; color: var(--text-muted); line-height: 1.65; margin-bottom: 28px; max-width: 300px; }

  /* ── SIDEBAR ── */
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

  .sidebar-brand { display: flex; align-items: center; gap: 8px; padding: 0 24px 20px; border-bottom: 1px solid var(--border); }
  .brand-name { font-family: 'Syne', sans-serif; font-size: 22px; font-weight: 800; color: var(--text-dark); letter-spacing: -0.5px; }
  .biz-badge { background: var(--purple-light); color: var(--purple-bright); font-size: 11px; font-weight: 600; padding: 2px 8px; border-radius: 20px; }
  .sidebar-company { font-size: 13px; color: var(--text-muted); padding: 14px 24px 0; font-weight: 500; }

  .sidebar-section-label { font-size: 10.5px; font-weight: 700; letter-spacing: 0.08em; color: #9ca3af; text-transform: uppercase; padding: 18px 24px 6px; display: flex; align-items: center; justify-content: space-between; cursor: pointer; user-select: none; transition: color 0.2s; }
  .sidebar-section-label:hover { color: #6b7280; }
  .section-chevron { transition: transform 0.25s ease; flex-shrink: 0; }
  .section-chevron.collapsed { transform: rotate(-90deg); }
  .nav-group { overflow: hidden; max-height: 400px; transition: max-height 0.3s ease, opacity 0.25s ease; opacity: 1; }
  .nav-group.collapsed { max-height: 0; opacity: 0; }

  .nav-item { display: flex; align-items: center; gap: 12px; padding: 10px 24px; font-size: 14px; font-weight: 500; color: var(--text-muted); cursor: pointer; transition: background 0.15s, color 0.15s; position: relative; user-select: none; }
  .nav-item:hover { background: var(--bg); color: var(--text-dark); }
  .nav-item.active { background: var(--purple-btn); color: var(--white); margin: 2px 12px; border-radius: var(--radius-sm); padding: 10px 12px; }
  .nav-item.active svg { stroke: var(--white) !important; }
  .nav-badge { margin-left: auto; background: var(--purple-btn); color: var(--white); font-size: 11px; font-weight: 700; padding: 1px 7px; border-radius: 20px; min-width: 20px; text-align: center; }
  .nav-item.active .nav-badge { background: rgba(255,255,255,0.25); }
  .nav-icon { width: 18px; height: 18px; stroke: currentColor; fill: none; flex-shrink: 0; }
  .sidebar-bottom { margin-top: auto; border-top: 1px solid var(--border); padding-top: 4px; }
  .nav-item.logout { color: #ef4444; }
  .nav-item.logout:hover { background: #fef2f2; }
  .nav-item.logout svg { stroke: #ef4444 !important; }

  .main { margin-left: var(--sidebar-w); flex: 1; display: flex; flex-direction: column; min-height: 100vh; }
  .topbar { background: var(--white); border-bottom: 1px solid var(--border); padding: 18px 36px; display: flex; align-items: center; justify-content: space-between; position: sticky; top: 0; z-index: 50; }
  .topbar-left h1 { font-family: 'Syne', sans-serif; font-size: 20px; font-weight: 800; color: var(--text-dark); letter-spacing: -0.4px; }
  .topbar-left p { font-size: 13px; color: var(--text-muted); margin-top: 2px; }
  .topbar-right { display: flex; align-items: center; gap: 12px; }

  .icon-btn { width: 40px; height: 40px; border-radius: 50%; border: 1.5px solid var(--border); background: var(--white); display: flex; align-items: center; justify-content: center; cursor: pointer; position: relative; transition: border-color 0.2s, background 0.2s; }
  .icon-btn:hover { border-color: var(--purple-bright); background: var(--purple-light); }
  .notif-dot { position: absolute; top: 7px; right: 7px; width: 8px; height: 8px; background: var(--red); border-radius: 50%; border: 1.5px solid var(--white); }

  .topbar-avatar { width: 38px; height: 38px; border-radius: 50%; background: linear-gradient(135deg, #6c3ce1, #4e22c4); display: flex; align-items: center; justify-content: center; font-family: 'Syne', sans-serif; font-size: 13px; font-weight: 800; color: var(--white); cursor: pointer; transition: box-shadow 0.2s, border-color 0.2s; border: 2.5px solid transparent; flex-shrink: 0; }
  .topbar-avatar:hover { box-shadow: 0 0 0 3px var(--purple-light); border-color: var(--purple-bright); }
  .topbar-avatar.active { box-shadow: 0 0 0 3px var(--purple-light); border-color: var(--purple-bright); }

  .content { padding: 32px 36px; }

  /* ── MESSAGES PAGE ── */
  .messages-layout {
    display: grid; grid-template-columns: 320px 1fr;
    height: calc(100vh - 73px);
    overflow: hidden;
  }

  .messages-sidebar {
    border-right: 1px solid var(--border);
    background: var(--white);
    display: flex; flex-direction: column;
    overflow: hidden;
  }

  .messages-sidebar-header {
    padding: 20px 20px 0;
    flex-shrink: 0;
  }

  .messages-sidebar-title {
    font-family: 'Syne', sans-serif; font-size: 18px; font-weight: 800;
    color: var(--text-dark); margin-bottom: 14px;
  }

  .msg-tab-row {
    display: flex; background: var(--bg); border-radius: 8px; padding: 3px; margin-bottom: 14px;
  }

  .msg-tab {
    flex: 1; text-align: center; padding: 7px 0; font-size: 13px; font-weight: 600;
    color: var(--text-muted); border-radius: 6px; cursor: pointer; transition: background 0.2s, color 0.2s;
  }

  .msg-tab.active { background: var(--white); color: var(--purple-bright); box-shadow: 0 1px 4px rgba(0,0,0,0.08); }

  .msg-search-wrap { position: relative; padding: 0 0 14px; }
  .msg-search-icon { position: absolute; left: 12px; top: 50%; transform: translateY(-8px); color: var(--text-muted); }
  .msg-search-input { width: 100%; height: 38px; border: 1.5px solid var(--border); border-radius: 8px; padding: 0 12px 0 36px; font-family: 'DM Sans', sans-serif; font-size: 13px; outline: none; background: var(--bg); color: var(--text-dark); transition: border-color 0.2s; }
  .msg-search-input:focus { border-color: var(--purple-bright); background: var(--white); }
  .msg-search-input::placeholder { color: #adb5bd; }

  .conversations-list { flex: 1; overflow-y: auto; }
  .conversations-list::-webkit-scrollbar { width: 4px; }
  .conversations-list::-webkit-scrollbar-track { background: transparent; }
  .conversations-list::-webkit-scrollbar-thumb { background: var(--border); border-radius: 4px; }

  .convo-item {
    display: flex; align-items: flex-start; gap: 12px;
    padding: 14px 20px; cursor: pointer; transition: background 0.15s;
    border-bottom: 1px solid var(--border); position: relative;
  }
  .convo-item:hover { background: var(--bg); }
  .convo-item.active { background: var(--purple-light); }
  .convo-item.active .convo-name { color: var(--purple-bright); }

  .convo-avatar { width: 44px; height: 44px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-family: 'Syne', sans-serif; font-size: 13px; font-weight: 700; color: var(--white); flex-shrink: 0; background: linear-gradient(135deg, #6c3ce1, #4e22c4); }
  .convo-avatar.green { background: linear-gradient(135deg, #22c55e, #16a34a); }
  .convo-avatar.orange { background: linear-gradient(135deg, #f97316, #ea580c); }
  .convo-avatar.blue { background: linear-gradient(135deg, #3b82f6, #1d4ed8); }
  .convo-avatar.pink { background: linear-gradient(135deg, #ec4899, #be185d); }

  .convo-body { flex: 1; min-width: 0; }
  .convo-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 3px; }
  .convo-name { font-size: 14px; font-weight: 600; color: var(--text-dark); }
  .convo-time { font-size: 11.5px; color: var(--text-muted); flex-shrink: 0; }
  .convo-preview { font-size: 12.5px; color: var(--text-muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 200px; }
  .convo-preview.unread { color: var(--text-dark); font-weight: 500; }

  .convo-unread-dot { position: absolute; right: 20px; bottom: 18px; width: 8px; height: 8px; background: var(--purple-bright); border-radius: 50%; }

  /* Chat area */
  .chat-area { display: flex; flex-direction: column; background: var(--white); overflow: hidden; }

  .chat-header {
    padding: 18px 28px; border-bottom: 1px solid var(--border);
    display: flex; align-items: center; justify-content: space-between; flex-shrink: 0;
    background: var(--white);
  }

  .chat-header-left { display: flex; align-items: center; gap: 14px; }
  .chat-header-avatar { width: 44px; height: 44px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-family: 'Syne', sans-serif; font-size: 13px; font-weight: 700; color: var(--white); background: linear-gradient(135deg, #6c3ce1, #4e22c4); flex-shrink: 0; }
  .chat-header-avatar.green { background: linear-gradient(135deg, #22c55e, #16a34a); }
  .chat-header-avatar.orange { background: linear-gradient(135deg, #f97316, #ea580c); }
  .chat-header-avatar.blue { background: linear-gradient(135deg, #3b82f6, #1d4ed8); }
  .chat-header-avatar.pink { background: linear-gradient(135deg, #ec4899, #be185d); }
  .chat-header-name { font-family: 'Syne', sans-serif; font-size: 16px; font-weight: 800; color: var(--text-dark); }
  .chat-header-role { font-size: 12.5px; color: var(--text-muted); margin-top: 1px; }
  .online-dot { display: inline-block; width: 7px; height: 7px; background: var(--green); border-radius: 50%; margin-right: 5px; }

  .chat-header-actions { display: flex; align-items: center; gap: 8px; }
  .chat-icon-btn { width: 36px; height: 36px; border-radius: 50%; border: 1.5px solid var(--border); background: transparent; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: background 0.2s, border-color 0.2s; color: var(--text-muted); }
  .chat-icon-btn:hover { background: var(--purple-light); border-color: var(--purple-bright); color: var(--purple-bright); }

  .chat-linked-brief {
    padding: 10px 28px; background: var(--purple-light);
    border-bottom: 1px solid #e5dcff; flex-shrink: 0;
    display: flex; align-items: center; gap: 10px;
  }
  .chat-linked-brief-text { font-size: 12.5px; color: var(--purple-mid); }
  .chat-linked-brief-text strong { font-weight: 700; }
  .chat-brief-btn {
    margin-left: auto; background: var(--purple-btn); color: var(--white); border: none;
    border-radius: 20px; padding: 4px 12px; font-size: 12px; font-weight: 600; cursor: pointer;
    transition: background 0.2s; white-space: nowrap;
  }
  .chat-brief-btn:hover { background: #6a40e0; }

  .messages-thread {
    flex: 1; overflow-y: auto; padding: 24px 28px;
    display: flex; flex-direction: column; gap: 16px;
  }
  .messages-thread::-webkit-scrollbar { width: 4px; }
  .messages-thread::-webkit-scrollbar-track { background: transparent; }
  .messages-thread::-webkit-scrollbar-thumb { background: var(--border); border-radius: 4px; }

  .msg-date-divider { text-align: center; position: relative; margin: 8px 0; }
  .msg-date-divider span { font-size: 11.5px; color: var(--text-muted); background: var(--white); padding: 0 10px; position: relative; z-index: 1; }
  .msg-date-divider::before { content: ''; position: absolute; top: 50%; left: 0; right: 0; height: 1px; background: var(--border); }

  .msg-row { display: flex; align-items: flex-end; gap: 10px; }
  .msg-row.outgoing { flex-direction: row-reverse; }

  .msg-bubble-avatar { width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-family: 'Syne', sans-serif; font-size: 11px; font-weight: 700; color: var(--white); flex-shrink: 0; background: linear-gradient(135deg, #6c3ce1, #4e22c4); }
  .msg-bubble-avatar.green { background: linear-gradient(135deg, #22c55e, #16a34a); }
  .msg-bubble-avatar.orange { background: linear-gradient(135deg, #f97316, #ea580c); }

  .msg-bubble {
    max-width: 65%; padding: 12px 16px; border-radius: 16px;
    font-size: 14px; line-height: 1.55; color: var(--text-dark);
    background: var(--bg); border: 1px solid var(--border);
    border-bottom-left-radius: 4px;
  }
  .msg-row.outgoing .msg-bubble {
    background: var(--purple-btn); color: var(--white); border: none;
    border-bottom-left-radius: 16px; border-bottom-right-radius: 4px;
  }

  .msg-time { font-size: 11px; color: var(--text-muted); margin-top: 4px; text-align: right; }
  .msg-row.outgoing .msg-time { text-align: right; padding-right: 4px; }
  .msg-row:not(.outgoing) .msg-time { text-align: left; padding-left: 4px; }

  .msg-wrap { display: flex; flex-direction: column; }
  .msg-row.outgoing .msg-wrap { align-items: flex-end; }

  .chat-input-area {
    padding: 16px 28px 20px; border-top: 1px solid var(--border); flex-shrink: 0; background: var(--white);
  }

  .chat-input-row { display: flex; align-items: flex-end; gap: 10px; background: var(--bg); border: 1.5px solid var(--border); border-radius: 16px; padding: 10px 12px 10px 16px; transition: border-color 0.2s; }
  .chat-input-row:focus-within { border-color: var(--purple-bright); background: var(--white); }

  .chat-textarea {
    flex: 1; background: none; border: none; outline: none; resize: none;
    font-family: 'DM Sans', sans-serif; font-size: 14px; color: var(--text-dark); line-height: 1.5;
    min-height: 24px; max-height: 120px; overflow-y: auto;
  }
  .chat-textarea::placeholder { color: #adb5bd; }

  .chat-attach-btn { width: 34px; height: 34px; border-radius: 50%; background: transparent; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; color: var(--text-muted); transition: color 0.2s, background 0.2s; flex-shrink: 0; }
  .chat-attach-btn:hover { color: var(--purple-bright); background: var(--purple-light); }

  .chat-send-btn { width: 38px; height: 38px; border-radius: 50%; background: var(--purple-btn); border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: background 0.2s, transform 0.15s; }
  .chat-send-btn:hover { background: #6a40e0; }
  .chat-send-btn:active { transform: scale(0.93); }

  .chat-empty {
    flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center;
    color: var(--text-muted); gap: 10px; text-align: center; padding: 40px;
  }
  .chat-empty-icon { width: 60px; height: 60px; border-radius: 50%; background: var(--purple-light); display: flex; align-items: center; justify-content: center; margin-bottom: 6px; }
  .chat-empty-title { font-family: 'Syne', sans-serif; font-size: 16px; font-weight: 700; color: var(--text-dark); }
  .chat-empty-sub { font-size: 13px; color: var(--text-muted); max-width: 240px; }

  /* Typing indicator */
  .typing-indicator { display: flex; align-items: center; gap: 10px; }
  .typing-dots { display: flex; gap: 4px; padding: 12px 16px; background: var(--bg); border: 1px solid var(--border); border-radius: 16px; border-bottom-left-radius: 4px; }
  .typing-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--text-muted); animation: typingBounce 1.2s infinite; }
  .typing-dot:nth-child(2) { animation-delay: 0.2s; }
  .typing-dot:nth-child(3) { animation-delay: 0.4s; }
  @keyframes typingBounce { 0%,60%,100% { transform: translateY(0); opacity: 0.4; } 30% { transform: translateY(-6px); opacity: 1; } }

  /* ── REST OF DASHBOARD STYLES ── */
  .greeting-row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 28px; }
  .greeting-row h2 { font-family: 'Syne', sans-serif; font-size: 26px; font-weight: 800; color: var(--text-dark); letter-spacing: -0.5px; }
  .greeting-row p { font-size: 13.5px; color: var(--text-muted); margin-top: 4px; }

  .post-btn { display: flex; align-items: center; gap: 8px; background: var(--purple-btn); color: var(--white); border: none; border-radius: 50px; padding: 12px 22px; font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 600; cursor: pointer; transition: background 0.2s, transform 0.15s, box-shadow 0.2s; position: relative; overflow: hidden; }
  .post-btn:hover { background: #6a40e0; box-shadow: 0 6px 20px rgba(108,60,225,0.3); }
  .post-btn:active { transform: scale(0.97); }
  .ripple { position: absolute; border-radius: 50%; background: rgba(255,255,255,0.3); transform: scale(0); animation: rippleAnim 0.55s linear; pointer-events: none; }
  @keyframes rippleAnim { to { transform: scale(4); opacity: 0; } }

  .stats-banner { background: linear-gradient(135deg, #2a0f7a 0%, #5128d4 60%, #3a1a8a 100%); border-radius: var(--radius); padding: 28px 32px; display: flex; align-items: center; margin-bottom: 24px; position: relative; overflow: hidden; }
  .stats-banner::before { content: ''; position: absolute; width: 260px; height: 260px; border-radius: 50%; background: rgba(255,255,255,0.04); top: -80px; right: 200px; }
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

  .make-payment-btn { background: var(--white); color: var(--purple-btn); border: none; border-radius: 50px; padding: 11px 22px; font-family: 'DM Sans', sans-serif; font-size: 13.5px; font-weight: 700; cursor: pointer; transition: background 0.2s, transform 0.15s; white-space: nowrap; position: relative; overflow: hidden; }
  .make-payment-btn:hover { background: #f3f0ff; }
  .view-history-btn { background: transparent; color: rgba(255,255,255,0.8); border: none; font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500; cursor: pointer; text-decoration: underline; text-underline-offset: 2px; transition: color 0.2s; text-align: center; }
  .view-history-btn:hover { color: var(--white); }

  .metrics-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 32px; }
  .metric-card { background: var(--white); border: 1px solid var(--border); border-radius: var(--radius); padding: 20px 22px; transition: box-shadow 0.2s, transform 0.2s; cursor: default; }
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
  .view-all-btn { display: flex; align-items: center; gap: 4px; font-size: 13px; color: var(--purple-bright); font-weight: 600; cursor: pointer; background: none; border: none; transition: gap 0.2s; }
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

  /* Modal overlay */
  .modal-overlay { position: fixed; inset: 0; background: rgba(10,5,30,0.62); backdrop-filter: blur(8px); display: flex; align-items: center; justify-content: center; z-index: 999; animation: fadeIn 0.25s ease; padding: 20px; }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  .modal { background: var(--white); border-radius: 20px; width: 100%; max-width: 480px; max-height: 92vh; overflow-y: auto; animation: slideUp 0.3s cubic-bezier(0.34,1.56,0.64,1); box-shadow: 0 24px 80px rgba(0,0,0,0.2); }
  @keyframes slideUp { from { opacity: 0; transform: translateY(32px) scale(0.97); } to { opacity: 1; transform: translateY(0) scale(1); } }
  .modal-step { padding: 28px 32px; }
  .modal-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 4px; }
  .modal-title { font-family: 'Syne', sans-serif; font-size: 20px; font-weight: 800; color: var(--text-dark); }
  .modal-subtitle { font-size: 13px; color: var(--text-muted); margin-bottom: 22px; }
  .modal-close { width: 32px; height: 32px; border-radius: 50%; background: var(--bg); border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; color: var(--text-muted); font-size: 18px; transition: background 0.2s; flex-shrink: 0; }
  .modal-close:hover { background: var(--border); }

  .browse-header { margin-bottom: 24px; }
  .browse-header h2 { font-family: 'Syne', sans-serif; font-size: 26px; font-weight: 800; color: var(--text-dark); letter-spacing: -0.5px; }
  .browse-header p { font-size: 13.5px; color: var(--text-muted); margin-top: 4px; }
  .ai-match-badge { display: inline-flex; align-items: center; gap: 6px; background: var(--purple-light); color: var(--purple-bright); font-size: 12px; font-weight: 600; padding: 6px 14px; border-radius: 20px; margin-bottom: 20px; }
  .browse-toolbar { display: flex; align-items: center; gap: 12px; margin-bottom: 24px; }
  .search-wrap { flex: 1; position: relative; }
  .search-icon { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: var(--text-muted); pointer-events: none; }
  .search-input { width: 100%; height: 46px; border: 1.5px solid var(--border); border-radius: var(--radius-sm); padding: 0 14px 0 42px; font-family: 'DM Sans', sans-serif; font-size: 14px; color: var(--text-dark); outline: none; background: var(--white); transition: border-color 0.2s, box-shadow 0.2s; }
  .search-input:focus { border-color: var(--purple-bright); box-shadow: 0 0 0 3px rgba(108,60,225,0.1); }
  .search-input::placeholder { color: #adb5bd; }
  .filter-select { height: 46px; border: 1.5px solid var(--border); border-radius: var(--radius-sm); padding: 0 36px 0 14px; font-family: 'DM Sans', sans-serif; font-size: 13.5px; color: var(--text-dark); outline: none; background: var(--white); cursor: pointer; appearance: none; -webkit-appearance: none; transition: border-color 0.2s; min-width: 130px; }
  .filter-select:focus { border-color: var(--purple-bright); }
  .filter-wrap { position: relative; }
  .filter-arrow { position: absolute; right: 10px; top: 50%; transform: translateY(-50%); pointer-events: none; color: var(--text-muted); }
  .creators-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
  .creator-grid-card { background: var(--white); border: 1px solid var(--border); border-radius: var(--radius); padding: 22px; transition: box-shadow 0.2s, transform 0.2s; cursor: default; display: flex; flex-direction: column; gap: 0; }
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
  .cgc-btn-outline { flex: 1; height: 40px; background: transparent; border: 1.5px solid var(--border); border-radius: 50px; font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 600; color: var(--purple-bright); cursor: pointer; transition: background 0.2s, border-color 0.2s; }
  .cgc-btn-outline:hover { background: var(--purple-light); border-color: var(--purple-bright); }
  .cgc-btn-fill { flex: 1; height: 40px; background: var(--purple-btn); border: none; border-radius: 50px; font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 600; color: var(--white); cursor: pointer; transition: background 0.2s; position: relative; overflow: hidden; }
  .cgc-btn-fill:hover { background: #6a40e0; }

  .back-btn { display: inline-flex; align-items: center; gap: 6px; font-size: 13.5px; font-weight: 600; color: var(--purple-bright); background: none; border: none; cursor: pointer; margin-bottom: 24px; transition: gap 0.2s; }
  .back-btn:hover { gap: 10px; }

  .profile-card { background: var(--white); border: 1px solid var(--border); border-radius: var(--radius); padding: 32px; margin-bottom: 24px; }
  .profile-hero { display: flex; align-items: flex-start; gap: 20px; margin-bottom: 24px; }
  .profile-avatar { width: 72px; height: 72px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-family: 'Syne', sans-serif; font-size: 22px; font-weight: 800; color: var(--white); background: linear-gradient(135deg, #6c3ce1, #4e22c4); flex-shrink: 0; }
  .profile-hero-info { flex: 1; }
  .profile-name { font-family: 'Syne', sans-serif; font-size: 24px; font-weight: 800; color: var(--text-dark); letter-spacing: -0.4px; }
  .profile-role { font-size: 14px; color: var(--purple-bright); font-weight: 600; margin-top: 4px; }
  .profile-desc { font-size: 14px; color: var(--text-muted); margin-top: 8px; line-height: 1.6; }
  .profile-match { font-family: 'Syne', sans-serif; font-size: 14px; font-weight: 700; color: var(--purple-bright); background: var(--purple-light); padding: 6px 14px; border-radius: 8px; white-space: nowrap; }
  .profile-stats { display: grid; grid-template-columns: repeat(3, 1fr); border: 1px solid var(--border); border-radius: var(--radius-sm); overflow: hidden; margin-bottom: 24px; }
  .profile-stat { padding: 18px 20px; border-right: 1px solid var(--border); background: #fafafa; }
  .profile-stat:last-child { border-right: none; }
  .profile-stat-label { font-size: 11.5px; color: var(--text-muted); font-weight: 500; margin-bottom: 6px; }
  .profile-stat-value { font-family: 'Syne', sans-serif; font-size: 18px; font-weight: 800; color: var(--text-dark); }
  .profile-stat-value.link { color: var(--purple-bright); font-size: 14px; font-weight: 600; cursor: pointer; text-decoration: underline; text-underline-offset: 2px; }
  .profile-section-title { font-family: 'Syne', sans-serif; font-size: 14px; font-weight: 700; color: var(--text-dark); margin-bottom: 12px; }
  .profile-tags { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 24px; }
  .profile-tag { background: var(--bg); border: 1px solid var(--border); color: var(--text-dark); font-size: 13px; font-weight: 500; padding: 5px 14px; border-radius: 20px; }
  .profile-send-btn { width: 100%; height: 52px; background: var(--purple-btn); color: var(--white); border: none; border-radius: var(--radius-sm); font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 700; cursor: pointer; transition: background 0.2s, box-shadow 0.2s; position: relative; overflow: hidden; }
  .profile-send-btn:hover { background: #6a40e0; box-shadow: 0 6px 20px rgba(108,60,225,0.3); }

  .biz-profile-subtitle { font-size: 13.5px; color: var(--text-muted); margin-bottom: 28px; }
  .bp-card { background: var(--white); border: 1px solid var(--border); border-radius: var(--radius); padding: 28px 32px; margin-bottom: 20px; }
  .bp-hero { display: flex; align-items: flex-start; gap: 20px; }
  .bp-avatar { width: 72px; height: 72px; border-radius: 50%; flex-shrink: 0; display: flex; align-items: center; justify-content: center; font-family: 'Syne', sans-serif; font-size: 22px; font-weight: 800; color: var(--white); background: linear-gradient(135deg, #6c3ce1, #4e22c4); }
  .bp-hero-info { flex: 1; }
  .bp-company-name { font-family: 'Syne', sans-serif; font-size: 24px; font-weight: 800; color: var(--text-dark); letter-spacing: -0.4px; }
  .bp-industry { font-size: 14px; color: var(--purple-bright); font-weight: 600; margin-top: 4px; }
  .bp-desc { font-size: 14px; color: var(--text-muted); margin-top: 10px; line-height: 1.65; max-width: 680px; }
  .bp-section-title { font-family: 'Syne', sans-serif; font-size: 16px; font-weight: 800; color: var(--text-dark); padding-bottom: 16px; border-bottom: 1px solid var(--border); margin-bottom: 22px; }
  .bp-info-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 0; }
  .bp-info-cell { padding: 6px 24px 16px 0; border-right: 1px solid var(--border); padding-right: 24px; margin-right: 24px; }
  .bp-info-cell:last-child { border-right: none; margin-right: 0; padding-right: 0; }
  .bp-info-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0; margin-top: 20px; padding-top: 20px; border-top: 1px solid var(--border); }
  .bp-info-label { font-size: 12px; color: var(--text-muted); font-weight: 500; margin-bottom: 6px; }
  .bp-info-value { font-size: 14px; font-weight: 600; color: var(--text-dark); }
  .bp-info-value.link { color: var(--purple-bright); cursor: pointer; text-decoration: underline; text-underline-offset: 2px; }
  .bp-activity-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0; }
  .bp-activity-cell { padding: 4px 32px 4px 0; border-right: 1px solid var(--border); margin-right: 32px; }
  .bp-activity-cell:last-child { border-right: none; margin-right: 0; padding-right: 0; }
  .bp-activity-label { font-size: 13px; color: var(--text-muted); font-weight: 500; margin-bottom: 8px; }
  .bp-activity-value { font-family: 'Syne', sans-serif; font-size: 28px; font-weight: 800; color: var(--text-dark); letter-spacing: -0.5px; }
  .bp-edit-btn { display: inline-flex; align-items: center; gap: 8px; background: var(--purple-btn); color: var(--white); border: none; border-radius: 50px; padding: 11px 22px; font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 600; cursor: pointer; transition: background 0.2s, box-shadow 0.2s; margin-top: 20px; position: relative; overflow: hidden; }
  .bp-edit-btn:hover { background: #6a40e0; box-shadow: 0 4px 16px rgba(108,60,225,0.25); }

  .briefs-toolbar { display: flex; align-items: center; gap: 12px; background: var(--white); border: 1px solid var(--border); border-radius: var(--radius); padding: 16px 20px; margin-bottom: 0; }
  .briefs-table-wrap { background: var(--white); border: 1px solid var(--border); border-radius: var(--radius); overflow: hidden; margin-top: 16px; }
  .brief-status-pill { display: inline-flex; align-items: center; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; }
  .brief-status-pill.open { background: var(--purple-light); color: var(--purple-bright); }
  .brief-status-pill.active { background: #dbeafe; color: #1d4ed8; }
  .brief-status-pill.completed { background: var(--green-light); color: #15803d; }
  .brief-status-pill.closed { background: #f3f4f6; color: #6b7280; }
  .brief-action-btn { background: var(--purple-light); color: var(--purple-bright); border: none; border-radius: 20px; padding: 5px 14px; font-family: 'DM Sans', sans-serif; font-size: 12px; font-weight: 600; cursor: pointer; transition: background 0.2s; white-space: nowrap; }
  .brief-action-btn:hover { background: #ddd6fe; }

  .post-brief-wrap { background: var(--white); border: 1px solid var(--border); border-radius: var(--radius); padding: 36px 40px; max-width: 860px; }
  .post-brief-field { display: flex; flex-direction: column; gap: 6px; margin-bottom: 22px; }
  .post-brief-label { font-size: 14px; font-weight: 600; color: var(--text-dark); }
  .post-brief-label span { font-weight: 400; color: var(--text-muted); }
  .post-brief-input { height: 48px; border: 1.5px solid var(--border); border-radius: var(--radius-sm); padding: 0 16px; font-family: 'DM Sans', sans-serif; font-size: 14px; color: var(--text-dark); outline: none; transition: border-color 0.2s, box-shadow 0.2s; width: 100%; background: var(--white); appearance: none; -webkit-appearance: none; }
  .post-brief-input:focus { border-color: var(--purple-bright); box-shadow: 0 0 0 3px rgba(108,60,225,0.1); }
  .post-brief-input::placeholder { color: #adb5bd; }
  .post-brief-input.has-error { border-color: var(--red); }
  .post-brief-textarea { border: 1.5px solid var(--border); border-radius: var(--radius-sm); padding: 14px 16px; font-family: 'DM Sans', sans-serif; font-size: 14px; color: var(--text-dark); outline: none; transition: border-color 0.2s, box-shadow 0.2s; width: 100%; background: var(--white); resize: vertical; min-height: 120px; line-height: 1.6; }
  .post-brief-textarea:focus { border-color: var(--purple-bright); box-shadow: 0 0 0 3px rgba(108,60,225,0.1); }
  .post-brief-textarea::placeholder { color: #adb5bd; }
  .post-brief-two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
  .post-brief-select-wrap { position: relative; }
  .post-brief-select-wrap .post-brief-input { cursor: pointer; padding-right: 36px; }
  .post-brief-select-arrow { position: absolute; right: 12px; top: 50%; transform: translateY(-50%); pointer-events: none; color: var(--text-muted); }
  .post-brief-ai-note { background: var(--purple-light); border: 1px solid #d8ccff; border-radius: var(--radius-sm); padding: 16px 18px; margin-bottom: 28px; }
  .post-brief-ai-note strong { font-size: 13.5px; color: var(--purple-bright); display: block; margin-bottom: 4px; }
  .post-brief-ai-note p { font-size: 13px; color: var(--purple-mid); line-height: 1.5; }
  .post-brief-actions { display: flex; gap: 12px; }
  .post-brief-cancel { flex: 1; height: 50px; background: transparent; border: 1.5px solid var(--border); border-radius: 50px; font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 600; color: var(--text-muted); cursor: pointer; transition: background 0.2s; }
  .post-brief-cancel:hover { background: var(--bg); }
  .post-brief-submit { flex: 2; height: 50px; background: var(--purple-btn); color: var(--white); border: none; border-radius: 50px; font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 700; cursor: pointer; transition: background 0.2s, box-shadow 0.2s; position: relative; overflow: hidden; }
  .post-brief-submit:hover { background: #6a40e0; box-shadow: 0 6px 20px rgba(108,60,225,0.3); }
  .post-brief-success { display: flex; flex-direction: column; align-items: center; text-align: center; padding: 64px 40px; }
  .post-brief-success-icon { width: 80px; height: 80px; border-radius: 50%; background: linear-gradient(135deg, #6c3ce1, #4e22c4); display: flex; align-items: center; justify-content: center; font-size: 32px; margin-bottom: 24px; }

  .jr-stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 24px; }
  .jr-stat-card { background: var(--white); border: 1px solid var(--border); border-radius: var(--radius); padding: 20px 24px; display: flex; align-items: center; justify-content: space-between; transition: box-shadow 0.2s; }
  .jr-stat-card:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.06); }
  .jr-stat-label { font-size: 13px; color: var(--text-muted); font-weight: 500; margin-bottom: 8px; }
  .jr-stat-value { font-family: 'Syne', sans-serif; font-size: 32px; font-weight: 800; color: var(--text-dark); letter-spacing: -0.5px; }
  .jr-stat-icon { width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .jr-stat-icon.total { background: #eff6ff; }
  .jr-stat-icon.accepted { background: var(--green-light); }
  .jr-stat-icon.pending { background: #fff7ed; }
  .jr-stat-icon.declined { background: #fef2f2; }
  .jr-toolbar { background: var(--white); border: 1px solid var(--border); border-radius: var(--radius); padding: 16px 20px; display: flex; align-items: center; gap: 12px; margin-bottom: 16px; }
  .jr-table-wrap { background: var(--white); border: 1px solid var(--border); border-radius: var(--radius); overflow: hidden; }
  .jr-status-pill { display: inline-flex; align-items: center; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; }
  .jr-status-pill.accepted { background: var(--green-light); color: #15803d; }
  .jr-status-pill.pending { background: #fff7ed; color: #c2410c; }
  .jr-status-pill.declined { background: #fef2f2; color: #b91c1c; }
  .jr-view-btn { background: var(--purple-light); color: var(--purple-bright); border: none; border-radius: 20px; padding: 5px 14px; font-family: 'DM Sans', sans-serif; font-size: 12px; font-weight: 600; cursor: pointer; transition: background 0.2s; white-space: nowrap; }
  .jr-view-btn:hover { background: #ddd6fe; }
  .jrd-card { background: var(--white); border: 1px solid var(--border); border-radius: var(--radius); padding: 32px; max-width: 860px; }
  .jrd-hero { display: flex; align-items: flex-start; gap: 18px; margin-bottom: 28px; }
  .jrd-avatar { width: 60px; height: 60px; border-radius: 50%; flex-shrink: 0; display: flex; align-items: center; justify-content: center; font-family: 'Syne', sans-serif; font-size: 16px; font-weight: 800; color: var(--white); background: linear-gradient(135deg, #6c3ce1, #4e22c4); }
  .jrd-hero-info { flex: 1; }
  .jrd-name { font-family: 'Syne', sans-serif; font-size: 22px; font-weight: 800; color: var(--text-dark); letter-spacing: -0.3px; }
  .jrd-role { font-size: 14px; color: var(--purple-bright); font-weight: 600; margin-top: 2px; }
  .jrd-desc { font-size: 13.5px; color: var(--text-muted); margin-top: 10px; line-height: 1.6; }
  .jrd-status-pill { display: inline-flex; align-items: center; padding: 5px 14px; border-radius: 20px; font-size: 13px; font-weight: 700; flex-shrink: 0; }
  .jrd-status-pill.accepted { background: var(--green-light); color: #15803d; }
  .jrd-status-pill.pending { background: #fff7ed; color: #c2410c; }
  .jrd-status-pill.declined { background: #fef2f2; color: #b91c1c; }
  .jrd-meta { display: grid; grid-template-columns: repeat(3, 1fr); border: 1px solid var(--border); border-radius: var(--radius-sm); overflow: hidden; margin-bottom: 22px; background: #fafafa; }
  .jrd-meta-cell { padding: 18px 20px; border-right: 1px solid var(--border); }
  .jrd-meta-cell:last-child { border-right: none; }
  .jrd-meta-label { font-size: 12px; color: var(--text-muted); font-weight: 500; margin-bottom: 6px; }
  .jrd-meta-value { font-family: 'Syne', sans-serif; font-size: 17px; font-weight: 800; color: var(--text-dark); }
  .jrd-response { background: var(--purple-light); border: 1px solid #d8ccff; border-radius: var(--radius-sm); padding: 20px 22px; margin-bottom: 24px; }
  .jrd-response-label { font-size: 12px; font-weight: 700; color: var(--purple-bright); letter-spacing: 0.06em; text-transform: uppercase; margin-bottom: 8px; }
  .jrd-response-text { font-size: 14px; color: var(--text-dark); line-height: 1.65; }
  .jrd-response-empty { font-size: 13.5px; color: var(--text-muted); font-style: italic; }
  .jrd-make-payment-btn { width: 100%; max-width: 540px; height: 52px; background: var(--purple-btn); color: var(--white); border: none; border-radius: 50px; font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 700; cursor: pointer; transition: background 0.2s, box-shadow 0.2s; position: relative; overflow: hidden; display: block; }
  .jrd-make-payment-btn:hover { background: #6a40e0; box-shadow: 0 6px 20px rgba(108,60,225,0.3); }
  .jrd-make-payment-btn:disabled { opacity: 0.4; cursor: not-allowed; pointer-events: none; }
  .jrd-declined-note { background: #fef2f2; border: 1px solid #fecaca; border-radius: var(--radius-sm); padding: 14px 18px; font-size: 13.5px; color: #b91c1c; line-height: 1.5; }
`;

// ── DATA ──
const allCreators = [
  { initials: "AO", name: "Amara Okon", role: "Videographer", location: "Lagos", score: "96%", rate: "From ₦120,000/project", tags: ["Videographer", "Brand Films", "Social Media"], desc: "Lagos-based videographer specialising in product launches, brand documentaries and social media content. 4+ years experience.", portfolio: "amaraokon.com", completedJobs: "₦120,000", startingRate: "Product Launch Video", avatarColor: "" },
  { initials: "CE", name: "Chidi Eze", role: "Photographer", location: "Lagos", score: "91%", rate: "From ₦60,000/project", tags: ["Photographer", "Food Styling", "Commercial"], desc: "Commercial and lifestyle photographer with 5+ years experience. Works with food, fashion, and tech brands across Nigeria.", portfolio: "chidieze.ng", completedJobs: "₦85,000", startingRate: "Brand Photography", avatarColor: "green" },
  { initials: "FA", name: "Funmi Adeyemi", role: "Social Media Manager", location: "Abuja", score: "87%", rate: "From ₦50,000/month", tags: ["Social Media", "Content Strategy", "Copywriting"], desc: "Manages content strategy and monthly execution for 10+ brands. Specialises in Instagram and TikTok growth.", portfolio: "funmiadeyemi.co", completedJobs: "₦60,000", startingRate: "Social Media Management", avatarColor: "orange" },
  { initials: "KM", name: "Kola Mensah", role: "Copywriter", location: "Lagos", score: "82%", rate: "From ₦35,000/project", tags: ["Copywriting", "B2B", "Email Campaigns"], desc: "B2B and consumer copywriter. Writes website copy, email campaigns, and brand messaging that converts.", portfolio: "kolawrites.com", completedJobs: "₦45,000", startingRate: "Copywriting Project", avatarColor: "blue" },
  { initials: "AN", name: "Adaeze Nwosu", role: "Graphic Designer", location: "Port Harcourt", score: "78%", rate: "From ₦40,000/project", tags: ["Graphic Design", "Branding", "UI/UX"], desc: "Brand identity and digital design specialist. Creates visual systems for startups and established brands.", portfolio: "adaezedesigns.ng", completedJobs: "₦50,000", startingRate: "Brand Identity", avatarColor: "pink" },
  { initials: "TJ", name: "Taiwo James", role: "Animator", location: "Lagos", score: "74%", rate: "From ₦80,000/project", tags: ["Animation", "Motion Graphics", "2D"], desc: "2D animator and motion graphics designer. Works on explainer videos, social ads, and branded content.", portfolio: "taiwojames.studio", completedJobs: "₦80,000", startingRate: "Explainer Video", avatarColor: "" },
];

const activity = [
  { creator: "Amara Okon", project: "Product Launch Video", amount: "₦120,000", status: "pending", date: "Mar 18, 2026" },
  { creator: "Chidi Eze", project: "Brand Photography", amount: "₦85,000", status: "paid", date: "Mar 12, 2026" },
  { creator: "Funmi Adeyemi", project: "Social Media Pack", amount: "₦60,000", status: "paid", date: "Mar 5, 2026" },
  { creator: "Tunde Balogun", project: "UI/UX Audit Report", amount: "₦45,000", status: "in-progress", date: "Feb 28, 2026" },
];

const initialBriefs = [
  { id: 1, title: "Product Launch Video", category: "Videographer", budget: "120,000 – 200,000", status: "open", bids: 5, posted: "Mar 15, 2026" },
  { id: 2, title: "Monthly Social Content", category: "Social Media", budget: "60,000 – 80,000/mo", status: "open", bids: 8, posted: "Mar 12, 2026" },
  { id: 3, title: "Brand Photography", category: "Photographer", budget: "80,000 – 120,000", status: "active", bids: 3, posted: "Mar 5, 2026" },
  { id: 4, title: "Website Copywriting", category: "Copywriter", budget: "50,000 – 70,000", status: "completed", bids: 4, posted: "Feb 20, 2026" },
];

const jobRequestsData = [
  { id: 1, initials: "AO", creator: "Amara Okon", role: "Videographer", desc: "Lagos-based videographer specialising in product launches and brand films.", project: "Product Launch Video", amount: "₦120,000", status: "accepted", date: "Mar 15, 2026", response: "Hi TechCorp, I have 3 similar product launches in my portfolio. Available from April 20." },
  { id: 2, initials: "CE", creator: "Chidi Eze", role: "Photographer", desc: "Commercial and lifestyle photographer with 5+ years experience across Nigeria.", project: "Brand Photography", amount: "₦85,000", status: "accepted", date: "Mar 10, 2026", response: "Happy to take this on — I worked on similar brand shoots for two fintech brands recently." },
  { id: 3, initials: "FA", creator: "Funmi Adeyemi", role: "Social Media Manager", desc: "Manages content strategy and execution for 10+ brands monthly.", project: "Monthly Social Content", amount: "₦60,000", status: "pending", date: "Mar 12, 2026", response: "" },
  { id: 4, initials: "KM", creator: "Kola Mensah", role: "Copywriter", desc: "B2B and consumer copywriter. Writes website copy and brand messaging that converts.", project: "Website Copywriting", amount: "₦50,000", status: "pending", date: "Mar 8, 2026", response: "" },
  { id: 5, initials: "AN", creator: "Adaeze Nwosu", role: "Graphic Designer", desc: "Brand identity and digital design specialist.", project: "Product Launch Video", amount: "₦150,000", status: "declined", date: "Mar 6, 2026", response: "Thank you for reaching out. I'm fully booked through May." },
];

// ── CONVERSATIONS DATA ──
const conversationsData = [
  {
    id: 1, initials: "AO", name: "Amara Okon", role: "Videographer", avatarColor: "",
    online: true, time: "11:42", unread: true, brief: "Product Launch Video",
    preview: "Got it! I'll have the rough cut ...",
    messages: [
      { id: 1, from: "creator", text: "Hi TechCorp! I've started on the shoot plan. Can you confirm the product color variants you need featured?", time: "10:15 AM", date: "Today" },
      { id: 2, from: "me", text: "Yes — we need all 3 colorways. Black, white, and the limited edition gold. Can you accommodate that in the 2-day shoot?", time: "10:22 AM", date: "Today" },
      { id: 3, from: "creator", text: "Absolutely. I'll plan 3 setups per day. Got it! I'll have the rough cut ready by Friday.", time: "11:42 AM", date: "Today" },
    ]
  },
  {
    id: 2, initials: "CE", name: "Chidi Eze", role: "Photographer", avatarColor: "green",
    online: false, time: "Tue", unread: false, brief: "Brand Photography",
    preview: "All photos uploaded to the sh...",
    messages: [
      { id: 1, from: "me", text: "Hey Chidi, how are the edits coming along?", time: "Mon 3:00 PM", date: "Monday" },
      { id: 2, from: "creator", text: "Going really well! I'm about 80% through. Expect them by EOD Tuesday.", time: "Mon 3:15 PM", date: "Monday" },
      { id: 3, from: "creator", text: "All photos uploaded to the shared drive. 47 final selects, all edited to brand spec.", time: "Tue 9:00 AM", date: "Tuesday" },
    ]
  },
  {
    id: 3, initials: "FA", name: "Funmi Adeyemi", role: "Social Media Manager", avatarColor: "orange",
    online: true, time: "Mon", unread: false, brief: "Q2 Social Media Pack",
    preview: "Calendar for March content i...",
    messages: [
      { id: 1, from: "creator", text: "Hi! I've put together the Q2 content calendar. Sending it over for your review now.", time: "Mon 11:00 AM", date: "Monday" },
      { id: 2, from: "me", text: "Great timing! We have a campaign launching April 5 — make sure there's a slot for the product reveal.", time: "Mon 11:22 AM", date: "Monday" },
      { id: 3, from: "creator", text: "Calendar for March content is done — I've added the April 5 reveal slot with 3 warm-up posts leading to it.", time: "Mon 2:40 PM", date: "Monday" },
    ]
  },
  {
    id: 4, initials: "KM", name: "Kola Mensah", role: "Copywriter", avatarColor: "blue",
    online: false, time: "Mar 20", unread: false, brief: "Website Copywriting",
    preview: "Will send the homepage draft...",
    messages: [
      { id: 1, from: "creator", text: "Got the brief — this is clear and well-structured. I'll start on the homepage first.", time: "Mar 20, 9:30 AM", date: "Mar 20" },
      { id: 2, from: "me", text: "Sounds great. The hero section is the highest priority.", time: "Mar 20, 10:00 AM", date: "Mar 20" },
      { id: 3, from: "creator", text: "Will send the homepage draft by Thursday for your review.", time: "Mar 20, 10:05 AM", date: "Mar 20" },
    ]
  },
];

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
  return <svg className="nav-icon" viewBox="0 0 24 24" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none">{paths[type]}</svg>;
};

// ── SIGN IN ──
function SignIn({ onSignIn, onGoCreate }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!email.includes("@")) e.email = "Enter a valid email address";
    if (password.length < 6) e.password = "Password must be at least 6 characters";
    return e;
  };

  const handleSubmit = () => {
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); onSignIn(); }, 1200);
  };

  return (
    <div className="auth-wrap">
      <div className="auth-left">
        <div className="auth-brand">
          <span className="auth-brand-name">vynder</span>
          <span className="auth-brand-badge">Biz</span>
        </div>
        <h1 className="auth-left-headline">Hire Nigeria's best creators — fast.</h1>
        <p className="auth-left-sub">Vynder connects businesses with vetted videographers, photographers, social media managers, and more. AI-matched to your briefs.</p>
        <div className="auth-features">
          {[
            { icon: "✦", text: "AI matching to your brief history" },
            { icon: "🔒", text: "Secure payments via Interswitch" },
            { icon: "📋", text: "Manage briefs, requests, and payments in one place" },
          ].map(f => (
            <div className="auth-feature" key={f.text}>
              <div className="auth-feature-icon"><span style={{ fontSize: 16 }}>{f.icon}</span></div>
              <span className="auth-feature-text">{f.text}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="auth-right">
        <div className="auth-form-brand">vynder <span style={{ fontSize: 13, fontWeight: 400, color: "var(--text-muted)" }}>for Business</span></div>
        <h2 className="auth-title">Welcome back</h2>
        <p className="auth-subtitle">Sign in to your business account</p>

        <div className="auth-field">
          <label className="auth-label">Work Email</label>
          <input className={`auth-input ${errors.email ? "has-error" : ""}`} type="email" placeholder="you@company.com" value={email} onChange={e => { setEmail(e.target.value); setErrors({ ...errors, email: "" }); }} />
          {errors.email && <span className="field-error">⚠ {errors.email}</span>}
        </div>

        <div className="auth-field">
          <label className="auth-label">Password</label>
          <div className="auth-input-wrap">
            <input className={`auth-input ${errors.password ? "has-error" : ""}`} type={showPw ? "text" : "password"} placeholder="Enter your password" value={password} onChange={e => { setPassword(e.target.value); setErrors({ ...errors, password: "" }); }} onKeyDown={e => e.key === "Enter" && handleSubmit()} />
            <button className="auth-eye-btn" onClick={() => setShowPw(!showPw)} type="button">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                {showPw ? <><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></> : <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>}
              </svg>
            </button>
          </div>
          {errors.password && <span className="field-error">⚠ {errors.password}</span>}
        </div>

        <div className="auth-forgot"><a>Forgot password?</a></div>

        <button className="auth-btn" onClick={handleSubmit} disabled={loading}>
          {loading ? "Signing in..." : "Sign In →"}
        </button>

        <div className="auth-divider">
          <div className="auth-divider-line"/>
          <span className="auth-divider-text">New to Vynder Biz?</span>
          <div className="auth-divider-line"/>
        </div>

        <button className="auth-btn" style={{ background: "transparent", color: "var(--purple-bright)", border: "1.5px solid var(--purple-bright)" }} onClick={onGoCreate}>
          Create a Business Account
        </button>

        <p className="auth-switch" style={{ marginTop: 16, fontSize: 12, color: "var(--text-muted)" }}>Are you a creator? <a>Join as a Creator →</a></p>
      </div>
    </div>
  );
}

// ── CREATE BUSINESS ACCOUNT ──
function CreateBusinessAccount({ onSuccess, onGoSignIn }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    companyName: "", industry: "", size: "", website: "",
    contactName: "", email: "", phone: "",
    password: "", confirmPassword: "",
    agree: false,
  });
  const [errors, setErrors] = useState({});
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  const set = (field) => (e) => {
    const val = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm({ ...form, [field]: val });
    setErrors({ ...errors, [field]: "" });
  };

  const validateStep1 = () => {
    const e = {};
    if (!form.companyName.trim()) e.companyName = "Company name is required";
    if (!form.industry) e.industry = "Select an industry";
    if (!form.size) e.size = "Select company size";
    return e;
  };

  const validateStep2 = () => {
    const e = {};
    if (!form.contactName.trim()) e.contactName = "Contact name is required";
    if (!form.email.includes("@")) e.email = "Enter a valid email";
    if (!form.phone.trim()) e.phone = "Phone number is required";
    return e;
  };

  const validateStep3 = () => {
    const e = {};
    if (form.password.length < 8) e.password = "Password must be at least 8 characters";
    if (form.confirmPassword !== form.password) e.confirmPassword = "Passwords do not match";
    if (!form.agree) e.agree = "You must agree to the terms";
    return e;
  };

  const handleNext = () => {
    const errs = step === 1 ? validateStep1() : step === 2 ? validateStep2() : validateStep3();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    if (step < 3) { setStep(step + 1); setErrors({}); }
    else {
      setLoading(true);
      setTimeout(() => { setLoading(false); setStep(4); }, 1400);
    }
  };

  const stepLabels = ["Company Info", "Contact", "Security"];

  return (
    <div className="auth-wrap">
      <div className="auth-left">
        <div className="auth-brand">
          <span className="auth-brand-name">vynder</span>
          <span className="auth-brand-badge">Biz</span>
        </div>
        <h1 className="auth-left-headline">Start hiring Nigeria's top creators today.</h1>
        <p className="auth-left-sub">Join hundreds of Nigerian businesses using Vynder to find, hire, and pay creators — all in one place.</p>
        <div className="auth-features">
          {[
            { icon: "🚀", text: "Live in under 5 minutes" },
            { icon: "✦", text: "AI-matched creators from day one" },
            { icon: "💳", text: "Built-in payments — no extra setup" },
          ].map(f => (
            <div className="auth-feature" key={f.text}>
              <div className="auth-feature-icon"><span style={{ fontSize: 16 }}>{f.icon}</span></div>
              <span className="auth-feature-text">{f.text}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="auth-right" style={{ width: 560 }}>
        <div className="auth-form-brand">vynder <span style={{ fontSize: 13, fontWeight: 400, color: "var(--text-muted)" }}>for Business</span></div>

        {step < 4 ? (
          <>
            <h2 className="auth-title">Create your account</h2>
            <p className="auth-subtitle" style={{ marginBottom: 20 }}>Step {step} of 3 — {stepLabels[step - 1]}</p>

            <div className="cba-steps-bar">
              {stepLabels.map((label, i) => (
                <div className="cba-step-item" key={label}>
                  <div className={`cba-step-circle ${step === i+1 ? "active" : step > i+1 ? "done" : ""}`}>
                    {step > i+1 ? "✓" : i+1}
                  </div>
                  <span className={`cba-step-label ${step === i+1 ? "active" : step > i+1 ? "done" : ""}`}>{label}</span>
                  {i < stepLabels.length - 1 && <div className={`cba-step-line ${step > i+1 ? "done" : ""}`}/>}
                </div>
              ))}
            </div>

            {step === 1 && (
              <>
                <div className="auth-field">
                  <label className="auth-label">Company Name</label>
                  <input className={`auth-input ${errors.companyName ? "has-error" : ""}`} placeholder="e.g. TechCorp Nigeria" value={form.companyName} onChange={set("companyName")} />
                  {errors.companyName && <span className="field-error">⚠ {errors.companyName}</span>}
                </div>
                <div className="auth-field">
                  <label className="auth-label">Industry</label>
                  <div className="auth-select-wrap">
                    <select className={`auth-input ${errors.industry ? "has-error" : ""}`} value={form.industry} onChange={set("industry")}>
                      <option value="">Select your industry</option>
                      <option value="Technology / Software">Technology / Software</option>
                      <option value="FMCG / Consumer Goods">FMCG / Consumer Goods</option>
                      <option value="Finance / Fintech">Finance / Fintech</option>
                      <option value="Media & Entertainment">Media & Entertainment</option>
                      <option value="Fashion & Beauty">Fashion & Beauty</option>
                      <option value="Food & Beverage">Food & Beverage</option>
                      <option value="Education">Education</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="Other">Other</option>
                    </select>
                    <svg className="auth-select-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
                  </div>
                  {errors.industry && <span className="field-error">⚠ {errors.industry}</span>}
                </div>
                <div className="cba-two-col">
                  <div className="auth-field" style={{ marginBottom: 0 }}>
                    <label className="auth-label">Company Size</label>
                    <div className="auth-select-wrap">
                      <select className={`auth-input ${errors.size ? "has-error" : ""}`} value={form.size} onChange={set("size")}>
                        <option value="">Select size</option>
                        <option value="1–10">1–10 employees</option>
                        <option value="11–50">11–50 employees</option>
                        <option value="51–200">51–200 employees</option>
                        <option value="200+">200+ employees</option>
                      </select>
                      <svg className="auth-select-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
                    </div>
                    {errors.size && <span className="field-error">⚠ {errors.size}</span>}
                  </div>
                  <div className="auth-field" style={{ marginBottom: 0 }}>
                    <label className="auth-label">Website <span style={{ fontWeight: 400, color: "var(--text-muted)" }}>(optional)</span></label>
                    <input className="auth-input" placeholder="yourcompany.com" value={form.website} onChange={set("website")} />
                  </div>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div className="auth-field">
                  <label className="auth-label">Contact Person's Name</label>
                  <input className={`auth-input ${errors.contactName ? "has-error" : ""}`} placeholder="e.g. Emeka Okafor" value={form.contactName} onChange={set("contactName")} />
                  {errors.contactName && <span className="field-error">⚠ {errors.contactName}</span>}
                </div>
                <div className="auth-field">
                  <label className="auth-label">Work Email</label>
                  <input className={`auth-input ${errors.email ? "has-error" : ""}`} type="email" placeholder="you@company.com" value={form.email} onChange={set("email")} />
                  {errors.email && <span className="field-error">⚠ {errors.email}</span>}
                </div>
                <div className="auth-field">
                  <label className="auth-label">Phone Number</label>
                  <input className={`auth-input ${errors.phone ? "has-error" : ""}`} placeholder="+234 800 000 0000" value={form.phone} onChange={set("phone")} />
                  {errors.phone && <span className="field-error">⚠ {errors.phone}</span>}
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <div className="auth-field">
                  <label className="auth-label">Create Password</label>
                  <div className="auth-input-wrap">
                    <input className={`auth-input ${errors.password ? "has-error" : ""}`} type={showPw ? "text" : "password"} placeholder="Min 8 characters" value={form.password} onChange={set("password")} />
                    <button className="auth-eye-btn" onClick={() => setShowPw(!showPw)} type="button">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                        {showPw ? <><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></> : <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>}
                      </svg>
                    </button>
                  </div>
                  {errors.password && <span className="field-error">⚠ {errors.password}</span>}
                </div>
                <div className="auth-field">
                  <label className="auth-label">Confirm Password</label>
                  <input className={`auth-input ${errors.confirmPassword ? "has-error" : ""}`} type="password" placeholder="Repeat your password" value={form.confirmPassword} onChange={set("confirmPassword")} />
                  {errors.confirmPassword && <span className="field-error">⚠ {errors.confirmPassword}</span>}
                </div>
                <div className="auth-check-row" onClick={() => setForm({ ...form, agree: !form.agree })}>
                  <div className={`auth-check-box ${form.agree ? "checked" : ""}`}>
                    {form.agree && <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>}
                  </div>
                  <span className="auth-check-text">I agree to the <a>Terms of Service</a> and <a>Privacy Policy</a></span>
                </div>
                {errors.agree && <span className="field-error" style={{ marginTop: -8, marginBottom: 8, display: "block" }}>⚠ {errors.agree}</span>}
              </>
            )}

            <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
              {step > 1 && (
                <button className="auth-btn" style={{ flex: 1, background: "transparent", color: "var(--text-dark)", border: "1.5px solid var(--border)" }} onClick={() => { setStep(step - 1); setErrors({}); }}>
                  ← Back
                </button>
              )}
              <button className="auth-btn" style={{ flex: 2 }} onClick={handleNext} disabled={loading}>
                {loading ? "Creating account..." : step < 3 ? "Continue →" : "Create Account →"}
              </button>
            </div>

            <p className="auth-switch">Already have an account? <a onClick={onGoSignIn}>Sign in</a></p>
          </>
        ) : (
          <div className="cba-success">
            <div className="cba-success-icon">🎉</div>
            <h3 className="cba-success-title">Account Created!</h3>
            <p className="cba-success-sub">Welcome to Vynder Biz, <strong>{form.companyName || "your company"}</strong>. Your account is ready — start hiring Nigeria's best creators today.</p>
            <button className="auth-btn" style={{ maxWidth: 320 }} onClick={onSuccess}>Go to Dashboard →</button>
          </div>
        )}
      </div>
    </div>
  );
}

// ── MESSAGES PAGE ──
function MessagesPage() {
  const [conversations, setConversations] = useState(conversationsData);
  const [activeConvo, setActiveConvo] = useState(conversations[0]);
  const [tab, setTab] = useState("all");
  const [search, setSearch] = useState("");
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  const filtered = conversations.filter(c => {
    const matchTab = tab === "all" || (tab === "unread" && c.unread);
    const matchSearch = !search || c.name.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [activeConvo?.messages]);

  const handleSelectConvo = (c) => {
    setActiveConvo(c);
    setConversations(prev => prev.map(x => x.id === c.id ? { ...x, unread: false } : x));
  };

  const sendMessage = () => {
    if (!inputText.trim() || !activeConvo) return;
    const newMsg = { id: Date.now(), from: "me", text: inputText.trim(), time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }), date: "Today" };
    const updatedConvos = conversations.map(c => c.id === activeConvo.id ? { ...c, messages: [...c.messages, newMsg], preview: inputText.trim().slice(0, 30) + "...", time: "now" } : c);
    setConversations(updatedConvos);
    setActiveConvo({ ...activeConvo, messages: [...activeConvo.messages, newMsg] });
    setInputText("");
    if (textareaRef.current) textareaRef.current.style.height = "24px";

    // Simulate reply after delay
    setTimeout(() => setIsTyping(true), 1000);
    setTimeout(() => {
      setIsTyping(false);
      const replies = [
        "Got it! I'll get on that right away.",
        "Sounds good, will update you shortly.",
        "Noted! I'll factor that in.",
        "Perfect, thanks for confirming.",
      ];
      const reply = { id: Date.now() + 1, from: "creator", text: replies[Math.floor(Math.random() * replies.length)], time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }), date: "Today" };
      setConversations(prev => prev.map(c => c.id === activeConvo.id ? { ...c, messages: [...c.messages, newMsg, reply], preview: reply.text.slice(0, 30) + "..." } : c));
      setActiveConvo(prev => ({ ...prev, messages: [...prev.messages, newMsg, reply] }));
    }, 3000);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleTextareaChange = (e) => {
    setInputText(e.target.value);
    e.target.style.height = "24px";
    e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px";
  };

  const unreadCount = conversations.filter(c => c.unread).length;

  return (
    <div className="messages-layout">
      {/* Sidebar */}
      <div className="messages-sidebar">
        <div className="messages-sidebar-header">
          <div className="messages-sidebar-title">Messages</div>
          <div className="msg-tab-row">
            <div className={`msg-tab ${tab === "all" ? "active" : ""}`} onClick={() => setTab("all")}>All</div>
            <div className={`msg-tab ${tab === "unread" ? "active" : ""}`} onClick={() => setTab("unread")}>
              Unread {unreadCount > 0 && <span style={{ background: "var(--purple-btn)", color: "white", borderRadius: "20px", padding: "0 5px", fontSize: 10, marginLeft: 4 }}>{unreadCount}</span>}
            </div>
          </div>
          <div className="msg-search-wrap">
            <svg className="msg-search-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input className="msg-search-input" placeholder="Search conversations..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
        </div>

        <div className="conversations-list">
          {filtered.length === 0 && (
            <div style={{ padding: "32px 20px", textAlign: "center", color: "var(--text-muted)", fontSize: 13 }}>No conversations found</div>
          )}
          {filtered.map(c => (
            <div key={c.id} className={`convo-item ${activeConvo?.id === c.id ? "active" : ""}`} onClick={() => handleSelectConvo(c)}>
              <div className={`convo-avatar ${c.avatarColor}`}>{c.initials}</div>
              <div className="convo-body">
                <div className="convo-top">
                  <span className="convo-name">{c.name}</span>
                  <span className="convo-time">{c.time}</span>
                </div>
                <div className={`convo-preview ${c.unread ? "unread" : ""}`}>{c.preview}</div>
              </div>
              {c.unread && <div className="convo-unread-dot"/>}
            </div>
          ))}
        </div>
      </div>

      {/* Chat area */}
      {activeConvo ? (
        <div className="chat-area">
          <div className="chat-header">
            <div className="chat-header-left">
              <div className={`chat-header-avatar ${activeConvo.avatarColor}`}>{activeConvo.initials}</div>
              <div>
                <div className="chat-header-name">{activeConvo.name}</div>
                <div className="chat-header-role">
                  {activeConvo.online && <span className="online-dot"/>}
                  {activeConvo.online ? "Online" : "Offline"} · {activeConvo.role}
                </div>
              </div>
            </div>
            <div className="chat-header-actions">
              <button className="chat-icon-btn" title="View profile">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              </button>
              <button className="chat-icon-btn" title="Video call">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>
              </button>
              <button className="chat-icon-btn" title="More options">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="19" r="1"/></svg>
              </button>
            </div>
          </div>

          {activeConvo.brief && (
            <div className="chat-linked-brief">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--purple-mid)" strokeWidth="2" strokeLinecap="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/></svg>
              <span className="chat-linked-brief-text">Linked brief: <strong>{activeConvo.brief}</strong></span>
              <button className="chat-brief-btn">View Brief</button>
            </div>
          )}

          <div className="messages-thread">
            {activeConvo.messages.map((msg, i) => {
              const showDate = i === 0 || activeConvo.messages[i-1].date !== msg.date;
              return (
                <div key={msg.id}>
                  {showDate && (
                    <div className="msg-date-divider"><span>{msg.date}</span></div>
                  )}
                  <div className={`msg-row ${msg.from === "me" ? "outgoing" : ""}`}>
                    {msg.from !== "me" && (
                      <div className={`msg-bubble-avatar ${activeConvo.avatarColor}`}>{activeConvo.initials}</div>
                    )}
                    <div className="msg-wrap">
                      <div className="msg-bubble">{msg.text}</div>
                      <div className="msg-time">{msg.time}</div>
                    </div>
                  </div>
                </div>
              );
            })}

            {isTyping && (
              <div className="typing-indicator">
                <div className={`msg-bubble-avatar ${activeConvo.avatarColor}`}>{activeConvo.initials}</div>
                <div className="typing-dots">
                  <div className="typing-dot"/>
                  <div className="typing-dot"/>
                  <div className="typing-dot"/>
                </div>
              </div>
            )}
            <div ref={messagesEndRef}/>
          </div>

          <div className="chat-input-area">
            <div className="chat-input-row">
              <button className="chat-attach-btn" title="Attach file">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48"/></svg>
              </button>
              <textarea
                ref={textareaRef}
                className="chat-textarea"
                placeholder={`Message ${activeConvo.name}...`}
                value={inputText}
                onChange={handleTextareaChange}
                onKeyDown={handleKeyDown}
                rows={1}
              />
              <button className="chat-send-btn" onClick={sendMessage} disabled={!inputText.trim()}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="chat-empty">
          <div className="chat-empty-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--purple-bright)" strokeWidth="1.8" strokeLinecap="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
          </div>
          <div className="chat-empty-title">Select a conversation</div>
          <div className="chat-empty-sub">Choose a creator from the list to start messaging</div>
        </div>
      )}
    </div>
  );
}

// ── SIDEBAR ──
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
          {navItems.map(item => (
            <div key={item.label} className={`nav-item ${currentPage === item.page ? "active" : ""}`} onClick={() => onNavigate(item.page)}>
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
          <div className="nav-item"><NavIcon type="settings"/>Settings</div>
          <div className="nav-item logout"><NavIcon type="logout"/>Logout</div>
        </div>
      </div>
    </aside>
  );
}

// ── BUSINESS PROFILE ──
function BusinessProfile() {
  return (
    <div className="content">
      <p className="biz-profile-subtitle">This is how creators see your business on Vynder</p>
      <div className="bp-card">
        <div className="bp-hero">
          <div className="bp-avatar">TC</div>
          <div className="bp-hero-info">
            <div className="bp-company-name">TechCorp Nigeria</div>
            <div className="bp-industry">Technology / Software · Lagos</div>
            <div className="bp-desc">We build innovative digital products for African markets. We work regularly with creators for product launches, social content, and brand campaigns.</div>
          </div>
        </div>
        <button className="bp-edit-btn" onClick={createRipple}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
          Edit Profile
        </button>
      </div>
      <div className="bp-card">
        <div className="bp-section-title">Company Info</div>
        <div className="bp-info-grid">
          {[["Contact Person","Emeka Okafor"],["Work Email","techcorp@gmail.com"],["Industry","Technology / Software"],["Company Size","11–50 employees"],["Location","Victoria Island, Lagos"]].map(([l,v]) => (
            <div className="bp-info-cell" key={l}><div className="bp-info-label">{l}</div><div className="bp-info-value">{v}</div></div>
          ))}
        </div>
        <div className="bp-info-row">
          {[["Website","techcorp.ng",true],["CAC Number","RC-1234567",false],["Member Since","Jan 2026",false]].map(([l,v,link]) => (
            <div className="bp-info-cell" style={{ border:"none",margin:0,padding:0 }} key={l}><div className="bp-info-label">{l}</div><div className={`bp-info-value${link?" link":""}`}>{v}</div></div>
          ))}
        </div>
      </div>
      <div className="bp-card">
        <div className="bp-section-title">Hiring Activity</div>
        <div className="bp-activity-grid">
          {[["Total Projects","9"],["Creators Hired","5"],["Total Spent","₦685,000"],["Active Briefs","4"]].map(([l,v]) => (
            <div className="bp-activity-cell" key={l}><div className="bp-activity-label">{l}</div><div className="bp-activity-value">{v}</div></div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── JOB REQUESTS ──
function JobRequests() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selected, setSelected] = useState(null);

  const filtered = jobRequestsData.filter(r => {
    const matchSearch = !search || r.creator.toLowerCase().includes(search.toLowerCase()) || r.project.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || r.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const stats = { total: jobRequestsData.length, accepted: jobRequestsData.filter(r => r.status === "accepted").length, pending: jobRequestsData.filter(r => r.status === "pending").length, declined: jobRequestsData.filter(r => r.status === "declined").length };

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
            <span className={`jrd-status-pill ${selected.status}`}>{selected.status.charAt(0).toUpperCase() + selected.status.slice(1)}</span>
          </div>
          <div className="jrd-meta">
            <div className="jrd-meta-cell"><div className="jrd-meta-label">Project</div><div className="jrd-meta-value" style={{ fontSize:15,fontWeight:700 }}>{selected.project}</div></div>
            <div className="jrd-meta-cell"><div className="jrd-meta-label">Budget Offered</div><div className="jrd-meta-value">{selected.amount}</div></div>
            <div className="jrd-meta-cell"><div className="jrd-meta-label">Request Sent</div><div className="jrd-meta-value" style={{ fontSize:15 }}>{selected.date}</div></div>
          </div>
          <div className="jrd-response">
            <div className="jrd-response-label">Creator's Response</div>
            {selected.response ? <p className="jrd-response-text">{selected.response}</p> : <p className="jrd-response-empty">No response yet — the creator hasn't replied.</p>}
          </div>
          {selected.status === "accepted" && <button className="jrd-make-payment-btn">Make Payment</button>}
          {selected.status === "pending" && <button className="jrd-make-payment-btn" disabled>Awaiting Creator Response</button>}
          {selected.status === "declined" && <div className="jrd-declined-note">✕ This creator declined your request. You can browse for another creator.</div>}
        </div>
      </div>
    );
  }

  return (
    <div className="content">
      <div className="jr-stats-grid">
        {[["Total Sent",stats.total,"total","#3b82f6"],["Accepted",stats.accepted,"accepted","#22c55e"],["Pending",stats.pending,"pending","#f97316"],["Declined",stats.declined,"declined","#ef4444"]].map(([l,v,cls,color]) => (
          <div className="jr-stat-card" key={l}>
            <div><div className="jr-stat-label">{l}</div><div className="jr-stat-value">{v}</div></div>
            <div className={`jr-stat-icon ${cls}`}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/></svg></div>
          </div>
        ))}
      </div>
      <div className="jr-toolbar">
        <div className="search-wrap" style={{ flex:1 }}>
          <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input className="search-input" placeholder="Search job requests..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div className="filter-wrap">
          <select className="filter-select" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
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
          <thead><tr><th>Creator</th><th>Project</th><th>Amount</th><th>Status</th><th>Date</th><th style={{ textAlign:"center" }}>ACTION</th></tr></thead>
          <tbody>
            {filtered.length === 0 ? <tr><td colSpan={6} style={{ textAlign:"center",color:"var(--text-muted)",padding:"40px" }}>No requests found</td></tr>
            : filtered.map(r => (
              <tr key={r.id}>
                <td style={{ fontWeight:600 }}>{r.creator}</td>
                <td style={{ color:"var(--text-muted)" }}>{r.project}</td>
                <td style={{ fontWeight:600 }}>{r.amount}</td>
                <td><span className={`jr-status-pill ${r.status}`}>{r.status.charAt(0).toUpperCase() + r.status.slice(1)}</span></td>
                <td style={{ color:"var(--text-muted)" }}>{r.date}</td>
                <td style={{ textAlign:"center" }}><button className="jr-view-btn" onClick={() => setSelected(r)}>View Details</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── BROWSE CREATORS ──
function BrowseCreators({ onViewProfile, onSendRequest }) {
  const [search, setSearch] = useState("");
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
          <input className="search-input" placeholder="Search by name or skill..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div className="filter-wrap">
          <select className="filter-select" value={locationFilter} onChange={e => setLocationFilter(e.target.value)}>
            <option value="all">All Locations</option>
            <option value="Lagos">Lagos</option>
            <option value="Abuja">Abuja</option>
            <option value="Port Harcourt">Port Harcourt</option>
          </select>
          <svg className="filter-arrow" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
        </div>
      </div>
      <div className="creators-grid">
        {filtered.map(c => (
          <div className="creator-grid-card" key={c.name}>
            <div className="cgc-top">
              <div className="cgc-avatar">{c.initials}</div>
              <div className="cgc-info"><div className="cgc-name">{c.name}</div><div className="cgc-role">{c.role} · {c.location}</div></div>
              <span className="cgc-score">{c.score}</span>
            </div>
            <div className="cgc-desc">{c.desc}</div>
            <div className="cgc-tags">{c.tags.map(t => <span key={t} className="cgc-tag">{t}</span>)}</div>
            <div className="cgc-rate">{c.rate}</div>
            <div className="cgc-actions">
              <button className="cgc-btn-outline" onClick={() => onViewProfile(c)}>View Profile</button>
              <button className="cgc-btn-fill" onClick={e => { createRipple(e); onSendRequest(c); }}>Send Request</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── MY BRIEFS ──
function MyBriefs({ briefs, onPostBrief, onBack }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const filtered = briefs.filter(b => {
    const matchSearch = !search || b.title.toLowerCase().includes(search.toLowerCase());
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
        <div className="search-wrap" style={{ flex:1 }}>
          <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input className="search-input" placeholder="Search job briefs..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div className="filter-wrap">
          <select className="filter-select" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
            <option value="all">All Status</option>
            <option value="open">Open</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
          <svg className="filter-arrow" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
        </div>
        <button className="post-btn" onClick={onPostBrief} style={{ borderRadius:"50px",whiteSpace:"nowrap" }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Post a Brief
        </button>
      </div>
      <div className="briefs-table-wrap">
        <table>
          <thead><tr><th>Brief Title</th><th>Category</th><th>Budget</th><th>Status</th><th>Bids</th><th>Posted</th><th>Action</th></tr></thead>
          <tbody>
            {filtered.length === 0 ? <tr><td colSpan={7} style={{ textAlign:"center",color:"var(--text-muted)",padding:"40px" }}>No briefs found</td></tr>
            : filtered.map(b => (
              <tr key={b.id}>
                <td style={{ fontWeight:600 }}>{b.title}</td>
                <td style={{ color:"var(--text-muted)" }}>{b.category}</td>
                <td style={{ fontFamily:"monospace",fontSize:13 }}>{b.budget}</td>
                <td><span className={`brief-status-pill ${b.status}`}>{b.status.charAt(0).toUpperCase()+b.status.slice(1)}</span></td>
                <td style={{ fontWeight:600 }}>{b.bids}</td>
                <td style={{ color:"var(--text-muted)" }}>{b.posted}</td>
                <td><button className="brief-action-btn">{b.status === "open" ? "View Bids" : "View"}</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── POST A BRIEF ──
function PostBrief({ onBack, onSuccess }) {
  const [form, setForm] = useState({ title:"",category:"",description:"",minBudget:"",maxBudget:"",startDate:"",endDate:"",projectType:"one-time",location:"remote" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const set = f => e => { setForm({ ...form, [f]:e.target.value }); setErrors({ ...errors, [f]:"" }); };
  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = "Brief title is required";
    if (!form.category) e.category = "Select a category";
    if (!form.description.trim()) e.description = "Please describe the project";
    if (!form.minBudget || isNaN(parseFloat(form.minBudget))) e.minBudget = "Enter a valid amount";
    if (!form.maxBudget || isNaN(parseFloat(form.maxBudget))) e.maxBudget = "Enter a valid amount";
    return e;
  };
  const handleSubmit = e => {
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    createRipple(e);
    setTimeout(() => setSubmitted(true), 300);
  };
  if (submitted) return (
    <div className="content">
      <div className="post-brief-wrap">
        <div className="post-brief-success">
          <div className="post-brief-success-icon">✦</div>
          <h3 style={{ fontFamily:"'Syne',sans-serif",fontSize:22,fontWeight:800,color:"var(--text-dark)",marginBottom:8 }}>Brief Posted!</h3>
          <p style={{ fontSize:14,color:"var(--text-muted)",lineHeight:1.65,marginBottom:28,maxWidth:320,textAlign:"center" }}>Your brief <strong>"{form.title}"</strong> is now live. Our AI is matching it with relevant creators now.</p>
          <button className="auth-btn" style={{ maxWidth:320 }} onClick={() => onSuccess(form)}>View My Briefs</button>
          <button className="auth-btn" style={{ maxWidth:320,marginTop:10,background:"transparent",color:"var(--purple-bright)",border:"1.5px solid var(--border)" }} onClick={onBack}>Back to Dashboard</button>
        </div>
      </div>
    </div>
  );
  return (
    <div className="content">
      <button className="back-btn" onClick={onBack}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
        Back to Briefs
      </button>
      <div className="post-brief-wrap">
        <div className="post-brief-field">
          <label className="post-brief-label">Brief Title</label>
          <input className={`post-brief-input ${errors.title?"has-error":""}`} placeholder="e.g Product Launch Video Q2 2026" value={form.title} onChange={set("title")} />
          {errors.title && <span className="field-error">⚠ {errors.title}</span>}
        </div>
        <div className="post-brief-field">
          <label className="post-brief-label">Creator Category Needed</label>
          <div className="post-brief-select-wrap">
            <select className={`post-brief-input ${errors.category?"has-error":""}`} value={form.category} onChange={set("category")}>
              <option value="">Select category</option>
              {["Videographer","Photographer","Social Media Manager","Copywriter","Graphic Designer","Animator","Content Creator"].map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <svg className="post-brief-select-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
          </div>
          {errors.category && <span className="field-error">⚠ {errors.category}</span>}
        </div>
        <div className="post-brief-field">
          <label className="post-brief-label">Brief Description</label>
          <textarea className={`post-brief-textarea ${errors.description?"has-error":""}`} placeholder="Describe the project. Include deliverables, style references, platform, audience, etc" value={form.description} onChange={set("description")} />
          {errors.description && <span className="field-error">⚠ {errors.description}</span>}
        </div>
        <div className="post-brief-two-col">
          <div className="post-brief-field" style={{ marginBottom:0 }}>
            <label className="post-brief-label">Min Budget (₦)</label>
            <input className={`post-brief-input ${errors.minBudget?"has-error":""}`} placeholder="e.g ₦80,000" value={form.minBudget} onChange={set("minBudget")} />
            {errors.minBudget && <span className="field-error">⚠ {errors.minBudget}</span>}
          </div>
          <div className="post-brief-field" style={{ marginBottom:0 }}>
            <label className="post-brief-label">Max Budget (₦)</label>
            <input className={`post-brief-input ${errors.maxBudget?"has-error":""}`} placeholder="e.g ₦150,000" value={form.maxBudget} onChange={set("maxBudget")} />
            {errors.maxBudget && <span className="field-error">⚠ {errors.maxBudget}</span>}
          </div>
        </div>
        <div className="post-brief-ai-note" style={{ marginTop:24 }}>
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

// ── MAIN APP ──
export default function App() {
  const [authScreen, setAuthScreen] = useState("signin"); // "signin" | "create" | "app"
  const [page, setPage] = useState("dashboard");
  const [selectedCreator, setSelectedCreator] = useState(null);
  const [showJobRequest, setShowJobRequest] = useState(false);
  const [jobRequestCreator, setJobRequestCreator] = useState(null);
  const [menuOpen, setMenuOpen] = useState(true);
  const [accountOpen, setAccountOpen] = useState(true);
  const [briefs, setBriefs] = useState(initialBriefs);

  const getHour = () => { const h = new Date().getHours(); if (h < 12) return "morning"; if (h < 17) return "afternoon"; return "evening"; };

  const handleBriefPosted = (form) => {
    setBriefs([{ id: briefs.length+1, title:form.title, category:form.category, budget:`${Number(form.minBudget).toLocaleString()} – ${Number(form.maxBudget).toLocaleString()}`, status:"open", bids:0, posted:new Date().toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"}) }, ...briefs]);
    setPage("briefs");
  };

  if (authScreen === "signin") return (
    <>
      <style>{styles}</style>
      <SignIn onSignIn={() => setAuthScreen("app")} onGoCreate={() => setAuthScreen("create")} />
    </>
  );

  if (authScreen === "create") return (
    <>
      <style>{styles}</style>
      <CreateBusinessAccount onSuccess={() => setAuthScreen("app")} onGoSignIn={() => setAuthScreen("signin")} />
    </>
  );

  const topbarInfo = {
    dashboard: { title: "Dashboard", subtitle: "Overview of your creator activity, projects, and payments" },
    browse: { title: "Browse Creators", subtitle: "Discover and connect with vetted creators across Nigeria" },
    profile: { title: selectedCreator?.name || "Creator Profile", subtitle: `${selectedCreator?.role || ""} · ${selectedCreator?.location || ""}` },
    briefs: { title: "My Briefs", subtitle: "All job briefs you have posted" },
    "post-brief": { title: "Post a New Brief", subtitle: "Tell creators what you need. Be as specific as possible." },
    "business-profile": { title: "Business Profile", subtitle: "This is how creators see your business on Vynder" },
    messages: { title: "Messages", subtitle: "Manage conversations with creators and stay aligned on projects" },
    jobs: { title: "Job Requests", subtitle: "Track all job requests sent to creators" },
    notifications: { title: "Notifications", subtitle: "Stay updated on your projects" },
    transactions: { title: "Transaction History", subtitle: "All your payment records" },
  };

  const info = topbarInfo[page] || topbarInfo.dashboard;

  return (
    <>
      <style>{styles}</style>
      <div className="layout">
        <Sidebar currentPage={page} onNavigate={p => { setPage(p); setSelectedCreator(null); }} menuOpen={menuOpen} setMenuOpen={setMenuOpen} accountOpen={accountOpen} setAccountOpen={setAccountOpen} />

        <main className="main">
          <div className="topbar">
            <div className="topbar-left"><h1>{info.title}</h1><p>{info.subtitle}</p></div>
            <div className="topbar-right">
              <div className="icon-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>
                <div className="notif-dot"/>
              </div>
              <div className={`topbar-avatar ${page === "business-profile" ? "active" : ""}`} onClick={() => setPage("business-profile")}>TC</div>
            </div>
          </div>

          {page === "dashboard" && (
            <div className="content">
              <div className="greeting-row">
                <div><h2>Good {getHour()}, Emeka 👋</h2><p>Here's your business activity at a glance</p></div>
                <button className="post-btn" onClick={e => { createRipple(e); setPage("briefs"); }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                  Post a Brief
                </button>
              </div>
              <div className="stats-banner">
                <div className="stat-block"><div className="stat-label">Total Spent</div><div className="stat-value">₦685,000</div><div className="stat-sub">All time</div></div>
                <div className="stat-block"><div className="stat-label">This Month</div><div className="stat-value">₦205,000</div><div className="stat-sub"><span className="stat-badge green">📈 +12%</span> &nbsp;vs last month</div></div>
                <div className="stat-block"><div className="stat-label">Pending Payment</div><div className="stat-value">₦120,000</div><div className="stat-sub"><span className="stat-badge orange">⏳ 1 awaiting</span></div></div>
                <div className="banner-actions">
                  <button className="make-payment-btn">Make Payment</button>
                  <button className="view-history-btn">View history</button>
                </div>
              </div>
              <div className="metrics-grid">
                {[{title:"Active Briefs",value:4,sub:"2 receiving bids",icon:"blue",color:"#3b82f6"},{title:"Job Requests Sent",value:9,sub:"3 accepted",icon:"purple",color:"#7b4ff0"},{title:"Active Projects",value:3,sub:"In progress",icon:"green",color:"#22c55e"},{title:"Completed",value:6,sub:"All time",icon:"orange",color:"#f97316"}].map(m => (
                  <div className="metric-card" key={m.title}>
                    <div className="metric-header"><span className="metric-title">{m.title}</span><div className={`metric-icon ${m.icon}`}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={m.color} strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="10"/></svg></div></div>
                    <div className="metric-value">{m.value}</div>
                    <div className="metric-sub">{m.sub}</div>
                  </div>
                ))}
              </div>
              <div className="bottom-grid">
                <div className="section-card">
                  <div className="section-header"><span className="section-title">Recent Activity</span><button className="view-all-btn">View all <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg></button></div>
                  <table>
                    <thead><tr><th>Creator</th><th>Project</th><th>Amount</th><th>Status</th><th>Date</th></tr></thead>
                    <tbody>{activity.map((r,i) => (<tr key={i}><td style={{ fontWeight:600 }}>{r.creator}</td><td style={{ color:"var(--text-muted)" }}>{r.project}</td><td className="amount-neg">-{r.amount}</td><td><span className={`status-pill ${r.status}`}>{r.status === "in-progress" ? "In Progress" : r.status.charAt(0).toUpperCase()+r.status.slice(1)}</span></td><td style={{ color:"var(--text-muted)" }}>{r.date}</td></tr>))}</tbody>
                  </table>
                </div>
                <div className="section-card creators-panel">
                  <div className="section-header"><span className="section-title">Recommended Creators</span><button className="view-all-btn" onClick={() => setPage("browse")}>Browse</button></div>
                  <div className="ai-badge">✦ AI Matched to Your Briefs</div>
                  {allCreators.slice(0,3).map(c => (
                    <div className="creator-card" key={c.name}>
                      <div className="creator-top"><div className="avatar">{c.initials}</div><div className="creator-info"><div className="creator-name">{c.name}</div><div className="creator-role">{c.role} · {c.location}</div></div><span className="creator-score">{c.score}</span></div>
                      <div className="creator-desc">{c.desc}</div>
                      <button className="view-profile-btn" onClick={() => { setSelectedCreator(c); setPage("profile"); }}>View Profile</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {page === "messages" && <MessagesPage />}
          {page === "jobs" && <JobRequests />}
          {page === "briefs" && <MyBriefs briefs={briefs} onPostBrief={() => setPage("post-brief")} onBack={() => setPage("dashboard")} />}
          {page === "post-brief" && <PostBrief onBack={() => setPage("briefs")} onSuccess={handleBriefPosted} />}
          {page === "browse" && <BrowseCreators onViewProfile={c => { setSelectedCreator(c); setPage("profile"); }} onSendRequest={c => { setJobRequestCreator(c); setShowJobRequest(true); }} />}
          {page === "profile" && selectedCreator && (
            <div className="content">
              <button className="back-btn" onClick={() => setPage("browse")}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>Back to Browse Creators</button>
              <div className="profile-card">
                <div className="profile-hero">
                  <div className="profile-avatar">{selectedCreator.initials}</div>
                  <div className="profile-hero-info"><div className="profile-name">{selectedCreator.name}</div><div className="profile-role">{selectedCreator.role} · {selectedCreator.location}</div><div className="profile-desc">{selectedCreator.desc}</div></div>
                  <div className="profile-match">{selectedCreator.score} AI Match</div>
                </div>
                <div className="profile-stats">
                  <div className="profile-stat"><div className="profile-stat-label">Starting Rate</div><div className="profile-stat-value" style={{ fontSize:15,fontWeight:700 }}>{selectedCreator.startingRate}</div></div>
                  <div className="profile-stat"><div className="profile-stat-label">Jobs Completed</div><div className="profile-stat-value">{selectedCreator.completedJobs}</div></div>
                  <div className="profile-stat"><div className="profile-stat-label">Portfolio</div><div className="profile-stat-value link">{selectedCreator.portfolio}</div></div>
                </div>
                <div className="profile-section-title">Skills</div>
                <div className="profile-tags">{selectedCreator.tags.map(t => <span key={t} className="profile-tag">{t}</span>)}</div>
                <button className="profile-send-btn">Send Job Request</button>
              </div>
            </div>
          )}
          {page === "business-profile" && <BusinessProfile />}
          {["notifications","transactions"].includes(page) && (
            <div className="content"><div style={{ background:"var(--white)",border:"1px solid var(--border)",borderRadius:"var(--radius)",padding:"60px 40px",textAlign:"center" }}><div style={{ fontSize:40,marginBottom:16 }}>🚧</div><div style={{ fontFamily:"'Syne',sans-serif",fontSize:20,fontWeight:800,color:"var(--text-dark)",marginBottom:8 }}>Coming Soon</div><div style={{ fontSize:14,color:"var(--text-muted)" }}>This section is under construction.</div></div></div>
          )}
        </main>
      </div>
    </>
  );
}