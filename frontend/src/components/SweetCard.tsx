import React, { useState } from 'react';
import api from '../api';
import { Card, Button, Badge, Form, InputGroup } from 'react-bootstrap';

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
    const [restockQty, setRestockQty] = useState('');
    const role = localStorage.getItem('role');

    const handlePurchase = async () => {
        try {
            await api.post(`/sweets/${sweet.id}/purchase`);
            alert('Purchased successfully!');
            onUpdate();
        } catch (error: any) {
            alert(error.response?.data?.error || 'Purchase failed');
        }
    };

    const handleRestock = async () => {
        try {
            await api.post(`/sweets/${sweet.id}/restock`, { quantity: parseInt(restockQty) });
            alert('Restocked successfully!');
            setRestockQty('');
            onUpdate();
        } catch (error: any) {
            alert(error.response?.data?.error || 'Restock failed');
        }
    };

    return (
        <Card className="h-100 shadow-sm border-0 hover-shadow transition" style={{ transition: 'transform 0.2s' }}>
            <div className="bg-light p-4 text-center rounded-top" style={{ background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)' }}>
                <span style={{ fontSize: '4rem' }}>🍬</span>
            </div>
            <Card.Body className="d-flex flex-column">
                <div className="d-flex justify-content-between align-items-start mb-2">
                    <Card.Title className="fw-bold mb-0">{sweet.name}</Card.Title>
                    <Badge bg="info" pill className="text-uppercase">{sweet.category}</Badge>
                </div>

                <div className="mt-auto">
                    <div className="d-flex justify-content-between align-items-end mb-3">
                        <h4 className="text-primary mb-0 fw-bold">${sweet.price}</h4>
                        <div className={sweet.quantity > 0 ? 'text-success fw-bold small' : 'text-danger fw-bold small'}>
                            {sweet.quantity > 0 ? `${sweet.quantity} LEFT` : 'SOLD OUT'}
                        </div>
                    </div>

                    {role === 'admin' ? (
                        <InputGroup className="mb-3">
                            <Form.Control
                                placeholder="Qty"
                                type="number"
                                value={restockQty}
                                onChange={(e) => setRestockQty(e.target.value)}
                                className="text-center"
                            />
                            <Button variant="outline-primary" onClick={handleRestock}>Restock</Button>
                        </InputGroup>
                    ) : (
                        <Button
                            onClick={handlePurchase}
                            disabled={sweet.quantity === 0}
                            className="w-100 rounded-3 text-white fw-bold py-2"
                            style={{
                                background: sweet.quantity > 0 ? 'linear-gradient(45deg, #20c997, #0d6efd)' : '#6c757d',
                                border: 'none',
                                opacity: sweet.quantity > 0 ? 1 : 0.6
                            }}
                        >
                            {sweet.quantity > 0 ? 'Add to Cart' : 'Out of Stock'}
                        </Button>
                    )}
                </div>
            </Card.Body>
        </Card>
    );
};

export default SweetCard;
