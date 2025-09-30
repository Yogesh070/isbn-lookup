'use client';

import { useState } from 'react';

interface BookSearchProps {
  onSearch: (isbn: string) => void;
  loading: boolean;
}

export default function BookSearch({ onSearch, loading }: BookSearchProps) {
  const [isbn, setIsbn] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isbn.trim()) {
      onSearch(isbn.trim());
    }
  };

  const handleExampleClick = (exampleIsbn: string) => {
    setIsbn(exampleIsbn);
    onSearch(exampleIsbn);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="isbn" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            ISBN Number
          </label>
          <input
            type="text"
            id="isbn"
            value={isbn}
            onChange={(e) => setIsbn(e.target.value)}
            placeholder="Enter ISBN-10 or ISBN-13 (e.g., 978-0-13-468599-1)"
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            disabled={loading}
          />
        </div>
        
        <button
          type="submit"
          disabled={loading || !isbn.trim()}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
        >
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Searching...
            </>
          ) : (
            'Lookup Book'
          )}
        </button>
      </form>

      <div className="mt-6">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Try these examples:</p>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleExampleClick('978-0-13-468599-1')}
            disabled={loading}
            className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-full transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Clean Code
          </button>
          <button
            onClick={() => handleExampleClick('978-0-321-35668-0')}
            disabled={loading}
            className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-full transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Effective Java
          </button>
          <button
            onClick={() => handleExampleClick('978-1-449-37094-3')}
            disabled={loading}
            className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-full transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Learning React
          </button>
        </div>
      </div>
    </div>
  );
}
