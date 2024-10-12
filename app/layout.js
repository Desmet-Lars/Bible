// app/layout.js
'use client'; // This directive is used in Next.js to indicate client-side rendering.
import './globals.css'; // Import your global CSS styles
import { ThemeProvider } from './context/ThemeProvider'; // Import theme management context
import Header from '../components/Header'; // Import the Header component

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider> {/* Wrap children with ThemeProvider for theme context */}
          <Header /> {/* Render the Header component */}
          {children} {/* Render child components */}
        </ThemeProvider>
      </body>
    </html>
  );
}
