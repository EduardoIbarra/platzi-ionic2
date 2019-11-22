// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();

const SENDGRID_API_KEY = functions.config().sendgrid.key;
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(SENDGRID_API_KEY);

exports.sendContactEmail = functions.database
  .ref('contact/{pushId}')
  .onCreate(snapshot => {
    const record = snapshot.val();
    let to = 'tucomiteasp@gmail.com';
    if (record && record.contact_type && record.contact_type.payment) {
      to = 'pagosasp@gmail.com';
    }
    if (record && record.contact_type && record.contact_type.code === 'APP') {
      to = 'eduardoibarra904@gmail.com';
    }

    console.log(to, record);
    const msg = {
      to: to,
      from: record.email,
      subject: 'Nuevo Contacto desde el App',
      templateId: 'd-6b59e7d83bad4248aec6c60e8985f7d4',
      dynamic_template_data: {
        name: record.name,
        address_key: record.address_key,
        contact_type: record.contact_type.description,
        message: record.message,
      }
    };
    return sgMail.send(msg);
  });

exports.addVisitToVisitsByAddress = functions.database.ref('visits/{pushId}/{pushId1}/{pushId12}')
  .onCreate((snapshot) => {
    const record = snapshot.val();
    return admin.database().ref(`visitsByAddress/${record.street.code}${record.street_number}/${record.timestamp}`).set(record);
  });

exports.deleteVisitOnVisitsByAddress = functions.database.ref('visits/{pushId}/{pushId1}/{pushId12}')
  .onDelete((snapshot, context) => {
    const record = snapshot.val();
    return admin.database().ref(`visitsByAddress/${record.street.code}${record.street_number}/${record.timestamp}`).remove();
  });

exports.addVerifiedToUser = functions.database.ref('users/{pushId}')
  .onCreate((snapshot) => {
    const record = snapshot.val();
    console.log(record);
    return admin.database().ref(`users/${record.uid}/isVerified`).set(true);
  });
