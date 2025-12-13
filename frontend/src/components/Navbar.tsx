import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link to="/" className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-purple-600 hover:opacity-80 transition-opacity">
                    🍬 Sweet Shop
                </Link>
                <div className="flex items-center gap-6">
                    {token ? (
                        <>
                            <Link to="/" className="text-gray-600 font-medium hover:text-pink-600 transition-colors">Sweets</Link>
                            <button
                                onClick={handleLogout}
                                className="px-5 py-2 rounded-full bg-red-50 text-red-600 font-semibold hover:bg-red-100 transition-colors"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="text-gray-600 font-medium hover:text-pink-600 transition-colors">Login</Link>
                            <Link
                                to="/register"
                                className="px-5 py-2 rounded-full bg-gray-900 text-white font-semibold hover:bg-gray-800 transition-colors shadow-lg shadow-gray-900/20"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
