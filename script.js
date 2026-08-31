const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.site-nav');
navToggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', open);
  navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
});
document.querySelectorAll('.site-nav a').forEach(link => link.addEventListener('click', () => nav.classList.remove('open')));

const today = new Date();
today.setHours(0, 0, 0, 0);
const formatDate = date => date.toISOString().split('T')[0];
const checkin = document.querySelector('#checkin');
const checkout = document.querySelector('#checkout');
const room = document.querySelector('#room');
const form = document.querySelector('#booking-form');
const error = document.querySelector('#form-error');

checkin.min = formatDate(today);
checkout.min = formatDate(today);
checkin.addEventListener('change', () => {
  checkout.min = checkin.value || formatDate(today);
  if (checkout.value && checkout.value <= checkin.value) checkout.value = '';
});
document.querySelectorAll('[data-room]').forEach(link => link.addEventListener('click', () => { room.value = link.dataset.room; }));

form.addEventListener('submit', event => {
  event.preventDefault();
  error.textContent = '';
  if (!form.checkValidity()) { error.textContent = 'Please complete all required fields.'; form.reportValidity(); return; }
  if (checkout.value <= checkin.value) { error.textContent = 'Check-out must be after check-in.'; checkout.focus(); return; }
  const data = new FormData(form);
  const message = `Hello Tudor Water Sports Hotel, I would like to request a reservation.%0A%0AName: ${encodeURIComponent(data.get('name'))}%0AContact: ${encodeURIComponent(data.get('contact'))}%0ACheck-in: ${data.get('checkin')}%0ACheck-out: ${data.get('checkout')}%0AGuests: ${encodeURIComponent(data.get('guests'))}%0ARoom: ${encodeURIComponent(data.get('room'))}%0ANotes: ${encodeURIComponent(data.get('notes') || 'None')}`;
  window.open(`https://wa.me/254722641977?text=${message}`, '_blank', 'noopener');
  error.style.color = '#147a55';
  error.textContent = 'Your WhatsApp reservation request is ready to send.';
});
document.querySelector('#year').textContent = new Date().getFullYear();
