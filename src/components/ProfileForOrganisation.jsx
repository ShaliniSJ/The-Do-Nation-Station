import React, { useState } from 'react';
import Image from 'next/image';
import BlueLogo from '../assets/the-do-nation-station-high-resolution-logo.png';
import Router from 'next/router';

// Define your Google Maps API key here
const API_KEY = process.env.GOOGLE_MAP_API_KEY;

const ProfileForOrganisation = ({ islogged }) => {
  // Fake data
  const orgData = {
    name: 'The Do-Nation Station',
    description: "Many orphanages, NGOs, hospitals, foundations, and old age homes have their own websites through which donors make donations in the form of kind and money. But there lacks a central platform through which all orphanages, NGOs, hospitals, foundations, and old age homes can register themselves in the platform and donors can easily donate to the needy based on urgency, location, date, timings, population, and requirements. The platform should also be responsible and transparent by showing the government licenses, audits, details, and photographs of registered orphanages, NGOs, hospitals, foundations, and old age homes. The donors will be able to see how, where, and by whom their money and kind are being utilized. There is also a need to show a leaderboard in specific locations among donors in order to encourage their donation.",
    impacts: '5000+ people',
    type: 'NGO',
    address: 'Chennai Institute of Technology, Sarathy Nagar, Kundrathur, Chennai, Tamil Nadu 600069',
    pastDonations: [
      { id: 1, amount: '$1000', date: '2024-01-15', donor: 'John Doe' },
      { id: 2, amount: '$500', date: '2024-02-20', donor: 'Jane Doe' },
      { id: 3, amount: '$2000', date: '2024-03-10', donor: 'John Doe' },
      { id: 4, amount: '$1000', date: '2024-01-15', donor: 'John Doe' },
      { id: 5, amount: '$500', date: '2024-02-20', donor: 'Jane Doe' },
      { id: 6, amount: '$2000', date: '2024-03-10', donor: 'John Doe' },
      { id: 7, amount: '$1000', date: '2024-01-15', donor: 'John Doe' },
      { id: 8, amount: '$500', date: '2024-02-20', donor: 'Jane Doe' },
      { id: 9, amount: '$2000', date: '2024-03-10', donor: 'John Doe' },
      { id: 10, amount: '$1000', date: '2024-01-15', donor: 'John Doe' },
      { id: 11, amount: '$500', date: '2024-02-20', donor: 'Jane Doe' },
      { id: 12, amount: '$2000', date: '2024-03-10', donor: 'John Doe' },
      { id: 13, amount: '$1000', date: '2024-01-15', donor: 'John Doe' },
      { id: 14, amount: '$500', date: '2024-02-20', donor: 'Jane Doe' },
      { id: 15, amount: '$2000', date: '2024-03-10', donor: 'John Doe' },
    ],
    currentNeeds: [
      { id: 1, amount: '$1000', date: '2024-01-15' },
      { id: 2, amount: '$500', date: '2024-02-20' },
      { id: 3, amount: '$2000', date: '2024-03-10' },
      { id: 4, amount: '$1000', date: '2024-01-15' },
      { id: 5, amount: '$500', date: '2024-02-20' },
      { id: 6, amount: '$2000', date: '2024-03-10' },
      { id: 7, amount: '$1000', date: '2024-01-15' },
      { id: 8, amount: '$500', date: '2024-02-20' },
      { id: 9, amount: '$2000', date: '2024-03-10' },
      { id: 10, amount: '$1000', date: '2024-01-15' },
      { id: 11, amount: '$500', date: '2024-02-20' },
      { id: 12, amount: '$2000', date: '2024-03-10' },
      { id: 13, amount: '$1000', date: '2024-01-15' },
      { id: 14, amount: '$500', date: '2024-02-20' },
      { id: 15, amount: '$2000', date: '2024-03-10' },
    ],
    mapLink: 'https://maps.app.goo.gl/X9yj6RURE2A6zNLr7',
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [currentNeedsPage, setCurrentNeedsPage] = useState(1);
  const donationsPerPage = 10;
  const NeedsPerPage = 10;
  const totalDonations = orgData.pastDonations.length;
  const totalPages = Math.ceil(totalDonations / donationsPerPage);
  const totalNeeds = orgData.currentNeeds.length;
  const totalNeedsPages = Math.ceil(totalNeeds / NeedsPerPage);
  

  const handleAddNeeds = () => {
    // Add logic for handling "Add Needs"
    alert('Redirect to Needs page for adding needs?');
    Router.push('/needs');
  };

  const handleEditDetails = () => {
    // Add logic for handling "Edit Details"
    alert('Edit Details button clicked');
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleNeedsPageChange = (pageNumber) => {
    setCurrentNeedsPage(pageNumber);
  };

  // Calculate the current page's donations
  const indexOfLastDonation = currentPage * donationsPerPage;
  const indexOfFirstDonation = indexOfLastDonation - donationsPerPage;
  const indexOfLastNeeds = currentNeedsPage * NeedsPerPage;
  const indexOfFirstNeeds = indexOfLastNeeds - NeedsPerPage;
  const currentDonations = orgData.pastDonations.slice(indexOfFirstDonation, indexOfLastDonation);
  const currentNeeds = orgData.currentNeeds.slice(indexOfFirstNeeds, indexOfLastNeeds);

  // Encode the address for use in the URL
  const encodedAddress = encodeURIComponent(orgData.address);
  const mapEmbedLink = `https://www.google.com/maps/embed/v1/place?key=${API_KEY}&q=${encodedAddress}`;

  return (
    <div className="min-h-screen bg-white text-dark-blue p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <Image src={BlueLogo} alt="Organization Logo" width={400} height={400} />
          <div className="ml-4">
            <h1 className="text-3xl font-bold">{orgData.name}</h1>
            <p><strong>Description:</strong> {orgData.description}</p>
            <p><strong>Impacts:</strong> {orgData.impacts}</p>
            <p><strong>Type:</strong> {orgData.type}</p>
            <p><strong>Address:</strong> {orgData.address}</p>
          </div>
        </div>
        {islogged && (
          <div>
            <button
              onClick={handleAddNeeds}
              className="bg-blue text-white font-bold py-2 px-4 rounded m-2 hover:bg-dark-blue-700"
            >
              ADD NEEDS
            </button>
            <button
              onClick={handleEditDetails}
              className="bg-blue text-white font-bold py-2 px-4 rounded m-2 hover:bg-dark-blue-700"
            >
              EDIT DETAILS
            </button>
          </div>
        )}
      </div>
      <div>
        <h2 className="text-2xl font-semibold mb-4">The Current Needs</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-dark-blue text-white">
                <th className="py-2 px-4 border-b">ID</th>
                <th className="py-2 px-4 border-b">Amount</th>
                <th className="py-2 px-4 border-b">Date</th>
              </tr>
            </thead>
            <tbody>
              {currentNeeds.map((need) => (
                <tr key={need.id}>
                  <td className="py-2 px-4 border-b">{need.id}</td>
                  <td className="py-2 px-4 border-b">{need.amount}</td>
                  <td className="py-2 px-4 border-b">{need.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-between mt-4">
          <button
            onClick={() => handleNeedsPageChange(currentNeedsPage - 1)}
            disabled={currentNeedsPage === 1}
            className="bg-blue text-white py-2 px-4 rounded hover:bg-dark-blue-700"
          >
            Previous
          </button>
          <span>Page {currentNeedsPage} of {totalNeedsPages}</span>
          <button
            onClick={() => handleNeedsPageChange(currentNeedsPage + 1)}
            disabled={currentNeedsPage === totalNeedsPages}
            className="bg-blue text-white py-2 px-4 rounded hover:bg-dark-blue-700"
          >
            Next
          </button>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Past Donations</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-dark-blue text-white">
                <th className="py-2 px-4 border-b">ID</th>
                <th className="py-2 px-4 border-b">Amount</th>
                <th className="py-2 px-4 border-b">Date</th>
                <th className="py-2 px-4 border-b">Donor</th>
              </tr>
            </thead>
            <tbody>
              {currentDonations.map((donation) => (
                <tr key={donation.id}>
                  <td className="py-2 px-4 border-b">{donation.id}</td>
                  <td className="py-2 px-4 border-b">{donation.amount}</td>
                  <td className="py-2 px-4 border-b">{donation.date}</td>
                  <td className="py-2 px-4 border-b">{donation.donor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-between mt-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="bg-blue text-white py-2 px-4 rounded hover:bg-dark-blue-700"
          >
            Previous
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="bg-blue text-white py-2 px-4 rounded hover:bg-dark-blue-700"
          >
            Next
          </button>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-semibold">Location</h2>
        <div className="flex-grow flex justify-center">
            <a href={orgData.mapLink} target="_blank" rel="noopener noreferrer">
            <button className="bg-blue text-white font-semibold mb-5 py-2 px-4 rounded hover:bg-blue-700">
                Click here to view on Google Maps
            </button>
            </a>
        </div>  
        <iframe
          title="Google Map"
          width="100%"
          height="450"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          src={mapEmbedLink}
        ></iframe>
      </div>
    </div>
  );
};

export default ProfileForOrganisation;