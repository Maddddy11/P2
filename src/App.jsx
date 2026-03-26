import React, { useState } from 'react';
import './styles.css';
import { ADMIN_CREDS } from './data/constants';
import { useStore } from './hooks/useStore';
import { useToast } from './hooks/useToast';

import BgOrbs from './components/BgOrbs';
import Topbar from './components/Topbar';
import BottomNav from './components/BottomNav';
import ToastContainer from './components/Toast';

import LoginPage from './pages/LoginPage';
import JudgeDashboard from './pages/JudgeDashboard';
import LeaderboardPage from './pages/LeaderboardPage';
import RubricsPage from './pages/RubricsPage';
import AdminPanel from './pages/AdminPanel';

export default function App() {
  const [user, setUser] = useState(null); // null | { ...judge } | { role:'admin', ... }
  const [view, setView] = useState('dashboard');
  const { toasts, show: showToast, dismiss } = useToast();
  const {
    store,
    submitScore,
    toggleFlag,
    resetPassword,
    addJudge,
    updateJudge,
    deleteJudge,
    clearAll,
  } = useStore();

  const isAdmin = user?.role === 'admin';
  const isLoggedIn = !!user;

  function handleLogin(judgeOrAdmin) {
    if (judgeOrAdmin.role === 'admin') {
      setUser({ ...judgeOrAdmin });
      setView('admin');
    } else {
      setUser({ ...judgeOrAdmin });
      setView('dashboard');
    }
  }

  // Augment onLogin to handle admin credentials separately
  function handleLoginAttempt(judge) {
    handleLogin(judge);
  }

  // Custom login that also checks admin
  function loginCheck(username, password, store) {
    if (username === ADMIN_CREDS.username && password === ADMIN_CREDS.password) {
      return { ...ADMIN_CREDS, id: 'admin', name: 'Event Coordinator' };
    }
    return null;
  }

  function handleLogout() {
    setUser(null);
    setView('dashboard');
  }

  // Render current view
  function renderView() {
    if (!isLoggedIn) return null;

    if (isAdmin) {
      switch (view) {
        case 'admin':
          return <AdminPanel store={store} update={update} addJudge={addJudge} updateJudge={updateJudge} deleteJudge={deleteJudge} clearAll={clearAll} showToast={showToast} />;
        case 'all_scores':
          return <AdminPanel store={store} update={update} addJudge={addJudge} updateJudge={updateJudge} deleteJudge={deleteJudge} clearAll={clearAll} showToast={showToast} defaultTab="scores" />;
        case 'leaderboard':
          return <LeaderboardPage store={store} />;
        case 'rubrics':
          return <RubricsPage />;
        default:
          return <AdminPanel store={store} update={update} addJudge={addJudge} updateJudge={updateJudge} deleteJudge={deleteJudge} clearAll={clearAll} showToast={showToast} />;
      }
    }

    // Judge views
    switch (view) {
      case 'dashboard':
        return <JudgeDashboard judge={user} store={store} submitScore={submitScore} toggleFlag={toggleFlag} showToast={showToast} />;
      case 'flagged':
        return <JudgeDashboard judge={user} store={store} submitScore={submitScore} toggleFlag={toggleFlag} showToast={showToast} viewOverride="flagged" />;
      case 'leaderboard':
        return <LeaderboardPage store={store} judgeThemeCode={user.theme_code} />;
      case 'rubrics':
        return <RubricsPage />;
      default:
        return <JudgeDashboard judge={user} store={store} submitScore={submitScore} toggleFlag={toggleFlag} showToast={showToast} />;
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: 'transparent', position: 'relative' }}>
      <BgOrbs />

      {/* Login */}
      {!isLoggedIn && (
        <LoginPage
          judges={store.judges}
          passwords={store.passwords}
          onLogin={handleLoginAttempt}
          onAdminCheck={loginCheck}
          onResetPassword={resetPassword}
          showToast={showToast}
          adminCreds={ADMIN_CREDS}
        />
      )}

      {/* Authenticated app */}
      {isLoggedIn && (
        <>
          <Topbar user={user} onLogout={handleLogout} />
          <main style={{ position: 'relative', zIndex: 1 }}>
            {renderView()}
          </main>
          <BottomNav view={view} setView={setView} isAdmin={isAdmin} />
        </>
      )}

      <ToastContainer toasts={toasts} dismiss={dismiss} />
    </div>
  );
}
