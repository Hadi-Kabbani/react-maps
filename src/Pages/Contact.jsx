import React from "react";
import { useState, useEffect } from "react";
import TopBar from "../Components/topbar";
import Footer from "../Components/footer";
import ContactBody from "../Components/contactbody";
import HeaderMiddle from "../Components/headermiddle";
import ContactHeader from "../Components/contactheader";
function Contact() {
    const [cart, setCart] = useState([]);
    function updateCart(cartBooks) {
        setCart(cartBooks);
    }
    return (
        <div className="container mx-auto">
            <TopBar />
            <HeaderMiddle cartFromContact={cart} />
            <ContactHeader />
            <ContactBody cartHandler={updateCart} />
            <Footer />
        </div>
    );
}

export default Contact