import React from "react";

function Pricing() {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-4">
          <h1 className="mb-3 fs-2">Affordable Meal Plans</h1>
          <p>
            HomeBite offers transparent and flexible pricing for students. Choose the plan
            that suits your weekly meals with no hidden charges.
          </p>
          <a href="" style={{ textDecoration: "none" }}>
            See Plans{" "}
            <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
          </a>
        </div>
        <div className="col-2"></div>
        <div className="col-6 mb-5">
          <div className="row text-center">
            <div className="col p-3 border">
              <h1 className="mb-3">₹500</h1>
              <p>
                Weekly Veg Meals<br />
                Includes breakfast, lunch, and dinner
              </p>
            </div>
            <div className="col p-3 border">
              <h1 className="mb-3">₹700</h1>
              <p>
                Weekly Non-Veg Meals<br />
                Includes breakfast, lunch, and dinner
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pricing;