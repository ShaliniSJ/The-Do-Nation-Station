import React, { useState } from 'react';
import { Container, Paper, Box, Typography, FormControl, FormLabel, Select, MenuItem } from '@mui/material';
import CustomButton from './CustomButton';
import InputField from './InputField';
import FileInput from './FileInput';
import { router } from 'next/router';
import { postOrganisationDetails,uploadFile } from '../lib/appwrite';


const Organisation = () => {
  const [formValues, setFormValues] = useState({
    desc: '',
    license: '',
    location: '',
    address:'',
    phno: '',
    files: null,
    fileURL: '',
    impact:'',
    type:''
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
  
  const handlefileUpload = async (event) => {
    const { name, files } = event.target;
    const file = files[0];

    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: file,
      fileURL: URL.createObjectURL(file),
    }));

    try {
      const fileUrl = await uploadFile(file,"image");
      setFormValues((prevValues) => ({
        ...prevValues,
        fileURL: fileUrl,
      }));
    } catch (error) {
      console.error('Error uploading file:', error.message);
    }
  };

  const handleSubmit = async(event) => {
    event.preventDefault();
    // console.log(formValues);
    console.log(await postOrganisationDetails(formValues));
    router.push('/bank');
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
          <FileInput handleChange={handlefileUpload} />
          {formValues.fileURL && (
            <Box mt={2} textAlign="center">
              <Typography variant="subtitle1">Uploaded Photo</Typography>
              <img src={formValues.fileURL} alt="Uploaded" style={{ width: '100%', height: 'auto', marginTop: '10px' }} />
            </Box>
          )}
          </div>
           <FormControl fullWidth margin="normal" variant="outlined">
            <FormLabel>Type</FormLabel>
            <Select
              name="type"
              value={formValues.type}
              onChange={handleChange}
              required
              sx={{ mt: 1, mb: 2 }}
            >
              <MenuItem value="NGO">NGO</MenuItem>
              <MenuItem value="Hospitals">Hospitals</MenuItem>
              <MenuItem value="Orphanage">Orphanage</MenuItem>
              <MenuItem value="Oldage Home">Oldage Home</MenuItem>
              <MenuItem value="Others">Others</MenuItem>
            </Select>
          </FormControl>
          <InputField title="No.of Peoples Impacted" holder="5000+ people" type="text" name="impact" id="impact" handleChange={handleChange} />
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
