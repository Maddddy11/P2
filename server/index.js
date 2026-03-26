require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { connectDatabase } = require('./db');
const AppState = require('./models/AppState');

const app = express();
const PORT = process.env.BACKEND_PORT || process.env.PORT || 5000;
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || '*';

app.use(
  cors({
    origin: FRONTEND_ORIGIN,
  })
);
app.use(express.json({ limit: '1mb' }));

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

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

async function bootstrap() {
  await connectDatabase();

  app.listen(PORT, () => {
    console.log(`API listening on http://localhost:${PORT}`);
  });
}

bootstrap().catch((error) => {
  console.error('Failed to start API server:', error.message);
  process.exit(1);
});
