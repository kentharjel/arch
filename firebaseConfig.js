// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBKK6b6DTx8JU21HwUK238ny9oIId1wlvg",
  authDomain: "motobroom-shop.firebaseapp.com",
  projectId: "motobroom-shop",
  storageBucket: "motobroom-shop.firebasestorage.app",
  messagingSenderId: "409519092192",
  appId: "1:409519092192:web:9bab4b6d522049bce77b85"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)