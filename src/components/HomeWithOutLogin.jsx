import React from 'react';
import Image from 'next/image';
import donationImage from '../assets/donation-image.jpg';
import solutionImage from '../assets/the-do-nation-station-high-resolution-logo.png';
import statisticsImage from '../assets/statistics.png';

const HomeWithOutLogin = () => {
  return (
    <div>
      <header className="bg-gray-100 text-center p-10">
        <h1 className="text-4xl font-bold mb-4 text-blue">Why do we exist?</h1>
        <p className="text-lg text-blue">
          Many orphanages, NGOs, hospitals, foundations, and old age homes have their own websites through which donors make donations in the form of kind and money.
          But there lacks a central platform through which all orphanages, NGOs, hospitals, foundations, and old age homes can register themselves in the platform and donors can easily donate to the needy based on urgency, location, date, timings, population, and requirements.
          The platform should also be responsible and transparent by showing the government licenses, audits, details, and photographs of registered orphanages, NGOs, hospitals, foundations, and old age homes.
          The donors will be able to see how, where, and by whom their money and kind are being utilized. There is also a need to show a leaderboard in specific locations among donors in order to encourage their donation.
        </p>
        <button className="bg-blue text-white rounded py-3 mt-4 px-6 text-lg font-medium hover:bg-blue">Login to Donate or to Get Donations</button>
      </header>
      <section className="flex flex-col items-center p-10 bg-white mt-0">
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
            <h1 className="text-4xl font-bold mb-4 text-blue text-center md:text-left">Our Solution</h1>
            <p className="text-lg mb-6 text-center md:text-left">To address this challenge, we propose the development of a comprehensive donation platform that seamlessly connects donors with charitable organizations in need of support. This platform will serve as a central hub for all charitable organizations to register and showcase their work, allowing donors to easily search, filter, and donate to causes that align with their values.</p>
            <ul className="list-none mb-6 text-left">
              <li className="text-lg mb-2">01    |    Centralized Registration for all Charitable Organizations</li>
              <li className="text-lg mb-2">02    |    Enhanced Search Functionality based on Location and Cause</li>
              <li className="text-lg mb-2">03    |    Impact Tracking and Visualization for each Donor</li>
              <li className="text-lg mb-2">04    |    Leaderboard and Recognition System among Donors</li>
              <li className="text-lg mb-2">05    |    Transparency and Accountability</li>
              <li className="text-lg mb-2">06    |    AI based verification of Charitable Organizations</li>  
              <li className="text-lg mb-2">07    |    Platform to donate for hospitals, orphanages, old age homes, NGOs, etc</li>
            </ul>
            <button className="bg-blue text-white rounded py-3 px-6 text-lg font-medium hover:bg-blue">Donate Now</button>
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
      </section>

      <section className="flex flex-col items-center p-10 bg-white mt-0">
        <div className="bg-gray-100 p-10 mt-0 flex flex-col md:flex-row items-start justify-between">
          <div className="pr-10">
            <h1 className="text-4xl font-bold mb-4 text-blue text-center md:text-centre">Our Impact</h1>
            <p className="text-lg mb-6 text-center md:text-centre">
              India and the world have a vast network of orphanages, NGOs, hospitals, foundations, and old age homes dedicated to addressing various social, economic, and environmental challenges. 
              In 2022, global donations reached an estimated $466 billion, with India contributing ₹21,000 crore ($2.7 billion). 
              These organizations play a crucial role in supporting vulnerable populations and fostering community well-being.
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

      <footer className="bg-gray-100 text-center p-6 mt-auto">
        <p>Thank you for your support!</p>
        <p>For feedback or to work with us, contact us at <a href="mailto:pranav9176@gmail.com" className="text-blue hover:underline">pranav9176@gmail.com</a></p>
      </footer>
    </div>
  );
}

export default HomeWithOutLogin;