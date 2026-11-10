// ============================================================
// Course View (18:5319) — curriculum accordion
// ============================================================
(function () {
  // Exact content from the Figma design context (18:5871 → 18:5936)
  var WEEKS = [
    {
      n: 1, title: 'الاسبوع الأول - مرحبًا بك في عالم الترجمة', open: true,
      lessons: [
        { d: '19 دقيقة', t: 'ما هي الترجمة؟', i: 'assets/e216d.svg' },
        { d: '19 دقيقة', t: 'كلمة هنا وكلمة هناك', i: 'assets/b9fd9.svg' },
        { d: '19 دقيقة', t: 'مغامرة الكلمات الأولى', i: 'assets/6845c.svg' }
      ]
    },
    { n: 2, title: 'الاسبوع الثاني - نتعلّم ونلعب', open: false, lessons: [
      { d: '19 دقيقة', t: 'لعبة المفردات', i: 'assets/e216d.svg' },
      { d: '19 دقيقة', t: 'مختبر الكلمات', i: 'assets/b9fd9.svg' },
      { d: '19 دقيقة', t: 'تحدّي الحرف الأول', i: 'assets/6845c.svg' }
    ] },
    { n: 3, title: 'الاسبوع الثالث - نترجم مع القصص', open: false, lessons: [
      { d: '19 دقيقة', t: 'قصة قصيرة', i: 'assets/e216d.svg' },
      { d: '19 دقيقة', t: 'حكاية ودردشة', i: 'assets/b9fd9.svg' },
      { d: '19 دقيقة', t: 'اختبر فهمك', i: 'assets/6845c.svg' }
    ] },
    { n: 4, title: 'الاسبوع الرابع -  نلعب ونراجع', open: false, lessons: [
      { d: '19 دقيقة', t: 'مراجعة سريعة', i: 'assets/e216d.svg' },
      { d: '19 دقيقة', t: 'لعبة المراجعة', i: 'assets/b9fd9.svg' },
      { d: '19 دقيقة', t: 'تحدّي الأسبوع', i: 'assets/6845c.svg' }
    ] },
    { n: 5, title: 'الاسبوع الخامس -  🎁 المكافآت والأنشطة الإضافية', open: false, lessons: [
      { d: '19 دقيقة', t: 'شارة الإنجاز', i: 'assets/e216d.svg' },
      { d: '19 دقيقة', t: 'مهمة صغيرة', i: 'assets/b9fd9.svg' },
      { d: '19 دقيقة', t: 'نشاط إضافي', i: 'assets/6845c.svg' }
    ] },
    { n: 6, title: 'الاسبوع السادس - نترجم مع القصص', open: false, lessons: [
      { d: '19 دقيقة', t: 'قصة طويلة', i: 'assets/e216d.svg' },
      { d: '19 دقيقة', t: 'حوار بين ثقافتين', i: 'assets/b9fd9.svg' },
      { d: '19 دقيقة', t: 'مشروع صغير', i: 'assets/6845c.svg' }
    ] },
    { n: 7, title: 'الاسبوع السابع - نتعلّم ونلعب', open: false, lessons: [
      { d: '19 دقيقة', t: 'لعبة الشمس', i: 'assets/e216d.svg' },
      { d: '19 دقيقة', t: 'مختبر النطق', i: 'assets/b9fd9.svg' },
      { d: '19 دقيقة', t: 'احتفال التعلم', i: 'assets/6845c.svg' }
    ] }
  ];

  var curric = document.getElementById('cvCurric');
  if (!curric) return;

  WEEKS.forEach(function (w, idx) {
    var week = document.createElement('div');
    week.className = 'cv-week' + (w.open ? ' is-open' : '');

    // header
    var head = document.createElement('button');
    head.type = 'button';
    head.className = 'cv-week__head';
    head.setAttribute('aria-expanded', w.open ? 'true' : 'false');

    var chev = document.createElement('span');
    chev.className = 'cv-chev';
    chev.setAttribute('aria-hidden', 'true');
    chev.innerHTML = '<img src="' + (w.open ? 'assets/9edda.svg' : 'assets/6c7b9.svg') + '" alt="">';

    var right = document.createElement('div');
    right.className = 'cv-week__title';
    var t = document.createElement('p');
    t.className = 'cv-week__t'; t.textContent = w.title;
    var num = document.createElement('span');
    num.className = 'cv-week__num' + (w.open ? ' cv-week__num--active' : '');
    num.textContent = w.n;
    right.appendChild(t); right.appendChild(num);

    head.appendChild(chev);
    head.appendChild(right);
    week.appendChild(head);

    // lessons
    if (w.lessons.length) {
      var body = document.createElement('div');
      body.className = 'cv-week__body';
      var inner = document.createElement('div');
      inner.className = 'cv-week__inner';
      body.appendChild(inner);
      w.lessons.forEach(function (l) {
        var row = document.createElement('div');
        row.className = 'cv-lesson';
        var d = document.createElement('span');
        d.className = 'cv-lesson__d'; d.textContent = l.d;
        var dot = document.createElement('span');
        dot.className = 'cv-lesson__dot';
        var lt = document.createElement('span');
        lt.className = 'cv-lesson__t'; lt.textContent = l.t;
        var ico = document.createElement('span');
        ico.className = 'cv-lesson__ico';
        ico.innerHTML = '<img src="' + l.i + '" alt="">';
        row.appendChild(d); row.appendChild(dot); row.appendChild(lt); row.appendChild(ico);
        inner.appendChild(row);
      });
      week.appendChild(body);
    }

    curric.appendChild(week);

    // divider between weeks (18:5895 / 18:5902 ...)
    if (idx < WEEKS.length - 1) {
      var rule = document.createElement('div');
      rule.className = 'cv-rule';
      curric.appendChild(rule);
    }
  });

  // Toggle week open/closed
  curric.addEventListener('click', function (ev) {
    var head = ev.target.closest('.cv-week__head');
    if (!head) return;
    var week = head.parentNode;
    var open = week.classList.toggle('is-open');
    var chev = head.querySelector('.cv-chev img');
    var num = head.querySelector('.cv-week__num');
    if (chev) chev.src = open ? 'assets/9edda.svg' : 'assets/6c7b9.svg';
    head.setAttribute('aria-expanded', open ? 'true' : 'false');
    if (num) num.classList.toggle('cv-week__num--active', open);
  });

  // Video preview button
  var play = document.getElementById('cvPlay');
  if (play) play.addEventListener('click', function () {
    window.showToast && showToast('الفيديو التعريفي متاح على المنصة الحقيقية');
  });
})();
