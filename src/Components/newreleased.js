import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function NewReleases() {
    const navigate = useNavigate();
    const [books, setBooks] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [displayedBooks, setDisplayedBooks] = useState(1); // Number of books to display per slide based on screen size
    const slideInterval = 6000;

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await fetch('https://freetestapi.com/api/v1/books');
                if (!response.ok) {
                    throw new Error('Failed to fetch books');
                }
                const data = await response.json();

                const booksWithData = data.map(book => ({
                    ...book,
                    price: 19.99
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
                setDisplayedBooks(3);
            } else if (window.innerWidth >= 576) {
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

    const filteredBooks = books.filter(book => parseInt(book.publication_year) >= 1980);

    const showMore = () => {
        navigate('/newreleased', { state: { books: filteredBooks } });
    };

    useEffect(() => {
        const intervalId = setInterval(nextSlide, slideInterval);
        return () => clearInterval(intervalId);
    }, [currentSlide, books.length]);

    const nextSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % Math.ceil(filteredBooks.length / displayedBooks));
    };

    const handleDotClick = (index) => {
        setCurrentSlide(index);
    };

    // Calculate the range of books to display for the current slide
    const startIdx = currentSlide * displayedBooks;
    const endIdx = startIdx + displayedBooks;

    return (
        <div className='pt-6'>
            <div className='flex items-center justify-center'>
                <div className='w-4/12 h-0.5 bg-lightgray'></div>
                <Link className='w-4/12' to={"/newreleased"}>
                    <h1 className='my-5 w-full text-center text-3xl font-bold text-primary '>New Releases</h1>
                </Link>
                <div className='w-4/12 h-0.5 bg-lightgray'></div>
            </div>
            <ul className="book-list p-0 m-0 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                {filteredBooks.slice(startIdx, endIdx).map(book => (
                    <li className="book-item relative p-2 flex flex-col items-center justify-between md:justify-evenly" key={book.id}>
                        <div className='w-72 sm:w-full lg:h-4/6 flex items-center justify-center'>
                            <img className='h-full' src={book.cover_image} alt={book.title} />
                        </div>
                        <div className="book-details text-center mt-2 h-20">
                            <h2 className='font-bold text-lg text-primary my-1'>{book.title}</h2>
                            <p className='text-sm text-secondary font-bold'>$ {book.price}</p>
                        </div>
                        <Link className="flex items-center justify-center absolute top-1/2 invisible bg-primary w-72 sm:w-11/12 text-white p-2 rounded-lg hover:bg-secondary transition-all" to={`/books/${book.id}`}>
                            <button className=''>View Details</button>
                        </Link>
                    </li>
                ))}
            </ul>
            {filteredBooks.length > displayedBooks && (
                <div className='flex flex-col items-center justify-center'>
                    <div className='w-full h-0.5 bg-primary flex items-center justify-center'></div>
                    <div className='w-full flex items-center justify-between p-3'>
                        <div className='w-full slider flex items-center justify-between py-8'>
                            <div className='w-3/12'></div>
                            <div className='w-3/12 flex justify-between'>
                                {Array.from({ length: Math.ceil(filteredBooks.length / displayedBooks) }, (_, index) => (
                                    <div
                                        key={index}
                                        className={`p-2 sm:p-2   slider_dot relative  bg-primary rounded-full hover:bg-secondary transition-all ${index === currentSlide ? 'bg-secondary' : ''}`}
                                        onClick={() => handleDotClick(index)}
                                    ></div>
                                ))}
                            </div>
                            <button onClick={showMore} className="flex items-center justify-end w-3/12 text-1xl text-primary text-end hover:text-secondary underline underline-offset-1">Show More</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default NewReleases;
