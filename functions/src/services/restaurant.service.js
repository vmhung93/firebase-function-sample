const { db, fieldValue } = require("../db/firestore");

const _collection = "restaurants";

/**
 * Get restaurants
 */
const get = async () => {
  try {
    const snapshot = await db
      .collection(_collection)
      .orderBy("createdAt", "desc")
      .get();

    if (snapshot.empty) {
      return;
    }

    return snapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
  } catch (e) {
    throw new Error(e);
  }
};

/*
  Get restaurant by id
*/
const getById = async (id) => {
  try {
    const snapshot = await db.collection(_collection).doc(id).get();

    if (!snapshot.exists) {
      return;
    }

    // Return document
    return { id: snapshot.id, ...snapshot.data() };
  } catch (e) {
    throw new Error(e);
  }
};

/**
 * Get restaurant by code
 */
const getByCode = async (code) => {
  try {
    const snapshot = await db
      .collection(_collection)
      .where("code", "==", code)
      .get();

    if (snapshot.empty) {
      return;
    }

    // Return document
    return { id: snapshot.docs[0].id, ...snapshot.docs[0].data() };
  } catch (e) {
    throw new Error(e);
  }
};

/**
 * Create a new restaurant
 */
const create = async (obj) => {
  try {
    // Document reference
    const documentReference = db.collection(_collection).doc();

    await documentReference.set({
      name: obj.name,
      code: obj.code,
      address: obj.address,
      city: obj.city,
      phoneNumber: obj.phoneNumber,
      website: obj.website,
      isDeleted: false,

      // Tracking columns
      createdAt: fieldValue.serverTimestamp(),
      updatedAt: fieldValue.serverTimestamp(),
    });
  } catch (e) {
    throw new Error(e);
  }
};

/**
 * Update a restaurant
 */
const update = async (obj) => {
  try {
    const documentReference = db.collection(_collection).doc(obj.id);
    await documentReference.update({
      name: obj.name,
      address: obj.address,
      city: obj.city,
      phoneNumber: obj.phoneNumber,
      website: obj.website,
      isDeleted: false,

      // Tracking columns
      updatedAt: fieldValue.serverTimestamp(),
    });
  } catch (e) {
    throw new Error(e);
  }
};

/**
 * Delete a restaurant
 */
const remove = async (id) => {
  try {
    const documentReference = db.collection(_collection).doc(id);
    await documentReference.update({
      isDeleted: true,

      // Tracking columns
      updatedAt: fieldValue.serverTimestamp(),
    });
  } catch (e) {
    throw new Error(e);
  }
};

module.exports = {
  get,
  getById,
  getByCode,
  create,
  update,
  remove,
};
