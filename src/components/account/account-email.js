import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField
} from '@mui/material';

import { auth, db } from 'src/firebase/firebase-auth';
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { updateEmail } from "firebase/auth";



export const AccountEmail = (props) => {
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
            subheader="Update email"
              title="Change email"
            />
            <Divider />
            <CardContent>
              <h4>Current</h4>
              <TextField
                fullWidth
                label="Current Email"
                margin="normal"
                name="email"
                onChange={handleChange}
                type="email"
                value={values.email}
                variant="outlined"
              />
              
              <h4>New</h4>
              <TextField
                fullWidth
                label="New Email"
                margin="normal"
                name="newemail"
                onChange={handleChange}
                type="email"
                value={values.newemail}
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
                    if(docSnap.data().email == values.email){
                      if(values.email == values.newemail){
                        alert('New password should be different from the current password')
                      }
                      else{
                        updateEmail(auth.currentUser, values.newemail).then(() => {
                          const washingtonRef = doc(db, "users", localStorage.getItem('user_id'));
    
                            // Set the "capital" field of the city 'DC'
                            updateDoc(washingtonRef, {
                              email: values.newemail 
                            }).then(()=>{
                              alert('Successfully Changes your Email.')
                              localStorage.setItem('email', values.newemail)
                            })
                        }).catch((error) => {
                          alert('error ' + error)
                        });
                      }
                    }
                    else{
                      alert('Incorrect current email.')
                    }
                  } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                  }
                }}
              >
                Update Email
              </Button>
            </Box>
          </Card>
    </form>
  );
};
