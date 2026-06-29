import OwnerSidebar from "./OwnerSidebar";
import { Routes, Route } from "react-router-dom";

import OwnerHome from "./pages/OwnerHome";
import MessProfile from "./pages/MessProfile";
import MenuManager from "./pages/MenuManager";
import Members from "./pages/Members";
import Payments from "./pages/Payments";
import Analytics from "./pages/Analytics";
import OwnerReviews from "./pages/OwnerReviews";

function OwnerLayout() {
  return (
    <div style={s.shell}>

      {/* Sidebar */}
      <OwnerSidebar />

      {/* Main Content */}
      <div style={s.main}>
        <Routes>
          <Route index                    element={<OwnerHome />}     />
          <Route path="mess"              element={<MessProfile />}   />
          <Route path="menu"              element={<MenuManager />}   />
          <Route path="subscriptions"     element={<Members />}       />
          <Route path="payments"          element={<Payments />}      />
          <Route path="analytics"         element={<Analytics />}     />
          <Route path="reviews"           element={<OwnerReviews />}  />
        </Routes>
      </div>

    </div>
  );
}

const s = {
  shell: {
    display: "flex",
    height: "100vh",
    overflow: "hidden",
    background: "#0F0F1A",
  },
  main: {
    flex: 1,
    overflowY: "auto",
    overflowX: "hidden",
    background: "#0F0F1A",
    minWidth: 0,
  },
};

export default OwnerLayout;