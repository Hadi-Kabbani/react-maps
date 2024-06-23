import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function HeaderMiddle({ cartBooksFromWishList, cartFromCart, cartBooks, cartFromBooks, cartFromHome }) {
    const navigate = useNavigate();
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const str = localStorage.getItem("cartBooks");
        if (str) {
            try {
                const storedCart = JSON.parse(str);
                if (Array.isArray(storedCart)) {
                    setCart(storedCart);
                }
            } catch (e) {
                console.error("Error parsing cartBooks from localStorage", e);
            }
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("cartBooks", JSON.stringify(cart));
    }, [cart]);

    useEffect(() => {
        if (Array.isArray(cartBooks)) {
            setCart(cartBooks);
        }
    }, [cartBooks]);
    useEffect(() => {
        if (Array.isArray(cartFromHome)) {
            setCart(cartFromHome);
        }
    }, [cartFromHome]);

    useEffect(() => {
        if (Array.isArray(cartFromBooks)) {
            setCart(cartFromBooks);
        }
    }, [cartFromBooks]);

    useEffect(() => {
        if (Array.isArray(cartFromCart)) {
            setCart(cartFromCart);
        }
    }, [cartFromCart]);

    useEffect(() => {
        if (Array.isArray(cartBooksFromWishList)) {
            setCart(cartBooksFromWishList);
        }
    }, [cartBooksFromWishList]);

    const handleGoToCart = () => {
        navigate("/cart");
    };

    let price = 0;

    if (cart.length) {
        for (let i = 0; i < cart.length; i++) {
            price += cart[i].price;
        }
    }

    return (
        <div className="container flex items-center justify-between md:justify-around border-b-4 border-[#393280] py-4 px-4">
            <div className="w-4/12 md:w-1/5 flex items-center justify-center">
                <div className="flex justify-center items-center rounded-full overflow-hidden w-24">
                    <Link to="/"><img className="w-full logo " src="/images/logo.png" alt="logo" /></Link>
                </div>
            </div>
            <div className="w-4/12 relative">
                <input className="bg-slate-200 border-[#393280] outline-[#393280] focus:outline-[#393280] w-full p-2 rounded-xl" type="text" placeholder="Search" />
                <svg className="absolute top-2 right-3" xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z"></path>
                </svg>
            </div>
            <ul className="flex flex-col lg:flex-row items-center justify-center lg:justify-between lg:w-fit px-2">
                <li className="mb-2 lg:mr-4 text-sm md:text-lg">
                    <Link className="middle_header_icons" to="/login">
                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C17.52 2 22 6.48 22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2ZM6.02332 15.4163C7.49083 17.6069 9.69511 19 12.1597 19C14.6243 19 16.8286 17.6069 18.2961 15.4163C16.6885 13.9172 14.5312 13 12.1597 13C9.78821 13 7.63095 13.9172 6.02332 15.4163ZM12 11C13.6569 11 15 9.65685 15 8C15 6.34315 13.6569 5 12 5C10.3431 5 9 6.34315 9 8C9 9.65685 10.3431 11 12 11Z"></path>
                        </svg>
                        <span className="ml-2">Account</span>
                    </Link>
                </li>
                <li className="mb-2 lg:mr-4 text-sm md:text-lg">
                    <button className="middle_header_icons" onClick={handleGoToCart}>
                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="currentColor">
                            <path d="M4.00488 16V4H2.00488V2H5.00488C5.55717 2 6.00488 2.44772 6.00488 3V15H18.4433L20.4433 7H8.00488V5H21.7241C22.2764 5 22.7241 5.44772 22.7241 6C22.7241 6.08176 22.7141 6.16322 22.6942 6.24254L20.1942 16.2425C20.083 16.6877 19.683 17 19.2241 17H5.00488C4.4526 17 4.00488 16.5523 4.00488 16ZM6.00488 23C4.90031 23 4.00488 22.1046 4.00488 21C4.00488 19.8954 4.90031 19 6.00488 19C7.10945 19 8.00488 19.8954 8.00488 21C8.00488 22.1046 7.10945 23 6.00488 23ZM18.0049 23C16.9003 23 16.0049 22.1046 16.0049 21C16.0049 19.8954 16.9003 19 18.0049 19C19.1095 19 20.0049 19.8954 20.0049 21C20.0049 22.1046 19.1095 23 18.0049 23Z"></path>
                        </svg>
                        <span className="ml-2">Cart
                            <span className={cart.length !== 0 ? "ml-2 text-secondary" : "ml-2"}>
                                ({cart.length !== 0 ? price.toFixed(2) : 0})$
                            </span>
                        </span>
                    </button>
                </li>
                <li className="mb-2 lg:mr-4 text-sm md:text-lg">
                    <Link className="middle_header_icons" to="/wishlist">
                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12.001 4.52853C14.35 2.42 17.98 2.49 20.2426 4.75736C22.5053 7.02472 22.583 10.637 20.4786 12.993L11.9999 21.485L3.52138 12.993C1.41705 10.637 1.49571 7.01901 3.75736 4.75736C6.02157 2.49315 9.64519 2.41687 12.001 4.52853Z"></path>
                        </svg>
                        <span className="ml-2">
                            WishList
                        </span>
                    </Link>
                </li>
            </ul>
        </div>
    );
}

export default HeaderMiddle;
