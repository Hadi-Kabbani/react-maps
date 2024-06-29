import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiCreditCard, HiCash, HiChevronLeft } from 'react-icons/hi'; // Import icons

const CheckOut = () => {
    const navigate = useNavigate(); // Initialize navigate hook
    const [selectedPayment, setSelectedPayment] = useState(null);
    const cartBooks = JSON.parse(localStorage.getItem('cartBooks')) || [];
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        const savedIsLoggedIn = localStorage.getItem('isLoggedIn');
        return savedIsLoggedIn === 'true';
    });

    const handlePaymentSelection = (paymentMethod) => {
        setSelectedPayment(paymentMethod);
    };
    console.log(isLoggedIn);


    const handleCheckout = () => {
        // Implement checkout logic based on selectedPayment and cartBooks
        // Example: alert('Checkout logic to be implemented');
        // For demonstration purposes, we will clear the cart items from localStorage
        localStorage.removeItem('cartBooks');
        alert('Checkout successful!'); // Replace with actual checkout logic
        navigate('/'); // Navigate back to home or any desired page after checkout
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            {isLoggedIn ? (
                <div>
                    <div className="flex items-center justify-between px-4 py-2 bg-white shadow-md">
                        <button
                            onClick={() => navigate('/books')}
                            className="flex items-center text-gray-700 hover:text-gray-900 focus:outline-none"
                        >
                            <HiChevronLeft className="text-xl" />
                            <span className="ml-1">Back to Store</span>
                        </button>
                        <h1 className="text-2xl font-bold">Checkout</h1>
                        <div className="w-8"></div>
                    </div>

                    <div className="flex-1 flex items-center justify-center">
                        <div className="w-full max-w-xl px-4 py-8 bg-white shadow-lg rounded-lg">
                            <div className="mb-8">
                                <h2 className="text-xl font-bold mb-4">Payment Options</h2>
                                <div className="flex items-center mb-4">
                                    <button
                                        onClick={() => handlePaymentSelection('credit')}
                                        className={`flex items-center p-3 border border-transparent rounded-lg mr-4 focus:outline-none ${selectedPayment === 'credit'
                                            ? 'bg-primary text-white border-primary'
                                            : 'hover:bg-gray-200'
                                            }`}
                                    >
                                        <HiCreditCard className="text-xl mr-2" />
                                        <span>Credit Card</span>
                                    </button>
                                    <button
                                        onClick={() => handlePaymentSelection('cash')}
                                        className={`flex items-center p-3 border border-transparent rounded-lg mr-4 focus:outline-none ${selectedPayment === 'cash'
                                            ? 'bg-primary text-white border-primary'
                                            : 'hover:bg-gray-200'
                                            }`}
                                    >
                                        <HiCash className="text-xl mr-2" />
                                        <span>Cash on Delivery</span>
                                    </button>
                                </div>
                            </div>

                            <div>
                                <h2 className="text-xl font-bold mb-4">Cart Items</h2>
                                <ul className="divide-y divide-gray-200">
                                    {cartBooks.map((book, index) => (
                                        <li key={index} className="flex items-center py-2">
                                            <img
                                                src={book.cover_image}
                                                alt={book.title}
                                                className="w-16 h-16 object-cover rounded-lg mr-4"
                                            />
                                            <div className="flex-1">
                                                <h3 className="text-lg font-semibold">{book.title}</h3>
                                                <p className="text-sm text-gray-600">{book.author}</p>
                                                <p className="text-sm text-gray-600">{book.price}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="mt-8 flex justify-end">
                                <button
                                    onClick={handleCheckout}
                                    className="px-4 py-2 bg-primary text-white rounded-md hover:bg-secondary focus:outline-none"
                                >
                                    Place Order
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="min-h-screen flex items-center justify-center">
                    <div className="bg-white p-8 shadow-lg rounded-lg">
                        <h2 className="text-2xl font-bold mb-4">Please Log In</h2>
                        <p className="text-gray-600 mb-4">You need to log in to proceed to checkout.</p>
                        <button
                            onClick={() => navigate('/account')}
                            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-secondary focus:outline-none"
                        >
                            Log In
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CheckOut;
