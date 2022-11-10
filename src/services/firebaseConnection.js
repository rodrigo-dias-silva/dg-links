import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBDwm-QGTXTmbp31T2SRdU-SIB2HQ2ejyY",
  authDomain: "dglinks-11c0f.firebaseapp.com",
  projectId: "dglinks-11c0f",
  storageBucket: "dglinks-11c0f.appspot.com",
  messagingSenderId: "224891783135",
  appId: "1:224891783135:web:4ae94f75e9805f0f39666a",
  measurementId: "G-4Z96TNNFV4"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export { db, auth };
