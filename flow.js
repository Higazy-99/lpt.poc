/* ============================================================
   Hackify Prototype — Shared flow logic
   Flow (RTL كما في الفيغما):
   تسجيل دخول → المنصة/لوحة التحكم → مسارات → النهاية
   ============================================================ */
(function () {
  "use strict";

  /* ---------- Toast ---------- */
  const toast = document.getElementById("toast");
  let toastTimer = null;
  window.showToast = function (msg, kind) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.toggle("toast--success", kind === "success");
    toast.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 2600);
  };

  /* ---------- Generic data actions ---------- */
  document.addEventListener("click", function (e) {
    const t = e.target.closest("[data-toast],[data-scroll],[data-close],[data-goto]");
    if (!t) return;
    if (t.dataset.toast) { e.preventDefault(); showToast(t.dataset.toast); return; }
    if (t.dataset.goto) { e.preventDefault(); if (t.dataset.goto.startsWith("#")) smooth(t.dataset.goto); else location.href = t.dataset.goto; return; }
    if (t.dataset.scroll) {
      e.preventDefault();
      smooth("#" + t.dataset.scroll);
      // land the cursor in the first field of the target section (e.g. "قدم الأن" → signup form)
      const target = document.querySelector("#" + t.dataset.scroll);
      const field = target && target.querySelector("input:not([type=hidden]), select, textarea");
      if (field) setTimeout(() => field.focus({ preventScroll: true }), reduceMotion ? 0 : 320);
      return;
    }
    if (t.dataset.close) { e.preventDefault(); toggleOverlay(t.dataset.close, false); }
  });

  function smooth(sel) {
    const el = document.querySelector(sel);
    if (el) el.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
  }

  /* ---------- Overlays ---------- */
  function toggleOverlay(id, open) {
    const ov = document.getElementById(id);
    if (!ov) return;
    ov.classList.toggle("is-open", open == null ? !ov.classList.contains("is-open") : open);
  }

  /* ---------- Login (تسجيل دخول) ---------- */
  const loginBtn = document.getElementById("loginBtn");
  const loginOverlay = document.getElementById("loginOverlay");
  const loginSubmit = document.getElementById("loginSubmit");
  const loginError = document.getElementById("loginError");
  const tabs = document.querySelectorAll("[data-role]");
  let role = "user";

  if (loginBtn && loginOverlay) {
    let lastFocus = null;
    const focusables = () => Array.from(loginOverlay.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )).filter((el) => el.offsetParent !== null);

    function openOverlay() {
      lastFocus = document.activeElement;
      toggleOverlay("loginOverlay", true);
      const first = loginOverlay.querySelector("#loginEmail");
      if (first) first.focus();
    }
    function closeOverlay() {
      toggleOverlay("loginOverlay", false);
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }

    // show / hide password
    const eye = loginOverlay.querySelector("#loginEye");
    const pass = loginOverlay.querySelector("#loginPass");
    if (eye && pass) {
      const EYE = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 10s3.4-5.5 8-5.5S18 10 18 10s-3.4 5.5-8 5.5S2 10 2 10Z"/><circle cx="10" cy="10" r="2.4"/></svg>';
      const EYE_OFF = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3l14 14"/><path d="M7.2 5.2A8.6 8.6 0 0 0 2 10s3.4 5.5 8 5.5c1.2 0 2.3-.3 3.3-.8M9.9 4.9A7.6 7.6 0 0 1 10 4.8c4.6 0 8 5.2 8 5.2a15 15 0 0 1-2.4 2.9"/></svg>';
      eye.addEventListener("click", () => {
        const show = pass.type === "password";
        pass.type = show ? "text" : "password";
        eye.innerHTML = show ? EYE_OFF : EYE;
        eye.setAttribute("aria-pressed", show ? "true" : "false");
        eye.setAttribute("aria-label", show ? "إخفاء كلمة المرور" : "إظهار كلمة المرور");
      });
    }

    loginBtn.addEventListener("click", openOverlay);
    loginOverlay.addEventListener("click", (e) => { if (e.target === loginOverlay) closeOverlay(); });

    tabs.forEach((b) => b.addEventListener("click", () => {
      tabs.forEach((x) => x.classList.remove("is-active"));
      b.classList.add("is-active");
      role = b.dataset.role;
      const email = document.getElementById("loginEmail");
      email.value = role === "admin" ? "admin@lpt.sa" : "user@lpt.sa";
      loginError && (loginError.classList.remove("is-shown"));
    }));

    loginSubmit && loginSubmit.addEventListener("click", () => {
      const email = document.getElementById("loginEmail").value.trim();
      const pass = document.getElementById("loginPass").value.trim();
      if (!email || !pass) {
        if (loginError) {
          loginError.textContent = "الرجاء إدخال البريد الإلكتروني وكلمة المرور";
          loginError.classList.add("is-shown");
        }
        return;
      }
      closeOverlay();
      loginBtn.style.display = "none";
      const hi = document.createElement("div");
      hi.textContent = role === "admin" ? "أهلاً بك مرة أخرى، إدارة المنصة" : "أهلاً بك مرة أخرى";
      hi.style.cssText = "color:#fff;font-weight:700;font-size:16px;background:#0f2837;border:1px solid rgba(255,255,255,.2);padding:12px 24px;border-radius:4px;white-space:nowrap";
      loginBtn.parentNode.insertBefore(hi, loginBtn);
      const remember = document.getElementById("loginRemember");
      sessionStorage.setItem("lpt-role", role);
      sessionStorage.setItem("lpt-remember", remember && remember.checked ? "1" : "0");
      showToast(
        role === "admin"
          ? "تم تسجيل الدخول — لوحة التحكم غير متاحة في هذا النموذج"
          : "تم تسجيل الدخول بنجاح",
        "success"
      );
    });

    document.addEventListener("keydown", (e) => {
      if (!loginOverlay.classList.contains("is-open")) return;
      if (e.key === "Escape") { closeOverlay(); return; }
      if (e.key !== "Tab") return;
      const items = focusables();          // focus trap inside the dialog
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
  }

  /* ---------- Shared dropdown menu (zoom-aware positioning) ----------
     The canvas is scaled with `zoom`, so getBoundingClientRect() returns scaled
     pixels while absolute positioning inside the zoomed root expects CSS pixels. */
  window.LPTMenu = function (trigger, items, onSelect, options) {
    options = options || {};
    var zoom = parseFloat(getComputedStyle(document.documentElement).zoom) || 1;
    var menu = document.createElement("div");
    menu.className = "kb-menu";
    menu.setAttribute("role", "menu");
    menu.style.cssText = "position:absolute;background:#fff;border:1px solid #E7E9EB;border-radius:4px;z-index:120;" +
      "box-shadow:0 8px 24px rgba(15,40,55,.12);padding:6px 0;min-width:" + (options.minWidth || 170) + "px";
    document.body.appendChild(menu);

    var r = trigger.getBoundingClientRect();
    menu.style.left = (r.left / zoom) + "px";
    menu.style.top = ((r.bottom + 8) / zoom) + "px";

    var buttons = [];
    items.forEach(function (item) {
      var label = typeof item === "string" ? item : item.label;
      var value = typeof item === "string" ? item : item.value;
      var it = document.createElement("button");
      it.type = "button";
      it.className = "kb-menu__item";
      it.setAttribute("role", "menuitem");
      it.textContent = label;
      it.style.cssText = "display:block;width:100%;background:none;border:0;padding:10px 20px;" +
        "font-family:var(--font-effra);font-size:14px;color:#0F2837;cursor:pointer;text-align:right;direction:rtl";
      it.onfocus = it.onmouseenter = function () { it.style.background = "#FDEEEB"; };
      it.onblur = it.onmouseleave = function () { it.style.background = ""; };
      it.onclick = function () { close(); onSelect && onSelect(value, label); };
      buttons.push(it);
      menu.appendChild(it);
    });

    function close() {
      menu.remove();
      trigger.setAttribute("aria-expanded", "false");
      trigger.focus();
    }

    trigger.setAttribute("aria-haspopup", "menu");
    trigger.setAttribute("aria-expanded", "true");
    buttons[0] && buttons[0].focus();

    menu.addEventListener("keydown", function (ev) {
      var idx = buttons.indexOf(document.activeElement);
      if (ev.key === "ArrowDown") { ev.preventDefault(); buttons[(idx + 1) % buttons.length].focus(); }
      if (ev.key === "ArrowUp") { ev.preventDefault(); buttons[(idx - 1 + buttons.length) % buttons.length].focus(); }
      if (ev.key === "Escape") { ev.preventDefault(); close(); }
    });

    setTimeout(function () {
      document.addEventListener("click", function h(ev) {
        if (!menu.contains(ev.target) && ev.target !== trigger) { close(); document.removeEventListener("click", h); }
      });
    }, 10);

    return close;
  };

  /* ---------- Language switcher (EN / العربية) ---------- */
  const langs = document.querySelectorAll(".nav__lang");
  langs.forEach((lang) => {
    lang.setAttribute("role", "button");
    lang.setAttribute("tabindex", "0");
    const openMenu = () => {
      window.LPTMenu(lang, [
        { label: "EN", value: "en" },
        { label: "العربية", value: "ar" }
      ], (code) => {
        lang.childNodes[0].nodeValue = code === "ar" ? "ع " : "EN ";
        document.documentElement.setAttribute("lang", code === "ar" ? "ar" : "en");
        showToast(code === "ar" ? "تم التبديل إلى العربية" : "Switched to English");
      }, { minWidth: 120 });
    };
    lang.addEventListener("click", openMenu);
    lang.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openMenu(); } });
  });

  /* ---------- Stories pager (18:1851) ---------- */
  const row = document.getElementById("storiesRow");
  const next = document.getElementById("storiesNext");
  const prev = document.getElementById("storiesPrev") || document.querySelector(".stories__prev");
  let shift = 0;
  function applyShift() { if (row) row.style.transform = "translateX(" + shift + "px)"; }
  next && next.addEventListener("click", () => { shift = Math.max(shift - 501, -1500); applyShift(); });
  prev && prev.addEventListener("click", () => { shift = Math.min(shift + 501, 0); applyShift(); });

  /* ---------- Fit 1920px canvas to the real viewport ----------
     The design is a fixed 1920px desktop canvas; when the window is
     smaller we zoom the whole page down to fit (no horizontal scroll). */
  function fitZoom() {
    const w = document.documentElement.clientWidth;
    // never shrink the text below ~50% (WCAG 1.4.4) — below that the canvas scrolls instead
    const z = Math.max(0.5, Math.min(1, w / 1920));
    document.documentElement.style.zoom = z < 1 ? z.toFixed(4) : "";
  }
  fitZoom();
  window.addEventListener("resize", fitZoom);

  /* ---------- Smooth scroll (respects reduced motion) ---------- */
  const reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Page entrance ---------- */
  document.body.style.opacity = 0;
  document.body.style.transition = "opacity .3s ease";
  requestAnimationFrame(() => requestAnimationFrame(() => { document.body.style.opacity = 1; }));
})();
