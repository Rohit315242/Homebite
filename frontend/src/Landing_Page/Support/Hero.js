import React from "react";

function Hero() {
  return (
    <section
      className="container-fluid py-5"
      style={{ background: "#f8f9fa" }}
    >
      <div className="container">

        <div className="text-center mb-5">
          <h1 className="fw-bold">
            HomeBite Support Center
          </h1>

          <p className="text-muted fs-5">
            Need help? Search for answers or explore support topics related to
            your HomeBite account and services.
          </p>
        </div>

        <div className="row">

          {/* Left */}
          <div className="col-lg-6 mb-4">

            <h3 className="fw-bold mb-3">
              Search Your Query
            </h3>

            <input
              className="form-control form-control-lg mb-4"
              placeholder="Search your issue..."
            />

            <div className="d-flex flex-column gap-3">

              <a href="#" className="text-decoration-none">
                📍 Search nearby mess
              </a>

              <a href="#" className="text-decoration-none">
                🍽️ View digital menu
              </a>

              <a href="#" className="text-decoration-none">
                💳 Payment & Subscription
              </a>

              <a href="#" className="text-decoration-none">
                🤖 AI Nutrition Chatbot
              </a>

            </div>

          </div>

          {/* Right */}
          <div className="col-lg-6">

            <h3 className="fw-bold mb-3">
              Popular Help Topics
            </h3>

            <ol className="lh-lg">

              <li>How to search nearby messes?</li>

              <li>How to subscribe to a meal plan?</li>

              <li>How to make online payments?</li>

              <li>How to mark attendance?</li>

              <li>How to use the AI Nutrition Chatbot?</li>

              <li>Owner Dashboard User Guide</li>

            </ol>

          </div>

        </div>

      </div>
    </section>
  );
}

export default Hero;