import React, { useState, useMemo } from 'react';
import { THEME_BY_CODE, MAX_TOTAL } from '../data/constants';
import GroupCard from '../components/GroupCard';
import ScoreForm from '../components/ScoreForm';


export default function JudgeDashboard({ judge, store, submitScore, toggleFlag, showToast, viewOverride }) {
  const [scoring, setScoring] = useState(null);
  const [search, setSearch] = useState('');

  const theme = THEME_BY_CODE[judge.theme_code];
  const scores = store.scores || {};
  const flags = store.flags || {};

  // Filter participants by judge's theme
  const myGroups = useMemo(() =>
    (store.participants || []).filter(p => p.theme_code === judge.theme_code),
    [judge.theme_code, store.participants]
  );

  const flaggedGroups = useMemo(() =>
    myGroups.filter(g => flags[g.group_num]),
    [myGroups, flags]
  );

  const filtered = useMemo(() => {
    const list = viewOverride === 'flagged' ? flaggedGroups : myGroups;
    if (!search.trim()) return list;
    const q = search.toLowerCase();
    return list.filter(g =>
      g.project_title.toLowerCase().includes(q) ||
      g.institute.toLowerCase().includes(q) ||
      g.leader.toLowerCase().includes(q)
    );
  }, [myGroups, flaggedGroups, search, viewOverride]);

  const scoredCount = myGroups.filter(g => !!scores[g.group_num]).length;
  const pct = myGroups.length ? Math.round((scoredCount / myGroups.length) * 100) : 0;

  function handleSave(scoreData) {
    submitScore(scoring.group_num, judge.id, scoreData);
    showToast(`Score saved: ${scoreData.total}/${MAX_TOTAL}`, 'success');
    setScoring(null);
  }

  return (
    <div className="page" style={{ position: 'relative', zIndex: 1 }}>
      {/* Judge header */}
      <div className="anim-fadeUp" style={{ marginBottom: 22 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 14, marginBottom: 18 }}>
          <div>
            <div style={{ fontFamily: 'Space Grotesk', fontSize: 26, fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: 8, color: '#001524' }}>
              Hey, <span style={{ background: 'linear-gradient(135deg,#0095ff,#ff0062)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{judge.name.split(' ')[0]}</span> 👋
            </div>
            <div style={{ fontSize: 13, color: '#5a3f3f' }}>{judge.designation} · {judge.institute}</div>
          </div>
          {theme && (
            <div style={{
              padding: '12px 18px', borderRadius: 18,
              background: 'rgba(255,255,255,0.7)', border: `1px solid rgba(255,255,255,0.6)`,
              textAlign: 'center',
              backdropFilter: 'blur(16px)',
              boxShadow: '6px 6px 16px rgba(0,21,36,0.05), -4px -4px 12px rgba(255,255,255,0.85)',
            }}>
              <div style={{ fontSize: 22, marginBottom: 4 }}>{theme.icon}</div>
              <div style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: 12, color: theme.color, letterSpacing: '0.04em' }}>{theme.code}</div>
            </div>
          )}
        </div>

        {/* Theme label */}
        {theme && (
          <div style={{ fontSize: 14, color: theme.color, fontWeight: 600, marginBottom: 18, display: 'flex', alignItems: 'center', gap: 8 }}>
            <span>{theme.icon}</span> {theme.name}
          </div>
        )}

        {/* Progress */}
        <div style={{
          background: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.6)',
          borderRadius: 22, padding: '18px 20px',
          backdropFilter: 'blur(16px)',
          boxShadow: '6px 6px 16px rgba(0,21,36,0.05), -4px -4px 12px rgba(255,255,255,0.85)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <div style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: 15, color: '#001524' }}>Evaluation Progress</div>
            <div style={{ fontFamily: 'JetBrains Mono', fontSize: 15, fontWeight: 700, color: pct >= 100 ? '#2e7029' : '#0095ff' }}>
              {scoredCount} <span style={{ color: '#777', fontWeight: 400 }}>/</span> {myGroups.length}
            </div>
          </div>
          <div className="progress-wrap" style={{ height: 12 }}>
            <div className="progress-fill" style={{ width: `${pct}%` }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#5a3f3f', marginTop: 10 }}>
            <span>{myGroups.length - scoredCount} pending</span>
            {flaggedGroups.length > 0 && <span style={{ color: '#996300' }}>🚩 {flaggedGroups.length} flagged</span>}
            <span>{pct}% complete</span>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="anim-fadeUp stagger-2" style={{ marginBottom: 18, position: 'relative' }}>
        <input
          className="input"
          placeholder="🔍  Search by title, institute, or team leader…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ paddingLeft: 20, borderRadius: 20, fontSize: 14 }}
        />
        {search && (
          <button onClick={() => setSearch('')} style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#5a3f3f', fontSize: 20 }}>×</button>
        )}
      </div>

      {/* Section label */}
      <div className="sec-label anim-fadeUp stagger-3" style={{ marginBottom: 16 }}>
        {viewOverride === 'flagged'
          ? `Flagged Groups · ${filtered.length}`
          : `Groups · ${filtered.length} shown`}
      </div>

      {/* Group cards */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '56px 28px', color: '#5a3f3f' }}>
          <div style={{ fontSize: 40, marginBottom: 16 }}>
            {viewOverride === 'flagged' ? '🚩' : '🔍'}
          </div>
          <div style={{ fontFamily: 'Space Grotesk', fontSize: 18, fontWeight: 700, color: '#3c2a2a' }}>
            {viewOverride === 'flagged' ? 'No flagged groups yet' : 'No groups found'}
          </div>
        </div>
      ) : (
        filtered.map((g, i) => (
          <GroupCard
            key={g.group_num}
            group={g}
            score={scores[g.group_num]}
            flagged={!!flags[g.group_num]}
            idx={i}
            onScore={() => setScoring(g)}
          />
        ))
      )}

      {/* Scoring modal */}
      {scoring && (
        <ScoreForm
          group={scoring}
          judgeId={judge.id}
          existing={scores[scoring.group_num]}
          flagged={!!flags[scoring.group_num]}
          onFlag={() => { toggleFlag(scoring.group_num); showToast(flags[scoring.group_num] ? 'Flag removed' : '🚩 Group flagged', flags[scoring.group_num] ? 'success' : 'warn'); }}
          onSave={handleSave}
          onClose={() => setScoring(null)}
        />
      )}
    </div>
  );
}
