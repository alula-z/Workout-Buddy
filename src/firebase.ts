import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBEgbjiVzklCnI1pWePd8RZcrMMOBAbRz0",
  authDomain: "workout-buddy-545ad.firebaseapp.com",
  projectId: "workout-buddy-545ad",
  storageBucket: "workout-buddy-545ad.appspot.com",
  messagingSenderId: "389391243870",
  appId: "1:389391243870:web:b4aea28c4fa2ffeb97b2cf"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);