// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();

exports.addVisitToVisitsByAddress = functions.database.ref('visits/{pushId}/{pushId1}/{pushId12}')
  .onCreate((snapshot) => {
    const record = snapshot.val();
    console.log('yyyyyyyyyyyyyyy', snapshot.val());
    return admin.database().ref(`visitsByAddress/${record.street.code}${record.street_number}/${record.timestamp}`).set(record);
  });
