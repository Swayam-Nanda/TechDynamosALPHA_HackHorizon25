// firebase/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, onAuthStateChanged, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDCv1rhZiJXtVyvVG2WjoN5SY-bDVesAD0",
  authDomain: "virtual-police-station-570e6.firebaseapp.com",
  projectId: "virtual-police-station-570e6",
  storageBucket: "virtual-police-station-570e6.firebasestorage.app",
  messagingSenderId: "1071330345528",
  appId: "1:1071330345528:web:e8cf20b90ae6a2559b5ccd",
  measurementId: "G-3J6ZFMWM7D",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();
export const auth = getAuth(app);
export { db };
export { googleProvider };
export const storage = getStorage(app);
export const checkAuth = (setUser) => {
  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });
};
