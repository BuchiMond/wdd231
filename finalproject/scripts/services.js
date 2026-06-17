// services.js — Fetch, render, and filter service cards

import { openModal } from './modal.js';
import { getActiveFilter, saveActiveFilter } from './storage.js';

const CATEGORIES = ['All', 'Branding', 'Print', 'Digital'];

export async function initServices() {
  const grid        = document.getElementById('services-grid');
  const controlsEl  = document.getElementById('filter-controls');

  if (!grid || !controlsEl) return;

  grid.innerHTML = `<p class="loading-msg" aria-live="polite">Loading services…</p>`;

  let services = [];

  try {
    const response = await fetch('data/services.json');
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
    services = await response.json();
  } catch (err) {
    grid.innerHTML = `<p class="error-msg">Unable to load services. Please refresh the page.</p>`;
    console.error('Failed to fetch services:', err);
    return;
  }

  // Build filter buttons
  const savedFilter = getActiveFilter();

  controlsEl.innerHTML = CATEGORIES.map(cat => `
    <button
      class="filter-btn${cat === savedFilter ? ' active' : ''}"
      data-filter="${cat}"
      aria-pressed="${cat === savedFilter}"
    >${cat}</button>
  `).join('');

  // Render initial set
  renderCards(services, savedFilter, grid);

  // Filter button events
  controlsEl.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      controlsEl.querySelectorAll('.filter-btn').forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });

      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');

      saveActiveFilter(filter);
      renderCards(services, filter, grid);
    });
  });
}

function renderCards(services, filter, grid) {
  // Array method: filter based on category
  const filtered = filter === 'All'
    ? services
    : services.filter(s => s.category === filter);

  if (filtered.length === 0) {
    grid.innerHTML = `<p class="loading-msg">No services found in this category.</p>`;
    return;
  }

  // Array method: map to card HTML using template literals
  grid.innerHTML = filtered.map(service => `
    <article
      class="service-card"
      tabindex="0"
      role="button"
      aria-label="View details for ${service.title}"
      data-id="${service.id}"
    >
      <div class="card-icon">${service.icon}</div>
      <div class="card-category">${service.category}</div>
      <h3 class="card-title">${service.title}</h3>
      <div class="card-meta">
        <span>💰 ${service.price}</span>
        <span>⏱ ${service.turnaround}</span>
      </div>
      <p class="card-desc">${service.description}</p>
      <div class="card-cta">View Details →</div>
    </article>
  `).join('');

  // Attach click + keyboard events to each card
  grid.querySelectorAll('.service-card').forEach((card, i) => {
    const id = parseInt(card.dataset.id, 10);
    const service = services.find(s => s.id === id);

    const openFn = () => { if (service) openModal(service); };

    card.addEventListener('click', openFn);
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openFn();
      }
    });
  });
}
