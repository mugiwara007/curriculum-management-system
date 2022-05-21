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
   import React, { Component } from 'react';
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
    var text = "Shrimp and Chorizo Paella"
    return(
        <Card sx={{ maxWidth: '100%', margin:5 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {text[0]}
          </Avatar>
        }
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the mussels,
          if you like.
        </Typography>
      </CardContent>
    </Card>
    )
}
    
export const CreateComments = (props) => (
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
        <CommentBox />
      </List>
  </Card>
);
