import {
    Card,
  } from '@mui/material';
    import List from '@mui/material/List';
    import ListItem from '@mui/material/ListItem';
    import ListItemText from '@mui/material/ListItemText';
    import Divider from '@mui/material/Divider';
  import React, { Component, useState } from 'react';
  import {setVersion} from './curriculum-model'
  import {getVersion} from './curriculum-model'
  
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
      paddingLeft:'20px'
    }
    const when = {
      color: 'black',
      fontSize: 13,
      width: '100',
    }
  
    
export const HistoryLog = (props) => {
  let isChecked;

  const handleChange = (event) => {
    const value = event.target.value
    props.setCurrentVersion(value)
    setVersion(value)
  }

  return (
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
            <ListItem button 
          divider>
            { data.id == getVersion() ? isChecked = true: isChecked = false}
          <input type="radio" value={data.id} name="version" checked={isChecked} onChange={handleChange} />
          <ListItemText 
          disableTypography
          style={summary}
          primary={'v '+data.id}
          // secondary={<div style={when}>0 minutes ago</div>}
          />
        </ListItem>
          )
        })
        }

      </List>
  </Card>
  )
}
