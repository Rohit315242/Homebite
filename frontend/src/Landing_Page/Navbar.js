import React from "react";
import { Link, NavLink } from "react-router-dom";

function Navbar() {
  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/product", label: "Product" },
    { to: "/support", label: "Support" },
  ];

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
      <div className="container-fluid px-4">

        {/* Logo */}
        <Link className="navbar-brand" to="/">
          <img
            src="/Media/images/logo.png"
            alt="HomeBite"
            style={{
              width: "170px",
              height: "70px",
              objectFit: "contain",
            }}
          />
        </Link>

        {/* Mobile Menu */}
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigation */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-lg-center">

            {navLinks.map(({ to, label }) => (
              <li className="nav-item mx-2" key={to}>
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "active fw-bold text-primary" : ""}`
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}

            <li className="nav-item mx-2">
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active fw-bold text-primary" : ""}`
                }
              >
                Login
              </NavLink>
            </li>

            <li className="nav-item ms-lg-3 mt-3 mt-lg-0">
              <Link
                to="/register"
                className="btn btn-primary px-4 rounded-pill"
              >
                Register
              </Link>
            </li>

          </ul>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;