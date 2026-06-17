// join.js — ChamberMond Join Page

// ─── Timestamp ────────────────────────────────────────────────────────────────
const timestampField = document.getElementById('timestamp');
if (timestampField) {
    timestampField.value = new Date().toLocaleString('en-NG', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    });
}

// ─── Footer year & last modified ─────────────────────────────────────────────
const yearEl = document.getElementById('currentYear');
if (yearEl) yearEl.textContent = new Date().getFullYear();

const modEl = document.getElementById('lastModified');
if (modEl) modEl.textContent = document.lastModified;

// ─── Modal logic ──────────────────────────────────────────────────────────────
const openButtons = document.querySelectorAll('[data-modal]');
const overlays    = document.querySelectorAll('.modal-overlay');
const closeButtons = document.querySelectorAll('.modal-close');

function openModal(id) {
    const overlay = document.getElementById(id);
    if (!overlay) return;
    overlay.classList.add('open');
    // Focus the close button for keyboard accessibility
    const closeBtn = overlay.querySelector('.modal-close');
    if (closeBtn) closeBtn.focus();
    document.body.style.overflow = 'hidden';
}

function closeAllModals() {
    overlays.forEach(o => o.classList.remove('open'));
    document.body.style.overflow = '';
}

openButtons.forEach(btn => {
    btn.addEventListener('click', () => openModal(btn.dataset.modal));
});

closeButtons.forEach(btn => {
    btn.addEventListener('click', closeAllModals);
});

// Close on overlay backdrop click
overlays.forEach(overlay => {
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeAllModals();
    });
});

// Close on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAllModals();
});

// ─── Membership card entrance animation ───────────────────────────────────────
// Use IntersectionObserver so cards animate when they scroll into view
const cards = document.querySelectorAll('.membership-card');

if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    cards.forEach(card => observer.observe(card));
} else {
    // Fallback: animate all immediately
    cards.forEach(card => card.classList.add('animate'));
}
