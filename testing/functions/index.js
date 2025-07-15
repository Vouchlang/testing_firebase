const { onDocumentCreated } = require('firebase-functions/v2/firestore');
const { initializeApp } = require('firebase-admin/app');
const { getMessaging } = require('firebase-admin/messaging');
const logger = require('firebase-functions/logger');

initializeApp();

exports.myFunction = onDocumentCreated('chat/{messageId}', async (event) => {
  const snapshot = event.data;
  if (!snapshot) {
    logger.error('No data in snapshot');
    return;
  }

  const data = snapshot.data();

  return getMessaging().send({
    notification: {
      title: data.username,
      body: data.text,
    },
    data: {
      click_action: 'FLUTTER_NOTIFICATION_CLICK',
    },
    topic: 'chat',
  });
});
