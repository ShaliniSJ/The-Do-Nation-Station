// src/pages/_app.jsx
import "../globals.css";
import Footer from "@/src/components/Footer";

function MyApp({ Component, pageProps }) {
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
