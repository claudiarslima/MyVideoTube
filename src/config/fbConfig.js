// ----------- IMPORTS --------------------//
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'
// --------------------------------------//

// Iniciar o Firebase
  var config = {
    apiKey: "AIzaSyDmyyNVFXSW8BNbCf4edOQcQrm6yUAQ0Qg",
    authDomain: "myvideotube-92482.firebaseapp.com",
    databaseURL: "https://myvideotube-92482.firebaseio.com",
    projectId: "myvideotube-92482",
    storageBucket: "myvideotube-92482.appspot.com",
    messagingSenderId: "754549075582"
  };



  firebase.initializeApp(config);
  firebase.database();
  firebase.auth();
  const storage = firebase.storage();

  export {
      storage, firebase as default
  }
