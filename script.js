async function init() {
  const fallbackProducts = [
    { title: 'Drymost Armageddon Appletini', price: 3.9, url: 'https://www.dbucha.com/products/drymost-snusy-armageddon-36mg' },
    { title: 'Drymost Armageddon Barberry', price: 3.9, url: 'https://www.dbucha.com/products/drymost-snusy-armageddon-36mg' },
    { title: 'Drymost Armageddon Bubblegum', price: 3.9, url: 'https://www.dbucha.com/products/drymost-snusy-armageddon-36mg' },
    { title: 'Drymost Armageddon Cherry Pepper', price: 3.9, url: 'https://www.dbucha.com/products/drymost-snusy-armageddon-36mg' },
    { title: 'Drymost Armageddon Grape Chups', price: 3.9, url: 'https://www.dbucha.com/products/drymost-snusy-armageddon-36mg' },
    { title: 'Drymost Armageddon Spearmint', price: 3.9, url: 'https://www.dbucha.com/products/drymost-snusy-armageddon-36mg' },
    { title: 'Drymost Storm Fantasy', price: 3.9, url: 'https://www.dbucha.com/products/drymost-snusy-storm-30mg' },
    { title: 'Drymost Storm Green Mint', price: 3.9, url: 'https://www.dbucha.com/products/drymost-snusy-storm-30mg' },
    { title: 'Drymost Storm Pineapple Jam', price: 3.9, url: 'https://www.dbucha.com/products/drymost-snusy-storm-30mg' },
    { title: 'Drymost Storm Raspberry Soda', price: 3.9, url: 'https://www.dbucha.com/products/drymost-snusy-storm-30mg' }
  ];

  const products = fallbackProducts;
  const imageSlugs = [
    'drymost-armageddon-appletini',
    'drymost-armageddon-barberry',
    'drymost-armageddon-bubblegum',
    'drymost-armageddon-cherry-pepper',
    'drymost-armageddon-grape-chups',
    'drymost-armageddon-spearmint',
    'drymost-storm-fantasy',
    'drymost-storm-green-mint',
    'drymost-storm-pineapple-jam',
    'drymost-storm-raspberry-soda'
  ];

  const productBySlug = new Map(
    products.map((p) => [
      p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      p
    ])
  );
  const productsWithSlug = products.map((p) => ({
    ...p,
    slug: p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
  }));
  const flavorEmojiBySlug = {
    'drymost-armageddon-appletini': '🍏🍸',
    'drymost-armageddon-barberry': '🍓✨',
    'drymost-armageddon-bubblegum': '🍬🫧',
    'drymost-armageddon-cherry-pepper': '🍒🌶️',
    'drymost-armageddon-grape-chups': '🍇🍭',
    'drymost-armageddon-spearmint': '🌿🧊',
    'drymost-storm-fantasy': '🌀🍭',
    'drymost-storm-green-mint': '🌱❄️',
    'drymost-storm-pineapple-jam': '🍍🥭',
    'drymost-storm-raspberry-soda': '🍇🥤'
  };

  const grid = document.getElementById('product-grid');
  grid.innerHTML = imageSlugs.map((slug) => {
    const item = productBySlug.get(slug);
    const title = item ? item.title : slug.replace(/-/g, ' ').replace(/\b\w/g, (m) => m.toUpperCase());
    const url = item ? item.url : 'https://europesnus.com/fr-fr/search?q=drymost';

    return `
      <article class="product-card">
        <div class="flavor-emoji" aria-hidden="true">${flavorEmojiBySlug[slug] || '✨'}</div>
        <div class="snusy-badge">SNUSY</div>
        <img src="assets/images/${slug}.png" alt="${title} saszetki nikotynowe" loading="lazy">
        <div class="discount-pill is-hidden"></div>
        <h3>${title}</h3>
        <p class="discount-line is-hidden"></p>
        <a href="${url}" target="_blank" rel="noopener nofollow">Kup Teraz</a>
      </article>
    `;
  }).join('');

  const itemList = imageSlugs.map((slug, idx) => {
    const p = productBySlug.get(slug);
    const name = p ? p.title : slug.replace(/-/g, ' ').replace(/\b\w/g, (m) => m.toUpperCase());
    const url = p ? p.url : 'https://europesnus.com/fr-fr/search?q=drymost';
    const price = p ? p.price.toFixed(2) : '3.90';

    return {
    '@type': 'ListItem',
    position: idx + 1,
    url,
    item: {
      '@type': 'Product',
      name,
      image: `https://example.com/assets/images/${slug}.png`,
      brand: { '@type': 'Brand', name: 'DRYMOST' },
      offers: {
        '@type': 'Offer',
        priceCurrency: 'EUR',
        price,
        availability: 'https://schema.org/InStock',
        url,
        seller: { '@type': 'Organization', name: 'Europesnus.com' }
      }
    }
  };
  });

  const schemaEl = document.getElementById('structured-data');
  const schema = JSON.parse(schemaEl.textContent);
  schema['@graph'][2].itemListElement = itemList;
  schemaEl.textContent = JSON.stringify(schema, null, 2);

  initGiftRoulette();
  initMobileHeader();
  initHeroCarousel();
  initFloatingGiftCta();
  initSearch(productsWithSlug);
}

function initGiftRoulette() {
  const discounts = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50];
  const triggers = Array.from(document.querySelectorAll('.gift-trigger'));
  const drawer = document.getElementById('gift-drawer');
  const overlay = document.getElementById('drawer-overlay');
  const closeBtn = document.getElementById('drawer-close');
  const spinBtn = document.getElementById('spin-btn');
  const wheel = document.getElementById('roulette-wheel');
  const result = document.getElementById('result-text');
  const winOverlay = document.getElementById('win-overlay');
  const winClose = document.getElementById('win-close');
  const winCta = document.getElementById('win-cta');
  const winPrize = document.getElementById('win-prize');
  const winDesc = document.getElementById('win-desc');

  if (!drawer || !overlay || !closeBtn || !spinBtn || !wheel || !result || triggers.length === 0) return;

  const segmentAngle = 360 / discounts.length;
  wheel.innerHTML = `
    ${discounts.map((discount, idx) => {
      const angle = idx * segmentAngle + segmentAngle / 2;
      return `<span class="roulette-label" style="--angle:${angle}deg">${discount}%</span>`;
    }).join('')}
    <div class="roulette-core">DRYMOST</div>
  `;

  let currentRotation = 0;
  let isSpinning = false;

  const openDrawer = (e) => {
    if (e) e.preventDefault();
    const floatingCta = document.getElementById('floating-gift-cta');
    if (floatingCta) floatingCta.classList.remove('show');
    if (winOverlay) winOverlay.hidden = true;
    overlay.hidden = false;
    drawer.classList.add('open');
    drawer.setAttribute('aria-hidden', 'false');
  };

  const closeDrawer = () => {
    drawer.classList.remove('open');
    drawer.setAttribute('aria-hidden', 'true');
    overlay.hidden = true;
  };
  const closeWinModal = () => {
    if (winOverlay) winOverlay.hidden = true;
    closeDrawer();
  };
  if (winOverlay) winOverlay.hidden = true;

  const applyDiscountToCards = (discount) => {
    const cards = document.querySelectorAll('.product-card');
    cards.forEach((card) => {
      const pill = card.querySelector('.discount-pill');
      const line = card.querySelector('.discount-line');
      const link = card.querySelector('a');
      if (pill) {
        pill.classList.remove('is-hidden');
        pill.textContent = `Rabat -${discount}%`;
      }
      if (line) {
        line.classList.remove('is-hidden');
        line.textContent = `Twój rabat: ${discount}%`;
      }
      if (link) {
        link.textContent = `Kup Teraz (-${discount}%)`;
      }
    });
  };

  triggers.forEach((trigger) => trigger.addEventListener('click', openDrawer));
  overlay.addEventListener('click', closeDrawer);
  closeBtn.addEventListener('click', closeDrawer);
  if (winClose) winClose.addEventListener('click', closeWinModal);
  if (winCta) winCta.addEventListener('click', closeWinModal);
  if (winOverlay) {
    winOverlay.addEventListener('click', (e) => {
      if (e.target === winOverlay) closeWinModal();
    });
  }

  spinBtn.addEventListener('click', () => {
    if (isSpinning) return;
    isSpinning = true;
    spinBtn.disabled = true;

    const winnerIndex = Math.floor(Math.random() * discounts.length);
    const winnerDiscount = discounts[winnerIndex];
    const centerAngle = winnerIndex * segmentAngle + segmentAngle / 2;
    // Pointer is fixed at top (0deg), so rotate wheel so chosen segment center reaches top.
    const targetAngle = (360 - centerAngle) % 360;
    const fullSpins = 5 + Math.floor(Math.random() * 5); // 5..9 full turns
    const spins = fullSpins * 360;
    const currentNormalized = ((currentRotation % 360) + 360) % 360;
    const deltaToTarget = (targetAngle - currentNormalized + 360) % 360;
    currentRotation += spins + deltaToTarget;

    const durationMs = 4500 + Math.floor(Math.random() * 3500); // random speed each click
    wheel.style.transitionDuration = `${durationMs}ms`;
    wheel.style.transform = `rotate(${currentRotation}deg)`;
    result.textContent = 'Losowanie trwa... trzymamy kciuki!';

    setTimeout(() => {
      result.textContent = `Brawo! Wygrywasz ${winnerDiscount}% rabatu na całe zamówienie.`;
      applyDiscountToCards(winnerDiscount);
      if (winOverlay && winPrize && winDesc) {
        winPrize.textContent = `-${winnerDiscount}%`;
        winDesc.textContent = `Twój rabat ${winnerDiscount}% został aktywowany. Dodaj produkty do koszyka i skorzystaj z promocji.`;
        winOverlay.hidden = false;
      }
      spinBtn.disabled = false;
      isSpinning = false;
    }, durationMs + 200);
  });
}

function initMobileHeader() {
  const toggle = document.getElementById('mobile-menu-toggle');
  const sheet = document.getElementById('mobile-sheet');
  const overlay = document.getElementById('mobile-sheet-overlay');
  const closeBtn = document.getElementById('mobile-sheet-close');
  const sheetLinks = Array.from(document.querySelectorAll('.mobile-sheet a'));
  if (!toggle || !sheet || !overlay || !closeBtn) return;

  const setExpanded = (value) => {
    toggle.setAttribute('aria-expanded', value ? 'true' : 'false');
    sheet.classList.toggle('open', value);
    sheet.setAttribute('aria-hidden', value ? 'false' : 'true');
    overlay.hidden = !value;
  };

  toggle.addEventListener('click', () => {
    const isOpen = sheet.classList.contains('open');
    setExpanded(!isOpen);
  });

  closeBtn.addEventListener('click', () => setExpanded(false));
  overlay.addEventListener('click', () => setExpanded(false));
  sheetLinks.forEach((link) => {
    link.addEventListener('click', () => setExpanded(false));
  });
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setExpanded(false);
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 980 && sheet.classList.contains('open')) {
      setExpanded(false);
    }
  });
}

function initHeroCarousel() {
  const track = document.getElementById('hero-track');
  const prevBtn = document.getElementById('hero-prev');
  const nextBtn = document.getElementById('hero-next');
  const dots = Array.from(document.querySelectorAll('.hero-dot'));
  if (!track || !prevBtn || !nextBtn || dots.length === 0) return;

  let index = 0;
  const slideCount = dots.length;
  let startX = 0;
  let deltaX = 0;
  let isDragging = false;

  const update = () => {
    if (window.innerWidth > 980) {
      track.style.transform = '';
      return;
    }
    track.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
  };

  const goTo = (i) => {
    index = (i + slideCount) % slideCount;
    update();
  };

  prevBtn.addEventListener('click', () => {
    if (window.innerWidth > 980) return;
    goTo(index - 1);
  });
  nextBtn.addEventListener('click', () => {
    if (window.innerWidth > 980) return;
    goTo(index + 1);
  });
  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      if (window.innerWidth > 980) return;
      goTo(Number(dot.dataset.slide || 0));
    });
  });

  const onStart = (x) => {
    if (window.innerWidth > 980) return;
    isDragging = true;
    startX = x;
    deltaX = 0;
  };
  const onMove = (x) => {
    if (!isDragging) return;
    deltaX = x - startX;
  };
  const onEnd = () => {
    if (!isDragging) return;
    isDragging = false;
    if (Math.abs(deltaX) > 45) {
      if (deltaX < 0) goTo(index + 1);
      else goTo(index - 1);
    }
    deltaX = 0;
  };

  track.addEventListener('touchstart', (e) => onStart(e.touches[0].clientX), { passive: true });
  track.addEventListener('touchmove', (e) => onMove(e.touches[0].clientX), { passive: true });
  track.addEventListener('touchend', onEnd);

  track.addEventListener('mousedown', (e) => onStart(e.clientX));
  window.addEventListener('mousemove', (e) => onMove(e.clientX));
  window.addEventListener('mouseup', onEnd);
  window.addEventListener('resize', update);

  update();
}

function initFloatingGiftCta() {
  const wrapper = document.getElementById('floating-gift-cta');
  const closeBtn = document.getElementById('floating-gift-close');
  if (!wrapper || !closeBtn) return;

  let firstShowTimer = null;
  let manualReopenTimer = null;

  const showOnce = () => {
    wrapper.classList.add('show');
  };

  firstShowTimer = setTimeout(showOnce, 8000);

  closeBtn.addEventListener('click', () => {
    wrapper.classList.remove('show');
    if (manualReopenTimer) clearTimeout(manualReopenTimer);
    manualReopenTimer = setTimeout(() => {
      showOnce();
    }, 20000);
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth <= 0) return;
  });
}

function initSearch(products) {
  const input = document.getElementById('site-search');
  const category = document.getElementById('search-category');
  const submit = document.getElementById('search-submit');
  const panel = document.getElementById('search-results');
  const overlay = document.getElementById('search-overlay');
  if (!input || !category || !submit || !panel || !overlay) return;

  const normalize = (value) => value.toLowerCase().trim();

  const closeSearch = () => {
    panel.hidden = true;
    overlay.hidden = true;
  };

  const openSearch = () => {
    panel.hidden = false;
    overlay.hidden = false;
  };

  const filterProducts = () => {
    const q = normalize(input.value);
    const cat = category.value;

    let list = products;
    if (cat !== 'all') {
      list = list.filter((p) => p.slug.includes(cat));
    }
    if (q) {
      list = list.filter((p) => normalize(p.title).includes(q));
    }
    return list.slice(0, 8);
  };

  const renderResults = () => {
    const q = normalize(input.value);
    const results = filterProducts();

    if (!q && category.value === 'all') {
      closeSearch();
      return;
    }

    if (results.length === 0) {
      panel.innerHTML = `<div class="search-empty">Brak wyników dla podanego zapytania.</div>`;
      openSearch();
      return;
    }

    panel.innerHTML = results.map((item) => `
      <a class="search-item" href="${item.url}" target="_blank" rel="noopener nofollow">
        <img src="assets/images/${item.slug}.png" alt="${item.title}">
        <div>
          <div class="search-item-title">${item.title}</div>
          <div class="search-item-type">Snusy DRYMOST</div>
        </div>
        <span class="search-item-type">Zobacz</span>
      </a>
    `).join('');
    openSearch();
  };

  input.addEventListener('input', renderResults);
  input.addEventListener('focus', renderResults);
  category.addEventListener('change', renderResults);
  submit.addEventListener('click', (e) => {
    e.preventDefault();
    renderResults();
  });
  overlay.addEventListener('click', closeSearch);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeSearch();
  });
}

init().catch((err) => {
  console.error('Failed to initialize products:', err);
});
