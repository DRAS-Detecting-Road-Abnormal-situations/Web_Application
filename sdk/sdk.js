// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDFDD8X7EgY7Vh1ySVO8sAodI6dOAPRmKQ",
  authDomain: "dras-cc7ae.firebaseapp.com",
  projectId: "dras-cc7ae",
  storageBucket: "dras-cc7ae.appspot.com",
  messagingSenderId: "203359181923",
  appId: "1:203359181923:web:5160bc46d5f8704c152c56",
  measurementId: "G-60JQQGV270"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);