import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar as BsNavbar, Nav, Container, Button } from 'react-bootstrap';

const Navbar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <BsNavbar bg="white" expand="lg" className="shadow-sm sticky-top py-3">
            <Container>
                <BsNavbar.Brand as={Link} to="/" className="fw-bold fs-3 text-primary">
                    🍬 Sweet Shop
                </BsNavbar.Brand>
                <BsNavbar.Toggle aria-controls="basic-navbar-nav" />
                <BsNavbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Nav>
                        {token ? (
                            <>
                                <Nav.Link as={Link} to="/" className="me-3 fw-medium text-dark">Sweets</Nav.Link>
                                <Button variant="outline-danger" onClick={handleLogout} className="rounded-pill px-4">Logout</Button>
                            </>
                        ) : (
                            <>
                                <Nav.Link as={Link} to="/login" className="me-3 fw-medium text-dark">Login</Nav.Link>
                                <Button as={Link} to="/register" variant="primary" className="rounded-pill px-4" style={{ background: 'linear-gradient(45deg, #0d6efd, #0dcaf0)', border: 'none' }}>
                                    Register
                                </Button>
                            </>
                        )}
                    </Nav>
                </BsNavbar.Collapse>
            </Container>
        </BsNavbar>
    );
};

export default Navbar;
