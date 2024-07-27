import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import donationImage from '../assets/donation-image.jpg';
import { Grid, TextField, Button, Card, CardContent, Typography, Box } from '@mui/material';

// Sample data function
const getSampleNeeds = () => Array.from({ length: 50 }, (_, index) => ({
  id: index,
  organization: `Organization ${index + 1}`,
  location: `Location ${Math.floor(Math.random() * 10) + 1}`,
  date: new Date(new Date().setDate(new Date().getDate() - Math.floor(Math.random() * 30))).toISOString().split('T')[0],
  amount: Math.floor(Math.random() * 1000) + 100,
  impact: Math.floor(Math.random() * 500) + 50,
  description: `Need description for organization ${index + 1}. They require assistance with various needs including financial support, resources, and volunteer help.`,
}));

var showSection = true;

const HomeWithLogin = () => {
  const [location, setLocation] = useState('');
  const [endDate, setEndDate] = useState('');
  const [amount, setAmount] = useState('');
  const [impact, setImpact] = useState('');
  const [needs, setNeeds] = useState([]);

  useEffect(() => {
    // Generate sample data on the client-side
    setNeeds(getSampleNeeds());
  }, []);

  const handleSearch = () => {
    showSection = false;
    const filteredNeeds = getSampleNeeds().filter(need => {
      const matchesLocation = location ? need.location === location : true;
      const matchesDate = endDate ? new Date(need.date) <= new Date(endDate) : true;
      const matchesAmount = amount ? need.amount <= parseFloat(amount) : true;
      const matchesImpact = impact ? need.impact >= parseInt(impact) : true;
      return matchesLocation && matchesDate && matchesAmount && matchesImpact;
    });

    setNeeds(filteredNeeds);
  };

  return (
    <div className="mt-0 p-4">
      <h1 className="text-4xl font-bold mb-4 text-blue">Search for Donation Needs</h1>
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
        <Button variant="contained" color="primary" onClick={handleSearch} sx={{ backgroundColor: '#172554' }}>
          Search
        </Button>
      </Box>

      {showSection && (
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
        </section>
      )}

      <h2 className="text-2xl font-semibold mb-4 text-blue">Needs List</h2>
      <Grid container spacing={2}>
        {needs.map((need) => (
          <Grid item xs={12} sm={6} md={4} key={need.id}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" component="div">
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
                <Typography variant="body2">
                  {need.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default HomeWithLogin;