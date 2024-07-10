// firebaseConfig.js
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyAzU8zR6W3ZcDS_lmQvvM5HUmflXDadDiE",
    authDomain: "foodchooser-b83a0.firebaseapp.com",
    projectId: "foodchooser-b83a0",
    storageBucket: "foodchooser-b83a0.appspot.com",
    messagingSenderId: "194785440478",
    appId: "1:194785440478:web:66c98e7a15672b9302c84f",
    measurementId: "G-G9Y169P57M"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();

export { db };
