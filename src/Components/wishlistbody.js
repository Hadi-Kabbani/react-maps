import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function WishListBody({ cart, removeFromCart, getWishListNumber }) {
    const navigate = useNavigate();
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const [wishList, setWishList] = useState(storedWishlist);
    const [localWishlist, setLocalWishlist] = useState(storedWishlist);

    useEffect(() => {
        setLocalWishlist(storedWishlist.map(item => ({ ...item, isLiked: true })));
    }, []);

    useEffect(() => {
        const uniqueWishlist = localWishlist.filter((item, index, self) =>
            index === self.findIndex(t => t.id === item.id && item.isLiked)
        );
        setWishList(uniqueWishlist);
        localStorage.setItem("wishlist", JSON.stringify(uniqueWishlist));
        getWishListNumber(uniqueWishlist.length);
    }, [localWishlist, getWishListNumber]);

    const imageHandler = (id) => {
        navigate(`/books/${id}`);
    };

    const handleLikeClick = (id) => {
        setLocalWishlist((prevList) => {
            const updatedList = prevList.map((item) =>
                item.id === id ? { ...item, isLiked: !item.isLiked } : item
            );
            return updatedList;
        });
    };

    return (
        <div className="w-full py-5">
            {localWishlist.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 min-h-56">
                    <h1 className="text-primary font-bold text-2xl text-center p-4">Your Selected Books</h1>
                    {localWishlist.map((item) => (
                        <div className="flex flex-row items-center justify-around bg-gray-100 px-2 min-h-27 max-h-32" key={item.id}>
                            <div className="h-24 w-24 min-h-14 min-w-14 rounded-full overflow-hidden items-center justify-center">
                                <img
                                    className="cursor-pointer w-full h-full"
                                    src={item.cover_image}
                                    alt={item.title}
                                    onClick={() => imageHandler(item.id)}
                                />
                            </div>
                            <p className="font-bold text-primary w-1/6 text-center p-2 h-full flex items-center justify-around">{item.title}</p>
                            <p className="font-bold w-1/6 text-center p-2 h-full flex items-center justify-around">{item.author}</p>
                            <p className="font-bold text-secondary w-1/6 text-center p-2">{item.publication_year}</p>
                            <button className="underline underline-offset-4 mx-2 text-primary hover:text-secondary font-bold"
                                onClick={() => imageHandler(item.id)}
                            >
                                view details
                            </button>
                            <div className='flex items-center justify-center rounded-full p-1' onClick={() => handleLikeClick(item.id)} style={{ width: '32px' }}>
                                <svg className='stroke-2' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={item.isLiked ? "red" : "none"} stroke={item.isLiked ? "red" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M12 4.53c2.35-2.11 5.98-2.06 8.25.23C22.5 7.77 22.58 11.38 20.48 13.73L12 21.48 3.52 13.73C1.42 11.38 1.5 7.77 3.75 4.76c2.26-2.18 5.9-2.21 8.25-.23zm6.83 1.64c-1.5-1.5-3.92-1.5-5.42 0l-1.34 1.34-1.35-1.35c-1.5-1.5-3.92-1.5-5.42 0-1.5 1.5-1.5 3.92 0 5.42L12 18.65l6.01-6.01c1.5-1.5 1.5-3.92 0-5.42z"></path>
                                </svg>
                            </div>
                        </div>
                    ))}
                    <div className="flex flex-row items-center justify-around bg-gray-100 px-2 min-h-24 max-h-32">
                        <p className="text-primary font-bold text-2xl">Your Wish List</p>
                        <p className="text-primary font-bold text-2xl flex flex-col items-center ">Total items<span className="text-secondary font-bold text-2xl">  {localWishlist.length}</span></p>
                    </div>
                </div>
            ) : (
                <div className="w-full sm:min-h-64 md: lg:min-h-80 flex flex-col items-center justify-center my-5">
                    <p className="text-center text-4xl font-bold text-red-600 px-8 py-4 ">
                        Your Wish List is Empty
                    </p>
                    <p className="text-center text-lg text-gray-600 mt-4">
                        Start adding books to your wish list and explore our collection!
                    </p>
                </div>
            )}
        </div>
    );
}

export default WishListBody;
