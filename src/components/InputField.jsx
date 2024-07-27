import React from 'react';
import TextField from '@mui/material/TextField';

const Input = ({ title, holder, name, id, type, handleChange }) => (
  <TextField
    label={title}
    placeholder={holder}
    name={name}
    id={id}
    type={type}
    variant="outlined"
    fullWidth
    margin="normal"
    multiline={type === 'textarea'}
    rows={type === 'textarea' ? 4 : 1}
    onChange={handleChange}
  />
);

export default Input;
