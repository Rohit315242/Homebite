import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./Navbar";

// Owner Layout
import OwnerLayout from "./dashboards/owner/OwnerLayout";

// Owner Pages
import OwnerHome from "./dashboards/owner/pages/OwnerHome";
import MessProfile from "./dashboards/owner/pages/MessProfile";
import MenuManager from "./dashboards/owner/pages/MenuManager";
import Members from "./dashboards/owner/pages/Members";
import Payments from "./dashboards/owner/pages/Payments";
import Analytics from "./dashboards/owner/pages/Analytics";
import OwnerReviews from "./dashboards/owner/pages/OwnerReviews";

function App() {
  return (
    <Router>

      <Navbar />

      <Routes>

        {/* =========================
            Owner Dashboard
        ========================== */}

        <Route path="/owner" element={<OwnerLayout />}>

          <Route
            index
            element={<OwnerHome />}
          />

          <Route
            path="mess"
            element={<MessProfile />}
          />

          <Route
            path="menu"
            element={<MenuManager />}
          />

          <Route
            path="subscriptions"
            element={<Members />}
          />

          <Route
            path="payments"
            element={<Payments />}
          />

          <Route
            path="analytics"
            element={<Analytics />}
          />

          {/* ⭐ NEW */}
          <Route
            path="reviews"
            element={<OwnerReviews />}
          />

        </Route>

      </Routes>

    </Router>
  );
}

export default App;