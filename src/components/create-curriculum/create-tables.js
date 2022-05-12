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
  import React, { Component, useState, useEffect } from 'react';
  import { useAuth } from 'src/contexts/AuthContext';
  import { deleteDoc, getDocs, collection, doc, onSnapshot, query, where } from 'firebase/firestore';
  import { db } from 'src/firebase/firebase-auth'
  
import ArrowRightIcon from '@mui/icons-material/ArrowRight';


export default function ImportDialog(){

}

export const CreateTables = (props) => {
  const [subjects1, setSubjects1] = useState([]);
  const [subjects2, setSubjects2] = useState([]);
  const [totalLec1, setTotalLec1] = useState(0)
  const [totalLab1, setTotalLab1] = useState(0)
  const [totalUnit1, setTotalUnit1] = useState(0)
  const [totalHr1, setTotalHr1] = useState(0)
  const [totalLec2, setTotalLec2] = useState(0)
  const [totalLab2, setTotalLab2] = useState(0)
  const [totalUnit2, setTotalUnit2] = useState(0)
  const [totalHr2, setTotalHr2] = useState(0)
  const { currentUser } = useAuth()

  function allCurrSub1(){
    const sub1Ref = collection(db, "curriculumns", "ps9MYwDR6ubdupS6P7TT", "first_year");
    const q = query(sub1Ref, where("curr_sem", '==',1));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const subs = [];
      querySnapshot.forEach((doc) => {
          subs.push({ ...doc.data(), id: doc.id });
      });
         setSubjects1(subs)
      });
  }

  useEffect(() => {
    allCurrSub1()
  }, []);

  function allCurrSub2(){
    const sub2Ref = collection(db, "curriculumns", "ps9MYwDR6ubdupS6P7TT", "first_year");
    const q = query(sub2Ref, where("curr_sem", '==',2));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const subs = [];
      querySnapshot.forEach((doc) => {
          subs.push({ ...doc.data(), id: doc.id });
      });
         setSubjects2(subs)
      });
  }

  useEffect(() => {
    allCurrSub2()
  }, []);

  return (
  <Card {...props}>
        <Box>
        <TableHead>
                <TableCell  sx={{width:'20%', backgroundColor:'#ffffff'}}>
                </TableCell>
                <TableCell sx={{width:'20%'}}>
                    <Box>
                    <FormControl fullWidth>
                    <InputLabel variant="standard" 
                    htmlFor="uncontrolled-native"
                    >
                      Year Level
                    </InputLabel>
                    <NativeSelect
                    
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
     
     {currentUser && subjects1.map((subject1) => (
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
                    {subject1.sub_lec}
                  </TableCell>
                  <TableCell sx={{textAlign:'center'}}>
                    {subject1.sub_lab}
                  </TableCell>
                  <TableCell sx={{textAlign:'center'}}>
                    {subject1.total_units}
                  </TableCell>
                  <TableCell sx={{textAlign:'center'}}>
                    {subject1.hour_pw}
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
              <b>TOTAL:</b>
              </TableCell>
              <TableCell sx={{textAlign:'center', backgroundColor:'#D0C9C0'}}>
              <b>0</b>
              </TableCell>
              <TableCell sx={{textAlign:'center', backgroundColor:'#D0C9C0'}}>
              <b>0</b>
              </TableCell>
              <TableCell sx={{textAlign:'center', backgroundColor:'#D0C9C0'}}>
              <b>0</b>
              </TableCell>
              <TableCell sx={{textAlign:'center', backgroundColor:'#D0C9C0'}}>
              <b>0</b>
              </TableCell>
              <TableCell sx={{backgroundColor:'#D0C9C0'}}>
              </TableCell>
              <TableCell sx={{backgroundColor:'#D0C9C0'}}>
              </TableCell>
            </Table>
            <Table>
              <TableRow>
              <TableCell sx={{textAlign:'center', width: '50%'}}>
                hello
              </TableCell>
              <TableCell sx={{textAlign:'center', width: '50%'}}>
                warrup
              </TableCell>
              </TableRow>
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
     
     {currentUser && subjects2.map((subject2) => (
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
                    {subject2.sub_lec}
                  </TableCell>
                  <TableCell sx={{textAlign:'center'}}>
                    {subject2.sub_lab}
                  </TableCell>
                  <TableCell sx={{textAlign:'center'}}>
                    {subject2.total_units}
                  </TableCell>
                  <TableCell sx={{textAlign:'center'}}>
                    {subject2.hour_pw}
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
              <b>TOTAL:</b>
              </TableCell>
              <TableCell sx={{textAlign:'center', backgroundColor:'#D0C9C0'}}>
              <b>0</b>
              </TableCell>
              <TableCell sx={{textAlign:'center', backgroundColor:'#D0C9C0'}}>
              <b>0</b>
              </TableCell>
              <TableCell sx={{textAlign:'center', backgroundColor:'#D0C9C0'}}>
              <b>0</b>
              </TableCell>
              <TableCell sx={{textAlign:'center', backgroundColor:'#D0C9C0'}}>
              <b>0</b>
              </TableCell>
              <TableCell sx={{backgroundColor:'#D0C9C0'}}>
              </TableCell>
              <TableCell sx={{backgroundColor:'#D0C9C0'}}>
              </TableCell>
            </Table>
            <Table>
              <TableRow>
              <TableCell sx={{textAlign:'center', width: '50%'}}>
                hello
              </TableCell>
              <TableCell sx={{textAlign:'center', width: '50%'}}>
                warrup
              </TableCell>
              </TableRow>
            </Table>
       

    </Box>
  </Card>
);
}
