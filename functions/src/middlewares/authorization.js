const logger = require("../utils/logger");

/**
 * Authorization middleware
 */
const authorization = (opts) => {
  return async (req, res, next) => {
    try {
      const user = res.locals.user;

      if (user.roles && hasPermission(user.roles, opts.hasRole)) {
        return next();
      }

      return res.status(403).end();
    } catch (e) {
      logger.error(new Error(e));
      res.status(403).end();
    }
  };
};

const hasPermission = (source, dest) => {
  return dest.every((d) => source.includes(d));
};

module.exports = authorization;
