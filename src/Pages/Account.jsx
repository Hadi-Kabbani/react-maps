import React, { useState, useEffect } from 'react';
import SignUp from '../Components/signup';
import Login from '../Components/log';
import { useNavigate } from 'react-router-dom';

function Account() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [showLogin, setShowLogin] = useState(false);
    const [showSignUp, setShowSignUp] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const loginStatus = localStorage.getItem('isLoggedIn') === 'true';
        if (loginStatus) {
            setIsLoggedIn(true);
            const userData = JSON.parse(localStorage.getItem('user'));
            setUser(userData);
        }
    }, []);

    const handleLogout = () => {
        localStorage.setItem('isLoggedIn', false);
        localStorage.removeItem('user');
        setIsLoggedIn(false);
        setUser(null);
    };

    const toggleLogin = () => {
        setShowLogin(true);
        setShowSignUp(false);
    };

    const toggleSignUp = () => {
        setShowSignUp(true);
        setShowLogin(false);
    };

    const handleLoginSuccess = (userData) => {
        setIsLoggedIn(true);
        setUser(userData);
        localStorage.setItem('isLoggedIn', true);
        localStorage.setItem('user', JSON.stringify(userData));
        navigate('/'); // Navigate to home page
    };

    const returnToHomePage = () => {
        navigate('/');
    };

    return (
        <div className="min-h-screen  flex justify-center items-center">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold text-primary mb-4 text-center">Account</h1>
                {isLoggedIn ? (
                    <div>
                        <h2 className="text-lg font-semibold text-gray-700 mb-4 text-center">Welcome, {user.email}</h2>
                        <button
                            className="block w-full bg-primary text-white py-2 px-4 rounded-lg text-center mb-4"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                        <button
                            className="block w-full bg-gray-300 text-gray-700  py-2 px-4 rounded-lg text-center"
                            onClick={returnToHomePage}
                        >
                            Return to Home Page
                        </button>
                    </div>
                ) : (
                    <div className="mt-4">
                        {!showLogin && !showSignUp && (
                            <div className="flex justify-around mb-4">
                                <button
                                    className="text-primary border border-primary py-2 px-4 rounded-lg hover:bg-primary hover:text-white transition duration-300"
                                    onClick={toggleLogin}
                                >
                                    Login
                                </button>
                                <button
                                    className="text-primary border border-primary py-2 px-4 rounded-lg hover:bg-primary hover:text-white transition duration-300"
                                    onClick={toggleSignUp}
                                >
                                    Sign Up
                                </button>
                            </div>
                        )}
                        {showLogin && <Login onLoginSuccess={handleLoginSuccess} />}
                        {showSignUp && <SignUp />}
                        <button
                            className="block w-full bg-gray-300 hover:bg-slate-100 text-gray-700 py-2 px-4 rounded-lg text-center mt-4 transition-all"
                            onClick={returnToHomePage}
                        >
                            Return to Home Page
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Account;
