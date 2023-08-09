import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB6kXthWVVMKRxiU-uoKNzSPLSvEnh9YUI",
  authDomain: "find-pet-23603.firebaseapp.com",
  projectId: "find-pet-23603",
  storageBucket: "find-pet-23603.appspot.com",
  messagingSenderId: "311761539971",
  appId: "1:311761539971:web:15d1d0bc376835abb65cb6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)

export {
  db,
  auth
}