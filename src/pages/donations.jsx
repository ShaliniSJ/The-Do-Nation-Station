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
  const [isdonor, setIsdonor] = useState(false);

  return (
    <div>
      {/* <Navbar islogged={isLogged}  /> */}
      <HomeWithLogin />
    </div>
  );
}
