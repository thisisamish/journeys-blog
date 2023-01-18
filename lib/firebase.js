import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAAxkvw7nDOe-7q55Mc5_xz3wiYjYFk6OY",
  authDomain: "journeys-website.firebaseapp.com",
  projectId: "journeys-website",
  storageBucket: "journeys-website.appspot.com",
  messagingSenderId: "880538286337",
  appId: "1:880538286337:web:a97dea0205e28236124300",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
