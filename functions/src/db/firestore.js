const admin = require("firebase-admin");
const { firestore } = require("../firebase/firebase.admin");

const db = firestore;
const fieldValue = admin.firestore.FieldValue;

module.exports = { db, fieldValue };
