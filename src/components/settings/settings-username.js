import { useState } from 'react';
import { Box, Button, Card, CardContent, CardHeader, Divider, TextField } from '@mui/material';

export const SettingsUsername = (props) => {
  const [values, setValues] = useState({
    username: '',
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
          subheader="Choose a unique username"
          title="Username"
        />
        <Divider />
        <CardContent>
          <TextField
            fullWidth
            label="@username"
            margin="normal"
            name="username"
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
