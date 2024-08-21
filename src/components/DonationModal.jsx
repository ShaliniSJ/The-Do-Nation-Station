import React from "react";
import { Modal, Box, Typography, Button, Grid } from "@mui/material";

const DonationModal = ({ open, onClose, need }) => {
  if (!need) return null;
  const isCost = need.total_amt > 0;
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
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" component="h2">
          Organisation Name: {need.organisation_name}
        </Typography>
        <Typography sx={{ mt: 2 }}>End Date: {formatDate(need.date)}</Typography>
        {isCost && (
          <Typography sx={{ mt: 2 }}>Amount: Rs.{need.total_amt}</Typography>
        )}
        {!isCost && <Typography sx={{ mt: 2 }}>Kind: {need.kind}</Typography>}
        {!isCost && (
          <Typography sx={{ mt: 2 }}>Quantity: {need.quantity}</Typography>
        )}
        <Typography sx={{ mt: 2 }}>Description: {need.description}</Typography>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={6}>
            <a
              href={`/organProfileShownToDonorsFromNeeds?${need.organisation_id}`}
              // target="_blank"
              style={{ textDecoration: "none", color: "white" }}
            >
              <Button variant="contained" color="primary" fullWidth>
                Profile
              </Button>
            </a>
          </Grid>
          <Grid item xs={6}>
            {isCost ? (
              <a
                href={`/donate?${need.$id}`}
                target="_blank"
                style={{ textDecoration: "none", color: "white" }}
              >
                <Button variant="contained" color="primary" fullWidth>
                  Pay
                </Button>
              </a>
            ) : (
              <a
                href="delivery-address-link"
                target="_blank"
                style={{ textDecoration: "none", color: "white" }}
              >
                <Button variant="contained" color="primary" fullWidth>
                  Deliver
                </Button>
              </a>
            )}
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default DonationModal;
