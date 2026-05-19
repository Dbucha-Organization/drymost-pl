const siteHeader = document.querySelector('.site-header');
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelectorAll('.site-nav a');
const particlesLayer = document.querySelector('[data-particles]');
const faqItems = document.querySelectorAll('.faq__item');
const productGrid = document.querySelector('.product-grid');
const ageGate = document.getElementById('age-gate');
const ageConfirm = document.getElementById('age-confirm');
const ageReject = document.getElementById('age-reject');
const ageBlocked = document.getElementById('age-blocked');
const ageKey = 'drymost-age-confirmed';

function setNavOpen(open) {
  if (!siteHeader || !navToggle) return;
  siteHeader.dataset.open = String(open);
  navToggle.setAttribute('aria-expanded', String(open));
  document.body.classList.toggle('nav-open', open && window.innerWidth <= 640);
}

function resetProductRail() {
  if (!productGrid || window.innerWidth > 640) return;
  window.requestAnimationFrame(() => {
    productGrid.scrollLeft = 0;
  });
}

if (navToggle) {
  navToggle.addEventListener('click', () => {
    const isOpen = siteHeader.dataset.open === 'true';
    setNavOpen(!isOpen);
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      setNavOpen(false);
    });
  });

  document.addEventListener('click', (event) => {
    if (siteHeader.dataset.open !== 'true') return;
    if (siteHeader.contains(event.target)) return;
    setNavOpen(false);
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 640) {
      document.body.classList.remove('nav-open');
    } else if (siteHeader.dataset.open === 'true') {
      document.body.classList.add('nav-open');
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && siteHeader.dataset.open === 'true') {
      setNavOpen(false);
    }
  });
}

window.addEventListener('pageshow', resetProductRail);
window.addEventListener('load', resetProductRail);
window.addEventListener('hashchange', () => {
  if (window.location.hash === '#produkty') {
    resetProductRail();
  }
});

if (particlesLayer) {
  const fragment = document.createDocumentFragment();
  for (let index = 0; index < 28; index += 1) {
    const particle = document.createElement('span');
    particle.className = 'particle';
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.setProperty('--size', `${2 + Math.random() * 5}px`);
    particle.style.setProperty('--duration', `${8 + Math.random() * 10}s`);
    particle.style.setProperty('--delay', `${Math.random() * -16}s`);
    particle.style.color = index % 3 === 0 ? 'var(--magenta)' : index % 2 === 0 ? 'var(--yellow)' : 'var(--cyan)';
    fragment.appendChild(particle);
  }
  particlesLayer.appendChild(fragment);
}

faqItems.forEach((item, index) => {
  const button = item.querySelector('.faq__question');
  button.addEventListener('click', () => {
    const willOpen = item.dataset.open !== 'true';
    faqItems.forEach((entry) => {
      entry.dataset.open = 'false';
      entry.querySelector('.faq__question').setAttribute('aria-expanded', 'false');
    });
    item.dataset.open = String(willOpen);
    button.setAttribute('aria-expanded', String(willOpen));
  });

  if (index === 0) {
    item.dataset.open = 'true';
    button.setAttribute('aria-expanded', 'true');
  }
});



function showAgeGate() {
  ageGate.hidden = false;
  ageConfirm.focus();
  document.body.style.overflow = 'hidden';
}

function hideAgeGate() {
  ageGate.hidden = true;
  document.body.style.overflow = '';
}

if (window.localStorage.getItem(ageKey) === 'true') {
  hideAgeGate();
} else {
  showAgeGate();
}

ageConfirm?.addEventListener('click', () => {
  window.localStorage.setItem(ageKey, 'true');
  hideAgeGate();
});

ageReject?.addEventListener('click', () => {
  ageBlocked.hidden = false;
  ageConfirm.disabled = true;
  ageReject.disabled = true;
  ageBlocked.scrollIntoView({ block: 'nearest' });
});
