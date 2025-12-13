import React, { useEffect, useState } from 'react';
import api from '../api';
import SweetCard from '../components/SweetCard';
import Navbar from '../components/Navbar';

interface Sweet {
    id: number;
    name: string;
    category: string;
    price: number;
    quantity: number;
}

const Dashboard = () => {
    const [sweets, setSweets] = useState<Sweet[]>([]);
    const [search, setSearch] = useState('');

    const fetchSweets = async () => {
        try {
            const res = await api.get('/sweets');
            setSweets(res.data);
        } catch (error) {
            console.error('Failed to fetch sweets');
        }
    };

    useEffect(() => {
        fetchSweets();
    }, []);

    const filteredSweets = sweets.filter(sweet =>
        sweet.name.toLowerCase().includes(search.toLowerCase()) ||
        sweet.category.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="container mx-auto p-4">
                <div className="mb-6">
                    <input
                        type="text"
                        placeholder="Search sweets by name or category..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full p-3 rounded-lg border shadow-sm focus:ring-2 focus:ring-pink-400 focus:outline-none"
                    />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredSweets.map(sweet => (
                        <SweetCard key={sweet.id} sweet={sweet} onUpdate={fetchSweets} />
                    ))}
                </div>
                {filteredSweets.length === 0 && (
                    <p className="text-center text-gray-500 mt-10">No sweets found.</p>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
