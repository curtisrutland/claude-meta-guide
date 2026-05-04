# meta // a guide to designing with Claude

An 8-lesson interactive tour built to convince an engineering org that Claude Design can replace
hiring or contracting out design work. The guide is itself a working artifact built on the platform
it teaches.

**Live demo:** [claude-meta-guide.vercel.app](https://claude-meta-guide.vercel.app/)

## Stack

- **Next.js 16** (App Router, Turbopack)
- **React 19**
- **TypeScript** (strict)
- `next/font` for Inter + JetBrains Mono
- One Node.js route handler at `/api/critique`

## Getting started

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # production build
npm start            # serve the production build
```

## Project layout

```
app/
  layout.tsx              # next/font wiring, root layout
  page.tsx                # renders the AppShell
  globals.css             # all design tokens + component styles
  components/
    app-shell.tsx         # topbar / sidebar / keyboard nav / progress
    lessons.tsx           # the 8 lessons + PromptCritic + MiniProto
    tweaks-panel.tsx      # floating Tweaks panel (postMessage host protocol)
  api/
    critique/route.ts     # POST /api/critique — prompt-axes heuristic
design-source/             # the original Claude Design handoff bundle
```

## What's interactive

- Keyboard nav (`↑`/`↓` or `j`/`k`, `g` top, `G` end)
- Progress + last-visited lesson persist via `localStorage`
- L02 PromptCritic posts to `/api/critique` and renders 5-axis scores + a rewrite
- L05 a fully working 3-step expense flow with live tweaks (density, accent, dark mode)
- L06 a simulated handoff packager
- Floating Tweaks panel (open via the bottom-bar `tweaks` button) for accent color and progress reset

## `/api/critique`

A pure Node.js route handler that scores a prompt against five axes
(WHAT / WHO / LOOK / SCOPE / SUCCESS), names the weakest, and rewrites the brief.
The current implementation is a deterministic heuristic — drop in a real model call (Anthropic SDK,
AI Gateway, etc.) inside `critique()` whenever you want live model output.

Request:

```http
POST /api/critique
Content-Type: application/json

{ "prompt": "Make me a dashboard for my SaaS app." }
```

Response:

```json
{
  "scores": { "what": 1, "who": 0, "look": 0, "scope": 0, "success": 1 },
  "weakest": "No audience named. Whose hands will hold this, on which device, in which context?",
  "rewrite": "Build an interactive prototype of dashboard for my SaaS app for [audience] on [device]…"
}
```

## Origin

Designed in [Claude Design](https://claude.ai/design) and exported as a handoff bundle. The original
prototype files (HTML + JSX, Babel-in-browser) are preserved in `design-source/` as the
implementation spec.
