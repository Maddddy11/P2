import React from 'react';

export default function BottomNav({ view, setView, isAdmin }) {
  const items = isAdmin
    ? [
        { key:'admin',       icon:'⊞', label:'Overview' },
        { key:'all_scores',  icon:'📋', label:'Scores' },
        { key:'leaderboard', icon:'🏆', label:'Leaders' },
        { key:'rubrics',     icon:'📐', label:'Rubrics' },
      ]
    : [
        { key:'dashboard',   icon:'📋', label:'Groups' },
        { key:'flagged',     icon:'🚩', label:'Flagged' },
        { key:'leaderboard', icon:'🏆', label:'Leaders' },
        { key:'rubrics',     icon:'📐', label:'Rubrics' },
      ];

  return (
    <nav className="bottom-nav">
      {items.map(item => (
        <button
          key={item.key}
          className={`nav-btn ${view === item.key ? 'active' : ''}`}
          onClick={() => setView(item.key)}
        >
          <span className="nav-icon">{item.icon}</span>
          <span>{item.label}</span>
          {view === item.key && <span className="nav-dot" />}
        </button>
      ))}
    </nav>
  );
}
