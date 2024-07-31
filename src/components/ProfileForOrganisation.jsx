import React, { useEffect, useState } from "react";
import Image from "next/image";
import BlueLogo from "../assets/the-do-nation-station-high-resolution-logo.png";
import Router from "next/router";
import { router } from "next/router";
import { getCurrentUser, getNeeds, getPastDonations } from "../lib/appwrite";

// Define your Google Maps API key here
const API_KEY = process.env.GOOGLE_MAP_API_KEY;

const ProfileForOrganisation = ({ islogged }) => {
  const [NeedDetails, setNeedDetails] = useState([]);
  const [DonationDetails, setDonationDetails] = useState([]);
  const [User, setUser] = useState([]);
  // Fake data
  const orgDat = {
    name: "",
    description: "",
    impacts: "",
    type: "",
    address: "",
    pastDonations: [],
    currentNeeds: [],
    mapLink: "",
    gallery: [],
  };
  const [currentPage, setCurrentPage] = useState(1);
  const [currentNeedsPage, setCurrentNeedsPage] = useState(1);
  const [editingNeed, setEditingNeed] = useState(null);
  const [needs, setNeeds] = useState(orgDat.currentNeeds);
  const [orgData, setOrgData] = useState(orgDat);
  const [pastDonation,setPastDonation]=useState([]);
  useEffect(async () => {
    // for needs
    // console.log(await getNeeds());
    setNeedDetails(await getNeeds());
    // for donations
    // console.log(await getPastDonations());
    setDonationDetails(await getPastDonations());
    // for organisation details
    // since it is organisation the parameter is false
    // console.log(await getCurrentUser(false));
    setUser(await getCurrentUser(false));
  }, []);
  useEffect(() => {
    setOrgData({
      name: User.organisation_name,
      description: User.description,
      impacts: User.impact,
      type: User.type,
      address: User.address,
      pastDonations: DonationDetails,
      currentNeeds: NeedDetails,
      mapLink: User.location,
      gallery: [{ id: 1, src: User.photos, alt: "Image 1" }],
    });
  }, [User]);
  useEffect(()=>{
    // console.log(orgData, User);
    setNeeds(orgData.currentNeeds)
    // console.log(needs)
    setPastDonation(orgData.pastDonations)
    // console.log(pastDonation)
    console.log(orgData.gallery)
  },[orgData,User])
  
  console.log(needs)
  const donationsPerPage = 10;
  const NeedsPerPage = 10;
  const totalDonations = orgData.pastDonations.length;
  const totalPages = Math.ceil(totalDonations / donationsPerPage);
  const totalNeeds = needs.length;
  const totalNeedsPages = Math.ceil(totalNeeds / NeedsPerPage);

  const handleAddNeeds = () => {
    alert("Redirect to Needs page for adding needs?");
    Router.push("/needs");
  };

  const handleEditDetails = () => {
    router.push("/orgdetails");
    // alert('Edit Details button clicked');
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleNeedsPageChange = (pageNumber) => {
    setCurrentNeedsPage(pageNumber);
  };

  const handleEditNeed = (need) => {
    setEditingNeed(need);
  };

  const handleCompleteNeed = (needId) => {
    setNeeds(needs.filter((need) => need.id !== needId));
  };

  const handleSaveEdit = () => {
    // Update logic here
    setEditingNeed(null);
  };

  const handleCancelEdit = () => {
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
                    {need.total_amt}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {need.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleEditNeed(need)}
                      className="bg-blue text-white py-1 px-3 rounded hover:bg-blue-700 mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleCompleteNeed(need.id)}
                      className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-700"
                    >
                      Complete
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
            
              {DonationDetails.map((donation) => (
                <tr key={donation.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {donation.donation_amt}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {donation.updated_at}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {donation.donor_id}
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
      {/* <div className="mt-8">
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
      </div> */}

      {/* Edit Popup*/}
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
                onClick={handleSaveEdit}
                className="bg-blue text-white py-2 px-4 rounded hover:bg-blue-700"
              >
                Save
              </button>
              <button
                onClick={handleCancelEdit}
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

export default ProfileForOrganisation;

// const orgDat = {
//   name: "The Do-Nation Station",
//   description:
//     "Many orphanages, NGOs, hospitals, foundations, and old age homes have their own websites through which donors make donations in the form of kind and money. But there lacks a central platform through which all orphanages, NGOs, hospitals, foundations, and old age homes can register themselves in the platform and donors can easily donate to the needy based on urgency, location, date, timings, population, and requirements. The platform should also be responsible and transparent by showing the government licenses, audits, details, and photographs of registered orphanages, NGOs, hospitals, foundations, and old age homes. The donors will be able to see how, where, and by whom their money and kind are being utilized. There is also a need to show a leaderboard in specific locations among donors in order to encourage their donation.",
//   impacts: "5000+ people",
//   type: "NGO",
//   address:
//     "Chennai Institute of Technology, Sarathy Nagar, Kundrathur, Chennai, Tamil Nadu 600069",
//   pastDonations: [
//     { id: 1, amount: "$1000", date: "2024-01-15", donor: "John Doe" },
//     { id: 2, amount: "$500", date: "2024-02-20", donor: "Jane Doe" },
//     { id: 3, amount: "$2000", date: "2024-03-10", donor: "John Doe" },
//     { id: 4, amount: "$1000", date: "2024-01-15", donor: "John Doe" },
//     { id: 5, amount: "$500", date: "2024-02-20", donor: "Jane Doe" },
//     { id: 6, amount: "$2000", date: "2024-03-10", donor: "John Doe" },
//     { id: 7, amount: "$1000", date: "2024-01-15", donor: "John Doe" },
//     { id: 8, amount: "$500", date: "2024-02-20", donor: "Jane Doe" },
//     { id: 9, amount: "$2000", date: "2024-03-10", donor: "John Doe" },
//     { id: 10, amount: "$1000", date: "2024-01-15", donor: "John Doe" },
//     { id: 11, amount: "$500", date: "2024-02-20", donor: "Jane Doe" },
//     { id: 12, amount: "$2000", date: "2024-03-10", donor: "John Doe" },
//     { id: 13, amount: "$1000", date: "2024-01-15", donor: "John Doe" },
//     { id: 14, amount: "$500", date: "2024-02-20", donor: "Jane Doe" },
//     { id: 15, amount: "$2000", date: "2024-03-10", donor: "John Doe" },
//   ],
//   currentNeeds: [
//     { id: 1, amount: "$1000", date: "2024-01-15" },
//     { id: 2, amount: "$500", date: "2024-02-20" },
//     { id: 3, amount: "$2000", date: "2024-03-10" },
//     { id: 4, amount: "$1000", date: "2024-01-15" },
//     { id: 5, amount: "$500", date: "2024-02-20" },
//     { id: 6, amount: "$2000", date: "2024-03-10" },
//     { id: 7, amount: "$1000", date: "2024-01-15" },
//     { id: 8, amount: "$500", date: "2024-02-20" },
//     { id: 9, amount: "$2000", date: "2024-03-10" },
//     { id: 10, amount: "$1000", date: "2024-01-15" },
//     { id: 11, amount: "$500", date: "2024-02-20" },
//     { id: 12, amount: "$2000", date: "2024-03-10" },
//     { id: 13, amount: "$1000", date: "2024-01-15" },
//     { id: 14, amount: "$500", date: "2024-02-20" },
//     { id: 15, amount: "$2000", date: "2024-03-10" },
//   ],
//   mapLink: "https://maps.app.goo.gl/X9yj6RURE2A6zNLr7",
//   gallery: [
//     { id: 1, src: "/path-to-image1.jpg", alt: "Image 1" },
//     { id: 2, src: "/path-to-image2.jpg", alt: "Image 2" },
//     { id: 3, src: "/path-to-image3.jpg", alt: "Image 3" },
//   ],
// };
