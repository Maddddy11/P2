import React from 'react';
import { THEME_BY_CODE } from '../data/constants';

export default function Topbar({ user, onLogout }) {
  const theme = user?.theme_code ? THEME_BY_CODE[user.theme_code] : null;

  return (
    <header className="topbar" style={{ zIndex: 100 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14, width: '100%' }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1, minWidth: 0 }}>
          <div
            style={{
              background: '#ffffff',
              padding: '8px 14px',
              borderRadius: '16px',
              display: 'inline-block',
              boxShadow: '6px 6px 14px rgba(0,21,36,0.06), -4px -4px 10px rgba(255,255,255,0.9)',
              maxWidth: '160px',
              border: '1px solid rgba(255,255,255,0.7)',
            }}
          >
            <img
              src="/images/sit_logo.png"
              alt="SIT"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                objectFit: 'contain',
              }}
            />
          </div>
        </div>

        {/* User info */}
        {user && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
            {theme && (
              <span
                className="badge"
                style={{
                  background: theme.bg,
                  color: theme.color,
                  border: `1px solid ${theme.border}`,
                  fontSize: 11,
                  display: 'none',
                }}
                id="theme-badge-topbar"
              >
                {theme.code}
              </span>
            )}
            <button className="btn btn-ghost btn-sm" onClick={onLogout} style={{ padding: '10px 18px', gap: 8, borderRadius: 16 }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" />
              </svg>
              Exit
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
