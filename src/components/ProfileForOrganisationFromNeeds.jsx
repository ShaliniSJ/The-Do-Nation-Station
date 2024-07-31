import React, { useEffect, useState } from "react";
import Image from "next/image";
import BlueLogo from "../assets/the-do-nation-station-high-resolution-logo.png";
import { getOrganisationUser, getNeeds, getPastDonations } from "../lib/appwrite";

// Define your Google Maps API key here
const API_KEY = process.env.GOOGLE_MAP_API_KEY;

const ProfileForOrganisationFromNeeds = () => {
  const [NeedDetails, setNeedDetails] = useState([]);
  const [DonationDetails, setDonationDetails] = useState([]);
  const [User, setUser] = useState(null); // Changed from array to null initially
  const [orgData, setOrgData] = useState({
    name: "",
    description: "",
    impacts: "",
    type: "",
    address: "",
    pastDonations: [],
    currentNeeds: [],
    mapLink: "",
    gallery: [],
  });
  const [needs, setNeeds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentNeedsPage, setCurrentNeedsPage] = useState(1);
  const [editingNeed, setEditingNeed] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const url = new URL(window.location.href);
      const userId = url.pathname.split('/').pop();
      
      // Ensure userId is not empty or undefined
      if (userId) {
        const fetchedNeeds = await getNeeds();
        const fetchedDonations = await getPastDonations();
        const fetchedUser = await getOrganisationUser(userId);

        setNeedDetails(fetchedNeeds);
        setDonationDetails(fetchedDonations);
        setUser(fetchedUser);

        // Update orgData after fetching the user data
        setOrgData({
          name: fetchedUser.organisation_name || "",
          description: fetchedUser.description || "",
          impacts: '0+ people',
          type: 'NGO',
          address: fetchedUser.address || "",
          pastDonations: fetchedDonations,
          currentNeeds: fetchedNeeds,
          mapLink: fetchedUser.location || "",
          gallery: [
            { id: 1, src: fetchedUser.photos || "", alt: "Image 1" },
          ],
        });

        setNeeds(fetchedNeeds);
      }
    };

    fetchData();
  }, []);

  const donationsPerPage = 10;
  const NeedsPerPage = 10;
  const totalDonations = orgData.pastDonations.length;
  const totalPages = Math.ceil(totalDonations / donationsPerPage);
  const totalNeeds = needs.length;
  const totalNeedsPages = Math.ceil(totalNeeds / NeedsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleNeedsPageChange = (pageNumber) => {
    setCurrentNeedsPage(pageNumber);
  };

  const handleDonate = () => {
    setEditingNeed(null);
  };

  const handleSaveDonate = () => {
    // Update logic here
    setEditingNeed(null);
  };

  const handleCancelDonate = () => {
    setEditingNeed(null);
  };

  const indexOfLastDonation = currentPage * donationsPerPage;
  const indexOfFirstDonation = indexOfLastDonation - donationsPerPage;
  const indexOfLastNeeds = currentNeedsPage * NeedsPerPage;
  const indexOfFirstNeeds = indexOfLastNeeds - NeedsPerPage;
  const currentDonations = orgData.pastDonations.slice(
    indexOfFirstDonation,
    indexOfLastDonation
  );
  const currentNeeds = needs.slice(indexOfFirstNeeds, indexOfLastNeeds);

  const encodedAddress = encodeURIComponent(orgData.address);
  const mapEmbedLink = `https://www.google.com/maps/embed/v1/place?key=${API_KEY}&q=${encodedAddress}`;

  return (
    <div className="min-h-screen bg-white text-dark-blue p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <Image
            src={BlueLogo}
            alt="Organization Logo"
            width={400}
            height={400}
          />
          <div className="ml-4">
            <h1 className="text-3xl font-bold">{orgData.name}</h1>
            <p>
              <strong>Description:</strong> {orgData.description}
            </p>
            <p>
              <strong>Impacts:</strong> {orgData.impacts}
            </p>
            <p>
              <strong>Type:</strong> {orgData.type}
            </p>
            <p>
              <strong>Address:</strong> {orgData.address}
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">The Current Needs</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {currentNeeds.map((need) => (
                <tr key={need.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {need.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {need.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleDonate()}
                      className="bg-blue text-white py-1 px-3 rounded hover:bg-blue-700 mr-2"
                    >
                      Donate
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex justify-between">
          <button
            disabled={currentNeedsPage === 1}
            onClick={() => handleNeedsPageChange(currentNeedsPage - 1)}
            className="bg-blue text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Previous
          </button>
          <span className="text-gray-700">
            Page {currentNeedsPage} of {totalNeedsPages}
          </span>
          <button
            disabled={currentNeedsPage === totalNeedsPages}
            onClick={() => handleNeedsPageChange(currentNeedsPage + 1)}
            className="bg-blue text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Next
          </button>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold">Past Donations</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Donor
                </th>
              </tr>
            </thead>
            <tbody>
              {currentDonations.map((donation) => (
                <tr key={donation.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {donation.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {donation.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {donation.donor}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex justify-between">
          <button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
            className="bg-blue text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Previous
          </button>
          <span className="text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
            className="bg-blue text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Next
          </button>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Location</h2>
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

      {/* Gallery Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Gallery</h2>
        <div className="flex flex-wrap">
          {orgData.gallery.map((image) => (
            <div key={image.id} className="w-1/3 p-2">
              <Image
                src={image.src}
                alt={image.alt}
                width={400}
                height={300}
                layout="responsive"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Edit Popup */}
      {editingNeed && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded shadow-lg">
            <h3 className="text-xl mb-2">Edit Need</h3>
            <div>
              <label className="block mb-2">Amount</label>
              <input
                type="text"
                defaultValue={editingNeed.amount}
                className="border p-2 w-full"
                onChange={(e) =>
                  setEditingNeed({ ...editingNeed, amount: e.target.value })
                }
              />
              <label className="block mb-2 mt-2">Date</label>
              <input
                type="text"
                defaultValue={editingNeed.date}
                className="border p-2 w-full"
                onChange={(e) =>
                  setEditingNeed({ ...editingNeed, date: e.target.value })
                }
              />
            </div>
            <div className="mt-4">
              <button
                onClick={handleSaveDonate}
                className="bg-blue text-white py-2 px-4 rounded hover:bg-blue-700"
              >
                Save
              </button>
              <button
                onClick={handleCancelDonate}
                className="bg-red-500 text-white py-2 px-4 rounded ml-2 hover:bg-red-700"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileForOrganisationFromNeeds;
