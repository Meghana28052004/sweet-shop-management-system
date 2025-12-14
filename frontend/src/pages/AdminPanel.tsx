import React, { useState, useEffect } from 'react';
import api from '../api';
import Navbar from '../components/Navbar';
import { Container, Card, Form, Button, Alert, ListGroup, Badge } from 'react-bootstrap';

interface User {
    id: number;
    email: string;
    role: string;
}

const AdminPanel = () => {
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        price: '',
        quantity: ''
    });
    const [message, setMessage] = useState('');
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await api.get('/users');
            setUsers(res.data);
        } catch (error) {
            console.error('Failed to fetch users', error);
        }
    };

    const handleDeleteUser = async (id: number) => {
        if (!window.confirm('Are you sure you want to delete this user?')) return;
        try {
            await api.delete(`/users/${id}`);
            fetchUsers();
            alert('User deleted successfully');
        } catch (error) {
            alert('Failed to delete user');
        }
    };

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
            <Container className="py-5">
                <div className="d-flex flex-wrap justify-content-center gap-5">
                    {/* Add Sweet Form */}
                    <Card className="shadow-lg border-0" style={{ maxWidth: '500px', width: '100%', height: 'fit-content' }}>
                        <Card.Body className="p-4">
                            <h2 className="text-center fw-bold mb-4 text-primary">Add New Sweet</h2>
                            {message && (
                                <Alert variant={message.includes('success') ? 'success' : 'danger'}>
                                    {message}
                                </Alert>
                            )}
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Category</Form.Label>
                                    <Form.Control type="text" name="category" value={formData.category} onChange={handleChange} required />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Price</Form.Label>
                                    <Form.Control type="number" name="price" value={formData.price} onChange={handleChange} required />
                                </Form.Group>
                                <Form.Group className="mb-4">
                                    <Form.Label>Quantity</Form.Label>
                                    <Form.Control type="number" name="quantity" value={formData.quantity} onChange={handleChange} required />
                                </Form.Group>
                                <Button type="submit" variant="primary" className="w-100 py-2 fw-bold" style={{ background: 'linear-gradient(45deg, #0d6efd, #0dcaf0)', border: 'none' }}>
                                    Add Sweet
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>

                    {/* User Management */}
                    <Card className="shadow-lg border-0" style={{ maxWidth: '500px', width: '100%' }}>
                        <Card.Body className="p-4">
                            <h2 className="text-center fw-bold mb-4 text-danger">Manage Users</h2>
                            <ListGroup variant="flush">
                                {users.map(user => (
                                    <ListGroup.Item key={user.id} className="d-flex justify-content-between align-items-center">
                                        <div>
                                            <div className="fw-bold">{user.email}</div>
                                            <Badge bg={user.role === 'admin' ? 'warning' : 'info'}>{user.role}</Badge>
                                        </div>
                                        {user.role !== 'admin' && (
                                            <Button variant="outline-danger" size="sm" onClick={() => handleDeleteUser(user.id)}>
                                                Delete
                                            </Button>
                                        )}
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </div>
            </Container>
        </div>
    );
};

export default AdminPanel;
