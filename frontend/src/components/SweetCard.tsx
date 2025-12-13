import React from 'react';
import api from '../api';

interface Sweet {
    id: number;
    name: string;
    category: string;
    price: number;
    quantity: number;
}

interface SweetCardProps {
    sweet: Sweet;
    onUpdate: () => void;
}

const SweetCard: React.FC<SweetCardProps> = ({ sweet, onUpdate }) => {
    const handlePurchase = async () => {
        try {
            await api.post(`/sweets/${sweet.id}/purchase`);
            alert('Purchased successfully!');
            onUpdate();
        } catch (error: any) {
            alert(error.response?.data?.error || 'Purchase failed');
        }
    };

    return (
        <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col h-full">
            <div className="h-32 bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center">
                <span className="text-4xl">🍬</span>
            </div>
            <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-gray-900 leading-tight">{sweet.name}</h3>
                    <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full uppercase tracking-wider font-semibold">
                        {sweet.category}
                    </span>
                </div>

                <div className="mt-auto pt-4">
                    <div className="flex justify-between items-end mb-4">
                        <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-rose-600">
                            ${sweet.price}
                        </span>
                        <span className={`text-xs font-semibold px-2 py-1 rounded-md ${sweet.quantity > 0
                                ? 'bg-green-100 text-green-700'
                                : 'bg-red-100 text-red-700'
                            }`}>
                            {sweet.quantity > 0 ? `${sweet.quantity} LEFT` : 'SOLD OUT'}
                        </span>
                    </div>

                    <button
                        onClick={handlePurchase}
                        disabled={sweet.quantity === 0}
                        className={`w-full py-3 rounded-xl font-bold text-sm transition-all transform active:scale-95 ${sweet.quantity > 0
                                ? 'bg-gray-900 text-white hover:bg-gray-800 shadow-lg shadow-gray-900/20'
                                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            }`}
                    >
                        {sweet.quantity > 0 ? 'Add to Cart' : 'Out of Stock'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SweetCard;
