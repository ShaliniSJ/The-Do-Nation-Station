
import React, { useState } from 'react';
import { Container, Paper, Box } from '@mui/material';
import Input from './InputField';
import CustomButton from './CustomButton';
import Typography from "@mui/material/Typography";
import { postBankDetails } from '../lib/appwrite';
import { router } from 'next/router';



const BankDetails = () => {
  const [formValues, setFormValues] = useState({
    name: '',
    number: '',
    code: '',
    bankname: '',
    branch: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value
    }));
  };

  const handleSubmit = async(event) => {
    event.preventDefault();
    const data= await postBankDetails(formValues)
    alert("Data Added successfully")
    router.push('/')
  };

  return (
    <Container component="main" maxWidth="xs" className='mt-10'>
      <Paper elevation={6} className='p-16 rounded-lg'>
      <Typography component="h1" variant="h5" className='text-justify justify-center'>
                 Bank Details
      </Typography>
        <Box
          component="form"
          noValidate
          sx={{ mt: 3 }}
          onSubmit={handleSubmit}
        >
          <Input title="Account Name" holder="abc" name="name" id="accname" type="text" handleChange={handleChange} />
          <Input title="Account Number" holder="12345AC45" name="number" id="accnumber" type="text" handleChange={handleChange} />
          <Input title="IFSC Code" holder="SBI1234" name="code" id="ifsc" type="text" handleChange={handleChange} />
          <Input title="Bank Name" holder="SBI" name="bankname" id="bankname" type="text" handleChange={handleChange} />
          <Input title="Branch Name" holder="chennai" name="branch" id="branch" type="text" handleChange={handleChange} />
          <CustomButton title="Submit" />
        </Box>
      </Paper>
    </Container>
  );
};

export default BankDetails;
