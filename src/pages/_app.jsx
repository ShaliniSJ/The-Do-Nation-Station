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
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default MyApp;
