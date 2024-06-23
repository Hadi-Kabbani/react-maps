import React from "react";
import { useState } from "react";
import TopBar from "../Components/topbar";
import CartBody from "../Components/cartbody";
import CartMiddle from "../Components/cartmiddle";
import HeaderMiddle from "../Components/headermiddle";
import Footer from "../Components/footer";
function Cart() {
    const [cart, setCart] = useState([]);
    function cartHandler(books) {
        setCart([...books]);
    }
    return (
        <div className="Cart container mx-auto">
            <TopBar />
            <HeaderMiddle cartFromCart={cart} />
            <CartMiddle />
            <CartBody cartHandler={cartHandler} />
            <Footer />
        </div >
    );
}

export default Cart;