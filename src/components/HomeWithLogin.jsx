import React, { useState, useEffect } from "react";
import Image from "next/image";
import donationImage from "../assets/donation-image.jpg";
import {
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Box,
} from "@mui/material";
import DonationModal from "./DonationModal"; // Ensure correct path
import Footer from "@/src/components/Footer";
import Link from "@mui/material/Link";
import { getAllNeeds, organisationDetailsForNeeds } from "../lib/appwrite";

var showSection = true;

const HomeWithLogin = () => {
  const [location, setLocation] = useState("");
  const [endDate, setEndDate] = useState("");
  const [amount, setAmount] = useState("");
  const [impact, setImpact] = useState("");
  const [needs, setNeeds] = useState([]);
  const [allNeeds, setAllNeeds] = useState([]); // Store the original list of needs
  const [selectedNeed, setSelectedNeed] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [organisations, setOrganisations] = useState({});

  useEffect(() => {
    const fetchNeedsAndOrganisations = async () => {
      try {
        const needsData = await getAllNeeds();
        const organisationData = await organisationDetailsForNeeds();
        const orgMap = organisationData.reduce((map, org) => {
          map[org.organisation_id] = org;
          return map;
        }, {});
        setNeeds(needsData);
        setAllNeeds(needsData); // Store the original list of needs
        setOrganisations(orgMap);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchNeedsAndOrganisations();
  }, []);

  const handleSearch = () => {
    showSection = false;
    const filteredNeeds = allNeeds.filter((need) => {
      const org = organisations[need.organisation_id];
      const matchesLocation = location
        ? org &&
          org.address &&
          org.address.toLowerCase().startsWith(location.toLowerCase())
        : true;
      const matchesDate = endDate
        ? new Date(need.date) >= new Date(endDate)
        : true;
      const matchesAmount = amount
        ? need.total_amt - need.collected_amt >= parseFloat(amount)
        : true;
      const matchesOrganisation = impact
        ? org &&
          org.organisation_name.toLowerCase().startsWith(impact.toLowerCase())
        : true;
      return (
        matchesLocation && matchesDate && matchesAmount && matchesOrganisation
      );
    });

    setNeeds(filteredNeeds);
  };

  const handleClear = () => {
    setLocation("");
    setEndDate("");
    setAmount("");
    setImpact("");
    setNeeds(allNeeds); // Reset to the original list of needs
    showSection = true;
  };

  const handleDonate = (need) => {
    setSelectedNeed(need);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedNeed(null);
  };
  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZoneName: "short",
    };
    return new Date(dateString).toLocaleString("en-US", options);
  };

  return (
    <div className="mt-0 p-4">
      <h1 className="text-4xl jost font-bold mb-4 text-blue">
        Search for Donation Needs
      </h1>
      <Box sx={{ mb: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              label="Location"
              variant="outlined"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              type="date"
              label="End Date"
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              label="Amount"
              variant="outlined"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              label="Organisation Name"
              variant="outlined"
              value={impact}
              onChange={(e) => setImpact(e.target.value)}
            />
          </Grid>
        </Grid>
      </Box>

      <Box display="flex" justifyContent="center" mt={2} gap={2}>
        <Button
          className="rounded-full"
          variant="contained"
          color="primary"
          onClick={handleSearch}
          sx={{ backgroundColor: "#172554" }}
        >
          Search
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleClear}
          className="rounded-full"
        >
          Clear
        </Button>
      </Box>

      {showSection && (
        <section className="flex flex-col items-center py-10 bg-white mt-0">
          <div className="relative w-full h-80 mb-4">
            <Image
              src={donationImage}
              alt="Donation"
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
        </section>
      )}

      <h2 className="text-4xl font-semibold mb-4 text-primary-blue jost">
        List of Needs
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {needs.map((need) => {
          console.log("what the hell",need)
          const org = organisations[need.organisation_id];
          return (
            <div
              className="flex flex-col bg-secondary-blue/10 hover:bg-secondary-blue/50 justify-between nunito border-2 border-secondary-blue/5 rounded-lg p-4"
              key={need.id}
            >
              <div className="mb-2">
                <h6 className="text-lg font-medium">
                  <a
                    href={`/organProfileShownToDonorsFromNeeds?${need.organisation_id}`}
                    className="no-underline text-xl text-primary-blue/80 jost"
                  >
                    Organization Name: {org ? org.organisation_name : "Unknown"}
                  </a>
                </h6>
                <p className="text-gray-600">
                  Location: {org ? org.address : "Unknown"}
                </p>
                <p className="text-gray-600">
                  End Date: {formatDate(need.date)}
                </p>
                {need.type ? (
                  <p className="text-gray-600">Amount: Rs. {need.total_amt}</p>
                ) : (
                  <>
                    <p className="text-gray-600">Kind: {need.kind}</p>
                    <p className="text-gray-600">Quantity: {need.quantity}</p>
                  </>
                )}
                <p className="text-gray-800">{need.description}</p>
              </div>
              <div className="flex justify-center mt-4">
                <button
                  className="bg-primary-blue hover:bg-blue-100 text-white px-6 rounded-full py-2"
                  onClick={() => handleDonate(need)}
                >
                  Donate
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* <h2 className="text-2xl font-semibold mb-4 text-blue">List of Needs</h2>
      <Grid container spacing={2}>
        {needs.map((need) => {
          const org = organisations[need.organisation_id];
          return (
            <Grid item xs={12} sm={6} md={4} key={need.id}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" component="div">
                    <Link
                      href={`/organProfileShownToDonorsFromNeeds?${need.organisation_id}`}
                      underline="none"
                    >
                      Organization Name:{" "}
                      {org ? org.organisation_name : "Unknown"}
                    </Link>
                  </Typography>
                  <Typography color="textSecondary">
                    Location: {org ? org.address : "Unknown"}
                  </Typography>
                  <Typography color="textSecondary">
                    End Date: {formatDate(need.date)}
                  </Typography>
                  {need.type && (
                    <Typography color="textSecondary">
                      Amount: Rs. {need.total_amt}
                    </Typography>
                  )}
                  {!need.type && (
                    <Typography color="textSecondary">
                      Kind: {need.kind}
                    </Typography>
                  )}
                  {!need.type && (
                    <Typography color="textSecondary">
                      Quantity: {need.quantity}
                    </Typography>
                  )}
                  <Typography variant="body2">{need.description}</Typography>
                  <Box display="flex" justifyContent="center" mt={2}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleDonate(need)}
                      sx={{ backgroundColor: "#172554" }}
                    >
                      Donate
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid> */}

      <DonationModal
        open={isModalOpen}
        onClose={handleCloseModal}
        need={selectedNeed}
      />
    </div>
    // <Footer />
    // </div>
  );
};

export default HomeWithLogin;
