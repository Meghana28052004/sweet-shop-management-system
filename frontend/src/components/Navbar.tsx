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
        <nav className="bg-white shadow-md p-4 flex justify-between items-center">
            <Link to="/" className="text-xl font-bold text-pink-500">Sweet Shop</Link>
            <div>
                {token ? (
                    <>
                        <Link to="/" className="mr-4 text-gray-600 hover:text-pink-500">Sweets</Link>
                        <button onClick={handleLogout} className="text-red-500 hover:text-red-700">Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="mr-4 text-gray-600 hover:text-pink-500">Login</Link>
                        <Link to="/register" className="text-pink-500 hover:text-pink-700">Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
