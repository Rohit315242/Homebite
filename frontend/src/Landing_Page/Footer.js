import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-light border-top mt-5">
      <div className="container py-5">

        <div className="row">

          {/* Company */}
          <div className="col-lg-4 mb-4">

            <img
              src="/Media/images/logo.png"
              alt="HomeBite"
              style={{ width: "180px" }}
            />

            <p className="text-muted mt-3">
              HomeBite is a Digital Mess Management System that helps students
              and mess owners manage meals, subscriptions, attendance,
              payments, and nutrition through one smart platform.
            </p>

          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-md-6 mb-4">

            <h5 className="fw-bold">Quick Links</h5>

            <Link to="/" className="d-block text-decoration-none mb-2">
              Home
            </Link>

            <Link to="/about" className="d-block text-decoration-none mb-2">
              About
            </Link>

            <Link to="/product" className="d-block text-decoration-none mb-2">
              Product
            </Link>

            <Link to="/support" className="d-block text-decoration-none">
              Support
            </Link>

          </div>

          {/* Features */}
          <div className="col-lg-3 col-md-6 mb-4">

            <h5 className="fw-bold">Features</h5>

            <p className="mb-2">📍 Location Search</p>
            <p className="mb-2">🍽 Digital Menu</p>
            <p className="mb-2">💳 Online Payments</p>
            <p className="mb-2">🤖 AI Nutrition Chatbot</p>
            <p className="mb-2">⭐ Reviews & Ratings</p>

          </div>

          {/* Contact */}
          <div className="col-lg-3">

            <h5 className="fw-bold">Contact</h5>

            <p>📍 Pune, Maharashtra</p>
            <p>📧 support@homebite.com</p>
            <p>📞 +91 98765 43210</p>

          </div>

        </div>

        <hr />

        <div className="text-center text-muted">
          © 2026 HomeBite. All Rights Reserved.
        </div>

      </div>
    </footer>
  );
}

export default Footer;