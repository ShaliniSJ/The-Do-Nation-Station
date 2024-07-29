import React from "react";
import AboutUs from "../components/AboutUsContent";
import { useState,useEffect } from "react";
import Navbar from "../components/Navbar";

export default function aboutUs() {
  const [showAfterLogin, setShowBeforeLogin] = useState(true);
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const islogged = localStorage.getItem('islogged');
      setIsLogged(Boolean(islogged));
    }
  }, [isLogged]);

  return (
    <div>
      <Navbar islogged={isLogged}/>
      <AboutUs />
    </div>
  );
}
