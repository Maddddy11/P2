require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const { connectDatabase, getStore, updateStore } = require('./db');

const app = express();
const PORT = process.env.BACKEND_PORT || process.env.PORT || 5000;
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || '*';

app.use(
  cors({
    origin: FRONTEND_ORIGIN,
  })
);
app.use(express.json({ limit: '1mb' }));

// ─── API Routes ──────────────────────────────────────────────────────────────
app.get('/api/health', (_req, res) => {
  res.json({ ok: true, database: 'json-file' });
});

app.get('/api/store', (req, res) => {
  res.json(getStore());
});

app.put('/api/store', (req, res) => {
  const payload = req.body;
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
    return res.status(400).json({ error: 'Payload must be an object' });
  }
  updateStore(payload);
  res.json(payload);
});

// ─── Static Frontend (Production) ───────────────────────────────────────────
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
  });
}

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

async function bootstrap() {
  await connectDatabase();

  // ─── Auto-Seed if empty ────────────────────────────────────────────────────
  const current = getStore();
  if (!current || Object.keys(current).length === 0) {
    console.log('Database empty. Auto-seeding initial data...');
    const { JUDGES_INITIAL } = require('./data/constants');
    const participantsRaw = require('./data/participants_raw.json');
    
    updateStore({
      judges: JUDGES_INITIAL,
      participants: participantsRaw,
      scores: {},
      flags: {},
      passwords: {}
    });
    console.log('✓ Auto-seeding complete.');
  }

  app.listen(PORT, () => {
    console.log(`API listening on port ${PORT} (JSON Mode)`);
  });
}

bootstrap().catch((error) => {
  console.error('Failed to start API server:', error.message);
  process.exit(1);
});
