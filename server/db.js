const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, '../data/db.json');

// Memory cache for performance
let storeData = null;

function loadStore() {
  if (storeData) return storeData;
  if (fs.existsSync(DB_PATH)) {
    try {
      storeData = JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
      return storeData;
    } catch (e) {
      console.error('Error reading db.json:', e);
    }
  }
  return {};
}

function saveStore(data) {
  storeData = data;
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
  } catch (e) {
    console.error('Error writing db.json:', e);
  }
}

async function connectDatabase() {
  console.log('Using JSON file database:', DB_PATH);
  loadStore();
  return { connection: 'local-json' };
}

module.exports = {
  connectDatabase,
  getStore: loadStore,
  updateStore: saveStore,
};
