import React from "react";

function Awards() {
  return (
    <section className="container py-5">

      <div className="row align-items-center">

        {/* Left Image */}
        <div className="col-lg-6 text-center mb-4">
          <img
            src="/Media/images/topMessPlatform1.png"
            alt="HomeBite"
            className="img-fluid"
            style={{ maxWidth: "90%" }}
          />
        </div>

        {/* Right Content */}
        <div className="col-lg-6">

          <h2 className="fw-bold mb-4">
            Why Choose HomeBite?
          </h2>

          <p className="text-muted mb-4" style={{ lineHeight: "1.8" }}>
            HomeBite simplifies mess management by providing one digital platform
            for students and mess owners. From searching nearby messes to secure
            online payments, everything is available in one place.
          </p>

          <div className="row">

            <div className="col-6">

              <ul className="list-unstyled">

                <li className="mb-3">
                  ✅ Location-Based Mess Search
                </li>

                <li className="mb-3">
                  ✅ Digital Menu Management
                </li>

                <li className="mb-3">
                  ✅ Attendance Tracking
                </li>

              </ul>

            </div>

            <div className="col-6">

              <ul className="list-unstyled">

                <li className="mb-3">
                  ✅ Secure Online Payments
                </li>

                <li className="mb-3">
                  ✅ AI Nutrition Assistant
                </li>

                <li className="mb-3">
                  ✅ Ratings & Reviews
                </li>

              </ul>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Awards;