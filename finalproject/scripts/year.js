// year.js — Sets the current year in the footer copyright notice

export function setCurrentYear() {
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

setCurrentYear();
