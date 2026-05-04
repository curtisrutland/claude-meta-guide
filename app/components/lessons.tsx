"use client";

import * as React from "react";

export type Lesson = {
  id: number;
  num: string;
  label: string;
  dur: string;
  title: string;
};

export const LESSONS: ReadonlyArray<Lesson> = [
  { id: 0, num: "00", label: "The pitch", dur: "2 min", title: "why this exists" },
  { id: 1, num: "01", label: "Start a project", dur: "3 min", title: "set up your workspace" },
  { id: 2, num: "02", label: "Write a first prompt", dur: "4 min", title: "anatomy of a good brief" },
  { id: 3, num: "03", label: "Answer the questions", dur: "3 min", title: "the clarifying round" },
  { id: 4, num: "04", label: "Iterate by comment", dur: "3 min", title: "the design loop" },
  { id: 5, num: "05", label: "Build a prototype", dur: "4 min", title: "real state, real interactions" },
  { id: 6, num: "06", label: "Hand off to Code", dur: "3 min", title: "engineers ship it" },
  { id: 7, num: "07", label: "The business case", dur: "2 min", title: "recap with numbers" },
];

export type LessonProps = { onAdvance: () => void };

// ── helpers ─────────────────────────────────────────────────────────────
const Eyebrow = ({ num, label }: { num: string; label: string }) => (
  <div className="lesson-eyebrow">
    <span className="num">L{num}</span>
    <span className="sep">/</span>
    <span>{label}</span>
  </div>
);

const Head = ({
  num,
  label,
  children,
}: {
  num: string;
  label: string;
  children: React.ReactNode;
}) => (
  <div className="lesson-head">
    <Eyebrow num={num} label={label} />
    <h1 className="lesson-h1">{children}</h1>
  </div>
);

const MetaTag = ({ children }: { children: React.ReactNode }) => (
  <span className="meta-tag">{children}</span>
);

const navigateToLesson = (id: string) => {
  const el = document.querySelector<HTMLLIElement>(`.nav li[data-id="${id}"]`);
  el?.click();
};

// ── L0: The pitch ──────────────────────────────────────────────────────
function Lesson0({ onAdvance }: LessonProps) {
  return (
    <div className="lesson hero">
      <div className="hero-eyebrow">
        <span>meta // a guide</span>
        <span className="ln" />
        <span>L00 — the pitch</span>
      </div>
      <div className="hero-grid">
        <div>
          <h1>
            design at the
            <br />
            speed of <span style={{ color: "var(--accent)" }}>thought</span>
            <span className="blink"></span>
          </h1>
          <p className="lead">
            This guide is itself a working artifact built on the platform you&apos;re about to learn. No
            designer was hired. <em>It took fourteen minutes.</em>
          </p>
          <p className="lead">
            Over the next 8 lessons, you&apos;ll learn how to brief, iterate, prototype, and hand off
            production-ready work — using a single chat thread.
          </p>
          <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
            <button className="btn primary" onClick={onAdvance}>
              begin tour →
            </button>
            <button className="btn ghost" onClick={() => navigateToLesson("7")}>
              skip to ROI numbers
            </button>
          </div>
          <div style={{ marginTop: 32, display: "flex", gap: 10, flexWrap: "wrap" }}>
            <MetaTag>self-referential</MetaTag>
            <MetaTag>built in 14 min</MetaTag>
            <MetaTag>0 designers</MetaTag>
            <MetaTag>fully editable</MetaTag>
          </div>
        </div>

        <div className="specsheet">
          <div
            style={{
              fontFamily: "var(--mono)",
              fontSize: 11,
              color: "var(--ink-3)",
              marginBottom: 10,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            // spec.this_artifact
          </div>
          <div className="specrow">
            <span className="k">authored by</span>
            <span className="v">claude · 1 PM</span>
          </div>
          <div className="specrow">
            <span className="k">duration</span>
            <span className="v">
              <span className="accent">14 min</span> chat
            </span>
          </div>
          <div className="specrow">
            <span className="k">lessons</span>
            <span className="v">8</span>
          </div>
          <div className="specrow">
            <span className="k">live demos</span>
            <span className="v">
              <span className="accent">2</span> · real model calls
            </span>
          </div>
          <div className="specrow">
            <span className="k">handoff</span>
            <span className="v">production HTML</span>
          </div>
          <div className="specrow">
            <span className="k">cost</span>
            <span className="v">
              <span className="accent">~$0.40</span> in tokens
            </span>
          </div>
          <div className="specrow">
            <span className="k">vs designer</span>
            <span className="v">~$2,400 / 2 days</span>
          </div>
          <div
            style={{
              marginTop: 14,
              paddingTop: 12,
              borderTop: "1px solid var(--line)",
              fontSize: 11,
              color: "var(--ink-3)",
              fontStyle: "italic",
            }}
          >
            this entire pane is rendered by code claude wrote. inspect it. comment on it. ask claude to
            change it.
          </div>
        </div>
      </div>
    </div>
  );
}

// ── L1: Start a project ────────────────────────────────────────────────
function Lesson1({ onAdvance }: LessonProps) {
  const [checked, setChecked] = React.useState<Record<string, boolean>>({});
  const items = [
    {
      id: "name",
      label: "Name the project",
      hint: "Project picker uses the name. 'meta-guide' is more findable than 'Untitled'.",
    },
    {
      id: "attach",
      label: "Attach context",
      hint: "Codebase, design system, screenshots, Figma link, brand kit. The more, the better.",
    },
    {
      id: "skill",
      label: "Pick a skill",
      hint: "Interactive prototype, Make a deck, Animated video, Wireframe. Pre-loads the right approach.",
    },
    {
      id: "audience",
      label: "Know your audience",
      hint: "Who's it for, where will they see it, what device. Affects every decision.",
    },
    {
      id: "success",
      label: "Define done",
      hint: "A demo for your boss? Production code? A figma replacement? Write it down.",
    },
  ];
  const toggle = (id: string) => setChecked((c) => ({ ...c, [id]: !c[id] }));
  const allDone = items.every((i) => checked[i.id]);

  return (
    <div className="lesson">
      <Head num="01" label="Start a project">
        attach context. <span className="accent">always.</span>
      </Head>

      <div className="prose">
        <p>
          The single biggest predictor of output quality is <strong>what you bring with you</strong>.
          Claude is excellent. Claude with your design system, your codebase, and three reference
          screenshots is a different animal entirely.
        </p>
        <p>Before you type a single character of prompt, run this checklist:</p>
      </div>

      <div className="card">
        <div className="card-title">
          <span className="marker">▸</span> setup checklist
        </div>
        <ul className="checklist">
          {items.map((it) => (
            <li
              key={it.id}
              className={checked[it.id] ? "done" : ""}
              onClick={() => toggle(it.id)}
            >
              <span className="box">{checked[it.id] ? "✓" : ""}</span>
              <span className="lbl">
                {it.label}
                <span className="hint">{it.hint}</span>
              </span>
            </li>
          ))}
        </ul>
        {allDone && (
          <div
            style={{
              marginTop: 14,
              padding: "10px 12px",
              background: "rgba(124,240,194,0.06)",
              border: "1px solid var(--accent-dim)",
              borderRadius: 6,
              fontSize: 12,
              color: "var(--accent)",
              fontFamily: "var(--mono)",
            }}
          >
            ✓ ready. now you can write a prompt that won&apos;t waste anyone&apos;s time.
          </div>
        )}
      </div>

      <div className="prose">
        <h2>what to attach, ranked</h2>
      </div>

      <div className="grid-3">
        <div className="stat">
          <div className="v">
            <span className="accent">10×</span>
          </div>
          <div className="l">a working codebase</div>
          <div
            style={{
              fontFamily: "var(--sans)",
              fontSize: 12,
              color: "var(--ink-2)",
              marginTop: 8,
              lineHeight: 1.5,
            }}
          >
            Claude reads your components, tokens, and patterns. Output matches your stack.
          </div>
        </div>
        <div className="stat">
          <div className="v">
            <span className="accent">5×</span>
          </div>
          <div className="l">design system file</div>
          <div
            style={{
              fontFamily: "var(--sans)",
              fontSize: 12,
              color: "var(--ink-2)",
              marginTop: 8,
              lineHeight: 1.5,
            }}
          >
            Color, type, spacing tokens. Stops Claude from inventing colors.
          </div>
        </div>
        <div className="stat">
          <div className="v">
            <span className="accent">3×</span>
          </div>
          <div className="l">3+ screenshots</div>
          <div
            style={{
              fontFamily: "var(--sans)",
              fontSize: 12,
              color: "var(--ink-2)",
              marginTop: 8,
              lineHeight: 1.5,
            }}
          >
            Reference UI you like. Visual DNA travels through the chat.
          </div>
        </div>
      </div>

      <div className="prose">
        <p style={{ marginTop: 24 }}>
          <em style={{ color: "var(--ink-3)", fontStyle: "normal" }}>
            // Numbers are illustrative — quality multipliers vs. starting from a blank prompt.
          </em>
        </p>
      </div>

      <Foot onAdvance={onAdvance} nextNum="02" nextLabel="Write a first prompt" />
    </div>
  );
}

// ── L2: Anatomy of a prompt (live Claude call via /api/critique) ────────
function Lesson2({ onAdvance }: LessonProps) {
  type Tag = "what" | "who" | "look" | "scope" | "success";
  const [activeTag, setActiveTag] = React.useState<Tag>("what");

  const annotations: Record<Tag, { title: string; body: React.ReactNode }> = {
    what: {
      title: "WHAT",
      body: (
        <>
          State the artifact: prototype, deck, animation, wireframe.{" "}
          <b>Be specific about format.</b> &quot;App&quot; is too vague — &quot;interactive
          prototype of a 3-step onboarding&quot; is precise.
        </>
      ),
    },
    who: {
      title: "WHO",
      body: (
        <>
          Audience drives every decision. <b>&quot;For my boss&quot;</b> is wildly different from{" "}
          <b>&quot;for end users on mobile.&quot;</b>
        </>
      ),
    },
    look: {
      title: "LOOK",
      body: (
        <>
          Reference an aesthetic, a system, or attached files. <b>Verbs help</b>: &quot;feels
          editorial&quot;, &quot;feels arcade&quot;, &quot;feels Bloomberg terminal.&quot;
        </>
      ),
    },
    scope: {
      title: "SCOPE",
      body: (
        <>
          List the screens or states. Bound the work. Without scope, Claude will guess — usually too
          small or too sprawling.
        </>
      ),
    },
    success: {
      title: "SUCCESS",
      body: (
        <>
          How will you judge it? &quot;Ready to demo to my CTO Friday&quot; is a real constraint. So
          is &quot;must run on a 6-year-old laptop.&quot;
        </>
      ),
    },
  };

  return (
    <div className="lesson">
      <Head num="02" label="Write a first prompt">
        anatomy of a <span className="accent">good brief</span>
      </Head>

      <div className="prose">
        <p>A good first prompt has 5 parts. Hover or click the highlighted spans to learn each.</p>
      </div>

      <div className="anno">
        <div>
          Build me an{" "}
          <span
            className={`anno-tag ${activeTag === "what" ? "active" : ""}`}
            onClick={() => setActiveTag("what")}
          >
            interactive prototype
          </span>{" "}
          of a{" "}
          <span
            className={`anno-tag ${activeTag === "scope" ? "active" : ""}`}
            onClick={() => setActiveTag("scope")}
          >
            3-step expense submission flow
          </span>{" "}
          for{" "}
          <span
            className={`anno-tag ${activeTag === "who" ? "active" : ""}`}
            onClick={() => setActiveTag("who")}
          >
            busy field engineers on mobile
          </span>
          .<br />
          It should feel{" "}
          <span
            className={`anno-tag ${activeTag === "look" ? "active" : ""}`}
            onClick={() => setActiveTag("look")}
          >
            like a fast banking app — sharp, calm, no chrome
          </span>
          . I need to{" "}
          <span
            className={`anno-tag ${activeTag === "success" ? "active" : ""}`}
            onClick={() => setActiveTag("success")}
          >
            demo this to leadership Friday
          </span>
          ; one happy-path flow with realistic mock data is enough.
        </div>
        <div className="anno-callout">
          <b>{annotations[activeTag].title} — </b>
          {annotations[activeTag].body}
        </div>
      </div>

      <div className="prose">
        <h2>try it: critique your own prompt</h2>
        <p>Paste a prompt you might write. Claude will score it on the 5 axes and rewrite it.</p>
      </div>

      <PromptCritic />

      <Foot onAdvance={onAdvance} nextNum="03" nextLabel="Answer the questions" />
    </div>
  );
}

type CritiqueAxes = "what" | "who" | "look" | "scope" | "success";
type CritiqueResponse = {
  scores: Record<CritiqueAxes, number>;
  weakest: string;
  rewrite: string;
};

function PromptCritic() {
  const [text, setText] = React.useState("Make me a dashboard for my SaaS app.");
  const [out, setOut] = React.useState<CritiqueResponse | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [err, setErr] = React.useState<string | null>(null);

  const run = async () => {
    if (!text.trim()) return;
    setLoading(true);
    setErr(null);
    setOut(null);
    try {
      const res = await fetch("/api/critique", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: text }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = (await res.json()) as CritiqueResponse;
      setOut(json);
    } catch (e) {
      setErr(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  };

  const axes: ReadonlyArray<CritiqueAxes> = ["what", "who", "look", "scope", "success"];

  return (
    <div className="card">
      <div className="card-title">
        <span className="marker">▸</span> live demo · prompt critic
        <span style={{ flex: 1 }} />
        <span style={{ fontSize: 10, color: "var(--ink-3)" }}>real claude call · ~2s</span>
      </div>
      <textarea
        className="ta"
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={3}
        placeholder="paste a prompt..."
      />
      <div className="field-row">
        <button className="btn primary" onClick={run} disabled={loading}>
          {loading ? (
            <>
              <span className="spin"></span> critiquing...
            </>
          ) : (
            "critique →"
          )}
        </button>
        <button
          className="btn ghost"
          onClick={() => {
            setText("Make me a dashboard for my SaaS app.");
            setOut(null);
            setErr(null);
          }}
        >
          reset
        </button>
        {err && <span style={{ color: "var(--warn)", fontSize: 11 }}>{err}</span>}
      </div>

      {out && (
        <div style={{ marginTop: 18, display: "grid", gap: 14 }}>
          <div>
            <div
              style={{
                fontSize: 11,
                color: "var(--ink-3)",
                marginBottom: 8,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              scores · 0–3
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 8 }}>
              {axes.map((ax) => (
                <div
                  key={ax}
                  style={{
                    padding: 10,
                    background: "var(--bg-2)",
                    borderRadius: 6,
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      fontSize: 10,
                      color: "var(--ink-3)",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                    }}
                  >
                    {ax}
                  </div>
                  <div
                    style={{
                      fontSize: 22,
                      fontFamily: "var(--mono)",
                      color:
                        out.scores[ax] >= 2
                          ? "var(--accent)"
                          : out.scores[ax] === 1
                            ? "var(--warn)"
                            : "#f07c7c",
                      marginTop: 4,
                    }}
                  >
                    {out.scores[ax]}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div
            style={{
              padding: 12,
              background: "var(--bg-2)",
              borderRadius: 6,
              fontFamily: "var(--sans)",
              fontSize: 13,
              color: "var(--ink-1)",
            }}
          >
            <div
              style={{
                fontSize: 10,
                color: "var(--ink-3)",
                marginBottom: 6,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              weakest axis
            </div>
            {out.weakest}
          </div>
          <div
            style={{
              padding: 14,
              background: "#07090b",
              borderLeft: "2px solid var(--accent)",
              borderRadius: "0 6px 6px 0",
              fontFamily: "var(--mono)",
              fontSize: 12.5,
              color: "var(--ink-0)",
              lineHeight: 1.65,
            }}
          >
            <div
              style={{
                fontSize: 10,
                color: "var(--accent)",
                marginBottom: 6,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              rewrite
            </div>
            {out.rewrite}
          </div>
        </div>
      )}
    </div>
  );
}

// ── L3: Clarifying questions ───────────────────────────────────────────
function Lesson3({ onAdvance }: LessonProps) {
  const [step, setStep] = React.useState(0);
  const [answers, setAnswers] = React.useState<Record<string, string>>({});

  const questions = [
    {
      id: "audience",
      q: "Who is this for?",
      sub: "Drives tone, density, and which patterns are even in scope.",
      opts: ["End users on mobile", "Internal ops team", "Executives in a meeting", "Fellow engineers"],
    },
    {
      id: "fidelity",
      q: "How polished?",
      sub: "Wireframe = explore ideas. Hi-fi = ship-ready aesthetic.",
      opts: [
        "Wireframes — many ideas",
        "Mid-fi — interaction shape",
        "Hi-fi — production-grade",
        "Pixel-perfect to existing brand",
      ],
    },
    {
      id: "variants",
      q: "How many variations?",
      sub: "More options = more dimensions explored. 1 is just one shot.",
      opts: ["1 — confident direction", "3 — explore approaches", "5+ — diverge widely"],
    },
  ];

  const cur = questions[step];
  const isLast = step === questions.length - 1;
  const select = (val: string) => {
    setAnswers((a) => ({ ...a, [cur.id]: val }));
  };

  return (
    <div className="lesson">
      <Head num="03" label="Answer the questions">
        the <span className="accent">clarifying round</span>
      </Head>

      <div className="prose">
        <p>
          When you start something ambiguous, Claude asks structured questions before drawing a single
          pixel. <strong>Don&apos;t skip them.</strong> Ten seconds of answers saves an hour of bad
          iterations.
        </p>
        <p>
          Below is a live mock of the question form. Try answering — see how each pick refines what
          gets built.
        </p>
      </div>

      <div className="qmock">
        <div className="qmock-head">
          <span className="step">
            {String(step + 1).padStart(2, "0")} / 0{questions.length}
          </span>
          <span style={{ flex: 1 }} />
          <span style={{ color: "var(--ink-3)" }}>// answers refine your brief in real time</span>
        </div>
        <div className="qmock-body">
          <h4>{cur.q}</h4>
          <div className="qsub">{cur.sub}</div>
          <div className="opts">
            {cur.opts.map((o) => (
              <div
                key={o}
                className={`opt ${answers[cur.id] === o ? "sel" : ""}`}
                onClick={() => select(o)}
              >
                <span className="radio" />
                {o}
              </div>
            ))}
          </div>
        </div>
        <div className="qmock-foot">
          <div className="qmock-progress">
            {questions.map((_, i) => (
              <i key={i} className={i < step ? "on" : i === step ? "cur" : ""} />
            ))}
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button
              className="btn ghost"
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
            >
              back
            </button>
            {isLast ? (
              <button className="btn primary" onClick={() => {}} disabled={!answers[cur.id]}>
                submit
              </button>
            ) : (
              <button
                className="btn primary"
                onClick={() => setStep((s) => s + 1)}
                disabled={!answers[cur.id]}
              >
                next →
              </button>
            )}
          </div>
        </div>
      </div>

      {Object.keys(answers).length === questions.length && (
        <div className="card stripe" style={{ marginTop: 24 }}>
          <div className="card-title">
            <span className="marker">▸</span> what claude knows now
          </div>
          <div style={{ fontFamily: "var(--mono)", fontSize: 12.5, lineHeight: 1.7 }}>
            <div>
              <span style={{ color: "var(--ink-3)" }}>audience </span>
              <span style={{ color: "var(--accent)" }}>= </span>
              {answers.audience}
            </div>
            <div>
              <span style={{ color: "var(--ink-3)" }}>fidelity </span>
              <span style={{ color: "var(--accent)" }}>= </span>
              {answers.fidelity}
            </div>
            <div>
              <span style={{ color: "var(--ink-3)" }}>variants </span>
              <span style={{ color: "var(--accent)" }}>= </span>
              {answers.variants}
            </div>
          </div>
          <div
            style={{
              marginTop: 14,
              fontFamily: "var(--sans)",
              fontSize: 13,
              color: "var(--ink-1)",
              lineHeight: 1.6,
            }}
          >
            With this, the next message will produce <strong>{answers.variants}</strong> at{" "}
            <strong>{(answers.fidelity || "").toLowerCase()}</strong> aimed at{" "}
            <strong>{(answers.audience || "").toLowerCase()}</strong>. No guessing.
          </div>
        </div>
      )}

      <Foot onAdvance={onAdvance} nextNum="04" nextLabel="Iterate by comment" />
    </div>
  );
}

// ── L4: Iterate by comment ─────────────────────────────────────────────
function Lesson4({ onAdvance }: LessonProps) {
  const [showComment, setShowComment] = React.useState(false);
  const [commentText, setCommentText] = React.useState("");
  const [posted, setPosted] = React.useState(false);

  return (
    <div className="lesson">
      <Head num="04" label="Iterate by comment">
        click. comment. <span className="accent">change.</span>
      </Head>

      <div className="prose">
        <p>
          You don&apos;t write paragraphs of feedback. You{" "}
          <strong>click on the broken thing</strong> and tell Claude what&apos;s wrong. The right
          element gets edited — no guesswork.
        </p>
        <p>Try it on the mock below. Click the misaligned headline.</p>
      </div>

      <div className="proto-demo">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 10,
            fontSize: 11,
            color: "var(--ink-2)",
          }}
        >
          <span>// preview pane</span>
          <span>
            {posted ? (
              <span style={{ color: "var(--accent)" }}>✓ comment sent to claude</span>
            ) : (
              "click any element →"
            )}
          </span>
        </div>
        <div className="proto-canvas" style={{ position: "relative", cursor: "default" }}>
          <div style={{ maxWidth: 420, margin: "0 auto", padding: "12px 0" }}>
            <div
              style={{
                fontSize: 10,
                color: "#a8a29e",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginBottom: 10,
              }}
            >
              NEW · PRO PLAN
            </div>
            <h2
              onClick={() => setShowComment(true)}
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 30,
                fontWeight: 700,
                color: "#1c1917",
                margin: "0 0 12px",
                cursor: "pointer",
                position: "relative",
                outline: showComment ? "2px solid #7cf0c2" : "none",
                outlineOffset: "4px",
                borderRadius: "2px",
                transition: "outline 0.15s",
              }}
              title="click me"
            >
              Move money like it&apos;s 2026
              {!showComment && (
                <span
                  style={{
                    position: "absolute",
                    top: -8,
                    right: -8,
                    background: "#7cf0c2",
                    color: "#04140d",
                    fontSize: 9,
                    fontWeight: 600,
                    padding: "2px 6px",
                    borderRadius: 3,
                    fontFamily: "var(--mono)",
                    letterSpacing: "0.04em",
                    animation: "pulse 1.4s ease-in-out infinite",
                  }}
                >
                  click
                </span>
              )}
            </h2>
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                color: "#57534e",
                fontSize: 14,
                margin: "0 0 18px",
                lineHeight: 1.55,
              }}
            >
              International transfers in seconds. No hidden fees, no week-long waits.
            </p>
            <button
              style={{
                background: "#1c1917",
                color: "#fafaf9",
                border: 0,
                padding: "10px 20px",
                borderRadius: 6,
                fontFamily: "Inter, sans-serif",
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Get started
            </button>
          </div>

          {showComment && (
            <div
              style={{
                position: "absolute",
                top: "52%",
                left: "calc(50% + 60px)",
                background: "var(--bg-1)",
                border: "1px solid var(--accent)",
                borderRadius: 8,
                padding: 12,
                width: 240,
                boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
                zIndex: 10,
                fontFamily: "var(--mono)",
                animation: "fadeIn 0.2s",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  marginBottom: 8,
                  fontSize: 10,
                  color: "var(--ink-3)",
                }}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: 3,
                    background: "var(--accent)",
                  }}
                ></span>
                comment on &lt;h2&gt;
              </div>
              <textarea
                autoFocus
                placeholder="too generic. make it more specific to international transfers."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                style={{
                  width: "100%",
                  minHeight: 60,
                  background: "#07090b",
                  color: "var(--ink-0)",
                  border: "1px solid var(--line)",
                  borderRadius: 4,
                  padding: 8,
                  fontFamily: "var(--mono)",
                  fontSize: 12,
                  resize: "none",
                  outline: "none",
                }}
              />
              <div style={{ display: "flex", gap: 6, marginTop: 8, justifyContent: "flex-end" }}>
                <button
                  className="btn ghost"
                  style={{ padding: "4px 10px", fontSize: 11 }}
                  onClick={() => {
                    setShowComment(false);
                    setCommentText("");
                  }}
                >
                  cancel
                </button>
                <button
                  className="btn primary"
                  style={{ padding: "4px 10px", fontSize: 11 }}
                  onClick={() => {
                    setPosted(true);
                    setShowComment(false);
                    setCommentText("");
                  }}
                  disabled={!commentText.trim()}
                >
                  send →
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="prose">
        <h2>three ways to give feedback</h2>
      </div>

      <div className="grid-3">
        <div className="card" style={{ margin: 0 }}>
          <div
            style={{
              fontFamily: "var(--mono)",
              fontSize: 11,
              color: "var(--accent)",
              marginBottom: 6,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            01 — comment
          </div>
          <div
            style={{
              fontFamily: "var(--sans)",
              fontSize: 13,
              color: "var(--ink-1)",
              lineHeight: 1.6,
            }}
          >
            Click an element, leave a note. Claude knows exactly which DOM node you mean.
          </div>
        </div>
        <div className="card" style={{ margin: 0 }}>
          <div
            style={{
              fontFamily: "var(--mono)",
              fontSize: 11,
              color: "var(--accent)",
              marginBottom: 6,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            02 — direct edit
          </div>
          <div
            style={{
              fontFamily: "var(--sans)",
              fontSize: 13,
              color: "var(--ink-1)",
              lineHeight: 1.6,
            }}
          >
            Type into the page. Drag elements. Claude rewrites the source to match.
          </div>
        </div>
        <div className="card" style={{ margin: 0 }}>
          <div
            style={{
              fontFamily: "var(--mono)",
              fontSize: 11,
              color: "var(--accent)",
              marginBottom: 6,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            03 — chat
          </div>
          <div
            style={{
              fontFamily: "var(--sans)",
              fontSize: 13,
              color: "var(--ink-1)",
              lineHeight: 1.6,
            }}
          >
            Big-picture pivots. &quot;Try a card layout instead.&quot; &quot;Make it feel
            arcade.&quot;
          </div>
        </div>
      </div>

      <div className="prose" style={{ marginTop: 24 }}>
        <h2>review pane</h2>
        <p>
          Every artifact ends up in the asset review pane: <strong>approve</strong>,{" "}
          <strong>request changes</strong>, or compare versions side-by-side. Treat it like a PR review.
        </p>
      </div>

      <Foot onAdvance={onAdvance} nextNum="05" nextLabel="Build a prototype" />
    </div>
  );
}

// ── L5: Prototypes ─────────────────────────────────────────────────────
type ProtoTweaks = { density: "compact" | "cozy" | "comfy"; accent: "mint" | "pink" | "blue" | "amber"; dark: boolean };

function Lesson5({ onAdvance }: LessonProps) {
  const [tweaks, setTweaks] = React.useState<ProtoTweaks>({
    density: "comfy",
    accent: "mint",
    dark: false,
  });
  return (
    <div className="lesson">
      <Head num="05" label="Build a prototype">
        real <span className="accent">state</span>, real interactions
      </Head>

      <div className="prose">
        <p>
          Static mockups are dead. A prototype here is a working web app: real <code>useState</code>,
          real form validation, real animated transitions. You can click through it. You can ship it.
        </p>
        <p>Below is a prototype-of-a-prototype: an interactive mock that responds to its own Tweaks.</p>
      </div>

      <MiniProto tweaks={tweaks} setTweaks={setTweaks} />

      <div className="prose">
        <h2>what makes prototypes good</h2>
        <ul>
          <li>
            <strong>Realistic data.</strong> Names, numbers, dates that look like production.
          </li>
          <li>
            <strong>Real interactions.</strong> Hover, focus, error states — not just happy path.
          </li>
          <li>
            <strong>Multiple variants.</strong> Tweaks panel exposes 2–4 directions side-by-side.
          </li>
          <li>
            <strong>Persistence where it matters.</strong> Position in a flow survives a refresh.
          </li>
        </ul>

        <h2>tweaks</h2>
        <p>
          A small panel inside the prototype lets you toggle the variants live. The panel above is real
          — adjust it and the mock above changes.
        </p>
      </div>

      <Foot onAdvance={onAdvance} nextNum="06" nextLabel="Hand off to Claude Code" />
    </div>
  );
}

const ACCENTS: Record<ProtoTweaks["accent"], string> = {
  mint: "#7cf0c2",
  pink: "#f07cc2",
  blue: "#7cb6f0",
  amber: "#f0b97c",
};

function MiniProto({
  tweaks,
  setTweaks,
}: {
  tweaks: ProtoTweaks;
  setTweaks: React.Dispatch<React.SetStateAction<ProtoTweaks>>;
}) {
  const accent = ACCENTS[tweaks.accent];
  const bg = tweaks.dark ? "#0f1318" : "#fafaf9";
  const ink = tweaks.dark ? "#e7ebf0" : "#1c1917";
  const ink2 = tweaks.dark ? "#7a8290" : "#78716c";
  const card = tweaks.dark ? "#161a1f" : "#ffffff";
  const line = tweaks.dark ? "#232932" : "#e7e5e4";
  const pad = tweaks.density === "compact" ? 14 : tweaks.density === "cozy" ? 18 : 24;

  const [step, setStep] = React.useState(0);
  const [amount, setAmount] = React.useState("");
  const [vendor, setVendor] = React.useState("");
  const steps = ["amount", "vendor", "submit"];

  const reset = () => {
    setStep(0);
    setAmount("");
    setVendor("");
  };

  return (
    <div className="proto-demo" style={{ padding: 0, background: "transparent", border: 0 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 220px", gap: 16 }}>
        <div
          style={{
            background: bg,
            borderRadius: 10,
            padding: 28,
            border: `1px solid ${line}`,
            minHeight: 320,
            fontFamily: "Inter, sans-serif",
            color: ink,
            transition: "all 0.2s",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: pad,
            }}
          >
            <div
              style={{
                fontSize: 11,
                color: ink2,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              expense · step {step + 1}/3
            </div>
            <div style={{ display: "flex", gap: 4 }}>
              {steps.map((_, i) => (
                <span
                  key={i}
                  style={{
                    width: i === step ? 18 : 4,
                    height: 4,
                    borderRadius: 2,
                    background: i <= step ? accent : line,
                    transition: "all 0.25s",
                  }}
                />
              ))}
            </div>
          </div>

          {step === 0 && (
            <div>
              <div
                style={{
                  fontSize: pad === 14 ? 22 : 28,
                  fontWeight: 600,
                  marginBottom: 14,
                  letterSpacing: "-0.01em",
                }}
              >
                How much?
              </div>
              <div
                style={{
                  background: card,
                  borderRadius: 8,
                  padding: pad,
                  border: `1px solid ${line}`,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <span style={{ fontSize: 24, color: ink2 }}>$</span>
                <input
                  autoFocus
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  style={{
                    border: 0,
                    outline: 0,
                    background: "transparent",
                    fontSize: 32,
                    fontWeight: 600,
                    color: ink,
                    width: "100%",
                    fontFamily: "Inter, sans-serif",
                  }}
                />
              </div>
              <button
                onClick={() => amount && setStep(1)}
                disabled={!amount}
                style={{
                  marginTop: pad,
                  background: amount ? accent : line,
                  color: amount ? "#0a0a0a" : ink2,
                  border: 0,
                  padding: "12px 18px",
                  borderRadius: 6,
                  fontWeight: 600,
                  cursor: amount ? "pointer" : "not-allowed",
                  fontFamily: "Inter, sans-serif",
                  fontSize: 13,
                  transition: "background 0.15s",
                }}
              >
                Continue →
              </button>
            </div>
          )}

          {step === 1 && (
            <div>
              <div
                style={{
                  fontSize: pad === 14 ? 22 : 28,
                  fontWeight: 600,
                  marginBottom: 14,
                  letterSpacing: "-0.01em",
                }}
              >
                Where?
              </div>
              <input
                autoFocus
                type="text"
                value={vendor}
                onChange={(e) => setVendor(e.target.value)}
                placeholder="vendor or merchant"
                style={{
                  width: "100%",
                  background: card,
                  border: `1px solid ${line}`,
                  borderRadius: 8,
                  padding: pad,
                  fontSize: 16,
                  color: ink,
                  outline: "none",
                  fontFamily: "Inter, sans-serif",
                }}
              />
              <div style={{ display: "flex", gap: 8, marginTop: 8, flexWrap: "wrap" }}>
                {["Lyft", "Uber Eats", "Office Depot", "Amazon"].map((v) => (
                  <button
                    key={v}
                    onClick={() => setVendor(v)}
                    style={{
                      background: "transparent",
                      border: `1px solid ${line}`,
                      borderRadius: 999,
                      padding: "4px 10px",
                      fontSize: 11,
                      color: ink2,
                      cursor: "pointer",
                    }}
                  >
                    {v}
                  </button>
                ))}
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: pad }}>
                <button
                  onClick={() => setStep(0)}
                  style={{
                    background: "transparent",
                    border: `1px solid ${line}`,
                    padding: "12px 18px",
                    borderRadius: 6,
                    color: ink2,
                    cursor: "pointer",
                    fontFamily: "Inter, sans-serif",
                    fontSize: 13,
                  }}
                >
                  Back
                </button>
                <button
                  onClick={() => vendor && setStep(2)}
                  disabled={!vendor}
                  style={{
                    background: vendor ? accent : line,
                    color: vendor ? "#0a0a0a" : ink2,
                    border: 0,
                    padding: "12px 18px",
                    borderRadius: 6,
                    fontWeight: 600,
                    cursor: vendor ? "pointer" : "not-allowed",
                    fontFamily: "Inter, sans-serif",
                    fontSize: 13,
                  }}
                >
                  Continue →
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <div
                style={{
                  fontSize: pad === 14 ? 22 : 28,
                  fontWeight: 600,
                  marginBottom: 14,
                  letterSpacing: "-0.01em",
                }}
              >
                Looks good?
              </div>
              <div
                style={{
                  background: card,
                  border: `1px solid ${line}`,
                  borderRadius: 8,
                  padding: pad,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "6px 0",
                    borderBottom: `1px dashed ${line}`,
                  }}
                >
                  <span style={{ color: ink2, fontSize: 13 }}>Amount</span>
                  <span style={{ fontWeight: 600, fontSize: 13 }}>${amount}</span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "6px 0",
                  }}
                >
                  <span style={{ color: ink2, fontSize: 13 }}>Vendor</span>
                  <span style={{ fontWeight: 600, fontSize: 13 }}>{vendor}</span>
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: pad }}>
                <button
                  onClick={() => setStep(1)}
                  style={{
                    background: "transparent",
                    border: `1px solid ${line}`,
                    padding: "12px 18px",
                    borderRadius: 6,
                    color: ink2,
                    cursor: "pointer",
                    fontFamily: "Inter, sans-serif",
                    fontSize: 13,
                  }}
                >
                  Back
                </button>
                <button
                  onClick={reset}
                  style={{
                    background: accent,
                    color: "#0a0a0a",
                    border: 0,
                    padding: "12px 18px",
                    borderRadius: 6,
                    fontWeight: 600,
                    cursor: "pointer",
                    fontFamily: "Inter, sans-serif",
                    fontSize: 13,
                  }}
                >
                  Submit ✓
                </button>
              </div>
            </div>
          )}
        </div>

        <div
          style={{
            background: "var(--bg-1)",
            borderRadius: 10,
            padding: 14,
            border: "1px solid var(--line)",
            fontSize: 11,
          }}
        >
          <div
            style={{
              color: "var(--ink-3)",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              marginBottom: 12,
              fontSize: 10,
            }}
          >
            tweaks (live)
          </div>
          <div style={{ marginBottom: 14 }}>
            <div style={{ color: "var(--ink-2)", marginBottom: 6 }}>density</div>
            <div style={{ display: "flex", gap: 4 }}>
              {(["compact", "cozy", "comfy"] as const).map((d) => (
                <button
                  key={d}
                  onClick={() => setTweaks({ ...tweaks, density: d })}
                  style={{
                    flex: 1,
                    padding: "5px 0",
                    background: tweaks.density === d ? "var(--accent)" : "var(--bg-3)",
                    color: tweaks.density === d ? "#04140d" : "var(--ink-1)",
                    border: 0,
                    borderRadius: 4,
                    fontFamily: "var(--mono)",
                    fontSize: 10,
                    cursor: "pointer",
                  }}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 14 }}>
            <div style={{ color: "var(--ink-2)", marginBottom: 6 }}>accent</div>
            <div style={{ display: "flex", gap: 4 }}>
              {(Object.entries(ACCENTS) as Array<[ProtoTweaks["accent"], string]>).map(([k, v]) => (
                <button
                  key={k}
                  onClick={() => setTweaks({ ...tweaks, accent: k })}
                  style={{
                    flex: 1,
                    height: 24,
                    background: v,
                    border:
                      tweaks.accent === k
                        ? `2px solid var(--ink-0)`
                        : `2px solid transparent`,
                    borderRadius: 4,
                    cursor: "pointer",
                  }}
                  title={k}
                />
              ))}
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ color: "var(--ink-2)" }}>dark mode</span>
            <button
              onClick={() => setTweaks({ ...tweaks, dark: !tweaks.dark })}
              style={{
                width: 32,
                height: 18,
                borderRadius: 999,
                background: tweaks.dark ? "var(--accent)" : "var(--bg-3)",
                border: 0,
                cursor: "pointer",
                position: "relative",
                transition: "background 0.15s",
              }}
            >
              <span
                style={{
                  position: "absolute",
                  top: 2,
                  left: tweaks.dark ? 16 : 2,
                  width: 14,
                  height: 14,
                  borderRadius: 50,
                  background: "#fff",
                  transition: "left 0.15s",
                }}
              />
            </button>
          </div>
          <div
            style={{
              marginTop: 14,
              paddingTop: 12,
              borderTop: "1px solid var(--line)",
              color: "var(--ink-3)",
              lineHeight: 1.5,
              fontSize: 10,
            }}
          >
            // changes apply instantly. claude rewrites the source on save.
          </div>
        </div>
      </div>
    </div>
  );
}

// ── L6: Hand off to Claude Code ────────────────────────────────────────
function Lesson6({ onAdvance }: LessonProps) {
  const [stage, setStage] = React.useState<"idle" | "packaging" | "ready">("idle");
  const [progress, setProgress] = React.useState(0);

  const startHandoff = () => {
    setStage("packaging");
    setProgress(0);
    let p = 0;
    const id = setInterval(() => {
      p += 4 + Math.random() * 8;
      if (p >= 100) {
        p = 100;
        clearInterval(id);
        setStage("ready");
      }
      setProgress(Math.min(100, Math.round(p)));
    }, 80);
  };

  const stages = [
    { at: 0, label: "extract components" },
    { at: 25, label: "isolate state machines" },
    { at: 50, label: "normalize design tokens" },
    { at: 75, label: "write README + spec" },
    { at: 95, label: "package handoff" },
  ];

  return (
    <div className="lesson">
      <Head num="06" label="Hand off to Code">
        engineers <span className="accent">ship it</span>
      </Head>

      <div className="prose">
        <p>
          The prototype isn&apos;t the finish line — it&apos;s the <strong>spec</strong>. One click hands
          the whole artifact to Claude Code with a structured handoff: components, state, tokens,
          interaction notes, and acceptance criteria.
        </p>
      </div>

      <div className="card">
        <div className="card-title">
          <span className="marker">▸</span> handoff packager
          <span style={{ flex: 1 }} />
          <span style={{ fontSize: 10, color: "var(--ink-3)" }}>// simulated</span>
        </div>

        {stage === "idle" && (
          <div style={{ padding: "24px 0", textAlign: "center" }}>
            <div
              style={{
                fontFamily: "var(--sans)",
                color: "var(--ink-1)",
                fontSize: 14,
                marginBottom: 18,
              }}
            >
              Package this prototype as a Claude Code handoff.
            </div>
            <button className="btn primary" onClick={startHandoff}>
              package handoff →
            </button>
          </div>
        )}

        {stage === "packaging" && (
          <div>
            <div
              style={{
                height: 4,
                background: "var(--bg-3)",
                borderRadius: 2,
                overflow: "hidden",
                marginBottom: 14,
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${progress}%`,
                  background: "var(--accent)",
                  transition: "width 0.1s",
                }}
              />
            </div>
            <div style={{ fontFamily: "var(--mono)", fontSize: 12, lineHeight: 1.7 }}>
              {stages.map((s, i) => {
                const reached = progress >= s.at;
                const passed =
                  i < stages.length - 1 ? progress >= stages[i + 1].at : progress >= 100;
                return (
                  <div
                    key={i}
                    style={{
                      color: passed ? "var(--ink-3)" : reached ? "var(--accent)" : "var(--ink-3)",
                    }}
                  >
                    <span style={{ display: "inline-block", width: 18 }}>
                      {passed ? "✓" : reached ? "▸" : " "}
                    </span>
                    {s.label}
                  </div>
                );
              })}
            </div>
            <div
              style={{
                marginTop: 14,
                fontSize: 11,
                color: "var(--ink-3)",
                fontFamily: "var(--mono)",
              }}
            >
              {progress}%
            </div>
          </div>
        )}

        {stage === "ready" && (
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                color: "var(--accent)",
                marginBottom: 14,
                fontFamily: "var(--mono)",
                fontSize: 13,
              }}
            >
              <span style={{ fontSize: 16 }}>✓</span> ready · 14 files · 2.4 kB README
            </div>
            <div className="codeblock">
              <div className="codeblock-head">
                <span className="file">handoff/HANDOFF.md</span>
                <span>markdown</span>
              </div>
              <pre>
                <span className="tag"># Expense Submission Prototype</span>
                {"\n"}
                <span className="com">// Generated by Claude Design · 2026-05-04</span>
                {"\n\n"}
                <span className="tag">## Stack</span>
                {"\n"}- React 18 + Inter / system fonts{"\n"}- 3-step state machine (
                <span className="str">amount → vendor → confirm</span>){"\n"}- Design tokens in{" "}
                <span className="at">tokens.css</span>
                {"\n\n"}
                <span className="tag">## Components</span>
                {"\n"}- <span className="tk">{"<StepIndicator />"}</span>{" "}
                <span className="com">// dotline progress</span>
                {"\n"}- <span className="tk">{"<AmountInput />"}</span>{" "}
                <span className="com">// validation: positive number</span>
                {"\n"}- <span className="tk">{"<VendorPicker />"}</span>{" "}
                <span className="com">// freeform + 4 quick-pick chips</span>
                {"\n"}- <span className="tk">{"<ConfirmCard />"}</span>{" "}
                <span className="com">// summary + submit</span>
                {"\n\n"}
                <span className="tag">## Acceptance criteria</span>
                {"\n"}- [ ] All steps reachable in &lt; 3 taps{"\n"}- [ ] WCAG AA contrast on accent
                color{"\n"}- [ ] Submit triggers <span className="at">POST /expenses</span>
                {"\n"}
              </pre>
            </div>

            <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
              <button className="btn primary">open in claude code →</button>
              <button className="btn ghost" onClick={() => setStage("idle")}>
                start over
              </button>
              <button className="btn ghost">download .zip</button>
            </div>

            <div
              style={{
                marginTop: 20,
                padding: "12px 14px",
                background: "var(--bg-2)",
                borderRadius: 6,
                fontFamily: "var(--sans)",
                fontSize: 12.5,
                color: "var(--ink-1)",
                lineHeight: 1.6,
              }}
            >
              <strong style={{ color: "var(--ink-0)" }}>What your engineer gets:</strong> a working
              prototype, every component spec&apos;d, tokens normalized, and a written README. They wire
              it to your real API instead of writing UI from scratch.
            </div>
          </div>
        )}
      </div>

      <div className="prose">
        <h2>the loop, end-to-end</h2>
        <ol style={{ listStyle: "none", padding: 0, margin: "16px 0", counterReset: "step" }}>
          {(
            [
              ["Designer (you)", "briefs claude in chat"],
              ["Claude Design", "produces interactive prototype"],
              ["Stakeholders", "comment in the preview pane"],
              ["Claude Design", "iterates until approved"],
              ["Claude Code", "wires to backend, ships to prod"],
            ] as const
          ).map(([who, what], i) => (
            <li
              key={i}
              style={{
                display: "grid",
                gridTemplateColumns: "40px 160px 1fr",
                alignItems: "center",
                padding: "10px 0",
                borderBottom: i < 4 ? "1px dashed var(--line)" : "none",
              }}
            >
              <span style={{ fontFamily: "var(--mono)", color: "var(--accent)", fontSize: 12 }}>
                {String(i + 1).padStart(2, "0")}.
              </span>
              <span style={{ fontFamily: "var(--mono)", fontSize: 12, color: "var(--ink-0)" }}>
                {who}
              </span>
              <span style={{ fontFamily: "var(--sans)", fontSize: 13, color: "var(--ink-1)" }}>
                {what}
              </span>
            </li>
          ))}
        </ol>
      </div>

      <Foot onAdvance={onAdvance} nextNum="07" nextLabel="The business case" />
    </div>
  );
}

// ── L7: Business case ──────────────────────────────────────────────────
function Lesson7(_: LessonProps) {
  return (
    <div className="lesson">
      <Head num="07" label="The business case">
        the <span className="accent">numbers</span> for your boss
      </Head>

      <div className="prose">
        <p>
          The argument isn&apos;t &quot;AI does design now.&quot; It&apos;s{" "}
          <strong>
            &quot;your engineers can ship professional design output without hiring or contracting it
            out.&quot;
          </strong>{" "}
          Same team. More throughput.
        </p>
      </div>

      <div className="grid-3">
        <div className="stat">
          <div className="v">
            <span className="accent">~$0.40</span>
          </div>
          <div className="l">cost · this guide</div>
        </div>
        <div className="stat">
          <div className="v">
            <span className="accent">14 min</span>
          </div>
          <div className="l">build time · this guide</div>
        </div>
        <div className="stat">
          <div className="v">
            <span className="accent">0</span>
          </div>
          <div className="l">designers consulted</div>
        </div>
      </div>

      <div className="prose">
        <h2>vs. a typical design contract</h2>
      </div>

      <div className="card">
        <div className="card-title">
          <span className="marker">▸</span> illustrative comparison · interactive prototype
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "var(--mono)", fontSize: 12.5 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--line-2)" }}>
              <th
                style={{
                  textAlign: "left",
                  padding: "10px 0",
                  color: "var(--ink-3)",
                  fontWeight: 400,
                  fontSize: 10,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                metric
              </th>
              <th
                style={{
                  textAlign: "right",
                  padding: "10px 0",
                  color: "var(--ink-3)",
                  fontWeight: 400,
                  fontSize: 10,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                contractor
              </th>
              <th
                style={{
                  textAlign: "right",
                  padding: "10px 0",
                  color: "var(--ink-3)",
                  fontWeight: 400,
                  fontSize: 10,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                claude design
              </th>
              <th
                style={{
                  textAlign: "right",
                  padding: "10px 0",
                  color: "var(--accent)",
                  fontWeight: 400,
                  fontSize: 10,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                delta
              </th>
            </tr>
          </thead>
          <tbody>
            {(
              [
                ["Time to first hi-fi", "5–10 days", "~30 min", "20×"],
                ["Cost · single artifact", "$2,400", "< $5", "500×"],
                ["Cost · revision round", "$600", "< $1", "600×"],
                ["Variants explored", "2", "6+", "3×"],
                ["Production-ready handoff", "Figma → eng rebuild", "Working code", "native"],
                ["Lead time to ship", "3–4 weeks", "3–4 days", "7×"],
              ] as const
            ).map((r, i) => (
              <tr key={i} style={{ borderBottom: "1px dashed var(--line)" }}>
                <td style={{ padding: "12px 0", color: "var(--ink-1)" }}>{r[0]}</td>
                <td style={{ padding: "12px 0", textAlign: "right", color: "var(--ink-2)" }}>{r[1]}</td>
                <td style={{ padding: "12px 0", textAlign: "right", color: "var(--ink-0)" }}>{r[2]}</td>
                <td
                  style={{
                    padding: "12px 0",
                    textAlign: "right",
                    color: "var(--accent)",
                    fontWeight: 600,
                  }}
                >
                  {r[3]}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div
          style={{
            marginTop: 12,
            fontSize: 10,
            color: "var(--ink-3)",
            fontFamily: "var(--sans)",
          }}
        >
          ※ contractor numbers based on typical mid-market design firm rates. your mileage will vary.
        </div>
      </div>

      <div className="prose">
        <h2>what to do monday</h2>
        <ul>
          <li>Pick one recurring design need (onboarding, internal tools, marketing pages).</li>
          <li>Have one engineer try this guide end-to-end on it.</li>
          <li>Compare time-to-first-hi-fi against your current process.</li>
          <li>If it&apos;s better — and it will be — make Claude Design part of the standard kit.</li>
        </ul>
      </div>

      <div className="card stripe">
        <div className="card-title">
          <span className="marker">▸</span> the meta moment
        </div>
        <div
          style={{
            fontFamily: "var(--sans)",
            fontSize: 14,
            color: "var(--ink-1)",
            lineHeight: 1.65,
          }}
        >
          You just spent ~20 minutes touring a guide that was itself produced in ~14 minutes, for the
          price of a vending-machine coffee, by the platform it documents. Every interaction here was
          real code. Every animation was rendered live. The strongest pitch isn&apos;t this slide —
          it&apos;s the existence of this slide.
        </div>
      </div>

      <div className="lesson-foot">
        <button className="btn ghost" onClick={() => navigateToLesson("0")}>
          ← back to the start
        </button>
        <div className="next-info">
          <b>that&apos;s the tour.</b>
          go build something. ship it by friday.
        </div>
      </div>
    </div>
  );
}

// ── footer nav ─────────────────────────────────────────────────────────
function Foot({
  onAdvance,
  nextLabel,
}: {
  onAdvance: () => void;
  nextNum: string;
  nextLabel: string;
}) {
  return (
    <div className="lesson-foot">
      <span style={{ fontSize: 11, color: "var(--ink-3)" }}>
        <kbd>↑</kbd> <kbd>↓</kbd> or <kbd>J</kbd> <kbd>K</kbd> to navigate
      </span>
      <button className="btn primary" onClick={onAdvance}>
        next: {nextLabel} →
      </button>
    </div>
  );
}

export const LessonComponents: ReadonlyArray<React.ComponentType<LessonProps>> = [
  Lesson0,
  Lesson1,
  Lesson2,
  Lesson3,
  Lesson4,
  Lesson5,
  Lesson6,
  Lesson7,
];
