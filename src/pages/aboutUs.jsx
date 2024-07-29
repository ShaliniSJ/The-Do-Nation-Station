import React from "react";
import AboutUs from "../components/AboutUsContent";
import { useState,useEffect } from "react";
import Navbar from "../components/Navbar";

export default function aboutUs() {
  const [showAfterLogin, setShowAfterLogin] = useState(false);
  const [user, setUser] = useState(null);
  const [isLogged, setIsLogged] = useState(false);
  const [isdonor,setIsdonor]=useState(false);

  useEffect(() => {
    // Define an async function to handle the async operation
    const fetchUserData = async () => {
      if (typeof window !== 'undefined') {
        const islogged = localStorage.getItem('islogged');
        // setIsLogged(Boolean(islogged));
        if(islogged === 'true') {
          setIsLogged(true);
        }
        else{
          setIsLogged(false);
        }
      }
    };
  
  
    // Call the async function
    fetchUserData();
  }, [isLogged]);

  return (
    <div>
      <Navbar islogged={isLogged}  />
      <AboutUs />
    </div>
  );
}
