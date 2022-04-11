import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import Divider from '@mui/material/Divider';
import { positions } from '@mui/system';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { useRouter } from 'next/router';
import { useState } from 'react';

const style = {
    zIndex:'modal',
    position: 'absolute',
    top:70,
    right:100,
    color:'black',
    width: '100%',
    maxWidth: 360,
    bgcolor: 'background.paper',

  };
function NotificationDiv(props){
    const router = useRouter();
    const  [listVisibility, setlistVisibility] = useState(props.visibility)
    const ButtonClick = () =>{
        setlistVisibility('none')
        router.push('/notifications')
    }
    return <List
    sx={{
    zIndex:'modal',
    position: 'fixed',
    top:70,
    right:20,
    color:'black',
    width: '100%',
    maxWidth: 290,
    bgcolor: 'background.paper',
    borderRadius: 1,
    border: '1px solid #D3D3D3', 
    display: listVisibility,

  }}
  >
    <ListItem>
      <ListItemAvatar>
        <Avatar>
          <ImageIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary="Photos" 
      secondary="Jan 9, 2014" />
    </ListItem>
    <Divider variant="inset" 
    component="li" />
    <ListItem>
      <ListItemAvatar>
        <Avatar>
          <WorkIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary="Work" 
      secondary="Jan 7, 2014" />
    </ListItem>
    <Divider variant="inset"
     component="li" />
    <ListItem>
      <ListItemAvatar>
        <Avatar>
          <BeachAccessIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary="Vacation" 
      secondary="July 20, 2014" />
    </ListItem>
    <ListItem>
    <Button onClick={ButtonClick}
    style={{width:'100%',height:'100%', backgroundColor: '#2196FD', color:'white'}}>
        View All Notification
      </Button>
      </ListItem>
  </List>

  
  

}
export  { NotificationDiv }