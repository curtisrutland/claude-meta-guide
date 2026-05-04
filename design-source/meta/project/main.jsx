// app.jsx — shell + navigation

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "showShortcuts": true,
  "compactSidebar": false,
  "accentHue": "mint"
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [current, setCurrent] = React.useState(0);
  const [visited, setVisited] = React.useState(new Set([0]));
  const mainRef = React.useRef(null);

  const total = window.LESSONS.length;

  // load progress from localStorage
  React.useEffect(() => {
    try {
      const saved = localStorage.getItem('meta-guide-progress');
      if (saved) {
        const v = JSON.parse(saved);
        if (Array.isArray(v.visited)) setVisited(new Set(v.visited));
        if (typeof v.current === 'number') setCurrent(v.current);
      }
    } catch {}
  }, []);

  // persist
  React.useEffect(() => {
    try {
      localStorage.setItem('meta-guide-progress', JSON.stringify({
        visited: [...visited],
        current,
      }));
    } catch {}
  }, [visited, current]);

  // mark visited on change & scroll to top
  React.useEffect(() => {
    setVisited(v => new Set([...v, current]));
    if (mainRef.current) mainRef.current.scrollTop = 0;
  }, [current]);

  // keyboard nav
  React.useEffect(() => {
    const onKey = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (e.key === 'ArrowDown' || e.key === 'j') { e.preventDefault(); setCurrent(c => Math.min(total-1, c+1)); }
      else if (e.key === 'ArrowUp' || e.key === 'k') { e.preventDefault(); setCurrent(c => Math.max(0, c-1)); }
      else if (e.key === 'g') { setCurrent(0); }
      else if (e.key === 'G') { setCurrent(total-1); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [total]);

  const Lesson = window.LessonComponents[current];
  const advance = () => setCurrent(c => Math.min(total-1, c+1));

  const accentMap = {
    mint:  { c: '#7cf0c2', dim: '#2a4d3e' },
    pink:  { c: '#f07cc2', dim: '#4d2a3e' },
    blue:  { c: '#7cb6f0', dim: '#2a3a4d' },
    amber: { c: '#f0b97c', dim: '#4d3a2a' },
  };
  const a = accentMap[t.accentHue] || accentMap.mint;

  const progressPct = Math.round((visited.size / total) * 100);

  return (
    <>
      <style>{`
        :root {
          --accent: ${a.c};
          --accent-dim: ${a.dim};
        }
      `}</style>
      <div className="shell">
        <div className="topbar">
          <div className="brand">
            <span className="dot" />
            meta
            <span className="slash">/</span>
            <span style={{fontWeight:400, color:'var(--ink-2)'}}>a guide to designing with claude</span>
          </div>
          <span style={{flex:1}} />
          <div className="meta">
            <span className="pill live">live · real model calls</span>
            <span className="pill">{progressPct}% complete</span>
          </div>
        </div>

        <aside className="sidebar">
          <div className="section-label">progress</div>
          <div className="progress-bar"><div className="progress-fill" style={{width: `${progressPct}%`}} /></div>
          <div className="progress-meta">
            <span>{visited.size} / {total} lessons</span>
            <span>{Math.round(visited.size * 3.0)} min spent</span>
          </div>

          <div className="section-label">tour</div>
          <ul className="nav">
            {window.LESSONS.map((l, i) => (
              <li key={l.id}
                  data-id={l.id}
                  className={`${current === i ? 'active' : ''} ${visited.has(i) && current !== i ? 'done' : ''}`}
                  onClick={() => setCurrent(i)}>
                <span className="num">{l.num}</span>
                <span className="lbl">{l.label}</span>
                <span className="dur">{l.dur}</span>
              </li>
            ))}
          </ul>

          <div className="footer">
            this guide is a working artifact built with the platform it teaches.<br/>
            inspect it. break it. <a href="#" onClick={(e)=>{e.preventDefault(); localStorage.removeItem('meta-guide-progress'); setCurrent(0); setVisited(new Set([0]));}}>reset progress</a>.
          </div>
        </aside>

        <main className="main" ref={mainRef}>
          <div className="lesson-wrap" key={current}>
            <Lesson onAdvance={advance} />
          </div>
        </main>

        <div className="bottombar">
          <span className="kbd"><kbd>↑</kbd><kbd>↓</kbd> nav</span>
          <span className="kbd"><kbd>j</kbd><kbd>k</kbd> nav</span>
          <span className="kbd"><kbd>g</kbd> top</span>
          <span className="kbd"><kbd>G</kbd> end</span>
          <span className="spacer" />
          <span className="git">claude · <b>meta-guide</b> · L{String(current).padStart(2,'0')} of {String(total-1).padStart(2,'0')}</span>
        </div>
      </div>

      <TweaksPanel title="Tweaks">
        <TweakSection label="display" />
        <TweakRadio label="accent"
                    value={t.accentHue}
                    options={['mint','pink','blue','amber']}
                    onChange={v => setTweak('accentHue', v)} />
        <TweakToggle label="show shortcut bar"
                     value={t.showShortcuts}
                     onChange={v => setTweak('showShortcuts', v)} />
        <TweakSection label="progress" />
        <TweakButton label="reset progress" secondary
                     onClick={() => {
                       localStorage.removeItem('meta-guide-progress');
                       setCurrent(0);
                       setVisited(new Set([0]));
                     }} />
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
