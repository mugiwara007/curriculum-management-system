import { useState } from 'react';
import { Box, Button, Card, CardContent, CardHeader, Divider, TextField } from '@mui/material';
import { auth, db } from 'src/firebase/firebase-auth';
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { updatePassword } from "firebase/auth";

export const AccountPassword = (props) => {
  const [values, setValues] = useState({
    password: '',
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
          title="Change Password"
        />
        <Divider />
        <CardContent>
          <h4>Current</h4>
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
          <h4>New</h4>
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
          <h4>Retype new</h4>
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
            onClick={async()=>{
              const user = auth.currentUser;

              const docRef = doc(db, "users", localStorage.getItem('user_id'));
              const docSnap = await getDoc(docRef);

              if (docSnap.exists()) {
                if(docSnap.data().password == values.current){
                  if(values.current == values.new){
                    alert('New password should be different from the current password')
                  }
                  else{
                    if(values.new == values.confirm)
                    {
                      updatePassword(user, values.new).then(() => {
                        const washingtonRef = doc(db, "users", localStorage.getItem('user_id'));

                        // Set the "capital" field of the city 'DC'
                        updateDoc(washingtonRef, {
                          password: values.new 
                        }).then(()=>{
                          alert('Successfully Changes your Password.')
                          values.new = ''
                          values.current = ''
                          values.confirm = ''
                        })
                        // Update successful.
                      }).catch((error) => {
                        alert('Not Sucess ' + error)
                      });
                    }
                    else{
                      alert('New password and confirm password does not match.')
                    }
                    
                  }
                }
                else{
                  alert('Incorrect current password.')
                }
              } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
              }
            }}
          >
            Update password
          </Button>
        </Box>
      </Card>
    </form>
  );
};
