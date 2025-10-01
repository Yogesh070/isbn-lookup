'use client';

import { useState } from 'react';
import BookSearch from '../components/BookSearch';
import BookDisplay from '../components/BookDisplay';

export interface BookData {
  isbn: string;
  title: string;
  authors: string[];
  publisher: string;
  publish_date: string;
  description: string;
  page_count: number | null;
  language: string;
  subjects: string[];
  cover_url: string | null;
  source: string;
}

export default function Home() {
  const [bookData, setBookData] = useState<BookData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleBookSearch = async (isbn: string) => {
    setLoading(true);
    setError(null);
    setBookData(null);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      const response = await fetch(`${apiUrl}/api/books/lookup/${encodeURIComponent(isbn)}/`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch book data');
      }

      const data = await response.json();
      setBookData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            ISBN Book Lookup
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Enter an ISBN number to find book information
          </p>
        </header>

        <div className="max-w-4xl mx-auto">
          <BookSearch onSearch={handleBookSearch} loading={loading} />
          
          {error && (
            <div className="mt-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          {bookData && <BookDisplay book={bookData} />}
        </div>
      </div>
    </div>
  );
}
