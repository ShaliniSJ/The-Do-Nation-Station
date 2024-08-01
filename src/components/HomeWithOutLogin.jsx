import React from "react";
import Image from "next/image";
import donationImage from "../assets/donation-image.jpg";
import solutionImage from "../assets/the-do-nation-station-high-resolution-logo.png";
import statisticsImage from "../assets/statistics.png";

import Footer from "@/src/components/Footer";

const HomeWithOutLogin = () => {
  return (
    <div>
      <header className="flex flex-col items-center text-center w-full h-[100vh] gap-2">
        <div className="-mt-32 bg-secondary-blue/50 rounded-full blur-3xl w-1/2 h-1/2"></div>
        <h2 className="-mt-8 relative text-4xl md:text-6xl md:w-1/2 font-semibold jost">
          One Platform for All Your Charitable Donations
        </h2>
        <p className="nunito text-base md:text-xl">
          Support Causes Based on Urgency, Location, and Need <br></br>
          Ideal for orphanages, NGOs, hospitals, foundations, and old age homes
        </p>
        <div className="my-8 flex flex-row gap-4">
          <a
            href="/signin"
            className="p-2 text-base md:text-lg px-8 bg-primary-blue hover:opacity-80 text-white rounded-full"
          >
            Donate Now
          </a>
          <a
            href="#"
            className="p-2 text-base md:text-lg px-8 border-2 border-primary-blue hover:bg-secondary-blue text-primary-blue rounded-full"
          >
            Watch Demo
          </a>
        </div>
        <section className="relative flex flex-col items-center w-full p-4 md:p-6 bg-white mt-0">
          <div className="relative w-full h-64 my-4">
            <Image
              src={donationImage}
              alt="Donation"
              layout="fill"
              objectFit="cover"
              className="rounded-2xl"
            />
          </div>
        </section>
      </header>
      {/* <section className="flex flex-col items-center bg-gray-100 rounded-3xl text-center m-4 md:m-6 p-4 md:p-10 md:px-32">
        <h1 className="text-4xl jost font-bold mb-4 text-primary-blue">
          Why Do We Exist?
        </h1>
        <p className="text-sm md:text-lg nunito text-blue">
          Many orphanages, NGOs, hospitals, foundations, and old age homes have
          their own websites through which donors make donations in the form of
          kind and money. But there lacks a central platform through which all
          orphanages, NGOs, hospitals, foundations, and old age homes can
          register themselves in the platform and donors can easily donate to
          the needy based on urgency, location, date, timings, population, and
          requirements. The platform should also be responsible and transparent
          by showing the government licenses, audits, details, and photographs
          of registered orphanages, NGOs, hospitals, foundations, and old age
          homes. The donors will be able to see how, where, and by whom their
          money and kind are being utilized. There is also a need to show a
          leaderboard in specific locations among donors in order to encourage
          their donation.
        </p>
        <a href="/signin">
          <button className="mt-8 p-2 text-base md:text-lg px-8 bg-primary-blue hover:opacity-80 text-white rounded-full hover:bg-blue">
            LOGIN TO DONATE OR TO GET DONATIONS
          </button>
        </a>
      </section> */}

      <section className="flex flex-col bg-secondary-blue/20 rounded-3xl m-4 md:m-6 p-4 md:p-10">
        <div className="flex flex-col-reverse text-center md:text-left items-center md:flex-row gap-8">
          <div className="flex flex-col grow">
            <h3 className="text-4xl jost font-bold mb-4 text-primary-blue">
              Why Do We Exist?
            </h3>
            <p className="text-sm md:text-lg nunito text-blue">
              Many orphanages, NGOs, hospitals, foundations, and old age homes
              have their own websites through which donors make donations in the
              form of kind and money. But there lacks a central platform through
              which all orphanages, NGOs, hospitals, foundations, and old age
              homes can register themselves in the platform and donors can
              easily donate to the needy based on urgency, location, date,
              timings, population, and requirements. The platform should also be
              responsible and transparent by showing the government licenses,
              audits, details, and photographs of registered orphanages, NGOs,
              hospitals, foundations, and old age homes. The donors will be able
              to see how, where, and by whom their money and kind are being
              utilized. There is also a need to show a leaderboard in specific
              locations among donors in order to encourage their donation.
            </p>
            <a href="/signin">
              <button className="mt-8 p-2 text-base md:text-lg px-8 bg-primary-blue hover:opacity-80 text-white rounded-full hover:bg-blue">
                LOGIN TO DONATE OR TO GET DONATIONS
              </button>
            </a>
          </div>
          <Image
            src={solutionImage}
            alt="Solution"
            layout="responsive"
            width={500}
            height={500}
            className="rounded-lg md:max-w-[50%]"
          />
        </div>
      </section>

      <section className="md:mt-16 bg-secondary-blue/20 gap-8 flex flex-col rounded-3xl m-4 md:m-6 p-4 md:p-10">
        <div className="grow">
          <h3 className="text-4xl text-left jost font-bold mb-4 text-primary-blue">
            Our Solution
          </h3>
          <p className="text-sm md:text-lg nunito mb-6 text-left">
            To address this challenge, we propose the development of a
            comprehensive donation platform that seamlessly connects donors with
            charitable organizations in need of support. This platform will
            serve as a central hub for all charitable organizations to register
            and showcase their work, allowing donors to easily search, filter,
            and donate to causes that align with their values.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 min-w-[33%] nunito text-primary-blue flex-wrap">
          <div className="bg-secondary-blue/80 hover:bg-secondary-blue/50 p-4 rounded-xl">
            <p className="text-2xl md:text-5xl opacity-50">01</p>
            <p className="text-sm md:text-lg">
              Centralized Registration for all Charitable Organizations
            </p>
          </div>
          <div className="bg-secondary-blue/80 hover:bg-secondary-blue/50 p-4 rounded-xl">
            <p className="text-2xl md:text-5xl opacity-50">02</p>
            <p className="text-sm md:text-lg">
              Enhanced Search Functionality based on Location and Cause
            </p>
          </div>
          <div className="bg-secondary-blue/80 hover:bg-secondary-blue/50 p-4 rounded-xl">
            <p className="text-2xl md:text-5xl opacity-50">03</p>
            <p className="text-sm md:text-lg">
              Impact Tracking and Visualization for each Donor
            </p>
          </div>
          <div className="bg-secondary-blue/80 hover:bg-secondary-blue/50 p-4 rounded-xl">
            <p className="text-2xl md:text-5xl opacity-50">04</p>
            <p className="text-sm md:text-lg">
              Leaderboard and Recognition System among Donors (Gamification)
            </p>
          </div>
          <div className="bg-secondary-blue/80 hover:bg-secondary-blue/50 p-4 rounded-xl">
            <p className="text-2xl md:text-5xl opacity-50">05</p>
            <p className="textext-sm md:t-lg">
              Transparency and Accountability (History of Donations)
            </p>
          </div>
          <div className="bg-secondary-blue/80 hover:bg-secondary-blue/50 p-4 rounded-xl">
            <p className="text-2xl md:text-5xl opacity-50">06</p>
            <p className="text-sm md:text-lg">
              AI based verification of Charitable Organizations (Future Scope)
            </p>
          </div>
          <div className="bg-secondary-blue/80 hover:bg-secondary-blue/50 p-4 rounded-xl">
            <p className="text-2xl md:text-5xl opacity-50">07</p>
            <p className="text-sm md:text-lg">
              Platform to donate for hospitals, orphanages, old age homes, NGOs,
              etc
            </p>
          </div>
          <div className="bg-secondary-blue/80 hover:bg-secondary-blue/50 p-4 rounded-xl">
            <p className="text-2xl md:text-5xl opacity-50">08</p>
            <p className="text-sm md:text-lg">
              Messaging platform between Donors and Organizations (Future Scope)
            </p>
          </div>
        </div>
      </section>

      {/* <section className="flex flex-col items-center p-10 bg-white mt-0">
        <div className="relative w-full h-80 mb-4">
          <Image
            src={donationImage}
            alt="Donation"
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>

        <div className="bg-gray-100 p-10 mt-0 flex flex-col md:flex-row items-start justify-between">
          <div className="md:w-1/2 pr-10">
            <h1 className="text-4xl font-bold mb-4 text-blue text-center md:text-left">
              Our Solution
            </h1>
            <p className="text-lg mb-6 text-center md:text-left">
              To address this challenge, we propose the development of a
              comprehensive donation platform that seamlessly connects donors
              with charitable organizations in need of support. This platform
              will serve as a central hub for all charitable organizations to
              register and showcase their work, allowing donors to easily
              search, filter, and donate to causes that align with their values.
            </p>
            <ul className="list-none mb-6 text-left">
              <li className="text-lg mb-2">
                01 | Centralized Registration for all Charitable Organizations
              </li>
              <li className="text-lg mb-2">
                02 | Enhanced Search Functionality based on Location and Cause
              </li>
              <li className="text-lg mb-2">
                03 | Impact Tracking and Visualization for each Donor
              </li>
              <li className="text-lg mb-2">
                04 | Leaderboard and Recognition System among Donors
              </li>
              <li className="text-lg mb-2">
                05 | Transparency and Accountability
              </li>
              <li className="text-lg mb-2">
                06 | AI based verification of Charitable Organizations
              </li>
              <li className="text-lg mb-2">
                07 | Platform to donate for hospitals, orphanages, old age
                homes, NGOs, etc
              </li>
            </ul>
            <a href="/signin">
              <button className="bg-blue text-white rounded py-3 px-6 text-lg font-medium hover:bg-blue">
                Donate Now
              </button>
            </a>
          </div>
          <div className="md:w-1/2 mt-10 md:mt-0">
            <Image
              src={solutionImage}
              alt="Solution"
              layout="responsive"
              width={500}
              height={500}
              className="rounded-lg"
            />
          </div>
        </div>
      </section> */}

      <section className="flex flex-col items-center p-10 bg-white mt-0">
        <div className="bg-gray-100 p-10 mt-0 flex flex-col md:flex-row items-start justify-between">
          <div className="pr-10">
            <h1 className="text-4xl font-bold mb-4 text-blue text-center md:text-centre jost">
              Our Impact
            </h1>
            <p className="text-lg mb-6 text-center md:text-centre nunito">
              India and the world have a vast network of orphanages, NGOs,
              hospitals, foundations, and old age homes dedicated to addressing
              various social, economic, and environmental challenges. In 2022,
              global donations reached an estimated $466 billion, with India
              contributing ₹21,000 crore ($2.7 billion). These organizations
              play a crucial role in supporting vulnerable populations and
              fostering community well-being.
            </p>
          </div>
        </div>
        <div className="relative w-full h-80 mb-4">
          <Image
            src={statisticsImage}
            alt="Statistics"
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
      </section>

      {/* <footer className="bg-gray-100 text-center p-6 mt-auto">
        <p>Thank you for your support!</p>
        <p>
          For feedback or to work with us, contact us at{" "}
          <a
            href="mailto:pranav9176@gmail.com"
            className="text-blue hover:underline"
          >
            pranav9176@gmail.com
          </a>
        </p>
      </footer> */}
    </div>
  );
};

export default HomeWithOutLogin;
