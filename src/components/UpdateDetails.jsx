import FileInput from './FileInput'
import { useState } from 'react'
import { Container, Paper, Box, Typography} from '@mui/material'
import InputField from './InputField'
import CustomButton from './CustomButton';


const UpdateDetails = () => {
    const [formValues, setFormValues] = useState({
        impact:'',
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
    
      const handleSubmit = (event) => {
        event.preventDefault();
        // console.log(formValues);
        Router.push('/needs');
      };
    return (
        <Container component="main" className='mt-20 w-[40%]'>
      <Paper elevation={6} className='p-16 rounded-lg'>
        <Typography component="h1" variant="h5" align="center">
            Updates on the Donations
        </Typography>
        <Box
          component="form"
          noValidate
          sx={{ mt: 3 }}
          
          onSubmit={handleSubmit}
        >
          <InputField title="Impact" holder="Enter your impact" type="textarea" name="impact" id="impact" handleChange={handleChange} />
          
          
            <Typography variant="subtitle1" className='mt-4'>Upload Photo</Typography>
            <div className='justify-center align-middle ml-[20%] mt-4 mb-4'>
          <FileInput handleChange={handleChange} />
          {formValues.fileURL && (
            <Box mt={2} textAlign="center justify-center">
              <Typography variant="subtitle1">Uploaded Photo</Typography>
              <img src={formValues.fileURL} alt="Uploaded" style={{ width: '100%', height: 'auto', marginTop: '10px' }} className='center items-center ml-[-10%]'/>
            </Box>
          )}
          </div>

          
          <CustomButton title="Next" />
        </Box>
      </Paper>
    </Container>
    )
}

export default UpdateDetails