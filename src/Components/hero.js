import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Hero() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [autoSlide, setAutoSlide] = useState(true);
    const slideInterval = 6000;

    const images = ['/images/hero1.png', '/images/hero2.png', '/images/hero3.png'];
    const descriptions = [
        "Do you have a lot of empty shelves in your house? We have the best books for you that will make your life easier and more interesting.",
        "You will expand your mind and fill your shelves with many good books.",
        "Check out our book store for an incredible selection of books."
    ];

    const titles = [
        "Welcome to our store",
        "Expand Your Mind",
        "Explore Our Bookstore"
    ];

    const handleDotClick = (index) => {
        setCurrentSlide(index);
        setAutoSlide(true);
    };

    const nextSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
    };

    useEffect(() => {
        if (autoSlide) {
            const intervalId = setInterval(nextSlide, slideInterval);
            return () => clearInterval(intervalId);
        }
    }, [autoSlide]);

    return (
        <div className="hero">
            <div className='grid grid-cols-1 sm:grid-cols-2 py-6'>
                <div className='flex flex-col items-center sm:items-start justify-center'>
                    <h1 className='h-fit text-3xl sm:text-4xl font-bold text-primary capitalize text-center sm:text-left md:text-center w-full'>{titles[currentSlide]}</h1>
                    <p className='h-16 text-lg sm:text-xl md:text-lg my-4 text-paragraph capitalize text-center sm:text-left lg:text-center w-full'>{descriptions[currentSlide]}</p>
                </div>
                <div className='p-4 flex justify-center item-center'>
                    <Link className='flex items-center justify-center w-80 h-80 overflow-hidden' to="/books">
                        <img
                            src={images[currentSlide]}
                            alt={`hero${currentSlide + 1}.png`}
                            className="slide-image cursor-pointer h-full w-full"
                        />
                    </Link>
                </div>
            </div>
            <div className='slider flex items-center justify-center py-8'>
                <div className='w-1/5 flex justify-between'>
                    {images.map((_, index) => (
                        <div
                            key={index}
                            className={`slider_dot relative w-3 h-3 sm:w-4 sm:h-4 bg-primary rounded-full hover:bg-secondary transition-all ${index === currentSlide ? 'bg-secondary' : ''}`}
                            onClick={() => handleDotClick(index)}
                        ></div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Hero;
