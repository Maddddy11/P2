import React, { useState } from 'react';
import { THEME_BY_CODE, MAX_TOTAL } from '../data/constants';

export default function GroupCard({ group, score, flagged, idx, onScore }) {
  const [expanded, setExpanded] = useState(false);
  const theme = THEME_BY_CODE[group.theme_code];
  const hasScore = !!score;
  const pct = hasScore ? Math.round((score.total / MAX_TOTAL) * 100) : 0;

  return (
    <div
      className={`anim-fadeUp stagger-${Math.min((idx % 6) + 1, 6)}`}
      style={{
        background: 'rgba(255,255,255,0.7)',
        backdropFilter: 'blur(16px)',
        border: `1px solid ${hasScore ? 'rgba(46,112,41,0.35)' : 'rgba(255,255,255,0.6)'}`,
        borderRadius: 24,
        marginBottom: 14,
        overflow: 'hidden',
        transition: 'all 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        boxShadow: '6px 6px 16px rgba(0,21,36,0.06), -4px -4px 12px rgba(255,255,255,0.85)',
      }}
    >
      {/* Card Head */}
      <div
        style={{ padding: '18px 18px 16px', cursor: 'pointer', position: 'relative' }}
        onClick={() => setExpanded(!expanded)}
      >
        {/* Scored gradient strip */}
        {hasScore && (
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: 4,
            background: 'linear-gradient(90deg, #2e7029, #4dba45)',
            borderRadius: '24px 24px 0 0',
          }} />
        )}

        <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
          {/* Number badge */}
          <div style={{
            flexShrink: 0, width: 48, height: 48, borderRadius: 16,
            background: hasScore ? 'linear-gradient(135deg, #2e7029, #4dba45)' : theme?.bg || 'rgba(0,149,255,0.12)',
            border: `2px solid ${hasScore ? 'rgba(46,112,41,0.5)' : theme?.border || 'rgba(0,149,255,0.3)'}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'JetBrains Mono', fontSize: 13, fontWeight: 700,
            color: hasScore ? '#fff' : (theme?.color || '#0095ff'),
            boxShadow: hasScore ? '0 6px 20px rgba(46,112,41,0.35)' : '4px 4px 10px rgba(0,21,36,0.06), -2px -2px 6px rgba(255,255,255,0.8)',
            marginTop: hasScore ? 3 : 0,
          }}>
            {hasScore ? '✓' : `G${String(group.id).padStart(2, '0')}`}
          </div>

          {/* Info */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{
              fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: 15,
              color: '#001524', marginBottom: 6, lineHeight: 1.3,
              overflow: 'hidden', textOverflow: 'ellipsis',
              display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
            }}>
              {group.project_title}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, alignItems: 'center' }}>
              <span style={{ fontSize: 12, color: '#5a3f3f', maxWidth: '160px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {group.institute}
              </span>
              {group.category && (
                <span className="badge badge-ghost" style={{ fontSize: 10, padding: '3px 10px' }}>{group.category}</span>
              )}
              {flagged && <span className="badge badge-yellow" style={{ fontSize: 10 }}>🚩 Flagged</span>}
              {hasScore && (
                <span className="badge badge-green" style={{ fontSize: 10 }}>
                  ✓ {score.total}/{MAX_TOTAL}
                </span>
              )}
            </div>
          </div>

          {/* Expand arrow + score circle */}
          <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
            {hasScore && (
              <div style={{ position: 'relative', width: 42, height: 42 }}>
                <svg width="42" height="42" viewBox="0 0 42 42" style={{ transform: 'rotate(-90deg)' }}>
                  <circle cx="21" cy="21" r="17" fill="none" stroke="rgba(0,21,36,0.06)" strokeWidth="4" />
                  <circle cx="21" cy="21" r="17" fill="none" stroke="#2e7029" strokeWidth="4"
                    strokeDasharray={`${2 * Math.PI * 17 * pct / 100} ${2 * Math.PI * 17}`}
                    strokeLinecap="round" />
                </svg>
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'JetBrains Mono', fontSize: 10, fontWeight: 700, color: '#2e7029' }}>
                  {pct}%
                </div>
              </div>
            )}
            <span style={{
              fontSize: 13, color: '#5a3f3f',
              transform: expanded ? 'rotate(180deg)' : 'none',
              transition: 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              display: 'block',
            }}>▼</span>
          </div>
        </div>
      </div>

      {/* Expanded body */}
      {expanded && (
        <div className="anim-fadeUp" style={{ padding: '0 18px 18px', borderTop: '1px solid rgba(0,21,36,0.06)' }}>
          {/* Abstract */}
          {group.description && (
            <div style={{
              background: 'rgba(0,149,255,0.08)', border: '1px solid rgba(0,149,255,0.2)',
              borderRadius: 16, padding: '14px 16px', marginTop: 16, marginBottom: 16,
            }}>
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#0077cc', marginBottom: 6 }}>Abstract</div>
              <div style={{ fontSize: 13, color: '#3c2a2a', lineHeight: 1.65 }}>{group.description}</div>
            </div>
          )}

          {/* Meta grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
            {[
              ['Branch', group.branch],
              ['Location', group.location],
              ['Members', group.num_members],
              ['Category', group.category],
            ].map(([label, val]) => val && (
              <div key={label} style={{ background: 'rgba(0,21,36,0.03)', borderRadius: 14, padding: '12px 14px', boxShadow: 'inset 2px 2px 4px rgba(0,21,36,0.04), inset -2px -2px 4px rgba(255,255,255,0.7)' }}>
                <div style={{ fontSize: 10, color: '#5a3f3f', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>{label}</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#001524', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{val}</div>
              </div>
            ))}
          </div>

          {/* Members */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 10, color: '#5a3f3f', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 8, fontWeight: 600 }}>Team</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {[group.leader, group.member2, group.member3, group.member4].filter(Boolean).map((m, i) => (
                <span key={i} className="badge badge-ghost" style={{ fontSize: 12 }}>
                  {i === 0 ? '👑 ' : `${i + 1}. `}{m}
                </span>
              ))}
            </div>
          </div>

          {/* Score display if already scored */}
          {hasScore && score.remarks && (
            <div style={{ background: 'rgba(46,112,41,0.1)', border: '1px solid rgba(46,112,41,0.25)', borderRadius: 14, padding: '12px 16px', marginBottom: 16 }}>
              <div style={{ fontSize: 10, color: '#2e7029', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 6, fontWeight: 700 }}>Judge Remarks</div>
              <div style={{ fontSize: 13, color: '#3c2a2a', fontStyle: 'italic' }}>"{score.remarks}"</div>
            </div>
          )}

          {/* CTA */}
          <button
            className="btn btn-primary"
            style={{ width: '100%', padding: '16px', fontWeight: 700, fontSize: 14, borderRadius: 18 }}
            onClick={e => { e.stopPropagation(); onScore(); }}
          >
            {hasScore
              ? <>✎ Re-evaluate — {score.total}/{MAX_TOTAL}</>
              : <>⬡ Start Evaluation</>}
          </button>
        </div>
      )}
    </div>
  );
}
