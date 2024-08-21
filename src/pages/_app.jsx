import "../globals.css";
import Footer from "@/src/components/Footer";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  const [isLogged, setIsLogged] = useState(false);
  const router = useRouter();
  useEffect(() => {
    console.log("router.asPath", router.asPath);
    // Define an async function to handle the async operation
    const fetchUserData = async () => {
      if (typeof window !== "undefined") {
        const islogged = localStorage.getItem("islogged");
        console.log("fetchUserData", islogged);
        // Check the login state and update
        setIsLogged(islogged === "true");
      }
    };

    // Call the async function
    fetchUserData();
  }, [router.asPath]); // Run only on initial render

  useEffect(() => {
    try {
      fetch("./api/schedule");
    } catch (e) {
      console.log("scheduler disabled for this page. Reason: ", e);
    }
  }, []);

  return (
    <>
      <div className="flex flex-col min-h-screen relative">
        <Navbar islogged={isLogged} />
        <Component {...pageProps} />
        {/* Donation Box Button */}
        <div className="fixed bottom-8 right-8">
          <a
            href="/donate?66c6447d003dbf272e98"
            className="flex justify-center items-center"
          >
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
