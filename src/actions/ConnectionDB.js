import firebase from 'firebase';

var config = {
    apiKey: "AIzaSyAS9adbyUuINTL1zYMJhJVeSqUTnnrS1Ok",
    authDomain: "sismec-489d0.firebaseapp.com",
    databaseURL: "https://sismec-489d0.firebaseio.com",
    projectId: "sismec-489d0",
    storageBucket: "sismec-489d0.appspot.com",
    messagingSenderId: "683132291099"
  };
  firebase.initializeApp(config);

export default firebase;