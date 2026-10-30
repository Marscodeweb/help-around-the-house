// Mobile menu
const menuBtn = document.querySelector('.menu-btn');
const nav = document.querySelector('nav.links');
if (menuBtn && nav) {
  menuBtn.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', open);
    menuBtn.textContent = open ? 'Close' : 'Menu';
  });
}

// Honey-do list (home page): count checked jobs, carry them to the contact page
const chores = [...document.querySelectorAll('#chores input')];
const count = document.getElementById('n');
const sendList = document.getElementById('sendlist');
function picked() { return chores.filter(b => b.checked).map(b => b.value); }
chores.forEach(b => b.addEventListener('change', () => {
  const p = picked();
  if (count) count.textContent = p.length;
  if (sendList) sendList.href = 'contact.html' + (p.length ? '?jobs=' + encodeURIComponent(p.join('|')) : '');
}));

// Contact page: pre-check jobs passed from the home page
const params = new URLSearchParams(location.search);
const jobs = (params.get('jobs') || '').split('|').filter(Boolean);
document.querySelectorAll('.checks input').forEach(c => { if (jobs.includes(c.value)) c.checked = true; });
const svcParam = params.get('service');
if (svcParam) document.querySelectorAll('.checks input').forEach(c => { if (c.dataset.svc === svcParam) c.checked = true; });

// Quote form (preview only)
const form = document.getElementById('quote');
if (form) form.addEventListener('submit', e => {
  e.preventDefault();
  document.getElementById('sent').hidden = false;
});

// Copy buttons
document.querySelectorAll('.copy').forEach(b => b.addEventListener('click', () => {
  const t = b.dataset.copy;
  const p = navigator.clipboard ? navigator.clipboard.writeText(t) : Promise.reject();
  p.then(() => { b.textContent = 'Copied'; }, () => { b.textContent = t; })
   .finally(() => setTimeout(() => { b.textContent = 'Copy'; }, 1800));
}));

// Footer year
const y = document.getElementById('year');
if (y) y.textContent = new Date().getFullYear();
