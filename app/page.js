"use client"; // Client-side only for Firebase Auth

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // For redirection
import { auth } from '../lib/firebase'; // Firebase config

const Home = () => {
  const [verse, setVerse] = useState(null);
  const [randomVerse, setRandomVerse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // New loading state
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(true); // State for dark mode

  // Predefined list of Bible verses
  const versesList = [
    { reference: "John 3:16", text: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life." },
    { reference: "Philippians 4:13", text: "I can do all this through him who gives me strength." },
    { reference: "Psalm 23:1", text: "The Lord is my shepherd, I lack nothing." },
    { reference: "Romans 8:28", text: "And we know that in all things God works for the good of those who love him, who have been called according to his purpose." },
    { reference: "1 Corinthians 13:4-7", text: "Love is patient, love is kind. It does not envy, it does not boast, it is not proud." },
    { reference: "Matthew 5:16", text: "Let your light shine before others, that they may see your good deeds and glorify your Father in heaven." },
    { reference: "Isaiah 40:31", text: "But those who hope in the Lord will renew their strength. They will soar on wings like eagles; they will run and not grow weary; they will walk and not be faint." },
    { reference: "Jeremiah 29:11", text: "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future." },
    { reference: "Proverbs 3:5-6", text: "Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight." },
    { reference: "2 Timothy 1:7", text: "For God has not given us a spirit of fear, but of power, love, and a sound mind." }
  ];

  // Fetch Verse of the Day
  useEffect(() => {
    const fetchVerse = async () => {
      try {
        const res = await fetch('https://bible-api.com/psalm 23:1'); // Replace with a valid endpoint for verse of the day
        if (!res.ok) throw new Error('Failed to fetch verse');
        const data = await res.json();
        setVerse(data);
      } catch (err) {
        setError('Failed to fetch verse.');
      } finally {
        setLoading(false);
      }
    };

    fetchVerse();
  }, []);

  const fetchRandomVerse = () => {
    setLoading(true);
    // Select a random verse from the predefined list
    const randomIndex = Math.floor(Math.random() * versesList.length);
    const randomVerse = versesList[randomIndex];
    setRandomVerse(randomVerse);
    setLoading(false);
  };

  const handleLogout = async () => {
    try {
      await auth.signOut(); // Await the signOut promise
      router.push('/login'); // Redirect to login page after logging out
    } catch (err) {
      console.error("Logout error:", err); // Log error if logout fails
    }
  };

  // Check for user authentication on component mount
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (!user) {
        console.log('User is not logged in:', user); // Log user details
        router.push('/login'); // Redirect to login if user is not authenticated
      } else {
        console.log('User is logged in:', user);
      }
    });

    return () => unsubscribe(); // Clean up subscription on unmount
  }, [router]);

  // Function to toggle the theme
  const toggleTheme = () => {
    setDarkMode(prevDarkMode => !prevDarkMode);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-200' : 'bg-gray-100 text-gray-900'} transition duration-500`}>
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-bold mb-6 text-center">Verse of the Day</h1>

        {/* Theme Toggle Button */}
        <div className="flex justify-center mb-4">
          <button
            onClick={toggleTheme}
            className={`py-2 px-4 rounded ${darkMode ? 'bg-gray-800 text-white' : 'bg-blue-600 text-white'} transition duration-300`}
          >
            {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          </button>
        </div>

        {/* Loading, Error, or Verse Display */}
        {loading ? (
          <p className="text-center animate-pulse">Loading...</p>
        ) : error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : (
          verse && (
            <div className="flex justify-center items-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg transition duration-200 transform hover:scale-105">
              <div className="text-center" style={{color:"white"}}>
                <h2 className="text-2xl font-semibold mb-2">{verse.reference}</h2>
                <p className="text-lg italic">{verse.text}</p>
              </div>
            </div>
          )
        )}

        {/* Random Verse Button */}
        <button
          onClick={fetchRandomVerse}
          className="mt-6 py-2 px-4 rounded bg-green-600 text-white transition duration-300 hover:bg-green-700"
        >
          Get Random Verse
        </button>

        {/* Random Verse Display */}
        {randomVerse && (
          <div className="flex justify-center items-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg transition duration-200 transform hover:scale-105 mt-4">
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-2">{randomVerse.reference}</h2>
              <p className="text-lg italic">{randomVerse.text}</p>
            </div>
          </div>
        )}

        {/* Logout Button */}
        <div className="text-center mt-6">
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded transition duration-300 transform hover:scale-105"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
