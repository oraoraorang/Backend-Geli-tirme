const fs = require('fs');
const path = require('path');

const LOG_DIR = path.join(__dirname, '..', '..', 'logs');
const LOG_FILE = path.join(LOG_DIR, 'access.log');

fs.mkdirSync(LOG_DIR, { recursive: true });

/**
 * Logs every request (timestamp, method, endpoint, status, duration)
 * to both the console and logs/access.log.
 * The line is written when the response finishes so the status code is known.
 */
function logger(req, res, next) {
  const start = Date.now();

  res.on('finish', () => {
    const line =
      `[${new Date().toISOString()}] ${req.method} ${req.originalUrl} ` +
      `${res.statusCode} ${Date.now() - start}ms`;

    console.log(line);
    fs.appendFile(LOG_FILE, line + '\n', (err) => {
      if (err) console.error('Log file write failed:', err.message);
    });
  });

  next();
}

module.exports = logger;
