// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCwluguLhlCWGVvhSE13X9BsnR1lAxXVcM",
  authDomain: "ou-media.firebaseapp.com",
  projectId: "ou-media",
  storageBucket: "ou-media.appspot.com",
  messagingSenderId: "454636476050",
  appId: "1:454636476050:web:40b5c2f645c992b5dcf84b",
  measurementId: "G-CVTZ3WZRDM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const database = getFirestore(app);