import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Offers() {
    const [books, setBooks] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [countdown, setCountdown] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });
    const slideInterval = 6000;

    localStorage.setItem('discountBooks', JSON.stringify(books));

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await fetch('https://freetestapi.com/api/v1/books');
                if (!response.ok) {
                    throw new Error('Failed to fetch books');
                }
                const data = await response.json();
                const booksBelow1820 = data.filter(book => parseInt(book.publication_year) <= 1820);
                const booksWithDiscount = booksBelow1820.map(book => ({
                    ...book,
                    price: !isNaN(parseInt(book.price)) ? parseInt(book.price) * 0.5 : 19.99 * 0.5
                }));
                setBooks(booksWithDiscount);
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };
        fetchBooks();
    }, []);

    useEffect(() => {
        const intervalId = setInterval(nextSlide, slideInterval);
        return () => clearInterval(intervalId);
    }, [currentSlide, books.length]);

    useEffect(() => {
        const targetDate = new Date().getTime() + 5 * 24 * 60 * 60 * 1000;

        const updateCountdown = () => {
            const now = new Date().getTime();
            const difference = targetDate - now;

            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            setCountdown({ days, hours, minutes, seconds });
        };

        const countdownInterval = setInterval(updateCountdown, 1000);
        return () => clearInterval(countdownInterval);
    }, []);

    const nextSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % books.length);
    };

    const handleDotClick = (index) => {
        setCurrentSlide(index);
    };

    return (
        <section className="offer py-7">
            <div className="container px-5 mx-auto">
                <div className="flex  flex-col-reverse sm:flex sm:flex-row justify-between sm:grid-cols-1 md:grid-cols-2 bg-red-50 p-5 rounded-lg">
                    <div className="flex flex-col items justify-center p-0">
                        <h1 className="text-3xl lg:text-4xl font-bold text-primary mb-3 lg:mb-5">
                            These books are 50% off now! Don't miss such a deal!
                        </h1>
                        {books.length > 0 && (
                            <>
                                <p className="text-secondary my-4 text-2xl">
                                    {books[currentSlide].title}
                                </p>
                                <p className="text-primary font-bold mb-5">
                                    The price after discount is ${books[currentSlide].price.toFixed(2)}
                                </p>
                            </>
                        )}
                        <div className="flex justify-around mb-5">
                            <div className="text-center">
                                <div className="text-secondary font-bold text-2xl" id="days">{countdown.days}</div>
                                <div className="font-bold text-sm">DAYS</div>
                            </div>
                            <div className="text-center">
                                <div className="text-secondary font-bold text-2xl" id="hours">{countdown.hours}</div>
                                <div className="font-bold text-sm">HOURS</div>
                            </div>
                            <div className="text-center">
                                <div className="text-secondary font-bold text-2xl" id="minutes">{countdown.minutes}</div>
                                <div className="font-bold text-sm">MINUTES</div>
                            </div>
                            <div className="text-center">
                                <div className="text-secondary font-bold text-2xl" id="seconds">{countdown.seconds}</div>
                                <div className="font-bold text-sm">SECONDS</div>
                            </div>
                        </div>
                        <div className="flex justify-center lg:justify-start">
                            <div className="slider w-full">
                                <div className="flex justify-evenly">
                                    {books.map((_, index) => (
                                        <div
                                            key={index}
                                            className={`slider_dot relative w-4 h-4 sm:w-4 sm:h-4 bg-primary rounded-full hover:bg-secondary transition-all ${index === currentSlide ? 'bg-secondary' : ''}`}
                                            onClick={() => handleDotClick(index)}
                                        ></div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        {books.length > 0 && (
                            <div className='flex items-end justify-center'>
                                <Link className="flex items-end justify-center p-6 w-full max-w-96 overflow-hidden" to={`/books/${books[currentSlide].id}`} >
                                    <img className="h-full w-full object-cover " src={books[currentSlide].cover_image} alt={books[currentSlide].title} />
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Offers;
