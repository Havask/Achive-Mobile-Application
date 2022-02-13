// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore/lite";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB6s7gB43bNDx1x0Xjm-ZJyQOiAlJDB2LA",
  authDomain: "achive-456ac.firebaseapp.com",
  projectId: "achive-456ac",
  storageBucket: "achive-456ac.appspot.com",
  messagingSenderId: "79987872294",
  appId: "1:79987872294:web:693b990f7e1803e7260ce7",
  measurementId: "G-TPSQ0C6TS9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app); 
