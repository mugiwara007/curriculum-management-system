import { useState } from 'react';
import { Box, Button, Card, CardContent, CardHeader, Divider, TextField } from '@mui/material';

export const SettingsPassword = (props) => {
  const [values, setValues] = useState({
    old_password: '',
    new_password: '',
    confirm: ''
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
          subheader="Use a password you have not used before"
          title="Password"
        />
        <Divider />
        <CardContent>
          <h3>Current</h3>
          <TextField
            fullWidth
            label="Current Password"
            margin="normal"
            name="current"
            onChange={handleChange}
            type="password"
            value={values.current}
            variant="outlined"
          />
          <h3>New</h3>
          <TextField
            fullWidth
            label="New Password"
            margin="normal"
            name="new"
            onChange={handleChange}
            type="password"
            value={values.new}
            variant="outlined"
          />
          <h3>Retype new</h3>
          <TextField
            fullWidth
            label="Confirm Password"
            margin="normal"
            name="confirm"
            onChange={handleChange}
            type="password"
            value={values.confirm}
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
            Update password
          </Button>
        </Box>
      </Card>
    </form>
  );
};
