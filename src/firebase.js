// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth} from "firebase/auth";

import { getDatabase } from "firebase/database";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "portfolio-b7e19.firebaseapp.com",
  projectId: "portfolio-b7e19",
  storageBucket: "portfolio-b7e19.appspot.com",
  messagingSenderId: "319792719457",
  appId: "1:319792719457:web:6271dc2292af022d952c20"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();

const database = getDatabase(app);

export { database };


;