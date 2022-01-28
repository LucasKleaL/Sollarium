import firebase from "firebase/app";
import 'firebase/firestore';
import "firebase/auth";
import "firebase/storage";

let firebaseConfig = {
    apiKey: "AIzaSyABV9_mH-nmdmRgV6WYRpGZax8--v_kUTg",
    authDomain: "cubesat-sollarium.firebaseapp.com",
    projectId: "cubesat-sollarium",
    storageBucket: "cubesat-sollarium.appspot.com",
    messagingSenderId: "686971468614",
    appId: "1:686971468614:web:b837ed719b5c1ad419c347",
    measurementId: "G-WGC1980611"
};

if(!firebase.apps.lenght){
    firebase.initializeApp(firebaseConfig);
}

export default firebase;