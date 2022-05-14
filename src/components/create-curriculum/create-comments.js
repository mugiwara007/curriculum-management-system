import {
    Card,
    Button,
  } from '@mui/material';
    import List from '@mui/material/List';
    import ListItem from '@mui/material/ListItem';
    import ListItemText from '@mui/material/ListItemText';
    import Divider from '@mui/material/Divider';
   import TextField from '@mui/material/TextField';
   import React, { Component } from 'react';
   import SendIcon from '@mui/icons-material/Send';
  
    const style = {
      width: '100%',
      bgcolor: 'background.paper',
    };
    const maintext = {
      color: 'black',
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
    }
    const comment = {
        width: '100%',
        bgcolor: 'background.paper',
        mt:2,
        mb:2,
      };
      const submit = {
        width: '100%',
      };
    
export const Comments = (props) => (
  <Card {...props}>
      <List sx={style} 
      component="nav"
       aria-label="mailbox folders">
        <ListItem button>
          <ListItemText 
           disableTypography
           style={maintext}
           primary="Add a Comment"/>
        </ListItem>
        <Divider />
        <TextField sx={comment}
          id="outlined-textarea"
          label="Comment"
          placeholder="Placeholder"
          multiline
        />
      </List>
      <Button sx={submit}
      variant="contained" 
      endIcon={<SendIcon />}>
         Submit
      </Button>
  </Card>
);
