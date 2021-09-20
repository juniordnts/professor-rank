import firebase from "firebase";

import "firebase/analytics";

if (firebase.apps.length === 0) {
  firebase.initializeApp({
    apiKey: "AIzaSyBr9uzgiXIXVTThihN4JYt7mSZYMjSQQL0",
    authDomain: "geral-dnts.firebaseapp.com",
    databaseURL: "https://geral-dnts.firebaseio.com",
    projectId: "geral-dnts",
    storageBucket: "geral-dnts.appspot.com",
    messagingSenderId: "351134168292",
    appId: "1:351134168292:web:020ad821d02b8c7837a8f1",
    measurementId: "G-4468L6TL58",
  });
}

export default firebase;
