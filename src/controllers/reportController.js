const taskService = require('../services/taskService');

async function getCompleted(req, res, next) {
  try {
    const summary = await taskService.getSummary();
    res.json({ completed: summary.completed });
  } catch (err) {
    next(err);
  }
}

async function getPending(req, res, next) {
  try {
    const summary = await taskService.getSummary();
    res.json({ pending: summary.pending });
  } catch (err) {
    next(err);
  }
}

async function getSummary(req, res, next) {
  try {
    res.json(await taskService.getSummary());
  } catch (err) {
    next(err);
  }
}

module.exports = { getCompleted, getPending, getSummary };
