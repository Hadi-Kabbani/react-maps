import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';

function NewRealisedBody({ handleCart }) {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [genre, setGenre] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState("All");
    const [selectedYear, setSelectedYear] = useState(2015);
    const [selectedPrice, setSelectedPrice] = useState([0, 1000]);
    const [cartBooks, setCartBooks] = useState(() => {
        const storedCartBooks = localStorage.getItem("cartBooks") || "[]";
        return JSON.parse(storedCartBooks);
    });

    const [startIndex, setStartIndex] = useState(0);
    const [maxResults] = useState(40);
    const [numberOfFetch, setNumberOfFetch] = useState(50);

    const handleAddToCart = (book) => {
        // Check if the book is already in cart
        if (cartBooks.some(cartBook => cartBook.id === book.id)) {
            console.log("Book is already in the cart.");
            return;
        }

        setCartBooks(prevBooks => {
            if (Array.isArray(prevBooks)) {
                return [...prevBooks, book];
            } else {
                console.error("prevBooks is not an array");
                return [book];
            }
        });
    };

    useEffect(() => {
        localStorage.setItem("cartBooks", JSON.stringify(cartBooks));
        handleCart(cartBooks);
    }, [cartBooks, handleCart]);

    useEffect(() => {
        const fetchBooks = async () => {
            setLoading(true);
            try {
                const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=search+terms&startIndex=${startIndex}&maxResults=${maxResults}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch books');
                }
                const data = await response.json();

                const booksWithData = data.items.map(book => ({
                    id: book.id,
                    title: book.volumeInfo.title,
                    author: book.volumeInfo.authors ? book.volumeInfo.authors[0] || 'Unknown' : 'Unknown',
                    publication_year: book.volumeInfo.publishedDate?.substring(0, 4) || 'Unknown',
                    price: book.saleInfo.retailPrice?.amount || 19.99,
                    cover_image: book.volumeInfo.imageLinks?.thumbnail || 'No Image',
                    genre: book.volumeInfo.categories?.length > 0 ? book.volumeInfo.categories : ['Unknown'],
                    description: book.volumeInfo.description || 'No Description'
                })).filter(book => parseInt(book.publication_year) >= 2015);

                setBooks(prevBooks => {
                    const uniqueBooks = [...prevBooks, ...booksWithData].reduce((acc, book) => {
                        if (!acc.some(b => b.id === book.id)) {
                            acc.push(book);
                        }
                        return acc;
                    }, []);
                    return uniqueBooks;
                });
                setStartIndex(startIndex + maxResults);
                setNumberOfFetch(numberOfFetch - 1);
            } catch (error) {
                console.error('Error fetching books:', error);
            } finally {
                setLoading(false);
            }
        };

        if (numberOfFetch > 0) {
            fetchBooks();
        }
    }, [startIndex, numberOfFetch, maxResults]);

    useEffect(() => {
        const newGenres = books
            .flatMap((book) => book.genre)
            .filter((genre) => genre !== undefined);
        setGenre((prevGenres) => {
            const uniqueGenres = new Set([...prevGenres, ...newGenres]);
            const sortedGenres = Array.from(uniqueGenres).filter(g => g.toLowerCase() !== "all").sort();
            return ["All", ...sortedGenres];
        });
    }, [books]);

    const filteredBooks = books
        .filter((book) => {
            const matchesGenre = selectedGenre === "All" || book.genre.some((g) => g === selectedGenre);
            const matchesYear = book.publication_year >= selectedYear && book.publication_year <= 2024;
            const matchesPrice = book.price >= selectedPrice[0] && book.price <= selectedPrice[1];
            return matchesGenre && matchesYear && matchesPrice;
        })
        .sort((a, b) => b.publication_year - a.publication_year);

    const handleYearChange = (event) => {
        setSelectedYear(parseInt(event.target.value));
    };

    const handlePriceChange = (event) => {
        const value = Number(event.target.value);
        setSelectedPrice((prevPrice) => {
            if (event.target.id === "minPrice") {
                return [value, prevPrice[1]];
            } else {
                return [prevPrice[0], value];
            }
        });
    };

    const handleGenreChange = (event) => {
        setSelectedGenre(event.target.value);
    };

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {loading ? (
                <div className="flex items-center justify-center h-64">
                    <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-24 w-24"></div>
                    <h2 className="text-center text-gray-600 text-xl font-semibold ml-4">Loading books...</h2>
                </div>
            ) : (
                <div>
                    <div className="filters mb-4 flex flex-col sm:flex-row items-center justify-around">
                        <div className="flex flex-col justify-around h-44 p-4 w-full sm:w-3/12">
                            <h1 className="text-center font-bold text-lg text-[#393280]">Select Genre</h1>
                            <select
                                className="py-2 px-4 bg-[#393280] rounded-md text-white"
                                onChange={handleGenreChange}
                                value={selectedGenre}
                            >
                                {genre.map((genre) => (
                                    <option key={genre} value={genre}>
                                        {genre}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="range-slider h-44  mx-0 p-4 flex flex-col items-center justify-around sm:w-3/12">
                            <h1 className="text-center font-bold text-lg text-[#393280]">Select Year</h1>
                            <input
                                type="range"
                                min="2015"
                                max="2024"
                                value={selectedYear}
                                id="yearRange"
                                onChange={handleYearChange}
                            />
                            <div className="range-labels flex justify-between w-full">
                                <span>2015</span>
                                <span>2024</span>
                            </div>
                            <div className="selected-year text-center">{selectedYear}</div>
                        </div>
                        <div className="range-slider h-44 sm:w-3/12 mx-0 p-4 flex flex-col items-center justify-around">
                            <h1 className="text-center font-bold text-lg text-[#393280]">Select Price Range</h1>
                            <div className="flex flex-row justify-between items-center w-full">
                                <div className="w-1/2 mr-2 flex flex-col items-center">
                                    <label className="w-full text-secondary font-bold mb-2" htmlFor="minPrice">Min</label>
                                    <input
                                        type="number"
                                        id="minPrice"
                                        value={selectedPrice[0]}
                                        min="0"
                                        max={selectedPrice[1]}
                                        onChange={handlePriceChange}
                                        className="py-2 px-4 bg-[#393280] text-white rounded-md w-full"
                                    />
                                </div>
                                <div className="w-1/2 ml-2 flex flex-col items-center">
                                    <label className="w-full text-secondary font-bold mb-2" htmlFor="maxPrice">Max</label>
                                    <input
                                        type="number"
                                        id="maxPrice"
                                        value={selectedPrice[1]}
                                        min={selectedPrice[0]}
                                        max="1000"
                                        onChange={handlePriceChange}
                                        className="py-2 px-4 bg-[#393280] text-white rounded-md w-full"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        {filteredBooks.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {filteredBooks.map((book) => (
                                    <div key={book.id} className="flex flex-col items-center justify-between shadow-lg p-4 bg-white rounded-lg group hover:bg-gray-100 transition duration-300">
                                        <Link to={`/books/${book.id}`}>
                                            <img
                                                src={book.cover_image}
                                                alt={book.title}
                                                className="h-64 w-full object-cover rounded-lg"
                                            />
                                        </Link>
                                        <div className="mt-2 w-full">
                                            <Link to={`/books/${book.id}`}>
                                                <h3 className="text-lg font-bold h-16 overflow-hidden">{book.title}</h3>
                                            </Link>
                                            <p className="text-gray-600 h-16 overflow-hidden">{book.author}</p>
                                            <div className="flex justify-between items-center mt-2">
                                                <p className="text-secondary font-bold">${book.price.toFixed(2)}</p>
                                                <p className="text-gray-600">{book.publication_year}</p>
                                            </div>
                                        </div>
                                        <button
                                            className="bg-primary invisible group-hover:visible w-full text-white p-2 rounded-lg mt-2 hover:bg-secondary transition duration-300"
                                            onClick={() => handleAddToCart(book)}
                                        >
                                            Add to Cart
                                        </button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center flex items-center justify-center text-red-600 font-semibold mt-4 h-80 text-3xl">
                                No books found. Please adjust your filters.
                            </div>
                        )}
                    </div>

                </div>
            )}
        </div>
    );
}

export default NewRealisedBody;
