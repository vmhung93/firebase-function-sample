const { messaging } = require("../firebase/firebase.admin");

/**
 * Send data message to specific device
 */
const sendDataMessage = async (fcmToken, data) => {
  try {
    const message = {
      data: data,
      token: fcmToken,
    };

    const messageId = await messaging.send(message);

    return messageId;
  } catch (e) {
    throw new Error(e);
  }
};

/**
 * Send notification message to specific device
 */
const sendNotificationMessage = async (fcmToken, title, body) => {
  try {
    const message = {
      token: fcmToken,
      notification: {
        title: title,
        body: body,
      },
    };

    const messageId = await messaging.send(message);

    return messageId;
  } catch (e) {
    throw new Error(e);
  }
};

module.exports = {
  sendDataMessage,
  sendNotificationMessage,
};
