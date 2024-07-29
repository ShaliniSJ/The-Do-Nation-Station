import React from "react";
import AboutUs from "../components/AboutUsContent";
import { useState } from "react";
import Navbar from "../components/Navbar";

export default function aboutUs() {
  const [showAfterLogin, setShowBeforeLogin] = useState(true);

  return (
    <div>
      <Navbar islogged={isLogged}/>
      <AboutUs />
    </div>
  );
}
