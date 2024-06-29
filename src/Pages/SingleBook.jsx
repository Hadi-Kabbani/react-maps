import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import HeaderMiddle from "../Components/headermiddle";
import TopBar from "../Components/topbar";
import Footer from "../Components/footer";
import SingleBookHeader from '../Components/singlebookheader';

function SingleBook() {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isLiked, setIsLiked] = useState(false);

    const [cartBooks, setCartBooks] = useState(() => {
        const savedCart = localStorage.getItem("cartBooks");
        return savedCart ? JSON.parse(savedCart) : [];
    });

    const [wishlist, setWishlist] = useState(() => {
        const savedWishlist = localStorage.getItem("wishlist");
        return savedWishlist ? JSON.parse(savedWishlist) : [];
    });

    useEffect(() => {
        localStorage.setItem("total", wishlist.length);
    }, [wishlist]);

    useEffect(() => {
        setIsLiked(wishlist.some(wishlistBook => wishlistBook.id === id));
    }, [id, wishlist]);

    useEffect(() => {
        localStorage.setItem("cartBooks", JSON.stringify(cartBooks));
    }, [cartBooks]);

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await fetch(`https://www.googleapis.com/books/v1/volumes/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch book');
                }
                const data = await response.json();
                const fullDescription = data.volumeInfo.description || 'No Description';
                const firstSentence = fullDescription.split('. ')[0] + '.';
                const bookData = {
                    id: data.id,
                    title: data.volumeInfo.title,
                    author: data.volumeInfo.authors?.join(', ') || 'Unknown',
                    publication_year: data.volumeInfo.publishedDate?.substring(0, 4) || 2000,
                    price: data.saleInfo.retailPrice?.amount || 19.99,
                    cover_image: data.volumeInfo.imageLinks?.thumbnail || 'No Image',
                    genre: data.volumeInfo.categories?.[0] || 'Unknown',  // Extract only the first genre
                    description: firstSentence
                };

                const discountBooks = JSON.parse(localStorage.getItem("discountBooks")) || [];
                const discountedBook = discountBooks.find(discountBook => discountBook.id === id);
                if (discountedBook) {
                    bookData.price = discountedBook.price;
                }

                setBook(bookData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchBook();
    }, [id]);

    const handleAddToCart = (book) => {
        setCartBooks(prevBooks => {
            if (prevBooks.find(cartBook => cartBook.id === book.id)) {
                console.log("Book is already in the cart.");
                return prevBooks;
            } else {
                console.log("Adding book to the cart.");
                return [...prevBooks, book];
            }
        });
    };

    const handleLikeClick = () => {
        setIsLiked(prevIsLiked => {
            const newIsLiked = !prevIsLiked;
            if (newIsLiked) {
                if (!wishlist.find(wishlistBook => wishlistBook.id === book.id)) {
                    const updatedWishlist = [...wishlist, book];
                    setWishlist(updatedWishlist);
                    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
                }
            } else {
                const updatedWishlist = wishlist.filter(wishlistBook => wishlistBook.id !== book.id);
                setWishlist(updatedWishlist);
                localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
            }
            return newIsLiked;
        });
    };

    const handleBuyClick = () => {
        const message = `Hi, I would like to buy the book "${book.title}" by ${book.author}, published in ${book.publication_year}. The price is $${book.price}.`;
        const whatsappURL = `https://wa.me/96176795291?text=${encodeURIComponent(message)}`;
        window.location.href = whatsappURL;
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-center">
                    <div className="loader border-t-4 border-blue-500 rounded-full w-16 h-16 mb-4"></div>
                    <p className="text-lg font-semibold text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    if (!book) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-center">
                    <p className="text-2xl font-semibold text-black mb-4">Book not found</p>
                    <p className="text-lg text-gray-600">Sorry, the book you are looking for does not exist.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto">
            <TopBar />
            <HeaderMiddle cartBooks={cartBooks} />
            <SingleBookHeader title={book.title} id={book.id} />
            <div className="shadow-md rounded-lg bg-neutral-100 grid grid-cols-1 sm:grid-cols-2 justify-between gap-4 mt-4 items-center p-3" key={book.id}>
                <div className="w-full flex items-center justify-center">
                    <div className="flex flex-col items-center justify-between shadow-lg p-4 bg-white rounded-lg group hover:bg-gray-100 transition duration-300">
                        <img className="h-96 w-full object-cover rounded-lg" src={book.cover_image} alt={book.title} />
                    </div>
                </div>
                <div>
                    <h1 className="text-2xl md:text-4xl text-primary font-bold my-3 border-b-4 border-primary pb-3 w-fit">{book.title}</h1>
                    <p className="text-lg md:text-2xl font-bold my-6 text-slate-500"><span className="text-paragraph">{book.author.length > 1 ? "Authors:" : "Author:"}</span> {book.author}</p>
                    <p className="text-lg md:text-2xl text-slate-500 font-bold my-6"><span className="text-paragraph">Publication year:</span> {book.publication_year}</p>
                    <p className="text-lg md:text-2xl text-slate-500 font-bold my-6"><span className="text-paragraph">Price:</span> {book.price.toFixed(2)} $</p>
                    <div className='flex gap-4 my-4 items-center'>
                        <p className='text-lg md:text-2xl font-bold text-paragraph'>Genre:</p>
                        {Array.isArray(book.genre) ? (
                            <p className="text-base md:text-lg text-black">{book.genre.join(', ')}</p>
                        ) : (
                            <p className="text-base md:text-lg text-black">{book.genre}</p>
                        )}
                    </div>
                    <p className="w-fit text-base md:text-lg text-paragraph h-30 overflow-auto">{book.description}</p>
                    <div className='flex flex-row gap-2'>
                        <button className="btn" onClick={handleBuyClick}>Buy</button>
                        <button className="btn" onClick={() => handleAddToCart(book)}>Add to cart</button>
                        <div className='flex items-center justify-center rounded-full p-1' onClick={handleLikeClick} style={{ width: '32px' }}>
                            <svg className='stroke-2' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={isLiked ? "red" : "none"} stroke={isLiked ? "red" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 4.53c2.35-2.11 5.98-2.06 8.25.23C22.5 7.77 22.58 11.38 20.48 13.73L12 21.48 3.52 13.73C1.42 11.38 1.5 7.77 3.75 4.76c2.26-2.18 5.9-2.21 8.25-.23zm6.83 1.64c-1.5-1.5-3.92-1.5-5.42 0l-1.34 1.34-1.35-1.35c-1.5-1.5-3.92-1.5-5.42 0-1.5 1.5-1.5 3.92 0 5.42L12 18.65l6.01-6.01c1.5-1.5 1.5-3.92 0-5.42z"></path>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default SingleBook;
