// thankyou.js — ChamberMond Thank You Page

// ─── Footer year & last modified ─────────────────────────────────────────────
const yearEl = document.getElementById('currentYear');
if (yearEl) yearEl.textContent = new Date().getFullYear();

const modEl = document.getElementById('lastModified');
if (modEl) modEl.textContent = document.lastModified;

// ─── Read URL query parameters ────────────────────────────────────────────────
const params = new URLSearchParams(window.location.search);

function getParam(key, fallback = '(not provided)') {
    const val = params.get(key);
    return val && val.trim() !== '' ? val.trim() : fallback;
}

// ─── Populate summary fields ──────────────────────────────────────────────────
const fields = {
    'summary-fname':     getParam('fname'),
    'summary-lname':     getParam('lname'),
    'summary-email':     getParam('email'),
    'summary-phone':     getParam('phone'),
    'summary-org':       getParam('org-name'),
    'summary-timestamp': getParam('timestamp'),
};

Object.entries(fields).forEach(([id, value]) => {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
});
