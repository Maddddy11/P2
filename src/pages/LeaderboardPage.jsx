import React, { useState, useMemo } from 'react';
import { THEMES, THEME_BY_CODE, MAX_TOTAL } from '../data/constants';


function ScoreBar({ score, max }) {
  const pct = Math.round((score / max) * 100);
  const color = pct >= 85 ? '#2e7029' : pct >= 60 ? '#0077cc' : pct >= 40 ? '#996300' : '#cc004e';
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 8 }}>
      <div style={{ flex: 1, background: 'rgba(0,21,36,0.05)', borderRadius: 999, height: 6, overflow: 'hidden', boxShadow: 'inset 1px 1px 3px rgba(0,21,36,0.06)' }}>
        <div style={{ width: `${pct}%`, height: '100%', background: color, borderRadius: 999, transition: 'width 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)' }} />
      </div>
      <span style={{ fontFamily: 'JetBrains Mono', fontSize: 12, color, fontWeight: 700, flexShrink: 0 }}>{pct}%</span>
    </div>
  );
}

export default function LeaderboardPage({ store, judgeThemeCode }) {
  // If judge — only show their theme; if admin — show all, with selector
  const [selTheme, setSelTheme] = useState(judgeThemeCode || 'AISense');
  const scores = store.scores || {};
  const flags = store.flags || {};
  const isAdmin = !judgeThemeCode;

  const theme = THEME_BY_CODE[selTheme];

  const ranked = useMemo(() => {
    const groups = (store.participants || []).filter(p => p.theme_code === selTheme);
    return groups
      .map(g => ({ group: g, score: scores[g.group_num], flagged: !!flags[g.group_num] }))
      .filter(r => r.score)
      .sort((a, b) => b.score.total - a.score.total);
  }, [selTheme, scores, flags]);

  const unscored = useMemo(() => {
    const groups = (store.participants || []).filter(p => p.theme_code === selTheme);
    return groups.filter(g => !scores[g.group_num]).length;
  }, [selTheme, scores]);

  const rankClass = i => i === 0 ? 'rank-1' : i === 1 ? 'rank-2' : i === 2 ? 'rank-3' : 'rank-n';
  const rankEmoji = i => i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `#${i + 1}`;

  return (
    <div className="page" style={{ position: 'relative', zIndex: 1 }}>
      {/* Header */}
      <div className="anim-fadeUp" style={{ marginBottom: 24 }}>
        <h1 style={{ fontFamily: 'Space Grotesk', fontSize: 30, fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 8 }}>
          <span style={{ background: 'linear-gradient(135deg,#ffa600,#996300)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Leaderboard</span>
        </h1>
        <div style={{ fontSize: 14, color: '#5a3f3f' }}>Live rankings per competition theme</div>
      </div>

      {/* Theme selector (admin sees all; judge sees only theirs) */}
      {isAdmin ? (
        <div className="tabs-wrap anim-fadeUp stagger-1" style={{ marginBottom: 20 }}>
          {THEMES.map(t => (
            <button key={t.code} className={`tab-btn ${selTheme === t.code ? 'active' : ''}`} onClick={() => setSelTheme(t.code)}>
              {t.icon} {t.code}
            </button>
          ))}
        </div>
      ) : (
        <div className="anim-fadeUp stagger-1" style={{ marginBottom: 20 }}>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {THEMES.map(t => (
              <button
                key={t.code}
                onClick={() => setSelTheme(t.code)}
                style={{
                  padding: '10px 18px', borderRadius: 999, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600,
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                  background: selTheme === t.code ? 'linear-gradient(135deg, #0095ff, #0077cc)' : 'rgba(255,255,255,0.6)',
                  color: selTheme === t.code ? '#ffffff' : '#3c2a2a',
                  borderWidth: 1, borderStyle: 'solid',
                  borderColor: selTheme === t.code ? 'transparent' : 'rgba(255,255,255,0.6)',
                  transition: 'all 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                  boxShadow: selTheme === t.code ? '0 6px 20px rgba(0,149,255,0.35)' : '4px 4px 10px rgba(0,21,36,0.05), -3px -3px 8px rgba(255,255,255,0.8)',
                }}
              >
                {t.icon} {t.code}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Theme card */}
      {theme && (
        <div className="anim-fadeUp stagger-2" style={{
          padding: '18px 20px', borderRadius: 22, marginBottom: 22,
          background: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.6)',
          backdropFilter: 'blur(16px)',
          boxShadow: '6px 6px 16px rgba(0,21,36,0.05), -4px -4px 12px rgba(255,255,255,0.85)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
            <div>
              <div style={{ fontFamily: 'Space Grotesk', fontWeight: 800, fontSize: 17, color: '#001524', marginBottom: 5 }}>
                {theme.icon} {theme.name}
              </div>
              <div style={{ fontSize: 13, color: '#5a3f3f' }}>
                {ranked.length} scored · {unscored} pending
              </div>
            </div>
            {ranked.length > 0 && (
              <div style={{ fontFamily: 'JetBrains Mono', fontSize: 13, color: '#0095ff', fontWeight: 700 }}>
                Top: {ranked[0]?.score.total}/{MAX_TOTAL}
              </div>
            )}
          </div>
        </div>
      )}

      {ranked.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '56px 28px', color: '#5a3f3f' }}>
          <div style={{ fontSize: 44, marginBottom: 16 }}>🏆</div>
          <div style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: 18, color: '#3c2a2a' }}>No scores submitted yet</div>
          <div style={{ fontSize: 14, marginTop: 10, color: '#777' }}>Scores will appear here in real-time</div>
        </div>
      ) : (
        <div>
          {ranked.map(({ group: g, score: s, flagged }, i) => (
            <div
              key={g.group_num}
              className={`lb-item anim-fadeUp`}
              style={{
                animationDelay: `${i * 0.04}s`,
                background: i === 0 ? 'rgba(255,166,0,0.12)' : i === 1 ? 'rgba(213,195,195,0.2)' : i === 2 ? 'rgba(255,184,51,0.1)' : 'rgba(255,255,255,0.7)',
                border: `1px solid ${i === 0 ? 'rgba(255,166,0,0.35)' : i === 1 ? 'rgba(170,136,136,0.3)' : i === 2 ? 'rgba(255,166,0,0.25)' : 'rgba(255,255,255,0.6)'}`,
              }}
            >
              {/* Rank */}
              <div className={`lb-rank ${rankClass(i)}`}>
                {i < 3 ? <span style={{ fontSize: 20 }}>{rankEmoji(i)}</span> : rankEmoji(i)}
              </div>

              {/* Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                  fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: 14, marginBottom: 4,
                  overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: '#001524',
                }}>
                  {g.project_title}
                </div>
                <div style={{ fontSize: 12, color: '#5a3f3f', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {g.leader} · {g.institute}
                </div>
                <ScoreBar score={s.total} max={MAX_TOTAL} />
              </div>

              {/* Score + flag */}
              <div style={{ flexShrink: 0, textAlign: 'right' }}>
                <div style={{
                  fontFamily: 'JetBrains Mono', fontSize: 28, fontWeight: 800, lineHeight: 1,
                  color: i === 0 ? '#996300' : i === 1 ? '#3c2a2a' : i === 2 ? '#cc8500' : '#0095ff',
                }}>{s.total}</div>
                <div style={{ fontSize: 11, color: '#777' }}>/ {MAX_TOTAL}</div>
                {flagged && <div style={{ fontSize: 13, marginTop: 3 }}>🚩</div>}
              </div>
            </div>
          ))}

          {/* Unscored notice */}
          {unscored > 0 && (
            <div style={{ border: '1px dashed rgba(0,21,36,0.12)', borderRadius: 16, padding: '16px', textAlign: 'center', marginTop: 12, background: 'rgba(255,255,255,0.5)' }}>
              <div style={{ fontSize: 13, color: '#5a3f3f' }}>+ {unscored} group{unscored > 1 ? 's' : ''} not yet evaluated</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
