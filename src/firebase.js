import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyANkIQy12COK7I6hASDLFZcuwnrwITy2nc",
  authDomain: "netflix-clone-c1766.firebaseapp.com",
  projectId: "netflix-clone-c1766",
  storageBucket: "netflix-clone-c1766.appspot.com",
  messagingSenderId: "252015566327",
  appId: "1:252015566327:web:8e08c223d041085ac162f2",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth };
export default db;
