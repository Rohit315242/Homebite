import React from "react";

function Hero() {
  return (
    <section className="container py-5">
      <div className="row align-items-center">

        {/* Left Content */}
        <div className="col-lg-6 text-center text-lg-start">

          <h1 className="display-4 fw-bold mb-3">
            Smart Mess Management <br />
            <span className="text-primary">Made Easy</span>
          </h1>

          <p className="lead text-muted mb-4">
            Search nearby messes, explore digital menus, subscribe to meal
            plans, track attendance, make secure online payments, and get
            AI-powered nutrition insights — all from one platform.
          </p>

          <div className="d-flex flex-wrap gap-3 justify-content-center justify-content-lg-start">

            <button className="btn btn-primary btn-lg px-4">
              <i className="fas fa-search me-2"></i>
              Search Mess
            </button>

            <button className="btn btn-outline-success btn-lg px-4">
              <i className="fas fa-user-plus me-2"></i>
              Register Now
            </button>

          </div>

          {/* Feature Highlights */}
          <div className="row mt-5 gy-3">

            <div className="col-6">
              <div className="border rounded-3 p-3 shadow-sm">
                <h6 className="mb-1">
                  <i className="fas fa-map-marker-alt text-danger me-2"></i>
                  Location Search
                </h6>
                <small className="text-muted">
                  Find nearby messes easily.
                </small>
              </div>
            </div>

            <div className="col-6">
              <div className="border rounded-3 p-3 shadow-sm">
                <h6 className="mb-1">
                  <i className="fas fa-robot text-primary me-2"></i>
                  AI Chatbot
                </h6>
                <small className="text-muted">
                  Get nutrition insights instantly.
                </small>
              </div>
            </div>

            <div className="col-6">
              <div className="border rounded-3 p-3 shadow-sm">
                <h6 className="mb-1">
                  <i className="fas fa-credit-card text-success me-2"></i>
                  Secure Payments
                </h6>
                <small className="text-muted">
                  Fast & secure online payments.
                </small>
              </div>
            </div>

            <div className="col-6">
              <div className="border rounded-3 p-3 shadow-sm">
                <h6 className="mb-1">
                  <i className="fas fa-calendar-check text-warning me-2"></i>
                  Attendance
                </h6>
                <small className="text-muted">
                  Track daily meal attendance.
                </small>
              </div>
            </div>

          </div>

        </div>

        {/* Right Image */}
        <div className="col-lg-6 text-center mt-5 mt-lg-0">
          <img
            src="/Media/images/homepage.png"
            alt="HomeBite"
            className="img-fluid"
            style={{ maxWidth: "90%" }}
          />
        </div>

      </div>
    </section>
  );
}

export default Hero;