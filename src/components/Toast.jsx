import React from 'react';

const ICONS = { success:'✓', error:'✕', warn:'⚠', info:'ℹ' };

export default function ToastContainer({ toasts, dismiss }) {
  if (!toasts.length) return null;
  return (
    <div className="toast-container">
      {toasts.map(t => (
        <div
          key={t.id}
          className={`toast toast-${t.type}`}
          onClick={() => dismiss(t.id)}
          role="alert"
          style={{ cursor:'pointer', pointerEvents:'all' }}
        >
          <span style={{ fontWeight:800 }}>{ICONS[t.type]}</span>
          {t.message}
        </div>
      ))}
    </div>
  );
}
