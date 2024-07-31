// pages/card-details.js
import React, { useState } from 'react';
import { Container, Box, TextField, Button, Typography, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { useRouter } from 'next/router';

const CardDetailsPage = () => {
  const router = useRouter();
  const { amount } = router.query;
  const [cardType, setCardType] = useState('credit');
  const [cardDetails, setCardDetails] = useState({
    name: '',
    number: '',
    expiry: '',
    cvv: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCardDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handlePay = () => {
    router.push('/success');
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ mt: 8 }}>
        <Typography component="h1" variant="h5" align="center">
          Card Details
        </Typography>
        <RadioGroup
          row
          aria-label="cardType"
          name="cardType"
          value={cardType}
          onChange={(e) => setCardType(e.target.value)}
          sx={{ justifyContent: 'center', mb: 2 }}
        >
          <FormControlLabel value="credit" control={<Radio />} label="Credit Card" />
          <FormControlLabel value="debit" control={<Radio />} label="Debit Card" />
        </RadioGroup>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="name"
          label="Name on Card"
          name="name"
          value={cardDetails.name}
          onChange={handleChange}
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="number"
          label="Card Number"
          name="number"
          value={cardDetails.number}
          onChange={handleChange}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <TextField
            variant="outlined"
            margin="normal"
            id="expiry"
            label="Valid On"
            name="expiry"
            value={cardDetails.expiry}
            onChange={handleChange}
            sx={{ width: '48%' }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            id="cvv"
            label="CVV Code"
            name="cvv"
            value={cardDetails.cvv}
            onChange={handleChange}
            sx={{ width: '48%' }}
          />
        </Box>
        <FormControlLabel
          control={<Radio />}
          label="Securely save this card for a faster checkout next time"
          sx={{ mt: 2 }}
        />
        <Button
          type="button"
          fullWidth
          variant="contained"
          color="primary"
          onClick={handlePay}
        >
          Pay ${amount}
        </Button>
      </Box>
    </Container>
  );
};

export default CardDetailsPage;
