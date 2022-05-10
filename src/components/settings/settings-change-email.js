import React, { useState } from 'react';
import { Box, Button, Card, CardContent, CardHeader, Divider, TextField } from '@mui/material';

export const SettingsEmail = (props) => {
  const [values, setValues] = useState({
    email: '',
    newemail: '',
  });
  
  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  return (
    <form {...props}>
      <Card>
        <CardHeader
          title="Change email"
        />
        <Divider />
        <CardContent>
          <h3>Current</h3>
          <TextField
            fullWidth
            label="Current Email"
            margin="normal"
            name="currentemail"
            onChange={handleChange}
            type="email"
            value={values.current}
            variant="outlined"
          />
          
          <h3>New</h3>
          <TextField
            fullWidth
            label="New Email"
            margin="normal"
            name="newemail"
            onChange={handleChange}
            type="email"
            value={values.new}
            variant="outlined"
          />
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 1
          }}
        >
          <Button
            color="primary"
            variant="contained"
          >
            Update Email
          </Button>
        </Box>
      </Card>
    </form>
  );
};
