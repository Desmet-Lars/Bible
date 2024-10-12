"use client"; // Ensure it's client-side for Firebase Auth

import { useState, useEffect } from 'react';

const Bible = () => {
  const [book, setBook] = useState('Genesis'); // Default book
  const [chapter, setChapter] = useState(1); // Default chapter
  const [verses, setVerses] = useState([]);
  const [error, setError] = useState(null);

  const [bookList, setBookList] = useState([]); // State to hold the list of books

  // Fetch the list of books in the Bible
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        // Example books array, ideally this should come from a reliable source or API
        const books = [
          "Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy",
          "Joshua", "Judges", "Ruth", "1 Samuel", "2 Samuel",
          "1 Kings", "2 Kings", "1 Chronicles", "2 Chronicles", "Ezra",
          "Nehemiah", "Esther", "Job", "Psalms", "Proverbs",
          "Ecclesiastes", "Song of Solomon", "Isaiah", "Jeremiah", "Lamentations",
          "Ezekiel", "Daniel", "Hosea", "Joel", "Amos",
          "Obadiah", "Jonah", "Micah", "Nahum", "Habakkuk",
          "Zephaniah", "Haggai", "Zechariah", "Malachi", "Matthew",
          "Mark", "Luke", "John", "Acts", "Romans",
          "1 Corinthians", "2 Corinthians", "Galatians", "Ephesians", "Philippians",
          "Colossians", "1 Thessalonians", "2 Thessalonians", "1 Timothy", "2 Timothy",
          "Titus", "Philemon", "Hebrews", "James", "1 Peter",
          "2 Peter", "1 John", "2 John", "3 John", "Jude",
          "Revelation"
        ];
        setBookList(books);
      } catch (err) {
        console.error('Error fetching book list:', err);
      }
    };

    fetchBooks();
  }, []);

  // Function to fetch verses for the selected book and chapter
  const fetchChapter = async () => {
    try {
      const res = await fetch(`https://bible-api.com/${book}+${chapter}`);
      const data = await res.json();
      if (data.verses) {
        setVerses(data.verses); // Update verses from the fetched data
        setError(null); // Clear any previous error
      } else {
        throw new Error('No verses found');
      }
    } catch (err) {
      setError('Failed to fetch chapter. Please check the book and chapter number.');
      setVerses([]); // Clear verses if there's an error
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-200">
      <div className="container mx-auto p-6">
        <h1 className="text-5xl font-extrabold mb-8 text-center text-blue-600">Read the Bible</h1>

        <div className="mb-6 space-y-4">
          <select
            value={book}
            onChange={(e) => setBook(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200"
          >
            {bookList.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
          <input
            type="number"
            min="1"
            max="150" // Adjust max value based on your highest chapter count
            placeholder="Enter chapter"
            value={chapter}
            onChange={(e) => setChapter(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200"
          />
          <button
            onClick={fetchChapter}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition duration-200 shadow-lg transform hover:scale-105"
          >
            Get Chapter
          </button>
        </div>

        {error && <p className="text-red-500 text-center">{error}</p>}

        {verses.length > 0 && (
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg transition duration-200">
            <h2 className="text-3xl font-semibold mb-4 text-blue-500">{`${book} ${chapter}`}</h2>
            {verses.map((verse) => (
              <p key={verse.verse} className="text-lg mb-2">
                <span className="font-bold">{`${verse.verse}: `}</span>
                {verse.text}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Bible;
