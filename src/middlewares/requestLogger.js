const morgan = require("morgan");

// Custom log format
const requestLogger = morgan((tokens, req, res) => {
  return [
    `[${new Date().toISOString()}]`,
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    `${tokens["response-time"](req, res)} ms`,
  ].join(" ");
});

module.exports = requestLogger;
