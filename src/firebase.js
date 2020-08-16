import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyCJIWfZg2Zp5d7kLF1llAbHODXY87n7ynQ",
    authDomain: "insta-c-90059.firebaseapp.com",
    databaseURL: "https://insta-c-90059.firebaseio.com",
    projectId: "insta-c-90059",
    storageBucket: "insta-c-90059.appspot.com",
    messagingSenderId: "332094286049",
    appId: "1:332094286049:web:1b6a32f4f2018eb66fefa0",
    measurementId: "G-20QY08DFR2"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();

  export default db;