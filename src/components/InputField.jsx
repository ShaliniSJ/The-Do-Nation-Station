import React from 'react';
import TextField from '@mui/material/TextField';

const Input = ({ title, holder, name, id, type, value, handleChange }) => (
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
    value={value} // Bind value from state
    onChange={handleChange}
  />
);

export default Input;
