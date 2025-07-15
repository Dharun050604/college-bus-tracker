import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCIFeK70_oC2RBZpNx-rB9q8ETjE5V5LnI",
  authDomain: "collegebustracker-6f277.firebaseapp.com",
  projectId: "collegebustracker-6f277",
  storageBucket: "collegebustracker-6f277.firebasestorage.app",
  messagingSenderId: "900422787400",
  appId: "1:900422787400:web:05ef96f1854fbe343e937d",
  measurementId: "G-HQ4ZGZLJ8H"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
