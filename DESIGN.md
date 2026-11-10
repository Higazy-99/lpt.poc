# Hackify Prototype — Design Spec (from Figma file DVNjS8pMMkC1xkbOararnm, section 18:9070 "هكيفاي")

## Design tokens (exact Figma variables)
- Tangaroa (dark navy): /100 #0F2837, /80 #3F535F, /70 #576873, /40 #9FA9AF, /30 #B7BFC3, /10 #E7E9EB  |
- Outrageous Orange (CTA): /100 #EB5A3C, /90 #ED6B50, /30 #F9CEC5, /10 #FDEEEB
- Pompadour: /100 #6E1946, /30 #D4BAC8, /10 #F0E8EC
- Romantic /100 #FAC39B
- Guardsman Red /100 #A52C38
- Shadow Green /100 #91B9B4
- Carrot Orange /100 #FF9619
- White #FFFFFF, White Smoke #F3F3F3, Brown-50 #F2F0EF, Green-50 #E9EEEC, Green-900 #0F241D
- Neutral: /200 #969493, /300 #666462, /500 #1A1714, Nero #232323, Dark #141B34, Primary/50 #E7E8E9

## Type
- Primary font: Effra (Bold, Regular) — platform-wide
- Secondary: IBM Plex Sans Arabic (Bold/Regular) for feature block on Home
- Base sizes seen: 16 body/nav-buttons, 18 nav links, 20 news titles, 22 paragraph, 24 card copy/section-limits, 32 feature head, 64 section headers/card titles, 72/100 hero, 38.13 story titles, 22.24 story sub

## Screens (file key 18:9070 area, all 1920px wide)
1. 18:1474 Home
2. 18:3328 Knowledge Center
3. 18:4625 Training Center
4. 18:5319 Training Center Course View
5. 18:6052 Hackify Portal
6. 18:8036 Hackify Portal Submission Form
7. 18:2133 Chatbot closed-state window (with options)
8. 18:2510, 18:2919 Chatbot replies
9. 18:6638 Hackify Dashboard (admin)
10. 18:7576 Hackify Dashboard Hackathons
11. 18:7100 Admin Panel — List of Participants

## Flow (إدارة المسيارات بالظبط كما بالفيغما)
المستخدم النهائي (RTL من اليمين → اليسار):
تسجيل دخول → المنصة (Home) → 3 مسارات:
- مركز المعرفة: استكشاف مركز المعرفة → يبحث عن دليل/سياسة/موضوع → الاستعانة بالمساعد الذكي (Chatbot) → النهاية
- مركز التدريب: استكشاف الدورات → التسجيل في دورة (Course View) → اكمال الدورة والحصول على شهادة رقمية → النهاية
- Hackify: التقديم لتحدي ضمن هاكثون (Portal) → تعبئة نموذج المشاركة (Submission) → تأكيد الإرسال → استلام نتيجة المشروع + ملاحظات اللجنة → النهاية

الإدارة:
تسجيل دخول → لوحة التحكم → مسارات:
- نظرة عامة على الأداء → Dashboard (تحكم الاقتراحات/المنصة) → هاكفاي داشبورد/نسب المشاركة/قائمة التحديات/قائمة المشاريع → تصدير تحليلات PDF, Excel → النهاية
- تحليلات المنصة → عرض تفاعل المستخدمين/أداء الدورات/محتوى المعرفة → تصدير PDF/Excel → النهاية
- الإعدادات والصلاحيات → إدارة المستخدمين (إضافة/تعديل/حذف) ← لوحة التحكم كذلك ← إدارة المحتوى → تحديث الصلاحيات فورًا مع إشعار نجاح → النهاية

Admin screens used: 18:6638 (Dashboard = لوحة التحكم/نظرة عامة), 18:7576 (Hackathons), 18:7100 (Participants).

## Assets
Downloaded enum in ./assets (45 files from Home). Others per screen design contexts stored ref/dc/*.jsx

## Build status
| # | Screen | File | Status |
|---|--------|------|--------|
| 1 | Home (18:1474) | home.html + home.css + flow.js | done |
| 2 | Knowledge Center (18:3328) | knowledge.html + knowledge.js + screens.css | done |
| 3 | Training Center (18:4625) | training.html + training.css + training.js | done |
| 4 | Course View (18:5319) | course.html + course.css + course.js | done |
| 5 | Hackify Portal (18:6052) | hackify-portal.html + hackify.css | done |
| 6 | Submission Form (18:8036) | submission.html + submission.css | done |
| 7-8 | Chatbot (18:2133 / 18:2510 / 18:2919) | chatbot.html + chatbot.css + chat.js | done |
| 9 | Admin Dashboard (18:6638) | — | **removed** (out of scope for this prototype) |
| 10 | Admin Hackathons (18:7576) | — | skipped (not required) |
| 11 | Admin Participants (18:7100) | — | skipped (not required) |

## Chat assistant (widget, not a separate page)
- `chat.js` injects the assistant panel + FAB **inside the current page** (no navigation).
- Loaded by home / knowledge / training / course / chatbot.
- `chatbot.html` keeps the Figma frame (18:2133) as the standalone design screen.
- Panel: 378×430, fixed `left 88 / bottom 128`; FAB 64px fixed `left 88 / bottom 48`.
- Flow: quick question or typed message → user bubble → bot answer + trainer avatar (18:2510 / 18:2919).


## Conventions (must follow)
1. **Canvas** — every screen is a fixed 1920px desktop canvas; frame heights are taken from Figma metadata
   (e.g. Course View = 1920×2227, Training = 1920×2463, Hackify Portal = 1920×4604).
2. **Coordinates** — sections are placed with the exact Figma coordinates (absolute inside the page frame),
   e.g. Course View panel `left 88 / top 269 / 1322×1472`, side column `left 1434 / top 269|886|1364`.
3. **Icons** — SVGs are exported at their intrinsic size; never stretch them to the container box
   (e.g. caret = 13.06×7.59 inside a 24px box, clock = 14.33×14.33 inside 16px, signal = 19.1×7.1 inside 28px).
4. **Type** — Effra is not available on the web; IBM Plex Sans Arabic is the fallback. Sizes/tokens stay
   exactly as in Figma; Arabic text may reflow into an extra line (accepted, geometry stays pinned).
5. **RTL** — the Figma canvas is a physical LTR map with Arabic text inside, so pages use
   `<html lang="ar" dir="ltr">` and Arabic text is aligned right inside the blocks.
6. **Zoom-to-fit** — `flow.js` scales the 1920 canvas down with `document.documentElement.style.zoom`
   when the browser window is narrower, so the whole design is visible without horizontal scrolling.
7. **Shared pieces** — `shared.css` holds nav / footer / buttons / chatbot FAB / overlays / toast;
   `screens.css` holds the inner-page shell (banner + panel + cards).
8. **Serving** — `python3 serve.py` (port 8811) serves the folder with `Cache-Control: no-store`
   so edits are always picked up.

## Accessibility (WCAG 2.2) — implemented
- Every image has `alt` (decorative art = `alt=""`); decorative strip containers are `aria-hidden`.
- Icon-only buttons carry `aria-label` (pagers, chat tools, admin side nav, chat send).
- `#toast` is a `role="status" aria-live="polite"` live region on every page.
- The login overlay is a real modal (`role="dialog" aria-modal="true"`), focus moves into it,
  Tab is trapped, Escape closes it, focus returns to the trigger, and the error line is `role="alert"`.
- All form fields have real labels (`<label for>` / `aria-label`), `autocomplete` on credentials,
  `required` + `aria-invalid` + `aria-describedby` on the submission form.
- Custom widgets are keyboard operable: course accordion (`<button aria-expanded>`), knowledge
  type-filter menu (`role="menu"` / `role="menuitem"` + arrow keys + Escape), knowledge cards
  (`role="button"` + Enter/Space), chat thread (`role="log" aria-live="polite"`).
- Visible focus ring on every interactive element (`:focus-visible`) + `prefers-reduced-motion` guard.
- Zoom-to-fit is clamped at 0.5 so text never renders below ~8px effective size.

### Known trade-off (intentional, design fidelity wins)
The Figma palette itself contains low-contrast pairs — e.g. `#FDEEEB` on `#ED6B50` = 2.73:1 for the
primary CTA, `#FF9619` on `#EB5A3C` = 1.59:1 for the carrot chip on the orange challenge card.
These are kept **as designed** because the brief is a 1:1 reproduction of the Figma file; the fix
for production would be a dedicated "text on orange" surface token, not a change to this prototype.

## Motion system
Tokens in `tokens.css`: `--ease-out` (UI entrances), `--ease-in-out` (on-screen movement),
`--dur-press` 120ms, `--dur-fast` 180ms, `--dur-base` 240ms, `--dur-slow` 320ms.

| Interaction | Purpose | Implementation |
|---|---|---|
| Button press | feedback | `transform: scale(.97)` 120ms `--ease-out` (never `transition: all`) |
| Card hover | spatial cue | `translateY(-3px)` + shadow 180ms |
| Arrow buttons | affordance | arrow slides 5px on hover (pointer-gated) |
| Login dialog | state indication | backdrop fade + card `translateY(10px) scale(.96)` → rest, 320ms |
| Login error | feedback | 220ms shake + tinted error box |
| Toast | feedback | transitions (not keyframes) — slide up 12px + fade, 240ms |
| Chat panel | spatial consistency | fades/scales in place, exit mirrors the entry |
| Chat messages | feedback | 240ms rise-in on each new bubble |
| Course accordion | state indication | `grid-template-rows: 0fr → 1fr` 240ms `--ease-in-out` |
| Dropdown menus (type / level / language) | spatial consistency | fade + `translateY(-6px) scale(.98)` 180ms, origin at the trigger |
| Chat expand | state indication | thread height 150px → 260px, 240ms |

Rules applied everywhere: transform/opacity only (height only for accordions), no `scale(0)`,
no `ease-in`, hover motion gated behind `@media (hover: hover) and (pointer: fine)`,
and a global `prefers-reduced-motion` guard.

## Functional inventory (everything is wired)
- Login dialog: open/close, show-hide password, role tabs, remember me, forgot-password toast,
  inline validation error, success toast, focus trap + Escape + focus restore, **RTL layout**
  (logo/title on the right, ✕ opposite, tabs and the row flip with the reading direction).
- Language switcher (EN / العربية) dropdown on every page.
- Knowledge Center: live search, type filter menu (keyboard), **sort menu** (الأحدث / الأقدم /
  الأكثر تقييماً / الافتراضي), card activation.
- Training Center: live search, level filter menu (keyboard), **sort menu**, course cards → course page.
- Course View: 7 expandable weeks (each with 3 lessons), video play button, trainer profile, reviews.
- Hackify Portal: challenges carousel (pager), **"قدم الآن" scrolls to the signup form and focuses
  the first field**, "أعرف أكثر" → submission form.
- Submission form: real select / radios / date / phone, required fields, inline errors, submit → toast.
- Chat assistant: FAB opens the panel **in-page**, quick questions, typed messages, bot replies,
  expand/collapse, close.

## Shared dropdown (`window.LPTMenu`)
All dropdowns (type / level / sort / language) go through one helper in `flow.js`:
- **Zoom-aware positioning** — the canvas is scaled with `zoom`, so `getBoundingClientRect()`
  returns scaled pixels while absolute positioning inside the zoomed root expects CSS pixels;
  the helper divides by the current zoom, otherwise the menu opens in the wrong place.
- `role="menu"` / `role="menuitem"`, `aria-haspopup` + `aria-expanded` on the trigger,
  ArrowUp/ArrowDown to move, Escape to close and return focus, click-outside to dismiss.
- Entrance animation `menuIn` (fade + 6px rise) with the origin at the trigger.




