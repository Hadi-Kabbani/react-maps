import React from 'react';
import TopBar from '../Components/topbar';
import HeaderMiddle from '../Components/headermiddle';
import AboutMiddle from '../Components/aboutmiddle';
import Footer from '../Components/footer';
function About() {

    return (
        <div className='container mx-auto'>
            <TopBar />
            <HeaderMiddle />
            <AboutMiddle />
            <Footer />
        </div >
    )
}

export default About;