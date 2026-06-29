import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

import LandingLayout from "./Landing_Page/LandingLayout";

import HomePage from "./Landing_Page/Home/HomePage";
import AboutPage from "./Landing_Page/About/AboutPage";
import ProductPage from "./Landing_Page/Product/ProductPage";
import SupportPage from "./Landing_Page/Support/SupportPage";
import Signup from "./Landing_Page/Signup/Signup";

import Login from "./auth/Login";
import Register from "./auth/Register";

import OwnerLayout from "./dashboards/owner/OwnerLayout";
import UserLayout from "./dashboards/user/UserLayout";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Routes>

      {/* Landing Pages */}
      <Route element={<LandingLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* Dashboards */}
      <Route path="/owner/*" element={<OwnerLayout />} />
      <Route path="/user/*" element={<UserLayout />} />

    </Routes>
  </BrowserRouter>
);