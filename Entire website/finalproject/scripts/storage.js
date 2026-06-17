// storage.js — LocalStorage utilities

const PREFS_KEY = 'pixelcraft_prefs';

export function getPrefs() {
  try {
    const raw = localStorage.getItem(PREFS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function setPrefs(updates) {
  try {
    const current = getPrefs();
    localStorage.setItem(PREFS_KEY, JSON.stringify({ ...current, ...updates }));
  } catch {
    // storage unavailable — fail silently
  }
}

export function getActiveFilter() {
  return getPrefs().activeFilter || 'All';
}

export function saveActiveFilter(value) {
  setPrefs({ activeFilter: value });
}
