// thankyou.js — Display submitted form data via URLSearchParams

import { initNav } from './nav.js';

initNav();

function displaySubmission() {
  const params  = new URLSearchParams(window.location.search);
  const box     = document.getElementById('submission-details');
  const msgEl   = document.getElementById('no-data-msg');

  if (!box) return;

  const fields = [
    { label: 'Name',          key: 'name'    },
    { label: 'Email',         key: 'email'   },
    { label: 'Project Type',  key: 'project' },
    { label: 'Budget',        key: 'budget'  },
    { label: 'Message',       key: 'message' },
  ];

  // Filter to only fields that have values
  const filled = fields.filter(f => params.get(f.key)?.trim());

  if (filled.length === 0) {
    if (msgEl) msgEl.classList.add('is-visible');
    box.classList.add('is-hidden');
    return;
  }

  // Build detail rows using template literals + array map
  box.innerHTML = `
    <h2>Your Submission</h2>
    ${filled.map(f => `
      <div class="detail-row">
        <span class="detail-label">${f.label}</span>
        <span class="detail-value">${escapeHTML(params.get(f.key))}</span>
      </div>
    `).join('')}
  `;
}

function escapeHTML(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

displaySubmission();
