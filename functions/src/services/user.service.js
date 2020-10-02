const { auth } = require("../firebase/firebase.admin");

/**
 * Get user by UID
 */
const getByUid = async (uid) => {
  try {
    const user = await auth.getUser(uid);

    return user;
  } catch (e) {
    throw new Error(e);
  }
};

/**
 * Get user by email
 */
const getByEmail = async (email) => {
  try {
    const user = await auth.getUserByEmail(email);

    return user;
  } catch (e) {
    throw new Error(e);
  }
};

/**
 * Create a new user
 */
const create = async (obj) => {
  try {
    const user = await auth.createUser({
      email: obj.email,
      emailVerified: obj.emailVerified,
      displayName: obj.displayName,
      password: obj.password,
      disabled: false,
    });

    return user;
  } catch (e) {
    throw new Error(e);
  }
};

/**
 * Update user
 */
const update = async (obj) => {
  try {
    await auth.updateUser(obj.uid, {
      email: obj.email,
      emailVerified: obj.emailVerified,
      displayName: obj.displayName,
      disabled: false,
    });
  } catch (e) {
    throw new Error(e);
  }
};

/**
 * Delete a user
 */
const remove = async (uid) => {
  try {
    await auth.deleteUser(uid);
  } catch (e) {
    throw new Error(e);
  }
};

/**
 * Assign roles
 */
const assignRoles = async (obj) => {
  try {
    // Add/Remove roles to claims for additional privileges
    await auth.setCustomUserClaims(obj.uid, {
      roles: obj.roles,
    });
  } catch (e) {
    throw new Error(e);
  }
};

/**
 * Change passwords
 */
const changePassword = async (obj) => {
  try {
    await auth.updateUser(obj.uid, {
      password: obj.password,
    });
  } catch (e) {
    throw new Error(e);
  }
};

module.exports = {
  getByUid,
  getByEmail,
  create,
  update,
  remove,
  assignRoles,
  changePassword,
};
