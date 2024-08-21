// src/pages/_app.jsx
import "../globals.css";

import Footer from "@/src/components/Footer";
import { useEffect } from "react";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    try {
      fetch("./api/schedule");
    } catch (e) {
      console.log("scheduler disabled for this page. Reason: ", e);
    }
  }, []);

  return (
    <>
      <div className="flex flex-col min-h-96">
        <Component {...pageProps} />
      </div>
      <Footer />
    </>
  );
}

export default MyApp;
