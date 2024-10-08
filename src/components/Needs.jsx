import React, { useState, useEffect } from 'react';
import { Container, Paper, Box, TextField, Typography, FormControl, FormLabel, Select, MenuItem } from '@mui/material';
import dayjs from 'dayjs';
import CustomButton from './CustomButton';
import InputField from './InputField';
import { postNeeds } from '../lib/appwrite';
import { router } from 'next/router';

const Needs = () => {
  const [formValues, setFormValues] = useState({
    tillDate: dayjs(),
    type: '',
    purpose: '',
    amount: 0,
    kind: '',
    kindtype: '',
    quantity:0,
    iscash:''
  });
  const [isKind, setIsKind] = useState(false);
  const [isCash, setIsCash] = useState(false);
  const [showQuantity, setShowQuantity] = useState(false);

  useEffect(() => {
    if (formValues.type === 'Kind') {
      setIsKind(true);
      setIsCash(false);
      setFormValues((prevValues)=>({
        ...prevValues,
        iscash:false
      }))
    } else if (formValues.type === 'Cash') {
      setIsCash(true);
      setIsKind(false);
      setFormValues((prevValues)=>({
        ...prevValues,
        iscash:true
      }))
    } else {
      setIsKind(false);
      setIsCash(false);
    }
  }, [formValues.type]);
  
  useEffect(() => {
    if (formValues.kindtype ) {
      setShowQuantity(true);
    } 
  }, [formValues.kindtype]);

  const handleDateChange = (event) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      tillDate: dayjs(event.target.value),
    }));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: (name === 'amount' || name === 'quantity') ? parseInt(value, 10) : value,
    }));
  };

  const handleSubmit = async(event) => {
    event.preventDefault();
    const data=await postNeeds(formValues);
    alert("Success, Data added successfully");
    router.push("/organisationprofile")
  };

  return (
    <Container component="main" maxWidth="sm" className="mt-10">
      <Paper elevation={6} className="p-16 rounded-lg">
        <Typography component="h1" variant="h5" align="center">
          Needs
        </Typography>
        <Box component="form" noValidate sx={{ mt: 3 }} onSubmit={handleSubmit}>
          <TextField
            fullWidth
            type="date"
            label="End Date"
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            value={formValues.tillDate.format('YYYY-MM-DD')}
            onChange={handleDateChange}
            name="tillDate"
          />
          <FormControl fullWidth margin="normal" variant="outlined">
            <FormLabel>Type</FormLabel>
            <Select
              name="type"
              value={formValues.type}
              onChange={handleChange}
              required
              sx={{ mt: 1, mb: 2 }}
            >
              <MenuItem value="Cash">Cash</MenuItem>
              <MenuItem value="Kind">Kind</MenuItem>
            </Select>
          </FormControl>
          {isKind && (
            <FormControl fullWidth margin="normal" variant="outlined">
              <FormLabel>Type of Kind needed</FormLabel>
              <Select
                name="kindtype"
                value={formValues.kindtype}
                onChange={handleChange}
                required
                sx={{ mt: 1, mb: 2 }}
              >
                <MenuItem value="Food">Biscuit</MenuItem>
                <MenuItem value="Clothing">Clothing</MenuItem>
                <MenuItem value="Books">Books</MenuItem>
                <MenuItem value="Toys">Toys</MenuItem>
                <MenuItem value="Furniture">Chairs</MenuItem>
                <MenuItem value="Medical Supplies">Medical Supplies</MenuItem>
                <MenuItem value="Stationery">Stationery</MenuItem>
                <MenuItem value="Hygiene Products">Hygiene Products</MenuItem>
                <MenuItem value="Sports Equipment">Sports Equipment</MenuItem>
                <MenuItem value="Art Supplies">Art Supplies</MenuItem>
                <MenuItem value="School Supplies">School Supplies</MenuItem>
                <MenuItem value="Tools and Hardware">Tools and Hardware</MenuItem>
              </Select>
            </FormControl>
          )}
          {showQuantity && (
            <TextField
              fullWidth
              label="Quantity"
              variant="outlined"
              value={formValues.quantity}
              onChange={handleChange}
              name="quantity"
              sx={{ mt: 2 }}
            />
          )}
          {isCash && (
            <InputField title="Amount" holder="Enter Amount" type="number" name="amount" id="amount" handleChange={handleChange} />
          )}
          <InputField title="Purpose" holder="Describe Your Purpose" type="textarea" name="purpose" id="purpose" handleChange={handleChange} />
          <CustomButton title="Submit" />
        </Box>
      </Paper>
    </Container>
  );
};

export default Needs;
