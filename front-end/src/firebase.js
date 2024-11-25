import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAWApJxMb1CLj_TkOIQCDEcFlhT36KZdR8",
  authDomain: "diamond-font-end-8ac2d.firebaseapp.com",
  projectId: "diamond-font-end-8ac2d",
  storageBucket: "diamond-font-end-8ac2d.appspot.com",
  messagingSenderId: "494586714469",
  appId: "1:494586714469:web:e4385d5c08c5eadcb7a98c",
  measurementId: "G-HBKLF2PDG6"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);

export { app, analytics, storage, ref, uploadBytes, getDownloadURL };
