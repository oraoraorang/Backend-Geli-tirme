const taskRepository = require('../repositories/taskRepository');

// Defaults applied when a field is not sent on creation.
const DEFAULT_STATUS = 'pending'; // pending | in-progress | completed
const DEFAULT_PRIORITY = 'medium'; // low | medium | high

async function getAllTasks() {
  return taskRepository.findAll();
}

async function getTaskById(id) {
  return taskRepository.findById(id);
}

async function createTask(body) {
  const now = new Date().toISOString();
  return taskRepository.create({
    title: body.title,
    description: body.description,
    status: body.status || DEFAULT_STATUS,
    priority: body.priority || DEFAULT_PRIORITY,
    assignee: body.assignee,
    dueDate: body.dueDate,
    createdAt: now,
    updatedAt: now,
  });
}

async function updateTask(id, body) {
  // Only known fields can be changed; createdAt and id are protected.
  const allowed = ['title', 'description', 'status', 'priority', 'assignee', 'dueDate'];
  const changes = {};
  for (const key of allowed) {
    if (body[key] !== undefined) changes[key] = body[key];
  }
  changes.updatedAt = new Date().toISOString();
  return taskRepository.update(id, changes);
}

async function deleteTask(id) {
  return taskRepository.remove(id);
}

async function getSummary() {
  const tasks = await taskRepository.findAll();
  const count = (field, value) => tasks.filter((t) => t[field] === value).length;
  return {
    total: tasks.length,
    pending: count('status', 'pending'),
    inProgress: count('status', 'in-progress'),
    completed: count('status', 'completed'),
    byPriority: {
      low: count('priority', 'low'),
      medium: count('priority', 'medium'),
      high: count('priority', 'high'),
    },
  };
}

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  getSummary,
};
