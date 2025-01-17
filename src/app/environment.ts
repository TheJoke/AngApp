// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyBR-dV4c7OQpsyGIfF2fUOniPuRGEWakTc",
  authDomain: "athentication-76d28.firebaseapp.com",
  projectId: "athentication-76d28",
  storageBucket: "athentication-76d28.appspot.com",
  messagingSenderId: "520480772882",
  appId: "1:520480772882:web:aff1330f5274ff6d3ad9cb",
  measurementId: "G-924TVSDPQ0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);