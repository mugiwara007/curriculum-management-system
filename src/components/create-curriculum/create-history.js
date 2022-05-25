import {
    Card,
  } from '@mui/material';
    import List from '@mui/material/List';
    import ListItem from '@mui/material/ListItem';
    import ListItemText from '@mui/material/ListItemText';
    import Divider from '@mui/material/Divider';
  import React, { Component } from 'react';
  
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
    const summary = {
      color: 'black',
      fontSize: 15,
      width: '100',
  
    }
    const when = {
      color: 'black',
      fontSize: 13,
      width: '100',
    }
  
    //sample
export const HistoryLog = (props) => (
  <Card {...props}>
      <List sx={style} 
      component="nav"
       aria-label="mailbox folders">
        <ListItem button>
          <ListItemText 
           disableTypography
           style={maintext}
           primary="Version History"/>
        </ListItem>
        <Divider />

        {props.data && props.data.map((data)=>{
          return(
            // eslint-disable-next-line react/jsx-key
            <ListItem button 
          divider>
          <ListItemText 
          disableTypography
          style={summary}
          primary={data.id}
          // secondary={<div style={when}>0 minutes ago</div>}
          />
        </ListItem>
          )
        })
        }

      </List>
  </Card>
);
