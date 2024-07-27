import React, { useState } from 'react';
import { Container, Paper, Box, TextField, Button } from '@mui/material';
import FormControl from "@mui/material/FormControl";
import DatePicker from './DatePicker';
import CustomButton from './CustomButton';
import InputField from './InputField';
const Needs= () => {
  const [formValues, setFormValues] = useState({
    tillDate: dayjs(),
    type: '',
    purpose: ''
  });

  const handleDateChange = (field) => (newDate) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [field]: newDate,
    }));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formValues);
  };

  return (
    <Container component="main" maxWidth="sm" className='mt-10'>
      <Paper elevation={6} className='p-16 rounded-lg'>
      <Typography component="h1" variant="h5" align="center">
            Needs
        </Typography>
        <Box
          component="form"
          noValidate
          sx={{ mt: 3 }}
          onSubmit={handleSubmit}
        >
          
          <DatePicker
            label="Till Date"
            value={formValues.tillDate}
            onChange={handleDateChange('tillDate')}
          />
          <FormControl fullWidth margin="normal" variant="outlined">
                <FormLabel>Type</FormLabel>
                <Select
                  name="Type"
                  defaultValue=""
                  required
                  sx={{ mt: 1, mb: 2 }}
                >
                  <MenuItem value="Donor">Cash</MenuItem>
                  <MenuItem value="Organisation">Kind</MenuItem>
                </Select>
              </FormControl>
              <InputField title="Purpose" holder="Describe Your Purpose" type="textarea" name="desc" id="desc" handleChange={handleChange} />
           <CustomButton title="Submit" />
           
        </Box>
      </Paper>
    </Container>
  );
};

export default Needs;
