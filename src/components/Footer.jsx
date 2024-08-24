import Image from "next/image";
import IconLogo from "../assets/apple-touch-icon.png";
import BlueLogo from "../assets/blue-image-logo.png";
import { useState, useEffect } from "react";

export default function Page() {
  const [islogged, setIsLogged] = useState(null);
 
  useEffect(() => {
    if (typeof window !== "undefined") {
      const temp = localStorage.getItem("islogged");
      if (temp === "true") {
        setIsLogged(true);
      } else {
        setIsLogged(false);
      }
    }
  }, []);

  return (
    <footer className="flex flex-col justify-between min-h-60 bg-primary-blue text-secondary-blue rounded-3xl m-4 md:m-6 md:mt-16 p-4 md:p-10">
      <div className="flex flex-col md:flex-row justify-between">
        <div className="flex flex-col justify-between gap-4">
          <div className="flex flex-col md:flex-row object-scale-down">
            <Image
              src={IconLogo}
              alt="The Do-Nation Station Icon"
              className="object-scale-down"
              width={43}
            />
            <Image
              src={BlueLogo}
              alt="The Do-Nation Station"
              className="object-scale-down"
              width={250}
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          <ul className="grid w-full md:w-fit text-center md:text-left grid-cols-1 md:grid-cols-2 gap-x-32 gap-y-4 md:gap-y-2">
            <li>
              <a href="/" className="hover:underline focus:underline">
                Home
              </a>
            </li>
            <li>
              {islogged ? (
                <a href="/donations" className="hover:underline">
                  Donate
                </a>
              ) : (
                <a href="/signin" className="hover:underline">
                  Donate
                </a>
              )}
            </li>
            <li>
              <a className="hover:underline" href="/aboutUs">
                About
              </a>
            </li>
            <li>
              <a className="hover:underline" href="/explore">
                Explore
              </a>
            </li>
            <li>
              <a className="hover:underline" href="/history">
                History
              </a>
            </li>
            {!islogged && (
              <li>
                <a className="hover:underline" href="/signin">
                  Signin
                </a>
              </li>
            )}
            {/* <li>
              <a className="hover:underline" href="/login">
                Login
              </a>
            </li> */}
          </ul>
          <div className="text-center md:text-left nunito md:w-1/2 opacity-50">
            <p>Thank you for your support!</p>
            <p>
              For feedback or to work with us, contact us at{" "}
              <a
                href="mailto:pranav9176@gmail.com"
                className="hover:underline opacity-100"
              >
                pranav9176@gmail.com
              </a>
            </p>
          </div>
          <hr />
        </div>
      </div>
      <p className="text-center jost text-lg opacity-50">
        An Initiative By Team Enigmatic Optimizers
      </p>
    </footer>
  );
}
