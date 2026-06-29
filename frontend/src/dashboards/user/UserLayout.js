import { Routes, Route } from "react-router-dom";

import UserHome from "./pages/UserHome";
import SearchMess from "./pages/SearchMess";
import Subscriptions from "./pages/Subscriptions";
import Payments from "./pages/Payments";
import UserSidebar from "./UserSidebar";
import Profile from "./pages/Profile";
function UserLayout() {
  return (
    <div className="d-flex" style={{ background: "#0F0F1A", minHeight: "100vh" }}>
      <UserSidebar />
      <div className="flex-grow-1" style={{ background: "#0F0F1A", overflow: "hidden" }}>
        <Routes>
          <Route index element={<UserHome />} />
          <Route path="search" element={<SearchMess />} />
          <Route path="subscriptions" element={<Subscriptions />} />
          <Route path="payments" element={<Payments />} />
          <Route path="profile" element={<Profile />} />
        </Routes>
      </div>
    </div>
  );
}

export default UserLayout;