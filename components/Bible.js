// components/Bible.js
'use client'
import { useState } from 'react';

const Bible = () => {
  const [verse, setVerse] = useState(null);

  const fetchVerse = async () => {
    const res = await fetch('https://bible-api.com/john 3:16');
    const data = await res.json();
    setVerse(data);
  };

  return (
    <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded shadow">
      <button
        onClick={fetchVerse}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Get John 3:16
      </button>
      {verse && (
        <p className="mt-4 text-gray-700 dark:text-gray-300">{verse.text}</p>
      )}
    </div>
  );
};

export default Bible;
