// src/pages/_app.jsx
import "../globals.css";
import Footer from "@/src/components/Footer";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default MyApp;
