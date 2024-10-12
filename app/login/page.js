"use client"; // Client-side only for Firebase Auth

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // For redirection
import { auth } from '../../lib/firebase'; // Firebase config
import { signInWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        console.log('User is already logged in:', user); // Log user details
        router.push('/bible'); // Redirect to home page if user is authenticated
      }
    });

    return () => unsubscribe(); // Clean up subscription on unmount
  }, [router]);

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      console.log(`Attempting to log in with: ${email}`); // Log login attempt
      await signInWithEmailAndPassword(auth, email, password); // Firebase login
      console.log('Login successful!'); // Log success
      router.push('/bible'); // Redirect to home page on successful login
    } catch (err) {
      console.error('Login error:', err.message); // Log error message
      setError(err.message); // Display error message
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-200 flex items-center justify-center">
      <form onSubmit={handleLogin} className="bg-white dark:bg-gray-800 p-6 rounded shadow-md">
        <h2 className="text-2xl mb-4">Login</h2>
        {error && <p className="text-red-500">{error}</p>}
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 block w-full border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 block w-full border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white py-2 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
