import TopBar from "../Components/topbar";
import BooksMiddleHeader from "../Components/booksmiddleheader";
import HeaderMiddle from "../Components/headermiddle";
import BooksBody from "../Components/booksbody";
import Footer from "../Components/footer";
import { useEffect, useState } from "react";

function Books() {
    const [cart, setCart] = useState([]);
    const [books, setBooks] = useState([]);

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

    const updateCart = (cartBooks) => {
        setCart(cartBooks);
    };

    return (
        <div className="container mx-auto">
            <TopBar />
            <HeaderMiddle cartFromBooks={cart} />
            <BooksMiddleHeader />
            <BooksBody books={books} cart={updateCart} />
            <Footer />
        </div>
    );
}

export default Books;
