// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAHgUdvysze7mS_YRadUfVjIV2ViN1iB54",
  authDomain: "project-sphere-43cf2.firebaseapp.com",
  projectId: "project-sphere-43cf2",
  storageBucket: "project-sphere-43cf2.firebasestorage.app",
  messagingSenderId: "873677342036",
  appId: "1:873677342036:web:84ebaa9a309118c63274c1",
  measurementId: "G-TTKR1FH022"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);