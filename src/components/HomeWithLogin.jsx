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

// Sample data function
const getSampleNeeds = () =>
  Array.from({ length: 50 }, (_, index) => ({
    id: index,
    organization: `Organization ${index + 1}`,
    location: `Location ${Math.floor(Math.random() * 10) + 1}`,
    date: new Date(
      new Date().setDate(new Date().getDate() - Math.floor(Math.random() * 30))
    )
      .toISOString()
      .split("T")[0],
    amount: Math.floor(Math.random() * 1000) + 100,
    impact: Math.floor(Math.random() * 500) + 50,
    description: `Need description for organization ${
      index + 1
    }. They require assistance with various needs including financial support, resources, and volunteer help.`,
  }));

var showSection = true;

const HomeWithLogin = () => {
  const [location, setLocation] = useState("");
  const [endDate, setEndDate] = useState("");
  const [amount, setAmount] = useState("");
  const [impact, setImpact] = useState("");
  const [needs, setNeeds] = useState([]);
  const [selectedNeed, setSelectedNeed] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Generate sample data on the client-side
    setNeeds(getSampleNeeds());
  }, []);

  const handleSearch = () => {
    showSection = false;
    const filteredNeeds = getSampleNeeds().filter((need) => {
      const matchesLocation = location ? need.location === location : true;
      const matchesDate = endDate
        ? new Date(need.date) <= new Date(endDate)
        : true;
      const matchesAmount = amount ? need.amount <= parseFloat(amount) : true;
      const matchesImpact = impact ? need.impact >= parseInt(impact) : true;
      return matchesLocation && matchesDate && matchesAmount && matchesImpact;
    });

    setNeeds(filteredNeeds);
  };

  const handleDonate = (need) => {
    setSelectedNeed(need);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedNeed(null);
  };

  return (
    <div className="mt-0 py-4 ">
      <div className="md:mx-6">
        <h2 className="text-4xl jost font-bold mb-8 text-primary-blue">
          Search for Donation Needs
        </h2>
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
                label="Impact People"
                variant="outlined"
                type="number"
                value={impact}
                onChange={(e) => setImpact(e.target.value)}
              />
            </Grid>
          </Grid>
        </Box>

        <Box display="flex" justifyContent="center" mt={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSearch}
            sx={{ backgroundColor: "#172554" }}
          >
            Search
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

        <h2 className="text-4xl jost font-semibold mb-4 text-primary-blue">
          Needs List
        </h2>
        <Grid container spacing={2} className="nunito">
          {needs.map((need) => (
            <Grid item xs={12} sm={6} md={4} key={need.id}>
              <div
                variant="outlined"
                className="bg-secondary-blue/20 border-2 border-secondary-blue/10 nunito"
              >
                <CardContent>
                  <Typography variant="h5" component="div">
                    {need.organization}
                  </Typography>
                  <Typography color="textSecondary">
                    Location: {need.location}
                  </Typography>
                  <Typography color="textSecondary">
                    Date: {need.date}
                  </Typography>
                  <Typography color="textSecondary">
                    Amount: ${need.amount}
                  </Typography>
                  <Typography color="textSecondary">
                    Impact: {need.impact} people
                  </Typography>
                  <Typography variant="body2">{need.description}</Typography>
                  <Box display="flex" justifyContent="center" mt={2}>
                    <Button
                      className="px-8"
                      variant="contained"
                      color="primary"
                      onClick={() => handleDonate(need)}
                      sx={{ backgroundColor: "#172554", paddingX: "2rem" }}
                    >
                      Donate
                    </Button>
                  </Box>
                </CardContent>
              </div>
            </Grid>
          ))}
        </Grid>

        <DonationModal
          open={isModalOpen}
          onClose={handleCloseModal}
          need={selectedNeed}
        />
      </div>
      <Footer />
    </div>
  );
};

export default HomeWithLogin;
