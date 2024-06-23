import { useState, useEffect } from "react";
import TopBar from "../Components/topbar";
import Footer from "../Components/footer";
import HeaderMiddle from "../Components/headermiddle";
import WishListBody from "../Components/wishlistbody";
import WishListMiddle from "../Components/wishlistmiddle";
function WishList() {
    const str = localStorage.getItem("cartBooks");
    const [cart, setCart] = useState(JSON.parse(str) || []);
    const [countWishList, setCountWishList] = useState(0);

    useEffect(() => {
        localStorage.setItem("cartBooks", JSON.stringify(cart));
    }, [cart]);

    useEffect(() => {
        setCart(JSON.parse(localStorage.getItem("cartBooks")) || []);
    }, []);

    function getWishListNumber(total) {
        setCountWishList(total);
        localStorage.setItem("total", countWishList);
    }

    return (
        <div className="container mx-auto">
            <TopBar />
            <HeaderMiddle cartBooksFromWishList={cart} countWishList={countWishList} />
            <WishListMiddle />
            <WishListBody cart={cart} getWishListNumber={getWishListNumber} />
            <Footer />
        </div>
    );
}

export default WishList;