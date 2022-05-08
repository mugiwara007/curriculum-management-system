import { useState } from 'react';
import { Box, Button, Card, CardContent, CardHeader, Divider, TextField } from '@mui/material';

export const SettingsPersonal = (props) => {
  const [values, setValues] = useState({
    name: '',
    lname: '',
    mname: '',
    gender:'',
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
        <Divider />
        <CardContent>
          <h3>Personal Information</h3>
          <div>
          <TextField
            fullWidth
            label="First name"
            margin="normal"
            name="name"
            onChange={handleChange}
            type="text"
            value={values.current}
            variant="outlined"
          />
         <TextField
            fullWidth
            label="Last name"
            margin="normal"
            name="lname"
            onChange={handleChange}
            type="text"
            value={values.current}
            variant="outlined"
          />
          </div>
          <TextField
            fullWidth
            label="Middle name"
            margin="normal"
            name="mname"
            onChange={handleChange}
            type="text"
            value={values.current}
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
            Save
          </Button>
        </Box>
      </Card>
    </form>
  );
};
