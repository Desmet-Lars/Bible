// components/Auth.js
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../lib/firebase'; // Import your Firebase Auth instance

const handleLogin = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    console.log('User logged in successfully');
  } catch (error) {
    console.error('Error logging in:', error);
  }
};
