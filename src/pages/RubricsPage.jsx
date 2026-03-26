import React, { useState } from 'react';
import { CRITERIA, THEMES, MAX_TOTAL } from '../data/constants';

function CriterionDetail({ c, idx }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`anim-fadeUp stagger-${Math.min(idx + 1, 6)}`}
      style={{
        background: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.6)',
        borderRadius: 20, marginBottom: 14, overflow: 'hidden',
        backdropFilter: 'blur(16px)',
        boxShadow: '6px 6px 16px rgba(0,21,36,0.05), -4px -4px 12px rgba(255,255,255,0.85)',
      }}
    >
      <div
        onClick={() => setOpen(!open)}
        style={{ padding: '18px 20px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 16 }}
      >
        <span style={{ fontSize: 26, flexShrink: 0 }}>{c.icon}</span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: 15, color: '#001524', marginBottom: 4 }}>{c.label}</div>
          <div style={{ fontSize: 12, color: '#5a3f3f' }}>{c.desc}</div>
        </div>
        <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
          <span className="badge badge-purple" style={{ fontSize: 12 }}>{c.max} marks</span>
          <span style={{ fontSize: 12, color: '#5a3f3f', transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}>▼</span>
        </div>
      </div>

      {open && (
        <div className="anim-fadeUp" style={{ borderTop: '1px solid rgba(0,21,36,0.06)' }}>
          {c.bands.map((b, j) => (
            <div key={j} style={{
              padding: '16px 20px',
              borderBottom: j < c.bands.length - 1 ? '1px solid rgba(0,21,36,0.04)' : 'none',
              display: 'flex', gap: 14, alignItems: 'flex-start',
            }}>
              <span className={`badge ${j === 0 ? 'badge-green' : j === 1 ? 'badge-teal' : 'badge-red'}`} style={{ flexShrink: 0, fontSize: 11 }}>
                {b.band}
              </span>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: 'JetBrains Mono', fontSize: 12, color: '#5a3f3f', marginBottom: 5, fontWeight: 600 }}>{b.range} marks</div>
                <div style={{ fontSize: 13, color: '#3c2a2a', lineHeight: 1.6 }}>{b.desc}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function RubricsPage() {
  return (
    <div className="page" style={{ position: 'relative', zIndex: 1 }}>
      <div className="anim-fadeUp" style={{ marginBottom: 26 }}>
        <h1 style={{ fontFamily: 'Space Grotesk', fontSize: 30, fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 8 }}>
          <span style={{ background: 'linear-gradient(135deg,#0095ff,#ff0062)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Evaluation Rubrics</span>
        </h1>
        <div style={{ fontSize: 14, color: '#5a3f3f' }}>100-Mark Scoring Framework · ProTech 2026</div>
      </div>

      {/* Event info card */}
      <div className="anim-fadeUp stagger-1" style={{
        background: 'rgba(0,149,255,0.08)', border: '1px solid rgba(0,149,255,0.2)',
        borderRadius: 22, padding: '20px', marginBottom: 24,
      }}>
        <div style={{ fontFamily: 'Space Grotesk', fontWeight: 800, fontSize: 15, color: '#0077cc', marginBottom: 16 }}>
          Format for Project Work Evaluation · B.Tech
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {[
            ['Institution', 'SIT Pune'],
            ['Stream', 'B.Tech / Diploma'],
            ['Event Type', 'One-Day Exhibition'],
            ['Max Marks', '100 Total'],
            ['Event Date', 'March 28, 2026'],
            ['Department', 'All Departments'],
          ].map(([k, v]) => (
            <div key={k} style={{ background: 'rgba(255,255,255,0.7)', borderRadius: 14, padding: '12px 14px', boxShadow: 'inset 2px 2px 4px rgba(0,21,36,0.04), inset -2px -2px 4px rgba(255,255,255,0.7)' }}>
              <div style={{ fontSize: 10, color: '#5a3f3f', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 4, fontWeight: 600 }}>{k}</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#001524' }}>{v}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary table */}
      <div className="anim-fadeUp stagger-2" style={{
        background: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.6)',
        borderRadius: 22, padding: '20px', marginBottom: 24,
        backdropFilter: 'blur(16px)',
        boxShadow: '6px 6px 16px rgba(0,21,36,0.05), -4px -4px 12px rgba(255,255,255,0.85)',
      }}>
        <div className="sec-label" style={{ marginBottom: 16 }}>Marks Allocation</div>
        {CRITERIA.map((c, i) => (
          <div key={c.key} style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '12px 16px', borderRadius: 14, marginBottom: 8,
            background: i % 2 === 0 ? 'rgba(0,21,36,0.03)' : 'transparent',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 20 }}>{c.icon}</span>
              <span style={{ fontSize: 14, fontWeight: 600, color: '#001524' }}>{c.label}</span>
            </div>
            <span style={{ fontFamily: 'JetBrains Mono', fontSize: 15, fontWeight: 800, color: '#0095ff' }}>{c.max}</span>
          </div>
        ))}
        <div style={{ borderTop: '1px solid rgba(0,149,255,0.2)', marginTop: 12, paddingTop: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px', background: 'rgba(0,149,255,0.08)', borderRadius: 16 }}>
          <span style={{ fontFamily: 'Space Grotesk', fontWeight: 800, fontSize: 16, color: '#001524' }}>TOTAL</span>
          <span style={{ fontFamily: 'JetBrains Mono', fontSize: 24, fontWeight: 800, color: '#0095ff' }}>{MAX_TOTAL}</span>
        </div>
      </div>

      {/* PPT sub-criteria */}
      <div className="anim-fadeUp stagger-3" style={{
        background: 'rgba(255,0,98,0.08)', border: '1px solid rgba(255,0,98,0.2)',
        borderRadius: 22, padding: '20px', marginBottom: 24,
      }}>
        <div style={{ fontFamily: 'Space Grotesk', fontWeight: 800, fontSize: 15, color: '#cc004e', marginBottom: 14 }}>
          📊 PPT Presentation Sub-criteria (15 marks)
        </div>
        {[
          ['Body Language', '5', 'Eye contact, posture, confidence, stage presence'],
          ['Communication Skills', '5', 'Clarity, articulation, pacing, audience engagement'],
          ['Content Quality', '5', 'Relevance, accuracy, logical flow, visual design of slides'],
        ].map(([l, m, d]) => (
          <div key={l} style={{ display: 'flex', gap: 14, padding: '12px 0', borderBottom: '1px solid rgba(255,0,98,0.15)', alignItems: 'flex-start' }}>
            <span className="badge badge-pink" style={{ fontSize: 11, flexShrink: 0 }}>{m} marks</span>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4, color: '#001524' }}>{l}</div>
              <div style={{ fontSize: 13, color: '#5a3f3f', lineHeight: 1.55 }}>{d}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Detailed criteria */}
      <div className="sec-label" style={{ marginBottom: 16 }}>Detailed Performance Bands</div>
      {CRITERIA.map((c, i) => (
        <CriterionDetail key={c.key} c={c} idx={i} />
      ))}

      {/* Themes reference */}
      <div className="anim-fadeUp" style={{ marginTop: 28 }}>
        <div className="sec-label" style={{ marginBottom: 16 }}>Competition Themes</div>
        {THEMES.map((t, i) => (
          <div key={t.code} className={`anim-fadeUp stagger-${Math.min(i + 1, 6)}`} style={{
            display: 'flex', gap: 16, alignItems: 'flex-start',
            padding: '16px 18px', borderRadius: 18, marginBottom: 12,
            background: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.6)',
            backdropFilter: 'blur(12px)',
            boxShadow: '4px 4px 12px rgba(0,21,36,0.04), -3px -3px 10px rgba(255,255,255,0.8)',
          }}>
            <span style={{ fontSize: 26, flexShrink: 0 }}>{t.icon}</span>
            <div>
              <div style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: 14, color: '#001524', marginBottom: 4 }}>
                {t.code} · {t.name}
              </div>
              <div style={{ fontSize: 12, color: '#5a3f3f', lineHeight: 1.55 }}>{t.full}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
