import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function NewReleases() {
    const navigate = useNavigate();
    const [books, setBooks] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [displayedBooks, setDisplayedBooks] = useState(1);
    const slideInterval = 6000;

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await fetch('https://www.googleapis.com/books/v1/volumes?q=search+terms&startIndex=0&maxResults=40');
                if (!response.ok) {
                    throw new Error('Failed to fetch books');
                }
                const data = await response.json();
                const booksWithData = data.items.map(book => ({
                    id: book.id,
                    title: book.volumeInfo.title,
                    author: book.volumeInfo.authors ? book.volumeInfo.authors[0] : 'Unknown',
                    publication_year: book.volumeInfo.publishedDate?.substring(0, 4) || 'Unknown',
                    price: book.saleInfo.retailPrice?.amount || 'Unknown',
                    cover_image: book.volumeInfo.imageLinks?.thumbnail || 'No Image',
                    genre: book.volumeInfo.categories ? book.volumeInfo.categories.join(', ') : 'Unknown',
                    description: book.volumeInfo.description ? book.volumeInfo.description.split('. ')[0] + '.' : 'No Description'
                }));
                setBooks(booksWithData);
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };
        fetchBooks();
    }, []);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setDisplayedBooks(3);
            } else if (window.innerWidth >= 768) {
                setDisplayedBooks(2);
            } else {
                setDisplayedBooks(1);
            }
        };

        handleResize(); // Call once on component mount
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const filteredBooks = books.filter(book => parseInt(book.publication_year) >= 2018);

    const showMore = () => {
        navigate('/newreleased', { state: { books: filteredBooks } });
    };

    useEffect(() => {
        const intervalId = setInterval(nextSlide, slideInterval);
        return () => clearInterval(intervalId);
    }, [currentSlide, books.length]);

    const nextSlide = () => {
        setCurrentSlide(prevSlide => (prevSlide + 1) % Math.ceil(filteredBooks.length / displayedBooks));
    };

    const handleDotClick = index => {
        setCurrentSlide(index);
    };

    // Calculate the range of books to display for the current slide
    const startIdx = currentSlide * displayedBooks;
    const endIdx = startIdx + displayedBooks;

    return (
        <div className='pt-6'>
            <div className='flex items-center justify-center'>
                <div className='w-4/12 h-0.5 bg-gray-300'></div>
                <Link className='w-4/12' to='/newreleased'>
                    <h1 className='my-5 w-full text-center text-3xl font-bold text-blue-900'>New Releases</h1>
                </Link>
                <div className='w-4/12 h-0.5 bg-gray-300'></div>
            </div>
            <ul className='book-list py-5 gap-5 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                {filteredBooks.slice(startIdx, endIdx).map(book => (
                    <li className='book-item h-96 w-full relative flex flex-col items-center justify-evenly' key={book.id}>
                        <div className='relative p-3 w-full h-full overflow-hidden rounded-lg shadow-md'>
                            <img className='w-full h-full object-cover' src={book.cover_image} alt={book.title} />
                            <div className='absolute inset-0 flex items-center justify-center bg-primary bg-opacity-0 hover:bg-opacity-70 transition-opacity transtion-all'>
                                <Link
                                    className='text-white invisible group-hover:visible bg-primary px-4 py-2 rounded-lg hover:bg-secondary transition-all'
                                    to={`/books/${book.id}`}
                                >
                                    View Details
                                </Link>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
            {filteredBooks.length > displayedBooks && (
                <div className='flex flex-col items-center justify-center mt-8'>
                    <div className='w-full h-0.5 bg-primary'></div>
                    <div className='w-full flex items-center justify-between mt-3'>
                        <div className='w-3/12'></div>
                        <div className='w-3/12 flex justify-between'>
                            {Array.from({ length: Math.ceil(filteredBooks.length / displayedBooks) }, (_, index) => (
                                <div
                                    key={index}
                                    className={`p-2 cursor-pointer slider_dot rounded-full bg-primary hover:bg-secondary transition-all ${index === currentSlide ? 'bg-secondary' : ''
                                        }`}
                                    onClick={() => handleDotClick(index)}
                                ></div>
                            ))}
                        </div>
                        <button
                            onClick={showMore}
                            className='w-3/12 text-lg text-primary hover:text-secondary underline underline-offset-1'
                        >
                            Show More
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default NewReleases;
