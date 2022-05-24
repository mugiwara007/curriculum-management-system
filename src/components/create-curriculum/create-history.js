import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import InputLabel from '@mui/material/InputLabel';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import React, { Component, useState, useEffect } from 'react';
import {getCurriculumID, setVersion} from './curriculum-model'
import {getVersion} from './curriculum-model'
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from 'src/firebase/firebase-auth'
  
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

export const VersionDialog = (props) =>{
  const [open, setOpen] = useState(false);
  const [subjects1, setSubjects1] = useState([]);
  const [subjects2, setSubjects2] = useState([]);
  const [yearOption, setYearOption] = useState(10);
  const [totalLec1, setTotalLec1] = useState(0);
  const [totalLab1, setTotalLab1] = useState(0);
  const [totalUnit1, setTotalUnit1] = useState(0);
  const [totalHr1, setTotalHr1] = useState(0);
  const [totalLec2, setTotalLec2] = useState(0);
  const [totalLab2, setTotalLab2] = useState(0);
  const [totalUnit2, setTotalUnit2] = useState(0);
  const [totalHr2, setTotalHr2] = useState(0);

  function allCurrSub1(){
    let year="";
    const curriculum_id = getCurriculumID();
    if (yearOption == 10){
      year = "first_year"
    } else if (yearOption == 20){
      year = "second_year"
    } else if (yearOption == 30){
      year = "third_year"
    } else if (yearOption == 40){
      year = "fourth_year"
    }
    const sub1Ref = collection(db, "curriculumns", curriculum_id, 'versions', props.data, year);
    const q = query(sub1Ref, where("curr_sem", '==' ,1));
    let tLec1 = 0
    let tLab1 = 0
    let tUnit1 = 0
    let tHrPw1 = 0
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const subs = [];
      querySnapshot.forEach((doc) => {
          subs.push({ ...doc.data(), id: doc.id });
      });
        setSubjects1(subs)

        tLec1 = 0
        tLab1 = 0
        tUnit1 = 0
        tHrPw1 = 0
        
         subs.map((currSub) => tLec1 += Number(currSub.sub_lec));
         subs.map((currSub) => tLab1 += Number(currSub.sub_lab));
         subs.map((currSub) => tUnit1 += Number(currSub.total_units));
         subs.map((currSub) => tHrPw1 += Number(currSub.hour_pw));

         setTotalLec1(tLec1)
         setTotalLab1(tLab1)
         setTotalUnit1(tUnit1)
         setTotalHr1(tHrPw1)
      });
  }

  useEffect(() => {
    allCurrSub1()
  }, [yearOption]);

  function allCurrSub2(){
    let year="";
    const curriculum_id = getCurriculumID();
    if (yearOption == 10){
      year = "first_year"
    } else if (yearOption == 20){
      year = "second_year"
    } else if (yearOption == 30){
      year = "third_year"
    } else if (yearOption == 40){
      year = "fourth_year"
    }
    const sub2Ref = collection(db, "curriculumns", curriculum_id, "versions", props.data, year);
    const q = query(sub2Ref, where("curr_sem", '==', 2));
    let tLec2 = 0
    let tLab2 = 0
    let tUnit2 = 0
    let tHrPw2 = 0
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const subs = [];
      querySnapshot.forEach((doc) => {
          subs.push({ ...doc.data(), id: doc.id });
      });
        setSubjects2(subs)

        tLec2 = 0
        tLab2 = 0
        tUnit2 = 0
        tHrPw2 = 0

         subs.map((currSub) => tLec2 += Number(currSub.sub_lec));
         subs.map((currSub) => tLab2 += Number(currSub.sub_lab));
         subs.map((currSub) => tUnit2 += Number(currSub.total_units));
         subs.map((currSub) => tHrPw2 += Number(currSub.hour_pw));

         setTotalLec2(tLec2)
         setTotalLab2(tLab2)
         setTotalUnit2(tUnit2)
         setTotalHr2(tHrPw2)
      });
  }

  useEffect(() => {
    allCurrSub2()
  }, [yearOption]);

  const handleClickOpen = () => {
    const value = props.data
    setVersion(value)
    alert(props.data)
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const setOption = (event) =>{
    setYearOption(event.target.value)
  }

  return(
    <div style={{display : 'inline-block'}} >
      
    <ListItem button onClick={handleClickOpen} divider> 
    <ListItemText disableTypography style={summary} primary={'v '+props.data} /> 
    </ListItem>
    <Dialog open={open}
    onClose={handleClose}
    maxWidth="1000"
    >
      <DialogTitle
      display="flex"
      justifyContent="center" >Import Subject</DialogTitle>

    <DialogContent>
    <Card {...props}>
        <Box>
        <TableHead>
                <TableCell  sx={{width:'20%', backgroundColor:'#ffffff'}}>
                </TableCell>
                <TableCell sx={{width:'23.5%'}}>
                    <Box>
                    <FormControl fullWidth>
                    <InputLabel variant="standard" 
                    htmlFor="uncontrolled-native"
                    >
                      Year Level
                    </InputLabel>
                    <NativeSelect
                      onChange={(event)=>{
                        setOption(event)
                        
                      }}
                      defaultValue={10}
                      inputProps={{
                        name: 'year',
                        id: 'uncontrolled-native',
                      }}
                    >
                      <option value={10}>First Year</option>
                      <option value={20}>Second Year</option>
                      <option value={30}>Third Year</option>
                      <option value={40}>Fourth Year</option>
                    </NativeSelect>
                  </FormControl>
                  </Box>
                </TableCell>
              </TableHead>
              <br></br>
              <TableCell>
              <p><b>First Semester</b></p>
              </TableCell>
  
    <Divider />
    
    {/*First Semester Header*/}
    <Table>
    <TableBody>
                  <TableCell sx={{fontWeight: 'bold', backgroundColor:'#F8ECD1' }}>
                    COURSE CODE
                  </TableCell>
                  <TableCell sx={{fontWeight: 'bold', backgroundColor:'#F8ECD1'}}>
                    DESCRIPTIVE TITLE
                  </TableCell>
                  <TableCell sx={{fontWeight: 'bold', textAlign:'center', backgroundColor:'#F8ECD1'}}>
                    LEC UNITS
                  </TableCell>
                  <TableCell sx={{fontWeight: 'bold', textAlign:'center', backgroundColor:'#F8ECD1'}}>
                    LAB UNITS
                  </TableCell>
                  <TableCell sx={{fontWeight: 'bold', textAlign:'center', backgroundColor:'#F8ECD1'}}>
                    TOTAL UNITS
                  </TableCell>
                  <TableCell sx={{fontWeight: 'bold', textAlign:'center', backgroundColor:'#F8ECD1'}}>
                    HOURS PER WEEK
                  </TableCell>
                  <TableCell sx={{fontWeight: 'bold', backgroundColor:'#F8ECD1'}}>
                    PRE-REQ
                  </TableCell>
                  <TableCell sx={{fontWeight: 'bold', backgroundColor:'#F8ECD1'}}>
                    CO-REQ
                  </TableCell>
                  </TableBody>

  {/*First Semester TextFields*/}  
     
     {subjects1.map((subject1) => (
                <TableRow
                  hover
                  key={subject1.id}
                >
                  <TableCell sx={{pl: 3}}>
                    {subject1.sub_code}
                  </TableCell>
                  <TableCell sx={{pl: 3}}>
                    {subject1.sub_desc}
                  </TableCell>
                  <TableCell sx={{textAlign:'center'}}>
                    {Number(subject1.sub_lec).toFixed(1)}
                  </TableCell>
                  <TableCell sx={{textAlign:'center'}}>
                    {Number(subject1.sub_lab).toFixed(1)}
                  </TableCell>
                  <TableCell sx={{textAlign:'center'}}>
                    {Number(subject1.total_units).toFixed(1)}
                  </TableCell>
                  <TableCell sx={{textAlign:'center'}}>
                    {Number(subject1.hour_pw).toFixed(1)}
                  </TableCell>
                  <TableCell sx={{pl: 3}}>
                    {subject1.sub_preReq}
                  </TableCell>
                  <TableCell sx={{pl: 3}}>
                    {subject1.sub_coReq}
                  </TableCell>
                </TableRow>
              ))}
              <TableCell sx={{backgroundColor:'#D0C9C0'}}>
              </TableCell>
              <TableCell sx={{textAlign:'center', backgroundColor:'#D0C9C0'}}>
              <b>TOTAL :</b>
              </TableCell>
              <TableCell sx={{textAlign:'center', backgroundColor:'#D0C9C0'}}>
              <b>{ totalLec1.toFixed(1) }</b>
              </TableCell>
              <TableCell sx={{textAlign:'center', backgroundColor:'#D0C9C0'}}>
              <b>{ totalLab1.toFixed(1) }</b>
              </TableCell>
              <TableCell sx={{textAlign:'center', backgroundColor:'#D0C9C0'}}>
              <b>{ totalUnit1.toFixed(1) }</b>
              </TableCell>
              <TableCell sx={{textAlign:'center', backgroundColor:'#D0C9C0'}}>
              <b>{ totalHr1.toFixed(1) }</b>
              </TableCell>
              <TableCell sx={{backgroundColor:'#D0C9C0'}}>
              </TableCell>
              <TableCell sx={{backgroundColor:'#D0C9C0'}}>
              </TableCell>
            </Table>

 {/*Second Semester Headings*/}

 <Divider />
            <TableCell>
              <p><b>Second Semester</b></p>
              </TableCell>
              <Divider />
              <Table>
    <TableBody>
                  <TableCell sx={{fontWeight: 'bold', backgroundColor:'#F8ECD1' }}>
                    COURSE CODE
                  </TableCell>
                  <TableCell sx={{fontWeight: 'bold', backgroundColor:'#F8ECD1'}}>
                    DESCRIPTIVE TITLE
                  </TableCell>
                  <TableCell sx={{fontWeight: 'bold', textAlign:'center', backgroundColor:'#F8ECD1'}}>
                    LEC UNITS
                  </TableCell>
                  <TableCell sx={{fontWeight: 'bold', textAlign:'center', backgroundColor:'#F8ECD1'}}>
                    LAB UNITS
                  </TableCell>
                  <TableCell sx={{fontWeight: 'bold', textAlign:'center', backgroundColor:'#F8ECD1'}}>
                    TOTAL UNITS
                  </TableCell>
                  <TableCell sx={{fontWeight: 'bold', textAlign:'center', backgroundColor:'#F8ECD1'}}>
                    HOURS PER WEEK
                  </TableCell>
                  <TableCell sx={{fontWeight: 'bold', backgroundColor:'#F8ECD1'}}>
                    PRE-REQ
                  </TableCell>
                  <TableCell sx={{fontWeight: 'bold', backgroundColor:'#F8ECD1'}}>
                    CO-REQ
                  </TableCell>
                  </TableBody>

  {/*First Semester TextFields*/}  
     
     {subjects2.map((subject2) => (
                <TableRow
                  hover
                  key={subject2.id}
                >
                  <TableCell sx={{pl: 3}}>
                    {subject2.sub_code}
                  </TableCell>
                  <TableCell sx={{pl: 3}}>
                    {subject2.sub_desc}
                  </TableCell>
                  <TableCell sx={{textAlign:'center'}}>
                    {Number(subject2.sub_lec).toFixed(1)}
                  </TableCell>
                  <TableCell sx={{textAlign:'center'}}>
                    {Number(subject2.sub_lab).toFixed(1)}
                  </TableCell>
                  <TableCell sx={{textAlign:'center'}}>
                    {Number(subject2.total_units).toFixed(1)}
                  </TableCell>
                  <TableCell sx={{textAlign:'center'}}>
                    {Number(subject2.hour_pw).toFixed(1)}
                  </TableCell>
                  <TableCell sx={{pl: 3}}>
                    {subject2.sub_preReq}
                  </TableCell>
                  <TableCell sx={{pl: 3}}>
                    {subject2.sub_coReq}
                  </TableCell>
                </TableRow>
              ))}
              <TableCell sx={{backgroundColor:'#D0C9C0'}}>
              </TableCell>
              <TableCell sx={{textAlign:'center', backgroundColor:'#D0C9C0'}}>
              <b>TOTAL :</b>
              </TableCell>
              <TableCell sx={{textAlign:'center', backgroundColor:'#D0C9C0'}}>
              <b>{ totalLec2.toFixed(1) }</b>
              </TableCell>
              <TableCell sx={{textAlign:'center', backgroundColor:'#D0C9C0'}}>
              <b>{ totalLab2.toFixed(1) }</b>
              </TableCell>
              <TableCell sx={{textAlign:'center', backgroundColor:'#D0C9C0'}}>
              <b>{ totalUnit2.toFixed(1) }</b>
              </TableCell>
              <TableCell sx={{textAlign:'center', backgroundColor:'#D0C9C0'}}>
              <b>{ totalHr2.toFixed(1) }</b>
              </TableCell>
              <TableCell sx={{backgroundColor:'#D0C9C0'}}>
              </TableCell>
              <TableCell sx={{backgroundColor:'#D0C9C0'}}>
              </TableCell>
            </Table>
    </Box>
  </Card>
  </DialogContent>

          <DialogActions>
          <Box>
            <Button
            color="primary"
            onClick={handleClose}>Close
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
      </div>
  )
}
    
export const HistoryLog = (props) => {
  
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
            return ( 
              <VersionDialog data={data.id} /> 
            )
        })
        }

      </List>
  </Card>
  )
}
