import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useForm from '../hooks/useForm';
import { IoEye, IoEyeOff } from 'react-icons/io5'; // Import eye icons for password visibility

const Login = ({ onLoginSuccess }) => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false); // State for password visibility

    const handleLogin = async (userData) => {
        try {
            const response = await fetch('http://localhost:8000/users'); // Replace with your JSON Server URL
            const data = await response.json();
            const user = data.find((user) => user.email === userData.email && user.password === userData.password);
            if (user) {
                onLoginSuccess(user);
                navigate('/');
            } else {
                alert('Invalid email or password');
            }
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    const { values, errors, handleChange, handleSubmit } = useForm(
        { email: '', password: '' },
        handleLogin
    );

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword); // Toggle password visibility
    };

    const handleForgotPassword = () => {
        // Implement your logic for handling forgot password
        alert('Forgot password functionality to be implemented.');
    };

    const handleRememberMe = (e) => {
        if (e.target.checked) {
            // Store user login state in local storage if "Remember me" is checked
            localStorage.setItem('rememberMe', true);
        } else {
            // Remove user login state from local storage if "Remember me" is unchecked
            localStorage.removeItem('rememberMe');
        }
    };

    // Check local storage for "Remember me" state on component mount
    React.useEffect(() => {
        const rememberMe = localStorage.getItem('rememberMe') === 'true';
        if (rememberMe) {
            // Implement your logic to automatically log in the user if "Remember me" is checked
            console.log('User remembered, logging in...');
        }
    }, []);

    return (
        <div className="flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full">
                <div>
                    <h2 className="text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
                </div>
                <form className="py-8" onSubmit={handleSubmit}>
                    <input type="hidden" name="remember" value="true" />
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="email-address" className="sr-only">
                                Email address
                            </label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'
                                    } placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm`}
                                placeholder="Email address"
                                value={values.email}
                                onChange={handleChange}
                            />
                            {errors.email && <p className="mt-2 text-sm text-red-500">{errors.email}</p>}
                        </div>
                        <div className="relative">
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                autoComplete="current-password"
                                required
                                className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'
                                    } placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm`}
                                placeholder="Password"
                                value={values.password}
                                onChange={handleChange}
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 px-3 py-2"
                                onClick={handleTogglePasswordVisibility}
                            >
                                {showPassword ? <IoEyeOff /> : <IoEye />}
                            </button>
                            {errors.password && <p className="mt-2 text-sm text-red-500">{errors.password}</p>}
                        </div>
                    </div>

                    <div className="flex items-center justify-between py-4">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                                onChange={handleRememberMe}
                            />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                Remember me
                            </label>
                        </div>

                        <div className="text-sm">
                            <button
                                type="button"
                                onClick={handleForgotPassword}
                                className="font-medium text-primary hover:text-secondary focus:outline-none"
                            >
                                Forgot your password?
                            </button>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                        >
                            Sign in
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
