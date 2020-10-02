const { body, param, validationResult } = require("express-validator");

const { auth } = require("../firebase/firebase.admin");

const configuration = require("../utils/configuration");
const { Role } = require("../constants/role");

const userService = require("../services/user.service");

/**
 * Validation chain
 */
const validate = (method) => {
  switch (method) {
    case "create_user":
      return [
        body("email").notEmpty().isEmail(),
        body("displayName").notEmpty(),
        body("password").notEmpty().isLength({ min: 6 }),
      ];
    case "update_user":
      return [
        body("uid").notEmpty(),
        body("email").notEmpty().isEmail(),
        body("displayName").notEmpty(),
      ];
    case "delete_user":
      return [param("uid").notEmpty()];
    case "change_password":
      return [
        body("uid").notEmpty(),
        body("password").notEmpty().isLength({ min: 6 }),
      ];
    case "assign_roles":
      return [
        body("uid").notEmpty(),
        body("roles")
          .notEmpty()
          .custom(async (value) => {
            // Check if the user has requested to become an admin before
            const roles = [Role.sysadmin, Role.admin, Role.user];
            const valid = value.every((d) => roles.includes(d));

            if (!valid) {
              return Promise.reject("The roles is not valid");
            }
          }),
      ];
  }
};

/**
 * Get user by uid
 */
const getUserByUid = async (req, res, next) => {
  try {
    const user = await userService.getByUid(req.params.uid);

    if (!user) {
      return res.sendStatus(404).end();
    }

    res.send(user);
  } catch (e) {
    next(e);
  }
};

/**
 * Get user by email
 */
const getUserByEmail = async (req, res, next) => {
  try {
    const user = await userService.getByEmail(req.params.email);

    if (!user) {
      return res.sendStatus(404).end();
    }

    res.send(user);
  } catch (e) {
    next(e);
  }
};

/**
 * Create a new user
 */
const createUser = async (req, res, next) => {
  try {
    // Extracts the validation errors from request
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, displayName } = req.body;

    // Create a new user
    await userService.create({
      email,
      password,
      displayName,
      emailVerified: false,
    });

    res.status(201).end();
  } catch (e) {
    next(e);
  }
};

/**
 * Create admin user
 */
const createSysAdmin = async (req, res, next) => {
  try {
    const admin = {
      email: configuration.get("admin:email"),
      password: configuration.get("admin:password"),
      displayName: configuration.get("admin:displayName"),
      emailVerified: true,
    };

    // Create sysadmin
    const adminUser = await userService.create(admin);

    // Assign roles
    await userService.assignRoles({
      uid: adminUser.uid,
      roles: [Role.sysadmin, Role.admin],
    });

    res.sendStatus(201).end();
  } catch (error) {
    next(error);
  }
};

/**
 * Update user
 */
const updateUser = async (req, res, next) => {
  try {
    // Extracts the validation errors from request
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { uid, email, displayName, emailVerified } = req.body;

    // Update user
    await userService.update({
      uid,
      email,
      displayName,
      emailVerified,
    });

    // Revoke refresh tokens
    auth.revokeRefreshTokens(uid);

    res.status(200).end();
  } catch (e) {
    next(e);
  }
};

/**
 * Delete user
 */
const deleteUser = async (req, res, next) => {
  try {
    // Delete user
    await userService.remove(req.params.uid);

    // Revoke refresh tokens
    auth.revokeRefreshTokens(uid);

    res.status(200).end();
  } catch (e) {
    next(e);
  }
};

/**
 * Change password
 */
const changePassword = async (req, res, next) => {
  try {
    // Extracts the validation errors from request
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { uid, password } = req.body;

    // Change password
    await userService.changePassword({ uid, password });

    // Revoke refresh tokens
    auth.revokeRefreshTokens(uid);

    res.status(200).end();
  } catch (e) {
    next(e);
  }
};

/**
 * Assign roles
 */
const assignRoles = async (req, res, next) => {
  try {
    // Extracts the validation errors from request
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { uid, roles } = req.body;

    // Assign roles
    await userService.assignRoles({ uid, roles });

    // Revoke refresh tokens
    auth.revokeRefreshTokens(uid);

    res.status(200).end();
  } catch (e) {
    next(e);
  }
};

module.exports = {
  validate,
  getUserByUid,
  getUserByEmail,
  createUser,
  createSysAdmin,
  updateUser,
  deleteUser,
  changePassword,
  assignRoles,
};
