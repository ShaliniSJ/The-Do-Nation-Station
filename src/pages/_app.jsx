// src/pages/_app.jsx
import "../globals.css";

import Footer from "@/src/components/Footer";
import { useEffect } from "react";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    fetch("./api/schedule");
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
