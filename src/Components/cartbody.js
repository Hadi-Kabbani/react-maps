import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function CartBody({ cartHandler }) {
    const navigate = useNavigate();
    const str = localStorage.getItem("cartBooks");
    const [cart, setCart] = useState(JSON.parse(str) || []);

    useEffect(() => {
        cartHandler(cart);
        localStorage.setItem("cartBooks", JSON.stringify(cart));
    }, [cart]);

    function imageHandler(id) {
        console.log("image clicked");
        navigate(`/books/${id}`);
    }

    return (
        <div className="w-full py-5">
            {cart.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 min-h-56">
                    <h1 className="text-primary font-bold text-2xl text-center p-4">Your Selected Books</h1>
                    {cart.map((item) => (
                        <div className="flex flex-row items-center justify-around bg-gray-100 px-2 min-h-27 max-h-32" key={item.id}>
                            <div className="h-24 w-24 min-h-14 min-w-14  rounded-full overflow-hidden items-center justify-center">
                                <img
                                    className="cursor-pointer w-full h-full"
                                    src={item.cover_image}
                                    alt={item.title}
                                    onClick={() => imageHandler(item.id)}
                                />
                            </div>
                            <p className="font-bold text-primary w-1/6 text-center p-2 h-full flex items-center justify-around">{item.title}</p>
                            <p className="font-bold w-1/6 text-center p-2 h-full flex items-center justify-around">{item.author}</p>
                            <p className="font-bold text-secondary w-1/6 text-center p-2">{item.price.toFixed(2)} $</p>
                            <button className="underline underline-offset-4 mx-2 text-primary hover:text-secondary font-bold"
                                onClick={() => imageHandler(item.id)}
                            >
                                view details
                            </button>
                            <button
                                className="w-1/6 bg-primary hover:bg-secondary rounded-2xl text-white h-12"
                                onClick={() => setCart(cart.filter((i) => i.id !== item.id))}
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    <div className="flex flex-row items-center justify-around bg-gray-100 px-2 min-h-24 max-h-32">
                        <p className="text-primary font-bold text-2xl">Your Cart</p>
                        <p className="text-primary font-bold text-2xl flex flex-col items-center ">Total items<span className="text-secondary font-bold text-2xl">  {cart.length}</span></p>
                        <p className="text-primary font-bold text-2xl flex flex-col items-center">Total Amount<span className="text-secondary font-bold text-2xl"> {cart.reduce((acc, item) => acc + item.price, 0).toFixed(2)} $</span></p>
                    </div>
                    <div className="flex flex-row items-center justify-around px-2 min-h-24 max-h-32">
                        <button className="bg-primary hover:bg-secondary rounded-2xl text-white h-12 min-w-32 max-w-4/12" onClick={() => navigate("/checkout")}>Checkout</button>
                    </div>
                </div>
            ) : (
                <div className="w-full sm:min-h-64 md: lg:min-h-80 flex flex-col items-center justify-center my-5">
                    <p className="text-center text-4xl font-bold text-red-600 px-8 py-4">
                        Your cart is empty
                    </p>
                    <p className="text-center text-lg text-gray-600 mt-4">
                        Start adding books to your cart and explore our collection!
                    </p>
                </div>
            )}
        </div>
    );
}

export default CartBody;
