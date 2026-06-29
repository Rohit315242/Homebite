import React from "react";

function CreateTicket() {
  const topics = [
    {
      title: "Mess Search",
      items: [
        "Unable to find nearby mess",
        "Location not working",
        "Search results issue",
        "Mess details not loading",
      ],
    },
    {
      title: "Subscription & Attendance",
      items: [
        "Subscribe to a meal plan",
        "Attendance not updated",
        "Cancel subscription",
        "Subscription expired",
      ],
    },
    {
      title: "Payments",
      items: [
        "Razorpay payment failed",
        "Transaction successful but not updated",
        "Payment refund",
        "Billing issue",
      ],
    },
    {
      title: "AI Nutrition Chatbot",
      items: [
        "Nutrition information",
        "Calories & Protein",
        "Meal recommendation",
        "Chatbot not responding",
      ],
    },
    {
      title: "Owner Dashboard",
      items: [
        "Manage Menu",
        "Manage Subscriptions",
        "Payment Reports",
        "Analytics Issue",
      ],
    },
    {
      title: "General Support",
      items: [
        "Login/Register issue",
        "Feedback & Reviews",
        "Report a bug",
        "Contact Support",
      ],
    },
  ];

  return (
    <section className="container py-5">

      <div className="text-center mb-5">
        <h2 className="fw-bold">
          How can we help you?
        </h2>

        <p className="text-muted">
          Choose a topic below to get quick help and support.
        </p>
      </div>

      <div className="row">

        {topics.map((topic, index) => (
          <div key={index} className="col-lg-4 col-md-6 mb-4">

            <div className="card border-0 shadow-sm h-100 p-4">

              <h5 className="fw-bold mb-3 text-primary">
                <i className="fas fa-life-ring me-2"></i>
                {topic.title}
              </h5>

              {topic.items.map((item, idx) => (
                <p key={idx} className="mb-2 text-muted">
                  <i className="fas fa-angle-right me-2"></i>
                  {item}
                </p>
              ))}

            </div>

          </div>
        ))}

      </div>

    </section>
  );
}

export default CreateTicket;