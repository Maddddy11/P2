import React, { useState, useMemo } from 'react';
import { THEMES, THEME_BY_CODE, CRITERIA, MAX_TOTAL, JUDGES_INITIAL } from '../data/constants';


// ─── Add/Edit Judge Modal ────────────────────────────────────────────────────
function JudgeModal({ judge, onSave, onClose }) {
  const isEdit = !!judge;
  const [form, setForm] = useState(judge || {
    id: `j${Date.now()}`,
    name: '', username: '', defaultPassword: 'ProTech@2026',
    secret: `PT26-NEW-${Math.random().toString(36).slice(2, 6).toUpperCase()}`,
    theme_code: 'MECV', designation: '', institute: '',
  });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  return (
    <div className="modal-overlay" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-sheet" style={{ maxWidth: 480 }}>
        <div className="modal-header">
          <div style={{ fontFamily: 'Space Grotesk', fontWeight: 800, fontSize: 17, color: '#001524' }}>
            {isEdit ? 'Edit Judge' : 'Add New Judge'}
          </div>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          {[
            ['Full Name', 'name', 'text', 'Dr. / Prof. Full Name'],
            ['Username', 'username', 'text', 'judge01 (unique)'],
            ['Default Password', 'defaultPassword', 'text', 'ProTech@2026'],
            ['Secret Key', 'secret', 'text', 'PT26-XXXXX-XXXX'],
            ['Designation', 'designation', 'text', 'Professor, Dept'],
            ['Institute', 'institute', 'text', 'Institution name'],
          ].map(([label, key, type, ph]) => (
            <div key={key} style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#5a3f3f', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.07em' }}>{label}</label>
              <input className="input" type={type} placeholder={ph} value={form[key] || ''} onChange={e => set(key, e.target.value)} style={{ fontSize: 14 }} />
            </div>
          ))}

          <div style={{ marginBottom: 22 }}>
            <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#5a3f3f', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.07em' }}>Assigned Theme</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {THEMES.map(t => (
                <button key={t.code} type="button" onClick={() => set('theme_code', t.code)} style={{
                  padding: '9px 16px', borderRadius: 999, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 700,
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                  background: form.theme_code === t.code ? t.bg : 'rgba(0,21,36,0.04)',
                  color: form.theme_code === t.code ? t.color : '#5a3f3f',
                  borderWidth: 1, borderStyle: 'solid',
                  borderColor: form.theme_code === t.code ? t.border : 'rgba(0,21,36,0.1)',
                  transition: 'all 0.3s',
                }}>
                  {t.icon} {t.code}
                </button>
              ))}
            </div>
          </div>

          <button className="btn btn-primary" style={{ width: '100%', padding: '16px', fontSize: 15, fontWeight: 700, borderRadius: 18 }} onClick={() => { onSave(form); onClose(); }}>
            {isEdit ? '✓ Update Judge' : '+ Add Judge'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Add/Edit Team Modal ────────────────────────────────────────────────────
function TeamModal({ team, onSave, onClose }) {
  const isEdit = !!team;
  const [form, setForm] = useState(team || {
    group_num: '',
    project_title: '',
    theme_code: 'MECV',
    leader: '',
    institute: 'SIT Pune',
    category: 'Engineering'
  });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  return (
    <div className="modal-overlay" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-sheet" style={{ maxWidth: 480 }}>
        <div className="modal-header">
          <div style={{ fontFamily: 'Space Grotesk', fontWeight: 800, fontSize: 17, color: '#001524' }}>
            {isEdit ? 'Edit Team' : 'Add New Team'}
          </div>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          {[
            ['Group No.', 'group_num', 'text', 'G01'],
            ['Project Title', 'project_title', 'text', 'Project Name'],
            ['Team Leader', 'leader', 'text', 'Full Name'],
            ['Institute', 'institute', 'text', 'SIT Pune'],
          ].map(([label, key, type, ph]) => (
            <div key={key} style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#5a3f3f', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.07em' }}>{label}</label>
              <input className="input" type={type} placeholder={ph} value={form[key] || ''} onChange={e => set(key, e.target.value)} style={{ fontSize: 14 }} />
            </div>
          ))}

          <div style={{ marginBottom: 22 }}>
            <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#5a3f3f', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.07em' }}>Theme</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {THEMES.map(t => (
                <button key={t.code} type="button" onClick={() => set('theme_code', t.code)} style={{
                  padding: '9px 16px', borderRadius: 999, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 700,
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                  background: form.theme_code === t.code ? t.bg : 'rgba(0,21,36,0.04)',
                  color: form.theme_code === t.code ? t.color : '#5a3f3f',
                  borderWidth: 1, borderStyle: 'solid',
                  borderColor: form.theme_code === t.code ? t.border : 'rgba(0,21,36,0.1)',
                  transition: 'all 0.3s',
                }}>
                  {t.icon} {t.code}
                </button>
              ))}
            </div>
          </div>

          <button className="btn btn-primary" style={{ width: '100%', padding: '16px', fontSize: 15, fontWeight: 700, borderRadius: 18 }} onClick={() => { onSave(form); onClose(); }}>
            {isEdit ? '✓ Update Team' : '+ Add Team'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Admin Panel ────────────────────────────────────────────────────────
export default function AdminPanel({ store, update, addJudge, updateJudge, deleteJudge, clearAll, showToast }) {
  const [tab, setTab] = useState('overview');
  const [judgeModal, setJudgeModal] = useState(null); // null | 'add' | judgeObj
  const [teamModal, setTeamModal] = useState(null); // null | 'add' | teamObj
  const [filterTheme, setFilterTheme] = useState('all');

  const scores = store.scores || {};
  const flags = store.flags || {};
  const judges = store.judges || JUDGES_INITIAL;
  const participants = store.participants || [];

  const allScored = (store.participants || []).filter(g => !!scores[g.group_num]);
  const allFlagged = (store.participants || []).filter(g => !!flags[g.group_num]);

  // Per-theme stats
  const themeStats = useMemo(() => THEMES.map(t => {
    const groups = (store.participants || []).filter(g => g.theme_code === t.code);
    const scored = groups.filter(g => !!scores[g.group_num]).length;
    const topScore = groups.map(g => scores[g.group_num]?.total || 0).reduce((a, b) => Math.max(a, b), 0);
    return { ...t, total: groups.length, scored, topScore };
  }), [scores]);

  const filteredScores = useMemo(() => {
    if (filterTheme === 'all') return allScored;
    return allScored.filter(g => g.theme_code === filterTheme);
  }, [allScored, filterTheme]);

  // Export CSV
  function exportCSV() {
    const rows = [['Group ID', 'Project Title', 'Theme', 'Leader', 'Institute', ...CRITERIA.map(c => c.label), 'Total', 'Remarks', 'Flagged']];
    allScored.forEach(g => {
      const s = scores[g.group_num];
      rows.push([g.group_num, g.project_title, g.theme_code, g.leader, g.institute, ...CRITERIA.map(c => s[c.key] ?? 0), s.total, s.remarks || '', flags[g.group_num] ? 'Yes' : 'No']);
    });
    const csv = rows.map(r => r.map(v => `"${String(v).replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'protech2026_scores.csv'; a.click();
    URL.revokeObjectURL(url);
    showToast('CSV exported', 'success');
  }

  const tabs = [
    { key: 'overview', label: 'Overview', icon: '⊞' },
    { key: 'judges', label: 'Judges', icon: '👤' },
    { key: 'teams', label: 'Teams', icon: '👥' },
    { key: 'scores', label: 'Scores', icon: '📋' },
    { key: 'flagged', label: `Flags${allFlagged.length ? ` (${allFlagged.length})` : ''}`, icon: '🚩' },
    { key: 'credentials', label: 'Creds', icon: '🔑' },
  ];

  return (
    <div className="page" style={{ position: 'relative', zIndex: 1 }}>
      {/* Header */}
      <div className="anim-fadeUp" style={{ marginBottom: 22 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, marginBottom: 6 }}>
          <h1 style={{ fontFamily: 'Space Grotesk', fontSize: 28, fontWeight: 800, letterSpacing: '-0.02em' }}>
            <span style={{ background: 'linear-gradient(135deg,#0095ff,#ff0062)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Admin Panel</span>
          </h1>
          <button className="btn btn-danger btn-sm" onClick={() => { if (window.confirm('Clear ALL scores? This is irreversible.')) { clearAll(); showToast('All scores cleared', 'warn'); } }}>
            🗑 Clear Scores
          </button>
        </div>
        <div style={{ fontSize: 14, color: '#5a3f3f' }}>ProTech 2026 · Coordinator Dashboard</div>
      </div>

      {/* Stats row */}
      <div className="anim-fadeUp stagger-1" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10, marginBottom: 22 }}>
        {[
          ['Total', (store.participants || []).length, '#0095ff', '📋'],
          ['Scored', allScored.length, '#2e7029', '✓'],
          ['Flagged', allFlagged.length, '#ffa600', '🚩'],
          ['Judges', judges.length, '#ff0062', '👤'],
        ].map(([l, v, c, icon]) => (
          <div key={l} style={{ background: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.6)', borderRadius: 16, padding: '14px 10px', textAlign: 'center', boxShadow: '4px 4px 12px rgba(0,21,36,0.04), -3px -3px 10px rgba(255,255,255,0.8)' }}>
            <div style={{ fontSize: 18, marginBottom: 5 }}>{icon}</div>
            <div style={{ fontFamily: 'Space Grotesk', fontSize: 24, fontWeight: 800, color: c, lineHeight: 1 }}>{v}</div>
            <div style={{ fontSize: 11, color: '#5a3f3f', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: 4 }}>{l}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="tabs-wrap anim-fadeUp stagger-2" style={{ marginBottom: 20 }}>
        {tabs.map(t => (
          <button key={t.key} className={`tab-btn ${tab === t.key ? 'active' : ''}`} onClick={() => setTab(t.key)}>
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {/* ── OVERVIEW ─────────────────────────────────────────────── */}
      {tab === 'overview' && (
        <div>
          <div className="sec-label" style={{ marginBottom: 14 }}>Theme Progress</div>
          {themeStats.map((t, i) => (
            <div key={t.code} className={`anim-fadeUp stagger-${i + 1}`} style={{
              background: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.6)',
              borderRadius: 18, padding: '16px 18px', marginBottom: 12,
              boxShadow: '4px 4px 12px rgba(0,21,36,0.04), -3px -3px 10px rgba(255,255,255,0.8)',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                    <span style={{ fontSize: 18 }}>{t.icon}</span>
                    <span style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: 15, color: t.color }}>{t.code} · {t.name}</span>
                  </div>
                  <div style={{ fontSize: 13, color: '#5a3f3f' }}>
                    {judges.filter(j => j.theme_code === t.code).length} judge{judges.filter(j => j.theme_code === t.code).length !== 1 ? 's' : ''} assigned
                  </div>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div style={{ fontFamily: 'JetBrains Mono', fontSize: 17, fontWeight: 700, color: t.color }}>{t.scored}/{t.total}</div>
                  {t.topScore > 0 && <div style={{ fontSize: 11, color: '#777' }}>Top: {t.topScore}</div>}
                </div>
              </div>
              <div className="progress-wrap" style={{ height: 8 }}>
                <div className="progress-fill" style={{ width: `${t.total ? (t.scored / t.total * 100) : 0}%`, background: `linear-gradient(90deg,${t.color}66,${t.color})` }} />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── TEAMS ────────────────────────────────────────────────── */}
      {tab === 'teams' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <div className="sec-label">Participant Teams · {participants.length}</div>
            <button className="btn btn-primary btn-sm" onClick={() => setTeamModal('add')}>+ Add Team</button>
          </div>
          {participants.map((p, i) => {
            const theme = THEME_BY_CODE[p.theme_code];
            return (
              <div key={p.group_num} className={`anim-fadeUp stagger-${(i % 4) + 1}`} style={{
                background: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.6)',
                borderRadius: 16, padding: '14px 16px', marginBottom: 10,
                display: 'flex', alignItems: 'center', gap: 12,
                boxShadow: '4px 4px 12px rgba(0,21,36,0.04), -3px -3px 10px rgba(255,255,255,0.8)',
              }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: 14, marginBottom: 3, color: '#001524' }}>{p.group_num} · {p.project_title}</div>
                  <div style={{ fontSize: 12, color: '#5a3f3f', marginBottom: 6 }}>{p.leader} · {p.institute}</div>
                  {theme && <span className="badge" style={{ background: theme.bg, color: theme.color, borderColor: theme.border, fontSize: 11 }}>{theme.icon} {theme.code}</span>}
                </div>
                <div style={{ flexShrink: 0, display: 'flex', gap: 8 }}>
                  <button className="btn btn-ghost btn-xs" onClick={() => setTeamModal(p)}>✎</button>
                  <button className="btn btn-danger btn-xs" onClick={() => { 
                    if (window.confirm(`Delete Team ${p.group_num}?`)) {
                      update(s => ({ ...s, participants: s.participants.filter(x => x.group_num !== p.group_num) }));
                      showToast('Team removed', 'warn');
                    }
                  }}>✕</button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── JUDGES ───────────────────────────────────────────────── */}
      {tab === 'judges' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <div className="sec-label">Judge Roster · {judges.length}</div>
            <button className="btn btn-primary btn-sm" onClick={() => setJudgeModal('add')}>+ Add Judge</button>
          </div>
          {judges.map((j, i) => {
            const theme = THEME_BY_CODE[j.theme_code];
            return (
              <div key={j.id} className={`anim-fadeUp stagger-${(i % 4) + 1}`} style={{
                background: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.6)',
                borderRadius: 16, padding: '14px 16px', marginBottom: 10,
                display: 'flex', alignItems: 'flex-start', gap: 12,
                boxShadow: '4px 4px 12px rgba(0,21,36,0.04), -3px -3px 10px rgba(255,255,255,0.8)',
              }}>
                <div style={{
                  width: 42, height: 42, borderRadius: 12, flexShrink: 0,
                  background: theme?.bg || 'rgba(0,149,255,0.12)',
                  border: `1px solid ${theme?.border || 'rgba(0,149,255,0.3)'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 18,
                }}>{theme?.icon || '👤'}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: 14, marginBottom: 3, color: '#001524' }}>{j.name}</div>
                  <div style={{ fontSize: 12, color: '#5a3f3f', marginBottom: 6 }}>{j.designation} · {j.institute}</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    <span className="badge badge-ghost" style={{ fontFamily: 'JetBrains Mono', fontSize: 11 }}>{j.username}</span>
                    {theme && <span className="badge" style={{ background: theme.bg, color: theme.color, borderColor: theme.border, fontSize: 11 }}>{theme.code}</span>}
                  </div>
                </div>
                <div style={{ flexShrink: 0, display: 'flex', gap: 8 }}>
                  <button className="btn btn-ghost btn-xs" onClick={() => setJudgeModal(j)}>✎</button>
                  <button className="btn btn-danger btn-xs" onClick={() => { if (window.confirm(`Remove ${j.name}?`)) { deleteJudge(j.id); showToast('Judge removed', 'warn'); } }}>✕</button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── SCORES ───────────────────────────────────────────────── */}
      {tab === 'scores' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, marginBottom: 16 }}>
            <div className="sec-label">All Scores · {filteredScores.length}</div>
            <div style={{ display: 'flex', gap: 10 }}>
              <select onChange={e => setFilterTheme(e.target.value)} value={filterTheme} style={{ padding: '8px 14px', background: 'rgba(255,255,255,0.8)', border: '1px solid rgba(0,21,36,0.1)', borderRadius: 10, color: '#001524', fontSize: 13, fontFamily: 'Plus Jakarta Sans', outline: 'none', cursor: 'pointer' }}>
                <option value="all">All Themes</option>
                {THEMES.map(t => <option key={t.code} value={t.code}>{t.code} · {t.short}</option>)}
              </select>
              <button className="btn btn-ghost btn-sm" onClick={exportCSV}>⬇ CSV</button>
            </div>
          </div>
          {filteredScores.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '44px', color: '#5a3f3f' }}>No scores submitted yet</div>
          ) : filteredScores.map((g, i) => {
            const s = scores[g.group_num];
            const theme = THEME_BY_CODE[g.theme_code];
            const pct = Math.round((s.total / MAX_TOTAL) * 100);
            return (
              <div key={g.group_num} className={`anim-fadeUp stagger-${(i % 4) + 1}`} style={{
                background: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.6)',
                borderRadius: 16, padding: '15px 16px', marginBottom: 10,
                boxShadow: '4px 4px 12px rgba(0,21,36,0.04), -3px -3px 10px rgba(255,255,255,0.8)',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: 14, color: theme?.color || '#0095ff', marginBottom: 3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{g.project_title}</div>
                    <div style={{ fontSize: 12, color: '#5a3f3f' }}>{g.institute}</div>
                  </div>
                  <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: 10, marginLeft: 12 }}>
                    {theme && <span className="badge" style={{ background: theme.bg, color: theme.color, borderColor: theme.border, fontSize: 11 }}>{theme.code}</span>}
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontFamily: 'JetBrains Mono', fontSize: 22, fontWeight: 800, color: '#2e7029' }}>{s.total}</div>
                      <div style={{ fontSize: 10, color: '#777' }}>/ {MAX_TOTAL}</div>
                    </div>
                  </div>
                </div>
                <div className="progress-wrap" style={{ height: 5, marginBottom: 10 }}>
                  <div className="progress-fill" style={{ width: `${pct}%` }} />
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {CRITERIA.map(c => (
                    <span key={c.key} style={{ fontSize: 11, background: 'rgba(0,21,36,0.03)', border: '1px solid rgba(0,21,36,0.08)', borderRadius: 8, padding: '3px 9px', color: '#5a3f3f' }}>
                      {c.icon} <strong style={{ color: '#001524' }}>{s[c.key]}</strong>/{c.max}
                    </span>
                  ))}
                </div>
                {s.remarks && <div style={{ marginTop: 10, fontSize: 13, color: '#5a3f3f', fontStyle: 'italic' }}>"{s.remarks}"</div>}
                {flags[g.group_num] && <div style={{ marginTop: 8 }}><span className="badge badge-yellow">🚩 Flagged</span></div>}
              </div>
            );
          })}
        </div>
      )}

      {/* ── FLAGGED ──────────────────────────────────────────────── */}
      {tab === 'flagged' && (
        <div>
          <div className="sec-label" style={{ marginBottom: 14 }}>Flagged for Review · {allFlagged.length}</div>
          {allFlagged.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '52px', color: '#5a3f3f' }}>
              <div style={{ fontSize: 40, marginBottom: 14 }}>🚩</div>
              <div style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: 17, color: '#3c2a2a' }}>No flags raised</div>
            </div>
          ) : allFlagged.map((g, i) => {
            const s = scores[g.group_num];
            const theme = THEME_BY_CODE[g.theme_code];
            return (
              <div key={g.group_num} className={`anim-fadeUp stagger-${(i % 4) + 1}`} style={{
                background: 'rgba(255,166,0,0.1)', border: '1px solid rgba(255,166,0,0.3)',
                borderRadius: 16, padding: '15px 16px', marginBottom: 10,
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: 14, color: '#996300', marginBottom: 3 }}>{g.project_title}</div>
                    <div style={{ fontSize: 12, color: '#5a3f3f' }}>{g.leader} · {g.institute}</div>
                    {theme && <div style={{ marginTop: 8 }}><span className="badge" style={{ background: theme.bg, color: theme.color, borderColor: theme.border, fontSize: 11 }}>{theme.icon} {theme.code}</span></div>}
                  </div>
                  {s && (
                    <div style={{ flexShrink: 0, marginLeft: 12, textAlign: 'right' }}>
                      <div style={{ fontFamily: 'JetBrains Mono', fontSize: 22, fontWeight: 800, color: '#996300' }}>{s.total}</div>
                      <div style={{ fontSize: 10, color: '#777' }}>/ {MAX_TOTAL}</div>
                    </div>
                  )}
                </div>
                {!s && <div style={{ marginTop: 10 }}><span className="badge badge-red">Not yet scored</span></div>}
              </div>
            );
          })}
        </div>
      )}

      {/* ── CREDENTIALS ──────────────────────────────────────────── */}
      {tab === 'credentials' && (
        <div>
          <div style={{ background: 'rgba(255,166,0,0.1)', border: '1px solid rgba(255,166,0,0.3)', borderRadius: 14, padding: '12px 16px', marginBottom: 16, fontSize: 13, color: '#996300', lineHeight: 1.65 }}>
            ⚠ Keep this page confidential. Share secret keys securely with each judge.
          </div>

          <div className="sec-label" style={{ marginBottom: 14 }}>Admin Account</div>
          <div style={{ background: 'rgba(0,149,255,0.08)', border: '1px solid rgba(0,149,255,0.2)', borderRadius: 16, padding: '15px 16px', marginBottom: 20 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {[['Username', 'protech_admin'], ['Password', 'Admin@ProTech2026!']].map(([k, v]) => (
                <div key={k} style={{ background: 'rgba(255,255,255,0.6)', borderRadius: 10, padding: '10px 12px' }}>
                  <div style={{ fontSize: 10, color: '#5a3f3f', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 3 }}>{k}</div>
                  <div style={{ fontFamily: 'JetBrains Mono', fontSize: 13, fontWeight: 700, color: '#0077cc' }}>{v}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="sec-label" style={{ marginBottom: 14 }}>Judge Credentials</div>
          {judges.map((j, i) => {
            const theme = THEME_BY_CODE[j.theme_code];
            return (
              <div key={j.id} className={`anim-fadeUp stagger-${(i % 4) + 1}`} style={{
                background: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.6)',
                borderRadius: 16, padding: '14px 16px', marginBottom: 10,
                boxShadow: '4px 4px 12px rgba(0,21,36,0.04), -3px -3px 10px rgba(255,255,255,0.8)',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                  <div>
                    <div style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: 14, marginBottom: 3, color: '#001524' }}>{j.name}</div>
                    <div style={{ fontSize: 12, color: '#5a3f3f' }}>{j.designation}</div>
                  </div>
                  {theme && <span className="badge" style={{ background: theme.bg, color: theme.color, borderColor: theme.border, fontSize: 11 }}>{theme.icon} {theme.code}</span>}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                  {[
                    ['Username', j.username],
                    ['Default Pwd', j.defaultPassword],
                    ['Secret Key', j.secret],
                    ['Theme', j.theme_code],
                  ].map(([k, v]) => (
                    <div key={k} style={{ background: 'rgba(0,21,36,0.03)', borderRadius: 10, padding: '8px 11px' }}>
                      <div style={{ fontSize: 10, color: '#777', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 3 }}>{k}</div>
                      <div style={{ fontFamily: 'JetBrains Mono', fontSize: 12, fontWeight: 600, color: '#0077cc', wordBreak: 'break-all' }}>{v}</div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Judge modal */}
      {judgeModal && (
        <JudgeModal
          judge={judgeModal === 'add' ? null : judgeModal}
          onSave={j => {
            if (judgeModal === 'add') { addJudge(j); showToast(`Judge ${j.name} added`, 'success'); }
            else { updateJudge(j.id, j); showToast('Judge updated', 'success'); }
          }}
          onClose={() => setJudgeModal(null)}
        />
      )}

      {/* Team modal */}
      {teamModal && (
        <TeamModal
          team={teamModal === 'add' ? null : teamModal}
          onSave={p => {
            const theme = THEMES.find(t => t.code === p.theme_code);
            const teamWithTheme = { ...p, theme_full: theme ? theme.full : '' };
            
            if (teamModal === 'add') {
              update(s => ({ ...s, participants: [...(s.participants || []), teamWithTheme] }));
              showToast(`Team ${p.group_num} added`, 'success');
            } else {
              update(s => ({
                ...s,
                participants: s.participants.map(x => x.group_num === p.group_num ? teamWithTheme : x)
              }));
              showToast('Team updated', 'success');
            }
          }}
          onClose={() => setTeamModal(null)}
        />
      )}
    </div>
  );
}
