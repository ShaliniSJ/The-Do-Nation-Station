import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import HomeWithLogin from "../components/HomeWithLogin";
import HomeWithOutLogin from "../components/HomeWithOutLogin";
import { idID } from "@mui/material/locale";
import { useRouter } from "next/navigation";

export default function Home() {
  const [showAfterLogin, setShowAfterLogin] = useState(false);
  const [user, setUser] = useState(null);
  const [isLogged, setIsLogged] = useState(false);
  // const [isdonor, setIsdonor] = useState(false);

  const router = useRouter();
  useEffect(() => {
    if (typeof window !== "undefined") {
      const islogged = localStorage.getItem("islogged");
      // const isdonor = localStorage.getItem("isdonar");
      if (islogged === "true") {
        setIsLogged(true);
        setShowAfterLogin(true);
        router.push("/explore");
      } else {
        setIsLogged(false);
      }
    }
  }, []);

  return (
    <div>
      {/* <Navbar islogged={isLogged}  /> */}
      {showAfterLogin ? <HomeWithLogin /> : <HomeWithOutLogin />}
    </div>
  );
}
