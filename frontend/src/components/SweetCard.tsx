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
        <div className="bg-white p-4 rounded-lg shadow-md border hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-bold text-gray-800">{sweet.name}</h3>
            <p className="text-gray-500 text-sm">{sweet.category}</p>
            <div className="mt-2 flex justify-between items-center">
                <span className="text-lg font-semibold text-pink-600">${sweet.price}</span>
                <span className={`text-sm ${sweet.quantity > 0 ? 'text-green-600' : 'text-red-500'}`}>
                    {sweet.quantity > 0 ? `${sweet.quantity} in stock` : 'Out of stock'}
                </span>
            </div>
            <button
                onClick={handlePurchase}
                disabled={sweet.quantity === 0}
                className={`mt-4 w-full py-2 rounded ${sweet.quantity > 0
                        ? 'bg-pink-500 hover:bg-pink-600 text-white'
                        : 'bg-gray-300 cursor-not-allowed text-gray-500'
                    }`}
            >
                {sweet.quantity > 0 ? 'Buy Now' : 'Sold Out'}
            </button>
        </div>
    );
};

export default SweetCard;
