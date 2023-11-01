import { initializeApp } from 'firebase/app'
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore'
import { connectAuthEmulator, getAuth } from 'firebase/auth'
import { getStorage, connectStorageEmulator } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyB6kXthWVVMKRxiU-uoKNzSPLSvEnh9YUI",
  authDomain: "find-pet-23603.firebaseapp.com",
  projectId: "find-pet-23603",
  storageBucket: "find-pet-23603.appspot.com",
  messagingSenderId: "311761539971",
  appId: "1:311761539971:web:15d1d0bc376835abb65cb6"
};


// const firebaseConfig = {
//   apiKey: '...',
//   authDomain: '...',
//   projectId: 'find-pet-23603',
//   storageBucket: "localhost:9199",
// }

// Initialize Firebase
const app = initializeApp(firebaseConfig)

const db = getFirestore()
const auth = getAuth()
const storage = getStorage();



// if (location.hostname === 'localhost') {
//   connectFirestoreEmulator(db, '127.0.0.1', 8080)
//   connectStorageEmulator(storage, '127.0.0.1', 9199);
//   connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true })
// }

// console.log('db', db);




export {
  db,
  auth,
  storage
}