import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDCGvLE_9NY-YgD-OF_LfIwtqcwk6Yugxw",
  authDomain: "gym-training-9747d.firebaseapp.com",
  projectId: "gym-training-9747d",
  storageBucket: "gym-training-9747d.firebasestorage.app",
  messagingSenderId: "898353414031",
  appId: "1:898353414031:web:b5bad708bf712be27755fa"
};

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

export { auth, db }
