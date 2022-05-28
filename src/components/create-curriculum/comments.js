import { styled } from '@mui/material/styles';
import {
    Card,
    Button,
  } from '@mui/material';
    import List from '@mui/material/List';
    import ListItem from '@mui/material/ListItem';
    import ListItemText from '@mui/material/ListItemText';
    import Divider from '@mui/material/Divider';
   import TextField from '@mui/material/TextField';
   import React, { Component, useEffect, useState } from 'react';
   import SendIcon from '@mui/icons-material/Send';

import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from 'src/firebase/firebase-auth';
  
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
export const CommentBox = (props) =>{
    return(
        <Card sx={{ maxWidth: '100%', margin:5 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {props.data.email[0]}
          </Avatar>
        }
        title={props.data.email}
        subheader={props.data.date}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {props.data.message}
        </Typography>
      </CardContent>
    </Card>
    )
}
    
export const CreateComments = (props) => {
  const [comment, setComment] = useState([])
  useEffect(() => {
    const q = query(collection(db, "curriculumns", props.data, "comments"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const temp = [];
      querySnapshot.forEach((doc) => {
          temp.push(doc.data());
          console.log(doc.data())
      });
      setComment(temp)
    })
  }, [])
  
  return(
  <Card {...props}>
    
      <List sx={style} 
      component="nav"
       aria-label="mailbox folders">
        <ListItem button>
        <ListItemText 
           disableTypography
           style={maintext}
           primary="Comments"/>
        </ListItem>
        <Divider />
        {comment.map((data, key)=>{
          return(
          <CommentBox data={data} key={key}/>
          )
        })}
      </List>
  </Card>
)
};
