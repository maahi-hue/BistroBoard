// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBEi-Hlp2QoQyeGS0KbBet_oHKVcPajLZU",
  authDomain: "assignment-11-f04f9.firebaseapp.com",
  projectId: "assignment-11-f04f9",
  storageBucket: "assignment-11-f04f9.firebasestorage.app",
  messagingSenderId: "192852104160",
  appId: "1:192852104160:web:4cd94b245f41efe0e51185",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
