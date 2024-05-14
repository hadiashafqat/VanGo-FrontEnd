// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAlH-WSmqwSC6buX3LAtw2k_l4uKFzwQKk",
  authDomain: "react-vango.firebaseapp.com",
  projectId: "react-vango",
  storageBucket: "react-vango.appspot.com",
  messagingSenderId: "125561543855",
  appId: "1:125561543855:web:41df5b4a526302bf9f885a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);