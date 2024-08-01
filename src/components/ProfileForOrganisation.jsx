import React, { useEffect, useState } from "react";
import Image from "next/image";
import BlueLogo from "../assets/the-do-nation-station-high-resolution-logo.png";
import Router from "next/router";
import { router } from "next/router";
import { getCurrentUser, getNeeds, getPastDonations } from "../lib/appwrite";

// Define your Google Maps API key here
const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY;

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
  const [pastDonation, setPastDonation] = useState([]);
  
  useEffect(() => {
    async function fetchData() {
      try {
        const [needs, donations, user] = await Promise.all([
          getNeeds(),
          getPastDonations(),
          getCurrentUser(false),
        ]);
        
        setNeedDetails(needs);
        setDonationDetails(donations);
        setUser(user);
        
        setOrgData({
          name: user.organisation_name,
          description: user.description,
          impacts: user.impact,
          type: user.type,
          address: user.address,
          pastDonations: donations,
          currentNeeds: needs,
          mapLink: user.location,
          gallery: [{ id: 1, src: user.photos, alt: "Image 1" }],
        });
        
        setNeeds(needs);
        setPastDonation(donations);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    
    fetchData();
  }, []);
  
  const formatDate = (dateString) => {
    console.log(dateString);
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit', 
      timeZoneName: 'short' 
    };
    return new Date(dateString).toLocaleString('en-US', options);
  };

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
  console.log(currentNeeds);
  return (
    // <div className="min-h-screen bg-white text-dark-blue p-6">
    //   <div className="flex justify-between items-center mb-6">
    //     <div className="flex items-center">
    //       <Image
    //         src={BlueLogo}
    //         alt="Organization Logo"
    //         width={400}
    //         height={400}
    //       />
    //       <div className="ml-4">
    //         <h1 className="text-3xl font-bold">{orgData.name}</h1>
    //         <p>
    //           <strong>Description:</strong> {orgData.description}
    //         </p>
    //         <p>
    //           <strong>Impacts:</strong> {orgData.impacts}
    //         </p>
    //         <p>
    //           <strong>Type:</strong> {orgData.type}
    //         </p>
    //         <p>
    //           <strong>Address:</strong> {orgData.address}
    //         </p>
    //       </div>
    //     </div>
    //     {islogged && (
    //       <div>
    //         <button
    //           onClick={handleAddNeeds}
    //           className="bg-blue text-white font-bold py-2 px-4 rounded m-2 hover:bg-dark-blue-700"
    //         >
    //           ADD NEEDS
    //         </button>
    //         <button
    //           onClick={handleEditDetails}
    //           className="bg-blue text-white font-bold py-2 px-4 rounded m-2 hover:bg-dark-blue-700"
    //         >
    //           EDIT DETAILS
    //         </button>
    //       </div>
    //     )}
    //   </div>
    <div className="min-h-screen bg-white text-dark-blue p-6">
      <div className="flex justify-between items-center mb-6 bg-secondary-blue/50 rounded-3xl">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <Image
            className="rounded-l-3xl"
            src={BlueLogo}
            alt="Organization Logo"
            width={400}
            height={400}
          />
          <div className="flex flex-col p-4 gap-2 jost md:text-xl md:ml-4">
            <h2 className="text-3xl md:text-6xl capitalize font-bold">
              {orgData.name}
            </h2>
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
          {islogged && (
            <div className="flex flex-col gap-4 p-8 w-1/4">
              <button
                onClick={handleAddNeeds}
                className="bg-blue text-white rounded-full py-2 px-4 enabled:hover:bg-blue-700 disabled:opacity-20"
              >
                ADD NEEDS
              </button>
              <button
                onClick={handleEditDetails}
                className="bg-blue text-white rounded-full py-2 px-4 enabled:hover:bg-blue-700 disabled:opacity-20"
              >
                EDIT DETAILS
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col mt-8 md:mt-20">
        <h2 className="text-2xl md:text-4xl jost font-semibold mb-4">
          The Current Needs
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs md:text-base font-medium text-primary-blue/80 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs md:text-base font-medium text-primary-blue/80 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs md:text-base font-medium text-primary-blue/80 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {currentNeeds.map((need) => (
                
                <tr key={need.id} className="even:bg-secondary-blue/20">
                  <td className="px-6 py-4 whitespace-nowrap text-sm md:text-base font-medium text-black/80">
                    {need.total_amt}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm md:text-base text-black/80">
                    {formatDate(need.date)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 px-3 flex justify-between">
          <button
            disabled={currentNeedsPage === 1}
            onClick={() => handleNeedsPageChange(currentNeedsPage - 1)}
            className="bg-blue text-white rounded-full py-2 px-4 enabled:hover:bg-blue-700 disabled:opacity-20"
          >
            Previous
          </button>
          <span className="text-black/80">
            Page {currentNeedsPage} of {totalNeedsPages}
          </span>
          <button
            disabled={currentNeedsPage === totalNeedsPages}
            onClick={() => handleNeedsPageChange(currentNeedsPage + 1)}
            className="bg-blue text-white rounded-full py-2 px-4 enabled:hover:bg-blue-700 disabled:opacity-20"
          >
            Next
          </button>
        </div>
      </div>

      <div className="mt-8 md:mt-20">
        <h2 className="text-2xl md:text-4xl jost font-semibold mb-4">
          Past Donations
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs md:text-base font-medium text-primary-blue/80 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs md:text-base font-medium text-primary-blue/80 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs md:text-base font-medium text-primary-blue/80 uppercase tracking-wider">
                  Donor
                </th>
              </tr>
            </thead>
            <tbody>
              {currentDonations.map((donation) => (
                <tr key={donation.id} className="even:bg-secondary-blue/20">
                  <td className="px-6 py-4 whitespace-nowrap text-sm md:text-base font-medium text-black/80">
                    {donation.total_amt}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm md:text-base text-black/80">
                    {donation.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm md:text-base text-black/80">
                    {donation.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 px-3 flex justify-between">
          <button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
            className="bg-blue text-white rounded-full py-2 px-4 enabled:hover:bg-blue-700 disabled:opacity-20"
          >
            Previous
          </button>
          <span className="text-black/80">
            Page {currentPage} of {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
            className="bg-blue text-white rounded-full py-2 px-4 enabled:hover:bg-blue-700 disabled:opacity-20"
          >
            Next
          </button>
        </div>
      </div>

      <div className="mt-8 md:mt-20 flex flex-col gap-4">
        <h2 className="text-2xl md:text-4xl jost font-semibold mb-4">
          Location
        </h2>
        <iframe
          title="Google Map"
          width="100%"
          height="450"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          src={mapEmbedLink}
        ></iframe>
        <div className="flex-grow flex justify-center">
          <a href={orgData.mapLink} target="_blank" rel="noopener noreferrer">
            <button className="bg-blue text-white rounded-full py-2 px-4 enabled:hover:bg-blue-700 disabled:opacity-20">
              Get Directions in Google Maps
            </button>
          </a>
        </div>
      </div>

      {/* Gallery Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Gallery</h2>
        <div className="flex flex-wrap">
          {orgData.gallery.map((image) => {
            return (
              <div key={image.id} className="w-1/3 p-2">
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={400}
                  height={300}
                  layout="responsive"
                />
              </div>
            );
          })}
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
//       <div>
//         <h2 className="text-2xl font-semibold mb-4">The Current Needs</h2>
//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead>
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Amount
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Date
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {currentNeeds.map((need) => (
//                 <tr key={need.id}>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                     {need.total_amt}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     {need.date}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                     <button
//                       onClick={() => handleEditNeed(need)}
//                       className="bg-blue text-white py-1 px-3 rounded hover:bg-blue-700 mr-2"
//                     >
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => handleCompleteNeed(need.id)}
//                       className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-700"
//                     >
//                       Complete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//         <div className="mt-4 flex justify-between">
//           <button
//             disabled={currentNeedsPage === 1}
//             onClick={() => handleNeedsPageChange(currentNeedsPage - 1)}
//             className="bg-blue text-white py-2 px-4 rounded hover:bg-blue-700"
//           >
//             Previous
//           </button>
//           <span className="text-gray-700">
//             Page {currentNeedsPage} of {totalNeedsPages}
//           </span>
//           <button
//             disabled={currentNeedsPage === totalNeedsPages}
//             onClick={() => handleNeedsPageChange(currentNeedsPage + 1)}
//             className="bg-blue text-white py-2 px-4 rounded hover:bg-blue-700"
//           >
//             Next
//           </button>
//         </div>
//       </div>

//       <div className="mt-8">
//         <h2 className="text-2xl font-semibold">Past Donations</h2>
//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead>
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Amount
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Date
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Donor
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {DonationDetails.map((donation) => (
//                 <tr key={donation.id}>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                     {donation.donation_amt}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     {donation.updated_at}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     {donation.donor_id}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//         <div className="mt-4 flex justify-between">
//           <button
//             disabled={currentPage === 1}
//             onClick={() => handlePageChange(currentPage - 1)}
//             className="bg-blue text-white py-2 px-4 rounded hover:bg-blue-700"
//           >
//             Previous
//           </button>
//           <span className="text-gray-700">
//             Page {currentPage} of {totalPages}
//           </span>
//           <button
//             disabled={currentPage === totalPages}
//             onClick={() => handlePageChange(currentPage + 1)}
//             className="bg-blue text-white py-2 px-4 rounded hover:bg-blue-700"
//           >
//             Next
//           </button>
//         </div>
//       </div>

//       <div className="mt-8">
//         <h2 className="text-2xl font-semibold mb-4">Location</h2>
//         <div className="flex-grow flex justify-center">
//           <a href={orgData.mapLink} target="_blank" rel="noopener noreferrer">
//             <button className="bg-blue text-white font-semibold mb-5 py-2 px-4 rounded hover:bg-blue-700">
//               Click here to view on Google Maps
//             </button>
//           </a>
//         </div>
//         <iframe
//           title="Google Map"
//           width="100%"
//           height="450"
//           style={{ border: 0 }}
//           loading="lazy"
//           allowFullScreen
//           src={mapEmbedLink}
//         ></iframe>
//       </div>

//       {/* Gallery Section */}
//       {/* <div className="mt-8">
//         <h2 className="text-2xl font-semibold mb-4">Gallery</h2>
//         <div className="flex flex-wrap">
//           {orgData.gallery.map((image) => (
//             <div key={image.id} className="w-1/3 p-2">
//               <Image
//                 src={image.src}
//                 alt={image.alt}
//                 width={400}
//                 height={300}
//                 layout="responsive"
//               />
//             </div>
//           ))}
//         </div>
//       </div> */}

//       {/* Edit Popup*/}
//       {editingNeed && (
//         <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
//           <div className="bg-white p-4 rounded shadow-lg">
//             <h3 className="text-xl mb-2">Edit Need</h3>
//             <div>
//               <label className="block mb-2">Amount</label>
//               <input
//                 type="text"
//                 defaultValue={editingNeed.amount}
//                 className="border p-2 w-full"
//                 onChange={(e) =>
//                   setEditingNeed({ ...editingNeed, amount: e.target.value })
//                 }
//               />
//               <label className="block mb-2 mt-2">Date</label>
//               <input
//                 type="text"
//                 defaultValue={editingNeed.date}
//                 className="border p-2 w-full"
//                 onChange={(e) =>
//                   setEditingNeed({ ...editingNeed, date: e.target.value })
//                 }
//               />
//             </div>
//             <div className="mt-4">
//               <button
//                 onClick={handleSaveEdit}
//                 className="bg-blue text-white py-2 px-4 rounded hover:bg-blue-700"
//               >
//                 Save
//               </button>
//               <button
//                 onClick={handleCancelEdit}
//                 className="bg-red-500 text-white py-2 px-4 rounded ml-2 hover:bg-red-700"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

export default ProfileForOrganisation;

