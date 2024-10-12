// app/api/verse.js
export async function GET(request) {
    const response = await fetch('https://bible-api.com/john 3:16');
    const verse = await response.json();
    return new Response(JSON.stringify(verse), {
      headers: { 'Content-Type': 'application/json' },
    });
  }
