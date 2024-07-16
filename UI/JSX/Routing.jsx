import React, { Suspense, lazy, useState } from "react";
import { Routes, Route, Link, Navigate, useNavigate } from "react-router-dom";
import NotFound from "./Component/NotFound.jsx";
import { showToast } from "./utils/toastService.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import "../Assets/Styles/Navbar.css";
import logo from "../Assets/Images/healthyCareLife.png";

const Dashboard = lazy(() => retry(() => import("./Component/Dashboard.jsx")));
const SignUp = lazy(() => retry(() => import("./Component/SignUp.jsx")));
const SignIn = lazy(() => retry(() => import("./Component/SignIn.jsx")));
const Appointment = lazy(() =>
  retry(() => import("./Component/Appointment.jsx"))
);

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
};

const routes = [
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
  {
    path: "/Appointment",
    component: Appointment,
    isAuth: true,
  },
];

const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

const ProtectedRoute = ({ element: Component, isAuth, ...rest }) => {
  if (isAuth && !isAuthenticated()) {
    return <Navigate to="/signin" />;
  }
  return <Component {...rest} />;
};

export default function Routing() {
  const [nav, setNav] = useState(false);

  const openNav = () => {
    setNav(!nav);
  };

  const navigate = useNavigate();
  const filteredAuthRoutes = routes.filter((route) =>
    isAuthenticated() ? route.isAuth : !route.isAuth
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
    showToast("Logout Successfully!", "success");
  };

  return (
    <>
      <div className="navbar-section">
        <h1 className="navbar-title">
          <Link to="/">
            <img src={logo} alt="HealthyCareLife" className="ft-logo" />
          </Link>
        </h1>

        {/* Desktop */}
        <ul className="navbar-items">
          <li>
            <Link className="navbar-links" to={"/"}>
              Dashboard
            </Link>
          </li>
          {filteredAuthRoutes.map((route, index) => (
            <li key={index}>
              <Link to={route.path} className="navbar-links">
                {route.path === "/" ? "Dashboard" : route.path.substring(1)}
              </Link>
            </li>
          ))}
          {isAuthenticated() && (
            <li>
              <Link className="navbar-links" onClick={handleLogout}>
                Logout
              </Link>
            </li>
          )}
        </ul>

        {/* Mobile */}
        <div className={`mobile-navbar ${nav ? "open-nav" : ""}`}>
          <div onClick={openNav} className="mobile-navbar-close">
            <FontAwesomeIcon icon={faXmark} className="hamb-icon" />
          </div>

          <ul className="mobile-navbar-links">
            <li>
              <Link className="navbar-links" onClick={openNav} to={"/"}>
                Dashboard
              </Link>
            </li>
            {filteredAuthRoutes.map((route, index) => (
              <li key={index}>
                <Link
                  to={route.path}
                  onClick={openNav}
                  className="navbar-links"
                >
                  {route.path === "/" ? "Dashboard" : route.path.substring(1)}
                </Link>
              </li>
            ))}
            {isAuthenticated() && (
              <li>
                <Link className="navbar-links" onClick={handleLogout}>
                  Logout
                </Link>
              </li>
            )}
          </ul>
        </div>

        {/* Hamburger Icon */}
        <div className="mobile-nav">
          <FontAwesomeIcon
            icon={faBars}
            onClick={openNav}
            className="hamb-icon"
          />
        </div>
      </div>

      <Suspense
        fallback={
          <div className="loader-wrap">
            <div className="loader"></div>
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Dashboard />} />
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={
                <ProtectedRoute
                  element={route.component}
                  isAuth={route.isAuth}
                />
              }
            />
          ))}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
}
