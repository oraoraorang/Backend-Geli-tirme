const express = require('express');
const logger = require('./middleware/logger');
const taskRoutes = require('./routes/taskRoutes');
const reportRoutes = require('./routes/reportRoutes');

const app = express();

// Middleware (order matters: logger first so every request is recorded)
app.use(logger);
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.json({ name: 'Taskflow API', status: 'running' });
});
app.use('/tasks', taskRoutes);
app.use('/reports', reportRoutes);

// Unknown route
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Unexpected errors (e.g. file read/write problems)
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Internal server error' });
});

module.exports = app;
