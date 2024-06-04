import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import NotFound from './NotFound.jsx';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Dashboard from './Dashboard.jsx';
import Signup from './Component/SignUp.jsx';
import SignIn from './Component/SignIn.jsx';

export default function Routing() {
    return (
        <>
            <Navbar bg="primary" data-bs-theme="dark" className='navbar'>
                <Container>
                    <Navbar.Brand href="/">Hospital Management</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link>
                            <Link to="/">Dashboard</Link> &nbsp;
                            <Link to="/signin">Login</Link> &nbsp;
                            <Link to="/signup">SignUp</Link> &nbsp;
                        </Nav.Link>
                    </Nav>
                </Container>
            </Navbar>

            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<Signup />} />
                <Route path='*' element={<NotFound />} />
            </Routes>
        </>
    );
}
