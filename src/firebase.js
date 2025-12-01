import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAe-TSXAAGfU6KfKTyKmAbXADSJLSOpTSs',
  authDomain: 'checkpoint-a3f4a.firebaseapp.com',
  projectId: 'checkpoint-a3f4a',
  storageBucket: 'checkpoint-a3f4a.firebasestorage.app',
  messagingSenderId: '755990588093',
  appId: '1:755990588093:web:6ea45fa97efa3bf10d65d4',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app); // For login/signup
export const db = getFirestore(app); // For Firestore database (used later)
