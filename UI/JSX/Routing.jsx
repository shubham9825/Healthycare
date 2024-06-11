import React, { Suspense, lazy } from 'react';
import { Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import NotFound from './Component/NotFound.jsx';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { showToast } from './utils/toastService.js';

const Dashboard = lazy(() => retry(() => import("./Component/Dashboard.jsx")))
const SignUp = lazy(() => retry(() => import("./Component/SignUp.jsx")))
const SignIn = lazy(() => retry(() => import("./Component/SignIn.jsx")))

const retry = (lazyComponent, attemptsLeft = 2) => {
    return new Promise((resolve, reject) => {
        lazyComponent()
            .then(resolve)
            .catch((error) => {
                setTimeout(() => {
                    if (attemptsLeft === 1) {
                        reject(error);
                        return;
                    }
                    retry(lazyComponent, attemptsLeft - 1).then(resolve, reject);
                }, 1000);
            });
    });
}

const routes = [
    {
        path: "/",
        component: Dashboard,
        isAuth: false,
    },
    {
        path: "/SignUp",
        component: SignUp,
        isAuth: false,
    },
    {
        path: "/SignIn",
        component: SignIn,
        isAuth: false,
    },
]

const isAuthenticated = () => {
    return !!localStorage.getItem('token');
}

const ProtectedRoute = ({ element: Component, isAuth, ...rest }) => {
    if (isAuth && !isAuthenticated()) {
        return <Navigate to="/signin" />;
    }
    return <Component {...rest} />;
}

export default function Routing() {
    const navigate = useNavigate();
    const filteredAuthRoutes = routes.filter(route => !isAuthenticated() || (route.path !== "/SignUp" && route.path !== "/SignIn"));

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/signin');
        showToast("Logout Successfully!", 'success')
    };

    return (
        <>
            <Navbar bg="primary" data-bs-theme="dark" className='navbar'>
                <Container>
                    <Navbar.Brand href="/">Hospital Management</Navbar.Brand>
                    <Nav className="me-auto">
                        {filteredAuthRoutes.map((route, index) => (
                            <Nav.Link as="div" key={index}>
                                <Link to={route.path}>
                                    {route.path === "/" ? "Dashboard" : route.path.substring(1)}
                                </Link> &nbsp;
                            </Nav.Link>
                        ))}
                        {isAuthenticated() && (
                            <Nav.Link as="div" onClick={handleLogout}>
                                Logout
                            </Nav.Link>
                        )}
                    </Nav>
                </Container>
            </Navbar>

            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    {routes.map((route, index) => (
                        <Route
                            key={index}
                            path={route.path}
                            element={<ProtectedRoute element={route.component} isAuth={route.isAuth} />}
                        />
                    ))}
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Suspense>
        </>
    );
}
