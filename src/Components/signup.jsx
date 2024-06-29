import React, { useState } from 'react';
import { HiEye, HiEyeOff } from 'react-icons/hi'; // Import icons

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isExistingEmail, setIsExistingEmail] = useState(false);
    const [isInvalidPassword, setIsInvalidPassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false); // State for password visibility

    const handleSignUp = async (e) => {
        e.preventDefault();

        // Basic validation checks
        if (!validateEmail(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        if (!validatePassword(password)) {
            setIsInvalidPassword(true);
            return;
        }

        try {
            const response = await fetch('http://localhost:8000/users');
            const data = await response.json();
            const existingUser = data.find((user) => user.email === email);

            if (existingUser) {
                setIsExistingEmail(true);
                return;
            }

            const signUpResponse = await fetch('http://localhost:8000/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (signUpResponse.ok) {
                alert('Account created successfully');
                window.location.href = '/account'; // Redirect to account page after successful signup
            } else {
                alert('Failed to create account');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setIsExistingEmail(false); // Reset existing email state when email changes
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setIsInvalidPassword(false); // Reset invalid password state when password changes
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword); // Toggle the state of showPassword
    };

    const validateEmail = (email) => {
        // Basic email validation using regex
        const re =
            // eslint-disable-next-line no-useless-escape
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(String(email).toLowerCase());
    };

    const validatePassword = (password) => {
        // Password rules: at least 8 characters, one uppercase, one lowercase, one number, one special character
        const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
        return re.test(password);
    };

    return (
        <div className="flex items-center justify-center bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full">
                <form onSubmit={handleSignUp} className="space-y-3">
                    <input
                        type="email"
                        value={email}
                        onChange={handleEmailChange}
                        placeholder="Email"
                        required
                        className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${isExistingEmail ? 'border-red-500' : 'border-gray-300'
                            } placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm`}
                    />
                    {isExistingEmail && (
                        <p className="mt-2 text-sm text-red-500">Email already exists. Please use a different email.</p>
                    )}
                    <div className="relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={handlePasswordChange}
                            placeholder="Password"
                            required
                            className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${isInvalidPassword ? 'border-red-500' : 'border-gray-300'
                                } placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm`}
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 px-3 py-2"
                            onClick={togglePasswordVisibility}
                        >
                            {showPassword ? <HiEyeOff /> : <HiEye />}
                        </button>
                    </div>
                    {isInvalidPassword && (
                        <p className="mt-2 text-sm text-red-500">Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.</p>
                    )}
                    <button
                        type="submit"
                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    >
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
