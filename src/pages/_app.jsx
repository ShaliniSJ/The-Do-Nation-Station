// src/pages/_app.jsx
import "../globals.css";

import Footer from "@/src/components/Footer";
import Navbar from "../components/Navbar";
import { useEffect,useState } from "react";


function MyApp({ Component, pageProps }) {
  const [isLogged, setIsLogged] = useState(false);
  useEffect(() => {
    // Define an async function to handle the async operation
    const fetchUserData = async () => {
      if (typeof window !== "undefined") {
        const islogged = localStorage.getItem("islogged");
        // setIsLogged(Boolean(islogged));
        if (islogged === "true") {
          setIsLogged(true);
        } else {
          setIsLogged(false);
        }
      }
    };

    // Call the async function
    fetchUserData();
  }, [isLogged]);

  useEffect(() => {
    try {
      fetch("./api/schedule");
    } catch (e) {
      console.log("scheduler disabled for this page. Reason: ", e);
    }
  }, []);
  

  return (
    <>
    <div className="flex flex-col min-h-96 relative">
    <Navbar islogged={isLogged} />
      <Component {...pageProps} />
      {/* Donation Box Button */}
      <div className="fixed bottom-8 right-8">
        <a href="/donate?66c6447d003dbf272e98" className="flex justify-center items-center">
          <img
            src="https://media.tenor.com/sztMKWYRz1UAAAAi/thank-you.gif"
            alt="Donate"
            className="w-20 h-20 rounded-full border-4 border-white shadow-lg"
          />
        </a>
      </div>
    </div>
    <Footer />
  </>
  );
}

export default MyApp;
