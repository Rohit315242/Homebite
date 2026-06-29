import React from "react";

function Hero() {
  return (
    <div className="container">

      {/* Heading */}
      <div className="row py-5 mt-4 text-center">
        <h1 className="fw-bold display-5">
          Simplifying Mess Management with HomeBite
        </h1>

        <p className="lead text-muted mt-3">
          A complete digital platform for students and mess owners to manage
          meals, subscriptions, attendance, payments, and nutrition with ease.
        </p>
      </div>

      {/* About Content */}
      <div
        className="row py-5 border-top text-muted"
        style={{ lineHeight: "1.9", fontSize: "1.1rem" }}
      >
        <div className="col-lg-6 mb-4">

          <p>
            HomeBite is a Digital Mess Management System designed to simplify
            everyday meal management for students and mess owners. Users can
            search nearby messes, view menus, subscribe to meal plans, and make
            secure online payments from a single platform.
          </p>

          <p>
            The platform also provides attendance tracking, digital menu
            management, and a personalized dashboard to improve transparency
            and reduce manual work.
          </p>

          <p>
            HomeBite helps reduce paperwork, save time, and create a smooth
            experience for both students and mess owners.
          </p>

        </div>

        <div className="col-lg-6">

          <p>
            Mess owners can manage menus, subscriptions, payments, reviews,
            and analytics through an easy-to-use admin dashboard.
          </p>

          <p>
            Students can explore nearby messes, compare meal plans, provide
            feedback, and receive AI-powered nutrition information before
            choosing their meals.
          </p>

          <p>
            Our goal is to make mess management smarter, faster, and completely
            digital through one integrated platform.
          </p>

        </div>
      </div>

    </div>
  );
}

export default Hero;