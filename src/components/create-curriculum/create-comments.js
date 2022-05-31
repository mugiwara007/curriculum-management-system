import {
    Card,
    Button,
  } from '@mui/material';
    import List from '@mui/material/List';
    import ListItem from '@mui/material/ListItem';
    import ListItemText from '@mui/material/ListItemText';
    import Divider from '@mui/material/Divider';
   import TextField from '@mui/material/TextField';
   import React, { Component, useState } from 'react';
   import SendIcon from '@mui/icons-material/Send';
   import { db } from 'src/firebase/firebase-auth';
   import {doc, collection, setDoc, where, onSnapshot} from "firebase/firestore";
import { getCurriculumID } from './curriculum-model';
  
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
    
export const Comments = (props) => {
  const [commentVal, setComment] = useState()
  const handleChange = (event) => {
    setComment(event.target.value);
  };
return(
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
          value={commentVal}
          onChange={handleChange}
        />
      </List>
      <Button sx={submit}
      variant="contained" 
      endIcon={<SendIcon />}
      onClick={async()=>{
        const comment_doc = doc(db, "curriculumns", getCurriculumID())
        const comment_collection = collection(comment_doc, "comments")
        const comment_id = new Date()
        await setDoc(doc(comment_collection, Date.parse(comment_id).toString()), {
          comment_id:comment_id,
          message: commentVal,
          date: (comment_id.getMonth() + 1) + "/" + comment_id.getDate() + "/" + comment_id.getFullYear(),
          email: localStorage.getItem('email')
        });

        setComment('')
      }}
      >
         Submit
      </Button>
  </Card>
)
    };
