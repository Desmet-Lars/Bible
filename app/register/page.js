"use client"; // Client-side

import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../lib/firebase'; // Firebase setup
import { useRouter } from 'next/navigation'; // useRouter for navigation

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push('/login'); // Redirect to login after successful registration
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-200">Register</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleRegister} className="bg-white dark:bg-gray-800 p-6 rounded shadow-lg">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
