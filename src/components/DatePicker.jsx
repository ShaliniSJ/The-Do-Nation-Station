import React, { useState } from 'react';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { Box, TextField, IconButton, Modal } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const DatePicker = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
    handleClose();
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <TextField
          label="Date"
          value={selectedDate.format('YYYY-MM-DD')}
          onClick={handleOpen}
          fullWidth
          InputProps={{
            endAdornment: (
              <IconButton onClick={handleOpen}>
                <CalendarTodayIcon />
              </IconButton>
            ),
          }}
        />
      </Box>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 1,
          }}
        >
          <StaticDatePicker
            displayStaticWrapperAs="desktop"
            openTo="day"
            value={selectedDate}
            onChange={handleDateChange}
            slotProps={{
              actionBar: {
                actions: ['today'],
              },
            }}
          />
        </Box>
      </Modal>
    </LocalizationProvider>
  );
};

export default DatePicker;
