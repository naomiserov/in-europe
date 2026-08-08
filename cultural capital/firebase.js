// firebase-config.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyA_ztfodaK0PMr1gBhU0z5nHEFVai0ieDw",
  authDomain: "cultural-capital-25cee.firebaseapp.com",
  projectId: "cultural-capital-25cee",
  storageBucket: "cultural-capital-25cee.firebasestorage.app",
  messagingSenderId: "430405827158",
  appId: "1:430405827158:web:e60ae24126d2df462219f7",
  measurementId: "G-62DJMCDQ7K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export services
import { initializeApp } from
"https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import { getStorage } from
"https://www.gstatic.com/firebasejs/12.1.0/firebase-storage.js";

import { getDatabase } from
"https://www.gstatic.com/firebasejs/12.1.0/firebase-database.js";


const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "cultural-capital-25cee.firebaseapp.com",
  databaseURL: "https://cultural-capital-25cee-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "cultural-capital-25cee",
  storageBucket: "cultural-capital-25cee.firebasestorage.app",
  messagingSenderId: "430405827158",
  appId: "1:430405827158:web:e60ae24126d2df462219f7",
  measurementId: "G-62DJMCDQ7K"
};


const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);

export const storage = getStorage(app);


