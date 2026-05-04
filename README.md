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

## Implementation cost (estimated)

The conversion from the design handoff into the Next.js app you can browse at the link above was
done across a single Claude Code session with **Claude Sonnet 4.x** (1M context). I don't have
exact telemetry, so the numbers below are honest order-of-magnitude estimates based on the work
that landed in this branch — file writes, edits, bash invocations, build/verification — plus the
tool-result and conversation-history input that fed each turn.

| Bucket                                  | Tokens (approx)   | Rate (Sonnet 4.x) | Cost      |
| --------------------------------------- | ----------------- | ----------------- | --------- |
| Output (code, edits, responses)         | ~45,000           | $15.00 / MTok     | ~$0.68    |
| Input — uncached (new tool results, edits) | ~250,000       | $3.00 / MTok      | ~$0.75    |
| Input — cache reads (repeated context)  | ~2,700,000        | $0.30 / MTok      | ~$0.81    |
| **Estimated total**                     | **~3,000,000**    |                   | **~$2.25**|

Notes:

- This **only covers the engineering work** (handoff → Next.js → deploy). The original 14-minute
  Claude Design chat that produced the prototype — the "~$0.40 in tokens" called out inside Lesson 00 —
  is not included here.
- Claude Code uses aggressive prompt caching, so most of the ~3M raw input tokens are 90%-discounted
  cache reads. Without caching the input bill alone would be ~$9.
- Real spend depends on which Sonnet variant is in use; the rates above are typical for Sonnet 4.5
  pricing under a 200k-token request budget.
