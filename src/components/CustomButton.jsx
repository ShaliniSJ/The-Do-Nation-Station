import React from 'react';
import Button from '@mui/material/Button';

const CustomButton = ({ title }) => (
  <Button variant="contained" color="primary" type="submit" className='mt-5' fullWidth>
    {title}
  </Button>
);

export default CustomButton;
