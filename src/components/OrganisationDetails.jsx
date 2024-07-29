import React, { useState } from 'react';
import { Container, Paper, Box, Typography } from '@mui/material';
import CustomButton from './CustomButton';
import InputField from './InputField';
import FileInput from './FileInput';
import { router } from 'next/router';
import { postOrganisationDetails } from '../lib/appwrite';

const Organisation = () => {
  const [formValues, setFormValues] = useState({
    desc: '',
    license: '',
    location: '',
    address:'',
    phno: '',
    files: null,
    fileURL: '',
  });

  const handleChange = (event) => {
    const { name, value, type, files } = event.target;
    if (type === 'file') {
      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: files[0],
        fileURL: URL.createObjectURL(files[0]),
      }));
    } else {
      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: value
      }));
    }
  };

  const handleSubmit = async(event) => {
    event.preventDefault();
    console.log(await postOrganisationDetails(formValues));
    router.push('/needs');
  };

  return (
    <Container component="main"  className='mt-10 w-[50%]'>
      <Paper elevation={6} className='p-16 rounded-lg'>
        <Typography component="h1" variant="h5" align="center">
            Organisation Details
        </Typography>
        <Box
          component="form"
          noValidate
          sx={{ mt: 3 }}
          onSubmit={handleSubmit}
        >
          <InputField title="Description" holder="Write about your organisation" type="textarea" name="desc" id="desc" handleChange={handleChange} />
            <Typography variant="subtitle1">Upload Photo</Typography>
            <div className='justify-center align-middle ml-[20%] mt-4 mb-4'>
          <FileInput handleChange={handleChange} />
          {formValues.fileURL && (
            <Box mt={2} textAlign="center">
              <Typography variant="subtitle1">Uploaded Photo</Typography>
              <img src={formValues.fileURL} alt="Uploaded" style={{ width: '100%', height: 'auto', marginTop: '10px' }} />
            </Box>
          )}
          </div>

          <InputField title="License ID" holder="Enter your license id" type="text" name="license" id="license" handleChange={handleChange} />
          <InputField title="Location" holder="www.google.com/maps" type="text" name="location" id="location" handleChange={handleChange} />
          <InputField title="Address" holder="Enter your address" type="text" name="address" id="address" handleChange={handleChange} />
          <InputField title="Phone Number" holder="+91 9956867412" type="text" name="phno" id="phno" handleChange={handleChange} />

          <CustomButton title="Next" />
        </Box>
      </Paper>
    </Container>
  );
};

export default Organisation;
