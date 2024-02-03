import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; 

const firebaseConfig = {
  apiKey: "AIzaSyC_SySb62qDdppRjKf9DJp6nM4UK9Npsqc",
  authDomain: "prueba-parcial-1262d.firebaseapp.com",
  projectId: "prueba-parcial-1262d",
  storageBucket: "prueba-parcial-1262d.appspot.com",
  messagingSenderId: "979569956934",
  appId: "1:979569956934:web:2fc1d42ae2d6475bb35247"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app); // Inicializa y exporta db
