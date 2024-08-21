import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import HomeWithLogin from '../components/HomeWithLogin';
import HomeWithOutLogin from '../components/HomeWithOutLogin';
import ProfileForOrganisationFromNeeds from '../components/ProfileForOrganisationFromNeeds';

export default function Home() {
  // const [showAfterLogin, setShowAfterLogin] = useState(false);
  // const [user, setUser] = useState(null);
  // const [isLogged, setIsLogged] = useState(false);
  // const [isdonor,setIsdonor]=useState(false);
    
  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     if (typeof window !== 'undefined') {
  //       const islogged = localStorage.getItem('islogged');
  //       if(islogged === 'true') {
  //         setIsLogged(true);
  //       }
  //       else{
  //         setIsLogged(false);
  //       }
  //     }
  //   };
  //   // Call the async function
  //   fetchUserData();
  // }, [isLogged]);

  return (
    <div>
      {/* <Navbar islogged={isLogged}   /> */}
      <ProfileForOrganisationFromNeeds />
    </div>
  );
}