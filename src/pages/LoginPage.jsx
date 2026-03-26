import React, { useState } from 'react';
import BgOrbs from '../components/BgOrbs';

export default function LoginPage({ judges, passwords, onLogin, onResetPassword, showToast, adminCreds }) {
  const [mode, setMode] = useState('login'); // 'login' | 'reset'
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  // Reset fields
  const [rUser, setRUser] = useState('');
  const [rSecret, setRSecret] = useState('');
  const [rNew, setRNew] = useState('');
  const [rConfirm, setRConfirm] = useState('');
  const [showRNew, setShowRNew] = useState(false);

  function doLogin(e) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      // Check admin first
      if (adminCreds && username.trim() === adminCreds.username && password === adminCreds.password) {
        onLogin({ ...adminCreds, id: 'admin', name: 'Event Coordinator', role: 'admin' });
        setLoading(false);
        return;
      }
      const j = judges.find(j => j.username === username.trim());
      if (!j) { showToast('Username not found', 'error'); setLoading(false); return; }
      const effective = passwords[j.username] || j.defaultPassword;
      if (password !== effective) { showToast('Incorrect password', 'error'); setLoading(false); return; }
      // Force reset if still on default
      if (!passwords[j.username]) {
        showToast('First login — you must reset your password', 'warn', 5000);
        setLoading(false);
        setMode('must-reset');
        return;
      }
      onLogin(j);
      setLoading(false);
    }, 600);
  }

  function doReset(e) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const j = judges.find(j => j.username === rUser.trim());
      if (!j) { showToast('Username not found', 'error'); setLoading(false); return; }
      if (rSecret.trim() !== j.secret) { showToast('Invalid secret key — contact coordinator', 'error'); setLoading(false); return; }
      if (rNew.length < 8) { showToast('Password must be at least 8 characters', 'error'); setLoading(false); return; }
      if (rNew !== rConfirm) { showToast('Passwords do not match', 'error'); setLoading(false); return; }
      onResetPassword(j.username, rNew);
      showToast('Password updated — you can now sign in', 'success');
      setMode('login');
      setUsername(rUser);
      setRNew(''); setRConfirm(''); setRSecret('');
      setLoading(false);
    }, 700);
  }

  const isMustReset = mode === 'must-reset';
  const isReset = mode === 'reset' || isMustReset;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px 16px', position: 'relative' }}>
      <BgOrbs />

      <div style={{ width: '100%', maxWidth: 420, position: 'relative', zIndex: 1 }}>
        {/* Institution branding */}
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{
            background: '#ffffff',
            padding: '8px 12px',
            borderRadius: '20px',
            display: 'inline-block',
            marginBottom: 22,
            boxShadow: '8px 8px 20px rgba(0,21,36,0.1), -6px -6px 16px rgba(255,255,255,0.9)',
            width: '300px',
            maxWidth: '90%',
            overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.7)'
          }}>
            <img
              src="/images/sit_logo.png"
              alt="SIT"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                objectFit: 'contain'
              }}
            />
          </div>

          <h1 style={{ fontFamily: 'Space Grotesk', fontSize: 36, fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: 10, color: '#001524' }}>
            ProTech <span style={{ color: '#0095ff' }}>2026</span>
          </h1>
          <div style={{ fontSize: 14, color: '#5a3f3f', fontWeight: 500 }}>
            {isReset ? 'Reset Your Password' : 'Judge Evaluation Portal'}
          </div>
        </div>

        {/* Card - Neumorphic */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.65)',
          backdropFilter: 'blur(24px) saturate(150%)',
          WebkitBackdropFilter: 'blur(24px) saturate(150%)',
          border: '1px solid rgba(255, 255, 255, 0.6)',
          borderRadius: 28,
          padding: '34px 30px',
          boxShadow: '8px 8px 24px rgba(0, 21, 36, 0.08), -8px -8px 24px rgba(255, 255, 255, 0.9)',
          animation: 'slideUp 0.7s cubic-bezier(0.16, 1, 0.3, 1)'
        }} className="anim-fadeUp">

          {!isReset && (
            <form onSubmit={doLogin}>
              <div style={{ marginBottom: 18 }}>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#3c2a2a', marginBottom: 10, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Username</label>
                <input className="input" placeholder="judge01 – judge18" value={username} onChange={e => setUsername(e.target.value)} required autoComplete="username" />
              </div>
              <div style={{ marginBottom: 10 }}>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#3c2a2a', marginBottom: 10, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Password</label>
                <div style={{ position: 'relative' }}>
                  <input className="input" type={showPwd ? 'text' : 'password'} placeholder="Your password" value={password} onChange={e => setPassword(e.target.value)} required style={{ paddingRight: 50 }} autoComplete="current-password" />
                  <button type="button" onClick={() => setShowPwd(!showPwd)} style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', fontSize: 18, color: '#5a3f3f', opacity: 0.6 }}>
                    {showPwd ? '🙈' : '👁'}
                  </button>
                </div>
              </div>
              <div style={{ textAlign: 'right', marginBottom: 24 }}>
                <button type="button" onClick={() => setMode('reset')} style={{ background: 'none', border: 'none', color: '#0095ff', fontSize: 13, cursor: 'pointer', fontWeight: 600 }}>
                  Forgot / Reset Password →
                </button>
              </div>
              <button className="btn btn-primary" style={{ width: '100%', padding: '18px', fontSize: 15, fontWeight: 700, borderRadius: 20 }} type="submit" disabled={loading}>
                {loading ? <span className="anim-spin" style={{ display: 'inline-block', fontSize: 18 }}>⟳</span> : '→ Sign In'}
              </button>
            </form>
          )}

          {isReset && (
            <form onSubmit={doReset}>
              {isMustReset && (
                <div style={{ background: 'rgba(255,166,0,0.15)', border: '1px solid rgba(255,166,0,0.4)', borderRadius: 16, padding: '14px 18px', marginBottom: 20, fontSize: 13, color: '#996300', lineHeight: 1.5, fontWeight: 500 }}>
                  ⚠ Your account requires a one-time password reset before you can continue.
                </div>
              )}
              <div style={{ background: 'rgba(0,149,255,0.1)', border: '1px solid rgba(0,149,255,0.3)', borderRadius: 16, padding: '14px 18px', marginBottom: 20, fontSize: 13, color: '#0077cc', lineHeight: 1.5 }}>
                🔑 Enter your username and the <strong>secret key</strong> provided by the event coordinator.
              </div>
              {[
                ['Username', rUser, setRUser, 'judge01 – judge18', 'text', false, null],
                ['Secret Key', rSecret, setRSecret, 'PT26-XXXXX-XXXX', 'text', false, null],
                ['New Password', rNew, setRNew, 'Minimum 8 characters', showRNew ? 'text' : 'password', true, setShowRNew],
                ['Confirm Password', rConfirm, setRConfirm, 'Repeat new password', 'password', false, null],
              ].map(([label, val, set, ph, type, hasToggle, toggler]) => (
                <div key={label} style={{ marginBottom: 18 }}>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#3c2a2a', marginBottom: 10, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{label}</label>
                  <div style={{ position: 'relative' }}>
                    <input className="input" type={type} placeholder={ph} value={val} onChange={e => set(e.target.value)} required />
                    {hasToggle && (
                      <button type="button" onClick={() => toggler(!showRNew)} style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', fontSize: 17, color: '#5a3f3f', opacity: 0.6 }}>
                        {showRNew ? '🙈' : '👁'}
                      </button>
                    )}
                  </div>
                </div>
              ))}
              <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
                {!isMustReset && (
                  <button type="button" className="btn btn-ghost" style={{ flex: 1 }} onClick={() => setMode('login')}>← Back</button>
                )}
                <button type="submit" className="btn btn-primary" style={{ flex: 2, padding: '18px', fontSize: 15, borderRadius: 20 }} disabled={loading}>
                  {loading ? '...' : 'Reset Password'}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Event info */}
        <div style={{ textAlign: 'center', marginTop: 20, fontSize: 12, color: '#5a3f3f', lineHeight: 1.6, fontWeight: 500 }}>
          National-Level Project Exhibition · March 28, 2026
        </div>
      </div>
    </div>
  );
}
