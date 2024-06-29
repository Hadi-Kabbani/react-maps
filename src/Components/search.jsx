import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Search() {
    const [search, setSearch] = useState('');
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false); // State to track loading state
    const startIndex = 0;
    const numberOfBooksPerPage = 30;
    useEffect(() => {
        const fetchBooks = async () => {
            setLoading(true); // Set loading state to true when fetching books
            try {
                // Update API query to search by book title
                const response = await fetch(
                    `https://www.googleapis.com/books/v1/volumes?q=intitle:${search}&startIndex=${startIndex}&maxResults=${numberOfBooksPerPage}`
                );
                if (!response.ok) {
                    throw new Error('Failed to fetch books');
                }
                const data = await response.json();
                const booksWithData = data.items.map((book) => ({
                    id: book.id,
                    title: book.volumeInfo.title,
                    cover_image:
                        book.volumeInfo.imageLinks?.thumbnail ||
                        'https://via.placeholder.com/150', // Placeholder image if no thumbnail available
                }));
                setBooks(booksWithData);
            } catch (error) {
                console.error('Error fetching books:', error);
            } finally {
                setLoading(false); // Set loading state back to false after fetching
            }
        };

        if (search.trim() !== '') {
            fetchBooks();
        } else {
            setBooks([]);
        }
    }, [search]);

    return (
        <div className="relative">
            <input
                className="bg-gray-200 border border-gray-300 focus:outline-none focus:border-blue-500 rounded-xl px-4 py-2 w-full"
                type="text"
                placeholder="Search for books"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <svg
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            {books.length > 0 && !loading && (
                <div className="absolute mt-1 w-full bg-white rounded-xl border border-gray-300 shadow-lg overflow-hidden z-10">
                    <div className="py-2 px-4 max-h-80 overflow-y-auto">
                        {books.map((book) => (
                            <div
                                key={book.id}
                                className="flex items-center space-x-4 py-2 border-b border-gray-200"
                            >
                                <img
                                    src={book.cover_image}
                                    alt={book.title}
                                    className="w-12 h-16 object-cover rounded-lg"
                                />
                                <Link
                                    to={`/books/${book.id}`}
                                    className="text-blue-600 hover:underline"
                                >
                                    <h3 className="text-sm">{book.title}</h3>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Search;
