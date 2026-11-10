/* ============================================================
   Shared chat widget — the FAB opens the assistant panel INSIDE
   the current page (no navigation). Used on every screen.
   ============================================================ */
(function () {
  "use strict";

  var QUESTIONS = [
    "هل توجد سياسة خاصة بالنشر أو المحتوى؟",
    "أين أجد سياسات استخدام منصة LPT؟",
    "كيف أبلغ عن محتوى مخالف أو ترجمة غير دقيقة؟"
  ];

  var ANSWER = 'نعم، منصة LPT تحتوي على سياسة النشر والمحتوى الثقافي التي توضّح آلية اعتماد المواد المنشورة وحقوق المؤلفين.';

  function panelMarkup() {
    return '' +
      '<div class="cb-panel__deco"><img src="assets/fc762.svg" alt=""></div>' +
      '<div class="cb-head">' +
        '<div class="cb-head__tools">' +
          '<button type="button" class="cb-head__tool" data-chat-close aria-label="إغلاق"><img src="assets/14ab1.svg" alt=""></button>' +
          '<button type="button" class="cb-head__tool" data-chat-expand aria-label="توسيع" aria-expanded="false"><img src="assets/cae68.svg" alt=""></button>' +
        '</div>' +
        '<div class="cb-head__title">' +
          '<h2 class="cb-head__t" id="cbTitle">المساعد الذكي</h2>' +
          '<span class="cb-head__av"><img src="assets/b49fa.svg" alt=""></span>' +
        '</div>' +
      '</div>' +
      '<div class="cb-intro" data-chat-intro>' +
        '<span class="cb-intro__ico"><img src="assets/ca891.svg" alt=""></span>' +
        '<p class="cb-intro__t">اسأل عن أي شئ تريد</p>' +
      '</div>' +
      '<div class="cb-questions" data-chat-questions>' +
        QUESTIONS.map(function (q) {
          return '<button class="cb-question" data-q="' + q + '">' + q + '</button>';
        }).join('') +
      '</div>' +
      '<div class="cb-thread" data-chat-thread role="log" aria-live="polite" aria-relevant="additions" aria-atomic="false"></div>' +
      '<div class="cb-input-row">' +
        '<button class="cb-send" data-chat-send aria-label="إرسال"><img src="assets/3f82b.svg" alt=""></button>' +
        '<label class="sr-only" for="cbInputWidget">اكتب رسالتك للمساعد الذكي</label>' +
        '<input class="cb-input" id="cbInputWidget" data-chat-input type="text" placeholder="اكتب هنا...">' +
      '</div>';
  }

  function buildPanel() {
    var panel = document.createElement('section');
    panel.className = 'cb-panel is-widget is-hidden';
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-modal', 'false');
    panel.setAttribute('aria-labelledby', 'cbTitle');
    panel.setAttribute('data-chat-panel', '');
    panel.innerHTML = panelMarkup();
    document.body.appendChild(panel);
    return panel;
  }

  function buildFab() {
    var wrap = document.createElement('div');
    wrap.className = 'chatbot-launch';
    wrap.innerHTML =
      '<a class="chatbot-fab" href="#" data-chat-fab aria-label="المساعد الذكي"><img src="assets/63ad9.svg" alt=""></a>' +
      '<div class="chatbot-label"><img class="tail" src="assets/5a200.svg" alt="">كيف يمكننا مساعدتك؟</div>';
    document.body.appendChild(wrap);
    return wrap;
  }

  var panel = document.querySelector('[data-chat-panel]') || buildPanel();
  var launch = document.querySelector('[data-chat-fab]');
  var fabWrap = launch ? launch.closest('.chatbot-launch') : buildFab();

  if (launch && launch.tagName === "A") {
    // replace the navigation link with a button that toggles the panel
    var btn = document.createElement('button');
    btn.className = 'chatbot-fab';
    btn.setAttribute('data-chat-fab', '');
    btn.setAttribute('aria-label', 'المساعد الذكي');
    btn.innerHTML = launch.innerHTML;
    launch.replaceWith(btn);
    launch = btn;
    fabWrap = btn.closest('.chatbot-launch');
  }

  var intro = panel.querySelector('[data-chat-intro]');
  var questions = panel.querySelector('[data-chat-questions]');
  var thread = panel.querySelector('[data-chat-thread]');
  var input = panel.querySelector('[data-chat-input]');
  var send = panel.querySelector('[data-chat-send]');
  var close = panel.querySelector('[data-chat-close]');
  var expand = panel.querySelector('[data-chat-expand]');

  function botReply(text) {
    var row = document.createElement('div');
    row.className = 'cb-msg cb-msg--bot';
    var bubble = document.createElement('div');
    bubble.className = 'cb-msg__bubble';
    bubble.textContent = text;
    var av = document.createElement('span');
    av.className = 'cb-msg__av';
    av.innerHTML = '<img src="assets/27f83.png" alt="">';
    row.appendChild(bubble);
    row.appendChild(av);
    thread.appendChild(row);
  }

  function ask(question) {
    if (!question) return;
    if (intro) intro.style.display = 'none';
    if (questions) questions.style.display = 'none';

    var msg = document.createElement('div');
    msg.className = 'cb-msg cb-msg--user';
    msg.textContent = question;
    thread.appendChild(msg);
    if (input) input.value = '';

    setTimeout(function () { botReply(ANSWER); }, 650);
  }

  questions && questions.addEventListener('click', function (e) {
    var q = e.target.closest('.cb-question');
    if (q) ask(q.getAttribute('data-q'));
  });
  send && send.addEventListener('click', function () { ask(input && input.value.trim()); });
  input && input.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') ask(input.value.trim());
  });

  close && close.addEventListener('click', function () {
    panel.classList.add('is-hidden');
  });

  expand && expand.addEventListener('click', function () {
    var open = panel.classList.toggle('is-expanded');
    expand.setAttribute('aria-expanded', open ? 'true' : 'false');
    expand.setAttribute('aria-label', open ? 'تصغير المحادثة' : 'توسيع المحادثة');
  });

  launch && launch.addEventListener('click', function (e) {
    e.preventDefault();
    panel.classList.toggle('is-hidden');
  });

  // FAB label opens the panel too
  var label = fabWrap && fabWrap.querySelector('.chatbot-label');
  label && label.addEventListener('click', function (e) {
    e.preventDefault();
    panel.classList.remove('is-hidden');
  });

  window.LPTChat = { open: function () { panel.classList.remove('is-hidden'); }, close: function () { panel.classList.add('is-hidden'); }, ask: ask };
})();
