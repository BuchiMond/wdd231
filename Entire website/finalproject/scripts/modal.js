// modal.js — Modal dialog logic

export function initModal() {
  const overlay = document.getElementById('service-modal');
  if (!overlay) return;

  const closeBtn = overlay.querySelector('.modal-close');

  // Close on backdrop click
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });

  // Close on button click
  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('open')) closeModal();
  });
}

export function openModal(service) {
  const overlay = document.getElementById('service-modal');
  if (!overlay) return;

  overlay.querySelector('#modal-icon').textContent       = service.icon;
  overlay.querySelector('#modal-title').textContent      = service.title;
  overlay.querySelector('#modal-category').textContent   = service.category;
  overlay.querySelector('#modal-price').textContent      = service.price;
  overlay.querySelector('#modal-turnaround').textContent = service.turnaround;
  overlay.querySelector('#modal-desc').textContent       = service.description;

  overlay.classList.add('open');
  overlay.setAttribute('aria-hidden', 'false');

  // Focus the close button for accessibility
  const closeBtn = overlay.querySelector('.modal-close');
  if (closeBtn) closeBtn.focus();
}

export function closeModal() {
  const overlay = document.getElementById('service-modal');
  if (!overlay) return;
  overlay.classList.remove('open');
  overlay.setAttribute('aria-hidden', 'true');
}
