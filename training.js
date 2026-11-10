// ============================================================
// Training Center (18:4625) — cards, filters, interactivity
// ============================================================
(function () {
  var BASE = ['assets/d8f80.jpg', 'assets/4d83b.jpg', 'assets/58c63.jpg'];
  var GRAD_CLASS = 'tc-art__grad';

  // Exact content from the Figma design context (18:5140 → 18:5268)
  var CARDS = [
    { top: 'assets/08df8.jpg', topBeforeGrad: false, level: 'متوسط',
      t: 'مصدر الخبرة والمعرفة في صناعة اللغة',
      e: 'اكتشف مقالات وأبحاث وأدلة متخصصة في مجالات النشر، الترجمة، وتطوير المحتوى، يقدمها محترفون وخبراء في الصناعة اللغوية.' },
    { top: 'assets/a319e.jpg', topBeforeGrad: false, level: 'متوسط',
      t: 'تحسين جودة النصوص المترجمة',
      e: 'تعلم مهارات المراجعة والتحرير اللغوي لتحسين دقة الترجمة وجودة الأسلوب، مع تطبيقات عملية وأمثلة واقعية من سوق العمل.' },
    { top: 'assets/b3a12.png', topBeforeGrad: true, level: 'مبتدئ',
      t: 'أساسيات الترجمة الاحترافية',
      e: 'دورة شاملة تغطي أهم مبادئ الترجمة من الإنجليزية إلى العربية، مع تدريبات عملية على نصوص متنوعة في المجالات الأدبية والتقنية' },
    { top: null, topBeforeGrad: false, level: 'متقدم',
      t: 'طوّر مهاراتك ووسّع آفاقك في صناعة اللغة',
      e: 'برامج تدريبية مصممة لدعم المترجمين والناشرين والمبدعين، تجمع بين المعرفة النظرية والتطبيق العملي باستخدام أدوات الذكاء الاصطناعي' },
    { top: 'assets/a319e.jpg', topBeforeGrad: false, level: 'متوسط',
      t: 'تحسين جودة النصوص المترجمة',
      e: 'تعلم مهارات المراجعة والتحرير اللغوي لتحسين دقة الترجمة وجودة الأسلوب، مع تطبيقات عملية وأمثلة واقعية من سوق العمل.' },
    { top: null, topBeforeGrad: false, level: 'متقدم',
      t: 'طوّر مهاراتك ووسّع آفاقك في صناعة اللغة',
      e: 'برامج تدريبية مصممة لدعم المترجمين والناشرين والمبدعين، تجمع بين المعرفة النظرية والتطبيق العملي باستخدام أدوات الذكاء الاصطناعي' },
    { top: 'assets/b3a12.png', topBeforeGrad: true, level: 'مبتدئ',
      t: 'أساسيات الترجمة الاحترافية',
      e: 'دورة شاملة تغطي أهم مبادئ الترجمة من الإنجليزية إلى العربية، مع تدريبات عملية على نصوص متنوعة في المجالات الأدبية والتقنية' },
    { top: 'assets/08df8.jpg', topBeforeGrad: false, level: 'متوسط',
      t: 'مصدر الخبرة والمعرفة في صناعة اللغة',
      e: 'اكتشف مقالات وأبحاث وأدلة متخصصة في مجالات النشر، الترجمة، وتطوير المحتوى، يقدمها محترفون وخبراء في الصناعة اللغوية.' }
  ];

  function art(card) {
    var el = document.createElement('div');
    el.className = 'tc-art';
    BASE.forEach(function (src) {
      var img = document.createElement('img');
      img.src = src; img.alt = '';
      el.appendChild(img);
    });
    if (card.top && card.topBeforeGrad) {
      var t1 = document.createElement('img');
      t1.src = card.top; t1.alt = '';
      el.appendChild(t1);
    }
    var g = document.createElement('div');
    g.className = GRAD_CLASS;
    el.appendChild(g);
    if (card.top && !card.topBeforeGrad) {
      var t2 = document.createElement('img');
      t2.src = card.top; t2.alt = '';
      el.appendChild(t2);
    }
    return el;
  }

  function card(card) {
    var c = document.createElement('article');
    c.className = 'tc-card';
    c.setAttribute('data-title', card.t);
    c.setAttribute('data-level', card.level || 'مبتدئ – متوسط');

    var artCol = document.createElement('div');
    artCol.style.cssText = 'display:flex;flex-direction:column;gap:24px;align-items:flex-end;justify-content:center;width:100%';
    artCol.appendChild(art(card));

    var txt = document.createElement('div');
    txt.className = 'tc-card__txt';
    var t = document.createElement('p');
    t.className = 'tc-card__t'; t.textContent = card.t;
    var e = document.createElement('p');
    e.className = 'tc-card__e'; e.textContent = card.e;
    txt.appendChild(t); txt.appendChild(e);
    artCol.appendChild(txt);
    c.appendChild(artCol);

    // bottom: meta + CTA
    var bottom = document.createElement('div');
    bottom.className = 'tc-card__bottom';

    var meta = document.createElement('div');
    meta.className = 'tc-meta';
    var seg1 = document.createElement('div');
    seg1.className = 'tc-meta__seg';
    var hours = document.createElement('p');
    hours.className = 'tc-meta__txt'; hours.textContent = '6 ساعات تدريبية';
    var clock = document.createElement('span');
    clock.className = 'tc-meta__clock';
    clock.innerHTML = '<img src="assets/ecf42.svg" alt="">';
    seg1.appendChild(hours); seg1.appendChild(clock);

    var bar = document.createElement('p');
    bar.className = 'tc-meta__bar'; bar.textContent = '|';

    var seg2 = document.createElement('div');
    seg2.className = 'tc-meta__seg';
    var level = document.createElement('p');
    level.className = 'tc-meta__txt'; level.textContent = 'مبتدئ – متوسط';
    seg2.appendChild(level);

    var badge = document.createElement('span');
    badge.className = 'tc-level';
    badge.innerHTML = '<img src="assets/1c5d1.svg" alt="">';

    meta.appendChild(seg1); meta.appendChild(bar);
    meta.appendChild(seg2); meta.appendChild(badge);
    bottom.appendChild(meta);

    var cta = document.createElement('button');
    cta.className = 'tc-cta';
    cta.textContent = 'ابدأ الأن';
    cta.setAttribute('data-goto', 'course.html');
    bottom.appendChild(cta);

    c.appendChild(bottom);
    return c;
  }

  var grid = document.getElementById('tcGrid');
  // Two rows of four (18:5139 / 18:5213)
  [0, 1].forEach(function (r) {
    var row = document.createElement('div');
    row.className = 'tc-row';
    CARDS.slice(r * 4, r * 4 + 4).forEach(function (d) {
      row.appendChild(card(d));
    });
    grid.appendChild(row);
  });

  // Navigation handled by flow.js (data-goto → course.html)

  // ---- Live search (same behavior pattern as Knowledge Center) ----
  var search = document.getElementById('tcSearch');
  if (search) {
    search.addEventListener('input', function () {
      var q = search.value.trim();
      document.querySelectorAll('.tc-card').forEach(function (c) {
        var hit = !q || c.getAttribute('data-title').indexOf(q) !== -1;
        c.style.display = hit ? '' : 'none';
      });
    });
  }

  // ---- Filter / sort chips ----
  var sortBtn = document.getElementById('sortBtn');
  if (sortBtn) sortBtn.addEventListener('click', function () {
    window.showToast && showToast('سيتم إضافة الترتيب في النسخة الكاملة');
  });

  // Level filter dropdown — shared, zoom-aware menu
  var levelBtn = document.getElementById('levelBtn');
  if (levelBtn) {
    levelBtn.addEventListener('click', function () {
      window.LPTMenu(levelBtn, ['الكل', 'مبتدئ', 'متوسط', 'متقدم'], function (v) {
        document.querySelectorAll('.tc-card').forEach(function (c) {
          c.style.display = (v === 'الكل' || c.getAttribute('data-level').indexOf(v) !== -1) ? '' : 'none';
        });
        window.showToast && showToast('المستوى: ' + v);
      }, { minWidth: 160 });
    });
  }

  // Sort dropdown
  var sortBtn = document.getElementById('sortBtn');
  if (sortBtn) {
    sortBtn.addEventListener('click', function () {
      window.LPTMenu(sortBtn, ['الأحدث أولاً', 'الأقدم أولاً', 'الافتراضي'], function (v) {
        var rows = Array.prototype.slice.call(grid.querySelectorAll('.tc-row'));
        var all = [];
        rows.forEach(function (r) { all = all.concat(Array.prototype.slice.call(r.children)); });
        var groups = [];
        for (var i = 0; i < all.length; i += 4) groups.push(all.slice(i, i + 4));
        var ordered = v === 'الأقدم أولاً' ? groups.reverse() : groups;
        grid.innerHTML = '';
        ordered.forEach(function (g) {
          var r = document.createElement('div');
          r.className = 'tc-row';
          g.forEach(function (c) { r.appendChild(c); });
          grid.appendChild(r);
        });
        window.showToast && showToast('الترتيب: ' + v);
      }, { minWidth: 180 });
    });
  }

})();
