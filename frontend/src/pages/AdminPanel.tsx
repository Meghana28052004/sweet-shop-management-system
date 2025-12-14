import React, { useState } from 'react';
import api from '../api';
import Navbar from '../components/Navbar';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';

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
        <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)' }}>
            <Navbar />
            <Container className="d-flex justify-content-center py-5">
                <Card className="shadow-lg border-0" style={{ maxWidth: '500px', width: '100%' }}>
                    <Card.Body className="p-4">
                        <h2 className="text-center fw-bold mb-4 text-primary">Admin Panel</h2>
                        <h5 className="text-center mb-4 text-secondary">Add New Sweet</h5>

                        {message && (
                            <Alert variant={message.includes('success') ? 'success' : 'danger'}>
                                {message}
                            </Alert>
                        )}

                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Category</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Price</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-4">
                                <Form.Label>Quantity</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="quantity"
                                    value={formData.quantity}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <Button type="submit" variant="primary" className="w-100 py-2 fw-bold" style={{ background: 'linear-gradient(45deg, #0d6efd, #0dcaf0)', border: 'none' }}>
                                Add Sweet
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
};

export default AdminPanel;
