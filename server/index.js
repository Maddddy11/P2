require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { connectDatabase } = require('./db');
const AppState = require('./models/AppState');

const app = express();
const PORT = process.env.BACKEND_PORT || process.env.PORT || 5000;
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || '*';

const path = require('path');

app.use(
  cors({
    origin: FRONTEND_ORIGIN,
  })
);
app.use(express.json({ limit: '1mb' }));

// ─── API Routes ──────────────────────────────────────────────────────────────
app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'protech-api' });
});

app.get('/api/store', async (_req, res) => {
  const doc = await AppState.findById('main').lean();
  res.json(doc?.data || {});
});

app.put('/api/store', async (req, res) => {
  const payload = req.body;

  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
    return res.status(400).json({ error: 'Store payload must be an object.' });
  }

  const doc = await AppState.findByIdAndUpdate(
    'main',
    {
      $set: {
        data: payload,
      },
    },
    {
      new: true,
      upsert: true,
      setDefaultsOnInsert: true,
    }
  ).lean();

  return res.json(doc.data || {});
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
  const count = await AppState.countDocuments();
  if (count === 0) {
    console.log('Database is empty. Auto-seeding initial data...');
    const { JUDGES_INITIAL } = require('./data/constants');
    const participantsRaw = require('./data/participants_raw.json');
    
    await AppState.create({
      _id: 'main',
      data: {
        judges: JUDGES_INITIAL,
        participants: participantsRaw,
        scores: {},
        flags: {},
        passwords: {}
      }
    });
    console.log('✓ Auto-seeding complete.');
  }

  app.listen(PORT, () => {
    console.log(`API listening on http://localhost:${PORT}`);
  });
}

bootstrap().catch((error) => {
  console.error('Failed to start API server:', error.message);
  process.exit(1);
});
