// File: firebase-config.js
// Firebase Configuration - Initialize Firebase

import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js';
import { getStorage } from 'https://www.gstatic.com/firebasejs/10.7.0/firebase-storage.js';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBsIs_qh_D_jg7s-VTf0B_-mTqeOufIIgw",
  authDomain: "promptverse-1d0d1.firebaseapp.com",
  projectId: "promptverse-1d0d1",
  storageBucket: "promptverse-1d0d1.firebasestorage.app",
  messagingSenderId: "286067391099",
  appId: "1:286067391099:web:216f59dd71a261514300de"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth
export const auth = getAuth(app);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Storage
export const storage = getStorage(app);

export default app;
