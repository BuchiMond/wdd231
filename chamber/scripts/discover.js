// discover.js — ChamberMond Discover Page Script
import { discoverItems } from '../data/discover.mjs';

// ─── Build discover cards ─────────────────────────────────────────────────────
const grid = document.getElementById('discover-grid');

discoverItems.forEach(item => {
    const card = document.createElement('article');
    card.className = 'discover-card';
    card.style.gridArea = `item${item.id}`;

    card.innerHTML = `
        <figure>
            <img src="${item.photo}" alt="${item.name}" width="300" height="200" loading="lazy">
        </figure>
        <div class="card-body">
            <h2>${item.name}</h2>
            <address>${item.address}</address>
            <p class="card-desc">${item.description}</p>
            <p class="discover-price">💰 ${item.cost}</p>
            <button class="learn-more-btn" aria-label="Learn more about ${item.name}">Learn More</button>
        </div>
    `;

    grid.appendChild(card);
});

// ─── Visit message via localStorage ──────────────────────────────────────────
const visitBanner = document.getElementById('visit-banner');
const lastVisit = localStorage.getItem('discoverLastVisit');
const now = Date.now();
let message = '';

if (!lastVisit) {
    message = 'Welcome! Let us know if you have any questions.';
} else {
    const msPerDay = 1000 * 60 * 60 * 24;
    const daysSince = Math.floor((now - Number(lastVisit)) / msPerDay);

    if (daysSince < 1) {
        message = 'Back so soon! Awesome!';
    } else if (daysSince === 1) {
        message = 'You last visited 1 day ago.';
    } else {
        message = `You last visited ${daysSince} days ago.`;
    }
}

visitBanner.textContent = message;
localStorage.setItem('discoverLastVisit', now);

// ─── Footer: year and last modified ──────────────────────────────────────────
const yearEl = document.getElementById('currentYear');
const modEl = document.getElementById('lastModified');
if (yearEl) yearEl.textContent = new Date().getFullYear();
if (modEl) modEl.textContent = document.lastModified;