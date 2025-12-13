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
        <div className="min-h-screen">
            <Navbar />
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-6xl mx-auto">
                    <div className="mb-8">
                        <h1 className="text-4xl font-black text-gray-900 mb-2">Find Your Treats</h1>
                        <p className="text-gray-500 mb-6">Explore our exclusive collection of handmade sweets.</p>

                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search for sweets..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full p-4 pl-12 rounded-2xl border-none shadow-xl shadow-gray-200/50 focus:ring-4 focus:ring-pink-500/10 text-gray-700 text-lg placeholder-gray-400 outline-none"
                            />
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl">🔍</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {filteredSweets.map(sweet => (
                            <SweetCard key={sweet.id} sweet={sweet} onUpdate={fetchSweets} />
                        ))}
                    </div>

                    {filteredSweets.length === 0 && (
                        <div className="text-center py-20">
                            <p className="text-6xl mb-4">🍪</p>
                            <p className="text-gray-500 text-lg">No sweets found matching your search.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
