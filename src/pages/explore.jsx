import Navbar from "../components/Navbar";
import ExploreTab from "../components/ExploreTab";
import { useState, useEffect } from "react";

const explore = () => {
  const [isLogged, setIsLogged] = useState(false);
  useEffect(() => {
    // Define an async function to handle the async operation
    const fetchUserData = async () => {
      if (typeof window !== "undefined") {
        const islogged = localStorage.getItem("islogged");
        if (islogged === "true") {
          setIsLogged(true);
        } else {
          setIsLogged(false);
        }
      }
    };
    fetchUserData();
  }, [isLogged]);
  return (
    <div>
      {/* <Navbar islogged={isLogged} /> */}
      <ExploreTab />
    </div>
  );
};

export default explore;
