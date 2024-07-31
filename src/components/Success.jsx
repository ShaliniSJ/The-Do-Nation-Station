// pages/success.js
import React, { useEffect } from 'react';
import { Container, Box, Typography } from '@mui/material';
import { useRouter } from 'next/router';

const SuccessPage = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/');
    }, 5000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ mt: 8, textAlign: 'center' }}>
        <Typography component="h1" variant="h5">
          Payment Successful
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          Thank you for your donation!
        </Typography>
        <Typography variant="body2" sx={{ mt: 2 }}>
          Redirecting to the home page...
        </Typography>
      </Box>
    </Container>
  );
};

export default SuccessPage;
