import React, { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Card, Container, Alert } from 'react-bootstrap';

interface AuthFormProps {
    type: 'login' | 'register';
}

const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const endpoint = type === 'login' ? '/auth/login' : '/auth/register';
            const res = await api.post(endpoint, { email, password });

            if (type === 'login') {
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('role', res.data.role); // Store role
                localStorage.setItem('email', res.data.email); // Store email
                navigate('/');
            } else {
                navigate('/login');
            }
        } catch (err: any) {
            setError(err.response?.data?.error || 'An error occurred');
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center bg-white" style={{ minHeight: '80vh', backgroundColor: 'transparent' }}>
            <Card className="shadow-lg border-0" style={{ width: '400px', backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
                <Card.Body className="p-5">
                    <h2 className="text-center mb-4 text-primary fw-bold text-capitalize">{type}</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="rounded-3"
                            />
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="rounded-3"
                            />
                        </Form.Group>

                        <Button
                            variant="primary"
                            type="submit"
                            className="w-100 py-2 rounded-3 fw-bold"
                            style={{ background: 'linear-gradient(45deg, #0d6efd, #0dcaf0)', border: 'none' }}
                        >
                            {type === 'login' ? 'Login' : 'Register'}
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default AuthForm;
