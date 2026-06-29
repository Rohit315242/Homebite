import React from "react";

function Stats() {
  return (
    <section className="container py-5">

      <div className="row align-items-center">

        {/* Left Content */}
        <div className="col-lg-6">

          <h2 className="fw-bold mb-4">
            Smart, Secure & Student-Friendly
          </h2>

          <div className="mb-4">
            <h5 className="fw-bold">
              📍 Location-Based Search
            </h5>
            <p className="text-muted">
              Find nearby messes, compare meal plans, and choose the best option
              based on your location.
            </p>
          </div>

          <div className="mb-4">
            <h5 className="fw-bold">
              🍽 Digital Menu & Attendance
            </h5>
            <p className="text-muted">
              View daily menus, subscribe to meal plans, and track your
              attendance digitally.
            </p>
          </div>

          <div className="mb-4">
            <h5 className="fw-bold">
              💳 Secure Online Payments
            </h5>
            <p className="text-muted">
              Pay subscription fees securely using Razorpay with quick and safe
              transactions.
            </p>
          </div>

          <div className="mb-4">
            <h5 className="fw-bold">
              🤖 AI Nutrition Assistant
            </h5>
            <p className="text-muted">
              Get calories, protein, carbohydrates, vitamins, and nutrition
              information before selecting your meal.
            </p>
          </div>

        </div>

        {/* Right Image */}
        <div className="col-lg-6 text-center">

          <img
            src="/Media/images/messStatss.png"
            alt="HomeBite Statistics"
            className="img-fluid"
            style={{ maxWidth: "90%" }}
          />

          <div className="row mt-5 text-center">

            <div className="col-3">
              <h3 className="text-primary fw-bold">500+</h3>
              <small className="text-muted">Users</small>
            </div>

            <div className="col-3">
              <h3 className="text-success fw-bold">50+</h3>
              <small className="text-muted">Messes</small>
            </div>

            <div className="col-3">
              <h3 className="text-warning fw-bold">1000+</h3>
              <small className="text-muted">Payments</small>
            </div>

            <div className="col-3">
              <h3 className="text-danger fw-bold">4.8★</h3>
              <small className="text-muted">Ratings</small>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Stats;