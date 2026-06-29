import React from "react";

function RightSection({
  imageURL,
  featureName,
  featureDescription,
  learnMore,
}) {
  return (
    <section className="container py-5">
      <div className="row align-items-center">

        {/* Left Content */}
        <div className="col-lg-6 mb-4">

          <h2 className="fw-bold mb-3">{featureName}</h2>

          <p
            className="text-muted"
            style={{ lineHeight: "1.8", fontSize: "1.05rem" }}
          >
            {featureDescription}
          </p>

          <a
            href={learnMore}
            className="btn btn-primary mt-3 px-4"
          >
            Learn More →
          </a>

        </div>

        {/* Right Image */}
        <div className="col-lg-6 text-center">

          <img
            src={imageURL}
            alt={featureName}
            className="img-fluid rounded shadow"
            style={{ maxHeight: "400px" }}
          />

        </div>

      </div>
    </section>
  );
}

export default RightSection;