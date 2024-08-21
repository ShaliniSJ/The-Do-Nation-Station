// pages/card-details.js
import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { useRouter } from "next/router";
import { updateNeeds } from "../lib/appwrite";

const CardDetailsPage = () => {
  const router = useRouter();
  // const { amount } = router.query;
  const [cardType, setCardType] = useState("credit");
  const [needId, setNeedId] = useState("");
  const [amount, setAmount] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    name: "",
    number: "",
    expiry: "",
    cvv: "",
  });
  const [isdonor, setIsdonor] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isDonor = localStorage.getItem("isdonar");
      if (isDonor === "true") {
        setIsdonor(true);
      } else {
        setIsdonor(false);
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCardDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handlePay = async () => {
    await updateNeeds(needId, amount, isdonor, isAnonymous);

    router.push("/success");
  };
  useEffect(() => {
    const fetchData = async () => {
      // Get the current URL search parameters
      const urlParams = new URLSearchParams(window.location.search);

      // Extract the parameters from the query string
      const amount = urlParams.get("amount");
      const needId = urlParams.get("id");
      const isAnonymous = urlParams.get("anonymous") === "true";

      // Set the state with extracted values
      setNeedId(needId);
      setAmount(parseInt(amount, 10));
      setIsAnonymous(isAnonymous);
    };
    fetchData();
  }, []);


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
          sx={{ justifyContent: "center", mb: 2 }}
        >
          <FormControlLabel
            value="credit"
            control={<Radio />}
            label="Credit Card"
          />
          <FormControlLabel
            value="debit"
            control={<Radio />}
            label="Debit Card"
          />
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
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <TextField
            variant="outlined"
            margin="normal"
            id="expiry"
            label="Valid On"
            name="expiry"
            value={cardDetails.expiry}
            onChange={handleChange}
            sx={{ width: "48%" }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            id="cvv"
            label="CVV Code"
            name="cvv"
            value={cardDetails.cvv}
            onChange={handleChange}
            sx={{ width: "48%" }}
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
          Pay Rs.{amount}
        </Button>
      </Box>
    </Container>
  );
};

export default CardDetailsPage;
