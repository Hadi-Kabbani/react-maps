import React, { useState, useEffect } from 'react';
import TopBar from '../Components/topbar';
import HeaderMiddle from '../Components/headermiddle';
import AboutMiddle from '../Components/aboutmiddle';
import AboutBody from '../Components/aboutbody';
import Footer from '../Components/footer';
function About() {
    const [cart, setCart] = useState([]);
    function updateCart(cartBooks) {
        setCart(cartBooks);
    }
    return (
        <div className='container mx-auto'>
            <TopBar />
            <HeaderMiddle cartFromAbout={cart} />
            <AboutMiddle />
            <AboutBody cartHandler={updateCart} />
            <Footer />
        </div >
    )
}

export default About;