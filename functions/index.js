// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers
const functions = require('firebase-functions');
const cors = require('cors')({origin: true});
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
    let to = 'info@comiteasp.com';
    if (record && record.contact_type && record.contact_type.payment) {
      to = 'pagos@comiteasp.com';
    }
    if (record && record.contact_type && record.contact_type.code === 'APP') {
      to = 'eduardo@comiteasp.com';
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

exports.searchVisit = functions.https.onRequest(async (req, res) => {
  // https://us-central1-<project-id>.cloudfunctions.net/searchVisit
  const term = req.query.term;
  const options = {
    timeZone: 'America/Mexico_city',
    year: 'numeric', month: 'numeric', day: 'numeric',
    hour: 'numeric', minute: 'numeric', second: 'numeric',
  };
  const today = (new Date()).toLocaleString([], options);
  console.log(today);
  const brokenDate = today.split(' ')[0].split('-');
  const formattedDate = `${brokenDate[0]}_${brokenDate[1]}_${brokenDate[2]}`;
  console.log(`/visits/${formattedDate}`);
  let todayVisits = await admin.database().ref(`/visits/${formattedDate}`).once('value');
  let frequentVisits = await admin.database().ref('/frequent_visits/').once('value');
  let morosos = await admin.database().ref('/morosos/').once('value');

  todayVisits = todayVisits.val() || [];
  console.log(todayVisits);
  todayVisits = Object.keys(todayVisits).map(function(key) {
    return todayVisits[key];
  });
  frequentVisits = Object.keys(frequentVisits.val()).map(function(key) {
    return frequentVisits.val()[key];
  });
  morosos = Object.keys(morosos.val()).map(function(key) {
    return morosos.val()[key];
  });

  let addresses_visits = [];
  let new_addresses_visits = [];

  todayVisits.forEach((addresses) => {
    const address_visits = Object.keys(addresses).map(function(key) {
      return addresses[key];
    });
    address_visits.forEach(visit => addresses_visits.push(visit));
  });

  frequentVisits.forEach(address => {
    const visits = Object.keys(address).map(function(key) {
      return address[key];
    });
    visits.forEach((v) => addresses_visits.push(({ ...v, frequent: true })));
  });
  addresses_visits = addresses_visits.map(obj=> ({ ...obj, visit_type: obj.type, moroso: morosos.filter((m) => m.address_key == obj.addressKey)[0] }));
  new_addresses_visits = addresses_visits.filter(visit => !visit.visited || visit.frequent);
  new_addresses_visits = new_addresses_visits.filter(av => JSON.stringify(av).toLowerCase().indexOf(term.toLowerCase()) > 0);

  // res.status(200).send(new_addresses_visits);
  cors(req, res, () => {
    res.status(200).send(new_addresses_visits);
  });
});

exports.scanVisit = functions.https.onRequest(async (req, res) => {
  // https://us-central1-directorioasp.cloudfunctions.net/scanVisit?path=visits/2019_9_30/500220/1569897619416
  const path = req.query.path;
  const today = new Date(Date.now());
  const formattedDate = `${today.getFullYear()}_${today.getMonth() + 1}_${today.getDate()}`;
  let visit = await admin.database().ref(path).once('value');
  visit = visit.val();

  if(!visit || !visit.street || !visit.street.code) {
    res.status(404).send({error: 'Visita No Encontrada'});
    return;
  }
  let moroso = await admin.database().ref(`morosos/${visit.street.code}${visit.street_number}`).once('value');
  moroso = moroso.val();
  visit.moroso = moroso;
  // res.status(200).send(visit);
  cors(req, res, () => {
    res.status(200).send(visit);
  });
});

exports.registerVisit = functions.https.onRequest(async (req, res) => {
  // https://us-central1-directorioasp.cloudfunctions.net/registerVisit
  const visit = req.body;
  const marbete = (visit.marbete) ? visit.marbete : 999;
  if (visit && visit.path.indexOf('frequent') >= 0) {
    const timestamp = Date.now();
    await admin.database().ref(`${visit.path}/visits/${timestamp}`).set({timestamp: timestamp, marbete: marbete});
  }
  await admin.database().ref(`${visit.path}/marbete`).set(marbete);
  await admin.database().ref(`${visit.path}/visited`).set(true);
  const response = await admin.database().ref(visit.path).once('value');
  //res.status(200).send(response.val());
  cors(req, res, () => {
    res.status(200).send(response.val());
  });
});

exports.generateSurveyResults = functions.https.onRequest(async (req, res) => {
  // https://us-central1-directorioasp.cloudfunctions.net/generateSurveyResults?surveyId=9
  let categories = [];
  let answeredSurveyOptions = [];
  const surveyId = req.query.surveyId;
  let surveyRecord = await admin.database().ref(`/surveys/${surveyId}`).once('value');
  surveyRecord = surveyRecord.val();
  let surveyAnswered = await admin.database().ref(`/survey_answers/${surveyId}`).once('value');
  surveyAnswered = surveyAnswered.val();

  let arrayOfAnswers = Object.keys(surveyAnswered.answers).map(function(key) {
    return surveyAnswered.answers[key];
  });

  if(!surveyAnswered) {
    return;
  }
  categories.push(surveyRecord.question);

  let result = arrayOfAnswers.reduce(function (r, a) {
    r[a.choice] = r[a.choice] || [];
    r[a.choice].push(a);
    return r;
  }, Object.create(null));

  Object.keys(result).forEach(function (item) {
    if (!item) {
      return;
    }
    let answer = surveyRecord.options.find(o => o && o.id == item);
    if (answer) {
      console.log(answer && answer.name); // key
      console.log(result[item].length); // value
      answeredSurveyOptions.push({answer: answer, count: result[item].length});
    }
  });

  res.status(200).send({surveyRecord: surveyRecord, options: answeredSurveyOptions});
});
