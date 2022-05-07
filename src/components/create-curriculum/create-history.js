import {
    Avatar,
    Box,
    Card,
    Checkbox,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
    Button,
    CardContent,
    
  } from '@mui/material';
  import PerfectScrollbar from 'react-perfect-scrollbar';
    import SaveIcon from '@mui/icons-material/Save';
    import ArrowBackIcon from '@mui/icons-material/ArrowBack';
    import List from '@mui/material/List';
    import ListItem from '@mui/material/ListItem';
    import ListItemText from '@mui/material/ListItemText';
    import Divider from '@mui/material/Divider';
    import TextField from '@mui/material/TextField';
  import { TocTwoTone } from '@mui/icons-material';
  import InputLabel from '@mui/material/InputLabel';
  import FormControl from '@mui/material/FormControl';
  import NativeSelect from '@mui/material/NativeSelect';
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
  
    
export const HistoryLog = (props) => (
  <Card {...props}>
      <List sx={style} 
      component="nav"
       aria-label="mailbox folders">
        <ListItem button>
          <ListItemText 
           disableTypography
           style={maintext}
           primary="History"/>
        </ListItem>
        <Divider />
        <ListItem button 
        divider>
          <ListItemText 
          disableTypography
          style={summary}
          primary="No comments added"
          secondary={<div style={when}>0 minutes ago</div>}
          />
        </ListItem>
      </List>
  </Card>
);
