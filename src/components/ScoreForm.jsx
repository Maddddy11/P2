import React, { useState } from 'react';
import { CRITERIA, MAX_TOTAL } from '../data/constants';
import Confetti from './Confetti';

const SCORE_COLORS = (val, max) => {
  const r = val / max;
  if (r >= 0.85) return { text: '#2e7029', glow: 'rgba(46,112,41,0.35)', track: '#4dba45' };
  if (r >= 0.60) return { text: '#0077cc', glow: 'rgba(0,119,204,0.3)', track: '#0095ff' };
  if (r >= 0.35) return { text: '#996300', glow: 'rgba(255,166,0,0.35)', track: '#ffa600' };
  return { text: '#cc004e', glow: 'rgba(204,0,78,0.3)', track: '#ff0062' };
};

function CriterionRow({ c, value, onChange }) {
  const pct = Math.round((value / c.max) * 100);
  const col = SCORE_COLORS(value, c.max);

  return (
    <div className="score-row">
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14, gap: 14 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5 }}>
            <span style={{ fontSize: 20 }}>{c.icon}</span>
            <span style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: 15, color: '#001524' }}>{c.label}</span>
            <span style={{ fontSize: 11, color: '#5a3f3f', fontWeight: 600, letterSpacing: '0.04em' }}>/{c.max}</span>
          </div>
          <div style={{ fontSize: 12, color: '#5a3f3f', lineHeight: 1.45 }}>{c.desc}</div>
        </div>
        {/* Score bubble */}
        <div style={{
          flexShrink: 0, width: 60, height: 60, borderRadius: 18,
          background: `rgba(${col.text === '#2e7029' ? '46,112,41' : col.text === '#0077cc' ? '0,119,204' : col.text === '#996300' ? '255,166,0' : '204,0,78'},0.1)`,
          border: `2px solid ${col.track}55`,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          boxShadow: `0 6px 20px ${col.glow}`,
          transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        }}>
          <span style={{ fontFamily: 'JetBrains Mono', fontSize: 22, fontWeight: 700, color: col.text, lineHeight: 1 }}>{value}</span>
          <span style={{ fontSize: 10, color: col.text, opacity: 0.85, fontWeight: 600 }}>{pct}%</span>
        </div>
      </div>

      {/* Slider */}
      <div style={{ position: 'relative', paddingBottom: 20 }}>
        <style>{`
          #slider-${c.key}::-webkit-slider-runnable-track {
            background: linear-gradient(to right, ${col.track} 0%, ${col.track} ${pct}%, rgba(0,21,36,0.06) ${pct}%, rgba(0,21,36,0.06) 100%);
            transition: background 0.3s ease;
          }
          #slider-${c.key}::-webkit-slider-thumb {
            background: linear-gradient(145deg, #ffffff, #e8ecf0);
            border: 3px solid ${col.track};
          }
        `}</style>
        <input
          id={`slider-${c.key}`}
          type="range"
          min={0} max={c.max} value={value}
          onChange={e => onChange(+e.target.value)}
          style={{ width: '100%' }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: 11, color: '#5a3f3f', fontWeight: 600 }}>
          <span>0 — Poor</span>
          <span>{Math.round(c.max * 0.55)} — Good</span>
          <span>{c.max} — Excellent</span>
        </div>
      </div>

      {/* Performance bands mini legend */}
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {c.bands.map((b, i) => (
          <span key={i} style={{
            fontSize: 10, padding: '4px 12px', borderRadius: 999, fontWeight: 600,
            background: i === 0 ? 'rgba(46,112,41,0.12)' : i === 1 ? 'rgba(0,119,204,0.1)' : 'rgba(204,0,78,0.1)',
            color: i === 0 ? '#2e7029' : i === 1 ? '#0077cc' : '#cc004e',
            border: `1px solid ${i === 0 ? 'rgba(46,112,41,0.25)' : i === 1 ? 'rgba(0,119,204,0.2)' : 'rgba(204,0,78,0.2)'}`,
          }}>
            {b.band} {b.range}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function ScoreForm({ group, judgeId, existing, flagged, onSave, onFlag, onClose }) {
  const initScores = () =>
    Object.fromEntries(CRITERIA.map(c => [c.key, existing?.[c.key] ?? 0]));

  const [scores, setScores] = useState(initScores);
  const [remarks, setRemarks] = useState(existing?.remarks || '');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const total = CRITERIA.reduce((s, c) => s + scores[c.key], 0);
  const pct = Math.round((total / MAX_TOTAL) * 100);
  const totalColor = SCORE_COLORS(total, MAX_TOTAL);

  function handleSubmit() {
    setSubmitting(true);
    setTimeout(() => {
      onSave({ ...scores, remarks, total });
      setSubmitting(false);
      setSuccess(true);
      setTimeout(() => { setSuccess(false); onClose(); }, 2200);
    }, 700);
  }

  if (success) return (
    <div className="modal-overlay" style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Confetti />
      <div className="anim-pop" style={{
        textAlign: 'center', padding: '48px 40px',
        background: 'rgba(255,255,255,0.95)', borderRadius: 32,
        border: '1px solid rgba(46,112,41,0.35)',
        boxShadow: '0 16px 56px rgba(46,112,41,0.25)',
        backdropFilter: 'blur(24px)',
        zIndex: 1,
      }}>
        <div style={{
          width: 80, height: 80, borderRadius: '50%', margin: '0 auto 20px',
          background: 'linear-gradient(135deg, #2e7029, #4dba45)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 40, color: '#fff', boxShadow: '0 10px 36px rgba(46,112,41,0.45)',
        }}>✓</div>
        <div style={{ fontFamily: 'Space Grotesk', fontSize: 26, fontWeight: 800, color: '#001524', marginBottom: 10 }}>Score Saved!</div>
        <div style={{ fontFamily: 'JetBrains Mono', fontSize: 44, fontWeight: 800, color: '#2e7029', marginBottom: 8 }}>{total}</div>
        <div style={{ fontSize: 15, color: '#5a3f3f' }}>out of {MAX_TOTAL} marks</div>
      </div>
    </div>
  );

  return (
    <div className="modal-overlay" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-sheet">
        {/* Header */}
        <div className="modal-header">
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: 'Space Grotesk', fontWeight: 800, fontSize: 18, color: '#001524', marginBottom: 5, lineHeight: 1.25 }}>
              {group.project_title}
            </div>
            <div style={{ fontSize: 13, color: '#5a3f3f' }}>
              {group.leader} · {group.institute}
            </div>
          </div>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>

        <div className="modal-body">
          {/* Abstract */}
          {group.description && (
            <div style={{
              background: 'rgba(0,149,255,0.08)', border: '1px solid rgba(0,149,255,0.2)',
              borderRadius: 18, padding: '16px 18px', marginBottom: 22,
            }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#0077cc', marginBottom: 8 }}>📄 Abstract</div>
              <div style={{ fontSize: 14, color: '#3c2a2a', lineHeight: 1.65 }}>{group.description}</div>
            </div>
          )}

          {/* Members */}
          {(group.member2 || group.member3 || group.member4) && (
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#5a3f3f', marginBottom: 10 }}>Team Members</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {[group.leader, group.member2, group.member3, group.member4].filter(Boolean).map((m, i) => (
                  <span key={i} className="badge badge-ghost">{i === 0 ? '👑 ' : ''}{m}</span>
                ))}
              </div>
            </div>
          )}

          {/* Live total */}
          <div style={{
            background: `linear-gradient(135deg, rgba(0,149,255,0.1), rgba(255,166,0,0.1))`,
            border: '1px solid rgba(0,149,255,0.25)',
            borderRadius: 22, padding: '24px', marginBottom: 24, textAlign: 'center',
            boxShadow: '6px 6px 16px rgba(0,21,36,0.05), -4px -4px 12px rgba(255,255,255,0.8)',
          }}>
            <div style={{ fontFamily: 'JetBrains Mono', fontSize: 60, fontWeight: 800, color: totalColor.text, lineHeight: 1, transition: 'color 0.3s', textShadow: `0 6px 24px ${totalColor.glow}` }}>{total}</div>
            <div style={{ fontSize: 13, color: '#5a3f3f', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: 8 }}>out of {MAX_TOTAL} · {pct}%</div>
            <div className="progress-wrap" style={{ height: 8, marginTop: 14 }}>
              <div className="progress-fill" style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${totalColor.track}, ${totalColor.track}88)` }} />
            </div>
          </div>

          {/* Criteria */}
          <div style={{ marginBottom: 8 }}>
            <div className="sec-label" style={{ marginBottom: 16 }}>Evaluation Criteria</div>
            {CRITERIA.map((c, i) => (
              <div key={c.key} className={`anim-fadeUp stagger-${Math.min(i + 1, 8)}`}>
                <CriterionRow
                  c={c}
                  value={scores[c.key]}
                  onChange={val => setScores(s => ({ ...s, [c.key]: val }))}
                />
              </div>
            ))}
          </div>

          {/* Remarks */}
          <div style={{ marginBottom: 18 }}>
            <div className="sec-label" style={{ marginBottom: 12 }}>Remarks (Optional)</div>
            <textarea
              className="input"
              rows={3}
              placeholder="Add observations, strengths, suggestions..."
              value={remarks}
              onChange={e => setRemarks(e.target.value)}
              style={{ resize: 'vertical', minHeight: 90, fontSize: 14, borderRadius: 18 }}
            />
          </div>

          {/* Flag */}
          <button
            onClick={onFlag}
            style={{
              width: '100%', padding: '14px', borderRadius: 16, cursor: 'pointer', marginBottom: 18,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
              fontSize: 14, fontWeight: 600, fontFamily: 'Plus Jakarta Sans, sans-serif',
              border: 'none', transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              background: flagged ? 'rgba(255,166,0,0.18)' : 'rgba(0,21,36,0.04)',
              color: flagged ? '#996300' : '#5a3f3f',
              borderWidth: 1, borderStyle: 'solid',
              borderColor: flagged ? 'rgba(255,166,0,0.4)' : 'rgba(0,21,36,0.1)',
              boxShadow: flagged ? '0 4px 16px rgba(255,166,0,0.2)' : 'none',
            }}
          >
            <span style={{ fontSize: 18 }}>🚩</span>
            {flagged ? 'Flagged for Review — Tap to Remove' : 'Flag for Later Review (Tie / Uncertain)'}
          </button>

          {/* Submit */}
          <button
            className={`btn ${submitting ? 'btn-ghost' : 'btn-teal'}`}
            style={{ width: '100%', padding: '18px', fontSize: 16, fontWeight: 700, borderRadius: 20 }}
            onClick={handleSubmit}
            disabled={submitting}
          >
            {submitting ? (
              <><span className="anim-spin" style={{ display: 'inline-block', fontSize: 20 }}>⟳</span> Saving…</>
            ) : (
              <>✓ Submit Score — {total}/{MAX_TOTAL}</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
