import { useEffect, useState } from "react";
import TopBar from "../Components/topbar";
import BooksMiddleHeader from "../Components/booksmiddleheader";
import HeaderMiddle from "../Components/headermiddle";
import BooksBody from "../Components/booksbody";
import Footer from "../Components/footer";

function Books() {
    const [cart, setCart] = useState([]);
    const updateCart = (cartBooks) => {
        setCart(cartBooks);
    };


    return (
        <div className="container mx-auto">
            <TopBar />
            <HeaderMiddle cartFromBooks={cart} />
            <BooksMiddleHeader />
            <BooksBody cart={updateCart} />
            <Footer />
        </div>
    );
}

export default Books;
