// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCItRU5I_QND---fiZZG1ASmkZoxlqrMFg",
  authDomain: "garagecuts-14990.firebaseapp.com",
  projectId: "garagecuts-14990",
  storageBucket: "garagecuts-14990.appspot.com",
  messagingSenderId: "27041208733",
  appId: "1:27041208733:web:43ab78f827f0a2495f7774",
  measurementId: "G-004J3CNT03",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
