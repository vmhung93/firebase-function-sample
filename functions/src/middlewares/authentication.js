const { auth } = require("../firebase/firebase.admin");
const logger = require("../utils/logger");

const { Role } = require("../constants/role");

/**
 * Authentication middleware
 */
const authentication = async (req, res, next) => {
  try {
    const authorization = req.header("Authorization");

    if (!authorization || !authorization.startsWith("Bearer")) {
      return res.status(401).end();
    }

    const token = authorization.replace("Bearer ", "");

    if (!token || token.lenght === 0) {
      return res.status(401).end();
    }

    let _res = res;

    // Verify ID tokens using the Firebase Admin SDK
    await auth
      .verifyIdToken(token)
      .then(function (decodedToken) {
        // Persist current user's info
        _res.locals.user = {
          uid: decodedToken.uid,
          email: decodedToken.email,
          emailVerified: decodedToken.email_verified,
          phoneNumber: decodedToken.phone_number,
          roles: decodedToken.roles,
          isAdmin:
            decodedToken.roles && decodedToken.roles.includes(Role.admin),
        };
      })
      .catch(function (e) {
        throw new Error(e);
      });

    next();
  } catch (e) {
    logger.error(new Error(e));
    res.status(401).end();
  }
};

module.exports = authentication;
