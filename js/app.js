'use strict';

// ── Cert Config ────────────────────────────────────────────────────────────────
// Defined here so CERT_DATA is available to all functions.
// Question arrays (QUESTIONS_CCSP etc.) are loaded by their own <script> tags before app.js.
const CERT_DATA = {
  ccsp:  { name:'CCSP',  fullName:'Certified Cloud Security Professional',       org:'ISC²',  icon:'☁️',  color:'#4f8ef7', accentDark:'#3a6fd8',
           getQ:()=>[...QUESTIONS_CCSP,
             ...(typeof QUESTIONS_CCSP_EXTRA!=='undefined'?QUESTIONS_CCSP_EXTRA:[])],
           getDN:()=>DOMAIN_NAMES_CCSP,
           getAcr:()=>ACRONYMS_CCSP, getGls:()=>GLOSSARY_CCSP,
           acroLabel:'CCSP certification abbreviations and acronyms',
           glsLabel:'Comprehensive dictionary of CCSP certification terms and concepts',
           domains: 6,
           bannerSub:'Master cloud security concepts across all 6 CCSP domains' },
  cism:  { name:'CISM',  fullName:'Certified Information Security Manager',       org:'ISACA', icon:'🔒',  color:'#27ae60', accentDark:'#1e8449',
           getQ:()=>[...QUESTIONS_CISM,
             ...(typeof QUESTIONS_CISM_C1!=='undefined'?QUESTIONS_CISM_C1:[]),
             ...(typeof QUESTIONS_CISM_C2!=='undefined'?QUESTIONS_CISM_C2:[]),
             ...(typeof QUESTIONS_CISM_C3!=='undefined'?QUESTIONS_CISM_C3:[]),
             ...(typeof QUESTIONS_CISM_C4!=='undefined'?QUESTIONS_CISM_C4:[]),
             ...(typeof QUESTIONS_CISM_C5!=='undefined'?QUESTIONS_CISM_C5:[])],
           getDN:()=>DOMAIN_NAMES_CISM,
           getAcr:()=>ACRONYMS_CISM, getGls:()=>GLOSSARY_CISM,
           acroLabel:'CISM certification abbreviations — Governance, Risk, and Security Management',
           glsLabel:'Key terms and concepts for the CISM examination',
           domains: 4,
           bannerSub:'Master information security management across all 4 CISM domains' },
  cisa:  { name:'CISA',  fullName:'Certified Information Systems Auditor',        org:'ISACA', icon:'🔍',  color:'#f39c12', accentDark:'#d68910',
           getQ:()=>[...QUESTIONS_CISA,
             ...(typeof QUESTIONS_CISA_C1!=='undefined'?QUESTIONS_CISA_C1:[]),
             ...(typeof QUESTIONS_CISA_C2!=='undefined'?QUESTIONS_CISA_C2:[]),
             ...(typeof QUESTIONS_CISA_C3!=='undefined'?QUESTIONS_CISA_C3:[]),
             ...(typeof QUESTIONS_CISA_C4!=='undefined'?QUESTIONS_CISA_C4:[]),
             ...(typeof QUESTIONS_CISA_C5!=='undefined'?QUESTIONS_CISA_C5:[])],
           getDN:()=>DOMAIN_NAMES_CISA,
           getAcr:()=>ACRONYMS_CISA, getGls:()=>GLOSSARY_CISA,
           acroLabel:'CISA certification abbreviations — IS Audit, Governance, and Risk',
           glsLabel:'Key terms and concepts for the CISA examination',
           domains: 5,
           bannerSub:'Master information systems auditing across all 5 CISA domains' },
  cissp: { name:'CISSP', fullName:'Certified Information Systems Security Professional', org:'ISC²', icon:'🛡️', color:'#e74c3c', accentDark:'#c0392b',
           getQ:()=>[...QUESTIONS_CISSP,
             ...(typeof QUESTIONS_CISSP_C1!=='undefined'?QUESTIONS_CISSP_C1:[]),
             ...(typeof QUESTIONS_CISSP_C2!=='undefined'?QUESTIONS_CISSP_C2:[]),
             ...(typeof QUESTIONS_CISSP_C3!=='undefined'?QUESTIONS_CISSP_C3:[]),
             ...(typeof QUESTIONS_CISSP_C4!=='undefined'?QUESTIONS_CISSP_C4:[]),
             ...(typeof QUESTIONS_CISSP_C5!=='undefined'?QUESTIONS_CISSP_C5:[])],
           getDN:()=>DOMAIN_NAMES_CISSP,
           getAcr:()=>ACRONYMS_CISSP, getGls:()=>GLOSSARY_CISSP,
           acroLabel:'CISSP certification abbreviations — across all 8 security domains',
           glsLabel:'Key terms and concepts for the CISSP examination',
           domains: 8,
           bannerSub:'Master information security across all 8 CISSP CBK domains' },
  crisc: { name:'CRISC', fullName:'Certified in Risk and Information Systems Control', org:'ISACA', icon:'⚠️', color:'#9b59b6', accentDark:'#8e44ad',
           getQ:()=>[...QUESTIONS_CRISC,
             ...(typeof QUESTIONS_CRISC_C1!=='undefined'?QUESTIONS_CRISC_C1:[]),
             ...(typeof QUESTIONS_CRISC_C2!=='undefined'?QUESTIONS_CRISC_C2:[]),
             ...(typeof QUESTIONS_CRISC_C3!=='undefined'?QUESTIONS_CRISC_C3:[]),
             ...(typeof QUESTIONS_CRISC_C4!=='undefined'?QUESTIONS_CRISC_C4:[]),
             ...(typeof QUESTIONS_CRISC_C5!=='undefined'?QUESTIONS_CRISC_C5:[])],
           getDN:()=>DOMAIN_NAMES_CRISC,
           getAcr:()=>ACRONYMS_CRISC, getGls:()=>GLOSSARY_CRISC,
           acroLabel:'CRISC certification abbreviations — IT Risk and Information Systems Control',
           glsLabel:'Key terms and concepts for the CRISC examination',
           domains: 4,
           bannerSub:'Master IT risk management across all 4 CRISC domains' },
  issap: { name:'ISSAP', fullName:'Information Systems Security Architecture Professional', org:'ISC²', icon:'🏗️', color:'#1abc9c', accentDark:'#16a085',
           getQ:()=>[...QUESTIONS_ISSAP,
             ...(typeof QUESTIONS_ISSAP_C1!=='undefined'?QUESTIONS_ISSAP_C1:[]),
             ...(typeof QUESTIONS_ISSAP_C2!=='undefined'?QUESTIONS_ISSAP_C2:[]),
             ...(typeof QUESTIONS_ISSAP_C3!=='undefined'?QUESTIONS_ISSAP_C3:[]),
             ...(typeof QUESTIONS_ISSAP_C4!=='undefined'?QUESTIONS_ISSAP_C4:[]),
             ...(typeof QUESTIONS_ISSAP_C5!=='undefined'?QUESTIONS_ISSAP_C5:[])],
           getDN:()=>DOMAIN_NAMES_ISSAP,
           getAcr:()=>ACRONYMS_ISSAP, getGls:()=>GLOSSARY_ISSAP,
           acroLabel:'ISSAP certification abbreviations — Security Architecture Professional',
           glsLabel:'Key terms and concepts for the ISSAP examination',
           domains: 6,
           bannerSub:'Master security architecture across all 6 ISSAP domains' },
  secx:  { name:'SecurityX', fullName:'CompTIA SecurityX (CASP+)', org:'CompTIA', icon:'🔐', color:'#e67e22', accentDark:'#ca6f1e',
           getQ:()=>[...QUESTIONS_SECX,
             ...(typeof QUESTIONS_SECX_C1!=='undefined'?QUESTIONS_SECX_C1:[]),
             ...(typeof QUESTIONS_SECX_C2!=='undefined'?QUESTIONS_SECX_C2:[]),
             ...(typeof QUESTIONS_SECX_C3!=='undefined'?QUESTIONS_SECX_C3:[]),
             ...(typeof QUESTIONS_SECX_C4!=='undefined'?QUESTIONS_SECX_C4:[]),
             ...(typeof QUESTIONS_SECX_C5!=='undefined'?QUESTIONS_SECX_C5:[])],
           getDN:()=>DOMAIN_NAMES_SECX,
           getAcr:()=>ACRONYMS_SECX, getGls:()=>GLOSSARY_SECX,
           acroLabel:'CompTIA SecurityX certification abbreviations and acronyms',
           glsLabel:'Key terms and concepts for the CompTIA SecurityX examination',
           domains: 4,
           bannerSub:'Master advanced security concepts across all 4 SecurityX domains' },
  chfi:  { name:'CHFI', fullName:'Computer Hacking Forensic Investigator', org:'EC-Council', icon:'🔬', color:'#c0392b', accentDark:'#a93226',
           getQ:()=>[...QUESTIONS_CHFI,
             ...(typeof QUESTIONS_CHFI_C1!=='undefined'?QUESTIONS_CHFI_C1:[]),
             ...(typeof QUESTIONS_CHFI_C2!=='undefined'?QUESTIONS_CHFI_C2:[]),
             ...(typeof QUESTIONS_CHFI_C3!=='undefined'?QUESTIONS_CHFI_C3:[]),
             ...(typeof QUESTIONS_CHFI_C4!=='undefined'?QUESTIONS_CHFI_C4:[]),
             ...(typeof QUESTIONS_CHFI_C5!=='undefined'?QUESTIONS_CHFI_C5:[])],
           getDN:()=>DOMAIN_NAMES_CHFI,
           getAcr:()=>ACRONYMS_CHFI, getGls:()=>GLOSSARY_CHFI,
           acroLabel:'CHFI certification abbreviations — Digital Forensics and Investigation',
           glsLabel:'Key terms and concepts for the CHFI examination',
           domains: 6,
           bannerSub:'Master digital forensics investigation across all 6 CHFI domains' },
  ecih:  { name:'ECIH', fullName:'EC-Council Certified Incident Handler', org:'EC-Council', icon:'🚨', color:'#2980b9', accentDark:'#2471a3',
           getQ:()=>[...QUESTIONS_ECIH,
             ...(typeof QUESTIONS_ECIH_C1!=='undefined'?QUESTIONS_ECIH_C1:[]),
             ...(typeof QUESTIONS_ECIH_C2!=='undefined'?QUESTIONS_ECIH_C2:[]),
             ...(typeof QUESTIONS_ECIH_C3!=='undefined'?QUESTIONS_ECIH_C3:[]),
             ...(typeof QUESTIONS_ECIH_C4!=='undefined'?QUESTIONS_ECIH_C4:[]),
             ...(typeof QUESTIONS_ECIH_C5!=='undefined'?QUESTIONS_ECIH_C5:[])],
           getDN:()=>DOMAIN_NAMES_ECIH,
           getAcr:()=>ACRONYMS_ECIH, getGls:()=>GLOSSARY_ECIH,
           acroLabel:'ECIH certification abbreviations — Incident Handling and Response',
           glsLabel:'Key terms and concepts for the ECIH examination',
           domains: 5,
           bannerSub:'Master incident handling and response across all 5 ECIH domains' },
  cpent: { name:'CPENT', fullName:'Certified Penetration Testing Professional', org:'EC-Council', icon:'⚔️', color:'#d35400', accentDark:'#ba4a00',
           getQ:()=>[...QUESTIONS_CPENT,
             ...(typeof QUESTIONS_CPENT_C1!=='undefined'?QUESTIONS_CPENT_C1:[]),
             ...(typeof QUESTIONS_CPENT_C2!=='undefined'?QUESTIONS_CPENT_C2:[]),
             ...(typeof QUESTIONS_CPENT_C3!=='undefined'?QUESTIONS_CPENT_C3:[]),
             ...(typeof QUESTIONS_CPENT_C4!=='undefined'?QUESTIONS_CPENT_C4:[]),
             ...(typeof QUESTIONS_CPENT_C5!=='undefined'?QUESTIONS_CPENT_C5:[])],
           getDN:()=>DOMAIN_NAMES_CPENT,
           getAcr:()=>ACRONYMS_CPENT, getGls:()=>GLOSSARY_CPENT,
           acroLabel:'CPENT certification abbreviations — Penetration Testing Professional',
           glsLabel:'Key terms and concepts for the CPENT examination',
           domains: 5,
           bannerSub:'Master penetration testing across all 5 CPENT domains' }
};

// Active data sets — populated by activateCert()
let QUESTIONS    = [];
let DOMAIN_NAMES = {};
let ACRONYMS     = [];
let GLOSSARY     = [];

function activateCert(certCode) {
  const cd = CERT_DATA[certCode];
  if (!cd) return;
  // Sync current cert data back before switching (preserve lifetimeAnswered)
  if (STATE.activeCert && STATE.certData) {
    const prev = STATE.certData[STATE.activeCert] || {};
    STATE.certData[STATE.activeCert] = {
      questionStats:    STATE.questionStats,
      bookmarks:        STATE.bookmarks,
      sessions:         STATE.sessions,
      lifetimeAnswered: prev.lifetimeAnswered || 0
    };
  }
  if (!STATE.certData) STATE.certData = {};
  if (!STATE.certData[certCode]) STATE.certData[certCode] = { questionStats:{}, bookmarks:[], sessions:[] };

  STATE.activeCert    = certCode;
  STATE.questionStats = STATE.certData[certCode].questionStats || {};
  STATE.bookmarks     = STATE.certData[certCode].bookmarks     || [];
  STATE.sessions      = STATE.certData[certCode].sessions      || [];
  STATE.currentSession = null;

  QUESTIONS    = cd.getQ();
  DOMAIN_NAMES = cd.getDN();
  ACRONYMS     = (typeof cd.getAcr === 'function') ? cd.getAcr() : [];
  GLOSSARY     = (typeof cd.getGls === 'function') ? cd.getGls() : [];

  // Reset reference & custom-test screens so they reinitialize for the new cert
  acrInitDone = false;
  glsInitDone = false;
  ctInitDone  = false;
  acrFilter   = { query: '', letter: null };
  glsFilter   = { query: '', letter: null };
  ctConfig.domains = Array.from({length: cd.domains || 6}, (_, i) => i + 1);

  // Apply cert-specific UI theme
  applyCertTheme(certCode);

  // Update sidebar badge
  const navTotal = document.getElementById('nav-total');
  if (navTotal) navTotal.textContent = QUESTIONS.length;
}

// ── Cert Theming ───────────────────────────────────────────────────────────────
function applyCertTheme(certCode) {
  const cd = CERT_DATA[certCode];
  if (!cd) return;

  // Set CSS custom properties for accent color
  const root = document.documentElement;
  root.style.setProperty('--accent',      cd.color);
  root.style.setProperty('--accent-dark', cd.accentDark);

  // Update sidebar logo
  const logoTitle = document.querySelector('.logo-title');
  const logoSub   = document.querySelector('.logo-sub');
  if (logoTitle) logoTitle.textContent = `CertPrepAI`;
  if (logoSub)   logoSub.textContent   = `${cd.icon} ${cd.name} · ${cd.org}`;

  // Update page <title>
  document.title = `CertPrepAI — ${cd.name}`;

  // Update home banner subtitle (if already rendered)
  const bannerSubEl = document.getElementById('banner-cert-sub');
  if (bannerSubEl) bannerSubEl.textContent = cd.bannerSub;

  // Update home screen certification badge
  const certBadgeEl = document.getElementById('banner-cert-badge');
  if (certBadgeEl) {
    certBadgeEl.textContent = `${cd.icon} ${cd.name}`;
    certBadgeEl.style.background = cd.color + '22';
    certBadgeEl.style.color = cd.color;
    certBadgeEl.style.borderColor = cd.color + '55';
  }

  // Update acronyms banner sub
  const acrBannerSub = document.getElementById('acr-banner-sub');
  if (acrBannerSub) acrBannerSub.textContent = cd.acroLabel;

  // Update glossary banner sub
  const glsBannerSub = document.getElementById('gls-banner-sub');
  if (glsBannerSub) glsBannerSub.textContent = cd.glsLabel;

  // Update sidebar cert label
  const certLabel = document.getElementById('sidebar-cert-label');
  if (certLabel) certLabel.textContent = `${cd.name} · ${QUESTIONS.length} Q`;
}

// ── Crypto ─────────────────────────────────────────────────────────────────────
const CCSP_SALT_KEY  = 'ccsp_salt';
const CCSP_VALID_KEY = 'ccsp_validator';
const CCSP_DATA_KEY  = 'ccsp_state_enc';
const CCSP_PASS_LKEY = 'ccsp_pass_local'; // localStorage — persists forever per device

let cryptoKey = null;

function _b64enc(buf) {
  return btoa(String.fromCharCode(...new Uint8Array(buf)));
}
function _b64dec(b64) {
  return Uint8Array.from(atob(b64), c => c.charCodeAt(0));
}

async function _deriveKey(passphrase) {
  let salt;
  const saltB64 = localStorage.getItem(CCSP_SALT_KEY);
  if (saltB64) {
    salt = _b64dec(saltB64);
  } else {
    salt = crypto.getRandomValues(new Uint8Array(16));
    localStorage.setItem(CCSP_SALT_KEY, _b64enc(salt));
  }
  const enc = new TextEncoder();
  const km = await crypto.subtle.importKey('raw', enc.encode(passphrase), 'PBKDF2', false, ['deriveKey']);
  return crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt, iterations: 150000, hash: 'SHA-256' },
    km,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  );
}

async function _encryptStr(key, plaintext) {
  const iv  = crypto.getRandomValues(new Uint8Array(12));
  const ct  = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, new TextEncoder().encode(plaintext));
  return JSON.stringify({ iv: _b64enc(iv), ct: _b64enc(ct) });
}

async function _decryptStr(key, stored) {
  const { iv, ct } = JSON.parse(stored);
  const pt = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: _b64dec(iv) }, key, _b64dec(ct));
  return new TextDecoder().decode(pt);
}

async function validateKey(passphrase) {
  try {
    const key       = await _deriveKey(passphrase);
    const validator = localStorage.getItem(CCSP_VALID_KEY);
    if (!validator) {
      // First-time setup ONLY when no prior data exists.
      // If salt or encrypted data exist without a validator, refuse re-seeding
      // (prevents auth bypass via DevTools validator deletion).
      const saltExists = !!localStorage.getItem(CCSP_SALT_KEY);
      const dataExists = !!localStorage.getItem(CCSP_DATA_KEY);
      if (saltExists || dataExists) {
        // Validator was deleted but device data remains — block re-setup
        return false;
      }
      localStorage.setItem(CCSP_VALID_KEY, await _encryptStr(key, 'CCSP_UNLOCKED'));
      cryptoKey = key;
      return true;
    }
    const plain = await _decryptStr(key, validator);
    if (plain === 'CCSP_UNLOCKED') { cryptoKey = key; return true; }
    return false;
  } catch (e) { return false; }
}

// ── State ──────────────────────────────────────────────────────────────────────
let STATE = {
  activeCert: null,
  certData: {},
  bookmarks: [],
  sessions: [],
  questionStats: {},
  currentSession: null
};

// ── Gauge (SVG arc) ────────────────────────────────────────────────────────────
function drawGauge(svgId, pctValue, w, h) {
  const svg = document.getElementById(svgId);
  if (!svg) return;
  const v = Math.max(0, Math.min(100, pctValue || 0));
  const cx = w / 2, cy = h - 4, r = h - 10;
  const toRad = a => (a - 180) * Math.PI / 180;
  const pt = a => [cx + r * Math.cos(toRad(a)), cy + r * Math.sin(toRad(a))];

  // colour zones
  const zones = [{from:0,to:40,color:'#e74c3c'},{from:40,to:70,color:'#f39c12'},{from:70,to:100,color:'#27ae60'}];
  let arcs = '';
  zones.forEach(z => {
    const a1 = z.from * 1.8, a2 = z.to * 1.8;
    const [x1,y1] = pt(a1), [x2,y2] = pt(a2);
    arcs += `<path d="M${x1},${y1} A${r},${r} 0 0,1 ${x2},${y2}" stroke="${z.color}" stroke-width="8" fill="none" stroke-linecap="round" opacity="0.3"/>`;
  });

  // filled arc
  const fillColor = v < 40 ? '#e74c3c' : v < 70 ? '#f39c12' : '#27ae60';
  const a2 = v * 1.8;
  const [fx,fy] = pt(0), [tx,ty] = pt(a2);
  const lg = a2 > 180 ? 1 : 0;
  const filledArc = v > 0 ? `<path d="M${fx},${fy} A${r},${r} 0 ${lg},1 ${tx},${ty}" stroke="${fillColor}" stroke-width="8" fill="none" stroke-linecap="round"/>` : '';

  // needle
  const needleA = v * 1.8;
  const [nx,ny] = pt(needleA);
  const needle = `<line x1="${cx}" y1="${cy}" x2="${nx}" y2="${ny}" stroke="#fff" stroke-width="2" stroke-linecap="round" opacity="0.9"/>
  <circle cx="${cx}" cy="${cy}" r="4" fill="#fff" opacity="0.9"/>`;

  svg.innerHTML = arcs + filledArc + needle;
}

// ── Progress Chart (SVG line) ──────────────────────────────────────────────────
function drawProgressChart(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const w = canvas.parentElement.clientWidth - 44 || 300;
  const h = 160;
  canvas.width = w; canvas.height = h;

  const pts = STATE.sessions.slice(-10).map((s, i, arr) => ({
    x: arr.length === 1 ? 0.5 : i / (arr.length - 1),
    y: (s.pct || 0) / 100,
    label: new Date(s.date).toLocaleDateString('en-US', {month:'short', day:'numeric'})
  }));

  ctx.clearRect(0, 0, w, h);

  if (pts.length < 1) {
    ctx.fillStyle = '#7a90b0';
    ctx.font = '13px Segoe UI';
    ctx.textAlign = 'center';
    ctx.fillText('No sessions yet', w/2, h/2);
    return;
  }

  const pad = {t:12,r:16,b:28,l:28};
  const cw = w - pad.l - pad.r, ch = h - pad.t - pad.b;

  // grid lines
  [0, 0.25, 0.5, 0.75, 1].forEach(v => {
    const y = pad.t + ch * (1 - v);
    ctx.strokeStyle = '#1e3a5f';
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(pad.l, y); ctx.lineTo(pad.l + cw, y); ctx.stroke();
    ctx.fillStyle = '#7a90b0';
    ctx.font = '10px Segoe UI';
    ctx.textAlign = 'right';
    ctx.fillText(Math.round(v*100)+'%', pad.l - 4, y + 4);
  });

  if (pts.length === 1) {
    const px = pad.l + 0.5 * cw;
    const py = pad.t + ch * (1 - pts[0].y);
    ctx.beginPath();
    ctx.arc(px, py, 5, 0, Math.PI*2);
    ctx.fillStyle = '#4f8ef7';
    ctx.fill();
  } else {
    // fill under line
    const grad = ctx.createLinearGradient(0, pad.t, 0, pad.t + ch);
    grad.addColorStop(0, 'rgba(79,142,247,0.25)');
    grad.addColorStop(1, 'rgba(79,142,247,0)');
    ctx.beginPath();
    pts.forEach((p, i) => {
      const px = pad.l + p.x * cw, py = pad.t + ch * (1 - p.y);
      i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
    });
    ctx.lineTo(pad.l + pts[pts.length-1].x * cw, pad.t + ch);
    ctx.lineTo(pad.l, pad.t + ch);
    ctx.closePath();
    ctx.fillStyle = grad;
    ctx.fill();

    // line
    ctx.beginPath();
    pts.forEach((p, i) => {
      const px = pad.l + p.x * cw, py = pad.t + ch * (1 - p.y);
      i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
    });
    ctx.strokeStyle = '#4f8ef7';
    ctx.lineWidth = 2.5;
    ctx.lineJoin = 'round';
    ctx.stroke();

    // dots + labels
    pts.forEach((p, i) => {
      const px = pad.l + p.x * cw, py = pad.t + ch * (1 - p.y);
      const isLast = i === pts.length - 1;
      ctx.beginPath();
      ctx.arc(px, py, isLast ? 6 : 4, 0, Math.PI*2);
      ctx.fillStyle = isLast ? '#f39c12' : '#4f8ef7';
      ctx.fill();
      ctx.strokeStyle = '#0d1b2a';
      ctx.lineWidth = 2;
      ctx.stroke();

      // value label
      ctx.fillStyle = isLast ? '#f39c12' : '#4f8ef7';
      ctx.font = `bold 10px Segoe UI`;
      ctx.textAlign = 'center';
      ctx.fillText(Math.round(p.y*100)+'%', px, py - 10);

      // date label
      if (i === 0 || isLast || pts.length <= 5) {
        ctx.fillStyle = '#7a90b0';
        ctx.font = '9px Segoe UI';
        ctx.textAlign = 'center';
        ctx.fillText(p.label, px, pad.t + ch + 16);
      }
    });
  }
}

async function loadState() {
  try {
    const enc = localStorage.getItem(CCSP_DATA_KEY);
    if (enc && cryptoKey) {
      const dec = await _decryptStr(cryptoKey, enc);
      STATE = JSON.parse(dec);
    } else {
      const raw = localStorage.getItem('ccsp_state');
      if (raw) STATE = JSON.parse(raw);
    }
    // Migrate old flat STATE (no certData) to new per-cert structure
    if (!STATE.certData) {
      STATE.certData = {
        ccsp: {
          questionStats: STATE.questionStats || {},
          bookmarks:     STATE.bookmarks     || [],
          sessions:      STATE.sessions      || []
        }
      };
    }
    // Ensure all known certs have a certData entry
    ['ccsp','cism','cisa','cissp','crisc','issap','secx','chfi','ecih','cpent'].forEach(k => {
      if (!STATE.certData[k]) STATE.certData[k] = { questionStats:{}, bookmarks:[], sessions:[] };
    });
    if (!STATE.bookmarks)     STATE.bookmarks = [];
    if (!STATE.sessions)      STATE.sessions = [];
    if (!STATE.questionStats) STATE.questionStats = {};
  } catch (e) { /* fresh start */ }
}

async function saveState() {
  try {
    // Sync active cert data before saving
    if (STATE.activeCert && STATE.certData) {
      const prev = STATE.certData[STATE.activeCert] || {};
      STATE.certData[STATE.activeCert] = {
        questionStats:   STATE.questionStats,
        bookmarks:       STATE.bookmarks,
        sessions:        STATE.sessions,
        lifetimeAnswered: prev.lifetimeAnswered || 0  // preserve across saves
      };
    }
    if (cryptoKey) {
      const enc = await _encryptStr(cryptoKey, JSON.stringify(STATE));
      localStorage.setItem(CCSP_DATA_KEY, enc);
    } else {
      localStorage.setItem('ccsp_state', JSON.stringify(STATE));
    }
  } catch (e) {}
}

// ── Routing ────────────────────────────────────────────────────────────────────
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const target = document.getElementById('screen-' + id);
  if (target) target.classList.add('active');
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  const nb = document.querySelector(`.nav-btn[data-screen="${id}"]`);
  if (nb) nb.classList.add('active');
  updateSidebarBadges();
}

// ── Utilities ──────────────────────────────────────────────────────────────────
// HTML-escape untrusted values before inserting into innerHTML (prevents stored XSS)
function esc(v) {
  return String(v == null ? '' : v)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Safe integer coercion — returns the number or 0 if non-numeric
function safeInt(v) { const n = parseInt(v, 10); return isNaN(n) ? 0 : n; }

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pct(n, d) { return d === 0 ? 0 : Math.round((n / d) * 100); }

function domainColor(d) {
  // Supports up to 10 domains (CISSP has 8)
  const COLORS = ['','#4f8ef7','#e67e22','#27ae60','#8e44ad','#e74c3c','#16a085','#f39c12','#2980b9','#c0392b','#1abc9c'];
  return COLORS[d] || '#7a90b0';
}

function levelBadgeClass(l) { return ['','badge-foundation','badge-intermediate','badge-advanced'][l]; }

// ── Readiness Score ────────────────────────────────────────────────────────────
function readinessScore() {
  const qs = STATE.questionStats;
  const totalAttempts = Object.values(qs).reduce((a, s) => a + (s.attempts || 0), 0);
  const totalCorrect = Object.values(qs).reduce((a, s) => a + (s.correct || 0), 0);
  return totalAttempts > 0 ? pct(totalCorrect, totalAttempts) : 0;
}

// ── Home Screen ────────────────────────────────────────────────────────────────
function renderHome() {
  // Re-apply theme (handles returning to home from quiz etc.)
  if (STATE.activeCert) applyCertTheme(STATE.activeCert);
  const score = readinessScore();
  // gauges
  drawGauge('home-gauge', score, 110, 70);
  const hgp = document.getElementById('home-gauge-pct');
  if (hgp) hgp.textContent = score > 0 ? score + '%' : '—';

  // badges
  const el = id => document.getElementById(id);
  if (el('home-total-badge')) el('home-total-badge').textContent = QUESTIONS.length;
  if (el('home-sess-badge'))  el('home-sess-badge').textContent = STATE.sessions.length;
  if (el('home-bk-badge'))    el('home-bk-badge').textContent   = STATE.bookmarks.length;
  if (el('home-acr-badge'))   el('home-acr-badge').textContent  = ACRONYMS.length || '—';
  if (el('home-gls-badge'))   el('home-gls-badge').textContent  = GLOSSARY.length || '—';

  // sidebar badges
  updateSidebarBadges();

  // Question of the Day — pick deterministically by day
  const today = new Date();
  const validQs = QUESTIONS.filter(q => q && q.question);
  const dayIndex = validQs.length > 0 ? Math.floor(today.getTime() / 86400000) % validQs.length : 0;
  const qotd = validQs[dayIndex];
  const qotdEl = document.getElementById('qotd-text');
  if (qotdEl) qotdEl.textContent = qotd ? qotd.question : 'No questions available yet.';
  const dateEl = document.getElementById('qotd-date');
  if (dateEl) dateEl.textContent = today.toLocaleDateString('en-US', {weekday:'short',month:'short',day:'numeric',year:'numeric'});
}

function updateSidebarBadges() {
  const nb = document.getElementById('nav-bk-count');
  const ns = document.getElementById('nav-sess-count');
  if (nb) nb.textContent = STATE.bookmarks.length;
  if (ns) ns.textContent = STATE.sessions.length;
}

// ── Dashboard ──────────────────────────────────────────────────────────────────
function renderDashboard() {
  const qs = STATE.questionStats;
  const totalSeen = Object.values(qs).filter(s => s.seen).length;
  const totalCorrect = Object.values(qs).reduce((a, s) => a + (s.correct || 0), 0);
  const totalAttempts = Object.values(qs).reduce((a, s) => a + (s.attempts || 0), 0);
  const accuracy = pct(totalCorrect, totalAttempts);
  const score = readinessScore();

  // gauges
  drawGauge('dash-gauge', score, 110, 70);
  drawGauge('big-gauge', score, 160, 100);
  const dgp = document.getElementById('dash-gauge-pct');
  if (dgp) dgp.textContent = score > 0 ? score + '%' : '—';
  const bgp = document.getElementById('big-gauge-pct');
  if (bgp) { bgp.textContent = score > 0 ? score + '%' : '—'; bgp.style.color = score >= 70 ? '#27ae60' : score >= 40 ? '#f39c12' : '#e74c3c'; }

  // milestone
  const milestones = [25, 50, 70, 80, 90, 100];
  const next = milestones.find(m => m > score) || 100;
  const prev = milestones[milestones.indexOf(next) - 1] || 0;
  const mPct = prev === next ? 100 : pct(score - prev, next - prev);
  const nm = document.getElementById('next-milestone');
  const mb = document.getElementById('milestone-bar');
  const ms = document.getElementById('milestone-sub');
  if (nm) nm.textContent = next + '%';
  if (mb) mb.style.width = mPct + '%';
  if (ms) ms.textContent = score >= 70 ? '✅ Passing threshold reached!' : `${next - score}% away from next milestone`;

  // stats cards
  document.getElementById('stat-seen').textContent = totalSeen;
  const seenSub = document.getElementById('stat-seen-sub');
  if (seenSub) seenSub.textContent = pct(totalSeen, QUESTIONS.length) + '% of ' + QUESTIONS.length;
  document.getElementById('stat-accuracy').textContent = totalAttempts > 0 ? accuracy + '%' : '—';
  const accSub = document.getElementById('stat-accuracy-sub');
  if (accSub) accSub.textContent = totalAttempts > 0 ? `${totalCorrect}/${totalAttempts} correct` : '';
  document.getElementById('stat-bookmarks').textContent = STATE.bookmarks.length;
  document.getElementById('stat-sessions').textContent = STATE.sessions.length;

  // progress chart
  drawProgressChart('progress-chart');

  // domain progress bars
  const dp = document.getElementById('domain-progress');
  dp.innerHTML = '';
  const numDomains = CERT_DATA[STATE.activeCert]?.domains || 6;
  for (let d = 1; d <= numDomains; d++) {
    const dqs = QUESTIONS.filter(q => q && q.domain === d);
    const dSeen = dqs.filter(q => qs[q.id]?.seen).length;
    const dCorrect = dqs.reduce((a, q) => a + (qs[q.id]?.correct || 0), 0);
    const dAttempts = dqs.reduce((a, q) => a + (qs[q.id]?.attempts || 0), 0);
    const dPct = dAttempts > 0 ? pct(dCorrect, dAttempts) : 0;
    const dSeen2 = pct(dSeen, dqs.length);
    const status = dPct >= 70 ? 'var(--success)' : dPct >= 40 ? 'var(--warning)' : dAttempts > 0 ? 'var(--danger)' : 'var(--text-muted)';
    dp.innerHTML += `
      <div class="domain-row">
        <div class="domain-label">
          <span class="domain-dot" style="background:${domainColor(d)}"></span>
          <span>D${d}: ${DOMAIN_NAMES[d]}</span>
        </div>
        <div class="domain-bar-wrap">
          <div class="domain-bar" style="width:${dPct}%;background:${domainColor(d)}"></div>
        </div>
        <div class="domain-pct-badge" style="color:${status}">${dAttempts > 0 ? dPct + '%' : '—'}</div>
        <div class="domain-stats">${dSeen}/${dqs.length} seen</div>
      </div>`;
  }

  // recent sessions
  const rl = document.getElementById('recent-sessions');
  rl.innerHTML = '';
  const recent = [...STATE.sessions].reverse().slice(0, 5);
  if (recent.length === 0) {
    rl.innerHTML = '<div class="empty-state">No sessions yet. Start a quiz!</div>';
  } else {
    recent.forEach(s => {
      try {
        const d = new Date(s.date);
        const dateStr = isNaN(d.getTime()) ? 'Unknown date' : `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`;
        // esc() prevents stored XSS from tampered localStorage session data
        const domainsStr = Array.isArray(s.domains) ? s.domains.map(x => esc('D' + safeInt(x))).join(', ') : '—';
        const levelsStr  = Array.isArray(s.levels)  ? s.levels.map(x => esc(LEVEL_NAMES[safeInt(x)] || 'L' + safeInt(x))).join(', ') : '—';
        const pass = (safeInt(s.pct)) >= 70;
        rl.innerHTML += `
          <div class="session-row">
            <span class="session-date">${esc(dateStr)}</span>
            <span class="session-info">${safeInt(s.total)} Qs &nbsp;·&nbsp; ${domainsStr} &nbsp;·&nbsp; ${levelsStr}</span>
            <span class="session-score" style="color:${pass ? '#27ae60' : '#e74c3c'}">${safeInt(s.score)}/${safeInt(s.total)} (${safeInt(s.pct)}%)</span>
          </div>`;
      } catch (e) { /* skip malformed session entry */ }
    });
    if (!rl.innerHTML.trim()) {
      rl.innerHTML = '<div class="empty-state">No sessions yet. Start a quiz!</div>';
    }
  }
}

// ── Setup Screen: Domain Checkboxes ────────────────────────────────────────────
function renderSetupDomains() {
  const container = document.getElementById('setup-domain-checks');
  if (!container) return;
  container.innerHTML = '';
  const numDomains = CERT_DATA[STATE.activeCert]?.domains || 6;
  for (let d = 1; d <= numDomains; d++) {
    const name = DOMAIN_NAMES[d] || `Domain ${d}`;
    const lbl = document.createElement('label');
    lbl.className = 'checkbox-item';
    lbl.innerHTML = `<input type="checkbox" class="domain-cb" value="${d}" checked /><label>D${d}: ${name}</label>`;
    container.appendChild(lbl);
  }

  // Update bookmark domain filter dropdown
  const bkFilter = document.getElementById('bk-domain-filter');
  if (bkFilter) {
    const prev = bkFilter.value;
    bkFilter.innerHTML = '<option value="0">All Domains</option>';
    for (let d = 1; d <= numDomains; d++) {
      const opt = document.createElement('option');
      opt.value = d;
      opt.textContent = `D${d}: ${DOMAIN_NAMES[d] || 'Domain ' + d}`;
      bkFilter.appendChild(opt);
    }
    bkFilter.value = prev || '0';
  }
}

// ── Quiz Setup ─────────────────────────────────────────────────────────────────
function setupQuizMode(timed) {
  const timerOpts = document.getElementById('timer-options');
  timerOpts.style.display = timed ? 'block' : 'none';
}

function startQuiz() {
  const domains = [...document.querySelectorAll('.domain-cb:checked')].map(c => +c.value);
  const levels = [...document.querySelectorAll('.level-cb:checked')].map(c => +c.value);
  if (domains.length === 0 || levels.length === 0) {
    alert('Please select at least one domain and one level.');
    return;
  }
  const pool = QUESTIONS.filter(q => q && domains.includes(q.domain) && levels.includes(q.level));
  if (pool.length === 0) {
    alert('No questions match the selected filters. Try a different combination.');
    return;
  }

  const qCount = document.getElementById('q-count').value;
  const count = qCount === 'all' ? pool.length : Math.min(+qCount, pool.length);
  const mode = document.querySelector('input[name="quiz-mode"]:checked').value; // timed | untimed
  let timerMode = null, timerValue = 0;
  if (mode === 'timed') {
    timerMode = document.querySelector('input[name="timer-mode"]:checked').value;
    timerValue = timerMode === 'full' ? (+document.getElementById('full-exam-minutes').value) * 60
                                       : +document.getElementById('per-q-seconds').value;
  }

  const selected = shuffle(pool).slice(0, count);
  STATE.currentSession = {
    config: { domains, levels, count, mode, timerMode, timerValue },
    questions: selected,
    answers: new Array(selected.length).fill(null),
    bookmarked: [...STATE.bookmarks],
    current: 0,
    startTime: Date.now(),
    timerRemaining: timerMode === 'full' ? timerValue : timerValue,
    perQTimerRemaining: timerMode === 'per-q' ? timerValue : null
  };
  saveState();
  showScreen('quiz');
  renderQuestion();
  startTimer();
}

// ── Quiz Engine ────────────────────────────────────────────────────────────────
let timerInterval = null;

function startTimer() {
  clearInterval(timerInterval);
  const s = STATE.currentSession;
  if (s.config.mode !== 'timed') return;

  if (s.config.timerMode === 'full') {
    timerInterval = setInterval(() => {
      s.timerRemaining--;
      saveState();
      updateTimerDisplay(s.timerRemaining);
      if (s.timerRemaining <= 0) { clearInterval(timerInterval); finishQuiz(); }
    }, 1000);
  } else {
    startPerQTimer();
  }
}

function startPerQTimer() {
  const s = STATE.currentSession;
  s.perQTimerRemaining = s.config.timerValue;
  timerInterval = setInterval(() => {
    s.perQTimerRemaining--;
    saveState();
    updateTimerDisplay(s.perQTimerRemaining);
    if (s.perQTimerRemaining <= 0) {
      clearInterval(timerInterval);
      if (STATE.currentSession.answers[s.current] === null) {
        recordAnswer(null); // auto-skip
      }
      autoNext();
    }
  }, 1000);
}

function autoNext() {
  const s = STATE.currentSession;
  if (s.current < s.questions.length - 1) {
    s.current++;
    saveState();
    renderQuestion();
    if (s.config.timerMode === 'per-q') startPerQTimer();
  } else {
    finishQuiz();
  }
}

function updateTimerDisplay(secs) {
  const el = document.getElementById('timer-display');
  if (!el) return;
  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);
  const s = secs % 60;
  el.textContent = h > 0 ? `${h}:${pad(m)}:${pad(s)}` : `${pad(m)}:${pad(s)}`;
  el.classList.toggle('timer-warning', secs <= 60);
}

function pad(n) { return String(n).padStart(2, '0'); }

function renderQuestion() {
  const s = STATE.currentSession;
  const q = s.questions[s.current];
  const answered = s.answers[s.current] !== null;

  document.getElementById('q-num').textContent = s.current + 1;
  document.getElementById('q-total').textContent = s.questions.length;
  document.getElementById('q-domain-badge').textContent = 'D' + q.domain + ': ' + DOMAIN_NAMES[q.domain];
  document.getElementById('q-domain-badge').style.borderColor = domainColor(q.domain);
  document.getElementById('q-domain-badge').style.color = domainColor(q.domain);
  document.getElementById('q-level-badge').textContent = LEVEL_NAMES[q.level];
  document.getElementById('q-level-badge').className = 'level-badge ' + levelBadgeClass(q.level);
  document.getElementById('q-text').textContent = q.question;

  const bk = document.getElementById('bookmark-btn');
  bk.classList.toggle('bookmarked', STATE.bookmarks.includes(q.id));

  const opts = document.getElementById('q-options');
  opts.innerHTML = '';
  q.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.textContent = opt;
    btn.dataset.idx = i;
    if (answered) {
      btn.disabled = true;
      if (i === q.correct) btn.classList.add('correct');
      else if (i === s.answers[s.current]) btn.classList.add('wrong');
    } else {
      btn.addEventListener('click', () => handleAnswer(i));
    }
    opts.appendChild(btn);
  });

  const showAns = s.config.showAnswer !== false;
  const exp = document.getElementById('explanation');
  if (answered && showAns) {
    exp.style.display = 'block';
    document.getElementById('exp-icon').textContent = s.answers[s.current] === q.correct ? '✓' : '✗';
    document.getElementById('exp-icon').style.color = s.answers[s.current] === q.correct ? '#27ae60' : '#e74c3c';
    document.getElementById('exp-text').textContent = q.explanation;
  } else {
    exp.style.display = 'none';
  }

  const nextBtn = document.getElementById('next-btn');
  nextBtn.textContent = s.current === s.questions.length - 1 ? 'Finish Quiz' : 'Next Question';
  nextBtn.style.display = answered ? 'inline-flex' : 'none';

  // progress bar
  const done = s.answers.filter(a => a !== null).length;
  document.getElementById('quiz-progress-bar').style.width = pct(done, s.questions.length) + '%';
  document.getElementById('quiz-progress-text').textContent = pct(done, s.questions.length) + '%';

  // timer visibility
  const timerWrap = document.getElementById('timer-wrap');
  timerWrap.style.display = s.config.mode === 'timed' ? 'flex' : 'none';
  if (s.config.mode === 'timed') {
    const rem = s.config.timerMode === 'full' ? s.timerRemaining : s.perQTimerRemaining;
    updateTimerDisplay(rem);
  }
}

function handleAnswer(idx) {
  clearInterval(timerInterval);
  recordAnswer(idx);
  const s = STATE.currentSession;
  const q = s.questions[s.current];

  // update questionStats
  const qs = STATE.questionStats;
  if (!qs[q.id]) qs[q.id] = { seen: true, correct: 0, attempts: 0 };
  qs[q.id].seen = true;
  qs[q.id].attempts++;
  if (idx === q.correct) qs[q.id].correct++;

  // increment permanent lifetime counter (persists through progress resets)
  if (!STATE.certData) STATE.certData = {};
  if (!STATE.certData[STATE.activeCert]) STATE.certData[STATE.activeCert] = {};
  STATE.certData[STATE.activeCert].lifetimeAnswered =
    (STATE.certData[STATE.activeCert].lifetimeAnswered || 0) + 1;

  saveState();
  renderQuestion();
}

function recordAnswer(idx) {
  const s = STATE.currentSession;
  s.answers[s.current] = idx;
}

function nextQuestion() {
  const s = STATE.currentSession;
  if (s.current < s.questions.length - 1) {
    s.current++;
    saveState();
    renderQuestion();
    if (s.config.mode === 'timed' && s.config.timerMode === 'per-q') startPerQTimer();
    else if (s.config.mode === 'timed' && s.config.timerMode === 'full') startTimer();
  } else {
    finishQuiz();
  }
}

function finishQuiz() {
  clearInterval(timerInterval);
  const s = STATE.currentSession;
  const correct = s.answers.reduce((a, ans, i) => a + (ans === s.questions[i].correct ? 1 : 0), 0);
  const total = s.questions.length;

  // record session
  STATE.sessions.push({
    id: Date.now(),
    date: new Date().toISOString(),
    domains: [...new Set(s.questions.map(q => q.domain))].sort(),
    levels: [...new Set(s.questions.map(q => q.level))].sort(),
    total,
    score: correct,
    pct: pct(correct, total),
    answers: s.answers,
    questionIds: s.questions.map(q => q.id)
  });
  saveState();
  renderResults();
  showScreen('results');
}

// ── Results ────────────────────────────────────────────────────────────────────
function renderResults() {
  const sess = STATE.sessions[STATE.sessions.length - 1];
  const s = STATE.currentSession;
  const correct = sess.score;
  const total = sess.total;
  const score = sess.pct;
  const pass = score >= 70;

  document.getElementById('res-score-pct').textContent = score + '%';
  document.getElementById('res-score-pct').style.color = pass ? '#27ae60' : '#e74c3c';
  document.getElementById('res-verdict').textContent = pass ? 'PASS' : 'NEEDS WORK';
  document.getElementById('res-verdict').className = 'verdict ' + (pass ? 'pass' : 'fail');
  document.getElementById('res-count').textContent = correct + ' / ' + total + ' correct';

  // by domain
  const byDomain = document.getElementById('res-by-domain');
  byDomain.innerHTML = '';
  const usedDomains = [...new Set(s.questions.map(q => q.domain))].sort();
  usedDomains.forEach(d => {
    const dqs = s.questions.map((q, i) => ({ q, ans: s.answers[i] })).filter(x => x.q.domain === d);
    const dc = dqs.filter(x => x.ans === x.q.correct).length;
    const dp = pct(dc, dqs.length);
    byDomain.innerHTML += `
      <div class="res-domain-row">
        <span class="domain-dot" style="background:${domainColor(d)}"></span>
        <span class="res-domain-name">D${d}: ${DOMAIN_NAMES[d]}</span>
        <div class="res-bar-wrap"><div class="res-bar" style="width:${dp}%;background:${domainColor(d)}"></div></div>
        <span class="res-domain-pct">${dc}/${dqs.length} (${dp}%)</span>
      </div>`;
  });

  // by level
  const byLevel = document.getElementById('res-by-level');
  byLevel.innerHTML = '';
  const usedLevels = [...new Set(s.questions.map(q => q.level))].sort();
  usedLevels.forEach(l => {
    const lqs = s.questions.map((q, i) => ({ q, ans: s.answers[i] })).filter(x => x.q.level === l);
    const lc = lqs.filter(x => x.ans === x.q.correct).length;
    const lp = pct(lc, lqs.length);
    byLevel.innerHTML += `
      <div class="res-domain-row">
        <span class="level-badge ${levelBadgeClass(l)}" style="font-size:0.75rem">${LEVEL_NAMES[l]}</span>
        <div class="res-bar-wrap" style="flex:1;margin:0 12px"><div class="res-bar" style="width:${lp}%"></div></div>
        <span class="res-domain-pct">${lc}/${lqs.length} (${lp}%)</span>
      </div>`;
  });

  renderReview();
}

function renderReview(filterWrong = false) {
  const s = STATE.currentSession;
  const container = document.getElementById('review-list');
  container.innerHTML = '';
  const items = s.questions.map((q, i) => ({ q, ans: s.answers[i], idx: i }));
  const filtered = filterWrong ? items.filter(x => x.ans !== x.q.correct) : items;

  if (filtered.length === 0) {
    container.innerHTML = '<div class="empty-state">No wrong answers. Perfect score!</div>';
    return;
  }

  filtered.forEach(({ q, ans }) => {
    const isCorrect = ans === q.correct;
    const card = document.createElement('div');
    card.className = 'review-card ' + (isCorrect ? 'review-correct' : 'review-wrong');
    card.innerHTML = `
      <div class="review-header">
        <span class="review-icon">${isCorrect ? '✓' : '✗'}</span>
        <span class="domain-badge-sm" style="border-color:${domainColor(q.domain)};color:${domainColor(q.domain)}">D${q.domain}</span>
        <span class="level-badge ${levelBadgeClass(q.level)}" style="font-size:0.7rem">${LEVEL_NAMES[q.level]}</span>
      </div>
      <div class="review-q">${q.question}</div>
      ${!isCorrect ? `<div class="review-your">Your answer: <span class="wrong-text">${q.options[ans] ?? 'Not answered'}</span></div>` : ''}
      <div class="review-correct-ans">Correct: <span class="correct-text">${q.options[q.correct]}</span></div>
      <div class="review-exp">${q.explanation}</div>`;
    container.appendChild(card);
  });
}

// ── Bookmarks ──────────────────────────────────────────────────────────────────
function toggleBookmark(qid) {
  const idx = STATE.bookmarks.indexOf(qid);
  if (idx === -1) STATE.bookmarks.push(qid);
  else STATE.bookmarks.splice(idx, 1);
  saveState();
  const btn = document.getElementById('bookmark-btn');
  if (btn) btn.classList.toggle('bookmarked', STATE.bookmarks.includes(qid));
}

function renderBookmarks() {
  const container = document.getElementById('bookmarks-list');
  container.innerHTML = '';

  const domainFilter = +document.getElementById('bk-domain-filter').value || 0;
  const levelFilter = +document.getElementById('bk-level-filter').value || 0;

  const bqs = QUESTIONS.filter(q =>
    q && STATE.bookmarks.includes(q.id) &&
    (domainFilter === 0 || q.domain === domainFilter) &&
    (levelFilter === 0 || q.level === levelFilter)
  );

  document.getElementById('bk-count').textContent = bqs.length;

  if (bqs.length === 0) {
    container.innerHTML = '<div class="empty-state">No bookmarks match the filter.</div>';
    return;
  }

  bqs.forEach(q => {
    const qs = STATE.questionStats[q.id] || {};
    const card = document.createElement('div');
    card.className = 'bk-card';
    card.innerHTML = `
      <div class="bk-card-header">
        <span class="domain-badge-sm" style="border-color:${domainColor(q.domain)};color:${domainColor(q.domain)}">D${q.domain}: ${DOMAIN_NAMES[q.domain]}</span>
        <span class="level-badge ${levelBadgeClass(q.level)}" style="font-size:0.7rem">${LEVEL_NAMES[q.level]}</span>
        <button class="bk-remove" data-qid="${q.id}" title="Remove bookmark">&#9733;</button>
      </div>
      <div class="bk-question">${q.question}</div>
      <div class="bk-meta">${qs.attempts ? `Attempted ${qs.attempts}x · ${pct(qs.correct||0, qs.attempts)}% correct` : 'Not yet attempted'}</div>
      <div class="bk-options">
        ${q.options.map((opt, i) => `<div class="bk-opt ${i === q.correct ? 'bk-opt-correct' : ''}">${opt}${i === q.correct ? ' ✓' : ''}</div>`).join('')}
      </div>
      <div class="bk-exp">${q.explanation}</div>`;
    container.appendChild(card);
  });

  container.querySelectorAll('.bk-remove').forEach(btn => {
    btn.addEventListener('click', () => {
      toggleBookmark(+btn.dataset.qid);
      renderBookmarks();
    });
  });
}

function practiceBookmarks() {
  const bqs = QUESTIONS.filter(q => q && STATE.bookmarks.includes(q.id));
  if (bqs.length === 0) { alert('No bookmarks to practice.'); return; }
  STATE.currentSession = {
    config: { domains: Array.from({length: CERT_DATA[STATE.activeCert]?.domains||6},(_,i)=>i+1), levels: [1,2,3], count: bqs.length, mode: 'untimed', timerMode: null, timerValue: 0 },
    questions: shuffle(bqs),
    answers: new Array(bqs.length).fill(null),
    bookmarked: [...STATE.bookmarks],
    current: 0,
    startTime: Date.now(),
    timerRemaining: 0,
    perQTimerRemaining: null
  };
  saveState();
  showScreen('quiz');
  renderQuestion();
}

// ── History ────────────────────────────────────────────────────────────────────
function renderHistory() {
  const container = document.getElementById('history-list');
  container.innerHTML = '';

  // header stats
  const tests = STATE.sessions.length;
  const el = id => document.getElementById(id);
  if (el('hist-tests')) el('hist-tests').textContent = tests;
  if (tests > 0) {
    const avg = Math.round(STATE.sessions.reduce((a,s)=>a+s.pct,0)/tests);
    const best = Math.max(...STATE.sessions.map(s=>s.pct));
    const totalCorrect = STATE.sessions.reduce((a,s)=>a+s.score,0);
    const totalQ = STATE.sessions.reduce((a,s)=>a+s.total,0);
    if (el('hist-avg'))     el('hist-avg').textContent = avg + '%';
    if (el('hist-best'))    el('hist-best').textContent = best + '%';
    if (el('hist-correct')) el('hist-correct').textContent = totalCorrect + '/' + totalQ;
  }

  if (tests === 0) {
    container.innerHTML = '<div class="empty-state">No sessions yet. Start a quiz!</div>';
    return;
  }

  const cards = document.createElement('div');
  cards.className = 'history-cards';

  [...STATE.sessions].reverse().forEach((s, i) => {
    const d = new Date(s.date);
    // safeInt() prevents stored XSS by coercing all numeric fields from localStorage
    const spct    = safeInt(s.pct);
    const stotal  = safeInt(s.total);
    const sscore  = safeInt(s.score);
    const pass    = spct >= 70;
    const wrong   = stotal - sscore;
    const skip    = Array.isArray(s.answers) ? s.answers.filter(a => a === null).length : 0;
    const correct = sscore;
    const fillColor = pass ? '#27ae60' : spct >= 40 ? '#f39c12' : '#e74c3c';
    const testName  = stotal >= 100 ? 'Assessment Test' : stotal >= 50 ? 'Practice Test' : 'Custom Test';
    const dateStr   = isNaN(d.getTime()) ? 'Unknown date' : d.toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'});
    const domsStr   = Array.isArray(s.domains) ? s.domains.map(x => esc('D' + safeInt(x))).join(', ') : '—';
    const lvlsStr   = Array.isArray(s.levels)  ? s.levels.map(x => esc(LEVEL_NAMES[safeInt(x)] || '')).join(', ') : '—';

    const card = document.createElement('div');
    card.className = 'history-card';
    card.innerHTML = `
      <div class="history-score-ring" style="color:${fillColor}">${spct}%</div>
      <div class="history-card-title">${esc(testName)}</div>
      <div class="history-card-date">📅 ${esc(dateStr)}</div>
      <div class="history-tally">
        <div class="history-tally-item">
          <div class="tally-num correct">${correct}</div>
          <div class="tally-lbl">correct</div>
        </div>
        <div class="history-tally-item">
          <div class="tally-num wrong">${wrong - skip}</div>
          <div class="tally-lbl">incorrect</div>
        </div>
        <div class="history-tally-item">
          <div class="tally-num skip">${skip}</div>
          <div class="tally-lbl">skipped</div>
        </div>
      </div>
      <div class="history-progress-bar">
        <div class="history-progress-fill" style="width:${spct}%;background:${fillColor}"></div>
      </div>
      <div style="font-size:0.72rem;color:var(--text-muted);margin-top:8px">
        ${domsStr} &nbsp;·&nbsp; ${lvlsStr}
      </div>`;
    cards.appendChild(card);
  });

  container.appendChild(cards);
}

function clearHistory() {
  if (!confirm('Clear all session history? This cannot be undone.')) return;
  STATE.sessions = [];
  STATE.questionStats = {};
  saveState();
  renderHistory();
  renderDashboard();
  renderHome();
}

// ── Reference: shared A–Z filter builder ──────────────────────────────────────
function buildAZFilter(rowId, onSelect) {
  const row = document.getElementById(rowId);
  if (!row) return;
  row.innerHTML = '';
  const allBtn = document.createElement('button');
  allBtn.className = 'az-btn active';
  allBtn.textContent = 'All';
  allBtn.addEventListener('click', () => {
    row.querySelectorAll('.az-btn').forEach(b => b.classList.remove('active'));
    allBtn.classList.add('active');
    onSelect(null);
  });
  row.appendChild(allBtn);
  'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').forEach(letter => {
    const btn = document.createElement('button');
    btn.className = 'az-btn';
    btn.textContent = letter;
    btn.dataset.letter = letter;
    btn.addEventListener('click', () => {
      row.querySelectorAll('.az-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      onSelect(letter);
    });
    row.appendChild(btn);
  });
}

// ── Acronyms ───────────────────────────────────────────────────────────────────
let acrFilter = { query: '', letter: null };
let acrInitDone = false;

function renderAcronyms() {
  if (!acrInitDone) {
    buildAZFilter('acr-az-row', letter => {
      acrFilter.letter = letter;
      refreshAcronymList();
    });
    const acrInput = document.getElementById('acr-search');
    if (acrInput) {
      acrInput.value = '';
      acrInput.oninput = function() {
        acrFilter.query = this.value.trim().toLowerCase();
        if (acrFilter.query) {
          acrFilter.letter = null;
          document.querySelectorAll('#acr-az-row .az-btn').forEach(b => b.classList.remove('active'));
          document.querySelector('#acr-az-row .az-btn')?.classList.add('active');
        }
        refreshAcronymList();
      };
    }
    // disable letters that have no entries
    const letters = new Set(ACRONYMS.filter(a => _acrAbbr(a)).map(a => _acrAbbr(a)[0].toUpperCase()));
    document.querySelectorAll('#acr-az-row .az-btn[data-letter]').forEach(btn => {
      if (!letters.has(btn.dataset.letter)) btn.disabled = true;
    });
    acrInitDone = true;
  }
  refreshAcronymList();
}

// Normalize acronym entry — supports both { abbr, full } and { term, definition } formats
function _acrAbbr(a) { return a.abbr || a.term || ''; }
function _acrFull(a) { return a.full || a.definition || ''; }

function refreshAcronymList() {
  const container = document.getElementById('acronyms-list');
  const countBar = document.getElementById('acr-count-bar');
  if (!container) return;

  let items = ACRONYMS.filter(a => _acrAbbr(a));
  if (acrFilter.letter) {
    items = items.filter(a => _acrAbbr(a)[0].toUpperCase() === acrFilter.letter);
  }
  if (acrFilter.query) {
    const q = acrFilter.query;
    items = items.filter(a => _acrAbbr(a).toLowerCase().includes(q) || _acrFull(a).toLowerCase().includes(q));
  }

  if (countBar) countBar.textContent = `Showing ${items.length} of ${ACRONYMS.length} acronyms`;

  container.innerHTML = '';
  if (items.length === 0) {
    container.innerHTML = '<div class="ref-empty">No acronyms match your search.</div>';
    return;
  }

  // Group by first letter
  const grouped = {};
  items.forEach(a => {
    const key = _acrAbbr(a)[0].toUpperCase();
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(a);
  });

  const showHeadings = !acrFilter.query && items.length > 6;
  Object.keys(grouped).sort().forEach(letter => {
    if (showHeadings) {
      const h = document.createElement('div');
      h.className = 'ref-letter-heading';
      h.textContent = letter;
      container.appendChild(h);
    }
    grouped[letter].forEach(a => {
      const card = document.createElement('div');
      card.className = 'ref-card';
      card.innerHTML = `<div class="ref-abbr">${_acrAbbr(a)}</div><div class="ref-full">${_acrFull(a)}</div>`;
      container.appendChild(card);
    });
  });
}

// ── Glossary ───────────────────────────────────────────────────────────────────
let glsFilter = { query: '', letter: null };
let glsInitDone = false;

function renderGlossary() {
  if (!glsInitDone) {
    buildAZFilter('gls-az-row', letter => {
      glsFilter.letter = letter;
      refreshGlossaryList();
    });
    const glsInput = document.getElementById('gls-search');
    if (glsInput) {
      glsInput.value = '';
      glsInput.oninput = function() {
        glsFilter.query = this.value.trim().toLowerCase();
        if (glsFilter.query) {
          glsFilter.letter = null;
          document.querySelectorAll('#gls-az-row .az-btn').forEach(b => b.classList.remove('active'));
          document.querySelector('#gls-az-row .az-btn')?.classList.add('active');
        }
        refreshGlossaryList();
      };
    }
    // disable letters with no entries
    const letters = new Set(GLOSSARY.map(g => g.term[0].toUpperCase()));
    document.querySelectorAll('#gls-az-row .az-btn[data-letter]').forEach(btn => {
      if (!letters.has(btn.dataset.letter)) btn.disabled = true;
    });
    glsInitDone = true;
  }
  refreshGlossaryList();
}

// Normalize glossary entry — supports both { term, def } and { term, definition } formats
function _glsDef(g) { return g.def || g.definition || ''; }

function refreshGlossaryList() {
  const container = document.getElementById('glossary-list');
  const countBar = document.getElementById('gls-count-bar');
  if (!container) return;

  let items = GLOSSARY.filter(g => g.term);
  if (glsFilter.letter) {
    items = items.filter(g => g.term[0].toUpperCase() === glsFilter.letter);
  }
  if (glsFilter.query) {
    const q = glsFilter.query;
    items = items.filter(g => g.term.toLowerCase().includes(q) || _glsDef(g).toLowerCase().includes(q));
  }

  if (countBar) countBar.textContent = `Showing ${items.length} of ${GLOSSARY.length} terms`;

  container.innerHTML = '';
  if (items.length === 0) {
    container.innerHTML = '<div class="ref-empty">No terms match your search.</div>';
    return;
  }

  // Group by first letter
  const grouped = {};
  items.forEach(g => {
    const key = g.term[0].toUpperCase();
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(g);
  });

  const showHeadings = !glsFilter.query && items.length > 6;
  Object.keys(grouped).sort().forEach(letter => {
    if (showHeadings) {
      const h = document.createElement('div');
      h.className = 'ref-letter-heading';
      h.textContent = letter;
      container.appendChild(h);
    }
    grouped[letter].forEach(g => {
      const card = document.createElement('div');
      card.className = 'ref-card';
      card.innerHTML = `<div class="ref-term">${g.term}</div><div class="ref-def">${_glsDef(g)}</div>`;
      container.appendChild(card);
    });
  });
}

// ── App Init (called after successful unlock) ──────────────────────────────────
function initApp() {
  // Nav (sidebar + any data-screen tool cards)
  function navTo(screen) {
    if (STATE.currentSession && STATE.currentSession.answers.every(a => a !== null)) {
      STATE.currentSession = null;
      saveState();
    }
    showScreen(screen);
    if (screen === 'home')      renderHome();
    if (screen === 'dashboard') renderDashboard();
    if (screen === 'bookmarks') { renderBookmarks(); updateSidebarBadges(); }
    if (screen === 'history')   renderHistory();
    if (screen === 'acronyms')  renderAcronyms();
    if (screen === 'glossary')  renderGlossary();
    if (screen === 'custom')    renderCustomTest();
  }

  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.onclick = () => navTo(btn.dataset.screen);
  });

  // Tool cards on home screen
  document.querySelectorAll('.tool-card[data-screen]').forEach(card => {
    card.onclick = () => navTo(card.dataset.screen);
  });

  // Quick 10
  const q10 = document.getElementById('quick-10-card');
  if (q10) q10.onclick = () => {
    const nDomAll = CERT_DATA[STATE.activeCert]?.domains || 6;
    const selected = shuffle(QUESTIONS).slice(0, 10);
    STATE.currentSession = {
      config:{domains:Array.from({length:nDomAll},(_,i)=>i+1),levels:[1,2,3],count:10,mode:'untimed',timerMode:null,timerValue:0},
      questions:selected, answers:new Array(10).fill(null),
      bookmarked:[...STATE.bookmarks], current:0, startTime:Date.now(),
      timerRemaining:0, perQTimerRemaining:null
    };
    saveState(); showScreen('quiz'); renderQuestion(); startTimer();
  };

  // Weakest Domain drill
  const wdd = document.getElementById('domain-drill-card');
  if (wdd) wdd.onclick = () => {
    const qs = STATE.questionStats;
    const nDom = CERT_DATA[STATE.activeCert]?.domains || 6;
    let weakest = 1, weakPct = 101;
    for (let d = 1; d <= nDom; d++) {
      const dqs = QUESTIONS.filter(q => q && q.domain === d);
      const dA = dqs.reduce((a,q)=>a+(qs[q.id]?.attempts||0),0);
      const dC = dqs.reduce((a,q)=>a+(qs[q.id]?.correct||0),0);
      const dp = dA > 0 ? pct(dC,dA) : 50;
      if (dp < weakPct) { weakPct = dp; weakest = d; }
    }
    const pool = QUESTIONS.filter(q => q && q.domain === weakest);
    const selected = shuffle(pool).slice(0, 20);
    STATE.currentSession = {
      config:{domains:[weakest],levels:[1,2,3],count:selected.length,mode:'untimed',timerMode:null,timerValue:0},
      questions:selected, answers:new Array(selected.length).fill(null),
      bookmarked:[...STATE.bookmarks], current:0, startTime:Date.now(),
      timerRemaining:0, perQTimerRemaining:null
    };
    saveState(); showScreen('quiz'); renderQuestion(); startTimer();
  };

  // QOTD button
  const qotdBtn = document.getElementById('qotd-answer-btn');
  if (qotdBtn) qotdBtn.onclick = () => {
    const today = new Date();
    const validQs = QUESTIONS.filter(q => q && q.question);
    if (validQs.length === 0) { alert('No questions available yet.'); return; }
    const dayIndex = Math.floor(today.getTime() / 86400000) % validQs.length;
    const q = validQs[dayIndex];
    STATE.currentSession = {
      config:{domains:[q.domain],levels:[q.level],count:1,mode:'untimed',timerMode:null,timerValue:0},
      questions:[q], answers:[null],
      bookmarked:[...STATE.bookmarks], current:0, startTime:Date.now(),
      timerRemaining:0, perQTimerRemaining:null
    };
    saveState(); showScreen('quiz'); renderQuestion(); startTimer();
  };

  // Setup screen — render domain checkboxes for current cert
  renderSetupDomains();

  // Setup screen controls
  document.querySelectorAll('input[name="quiz-mode"]').forEach(r =>
    r.addEventListener('change', () => setupQuizMode(r.value === 'timed'))
  );
  // Select/deselect all use onclick to avoid duplicate listeners on cert switch
  const selAllBtn = document.getElementById('select-all-domains');
  const deselAllBtn = document.getElementById('deselect-all-domains');
  if (selAllBtn)   selAllBtn.onclick   = () => document.querySelectorAll('.domain-cb').forEach(c => c.checked = true);
  if (deselAllBtn) deselAllBtn.onclick = () => document.querySelectorAll('.domain-cb').forEach(c => c.checked = false);
  document.getElementById('start-quiz-btn').onclick = startQuiz;

  // Quiz controls — use onclick to prevent duplicate listeners on cert switch
  document.getElementById('bookmark-btn').onclick = () => {
    const q = STATE.currentSession.questions[STATE.currentSession.current];
    toggleBookmark(q.id);
  };
  document.getElementById('next-btn').onclick = nextQuestion;
  document.getElementById('exit-quiz-btn').onclick = () => {
    if (confirm('Exit quiz? Your current progress will be lost.')) {
      clearInterval(timerInterval);
      STATE.currentSession = null;
      saveState();
      showScreen('dashboard');
      renderDashboard();
    }
  };

  // Dashboard "Start a New Quiz" button (was inline onclick — moved here for CSP compliance)
  const dashNewQuiz = document.getElementById('dash-new-quiz-btn');
  if (dashNewQuiz) dashNewQuiz.onclick = () => {
    document.querySelector('[data-screen="setup"]').click();
  };

  // Results controls
  document.getElementById('show-wrong-btn').onclick = function() {
    const isFiltered = this.dataset.filtered === '1';
    renderReview(!isFiltered);
    this.dataset.filtered = isFiltered ? '0' : '1';
    this.textContent = isFiltered ? 'Show Wrong Only' : 'Show All';
  };
  document.getElementById('new-quiz-btn').onclick = () => {
    STATE.currentSession = null; saveState();
    document.querySelector('[data-screen="setup"]').classList.add('active');
    showScreen('setup');
  };
  document.getElementById('dashboard-btn').onclick = () => {
    STATE.currentSession = null; saveState(); renderDashboard(); showScreen('dashboard');
  };

  // Reset current cert progress (from dashboard Danger Zone)
  const resetCertBtnEl = document.getElementById('reset-cert-btn');
  if (resetCertBtnEl) resetCertBtnEl.onclick = () => {
    const code = STATE.activeCert;
    const cert = CERT_DATA[code];
    if (!cert) return;
    const qs = STATE.certData?.[code] || {};
    const sessions = (qs.sessions || []).length;
    const attempts = Object.values(qs.questionStats || {}).reduce((a, s) => a + (s.attempts || 0), 0);
    if (!sessions && !attempts) { alert('Nothing to reset — no progress recorded yet.'); return; }
    const msg = `Reset all ${cert.name} progress?\n\n• ${sessions} session(s) deleted\n• ${attempts} question attempt(s) cleared\n• Bookmarks cleared\n\nYour all-time counter (${(qs.lifetimeAnswered||0).toLocaleString()} answered) will be preserved.\n\nThis cannot be undone.`;
    if (confirm(msg)) {
      resetCertProgress(code);
      renderDashboard();
      alert(`${cert.name} progress has been reset.`);
    }
  };

  // Bookmarks controls
  document.getElementById('bk-domain-filter').onchange = renderBookmarks;
  document.getElementById('bk-level-filter').onchange  = renderBookmarks;
  document.getElementById('practice-bookmarks-btn').onclick = practiceBookmarks;

  // History controls
  document.getElementById('clear-history-btn').onclick = clearHistory;

  // Switch Cert button — saves current cert data and returns to cert select
  const switchCertBtn = document.getElementById('switch-cert-btn');
  if (switchCertBtn) switchCertBtn.onclick = () => {
    saveState();
    STATE.activeCert = null; // clear so cert select doesn't auto-skip
    document.getElementById('cert-select-screen').style.display = 'flex';
    renderCertSelect();
    showScreen('home'); // ensure main app is at home when user returns
  };

  // Lock Device button — clears stored passphrase and reloads
  const lockDeviceBtn = document.getElementById('lock-device-btn');
  if (lockDeviceBtn) lockDeviceBtn.onclick = () => {
    if (confirm('Lock this device? You\'ll need to enter the secret key next time.')) {
      sessionStorage.removeItem(CCSP_PASS_LKEY);
      location.reload();
    }
  };

  // Restore active quiz if page was refreshed mid-quiz
  if (STATE.currentSession && STATE.currentSession.answers.some(a => a === null)) {
    showScreen('quiz');
    renderQuestion();
    startTimer();
  } else {
    renderHome();
    showScreen('home');
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    const homeBtn = document.querySelector('.nav-btn[data-screen="home"]');
    if (homeBtn) homeBtn.classList.add('active');
  }
}

// ── Custom Test Builder ────────────────────────────────────────────────────────
// Note: DOMAIN_NAMES is already declared as an object {1:..., 6:...} in questions.js

let ctInitDone = false;
const ctConfig = {
  domains:    [1,2,3,4,5,6],
  numQ:       10,
  untimed:    true,
  timeMin:    10,
  showAnswer: true,
  priority:   'default'
};

function renderCustomTest() {
  if (ctInitDone) { updateCustomSummary(); return; }
  ctInitDone = true;

  // ── Populate domain rows ───────────────────────────────────────────────
  const domainList = document.getElementById('ct-domain-list');
  domainList.innerHTML = '';
  const qs = STATE.questionStats;
  const certDomainCount = CERT_DATA[STATE.activeCert]?.domains || 6;

  Array.from({length: certDomainCount}, (_, i) => i + 1).forEach(d => {
    const name = DOMAIN_NAMES[d];
    const dqs = QUESTIONS.filter(q => q && q.domain === d);
    const attempts = dqs.reduce((a, q) => a + (qs[q.id]?.attempts || 0), 0);
    const correct  = dqs.reduce((a, q) => a + (qs[q.id]?.correct  || 0), 0);
    const score    = attempts > 0 ? pct(correct, attempts) : null;

    const row = document.createElement('div');
    row.className = 'cb-domain-row checked';
    row.dataset.domain = d;
    row.innerHTML = `
      <div class="cb-domain-check"></div>
      <div class="cb-domain-name">Domain ${d}: ${name}</div>
      <div class="cb-domain-pct ${score === null ? '' : score >= 70 ? 'green' : score >= 50 ? 'orange' : 'red'}">
        ${score === null ? '—' : score + '%'}
      </div>`;
    row.addEventListener('click', () => {
      const checked = row.classList.toggle('checked');
      if (checked) {
        if (!ctConfig.domains.includes(d)) ctConfig.domains.push(d);
      } else {
        ctConfig.domains = ctConfig.domains.filter(x => x !== d);
      }
      const total = document.querySelectorAll('#ct-domain-list .cb-domain-row.checked').length;
      document.getElementById('ct-domains-tag').textContent = `${total} / ${certDomainCount}`;
      updateCustomSummary();
    });
    domainList.appendChild(row);
  });

  // ── Deselect All ──────────────────────────────────────────────────────
  document.getElementById('ct-deselect-all').addEventListener('click', () => {
    document.querySelectorAll('#ct-domain-list .cb-domain-row').forEach(r => r.classList.remove('checked'));
    ctConfig.domains = [];
    document.getElementById('ct-domains-tag').textContent = `0 / ${certDomainCount}`;
    updateCustomSummary();
  });

  // ── Number of Questions buttons ───────────────────────────────────────
  document.querySelectorAll('.cb-num-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.cb-num-btn').forEach(b => b.classList.remove('cb-num-active'));
      btn.classList.add('cb-num-active');
      ctConfig.numQ = parseInt(btn.dataset.n, 10);
      updateCustomSummary();
    });
  });

  // ── Untimed toggle ─────────────────────────────────────────────────────
  const untimedToggle  = document.getElementById('ct-untimed');
  const timeSec        = document.getElementById('ct-time-section');
  untimedToggle.addEventListener('change', () => {
    ctConfig.untimed = untimedToggle.checked;
    timeSec.classList.toggle('cb-time-disabled', ctConfig.untimed);
    updateCustomSummary();
  });

  // ── Time buttons ───────────────────────────────────────────────────────
  document.querySelectorAll('.cb-time-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.cb-time-btn').forEach(b => b.classList.remove('cb-time-active'));
      btn.classList.add('cb-time-active');
      ctConfig.timeMin = parseInt(btn.dataset.t, 10);
      updateCustomSummary();
    });
  });
  // default-select first time btn
  const firstTimeBtn = document.querySelector('.cb-time-btn');
  if (firstTimeBtn) { firstTimeBtn.classList.add('cb-time-active'); ctConfig.timeMin = parseInt(firstTimeBtn.dataset.t, 10); }

  // ── Show Answer toggle ─────────────────────────────────────────────────
  const showAnsToggle = document.getElementById('ct-show-answer');
  showAnsToggle.addEventListener('change', () => {
    ctConfig.showAnswer = showAnsToggle.checked;
    updateCustomSummary();
  });

  // ── Priority radios ────────────────────────────────────────────────────
  document.querySelectorAll('.cb-priority-item').forEach(item => {
    item.addEventListener('click', () => {
      document.querySelectorAll('.cb-priority-item').forEach(i => i.classList.remove('cb-priority-active'));
      item.classList.add('cb-priority-active');
      item.querySelector('input').checked = true;
      ctConfig.priority = item.dataset.val;
      updateCustomSummary();
    });
  });

  // ── Build button ───────────────────────────────────────────────────────
  document.getElementById('ct-build-btn').addEventListener('click', buildCustomTest);

  updateCustomSummary();
}

function updateCustomSummary() {
  const domCount = ctConfig.domains.length;
  const totalDom = CERT_DATA[STATE.activeCert]?.domains || 6;
  document.getElementById('ct-sum-domains').textContent = `${domCount} / ${totalDom}`;
  document.getElementById('ct-sum-mode').textContent    =
    ctConfig.untimed ? `${ctConfig.numQ} Questions` : `${ctConfig.numQ} Q · ${ctConfig.timeMin} min`;
  document.getElementById('ct-sum-answers').textContent = ctConfig.showAnswer ? 'Yes' : 'No';
  const prioLabels = { wrong:'Incorrect', unseen:'Unseen', bookmarked:'Bookmarked', default:'Smart' };
  document.getElementById('ct-sum-priority').textContent = prioLabels[ctConfig.priority] || 'Smart';

  const buildBtn = document.getElementById('ct-build-btn');
  if (buildBtn) buildBtn.disabled = domCount === 0;
}

function buildCustomTest() {
  if (ctConfig.domains.length === 0) return;

  const qs = STATE.questionStats;
  let pool = QUESTIONS.filter(q => q && ctConfig.domains.includes(q.domain));

  // Apply priority filter
  if (ctConfig.priority === 'wrong') {
    const wrong = pool.filter(q => {
      const s = qs[q.id];
      return s && s.attempts > 0 && (s.correct / s.attempts) < 0.5;
    });
    if (wrong.length > 0) pool = wrong;
  } else if (ctConfig.priority === 'unseen') {
    const unseen = pool.filter(q => !qs[q.id] || !qs[q.id].seen);
    if (unseen.length > 0) pool = unseen;
  } else if (ctConfig.priority === 'bookmarked') {
    const bkSet = new Set(STATE.bookmarks);
    const bkd   = pool.filter(q => bkSet.has(q.id));
    if (bkd.length > 0) pool = bkd;
  }

  const count    = Math.min(ctConfig.numQ, pool.length);
  const selected = shuffle(pool).slice(0, count);

  if (selected.length === 0) {
    alert('No questions found for the selected filters. Try adjusting your options.');
    return;
  }

  const mode       = ctConfig.untimed ? 'untimed' : 'timed';
  const timerValue = ctConfig.untimed ? 0 : ctConfig.timeMin * 60;

  STATE.currentSession = {
    config: {
      domains:    ctConfig.domains,
      levels:     [1,2,3],
      count:      selected.length,
      mode,
      timerMode:  ctConfig.untimed ? null : 'full',
      timerValue,
      showAnswer: ctConfig.showAnswer
    },
    questions:         selected,
    answers:           new Array(selected.length).fill(null),
    bookmarked:        [...STATE.bookmarks],
    current:           0,
    startTime:         Date.now(),
    timerRemaining:    timerValue,
    perQTimerRemaining: null
  };

  saveState();
  showScreen('quiz');
  renderQuestion();
  startTimer();
}

// ── Cert Selection Screen ──────────────────────────────────────────────────────
function showCertSelect() {
  // If returning user already had a cert selected, go straight in
  if (STATE.activeCert && CERT_DATA[STATE.activeCert]) {
    activateCert(STATE.activeCert);
    initApp();
    return;
  }
  renderCertSelect();
  document.getElementById('cert-select-screen').style.display = 'flex';
}

function resetCertProgress(code) {
  if (!STATE.certData) STATE.certData = {};
  const prev = STATE.certData[code] || {};
  // Preserve lifetime counter, wipe everything else
  STATE.certData[code] = {
    questionStats: {},
    bookmarks: [],
    sessions: [],
    lifetimeAnswered: prev.lifetimeAnswered || 0
  };
  // If currently active cert, update live state too
  if (STATE.activeCert === code) {
    STATE.questionStats  = {};
    STATE.bookmarks      = [];
    STATE.sessions       = [];
    STATE.currentSession = null;
  }
  saveState();
}

function renderCertSelect() {
  const grid = document.getElementById('cert-select-grid');
  if (!grid) return;
  grid.innerHTML = '';

  Object.entries(CERT_DATA).forEach(([code, cert]) => {
    const questions = cert.getQ();
    const qs = STATE.certData?.[code] || {};
    const stats = qs.questionStats || {};

    // Calculate overall score
    const allAttempts    = Object.values(stats).reduce((a, s) => a + (s.attempts || 0), 0);
    const allCorrect     = Object.values(stats).reduce((a, s) => a + (s.correct  || 0), 0);
    const scoreText      = allAttempts > 0 ? Math.round(allCorrect / allAttempts * 100) + '%' : '—';
    const sessions       = (qs.sessions || []).length;
    const lifetimeAns    = qs.lifetimeAnswered || 0;
    const scoreColor     = allAttempts > 0
      ? (allCorrect / allAttempts >= 0.7 ? '#27ae60' : allCorrect / allAttempts >= 0.5 ? '#f39c12' : '#e74c3c')
      : 'inherit';

    const card = document.createElement('div');
    card.className = 'cert-card';
    card.dataset.cert = code;
    card.innerHTML = `
      <button class="cert-reset-btn" data-cert="${code}" title="Reset progress for ${cert.name}">↺ Reset</button>
      <div class="cert-card-icon" style="color:${cert.color}">${cert.icon}</div>
      <div class="cert-card-name" style="color:${cert.color}">${cert.name}</div>
      <div class="cert-card-fullname">${cert.fullName}</div>
      <div class="cert-card-org">${cert.org}</div>
      <div class="cert-card-stats">
        <div class="cert-stat"><div class="cert-stat-val">${questions.length}</div><div class="cert-stat-lbl">Questions</div></div>
        <div class="cert-stat"><div class="cert-stat-val">${sessions}</div><div class="cert-stat-lbl">Sessions</div></div>
        <div class="cert-stat"><div class="cert-stat-val" style="color:${scoreColor}">${scoreText}</div><div class="cert-stat-lbl">Score</div></div>
        <div class="cert-stat cert-stat-lifetime"><div class="cert-stat-val" style="color:${cert.color}">${lifetimeAns.toLocaleString()}</div><div class="cert-stat-lbl">All-Time ✦</div></div>
      </div>
      <button class="cert-select-btn" style="background:${cert.color}" data-cert="${code}">
        ${sessions > 0 ? 'Continue ▶' : 'Start →'}
      </button>`;
    grid.appendChild(card);
  });

  // Wire up Select buttons
  grid.querySelectorAll('.cert-select-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.getElementById('cert-select-screen').style.display = 'none';
      activateCert(btn.dataset.cert);
      initApp();
    });
  });

  // Wire up Reset buttons
  grid.querySelectorAll('.cert-reset-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const code = btn.dataset.cert;
      const cert = CERT_DATA[code];
      const qs = STATE.certData?.[code] || {};
      const sessions = (qs.sessions || []).length;
      const attempts = Object.values(qs.questionStats || {}).reduce((a, s) => a + (s.attempts || 0), 0);
      if (!sessions && !attempts) { return; } // nothing to reset
      const msg = `Reset all ${cert.name} progress?\n\n• ${sessions} session(s) deleted\n• ${attempts} question attempt(s) cleared\n• Bookmarks cleared\n\nYour all-time counter (${(qs.lifetimeAnswered||0).toLocaleString()} answered) will be preserved.\n\nThis cannot be undone.`;
      if (confirm(msg)) {
        resetCertProgress(code);
        renderCertSelect(); // re-render to show cleared stats
      }
    });
  });
}

// ── Lock Screen & Bootstrap ────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', async () => {
  const lockScreen = document.getElementById('lock-screen');
  const lockInput  = document.getElementById('lock-key-input');
  const lockBtn    = document.getElementById('lock-submit-btn');
  const lockErr    = document.getElementById('lock-error');
  const lockToggle = document.getElementById('lock-toggle-vis');

  function setLockBtnLoading(on) {
    lockBtn.disabled = on;
    if (on) {
      lockBtn.innerHTML =
        '<span style="display:inline-block;width:14px;height:14px;border:2px solid #fff;' +
        'border-top-color:transparent;border-radius:50%;animation:spin 0.7s linear infinite;' +
        'vertical-align:middle;margin-right:8px"></span>Unlocking…';
    } else {
      lockBtn.textContent = 'Unlock →';
    }
  }

  // Brute-force lockout: max 5 attempts, then 30-second cooldown
  let failedAttempts = 0;
  let lockoutUntil   = 0;

  async function attemptUnlock(passphrase) {
    if (!passphrase) { lockInput.focus(); return; }

    // Enforce lockout cooldown
    const now = Date.now();
    if (now < lockoutUntil) {
      const secs = Math.ceil((lockoutUntil - now) / 1000);
      lockErr.textContent = `Too many failed attempts. Try again in ${secs}s.`;
      lockErr.style.display = 'block';
      return;
    }

    setLockBtnLoading(true);
    lockErr.style.display = 'none';

    let valid = false;
    try { valid = await validateKey(passphrase); } catch (e) { /* suppress stack trace */ }

    setLockBtnLoading(false);

    if (valid) {
      failedAttempts = 0;
      sessionStorage.setItem(CCSP_PASS_LKEY, passphrase); // sessionStorage: cleared on tab close
      await loadState();
      lockScreen.style.animation = 'lockFadeOut 0.4s ease forwards';
      setTimeout(() => { lockScreen.style.display = 'none'; showCertSelect(); }, 380);
    } else {
      failedAttempts++;
      if (failedAttempts >= 5) {
        lockoutUntil = Date.now() + 30000; // 30-second lockout
        failedAttempts = 0;
        lockErr.textContent = 'Too many failed attempts. Locked for 30 seconds.';
      } else {
        lockErr.textContent = `Incorrect key. ${5 - failedAttempts} attempt(s) remaining.`;
      }
      lockErr.style.display = 'block';
      lockErr.style.animation = 'none';
      void lockErr.offsetWidth;
      lockErr.style.animation = 'shake 0.35s ease';
      lockInput.value = '';
      lockInput.focus();
    }
  }

  lockBtn.addEventListener('click', () => attemptUnlock(lockInput.value.trim()));
  lockInput.addEventListener('keydown', e => { if (e.key === 'Enter') lockBtn.click(); });
  lockToggle.addEventListener('click', () => {
    lockInput.type = lockInput.type === 'password' ? 'text' : 'password';
    lockToggle.textContent = lockInput.type === 'password' ? '👁' : '🙈';
  });

  // Reset button — clears all stored keys so user can set a new one
  const lockResetBtn = document.getElementById('lock-reset-btn');
  if (lockResetBtn) {
    lockResetBtn.addEventListener('click', () => {
      if (confirm('Reset this device?\n\nThis will erase your stored key and ALL saved progress on this device.')) {
        [CCSP_SALT_KEY, CCSP_VALID_KEY, CCSP_DATA_KEY, 'ccsp_state'].forEach(k => localStorage.removeItem(k));
        sessionStorage.removeItem(CCSP_PASS_LKEY);
        location.reload();
      }
    });
  }

  // Auto-unlock if this session has already unlocked (sessionStorage — cleared on tab close)
  const savedPass = sessionStorage.getItem(CCSP_PASS_LKEY);
  if (savedPass) {
    setLockBtnLoading(true);
    let valid = false;
    try { valid = await validateKey(savedPass); } catch (e) {}
    if (valid) {
      await loadState();
      lockScreen.style.display = 'none';
      showCertSelect();
      return;
    }
    localStorage.removeItem(CCSP_PASS_LKEY);
    setLockBtnLoading(false);
  }

  lockInput.focus();
});
