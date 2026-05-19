(function () {
  'use strict';

  /* =============================================
     PARTICLE CANVAS
     ============================================= */
  var canvas = document.getElementById('particles-canvas');
  if (canvas) {
    var ctx = canvas.getContext('2d');
    var particles = [];

    function resizeCanvas() {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    var symbols = ['</', '{}', '=>', '::', 'fun', 'val', 'var', '&&', '()', '/*', '//', ';;'];

    function Particle() { this.reset(true); }

    Particle.prototype.reset = function (initial) {
      this.x       = Math.random() * canvas.width;
      this.y       = initial ? Math.random() * canvas.height : canvas.height + 20;
      this.speedY  = Math.random() * 0.45 + 0.12;
      this.speedX  = (Math.random() - 0.5) * 0.25;
      this.opacity = Math.random() * 0.13 + 0.03;
      this.size    = Math.random() * 9 + 7;
      this.symbol  = symbols[Math.floor(Math.random() * symbols.length)];
      this.color   = Math.random() > 0.55 ? '#3ddc84' : '#6c63ff';
    };

    Particle.prototype.update = function () {
      this.y -= this.speedY;
      this.x += this.speedX;
      if (this.y < -20 || this.x < -60 || this.x > canvas.width + 60) {
        this.reset(false);
      }
    };

    Particle.prototype.draw = function () {
      ctx.save();
      ctx.globalAlpha = this.opacity;
      ctx.fillStyle   = this.color;
      ctx.font        = this.size + "px 'JetBrains Mono', monospace";
      ctx.fillText(this.symbol, this.x, this.y);
      ctx.restore();
    };

    for (var i = 0; i < 65; i++) particles.push(new Particle());

    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (var j = 0; j < particles.length; j++) {
        particles[j].update();
        particles[j].draw();
      }
      requestAnimationFrame(animateParticles);
    }
    animateParticles();
  }

  /* =============================================
     NAVBAR SCROLL EFFECT
     ============================================= */
  var navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  /* =============================================
     MOBILE HAMBURGER MENU
     ============================================= */
  var hamburger = document.getElementById('hamburger');
  var navLinks  = document.getElementById('navLinks');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
    });

    document.querySelectorAll('.nav-links .nav-link').forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });
  }

  /* =============================================
     SMOOTH SCROLL
     ============================================= */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        var offset = target.getBoundingClientRect().top + window.scrollY - 70;
        window.scrollTo({ top: offset, behavior: 'smooth' });
      }
    });
  });

  /* =============================================
     SCROLL REVEAL
     ============================================= */
  if ('IntersectionObserver' in window) {
    var reveals = document.querySelectorAll('.reveal');
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry, idx) {
        if (entry.isIntersecting) {
          (function (el, delay) {
            setTimeout(function () { el.classList.add('visible'); }, delay);
          })(entry.target, idx * 75);
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });

    reveals.forEach(function (el) { revealObserver.observe(el); });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) {
      el.classList.add('visible');
    });
  }

  /* =============================================
     TYPED.JS
     ============================================= */
  if (typeof Typed !== 'undefined') {
    new Typed('#typed-text', {
      strings: [
        'Android &amp; iOS Developer',
        'Jetpack Compose Expert',
        'Kotlin &amp; Swift Developer',
        'Clean Architecture Advocate',
        'Firebase Developer',
        'UI/UX Designer',
        'YouTube Creator — 20K+ Subs'
      ],
      typeSpeed:  55,
      backSpeed:  32,
      backDelay:  2000,
      startDelay: 600,
      loop:       true
    });
  }

  /* =============================================
     3D PHONE TILT ON MOUSEMOVE
     ============================================= */
  var phoneFrame = document.getElementById('phoneFrame');
  if (phoneFrame) {
    var lastX = 0, lastY = 0;

    document.addEventListener('mousemove', function (e) {
      var rect   = phoneFrame.getBoundingClientRect();
      var cx     = rect.left + rect.width  / 2;
      var cy     = rect.top  + rect.height / 2;
      var deltaX = (e.clientX - cx) / window.innerWidth;
      var deltaY = (e.clientY - cy) / window.innerHeight;

      // Smooth lerp
      lastX += (deltaX - lastX) * 0.12;
      lastY += (deltaY - lastY) * 0.12;

      phoneFrame.style.transform =
        'perspective(900px) rotateY(' + (lastX * 16) + 'deg) rotateX(' + (-lastY * 11) + 'deg)';
    });

    document.addEventListener('mouseleave', function () {
      phoneFrame.style.transform = 'perspective(900px) rotateY(0deg) rotateX(0deg)';
    });
  }

  /* =============================================
     PROJECT CARD 3D TILT
     ============================================= */
  document.querySelectorAll('.project-card').forEach(function (card) {
    card.addEventListener('mousemove', function (e) {
      var rect  = card.getBoundingClientRect();
      var x     = e.clientX - rect.left;
      var y     = e.clientY - rect.top;
      var cx    = rect.width  / 2;
      var cy    = rect.height / 2;
      var rotY  =  (x - cx) / cx * 5;
      var rotX  = -(y - cy) / cy * 4;
      card.style.transform =
        'translateY(-8px) perspective(650px) rotateX(' + rotX + 'deg) rotateY(' + rotY + 'deg)';
    });

    card.addEventListener('mouseleave', function () {
      card.style.transform = '';
    });
  });

  /* =============================================
     ANIMATED COUNTER
     ============================================= */
  function animateCounter(el, target, duration) {
    var start = 0;
    var step  = Math.ceil(target / (duration / 16));
    var timer = setInterval(function () {
      start += step;
      if (start >= target) { start = target; clearInterval(timer); }
      el.textContent = start;
    }, 16);
  }

  var counters = document.querySelectorAll('.counter-num');
  if ('IntersectionObserver' in window && counters.length) {
    var counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var el     = entry.target;
          var target = parseInt(el.getAttribute('data-target'), 10);
          animateCounter(el, target, 1200);
          counterObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(function (c) { counterObserver.observe(c); });
  }

  /* =============================================
     PROJECT FILTER TABS
     ============================================= */
  var filterBtns = document.querySelectorAll('.proj-filter');
  var projCols   = document.querySelectorAll('#projects-grid [data-category]');

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');

      var filter = btn.getAttribute('data-filter');

      projCols.forEach(function (col) {
        var cats = col.getAttribute('data-category') || '';
        var show = filter === 'all' || cats.indexOf(filter) !== -1;
        col.style.display = show ? '' : 'none';
      });
    });
  });

  /* =============================================
     NAV ACTIVE STATE ON SCROLL
     ============================================= */
  var sections  = document.querySelectorAll('section[id]');
  var navItems  = document.querySelectorAll('.nav-links .nav-link');

  if (sections.length && navItems.length) {
    window.addEventListener('scroll', function () {
      var scrollPos = window.scrollY + 120;
      sections.forEach(function (section) {
        if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
          navItems.forEach(function (link) {
            link.classList.remove('active-link');
            if (link.getAttribute('href') === '#' + section.id) {
              link.classList.add('active-link');
            }
          });
        }
      });
    });
  }

  /* =============================================
     PORTFOLIO SEARCH (Ctrl+K)
     ============================================= */
  var searchIndex = [
    // Sections
    { type: 'section', label: 'Home',                         icon: 'fa-house',            target: '#home',          tags: [] },
    { type: 'section', label: 'About Me',                     icon: 'fa-user',             target: '#about',         tags: ['about', 'bio', 'profile', 'odisha', 'mca'] },
    { type: 'section', label: 'Skills',                       icon: 'fa-code',             target: '#skills',        tags: ['skills', 'tech', 'stack', 'kotlin', 'swift'] },
    { type: 'section', label: 'How I Work',                   icon: 'fa-diagram-project',  target: '#process',       tags: ['process', 'workflow', 'steps', 'plan', 'design'] },
    { type: 'section', label: 'Achievements & Certifications', icon: 'fa-trophy',          target: '#certifications', tags: ['certs', 'achievements', 'cgpa', 'youtube', 'awards'] },
    { type: 'section', label: 'Projects',                     icon: 'fa-folder-open',      target: '#project',       tags: ['projects', 'apps', 'portfolio', 'work'] },
    { type: 'section', label: 'YouTube',                      icon: 'fa-youtube',          target: '#youtube',       tags: ['youtube', 'gaming', 'vlog', 'creator', 'channel'] },
    { type: 'section', label: 'Resume / Timeline',            icon: 'fa-file-lines',       target: '#resume',        tags: ['resume', 'experience', 'timeline', 'fibermax', 'codsoft'] },
    { type: 'section', label: 'Contact',                      icon: 'fa-envelope',         target: '#contact',       tags: ['contact', 'email', 'hire', 'message'] },
    // Projects
    { type: 'project', label: 'Bond — Couple App',            icon: 'fa-heart',            target: 'bond',           tags: ['bond', 'couple', 'kotlin', 'compose', 'firebase', 'fcm', 'android', 'relationship'] },
    { type: 'project', label: 'CashBook',                     icon: 'fa-book',             target: 'cashbook',       tags: ['cashbook', 'bookkeeping', 'kotlin', 'compose', 'firestore', 'fibermax', 'fintech', 'ledger'] },
    { type: 'project', label: 'WeighBridgeMax',               icon: 'fa-weight-hanging',   target: 'weighbridge',    tags: ['weighbridge', 'weighbridgemax', 'industrial', 'kotlin', 'fibermax', 'pdf'] },
    { type: 'project', label: 'Cineworld Android',            icon: 'fa-film',             target: 'cineworld_android', tags: ['cineworld', 'cinema', 'booking', 'ticket', 'razorpay', 'kotlin', 'xml', 'qr'] },
    { type: 'project', label: 'Cineworld iOS',                icon: 'fa-apple',            target: 'cineworld_ios',  tags: ['cineworld', 'ios', 'swift', 'razorpay', 'xcode', 'appstore', 'iphone'] },
    { type: 'project', label: 'Mr Care — Crusher Service',    icon: 'fa-screwdriver-wrench', target: 'mrcare',       tags: ['mrcare', 'crusher', 'service', 'complaint', 'amc', 'warranty', 'maps', 'kotlin'] },
    { type: 'project', label: 'The Food Hub',                 icon: 'fa-utensils',         target: 'foodhub',        tags: ['food', 'restaurant', 'ordering', 'kotlin', 'firebase', 'mvvm'] },
    { type: 'project', label: 'WhatsApp Clone',               icon: 'fa-comment-dots',     target: 'whatsapp',       tags: ['whatsapp', 'messaging', 'chat', 'realtime', 'firebase', 'kotlin'] },
    { type: 'project', label: 'Daily Notes',                  icon: 'fa-note-sticky',      target: 'notes',          tags: ['notes', 'offline', 'room', 'sqlite', 'kotlin', 'crud'] },
    { type: 'project', label: 'Quotify',                      icon: 'fa-quote-right',      target: 'quotify',        tags: ['quotes', 'retrofit', 'api', 'room', 'kotlin'] },
    { type: 'project', label: 'Hotel Management System',      icon: 'fa-hotel',            target: 'hotel',          tags: ['hotel', 'java', 'php', 'mysql', 'web', 'management'] },
    { type: 'project', label: 'Vehicle Inventory',            icon: 'fa-car',              target: 'vehicle',        tags: ['vehicle', 'inventory', 'kotlin', 'firebase', 'android'] },
    // Skills
    { type: 'skill', label: 'Kotlin',                         icon: 'fa-k',                target: '#skills',        tags: ['kotlin', 'language', 'android'] },
    { type: 'skill', label: 'Swift / Xcode',                  icon: 'fa-apple',            target: '#skills',        tags: ['swift', 'xcode', 'ios', 'apple'] },
    { type: 'skill', label: 'Jetpack Compose',                icon: 'fa-layer-group',      target: '#skills',        tags: ['compose', 'ui', 'declarative', 'android'] },
    { type: 'skill', label: 'Firebase Suite',                 icon: 'fa-fire',             target: '#skills',        tags: ['firebase', 'firestore', 'auth', 'fcm', 'storage', 'cloud'] },
    { type: 'skill', label: 'MVVM & Clean Architecture',      icon: 'fa-diagram-project',  target: '#skills',        tags: ['mvvm', 'architecture', 'clean', 'pattern'] },
    { type: 'skill', label: 'Hilt / Dependency Injection',   icon: 'fa-syringe',          target: '#skills',        tags: ['hilt', 'di', 'dependency', 'injection'] },
    { type: 'skill', label: 'Coroutines & Flow',              icon: 'fa-bolt',             target: '#skills',        tags: ['coroutines', 'flow', 'async', 'kotlin'] },
    { type: 'skill', label: 'Room DB / SQLite',               icon: 'fa-database',         target: '#skills',        tags: ['room', 'sqlite', 'database', 'local', 'offline'] },
    { type: 'skill', label: 'Retrofit / REST APIs',           icon: 'fa-plug',             target: '#skills',        tags: ['retrofit', 'rest', 'api', 'http', 'networking'] },
    { type: 'skill', label: 'Figma / UI Design',              icon: 'fa-pen-ruler',        target: '#skills',        tags: ['figma', 'design', 'ui', 'ux', 'wireframe'] }
  ];

  var typeLabels = { section: 'Section', project: 'Project', skill: 'Skill' };
  var activeSearchIdx = -1;

  function openSearch() {
    var overlay = document.getElementById('searchOverlay');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    setTimeout(function () { document.getElementById('searchInput').focus(); }, 50);
    activeSearchIdx = -1;
  }

  function closeSearch() {
    var overlay = document.getElementById('searchOverlay');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
    document.getElementById('searchInput').value = '';
    document.getElementById('searchResults').innerHTML = '<div class="search-empty-state"><i class="fas fa-magnifying-glass"></i><span>Type to search anything…</span></div>';
    document.getElementById('searchClearBtn').classList.remove('visible');
    activeSearchIdx = -1;
  }

  function clearSearch() {
    document.getElementById('searchInput').value = '';
    document.getElementById('searchInput').focus();
    document.getElementById('searchClearBtn').classList.remove('visible');
    renderResults('');
  }

  function handleSearchOverlayClick(e) {
    if (e.target === document.getElementById('searchOverlay')) closeSearch();
  }

  function highlightMatch(text, query) {
    if (!query) return text;
    var regex = new RegExp('(' + query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi');
    return text.replace(regex, '<mark>$1</mark>');
  }

  function scoreItem(item, q) {
    var ql = q.toLowerCase();
    var labelL = item.label.toLowerCase();
    if (labelL === ql) return 100;
    if (labelL.startsWith(ql)) return 80;
    if (labelL.indexOf(ql) !== -1) return 60;
    for (var t = 0; t < item.tags.length; t++) {
      if (item.tags[t].indexOf(ql) !== -1) return 40;
    }
    return 0;
  }

  function renderResults(query) {
    var resultsEl = document.getElementById('searchResults');
    var q = query.trim();

    if (!q) {
      resultsEl.innerHTML = '<div class="search-empty-state"><i class="fas fa-magnifying-glass"></i><span>Type to search anything…</span></div>';
      activeSearchIdx = -1;
      return;
    }

    var scored = [];
    for (var i = 0; i < searchIndex.length; i++) {
      var s = scoreItem(searchIndex[i], q);
      if (s > 0) scored.push({ item: searchIndex[i], score: s });
    }
    scored.sort(function (a, b) { return b.score - a.score; });

    if (scored.length === 0) {
      resultsEl.innerHTML = '<div class="search-no-results"><i class="fas fa-face-frown-open"></i><span>No results for "' + q + '"</span></div>';
      activeSearchIdx = -1;
      return;
    }

    var grouped = { section: [], project: [], skill: [] };
    for (var j = 0; j < Math.min(scored.length, 10); j++) {
      var it = scored[j].item;
      if (grouped[it.type]) grouped[it.type].push(it);
    }

    var html = '';
    var order = ['section', 'project', 'skill'];
    var globalIdx = 0;

    for (var g = 0; g < order.length; g++) {
      var groupKey = order[g];
      var group = grouped[groupKey];
      if (!group.length) continue;

      html += '<div class="search-group-label">' + typeLabels[groupKey] + 's</div>';

      for (var k = 0; k < group.length; k++) {
        var item = group[k];
        var iconClass = 'search-icon-' + groupKey;
        html += '<div class="search-item" data-target="' + item.target + '" data-type="' + item.type + '" data-idx="' + globalIdx + '">' +
          '<div class="search-item-icon ' + iconClass + '"><i class="fas ' + item.icon + '"></i></div>' +
          '<div class="search-item-body">' +
            '<span class="search-item-label">' + highlightMatch(item.label, q) + '</span>' +
            '<span class="search-item-type">' + typeLabels[item.type] + '</span>' +
          '</div>' +
          '<i class="fas fa-arrow-right search-item-arrow"></i>' +
        '</div>';
        globalIdx++;
      }
    }

    resultsEl.innerHTML = html;
    activeSearchIdx = -1;

    resultsEl.querySelectorAll('.search-item').forEach(function (el) {
      el.addEventListener('click', function () { selectSearchItem(el); });
    });
  }

  function selectSearchItem(el) {
    var target = el.getAttribute('data-target');
    var type   = el.getAttribute('data-type');
    closeSearch();

    if (type === 'project') {
      setTimeout(function () { openCaseStudy(target); }, 220);
    } else {
      var dest = document.querySelector(target);
      if (dest) {
        setTimeout(function () {
          var offset = dest.getBoundingClientRect().top + window.scrollY - 70;
          window.scrollTo({ top: offset, behavior: 'smooth' });
        }, 180);
      }
    }
  }

  function moveSearchSelection(dir) {
    var items = document.querySelectorAll('#searchResults .search-item');
    if (!items.length) return;
    items.forEach(function (el) { el.classList.remove('active'); });
    activeSearchIdx = (activeSearchIdx + dir + items.length) % items.length;
    var active = items[activeSearchIdx];
    active.classList.add('active');
    active.scrollIntoView({ block: 'nearest' });
  }

  // Wire up events
  var searchTrigger = document.getElementById('searchTrigger');
  if (searchTrigger) searchTrigger.addEventListener('click', openSearch);

  var searchInputEl = document.getElementById('searchInput');
  if (searchInputEl) {
    searchInputEl.addEventListener('input', function () {
      var v = this.value;
      document.getElementById('searchClearBtn').classList.toggle('visible', v.length > 0);
      renderResults(v);
    });

    searchInputEl.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown') { e.preventDefault(); moveSearchSelection(1); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); moveSearchSelection(-1); }
      else if (e.key === 'Enter') {
        var active = document.querySelector('#searchResults .search-item.active');
        if (active) { selectSearchItem(active); }
        else {
          var first = document.querySelector('#searchResults .search-item');
          if (first) selectSearchItem(first);
        }
      } else if (e.key === 'Escape') { closeSearch(); }
    });
  }

  document.addEventListener('keydown', function (e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      var overlay = document.getElementById('searchOverlay');
      if (overlay && overlay.classList.contains('open')) closeSearch();
      else openSearch();
    }
  });

  window.openSearch  = openSearch;
  window.closeSearch = closeSearch;
  window.clearSearch = clearSearch;
  window.handleSearchOverlayClick = handleSearchOverlayClick;

  /* =============================================
     CASE STUDY MODAL
     ============================================= */
  var caseStudies = {
    bond: {
      title: 'Bond — Couple App',
      tag: 'Android · In Dev',
      date: '2025 – Present',
      problem: 'Couples in long-distance relationships struggle with staying emotionally connected. Generic messaging apps lack intimacy-focused features like shared memory timelines, synced moods, or private couple spaces.',
      solution: 'Bond is a private, real-time Android app exclusively designed for two users. It provides a shared journey timeline, mood syncing, custom couple themes, and push notification nudges — creating a dedicated digital space for the relationship.',
      features: [
        'Private invite-only pairing — only two users share a space',
        'Shared memory timeline with photos, notes, and milestones',
        'Mood sync — each partner sets their mood, both see it live',
        'Push notifications via Firebase Cloud Messaging (nudges, anniversaries)',
        'Custom themes and colour palettes for the couple',
        'Offline-capable local data with Room DB sync'
      ],
      challenges: [
        'Real-time bidirectional state sync between two devices using Firestore listeners',
        'Conflict-free mood updates with Firestore transactions',
        'Secure one-to-one pairing logic that prevents third-party access',
        'Smooth animated transitions in Jetpack Compose for timeline entries'
      ],
      tech: ['Kotlin', 'Jetpack Compose', 'Firebase Firestore', 'Firebase Auth', 'FCM', 'Room DB', 'Hilt DI', 'MVVM', 'Coroutines & Flow'],
      links: []
    },

    cashbook: {
      title: 'CashBook — Multi-Tenant Bookkeeping',
      tag: 'Professional · Fibermax',
      date: 'Nov 2025 – Present',
      problem: 'Small and medium businesses that manage multiple stores or branches need a shared bookkeeping system where owners, admins, and operators each have different levels of access — existing apps treat all users the same.',
      solution: 'Built a multi-tenant bookkeeping Android app at Fibermax with full role-based access control (Owner / Admin / Operator). Each role sees a different UI and has different transaction permissions, all backed by Cloud Firestore with real-time sync across the team.',
      features: [
        'Role-based access: Owner (full control), Admin (manage team + entries), Operator (add transactions only)',
        'Multi-tenant architecture — each business is an isolated Firestore tenant',
        'Real-time transaction ledger synced across all team devices',
        'Team member invitation and role assignment by Owner/Admin',
        'Summary dashboards: daily/weekly/monthly profit & expense views',
        'Offline support — transactions queue locally and sync on reconnect'
      ],
      challenges: [
        'Designing Firestore security rules that enforce role boundaries per tenant without server-side code',
        'Keeping UI reactive to role changes in real time (if an admin demotes a user, their view updates instantly)',
        'Handling concurrent writes to the same ledger from multiple operators without data loss',
        'Integrating Hilt DI cleanly across multi-module feature sets'
      ],
      tech: ['Kotlin', 'Jetpack Compose', 'Cloud Firestore', 'Firebase Auth', 'Hilt DI', 'MVVM + Clean Architecture', 'Coroutines & Flow', 'Room DB'],
      links: [
        { label: 'Play Store', url: 'https://play.google.com/store/apps/details?id=com.fibermax.cashbook&hl=en_IN', icon: 'fab fa-google-play', primary: true }
      ]
    },

    weighbridge: {
      title: 'WeighBridgeMax — Industrial Weighbridge',
      tag: 'Professional · Fibermax',
      date: 'Nov 2025 – Present',
      problem: 'Industrial weighbridge operations at factories and logistics hubs rely on paper logs or outdated desktop software, making it difficult to track vehicle weights, generate reports, and manage records remotely.',
      solution: 'Developed an Android app for WeighBridgeMax (Fibermax product) that digitises the entire weighbridge workflow — vehicle entry, gross/tare/net weight capture, instant slip generation, and cloud-synced record storage — replacing paper with a fast, reliable mobile interface.',
      features: [
        'Vehicle entry with registration number, commodity, and party details',
        'Gross weight and tare weight capture with net calculation',
        'Instant PDF weighment slip generation and print/share',
        'Cloud-synced transaction history accessible across devices',
        'Search and filter records by date, vehicle, or party',
        'Play Store feature graphics and marketing asset design'
      ],
      challenges: [
        'Generating pixel-perfect PDF slips matching official weighbridge slip formats',
        'Handling large record sets efficiently with paginated Firestore queries',
        'Designing an operator-friendly UI usable in harsh industrial environments (large touch targets, high contrast)',
        'Offline-first architecture so weighments are never lost during network drops'
      ],
      tech: ['Kotlin', 'Jetpack Compose', 'Cloud Firestore', 'Firebase Auth', 'PDF generation', 'MVVM', 'Hilt DI', 'Coroutines & Flow'],
      links: [
        { label: 'Play Store', url: 'https://play.google.com/store/apps/details?id=com.airmax.weighbridge&hl=en_IN', icon: 'fab fa-google-play', primary: true }
      ]
    },

    foodhub: {
      title: 'The Food Hub — Food Ordering App',
      tag: 'Android · Personal Project',
      date: '2024',
      problem: 'Learning how to build a complete end-to-end Android app with real-world patterns: product listing, cart management, order placement, and user authentication — without shortcuts or hardcoded data.',
      solution: 'Built a fully functional food ordering Android app with Firebase backend. Users can browse restaurant menus, add items to cart with quantity controls, place orders, and track order history — all authenticated via Firebase Auth.',
      features: [
        'Firebase Auth — email/password sign-up and login',
        'Dynamic menu browsing by category with real-time Firestore data',
        'Cart with item quantity management and live total calculation',
        'Order placement with Firestore order documents',
        'Order history screen showing past purchases',
        'Smooth RecyclerView + DiffUtil for performant list rendering'
      ],
      challenges: [
        'Keeping cart state consistent between navigation with ViewModel + StateFlow',
        'Real-time price recalculation as quantities change without UI jank',
        'Structuring Firestore data model for efficient cart-to-order conversion'
      ],
      tech: ['Kotlin', 'XML Layouts', 'Firebase Auth', 'Cloud Firestore', 'MVVM', 'RecyclerView', 'StateFlow', 'Coroutines'],
      links: []
    },

    whatsapp: {
      title: 'WhatsApp Clone — Messaging UI',
      tag: 'Android · Personal Project',
      date: '2024',
      problem: 'Understanding how a large-scale real-time messaging app is architected at the UI and data layer — including contact lists, chat screens, message bubbles, and read receipts — without building throwaway toy code.',
      solution: 'Built a feature-complete WhatsApp UI clone with Firebase Realtime Database for live message delivery. The project replicates the core chat experience including contact list, individual chat rooms, message timestamps, and send/receive bubble differentiation.',
      features: [
        'User registration and login with Firebase Auth',
        'Contact list with online/offline status indicators',
        'Real-time one-to-one messaging via Firebase Realtime Database',
        'Message bubbles with sent/received states and timestamps',
        'Profile photo upload with Firebase Storage',
        'Push notifications for new messages via FCM'
      ],
      challenges: [
        'Designing a Realtime Database structure that scales per chat room without over-fetching',
        'Handling message ordering with server timestamps to avoid client clock drift',
        'Smooth scroll-to-bottom behaviour in the chat RecyclerView as new messages arrive'
      ],
      tech: ['Kotlin', 'XML Layouts', 'Firebase Auth', 'Firebase Realtime Database', 'Firebase Storage', 'FCM', 'RecyclerView', 'MVVM'],
      links: []
    },

    notes: {
      title: 'Daily Notes — Offline Notes App',
      tag: 'Android · Personal Project',
      date: '2024',
      problem: 'Many note-taking apps depend on internet connectivity or are over-engineered. Needed a fast, fully offline app to deeply learn Room DB, SQLite queries, and local data persistence patterns in Android.',
      solution: 'Built a clean, offline-first notes app with full CRUD operations, colour-coded categories, search, and sort — all stored locally in Room DB. No internet required, no account needed, instant launch.',
      features: [
        'Create, read, update, delete notes with title and body',
        'Colour-coded note categories for visual organisation',
        'Real-time search filtering notes as you type',
        'Sort by date created, date modified, or alphabetically',
        'Swipe-to-delete with undo snackbar',
        'Dark mode-first design'
      ],
      challenges: [
        'Writing efficient Room DAO queries with Flow for reactive UI updates',
        'Implementing search with FTS (Full Text Search) in SQLite via Room for instant results',
        'Handling configuration changes (rotation) without data loss using ViewModel'
      ],
      tech: ['Kotlin', 'Jetpack Compose', 'Room DB', 'SQLite', 'ViewModel', 'StateFlow', 'Coroutines', 'MVVM'],
      links: []
    },

    quotify: {
      title: 'Quotify — Quotes App',
      tag: 'Android · Personal Project',
      date: '2023',
      problem: 'First real Retrofit + REST API integration project — needed a concrete app to learn how to fetch data from a remote API, handle loading/error states gracefully, and display paginated content.',
      solution: 'Quotify fetches motivational quotes from a public quotes API, displays them in a scrollable feed with author attribution, allows bookmarking to a local Room DB, and supports category filtering. Built to master the full Retrofit + ViewModel + Repository pattern.',
      features: [
        'Fetch quotes from REST API using Retrofit + Gson',
        'Category filter (motivational, life, wisdom, humour)',
        'Bookmark favourite quotes locally with Room DB',
        'Share quote as text or image via Android share sheet',
        'Pull-to-refresh and pagination for more quotes',
        'Loading shimmer placeholders and error retry UI'
      ],
      challenges: [
        'Handling API rate limits and network errors with clean error states in the UI',
        'Syncing remote quotes with local bookmarks without duplicating data',
        'Building the share-as-image feature using Canvas to render quote on a bitmap'
      ],
      tech: ['Kotlin', 'Retrofit', 'Gson', 'Room DB', 'MVVM', 'ViewModel', 'LiveData', 'Coroutines', 'XML Layouts'],
      links: []
    },

    hotel: {
      title: 'Hotel Management System',
      tag: 'Web · College Project',
      date: '2023',
      problem: 'Small hotels manage room bookings, check-ins, billing, and staff through paper registers or spreadsheets — error-prone and slow at peak times. Needed a digital solution as a full-stack college project.',
      solution: 'Built a web-based hotel management system with room inventory, guest check-in/check-out, billing generation, and an admin dashboard — covering the full booking lifecycle from availability check to invoice.',
      features: [
        'Room inventory management with status (Available / Occupied / Maintenance)',
        'Guest check-in form with ID details and room assignment',
        'Automated billing calculation based on room rate and nights',
        'Admin dashboard with occupancy summary and revenue view',
        'Check-out with printable invoice generation',
        'Search guests by name, date, or room number'
      ],
      challenges: [
        'Preventing double-booking with server-side availability validation',
        'Accurate billing when guests extend stay mid-checkout',
        'Building a clean multi-page web UI without a JavaScript framework'
      ],
      tech: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL'],
      links: []
    },

    cineworld_android: {
      title: 'Cineworld — Cinema Booking App (Android)',
      tag: 'Professional · Android',
      date: '2024 – 2025',
      problem: 'Cinema ticket booking in most theatres still relies on counter queues or clunky third-party apps. Cineworld needed its own branded Android app where users can browse movies, pick seats on an interactive map, pay online, and walk in with a QR ticket — all in one smooth flow.',
      solution: 'Built a full-featured Android cinema booking app with seat map selection, Razorpay payment integration, instant QR ticket generation, and a food ordering module. The backend (Node.js + MySQL) handles seat locking, booking expiry, and payment verification with idempotency.',
      features: [
        'OTP-based login with Firebase Auth',
        'Now Showing and Upcoming movies with banners and age gate',
        'Interactive screen seat map — pick seats, see availability in real time',
        'Seat lock system — seats are locked for the user during payment window',
        'Razorpay payment with backend order creation and webhook verification',
        'QR-code ticket generation on booking confirmation',
        'Food ordering — counter pickup or seat delivery option',
        'My Bookings screen with cancellation support',
        'Role-based admin panel: Master Admin, Box Office, Gate Scanner, Food Counter, and more'
      ],
      challenges: [
        'Race condition: Razorpay payment succeeds on client but booking expires on server — solved with idempotency keys and payment verification endpoint',
        'Seat lock expiry: a seat locked for user A must auto-release if payment times out without affecting confirmed bookings',
        'Seat map rendering for various screen layouts (non-rectangular rows, premium zones)',
        'Syncing order status between the food kitchen screen and the user\'s app in real time'
      ],
      tech: ['Kotlin', 'XML Layouts', 'Razorpay Android SDK', 'Firebase Auth', 'FCM', 'Retrofit', 'Node.js', 'Express', 'MySQL', 'Sequelize', 'QR Code generation'],
      links: [
        { label: 'Play Store', url: 'https://play.google.com/store/apps/details?id=com.fibermax.cineworlduser&hl=en_IN', icon: 'fab fa-google-play', primary: true }
      ]
    },

    cineworld_ios: {
      title: 'Cineworld — Cinema Booking App (iOS)',
      tag: 'Professional · iOS',
      date: '2024 – 2025',
      problem: 'After launching the Android Cineworld app, the business needed an iOS version to reach iPhone users — with identical booking flow, same backend, and App Store compliance — without a separate codebase team.',
      solution: 'Built the iOS version of Cineworld in Swift, mirroring the Android app\'s complete booking flow. Integrated Razorpay iOS SDK via CocoaPods, set up Firebase Cloud Messaging for push notifications, and took the app through full App Store Connect submission including privacy questionnaire and age rating.',
      features: [
        'Complete movie browsing, show time selection, and seat booking on iOS',
        'Razorpay iOS SDK integrated via CocoaPods for payment',
        'Firebase Cloud Messaging — APNs key setup for iOS push notifications',
        'Firebase Auth for OTP-based login',
        'QR ticket display and My Bookings screen',
        'Food ordering flow matching Android app',
        'App Store Connect submission — privacy data form, age rating, and review preparation'
      ],
      challenges: [
        'CocoaPods dependency conflicts during Razorpay and Firebase SDK integration on Xcode',
        'APNs certificate setup and FCM configuration for iOS — different from Android FCM flow',
        'App Store review requirements: age rating questionnaire, privacy data types declaration, and app completeness checks',
        'Keeping UI/UX identical to Android while respecting iOS Human Interface Guidelines'
      ],
      tech: ['Swift', 'Xcode', 'CocoaPods', 'Razorpay iOS SDK', 'Firebase Auth', 'Firebase Cloud Messaging', 'APNs', 'App Store Connect'],
      links: []
    },

    mrcare: {
      title: 'Mr Care — Crusher Service Management App',
      tag: 'Professional · Active Dev',
      date: '2025',
      problem: 'Crusher machine manufacturers handle service requests, warranty claims, and AMC contracts through phone calls and paper job sheets. Engineers in the field have no digital way to update job status, and service heads have no real-time visibility into ongoing complaints.',
      solution: 'Building a mobile-first service management app where customers raise complaints with images and category details, service engineers update job status with their GPS location at each step, and service heads monitor all active complaints on a live dashboard. Warranty and AMC status are checked automatically at complaint creation time.',
      features: [
        'Customer complaint creation with category, images, and product details',
        'Automatic warranty/AMC check at complaint time — determines chargeability instantly',
        'Engineer assignment — one complaint can have multiple engineers',
        'Engineer job status updates with GPS coordinates captured at each update',
        'Service head dashboard — live view of all active complaints and engineer locations on Google Maps',
        'AMC tracking and preventive maintenance schedules',
        'Spare part ordering and assignment to specific products',
        'Push notifications to customers for status changes and warranty warnings',
        'PDF service job sheet generation for engineers in the field'
      ],
      challenges: [
        'Warranty/chargeability must be locked at complaint creation time — later warranty date changes by admin should not affect old records',
        'Capturing engineer GPS location at every status update without draining battery',
        'Multiple engineers updating the same complaint without conflict in Firestore',
        'Map picker UI for manually pinning job location when GPS is inaccurate indoors',
        'Designing a scalable spare-part-to-product many-to-many assignment model'
      ],
      tech: ['Kotlin', 'Jetpack Compose', 'Cloud Firestore', 'Firebase Auth', 'FCM', 'Google Maps SDK', 'Hilt DI', 'MVVM + Clean Architecture', 'Coroutines & Flow', 'PDF generation'],
      links: []
    },

    vehicle: {
      title: 'Vehicle Inventory Management',
      tag: 'Web · College Project',
      date: '2023',
      problem: 'Vehicle dealerships and rental services track their fleet manually — no real-time availability status, no maintenance schedule, and no quick lookup for a specific vehicle\'s history.',
      solution: 'Developed a web-based vehicle inventory system where staff can add vehicles with specs, track availability status, log service history, and search or filter the fleet by make, model, or category.',
      features: [
        'Add and edit vehicle records (make, model, year, price, status)',
        'Real-time availability status: Available / Sold / In Service',
        'Service history log per vehicle with date and notes',
        'Search and filter fleet by category, make, or availability',
        'Summary dashboard with fleet count and status breakdown',
        'Export vehicle list to CSV for reporting'
      ],
      challenges: [
        'Handling status transitions with data integrity (e.g. a Sold car cannot go back to Available without admin override)',
        'Building a responsive data table UI that works across screen sizes without a framework',
        'Designing the MySQL schema to efficiently support both inventory queries and history lookups'
      ],
      tech: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL'],
      links: []
    }
  };

  function openCaseStudy(id) {
    var data = caseStudies[id];
    if (!data) return;

    document.getElementById('modalTitle').textContent   = data.title;
    document.getElementById('modalTag').textContent     = data.tag;
    document.getElementById('modalDate').textContent    = data.date;
    document.getElementById('modalProblem').textContent = data.problem;
    document.getElementById('modalSolution').textContent = data.solution;

    var featList = document.getElementById('modalFeatures');
    featList.innerHTML = '';
    data.features.forEach(function (f) {
      var li = document.createElement('li');
      li.textContent = f;
      featList.appendChild(li);
    });

    var chalList = document.getElementById('modalChallenges');
    chalList.innerHTML = '';
    data.challenges.forEach(function (c) {
      var li = document.createElement('li');
      li.textContent = c;
      chalList.appendChild(li);
    });

    var techWrap = document.getElementById('modalTech');
    techWrap.innerHTML = '';
    data.tech.forEach(function (t) {
      var span = document.createElement('span');
      span.className = 'tech-tag';
      span.textContent = t;
      techWrap.appendChild(span);
    });

    var linksRow = document.getElementById('modalLinks');
    linksRow.innerHTML = '';
    if (data.links && data.links.length) {
      data.links.forEach(function (l) {
        var a = document.createElement('a');
        a.className = 'modal-link-btn ' + (l.primary ? 'primary' : 'secondary');
        a.href = l.url;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        a.innerHTML = '<i class="' + l.icon + '"></i> ' + l.label;
        linksRow.appendChild(a);
      });
    }

    var overlay = document.getElementById('caseModal');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    var overlay = document.getElementById('caseModal');
    if (overlay) {
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  function handleModalClick(e) {
    if (e.target === document.getElementById('caseModal')) {
      closeModal();
    }
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeModal();
  });

  // Expose to global scope for inline onclick handlers
  window.openCaseStudy = openCaseStudy;
  window.closeModal    = closeModal;
  window.handleModalClick = handleModalClick;

  /* =============================================
     SCREENSHOT STRIP — FALLBACK FOR MISSING IMAGES
     ============================================= */
  document.querySelectorAll('.proj-screenshots-wrap').forEach(function (wrap) {
    var imgs   = Array.from(wrap.querySelectorAll('.proj-screenshot'));
    if (!imgs.length) return;
    var failed = 0;

    function onFail() {
      this.style.display = 'none';
      failed++;
      if (failed >= imgs.length) wrap.classList.add('ss-empty');
    }

    imgs.forEach(function (img) {
      img.addEventListener('error', onFail);
      // catch already-broken images (e.g. cached 404)
      if (img.complete && img.naturalWidth === 0) onFail.call(img);
    });
  });

  /* =============================================
     SCREENSHOT STRIP — DRAG TO SCROLL
     ============================================= */
  document.querySelectorAll('.proj-screenshots-strip').forEach(function (strip) {
    var isDown = false, startX, scrollLeft;

    strip.addEventListener('mousedown', function (e) {
      isDown = true;
      startX = e.pageX - strip.offsetLeft;
      scrollLeft = strip.scrollLeft;
    });
    strip.addEventListener('mouseleave', function () { isDown = false; });
    strip.addEventListener('mouseup',    function () { isDown = false; });
    strip.addEventListener('mousemove',  function (e) {
      if (!isDown) return;
      e.preventDefault();
      var x    = e.pageX - strip.offsetLeft;
      var walk = (x - startX) * 1.4;
      strip.scrollLeft = scrollLeft - walk;
    });
  });

  /* =============================================
     PROCESS LINE DRAW ANIMATION
     ============================================= */
  var processTrack = document.querySelector('.process-track');
  if (processTrack && 'IntersectionObserver' in window) {
    var lineObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('line-drawn');
          lineObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    lineObserver.observe(processTrack);
  } else if (processTrack) {
    processTrack.classList.add('line-drawn');
  }

})();

/* ── Scroll Progress Bar + Scroll To Top ── */
(function () {
  var bar    = document.getElementById('scrollProgressBar');
  var topBtn = document.getElementById('scrollTopBtn');
  window.addEventListener('scroll', function () {
    var scrolled = window.scrollY;
    var total    = document.documentElement.scrollHeight - window.innerHeight;
    if (bar) bar.style.width = (total > 0 ? (scrolled / total) * 100 : 0) + '%';
    if (topBtn) topBtn.classList.toggle('visible', scrolled > 400);
  }, { passive: true });
})();

/* ── Contact Form → WhatsApp (mobile) / Email (desktop) ── */
var EMAILJS_SERVICE_ID  = 'service_d1tujro';
var EMAILJS_TEMPLATE_ID = 'template_bftalzk';
var EMAILJS_PUBLIC_KEY  = '5ky8tFXZCS5Ft_G1f';

(function () {
  if (typeof emailjs !== 'undefined') {
    emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
  }

  var form      = document.getElementById('contact-form');
  var submitBtn = document.getElementById('submit-btn');
  var confirmEl = document.getElementById('confirm');
  if (!form) return;

  function showConfirm(msg, color) {
    if (!confirmEl) return;
    confirmEl.innerHTML = '<p style="color:' + color + ';margin-top:1rem;font-size:0.9rem;">' + msg + '</p>';
    setTimeout(function () { confirmEl.innerHTML = ''; }, 6000);
  }

  function isMobile() {
    return /Android|iPhone|iPad|iPod|Windows Phone/i.test(navigator.userAgent)
      || ('ontouchstart' in window && window.innerWidth <= 1024);
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var name    = (document.getElementById('f-name').value    || '').trim();
    var email   = (document.getElementById('f-email').value   || '').trim();
    var message = (document.getElementById('f-message').value || '').trim();
    if (!name || !email || !message) return;

    if (isMobile()) {
      /* ── Mobile: open WhatsApp ── */
      var text = encodeURIComponent(
        'Hi Bishnu! 👋\n\nName: ' + name + '\nEmail: ' + email + '\n\nMessage:\n' + message
      );
      window.open('https://wa.me/917735797841?text=' + text, '_blank');
      showConfirm('<i class="fas fa-check-circle"></i> Opening WhatsApp — your message is pre-filled!', 'var(--green)');
      form.reset();

    } else {
      /* ── Desktop: send email via EmailJS ── */
      if (typeof emailjs === 'undefined') {
        showConfirm('<i class="fas fa-times-circle"></i> Email service not loaded. Please try again.', '#ff6b6b');
        return;
      }
      if (submitBtn) { submitBtn.disabled = true; submitBtn.querySelector('span').textContent = 'Sending…'; }

      emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        from_name:  name,
        from_email: email,
        email:      email,
        message:    message,
        to_email:   'asishkumar95889@gmail.com'
      })
      .then(function () {
        showConfirm('<i class="fas fa-check-circle"></i> Message sent! I\'ll reply within 24 hours.', 'var(--green)');
        form.reset();
      })
      .catch(function () {
        showConfirm('<i class="fas fa-times-circle"></i> Failed to send. Please email me directly at asishkumar95889@gmail.com', '#ff6b6b');
      })
      .finally(function () {
        if (submitBtn) { submitBtn.disabled = false; submitBtn.querySelector('span').textContent = 'Send Message'; }
      });
    }
  });
})();

/* ── Let's Talk: WhatsApp on mobile, email on desktop ── */
function handleLetsTalk(e) {
  e.preventDefault();
  var isMobile = /Android|iPhone|iPad|iPod|Windows Phone/i.test(navigator.userAgent)
    || ('ontouchstart' in window && window.innerWidth <= 1024);
  if (isMobile) {
    var msg = encodeURIComponent('Hi Bishnu! I came across your portfolio and would love to connect.');
    window.open('https://wa.me/917735797841?text=' + msg, '_blank');
  } else {
    window.location.href = 'mailto:asishkumar95889@gmail.com'
      + '?subject=Opportunity%20for%20Bishnu%20Prasad%20Sandha'
      + '&body=Hi%20Bishnu%2C%0A%0AI%20came%20across%20your%20portfolio%20and%20would%20love%20to%20connect.%0A%0ARegards%2C';
  }
}
