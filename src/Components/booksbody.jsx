import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function BooksBody({ cart }) {
    const [genre, setGenre] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState("All");
    const [selectedYear, setSelectedYear] = useState(1850);
    const [selectedPrice, setSelectedPrice] = useState([0, 1000]);
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [startIndex, setStartIndex] = useState(0);
    const [numberOfBooksPerPage, setNumberOfBooksPerPage] = useState(32);
    const [currentPage, setCurrentPage] = useState(1);
    const [numberOfPages, setNumberOfPages] = useState(24);
    const [cartBooks, setCartBooks] = useState(() => {
        const storedCartBooks = localStorage.getItem("cartBooks") || [];
        return JSON.parse(storedCartBooks);
    });

    useEffect(() => {
        const fetchBooks = async () => {
            setLoading(true);
            try {
                const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=search+terms&startIndex=${startIndex}&maxResults=${numberOfBooksPerPage}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch books');
                }
                const data = await response.json();
                const booksWithData = data.items.map(book => ({
                    id: book.id,
                    title: book.volumeInfo.title,
                    author: book.volumeInfo.authors ? book.volumeInfo.authors[0] || 'Unknown' : 'Unknown',
                    publication_year: book.volumeInfo.publishedDate?.substring(0, 4) || 2000,
                    price: book.saleInfo.retailPrice?.amount || 19.99,
                    cover_image: book.volumeInfo.imageLinks?.thumbnail || 'No Image',
                    genre: book.volumeInfo.categories || ['Unknown'],
                    description: book.volumeInfo.description || 'No Description'
                }));
                setBooks(booksWithData);
            } catch (error) {
                console.error('Error fetching books:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, [startIndex, numberOfBooksPerPage]);

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

    const handleYearChange = (event) => {
        setSelectedYear(event.target.value);
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

    const handleBooksPerPageChange = (event) => {
        const value = Number(event.target.value);
        setNumberOfBooksPerPage(value);
        setStartIndex(0);
        setCurrentPage(1);
        switch (value) {
            case 32:
                setNumberOfPages(24);
                break;
            case 24:
                setNumberOfPages(32);
                break;
            case 16:
                setNumberOfPages(48);
                break;
            case 8:
                setNumberOfPages(95);
                break;
            default:
                setNumberOfPages(24);
                break;
        }
    };

    const handleAddToCart = (book) => {
        setCartBooks(prevBooks => {
            if (Array.isArray(prevBooks)) {
                if (prevBooks.find(cartBook => cartBook.id === book.id)) {
                    console.log("Book is already in the cart.");
                    return prevBooks;
                } else {
                    console.log("Adding book to the cart.");
                    return [...prevBooks, book];
                }
            } else {
                console.error("prevBooks is not an array");
                return [book];
            }
        });
    };

    useEffect(() => {
        localStorage.setItem("cartBooks", JSON.stringify(cartBooks));
        cart(cartBooks);
    }, [cartBooks]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        setStartIndex((pageNumber - 1) * numberOfBooksPerPage);
    };

    const filteredBooks = books
        .filter((book) => {
            const matchesGenre = selectedGenre === "All" || book.genre.some((g) => g === selectedGenre);
            const matchesYear = book.publication_year >= selectedYear && book.publication_year <= 2024;
            const matchesPrice = book.price >= selectedPrice[0] && book.price <= selectedPrice[1];
            return matchesGenre && matchesYear && matchesPrice;
        })
        .sort((a, b) => b.publication_year - a.publication_year);

    return (
        <div className="my-8">
            {loading ? (
                <div className="flex items-center justify-center h-64">
                    <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-24 w-24"></div>
                    <h2 className="text-center text-gray-600 text-xl font-semibold ml-4">Loading books...</h2>
                </div>
            ) : (
                <>
                    <div className="filters mb-4 flex flex-col sm:flex-row items-center justify-around">
                        <div className="flex flex-col justify-around h-44 p-4">
                            <h1 className="text-center font-bold text-lg text-[#393280]">Select Genre</h1>
                            <select className="py-2 px-4 bg-[#393280] rounded-md text-white" onChange={(e) => setSelectedGenre(e.target.value)}>
                                {genre.map((genre) => (
                                    <option key={genre} value={genre}>
                                        {genre}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex flex-col justify-around h-44 p-4">
                            <h1 className="text-center font-bold text-lg text-[#393280]">Books per page</h1>
                            <select className="py-2 px-4 bg-[#393280] rounded-md text-white" onChange={handleBooksPerPageChange} value={numberOfBooksPerPage}>
                                <option value="32">32</option>
                                <option value="24">24</option>
                                <option value="16">16</option>
                                <option value="8">8</option>
                            </select>
                        </div>
                        <div className="range-slider h-44 mx-0 p-4 flex flex-col items-center justify-around">
                            <h1 className="text-center font-bold text-lg text-[#393280]">Select Year</h1>
                            <input
                                type="range"
                                min="1850"
                                max="2024"
                                value={selectedYear}
                                id="yearRange"
                                onChange={handleYearChange}
                            />
                            <div className="range-labels flex justify-between w-full">
                                <span>1850</span>
                                <span>2024</span>
                            </div>
                            <div className="selected-year text-center">{selectedYear}</div>
                        </div>
                        <div className="range-slider h-44 mx-0 p-4 flex flex-col items-center justify-around">
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

                    {filteredBooks.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                                {filteredBooks.map((book) => (
                                    <div key={book.id} className="flex flex-col items-center justify-between shadow-lg p-4 bg-white rounded-lg group hover:bg-gray-100 transition duration-300">
                                        <Link to={`/books/${book.id}`}>
                                            <img className="h-64 w-full object-cover rounded-lg" src={book.cover_image} alt={book.title} />
                                        </Link>
                                        <div className="p-4 w-full">
                                            <div className="flex flex-col justify-between h-24">
                                                <h1 className="text-lg font-bold text-[#393280] mb-2 max-h-14 overflow-hidden">{book.title}</h1>
                                                <div className="flex flex-row justify-between">
                                                    <p className="text-sm text-secondary mb-2">{book.publication_year}</p>
                                                    <p className="text-lg font-bold text-[#393280]">${book.price}</p>
                                                </div>
                                            </div>
                                            <button
                                                className="block mt-2 py-2 px-4 bg-[#393280] hover:bg-secondary text-white rounded-md w-full transition-all opacity-0 group-hover:opacity-100"
                                                onClick={() => handleAddToCart(book)}
                                            >
                                                Add to Cart
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {numberOfPages > 1 && (
                                <div className="flex justify-center  items-center mt-4 max-w-full">
                                    <div className="flex flex-wrap flex-row items-center ">
                                        {Array.from({ length: numberOfPages }, (_, index) => (
                                            <button
                                                key={index + 1}
                                                className={`px-3 my-2 mx-3 w-10 h-10 overflow-hidden py-1 rounded-md ${currentPage === index + 1 ? 'bg-[#393280] text-white' : 'bg-gray-200 text-gray-700'} hover:bg-[#393280] hover:text-white`}
                                                onClick={() => handlePageChange(index + 1)}
                                            >
                                                {index + 1}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="flex items-center justify-center h-48">
                            <p className="text-center font-bold text-2xl text-red-500">
                                No books available for the selected genre, year, and price range.
                            </p>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default BooksBody;
