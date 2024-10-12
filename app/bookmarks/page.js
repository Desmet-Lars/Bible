// app/bookmarks/page.js
import Bookmarks from '../../components/Bookmarks';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../lib/firebase';

export default function BookmarksPage() {
  const [user] = useAuthState(auth);

  if (!user) {
    return <p>Please sign in to view your bookmarks.</p>;
  }

  return (
    <main>
      <h1>Your Bookmarked Verses</h1>
      <Bookmarks userId={user.uid} /> {/* Pass user's ID to fetch bookmarks */}
    </main>
  );
}
