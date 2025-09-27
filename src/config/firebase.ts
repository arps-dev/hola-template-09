import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDorhBZU23-KZBPYwddafCNKOXOd8chjGk",
  authDomain: "sukunstorelogin.firebaseapp.com",
  projectId: "sukunstorelogin",
  storageBucket: "sukunstorelogin.firebasestorage.app",
  messagingSenderId: "46807407464",
  appId: "1:46807407464:web:6a205164eb593b4c7dd4dd",
  measurementId: "G-CEF25CJNGJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app;