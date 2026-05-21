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


const organization = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${canonicalUrl}#organization`,
  name: 'DRYMOST CYBER SNUS',
  url: canonicalUrl,
  logo: absoluteUrl('./logo.png'),
  description: 'Polska strona kolekcji DRYMOST prezentująca saszetki nikotynowe i smaki Storm oraz Armageddon dla dorosłych 18+.'
};

const website = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${canonicalUrl}#website`,
  name: 'DRYMOST CYBER SNUS',
  url: canonicalUrl,
  inLanguage: 'pl-PL',
  publisher: { '@id': `${canonicalUrl}#organization` }
};

const webPage = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${canonicalUrl}#webpage`,
  url: canonicalUrl,
  name: 'DRYMOST Snusy – Saszetki Nikotynowe',
  description: 'Strona kolekcji DRYMOST z opisem smaków, FAQ i linkami zakupu dla dorosłych użytkowników 18+.',
  inLanguage: 'pl-PL',
  isPartOf: { '@id': `${canonicalUrl}#website` },
  about: { '@id': `${canonicalUrl}#organization` },
  keywords: ['DRYMOST', 'snusy', 'saszetki nikotynowe', 'mocne saszetki nikotynowe', 'Storm', 'Armageddon', '18+']
};

const itemListElements = productData.map((product, index) => ({
  '@type': 'ListItem',
  position: index + 1,
  url: product.url,
  name: product.name
}));

const collectionPage = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  '@id': `${canonicalUrl}#collection`,
  url: canonicalUrl,
  name: 'DRYMOST Snusy – Saszetki Nikotynowe',
  description: 'Polska strona kolekcji DRYMOST z ofertą saszetek nikotynowych dla dorosłych 18+.',
  inLanguage: 'pl-PL',
  isPartOf: { '@id': `${canonicalUrl}#website` },
  about: { '@id': `${canonicalUrl}#organization` },
  mainEntity: { '@id': `${canonicalUrl}#itemlist` },
  breadcrumb: { '@id': `${canonicalUrl}#breadcrumbs` }
};

const itemList = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  '@id': `${canonicalUrl}#itemlist`,
  name: 'Produkty DRYMOST',
  numberOfItems: productData.length,
  itemListElement: itemListElements
};

const breadcrumbs = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  '@id': `${canonicalUrl}#breadcrumbs`,
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Start',
      item: canonicalUrl
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Produkty DRYMOST',
      item: `${canonicalUrl}#produkty`
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'FAQ',
      item: `${canonicalUrl}#faq`
    }
  ]
};

const siteNavigation = navigationElements.map((item, index) => ({
  '@context': 'https://schema.org',
  '@type': 'SiteNavigationElement',
  '@id': `${canonicalUrl}#navigation-${index + 1}`,
  name: item.name,
  url: item.url
}));

const products = productData.map((product) => ({
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: product.name,
  image: [absoluteUrl(product.image)],
  url: product.url,
  brand: {
    '@type': 'Brand',
    name: 'DRYMOST'
  },
  category: 'Saszetki nikotynowe',
  description: `${product.name} to saszetki nikotynowe DRYMOST dla dorosłych użytkowników 18+. Smak: ${product.flavor}. Seria: ${product.series}.`,
  additionalProperty: [
    {
      '@type': 'PropertyValue',
      name: 'Smak',
      value: product.flavor
    },
    {
      '@type': 'PropertyValue',
      name: 'Seria',
      value: product.series
    },
    {
      '@type': 'PropertyValue',
      name: 'Moc',
      value: product.strength
    }
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5',
    reviewCount: '1',
    ratingCount: '1',
    bestRating: '5',
    worstRating: '1'
  },
  review: [
    {
      '@type': 'Review',
      name: `Ocena redakcyjna: ${product.name}`,
      reviewBody: `${product.name} to saszetki nikotynowe DRYMOST dla dorosłych użytkowników 18+, cenione za wyrazisty profil smakowy i wygodną, dyskretną formę.`,
      author: {
        '@type': 'Organization',
        name: 'DRYMOST CYBER SNUS'
      },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: '5',
        bestRating: '5',
        worstRating: '1'
      }
    }
  ],
  offers: {
    '@type': 'Offer',
    priceCurrency: 'EUR',
    price: product.priceValue,
    url: product.url,
    availability: 'https://schema.org/OutOfStock'
  }
}));

const faqPage = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  '@id': `${canonicalUrl}#faqpage`,
  url: `${canonicalUrl}#faq`,
  mainEntity: Array.from(document.querySelectorAll('.faq__item')).map((item) => ({
    '@type': 'Question',
    name: item.querySelector('.faq__question span').textContent.trim(),
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.querySelector('.faq__answer p').textContent.trim()
    }
  }))
};

[organization, website, webPage, collectionPage, breadcrumbs, ...siteNavigation, itemList, ...products, faqPage].forEach((schema) => {
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
});
}

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
