// /api/critique — heuristic prompt critic.
// Scores a user prompt against the 5 axes the L02 PromptCritic UI expects
// (WHAT/WHO/LOOK/SCOPE/SUCCESS) and returns the JSON shape it parses.
// Swap for a real model call (Anthropic / AI Gateway) when wiring to prod.

export const runtime = "nodejs";

type Axes = "what" | "who" | "look" | "scope" | "success";
type Critique = {
  scores: Record<Axes, number>;
  weakest: string;
  rewrite: string;
};

const ADVICE: Record<Axes, string> = {
  what: "No clear artifact. Specify whether this is a prototype, deck, wireframe, or animation — and at what fidelity.",
  who: "No audience named. Whose hands will hold this, on which device, in which context?",
  look: 'No visual direction. Reference an aesthetic ("feels like a fast banking app") or attach a sample.',
  scope: "Unbounded. List the screens or states and call out a single happy path.",
  success: "No definition of done. Tie it to a date, a stakeholder, or a measurable bar.",
};

function critique(promptText: string): Critique {
  const p = promptText.toLowerCase();
  const has = (re: RegExp) => (re.test(p) ? 1 : 0);
  const clamp = (n: number) => Math.max(0, Math.min(3, n));

  const scores: Record<Axes, number> = {
    what: clamp(
      has(/prototype|deck|wireframe|animation|landing|dashboard|app|flow|page|component|tour|guide|site|email/) +
        has(/interactive|static|hi[- ]?fi|wireframe|mid[- ]?fi/) +
        has(/3[- ]step|multi[- ]step|step|screen|view/)
    ),
    who: clamp(
      has(/for (my|a|the|our) (boss|team|user|customer|engineer|pm|exec|stakeholder|operator|nurse|driver|seller)/) +
        has(/audience|users?|engineers?|pms?|execs?|customers?|operators?/) +
        has(/mobile|desktop|tablet|kiosk|print|in[- ]?store/)
    ),
    look: clamp(
      has(/feels?|looks?|aesthetic|brand|style|vibe|tone/) +
        has(/dark|light|monospace|editorial|arcade|terminal|bloomberg|brutal|glass|playful|technical|banking/) +
        has(/sharp|calm|warm|cold|bright|muted|dense|airy|clean|chrome|gradient|flat|minimal/)
    ),
    scope: clamp(
      has(/one|single|happy[- ]?path|two|three|3[- ]step/) +
        has(/screen|state|step|page|view|flow/) +
        has(/mock(ed)? data|realistic data|seed data|sample data|fixtures?/)
    ),
    success: clamp(
      has(/demo|ship|launch|monday|tuesday|wednesday|thursday|friday|saturday|sunday|deadline|by (the )?(end|next|this)/) +
        has(/leadership|cto|board|stakeholder|investor|customer|sales/) +
        has(/criteria|done|ready|approved|target|goal|metric/)
    ),
  };

  const weakest = (Object.entries(scores) as Array<[Axes, number]>).sort((a, b) => a[1] - b[1])[0][0];
  const stem = promptText
    .trim()
    .replace(/^(please\s+)?(make|build|design|create|generate)\s+(me\s+)?(a\s+|an\s+)?/i, "")
    .replace(/[.!?\s]+$/, "");
  const rewrite = stem
    ? `Build an interactive prototype of ${stem} for [audience] on [device]. It should feel [aesthetic anchor — name a system or attach a reference]. Scope: one happy-path flow with realistic mock data. Success: ready to demo to [stakeholder] by [date].`
    : "Build an interactive prototype of a 3-step expense submission flow for busy field engineers on mobile. It should feel like a fast banking app — sharp, calm, no chrome. Scope: one happy-path flow with realistic mock data. Success: ready to demo to leadership Friday.";

  return { scores, weakest: ADVICE[weakest], rewrite };
}

export async function POST(req: Request) {
  let body: { prompt?: unknown };
  try {
    body = (await req.json()) as { prompt?: unknown };
  } catch (err) {
    console.error("[critique] invalid JSON body", err);
    return Response.json({ error: "invalid JSON body" }, { status: 400 });
  }
  const prompt = typeof body.prompt === "string" ? body.prompt : "";
  if (!prompt.trim()) {
    return Response.json({ error: "prompt is required" }, { status: 400 });
  }
  return Response.json(critique(prompt));
}
