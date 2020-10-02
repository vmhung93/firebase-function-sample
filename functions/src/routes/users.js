const express = require("express");

const { Role } = require("../constants/role");

const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");

const userController = require("../controllers/user.controller");

var router = express.Router();

/**
 * GET - Get user by uid
 */
router.get(
  "/uid/:uid",
  authentication,
  authorization({ hasRole: [Role.admin] }),
  userController.getUserByUid
);

/**
 * GET - Get user by email
 */
router.get(
  "/email/:email",
  authentication,
  authorization({ hasRole: [Role.admin] }),
  userController.getUserByEmail
);

/**
 * POST - Create sysAdmin
 */
router.post("/create-sysadmin", userController.createSysAdmin);

/**
 * POST - Create user
 */
router.post(
  "/",
  authentication,
  authorization({ hasRole: [Role.admin] }),
  userController.validate("create_user"),
  userController.createUser
);

/**
 * PUT - Update user
 */
router.put(
  "/",
  authentication,
  authorization({ hasRole: [Role.admin] }),
  userController.validate("update_user"),
  userController.updateUser
);

/**
 * DELETE - Delete user
 */
router.delete(
  "/:uid",
  authentication,
  authorization({ hasRole: [Role.admin] }),
  userController.validate("delete_user"),
  userController.deleteUser
);

/**
 * POST - Change password
 */
router.post(
  "/change-password",
  authentication,
  userController.validate("change_password"),
  userController.changePassword
);

/**
 * POST - Assign roles
 */
router.post(
  "/assign-roles",
  authentication,
  authorization({ hasRole: [Role.admin] }),
  userController.validate("assign_roles"),
  userController.assignRoles
);

module.exports = router;
