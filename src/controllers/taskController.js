const taskService = require('../services/taskService');

const notFound = (res) => res.status(404).json({ message: 'Task not found' });

async function getTasks(req, res, next) {
  try {
    res.json(await taskService.getAllTasks());
  } catch (err) {
    next(err);
  }
}

async function getTask(req, res, next) {
  try {
    const task = await taskService.getTaskById(Number(req.params.id));
    if (!task) return notFound(res);
    res.json(task);
  } catch (err) {
    next(err);
  }
}

async function createTask(req, res, next) {
  try {
    const task = await taskService.createTask(req.body || {});
    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
}

async function updateTask(req, res, next) {
  try {
    const task = await taskService.updateTask(Number(req.params.id), req.body || {});
    if (!task) return notFound(res);
    res.json(task);
  } catch (err) {
    next(err);
  }
}

async function deleteTask(req, res, next) {
  try {
    const task = await taskService.deleteTask(Number(req.params.id));
    if (!task) return notFound(res);
    res.json({ message: 'Task deleted', task });
  } catch (err) {
    next(err);
  }
}

module.exports = { getTasks, getTask, createTask, updateTask, deleteTask };
