'use client';

import { BookData } from '../app/page';
import Image from 'next/image';

interface BookDisplayProps {
  book: BookData;
}

export default function BookDisplay({ book }: BookDisplayProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      <div className="md:flex">
        {/* Book Cover */}
        <div className="md:w-1/3 p-6 flex justify-center md:justify-start">
          {book.cover_url ? (
            <Image
              src={book.cover_url}
              alt={`Cover of ${book.title}`}
              width={200}
              height={300}
              className="rounded-lg shadow-md"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                target.nextElementSibling?.classList.remove('hidden');
              }}
            />
          ) : null}
          <div className={`${book.cover_url ? 'hidden' : ''} w-48 h-72 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center`}>
            <div className="text-center text-gray-500 dark:text-gray-400">
              <svg className="w-16 h-16 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-sm">No cover available</p>
            </div>
          </div>
        </div>

        {/* Book Details */}
        <div className="md:w-2/3 p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {book.title}
          </h2>
          
          <div className="space-y-3">
            {/* Authors */}
            {book.authors && book.authors.length > 0 && (
              <div>
                <span className="font-semibold text-gray-700 dark:text-gray-300">Author(s):</span>
                <p className="text-gray-900 dark:text-white">
                  {book.authors.join(', ')}
                </p>
              </div>
            )}

            {/* Publisher */}
            <div>
              <span className="font-semibold text-gray-700 dark:text-gray-300">Publisher:</span>
              <p className="text-gray-900 dark:text-white">{book.publisher}</p>
            </div>

            {/* Publication Date */}
            <div>
              <span className="font-semibold text-gray-700 dark:text-gray-300">Published:</span>
              <p className="text-gray-900 dark:text-white">{book.publish_date}</p>
            </div>

            {/* ISBN */}
            <div>
              <span className="font-semibold text-gray-700 dark:text-gray-300">ISBN:</span>
              <p className="text-gray-900 dark:text-white font-mono">{book.isbn}</p>
            </div>

            {/* Language */}
            <div>
              <span className="font-semibold text-gray-700 dark:text-gray-300">Language:</span>
              <p className="text-gray-900 dark:text-white">{book.language}</p>
            </div>

            {/* Page Count */}
            {book.page_count && (
              <div>
                <span className="font-semibold text-gray-700 dark:text-gray-300">Pages:</span>
                <p className="text-gray-900 dark:text-white">{book.page_count}</p>
              </div>
            )}

            {/* Subjects */}
            {book.subjects && book.subjects.length > 0 && (
              <div>
                <span className="font-semibold text-gray-700 dark:text-gray-300">Subjects:</span>
                <div className="flex flex-wrap gap-2 mt-1">
                  {book.subjects.slice(0, 5).map((subject, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full"
                    >
                      {subject}
                    </span>
                  ))}
                  {book.subjects.length > 5 && (
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-full">
                      +{book.subjects.length - 5} more
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Description */}
            {book.description && (
              <div>
                <span className="font-semibold text-gray-700 dark:text-gray-300">Description:</span>
                <p className="text-gray-900 dark:text-white mt-1 text-sm leading-relaxed">
                  {book.description}
                </p>
              </div>
            )}

            {/* Source */}
            <div className="pt-4 border-t border-gray-200 dark:border-gray-600">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Data source: {book.source}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
