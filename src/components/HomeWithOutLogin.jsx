import React from 'react';
import Image from 'next/image';
import donationImage from '../assets/donation-image.jpg';

const HomeWithOutLogin = () => {
  return (
    <div className="mt-20 p-4">
      <header className="bg-gray-100 text-center p-20">
        <h1 className="text-4xl font-bold mb-4 text-blue">Why do we exist?</h1>
        <p className="text-lg text-blue">
          Many orphanages, NGOs, hospitals, foundations and old age homes have their own website through which donors make donations in form of kind and money. 
          But there lack a central platform through which all orphanages, NGOs, hospitals, foundations and old age homes can register themselves in the platform and donors can easily donate to needy based on urgency, location, date, timings, population and requirements. 
          The platform should also be responsible and transparent by showing the government licenses, audits, details and photographs of registered orphanages, NGOs, hospitals, foundations and old age homes.
          The donors will be able to see how, where and by whom their money and kind is being utilized. There is also a need to show leaderboard in specific locations among donors in order to encourage their donation.
        </p>
      </header>
      <section className="flex flex-col items-center p-10 bg-white">
        <div className="relative w-full h-80 mb-6">
          <Image
            src={donationImage}
            alt="Donation"
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
        
        <div className="bg-gray-100 text-center p-20">
          <h1 className="text-4xl font-bold mb-4 text-blue">Our Solution</h1>
          <p className="text-lg mb-6">To address this challenge, we propose the development of a comprehensive donation platform that seamlessly connects donors with charitable organizations in need of support. This platform will serve as a central hub for all charitable organizations to register and showcase their work, allowing donors to easily search, filter, and donate to causes that align with their values.</p>
          <ul className="list-none mb-6">
            <li className="text-lg mb-2">01    |    Centralized Registration for all Charitable Organizations</li>
            <li className="text-lg mb-2">02    |    Enhanced Search Functionality based on Location and Cause</li>
            <li className="text-lg mb-2">03    |    Impact Tracking and Visualization for each Donor</li>
            <li className="text-lg mb-2">04    |    Leaderboard and Recognition System among Donors</li>
            <li className="text-lg mb-2">05    |    Transparency and Accountability</li>
          </ul>
          <button className="bg-blue text-white rounded py-3 px-6 text-lg font-medium hover:bg-blue">Donate Now</button>
        </div>
      </section>

      <footer className="bg-gray-100 text-center p-6 mt-auto">
        <p>Thank you for your support!</p>
        <p>For more information, contact us at <a href="mailto:pranav9176@gmail.com" className="text-blue hover:underline">support@donations.org</a></p>
      </footer>
    </div>
  );
}

export default HomeWithOutLogin;