import React from "react";
import { Link } from "react-router-dom";

function OpenAccount() {
  return (
    <section
      className="py-5"
      style={{
        background: "linear-gradient(135deg,#f8fbff,#ffffff)",
      }}
    >
      <div className="container">

        <div className="row align-items-center">

          {/* Left Content */}
          <div className="col-lg-6">

            <h1
              className="fw-bold display-5 mb-4"
              style={{ lineHeight: "1.3" }}
            >
              Ready to Experience
              <br />
              <span className="text-primary">
                Smart Mess Management?
              </span>
            </h1>

            <p
              className="text-muted fs-5 mb-4"
              style={{ lineHeight: "1.8" }}
            >
              Join HomeBite today and discover nearby messes,
              subscribe to meal plans, manage attendance,
              make secure online payments, and get AI-powered
              nutrition insights — all from one platform.
            </p>

            <div className="d-flex gap-3">

              <Link
                to="/register"
                className="btn btn-primary btn-lg px-4"
              >
                Register Now
              </Link>

              <Link
                to="/login"
                className="btn btn-outline-success btn-lg px-4"
              >
                Login
              </Link>

            </div>

          </div>

          {/* Right Image */}
          <div className="col-lg-6 text-center">

            <img
              src="/Media/images/getStarted.png"
              alt="HomeBite"
              className="img-fluid"
              style={{
                maxWidth: "95%",
              }}
            />

          </div>

        </div>

      </div>
    </section>
  );
}

export default OpenAccount;