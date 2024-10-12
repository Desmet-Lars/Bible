// components/Bookmarks.js
import { useEffect, useState } from 'react';
import { db } from '../lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

const Bookmarks = ({ userId }) => {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const fetchBookmarks = async () => {
      const q = query(collection(db, 'bookmarks'), where('userId', '==', userId));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setBookmarks(data);
    };

    fetchBookmarks();
  }, [userId]);

  return (
    <div>
      <h3>Your Bookmarks</h3>
      <ul>
        {bookmarks.map((bookmark) => (
          <li key={bookmark.id}>{bookmark.verse}</li>
        ))}
      </ul>
    </div>
  );
};

export default Bookmarks;
