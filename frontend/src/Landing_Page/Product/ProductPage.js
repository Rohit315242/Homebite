import React from "react";


import Hero from "./Hero";
import LeftSection from "./LeftSection";
import RightSection from "./RightSection";
import Universe from "./Universe";

function ProductPage() {
  return (
    <>
      

      <Hero />

      <LeftSection
        imageURL="/Media/images/searchMess.png"
        featureName="Location-Based Mess Search"
        featureDescription="Find nearby messes based on your location, compare meal plans, and choose the best option."
        learnMore="#"
      />

      <RightSection
        imageURL="/Media/images/menu.png"
        featureName="Digital Menu"
        featureDescription="View daily and weekly menus online before subscribing to any mess."
        learnMore="#"
      />

      <LeftSection
        imageURL="/Media/images/dashboard.png"
        featureName="User & Owner Dashboard"
        featureDescription="Manage subscriptions, attendance, menus, payments, reviews, and analytics through dedicated dashboards."
        learnMore="#"
      />

      <RightSection
        imageURL="/Media/images/payment.png"
        featureName="Secure Online Payments"
        featureDescription="Pay mess subscription fees securely using Razorpay."
        learnMore="#"
      />

      <LeftSection
        imageURL="/Media/images/chatbot.png"
        featureName="AI Nutrition Assistant"
        featureDescription="Get calories, protein, carbohydrates, vitamins, and nutrition information before selecting your meal."
        learnMore="#"
      />

      <RightSection
        imageURL="/Media/images/review.png"
        featureName="Ratings & Reviews"
        featureDescription="Read genuine user reviews and share your feedback to improve mess quality."
        learnMore="#"
      />

      <Universe />

      
    </>
  );
}

export default ProductPage;