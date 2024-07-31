// pages/donate.js
import React, { useState } from 'react';
import { Container, Box, TextField, Button, Typography } from '@mui/material';
import { useRouter } from 'next/router';

const Donate = () => {
  const [amount, setAmount] = useState('');
  const router = useRouter();

  const handleDonate = () => {
    router.push(`/carddetails?amount=${amount}`);
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
