# LPT Platform — Hackify Initiative

Interactive prototype of the LPT platform (Literature, Publishing & Translation Commission),
covering the **Hackify** initiative: open challenges, project submissions, and the learning
and knowledge journeys that surround them.

Built as static HTML, CSS and JavaScript — no framework, no build step, no dependencies.
Every screen is a fixed 1920px desktop canvas that scales down to fit the browser window.

---

## Screens

| Screen | File | Description |
|---|---|---|
| Home | `home.html` | Platform landing — hero, components, latest news, success stories |
| Knowledge Center | `knowledge.html` | Searchable, filterable library of articles and guides |
| Training Center | `training.html` | Course catalogue with search and level filters |
| Course View | `course.html` | Course details, curriculum accordion, trainer profile, reviews |
| Hackify Portal | `hackify-portal.html` | Open challenges, challenge carousel, signup form |
| Submission Form | `submission.html` | Applicant details form for a challenge |
| Chat assistant | `chatbot.html` | Assistant panel with quick questions and replies |

The assistant FAB is available on every page and opens the panel **in place**, without navigating away.

---

## User journeys

```
Sign in ─┬─► Knowledge Center ─► Search & filter ─► Ask the assistant
         ├─► Training Center  ─► Pick a course  ─► Review the curriculum
         └─► Hackify          ─► Choose a challenge ─► Submit a project
```

---

## Design system

| Area | Details |
|---|---|
| Colour | Every token is taken verbatim from the design source — Tangaroa `#0F2837`, Outrageous Orange `#EB5A3C`, Pompadour `#6E1946`, Shadow Green `#91B9B4`, Carrot `#FF9619` |
| Type | IBM Plex Sans Arabic (Bold / Regular) |
| Layout | 1920px canvas, 88px page gutters, 4px radius, 8px base spacing rhythm |
| Motion | One curve vocabulary — `--ease-out` for entrances, `--ease-in-out` for movement — with durations of 120/180/240/320ms and a `prefers-reduced-motion` guard |
| Accessibility | Descriptive images, labelled form fields, modal dialog with focus management, live regions for status messages, keyboard-operable menus and accordions |

Full token list, screen map, motion rules and conventions: **[`DESIGN.md`](DESIGN.md)**.

---

## Project structure

```
.
├── index.html              entry point → home.html
├── home.html               knowledge.html      training.html    course.html
├── hackify-portal.html     submission.html     chatbot.html
├── assets/                 images and icons (118 files, ~8.5MB)
├── tokens.css              colour, type, spacing and motion tokens
├── shared.css              nav, footer, buttons, dialog, toast, motion
├── screens.css             inner-page shell (banner, panel, cards)
├── home.css  training.css  course.css  hackify.css  submission.css  chatbot.css
├── flow.js                 session, dropdowns, zoom-to-fit
├── chat.js                 assistant widget
├── knowledge.js  training.js  course.js
└── serve.py                local static server
```

---

## Running locally

```bash
python3 serve.py
# → http://localhost:8811
```

The server sends `Cache-Control: no-store`, so edits appear immediately.

---

## Deploying

The repository is set up for **GitHub Pages**: the `.nojekyll` file makes GitHub serve the files
exactly as they are. Enable it once via **Settings ▸ Pages ▸ Deploy from branch → `main` → `/ (root)`**.

For other static hosts, upload the repository root as-is — every internal link is relative, so the
site works from any sub-path.
