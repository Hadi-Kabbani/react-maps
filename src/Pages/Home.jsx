import NavBar from "../Components/navbar";
import TopBar from "../Components/topbar";
import HeaderMiddle from "../Components/headermiddle";
import Footer from "../Components/footer";
import Hero from "../Components/hero";
import NewReleases from "../Components/newreleased";
import Offers from "../Components/offers";
import AboutUs from "../Components/aboutus";
function Home() {

    const res = localStorage.getItem("cartBooks");
    const cartBooks = JSON.parse(res) || [];

    return (
        <div className="container mx-auto grid">
            <TopBar />
            <HeaderMiddle cartFromHome={cartBooks} />
            <NavBar />
            <Hero />
            <Offers />
            <NewReleases />
            <AboutUs />
            <Footer />

        </div>
    )
}
export default Home;