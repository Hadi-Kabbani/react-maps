import React from 'react';
import { useState } from 'react';
import TopBar from '../Components/topbar';
import HeaderMiddle from '../Components/headermiddle';
import NewReleasedBody from '../Components/newreleasedbody';
import NewReleasedHeader from '../Components/newreleasedheader';
import Footer from '../Components/footer';
function NewReleased() {
    const [cart, setCart] = useState([]);

    function updateCart(cartBooks) {
        setCart(cartBooks);
    }

    return (
        <div className="container mx-auto">
            <TopBar />
            <HeaderMiddle cartFromNewReleased={cart} />
            <NewReleasedHeader />
            <NewReleasedBody handleCart={updateCart} />
            <Footer />
        </div>
    );
}

export default NewReleased;