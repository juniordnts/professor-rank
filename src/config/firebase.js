import firebase from "firebase";

import "firebase/analytics";

if (firebase.apps.length === 0) {
  firebase.initializeApp({
    apiKey: "AIzaSyDxl-YKbcIp84f2rjENdySY6lJwVjQzrTU",
    authDomain: "circular-ufrn.firebaseapp.com",
    databaseURL: "https://circular-ufrn.firebaseio.com",
    projectId: "circular-ufrn",
    storageBucket: "circular-ufrn.appspot.com",
    messagingSenderId: "188902688357",
    appId: "1:188902688357:web:599605bf988a91e6c0a88c",
    measurementId: "G-MYVKFBMTKT"
  });
}

export default firebase;
