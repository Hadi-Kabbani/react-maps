
import React from 'react';
import { Link } from 'react-router-dom';
function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-9xl font-bold text-primary">404</h1>
            <h2 className="text-3xl font-semibold text-secondary mt-4">Page Not Found</h2>
            <p className="text-paragraph mt-2 text-lg">
                Sorry, the page you are looking for does not exist. You can always go back to the
                <Link href="/" className="text-gold hover:text-primary ml-1 text-center">home</Link>.
            </p>
        </div>
    );
}

export default NotFound;
