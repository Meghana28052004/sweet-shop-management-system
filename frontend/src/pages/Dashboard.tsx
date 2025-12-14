import React, { useEffect, useState } from 'react';
import api from '../api';
import SweetCard from '../components/SweetCard';
import Navbar from '../components/Navbar';
import { Container, Row, Col, Form, InputGroup } from 'react-bootstrap';

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
        <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)' }}>
            <Navbar />
            <Container className="py-5">
                <div className="text-center mb-5">
                    <h1 className="display-4 fw-bold text-white mb-3" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.1)' }}>Find Your Treats</h1>
                    <p className="lead text-white opacity-75 mb-5">Explore our exclusive collection of handmade sweets.</p>

                    <Row className="justify-content-center">
                        <Col md={6}>
                            <InputGroup className="mb-3 shadow-lg rounded-pill overflow-hidden border-0">
                                <InputGroup.Text className="bg-white border-0 ps-4">🔍</InputGroup.Text>
                                <Form.Control
                                    placeholder="Search sweets..."
                                    aria-label="Search sweets"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="py-3 border-0 shadow-none ps-2"
                                />
                            </InputGroup>
                        </Col>
                    </Row>
                </div>

                <Row xs={1} md={2} lg={4} className="g-4">
                    {filteredSweets.map(sweet => (
                        <Col key={sweet.id}>
                            <SweetCard sweet={sweet} onUpdate={fetchSweets} />
                        </Col>
                    ))}
                </Row>

                {filteredSweets.length === 0 && (
                    <div className="text-center py-5">
                        <p style={{ fontSize: '4rem' }}>🍪</p>
                        <p className="text-white fs-5">No sweets found matching your search.</p>
                    </div>
                )}
            </Container>
        </div>
    );
};

export default Dashboard;
