// lib/db.js
import { db } from './firebase';
import { collection, addDoc } from 'firebase/firestore';

export const addBookmark = async (userId, verse) => {
  try {
    await addDoc(collection(db, 'bookmarks'), {
      userId,
      verse,
      createdAt: new Date(),
    });
    console.log('Bookmark added!');
  } catch (e) {
    console.error('Error adding bookmark:', e);
  }
};
