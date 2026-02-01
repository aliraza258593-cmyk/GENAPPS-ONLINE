import initSqlJs from 'sql.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dataDir = join(__dirname, '../../data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = join(dataDir, 'genapps.db');

let db;
let SQL;

async function initDb() {
  SQL = await initSqlJs();
  
  if (fs.existsSync(dbPath)) {
    const fileBuffer = fs.readFileSync(dbPath);
    db = new SQL.Database(fileBuffer);
  } else {
    db = new SQL.Database();
  }

  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      password TEXT,
      name TEXT,
      plan TEXT DEFAULT 'free',
      credits INTEGER DEFAULT 5,
      credits_reset_date TEXT,
      oauth_provider TEXT,
      oauth_id TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS plans (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      price REAL NOT NULL,
      credits_per_day INTEGER,
      features TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS usage_logs (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      action TEXT NOT NULL,
      model_used TEXT,
      credits_consumed INTEGER DEFAULT 0,
      api_key_used INTEGER,
      success INTEGER DEFAULT 1,
      error_message TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS sessions (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      token TEXT NOT NULL,
      expires_at TEXT NOT NULL,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);

  try {
    db.run(`INSERT OR IGNORE INTO plans (id, name, price, credits_per_day, features) VALUES ('free', 'Free', 0, 5, '["5 credits/day", "Basic models", "Watermark"]')`);
    db.run(`INSERT OR IGNORE INTO plans (id, name, price, credits_per_day, features) VALUES ('pro', 'Pro', 10, -1, '["Unlimited builds", "All models", "No watermark", "GitHub export", "Vercel deploy"]')`);
    db.run(`INSERT OR IGNORE INTO plans (id, name, price, credits_per_day, features) VALUES ('plus', 'Plus', 29, -1, '["Everything in Pro", "Priority support", "Deep thinking", "Advanced templates"]')`);
  } catch (e) {}

  saveDb();
  return db;
}

function saveDb() {
  const data = db.export();
  const buffer = Buffer.from(data);
  fs.writeFileSync(dbPath, buffer);
}

function prepare(sql) {
  return {
    run: (...params) => {
      db.run(sql, params);
      saveDb();
    },
    get: (...params) => {
      const stmt = db.prepare(sql);
      stmt.bind(params);
      if (stmt.step()) {
        const row = stmt.getAsObject();
        stmt.free();
        return row;
      }
      stmt.free();
      return undefined;
    },
    all: (...params) => {
      const stmt = db.prepare(sql);
      stmt.bind(params);
      const rows = [];
      while (stmt.step()) {
        rows.push(stmt.getAsObject());
      }
      stmt.free();
      return rows;
    }
  };
}

export { initDb, prepare, saveDb };
export default { initDb, prepare, saveDb };
