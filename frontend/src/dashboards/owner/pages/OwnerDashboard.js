import { Routes, Route } from "react-router-dom";

import OwnerHome from "./OwnerHome";
import MessProfile from "./MessProfile";
import MenuManager from "./MenuManager";
import Members from "./Members";
import Payments from "./Payments";
import Analytics from "./Analytics";
import OwnerReviews from "./pages/OwnerReviews";

function OwnerDashboard() {
  return (
    <Routes>
      <Route index element={<OwnerHome />} />
      <Route path="mess" element={<MessProfile />} />
      <Route path="menu" element={<MenuManager />} />
      <Route path="subscriptions" element={<Members />} />
      <Route path="payments" element={<Payments />} />
      <Route path="analytics" element={<Analytics />} />

      {/* ✅ Fixed */}
      <Route
        path="reviews"
        element={<OwnerReviews />}
      />
    </Routes>
  );
}

export default OwnerDashboard;