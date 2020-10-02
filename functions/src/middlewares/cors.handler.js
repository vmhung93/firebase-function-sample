const configuration = require("../utils/configuration");

/**
 * Configuring CORS with dynamic origins
 */
const allowedOrigins = (origin, callback) => {
  // Loading of allowed origin(s) from config.json
  callback(null, configuration.get("cors:allowed_origins"));
};

module.exports = {
  allowedOrigins,
};
