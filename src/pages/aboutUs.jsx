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
        setIsLogged(Boolean(islogged));
      }

      if (isLogged) {
        setShowAfterLogin(true);
        try {
          const currentUser = await getCurrentUser();
          setUser(currentUser);
          setIsdonor(user.is_donor)
          // setIsdonor(true)
          
        } catch (error) {
          console.error('Failed to fetch current user:', error);
        }
      }
    };
  
  
    // Call the async function
    fetchUserData();
  }, [isLogged]);

  return (
    <div>
      <Navbar islogged={isLogged}  isdonor={isdonor} user={user}/>
      <AboutUs />
    </div>
  );
}
