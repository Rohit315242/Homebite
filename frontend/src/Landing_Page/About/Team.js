import React from "react";

function Team() {
  return (
    <div className="container">
      <div className="row p-3 mt-5 border-top">
        <h1 className="text-center">Our Team</h1>
      </div>

      <div
        className="row p-3 text-muted"
        style={{ lineHeight: "1.8", fontSize: "1.2em" }}
      >
        <div className="col-6 p-3 text-center">
          <img
            src="media/images/founder.png"
            style={{ borderRadius: "100%", width: "50%" }}
            alt="Founder"
          />
          <h4 className="mt-4">Fyp Team </h4>
          <h6>Founder & CEO</h6>
        </div>
        <div className="col-6 p-3">
          <p>
            Our Team founded HomeBite to simplify mess management for students and 
            administrators. His goal was to digitize coupon purchases, menu management, 
            and meal planning for a seamless experience.
          </p>
          <p>
            With a focus on innovation and user convenience, the HomeBite platform 
            helps reduce food wastage, save time, and improve transparency in mess operations.
          </p>
          <p>
            In his free time, Rohit enjoys exploring new tech solutions and improving 
            student life through digital products.
          </p>
          <p>
            Connect on <a href="">LinkedIn</a> / <a href="">Twitter</a> / <a href="">GitHub</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Team;
