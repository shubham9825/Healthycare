import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import NotFound from './NotFound.jsx';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Dashboard from './Dashboard.jsx';

export default function Routing() {
    return (
        <>
            {/* Navbar */}
            <Navbar bg="primary" data-bs-theme="dark" className='navbar'>
                <Container>
                    <Navbar.Brand href="#home">Hospital Management</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link>
                            <Link to="/appointment">Appointment</Link>
                        </Nav.Link>
                    </Nav>
                </Container>
            </Navbar>

            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path='*' element={<NotFound />} />
            </Routes>
        </>
    );
}
