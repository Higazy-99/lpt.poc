/* Knowledge Center page — cards data from Figma 18:3841..18:4590 */
(function () {
  "use strict";

  const cardTypes = {
    A: {
      artClass: "kb-art--f0e8ec",
      title: "كيف يغيّر الذكاء الاصطناعي مستقبل الترجمة المهنية",
      mini: true,
      excerpt: ["تحليل لأحدث أدوات الذكاء الاصطناعي وتأثيرها على المترجمين، مع نصائح", "حول كيفية التكيّف والاستفادة منها في بيئة العمل الحديثة."],
      nowrap: true,
      cat: "ترجمة وتقنيات", catColor: "#0F2837", icon: "24a98.svg"
    },
    B: {
      artClass: "kb-art--f4f8f8",
      layerFile: "5c3e4.svg",
      title: "أفضل ممارسات النشر الرقمي للمحتوى العربي",
      excerpt: ["تحليل لأحدث أدوات الذكاء الاصطناعي وتأثيرها على المترجمين، مع نصائح حول كيفية التكيّف والاستفادة منها في بيئة العمل الحديثة."],
      cat: "نشر رقمي", catColor: "#6E1946", icon: "f8026.svg"
    },
    C: {
      artClass: "kb-art--f0e8ec",
      title: "كيف يغيّر الذكاء الاصطناعي مستقبل الترجمة المهنية",
      mini: true,
      excerpt: ["تحليل لأحدث أدوات الذكاء الاصطناعي وتأثيرها على المترجمين، مع نصائح", "حول كيفية التكيّف والاستفادة منها في بيئة العمل الحديثة."],
      nowrap: true,
      cat: "ترجمة وتقنيات", catColor: "#0F2837", icon: "24a98.svg"
    },
    D: {
      artClass: "kb-art--fdeeeb",
      feather: true,
      title: "مصدر الخبرة والمعرفة في صناعة اللغة",
      excerpt: ["اكتشف مقالات وأبحاث وأدلة متخصصة في مجالات النشر، الترجمة، وتطوير المحتوى، يقدمها محترفون وخبراء في الصناعة اللغوية."],
      cat: "ترجمة وتقنيات", catColor: "#0F2837", icon: "24a98.svg"
    }
  };

  const layerByRow = ["5c3e4.svg", "ea605.svg", "72076.svg"];
  const rows = [
    ["A", "B", "C", "D"],
    ["B", "A", "D", "C"],
    ["B", "A", "D", "C"]
  ];

  function el(tag, cls, txt) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (txt) e.textContent = txt;
    return e;
  }

  /* Feather/OBJECTS group art (18:3994..) — exact insets from the design context */
  const FEATHER = [
    ["cb50f.svg", "60.3% 2.45% 37.71% 0"],
    ["f8764.svg", "79.29% 6.44% 10.17% 59.13%"],
    ["05a6b.svg", "53.69% 15.25% 40.87% 69.21%"],
    ["86b31.svg", "0 5.28% 16.65% 70.03%"],
    ["39681.svg", "57.48% 9.62% 13.33% 64.22%"],
    ["4c5c4.svg", "66.81% 9.62% 13.33% 64.22%"],
    ["9f23e.svg", "57.64% 16.28% 40.73% 69.87%"],
    ["2e5d0.svg", "30.68% 23.87% 6.13% 0.08%"],
    ["06fdd.svg", "91.49% 25.73% 4.56% 57.39%"],
    ["a2cab.svg", "97.85% 43.38% 0 49.02%"],
    ["17d97.svg", "94.18% 54.99% 4.4% 43.12%"],
    ["ea62b.svg", "4.17% 0 45.03% 5.44%"]
  ];

  function buildArt(type, t, rowIdx) {
    const art = el("div", "kb-art " + t.artClass);
    if (type === "A") {
      const c = el("div", "kb-art__c");
      c.style.cssText = "width:197.332px;height:268.338px;left:calc(50% + 0.33px);top:17px";
      const img = el("img"); img.alt = ""; img.src = "assets/6c4d3.svg"; c.appendChild(img);
      art.appendChild(c);
    } else if (type === "C") {
      const c = el("div", "kb-art__c");
      c.style.cssText = "width:197.332px;height:268.338px;left:calc(50% + 0.33px);top:17px";
      const img = el("img"); img.alt = ""; img.src = "assets/13c23.svg"; c.appendChild(img);
      art.appendChild(c);
    } else if (type === "B") {
      const c = el("div", "kb-art__c");
      c.style.cssText = "width:256.668px;height:225.091px;left:calc(50% - 10.33px);top:0";
      const img = el("img"); img.alt = ""; img.src = "assets/" + layerByRow[rowIdx]; c.appendChild(img);
      art.appendChild(c);
    } else if (type === "D") {
      const c = document.createElement("div");
      c.style.cssText = "position:absolute;transform:translateX(-50%);left:calc(50% - 10.33px);top:-91px;width:298px;height:299.497px;overflow:hidden";
      FEATHER.forEach(([f, inset]) => {
        const img = el("img");
        img.style.cssText = "position:absolute;inset:" + inset + ";width:100%;height:100%;object-fit:cover";
        img.alt = "";
        img.src = "assets/" + f;
        c.appendChild(img);
      });
      art.appendChild(c);
    }
    return art;
  }

  function buildCard(type, rowIdx) {
    const t = cardTypes[type];
    const card = el("div", "kb-card");
    card.setAttribute("role", "button");
    card.setAttribute("tabindex", "0");
    card.setAttribute("aria-label", "افتح: " + t.title);
    card.addEventListener("keydown", function (ev) {
      if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); card.click(); }
    });
    card.addEventListener("click", function () { showToast('المقال متاح على المنصة الحقيقية'); });
    const artcol = el("div", "kb-card__artcol");
    artcol.appendChild(buildArt(type, t, rowIdx));
    const txt = el("div", "kb-card__txt");
    txt.appendChild(el("p", "kb-card__t" + (t.mini ? " kb-card__t--min" : ""), t.title));
    if (t.nowrap) {
      const e = el("p", "kb-card__e kb-card__e--nowrap");
      e.innerHTML = t.excerpt[0] + "<br>" + t.excerpt[1];
      txt.appendChild(e);
    } else {
      txt.appendChild(el("p", "kb-card__e", t.excerpt[0]));
    }
    artcol.appendChild(txt);
    card.appendChild(artcol);

    const foot = el("div", "kb-card__foot");
    foot.appendChild(el("span", "kb-card__cat", t.cat));
    const ico = el("div", "kb-ico");
    ico.style.background = t.catColor;
    const sym = el("div", "kb-ico__sym");
    const img = el("img"); img.alt = ""; img.src = "assets/" + t.icon;
    sym.appendChild(img); ico.appendChild(sym);
    foot.appendChild(ico);
    card.appendChild(foot);
    return card;
  }

  const grid = document.getElementById("kbGrid");
  rows.forEach((row, ri) => {
    const rowEl = el("div", "kb-row");
    row.forEach((type) => rowEl.appendChild(buildCard(type, ri)));
    grid.appendChild(rowEl);
  });

  /* Search filter (flow: يبحث عن دليل/سياسة/موضوع) */
  const search = document.getElementById("kbSearch");
  search && search.addEventListener("input", () => {
    const q = search.value.trim();
    let visible = 0;
    document.querySelectorAll(".kb-card").forEach((c) => {
      const match = !q || c.textContent.includes(q);
      c.style.display = match ? "" : "none";
      if (match) visible++;
    });
    let rowsEl = document.querySelectorAll(".kb-row");
    rowsEl.forEach((r) => {
      const any = [...r.querySelectorAll(".kb-card")].some((c) => c.style.display !== "none");
      r.style.display = any ? "" : "none";
    });
    if (q && !visible) showToast("لا توجد نتائج مطابقة لبحثك");
  });

  /* Sort toggle */
  const sortBtn = document.getElementById("sortBtn");
  let rev = false;
  sortBtn && sortBtn.addEventListener("click", () => {
    rev = !rev;
    const rowsEl = [...document.querySelectorAll(".kb-row")];
    const packed = [];
    rowsEl.forEach((r) => { packed.push([...r.children]); });
    const all = packed.flat();
    grid.innerHTML = "";
    for (let i = 0; i < all.length; i += 4) {
      const r = el("div", "kb-row");
      const group = all.slice(i, i + 4);
      if (rev) group.forEach((c) => c.style.display = "");
      (rev ? group.reverse() : group).forEach((c) => r.appendChild(c));
      grid.appendChild(r);
    }
    showToast(rev ? "تم الترتيب: الأحدث أولاً" : "تم الترتيب: الافتراضي");
  });

  /* Type filter dropdown — shared, zoom-aware menu */
  const typeBtn = document.getElementById("typeBtn");
  typeBtn && typeBtn.addEventListener("click", () => {
    window.LPTMenu(typeBtn, ["الكل", "ترجمة وتقنيات", "نشر رقمي"], (v) => {
      document.querySelectorAll(".kb-card").forEach((c) => {
        c.style.display = (v === "الكل" || c.textContent.includes(v)) ? "" : "none";
      });
      document.querySelectorAll(".kb-row").forEach((row2) => {
        const any = [...row2.querySelectorAll(".kb-card")].some((c) => c.style.display !== "none");
        row2.style.display = any ? "" : "none";
      });
      showToast("ال فلتر: " + v);
    }, { minWidth: 190 });
  });

  /* Sort dropdown — the user picks how the results are ordered */
  const sortBtn2 = document.getElementById("sortBtn");
  sortBtn2 && sortBtn2.addEventListener("click", () => {
    window.LPTMenu(sortBtn2, ["الأحدث أولاً", "الأقدم أولاً", "الأكثر تقييماً", "الافتراضي"], (v) => {
      const rowsEl = [...document.querySelectorAll(".kb-row")];
      const all = rowsEl.flatMap((r) => [...r.children]);
      const groups = [];
      for (let i = 0; i < all.length; i += 4) groups.push(all.slice(i, i + 4));
      if (v === "الافتراضي") {
        grid.innerHTML = "";
        rowsEl.forEach((r) => grid.appendChild(r));
      } else {
        const reversed = v === "الأقدم أولاً" ? [...groups].reverse() : groups;
        grid.innerHTML = "";
        reversed.forEach((g) => {
          const r = el("div", "kb-row");
          g.forEach((c) => r.appendChild(c));
          grid.appendChild(r);
        });
      }
      showToast("الترتيب: " + v);
    }, { minWidth: 190 });
  });

})();
