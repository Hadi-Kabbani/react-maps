import { useState, useEffect } from "react";

function BooksBody({ books, cart }) {
    const [genre, setGenre] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState("All");
    const [selectedYear, setSelectedYear] = useState(1660);
    const [selectedPrice, setSelectedPrice] = useState([0, 1000]);
    const [cartBooks, setCartBooks] = useState(() => {
        const savedCart = localStorage.getItem("cartBooks");
        return savedCart ? JSON.parse(savedCart) : [];
    });

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

    useEffect(() => {
        localStorage.setItem("cartBooks", JSON.stringify(cartBooks));
        cart(cartBooks);
    }, [cartBooks, cart]);

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
                <div className="range-slider h-44 mx-0 p-4 flex flex-col items-center justify-around">
                    <h1 className="text-center font-bold text-lg text-[#393280]">Select Year</h1>
                    <input
                        type="range"
                        min="1320"
                        max="2024"
                        value={selectedYear}
                        id="yearRange"
                        onInput={handleYearChange}
                    />
                    <div className="range-labels flex justify-between w-full">
                        <span>1320</span>
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
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {filteredBooks.map((book) => (
                        <div key={book.id} className="flex flex-col items-center relative group">
                            <div className="flex flex-col items-center w-48 sm:w-52" onClick={() => window.location.href = `/books/${book.id}`}>
                                <div className="w-48 sm:w-52">
                                    <img className="w-full" src={book.cover_image} alt={book.title} />
                                </div>
                                <h1 className="text-center text-lg font-bold text-[#393280]">{book.title}</h1>
                                <div className="flex flex-row items-center">
                                    <p className="text-center font-bold ml-0 mr-2 text-primary">{book.price} $</p>
                                    <p className="text-center font-bold ml-0 text-secondary">{book.publication_year}</p>
                                </div>
                            </div>
                            <button
                                className="transition-all invisible group-hover:visible py-2 px-4 bg-[#393280] hover:bg-secondary rounded-md text-white w-7/12 sm:w-11/12 md:w-11/12 lg:w-11/12 xl:w-11/12 mt-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                                onClick={() => handleAddToCart(book)}
                            >
                                Add to Cart
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex items-center justify-center h-48">
                    <p className="text-center font-bold text-2xl text-red-500">
                        No books available for the selected genre, year, and price range.
                    </p>
                </div>
            )}
        </div>
    );
}

export default BooksBody;
