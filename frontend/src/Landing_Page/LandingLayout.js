import { Outlet } from "react-router-dom";
import Navbar from "../Landing_Page/Navbar";
import Footer from "../Landing_Page/Footer";

function LandingLayout() {
return (
<> <Navbar /> <Outlet /> <Footer />
</>
);
}

export default LandingLayout;
