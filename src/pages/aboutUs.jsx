import React from "react";
// import NavbarAfterLogin from '../components/NavbarAfterLogin';
// import NavbarBeforeLogin from '../components/NavbarBeforeLogin';
import AboutUs from "../components/AboutUsContent";
import { useState } from "react";
import Navbar from "../components/Navbar";

export default function aboutUs() {
  const [showAfterLogin, setShowBeforeLogin] = useState(true);

  return (
    <div>
      {/* {showAfterLogin ? <NavbarBeforeLogin/> : <NavbarAfterLogin />} */}
      <Navbar />
      <AboutUs />
    </div>
  );
}
