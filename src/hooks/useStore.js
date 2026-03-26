import { useState, useCallback, useEffect } from 'react';
import { STORAGE_KEY, JUDGES_INITIAL } from '../data/constants';
import participantsRaw from '../data/participants_raw.json';

const API_BASE_URL = typeof window !== 'undefined' && window.location.hostname !== 'localhost' 
  ? '/api' 
  : (process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api');

function loadStore() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch { return {}; }
}

function saveStore(data) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch {}
}

async function loadRemoteStore() {
  const res = await fetch(`${API_BASE_URL}/store`);
  if (!res.ok) throw new Error('Failed to load remote store');
  return res.json();
}

async function saveRemoteStore(data) {
  const res = await fetch(`${API_BASE_URL}/store`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error('Failed to save remote store');
}

export function useStore() {
  const [store, setStore] = useState(() => {
    const s = loadStore();
    return {
      scores: s.scores || {},       // { groupId: { c1..c8, total, remarks, judge_id, ts } }
      flags: s.flags || {},         // { groupId: bool }
      passwords: s.passwords || {}, // { username: hashedPwd }
      judges: s.judges || JUDGES_INITIAL, // judge list (admin can add/edit)
      participants: s.participants || participantsRaw, // team list
      ...s,
    };
  });

  const update = useCallback((updater) => {
    setStore(prev => {
      const next = typeof updater === 'function' ? updater(prev) : { ...prev, ...updater };
      saveStore(next);
      saveRemoteStore(next).catch(() => {});
      return next;
    });
  }, []);

  useEffect(() => {
    let mounted = true;

    loadRemoteStore()
      .then((remote) => {
        if (!mounted || !remote || typeof remote !== 'object' || Array.isArray(remote)) {
          return;
        }

        setStore((prev) => {
          const merged = {
            ...prev,
            ...remote,
            scores: remote.scores || prev.scores || {},
            flags: remote.flags || prev.flags || {},
            passwords: remote.passwords || prev.passwords || {},
            judges: remote.judges || prev.judges || JUDGES_INITIAL,
            participants: remote.participants || prev.participants || participantsRaw,
          };

          saveStore(merged);
          return merged;
        });
      })
      .catch(() => {});

    return () => {
      mounted = false;
    };
  }, []);

  // Helpers
  const submitScore = useCallback((groupId, judgeId, scoreData) => {
    update(s => ({
      ...s,
      scores: {
        ...s.scores,
        [groupId]: {
          ...scoreData,
          judge_id: judgeId,
          ts: new Date().toISOString(),
        },
      },
    }));
  }, [update]);

  const toggleFlag = useCallback((groupId) => {
    update(s => ({
      ...s,
      flags: { ...s.flags, [groupId]: !s.flags[groupId] },
    }));
  }, [update]);

  const resetPassword = useCallback((username, newPassword) => {
    update(s => ({
      ...s,
      passwords: { ...s.passwords, [username]: newPassword },
    }));
  }, [update]);

  const addJudge = useCallback((judge) => {
    update(s => ({ ...s, judges: [...s.judges, judge] }));
  }, [update]);

  const updateJudge = useCallback((id, changes) => {
    update(s => ({
      ...s,
      judges: s.judges.map(j => j.id === id ? { ...j, ...changes } : j),
    }));
  }, [update]);

  const deleteJudge = useCallback((id) => {
    update(s => ({ ...s, judges: s.judges.filter(j => j.id !== id) }));
  }, [update]);

  const clearAll = useCallback(() => {
    update(s => ({ ...s, scores: {}, flags: {} }));
  }, [update]);

  return {
    store,
    update,
    submitScore,
    toggleFlag,
    resetPassword,
    addJudge,
    updateJudge,
    deleteJudge,
    clearAll,
  };
}
