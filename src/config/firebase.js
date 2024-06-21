// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAdUd9k8I5Y5YcMH9W8ccgEmOPs4ti-Bcw",
  authDomain: "vite-contact-79d65.firebaseapp.com",
  projectId: "vite-contact-79d65",
  storageBucket: "vite-contact-79d65.appspot.com",
  messagingSenderId: "601624084811",
  appId: "1:601624084811:web:1c42a8a6465f5a9cdc68ce"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);