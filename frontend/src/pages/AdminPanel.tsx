import React, { useState } from 'react';
import api from '../api';
import Navbar from '../components/Navbar';

const AdminPanel = () => {
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        price: '',
        quantity: ''
    });
    const [message, setMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.post('/sweets', formData);
            setMessage('Sweet added successfully!');
            setFormData({ name: '', category: '', price: '', quantity: '' });
        } catch (error: any) {
            setMessage('Failed to add sweet: ' + (error.response?.data?.error || error.message));
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="container mx-auto p-4 max-w-lg">
                <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Admin Panel</h1>

                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Add New Sweet</h2>
                    {message && <p className={`mb-4 text-center ${message.includes('success') ? 'text-green-500' : 'text-red-500'}`}>{message}</p>}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Name</label>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full p-2 border rounded focus:ring-2 focus:ring-pink-400 focus:outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Category</label>
                            <input type="text" name="category" value={formData.category} onChange={handleChange} required className="w-full p-2 border rounded focus:ring-2 focus:ring-pink-400 focus:outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Price</label>
                            <input type="number" name="price" value={formData.price} onChange={handleChange} required className="w-full p-2 border rounded focus:ring-2 focus:ring-pink-400 focus:outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Quantity</label>
                            <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} required className="w-full p-2 border rounded focus:ring-2 focus:ring-pink-400 focus:outline-none" />
                        </div>
                        <button type="submit" className="w-full bg-pink-600 text-white py-2 rounded hover:bg-pink-700">Add Sweet</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;
