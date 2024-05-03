// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-854b3.firebaseapp.com",
  projectId: "mern-blog-854b3",
  storageBucket: "mern-blog-854b3.appspot.com",
  messagingSenderId: "221912119166",
  appId: "1:221912119166:web:07c068a1cd0696686e652f"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);