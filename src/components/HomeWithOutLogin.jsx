import React from 'react';
import Image from 'next/image';
import donationImage from '../assets/donation-image.jpg';

const HomeWithOutLogin = () => {
  return (
    <div className="mt-20 p-4">
      <header className="bg-gray-100 text-center p-20">
        <h1 className="text-4xl font-bold mb-4 text-blue">Support Our Cause</h1>
        <p className="text-lg text-blue">Your contribution can make a big difference. Help us make the world a better place.</p>
      </header>

      <section className="flex flex-col items-center p-10 bg-white">
        <div className="relative w-full h-80 mb-6">
          <Image
            src={donationImage} // Replace with your image path
            alt="Donation"
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
        
        <div className="max-w-3xl text-center">
          <h2 className="text-3xl font-semibold mb-4">How Your Donations Help</h2>
          <p className="text-lg mb-6">Your donations help us provide essential services and support to those in need. Here's how your contributions make a difference:</p>
          <ul className="list-none mb-6">
            <li className="text-lg mb-2">Food and Shelter</li>
            <li className="text-lg mb-2">Medical Assistance</li>
            <li className="text-lg mb-2">Education and Training</li>
            <li className="text-lg mb-2">Community Development</li>
          </ul>
          <button className="bg-blue text-white rounded py-3 px-6 text-lg font-medium hover:bg-blue-600">Donate Now</button>
        </div>
      </section>

      <footer className="bg-gray-100 text-center p-6 mt-auto">
        <p>Thank you for your support!</p>
        <p>For more information, contact us at <a href="mailto:support@donations.org" className="text-blue-500 hover:underline">support@donations.org</a></p>
      </footer>
    </div>
  );
}

export default HomeWithOutLogin;