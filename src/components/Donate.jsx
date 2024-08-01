// pages/donate.js
import React, { useState,useEffect } from 'react';
import { Container, Box, TextField, Button, Typography } from '@mui/material';
import { useRouter } from 'next/router';


const Donate = () => {
  const [amount, setAmount] = useState('');
  const [needId,setNeedId]=useState('')
  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      const url = new URL(window.location.href);
      const userId = url.href.split("?").pop();
      setNeedId(userId)
     
    }
    fetchData();
  },[])

  const handleDonate = () => {
    router.push(`/carddetails?amount=${amount}id=${needId}`);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ mt: 8, textAlign: 'center' }}>
        <Typography component="h1" variant="h5">
          Enter Donation Amount
        </Typography>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="amount"
          label="Amount"
          name="amount"
          autoFocus
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <Button
          type="button"
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleDonate}
        >
          Donate
        </Button>
      </Box>
    </Container>
  );
};

export default Donate;
