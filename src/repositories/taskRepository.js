const fs = require('fs/promises');
const path = require('path');

const DATA_FILE = path.join(__dirname, '..', '..', 'data', 'tasks.json');

// File format: { "lastId": <number>, "tasks": [ ... ] }
// lastId only ever increases, so IDs are never reused after a delete.

async function readDb() {
  try {
    const raw = await fs.readFile(DATA_FILE, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    if (err.code === 'ENOENT') return { lastId: 0, tasks: [] };
    throw err;
  }
}

async function writeDb(db) {
  await fs.writeFile(DATA_FILE, JSON.stringify(db, null, 2), 'utf8');
}

async function findAll() {
  const db = await readDb();
  return db.tasks;
}

async function findById(id) {
  const db = await readDb();
  return db.tasks.find((t) => t.id === id) || null;
}

async function create(data) {
  const db = await readDb();
  db.lastId += 1;
  const task = { id: db.lastId, ...data };
  db.tasks.push(task);
  await writeDb(db);
  return task;
}

async function update(id, changes) {
  const db = await readDb();
  const index = db.tasks.findIndex((t) => t.id === id);
  if (index === -1) return null;
  // id is preserved even if the body contains one
  db.tasks[index] = { ...db.tasks[index], ...changes, id };
  await writeDb(db);
  return db.tasks[index];
}

async function remove(id) {
  const db = await readDb();
  const index = db.tasks.findIndex((t) => t.id === id);
  if (index === -1) return null;
  const [removed] = db.tasks.splice(index, 1);
  await writeDb(db);
  return removed;
}

module.exports = { findAll, findById, create, update, remove };
