import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAvxIHqO9sb5O_0b1UFuAveWKIrUkT5Q9c",
  authDomain: "gamesource-9e703.firebaseapp.com",
  projectId: "gamesource-9e703",
  storageBucket: "gamesource-9e703.appspot.com",
  messagingSenderId: "139127197862",
  appId: "1:139127197862:web:17b044f3e28ef6b216e467",
  measurementId: "G-CM4HXC1N2M",
};
initializeApp(firebaseConfig);
const DB = getFirestore();
const AUTH = getAuth();
export { DB, AUTH };
