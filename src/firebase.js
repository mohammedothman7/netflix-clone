import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/performance";
import "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyANkIQy12COK7I6hASDLFZcuwnrwITy2nc",
  authDomain: "netflix-clone-c1766.firebaseapp.com",
  projectId: "netflix-clone-c1766",
  storageBucket: "netflix-clone-c1766.appspot.com",
  messagingSenderId: "252015566327",
  appId: "1:252015566327:web:8e08c223d041085ac162f2",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
firebase.performance();
firebase.analytics();

export { auth };
export default db;
