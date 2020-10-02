const admin = require("firebase-admin");

// Firebase credential
const serviceAccount = require("./firebase-adminsdk.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const auth = admin.auth();
const firestore = admin.firestore();
const messaging = admin.messaging();

module.exports = {
  auth,
  firestore,
  messaging,
};
