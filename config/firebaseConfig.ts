import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA9djk0hC3ZVk1JOLKZq2KcuSAm9SXDymI",
  authDomain: "croatia-tours.firebaseapp.com",
  projectId: "croatia-tours",
  storageBucket: "croatia-tours.appspot.com",
  messagingSenderId: "96479549120",
  appId: "1:96479549120:web:98c625db0851fadaf7ff25"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { db, auth, googleProvider };