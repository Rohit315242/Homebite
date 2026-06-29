import React from "react";

function Universe() {
  const features = [
    {
      image: "/Media/images/searchMess.png",
      title: "Location-Based Search",
      description:
        "Find nearby messes based on your location and compare available meal plans.",
    },
    {
      image: "/Media/images/menu.png",
      title: "Digital Menu",
      description:
        "View daily and weekly menus before subscribing to your preferred mess.",
    },
    {
      image: "/Media/images/dashboard.png",
      title: "User & Owner Dashboard",
      description:
        "Dedicated dashboards for users and mess owners to manage all activities.",
    },
    {
      image: "/Media/images/payment.png",
      title: "Secure Online Payments",
      description:
        "Pay mess subscription fees securely using the integrated Razorpay gateway.",
    },
    {
      image: "/Media/images/chatbot.png",
      title: "AI Nutrition Assistant",
      description:
        "Know calories, protein, carbohydrates and nutrition information before selecting meals.",
    },
    {
      image: "/Media/images/review.png",
      title: "Ratings & Reviews",
      description:
        "Read user reviews and share your feedback to improve mess quality.",
    },
  ];

  return (
    <section className="container py-5">

      <div className="text-center mb-5">
        <h2 className="fw-bold">
          HomeBite Platform Features
        </h2>

        <p className="text-muted">
          Everything you need to manage your meals digitally in one platform.
        </p>
      </div>

      <div className="row">

        {features.map((feature, index) => (
          <div key={index} className="col-lg-4 col-md-6 mb-4">

            <div className="card border-0 shadow-sm h-100 text-center p-4">

              <img
                src={feature.image}
                alt={feature.title}
                style={{
                  width: "70px",
                  height: "70px",
                  objectFit: "contain",
                  margin: "0 auto"
                }}
              />

              <h5 className="fw-bold mt-3">
                {feature.title}
              </h5>

              <p className="text-muted">
                {feature.description}
              </p>

            </div>

          </div>
        ))}

      </div>

      <div className="text-center mt-4">
        <button className="btn btn-primary btn-lg px-5">
          Get Started
        </button>
      </div>

    </section>
  );
}

export default Universe;