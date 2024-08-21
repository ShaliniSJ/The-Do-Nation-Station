// pages/donate.js
import React, { useState, useEffect } from "react";
import { Container, Box, TextField, Button, Typography, FormControlLabel, Switch } from "@mui/material";
import { useRouter } from "next/router";

const Donate = () => {
  const [amount, setAmount] = useState("");
  const [needId, setNeedId] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const url = new URL(window.location.href);
      const userId = url.href.split("?").pop();
      setNeedId(userId);
    };
    fetchData();
  }, []);

  const handleDonate = () => {
    router.push(`/carddetails?amount=${amount}&id=${needId}&anonymous=${isAnonymous}`);
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-[90vh]">
      <Container component="main" maxWidth="xs">
        <Box sx={{ mt: 8, textAlign: "center" }}>
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
          <FormControlLabel
            control={
              <Switch
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
                name="anonymous"
                color="primary"
              />
            }
            label="Donate Anonymously"
          />
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleDonate}
            disabled={parseFloat(amount) <= 0 || isNaN(parseFloat(amount))}
          >
            Donate
          </Button>
        </Box>
      </Container>
    </div>
  );
};

export default Donate;
