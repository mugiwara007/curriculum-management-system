import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  CardContent,
  TextField,
  TableCell,
  InputAdornment,
  TableHead,
  TablePagination,
  TableRow,
  SvgIcon,
  Typography,
  Button,
  } from '@mui/material';
    import Divider from '@mui/material/Divider';
  import InputLabel from '@mui/material/InputLabel';
  import FormControl from '@mui/material/FormControl';
  import NativeSelect from '@mui/material/NativeSelect';
  import React, { useState, useEffect } from 'react';
  import { useAuth } from 'src/contexts/AuthContext';
  import { collection, onSnapshot, query, where, doc, deleteDoc, updateDoc } from 'firebase/firestore';
  import { db } from 'src/firebase/firebase-auth'
  import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { ImportDialog } from './import-subject';
import { AddCurrSubDialog } from './add-curr-subject';
import { sub, subMinutes } from 'date-fns';
import Delete from '@mui/icons-material/Delete';
import * as Yup from 'yup';
import EditIcon from '@mui/icons-material/Edit';
import { useFormik } from 'formik';

export default function UpdateSubDialog(props) {
  const { currentUser } = useAuth()
  const [open, setOpen] = useState(false);

  const formik = useFormik({
    initialValues: {
      sCode: props.sub_code,
      sDesc: props.sub_desc,
      sLec: props.sub_lec,
      sLab: props.sub_lab,
      sTotalUn: props.total_units,
      sHours: props.hour_pw,
      sPreReq: props.sub_preReq,
      sCoReq: props.sub_coReq
    },
    validationSchema: Yup.object({
      sCode: Yup
        .string()
        .max(255)
        .required(
          'Subject code is required'),
      sDesc: Yup
        .string()
        .max(255)
        .required(
          'Subject description is required'),
      sLec: Yup
        .number()
        .max(99999999999)
        .required(
          'LEC units is required'),
      sLab: Yup
        .number()
        .max(99999999999)
        .required(
          'LAB units is required'),
      sTotalUn: Yup
        .number()
        .max(99999999999)
        .required(
          'Total units units is required'),
      sHours: Yup
          .number()
          .max(99999999999)
          .required(
            'Hours per week units is required'),
      sPreReq: Yup
        .string()
        .max(255)
        .required(
          'Pre-requisite is required'),
      sCoReq: Yup
        .string()
        .max(255)
        .required(
          'Co-requisite is required'),
    }),
    onSubmit: () => {
      if (currentUser){
      updateSubject(
        formik.values.sCode,
        formik.values.sDesc,
        formik.values.sLec,
        formik.values.sLab,
        formik.values.sTotalUn,
        formik.values.sHours,
        formik.values.sPreReq,
        formik.values.sCoReq,
      )
      }
      formik.setSubmitting(false)
    }
  });
  
const updateSubject = (newSubCode,newSubDesc,newSubLec,newSubLab,newTotalUnits,newHrPW,
  newSubPreReq,newSubCoReq) => {
    let nyear="";
    if (props.year == 10){
      nyear = "first_year"
    } else if (props.year == 20){
      nyear = "second_year"
    } else if (props.year == 30){
      nyear = "third_year"
    } else if (props.year == 40){
      nyear = "fourth_year"
    }                           
                                                //curriculum id
    const subjectDoc = doc(db, "curriculumns", "ps9MYwDR6ubdupS6P7TT", nyear, props.sub_id);
    const newFields = { 
      sub_code: newSubCode,
      sub_desc: newSubDesc,
      sub_lec: newSubLec,
      sub_lab: newSubLab,
      total_units: newTotalUnits,
      hour_pw: newHrPW,
      sub_preReq: newSubPreReq,
      sub_coReq: newSubCoReq
    };
    updateDoc(subjectDoc, newFields);
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={{display : 'inline-block'}} >
      <Button
        startIcon={(<EditIcon fontSize="small" />)}
        variant="outlined"
        sx={{ mr: 1 }}
        onClick={handleClickOpen} >
          Update
      </Button>
      <Dialog open={open}
      onClose={handleClose}
      >
        <form onSubmit={formik.handleSubmit}>
        <DialogTitle
        display="flex"
        justifyContent="center" >Update Subject</DialogTitle>

          <DialogContent>
                      
              <TextField
                error={Boolean(formik.touched.sCode && formik.errors.sCode)}
                fullWidth
                helperText={formik.touched.sCode && formik.errors.sCode}
                label='Subject Code'
                margin="normal"
                name="sCode"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.sCode}
                variant="outlined"
              />

              <TextField
                error={Boolean(formik.touched.sDesc && formik.errors.sDesc)}
                fullWidth
                helperText={formik.touched.sDesc && formik.errors.sDesc}
                label='Subject Description'
                margin="normal"
                name="sDesc"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.sDesc}
                variant="outlined"
              />


              <TextField
                error={Boolean(formik.touched.sLec && formik.errors.sLec)}
                fullWidth
                helperText={formik.touched.sLec && formik.errors.sLec}
                label='LEC Units'
                margin="normal"
                name="sLec"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.sLec}
                variant="outlined"
              />

              <TextField
                error={Boolean(formik.touched.sLab && formik.errors.sLab)}
                fullWidth
                helperText={formik.touched.sLab && formik.errors.sLab}
                label='LAB Units'
                margin="normal"
                name="sLab"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.sLab}
                variant="outlined"
              />

              <TextField
                error={Boolean(formik.touched.sTotalUn && formik.errors.sTotalUn)}
                fullWidth
                helperText={formik.touched.sTotalUn && formik.errors.sTotalUn}
                label='Total Units'
                margin="normal"
                name="sTotalUn"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.sTotalUn}
                variant="outlined"
              />

              <TextField
                error={Boolean(formik.touched.sHours && formik.errors.sHours)}
                fullWidth
                helperText={formik.touched.sHours && formik.errors.sHours}
                label='Hours Per Week'
                margin="normal"
                name="sHours"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.sHours}
                variant="outlined"
              />

              <TextField
                error={Boolean(formik.touched.sPreReq && formik.errors.sPreReq)}
                fullWidth
                helperText={formik.touched.sPreReq && formik.errors.sPreReq}
                label='Subject Pre-Requisite'
                margin="normal"
                name="sPreReq"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.sPreReq}
                variant="outlined"
              />

              <TextField
                error={Boolean(formik.touched.sCoReq && formik.errors.sCoReq)}
                fullWidth
                helperText={formik.touched.sCoReq && formik.errors.sCoReq}
                label='Subject Co-Requisite'
                margin="normal"
                name="sCoReq"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.sCoReq}
                variant="outlined"
              />
                  
            </DialogContent>

          <DialogActions>
          <Box>
            <Button
            color="primary"
            onClick={handleClose}>Cancel
            </Button>
          </Box>
          <Box p={2}>
            <Button
            color="primary"
            variant='contained'
            disabled={formik.isSubmitting}
            type="submit"
            onClick={handleClose}>
              Done
            </Button>
          </Box>
        </DialogActions>
        </form>
      </Dialog>
      </div>
  );
}

export const DeleteSubDialog = (props) =>{
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteSubject = async () => {
    let nyear="";
    if (props.year == 10){
      nyear = "first_year"
    } else if (props.year == 20){
      nyear = "second_year"
    } else if (props.year == 30){
      nyear = "third_year"
    } else if (props.year == 40){
      nyear = "fourth_year"
    }                                         //collection id ng curriculum
    const subjectDoc = doc(db, "curriculumns", "ps9MYwDR6ubdupS6P7TT", nyear, props.id);
    await deleteDoc(subjectDoc);
  };


  return (
    <div style={{display : 'inline-block'}} >
      <Button
          color="error"
          variant="contained"
          startIcon={(<Delete fontSize="small" />)}
          onClick={handleClickOpen}
        >
          Delete
        </Button>
      <Dialog open={open}
        onClose={handleClose}>
        <DialogTitle
        display="flex"
        justifyContent="center"
        >Delete Subject</DialogTitle>
        <DialogContent>
        <p>Are you sure you want to delete this?</p>
        </DialogContent>
        <DialogActions>
          <Box>
              <Button
              color="primary"
              onClick={handleClose}>Cancel
              </Button>
            </Box>
            <Box p={2}>
              <Button
              color="primary"
              variant='contained'
              type="submit"
              onClick={deleteSubject}>
                Confirm
              </Button>
            </Box>
        </DialogActions>
      </Dialog>
      </div>
  );
}

export const CreateTables = (props) => {
  const [subjects1, setSubjects1] = useState([]);
  const [subjects2, setSubjects2] = useState([]);
  const { currentUser } = useAuth()
  const [totalLec1, setTotalLec1] = useState(0);
  const [totalLab1, setTotalLab1] = useState(0);
  const [totalUnit1, setTotalUnit1] = useState(0);
  const [totalHr1, setTotalHr1] = useState(0);
  const [totalLec2, setTotalLec2] = useState(0);
  const [totalLab2, setTotalLab2] = useState(0);
  const [totalUnit2, setTotalUnit2] = useState(0);
  const [totalHr2, setTotalHr2] = useState(0);
  const [yearOption, setYearOption] = useState(10)

  function allCurrSub1(){
    let year="";
    if (yearOption == 10){
      year = "first_year"
    } else if (yearOption == 20){
      year = "second_year"
    } else if (yearOption == 30){
      year = "third_year"
    } else if (yearOption == 40){
      year = "fourth_year"
    }
    const sub1Ref = collection(db, "curriculumns", "ps9MYwDR6ubdupS6P7TT", year);
    const q = query(sub1Ref, where("curr_sem", '==',1));
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
  }, [yearOption,subjects1]);

  function allCurrSub2(){
    let year="";
    if (yearOption == 10){
      year = "first_year"
    } else if (yearOption == 20){
      year = "second_year"
    } else if (yearOption == 30){
      year = "third_year"
    } else if (yearOption == 40){
      year = "fourth_year"
    }
    const sub2Ref = collection(db, "curriculumns", "ps9MYwDR6ubdupS6P7TT", year);
    const q = query(sub2Ref, where("curr_sem", '==',2));
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
  }, [yearOption,subjects2]);

  const setOption = (event) =>{
    setYearOption(event.target.value)
  }

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
                      onChange={setOption}
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
                  <TableCell sx={{fontWeight: 'bold', textAlign:'center', backgroundColor:'#F8ECD1'}}>
                    ACTION
                  </TableCell>
                  <TableCell sx={{fontWeight: 'bold', textAlign:'center', backgroundColor:'#F8ECD1'}}>
              
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
                  <TableCell>
                    <UpdateSubDialog  
                      sub_id={subject1.id}
                      sub_code={subject1.sub_code}
                      sub_desc={subject1.sub_desc}
                      sub_lec={subject1.sub_lec}
                      sub_lab={subject1.sub_lab}
                      total_units={subject1.total_units}
                      hour_pw={subject1.hour_pw}
                      sub_preReq={subject1.sub_preReq}
                      sub_coReq={subject1.sub_coReq}
                      year={yearOption}/>
                  </TableCell>
                  <TableCell>
                    <DeleteSubDialog id={subject1.id} year={yearOption} />
                  </TableCell>
                </TableRow>
              ))}
              <TableCell sx={{backgroundColor:'#D0C9C0'}}>
              </TableCell>
              <TableCell sx={{textAlign:'center', backgroundColor:'#D0C9C0'}}>
              <b>TOTAL:</b>
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
              <TableCell sx={{backgroundColor:'#D0C9C0'}}>
              </TableCell>
              <TableCell sx={{backgroundColor:'#D0C9C0'}}>
              </TableCell>
            </Table>
            <Table>
              <TableRow>
              <TableCell sx={{textAlign:'center', width: '50%'}}>
                <ImportDialog value='1' />
              </TableCell>
              <TableCell sx={{textAlign:'center', width: '50%'}}>
                <AddCurrSubDialog value="1" />
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
                  <TableCell sx={{fontWeight: 'bold', textAlign:'center', backgroundColor:'#F8ECD1'}}>
                    ACTION
                  </TableCell>
                  <TableCell sx={{fontWeight: 'bold', textAlign:'center', backgroundColor:'#F8ECD1'}}>
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
                  <TableCell>
                    <UpdateSubDialog  
                      sub_id={subject2.id}
                      sub_code={subject2.sub_code}
                      sub_desc={subject2.sub_desc}
                      sub_lec={subject2.sub_lec}
                      sub_lab={subject2.sub_lab}
                      total_units={subject2.total_units}
                      hour_pw={subject2.hour_pw}
                      sub_preReq={subject2.sub_preReq}
                      sub_coReq={subject2.sub_coReq}
                      year={yearOption}/>
                  </TableCell>
                  <TableCell>
                    <DeleteSubDialog id={subject2.id} year={yearOption} />
                  </TableCell>
                </TableRow>
              ))}
              <TableCell sx={{backgroundColor:'#D0C9C0'}}>
              </TableCell>
              <TableCell sx={{textAlign:'center', backgroundColor:'#D0C9C0'}}>
              <b>TOTAL:</b>
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
              <TableCell sx={{backgroundColor:'#D0C9C0'}}>
              </TableCell>
              <TableCell sx={{backgroundColor:'#D0C9C0'}}>
              </TableCell>
            </Table>
            <Table>
              <TableRow>
              <TableCell sx={{textAlign:'center', width: '50%'}}>
                <ImportDialog value='2' />
              </TableCell>
              <TableCell sx={{textAlign:'center', width: '50%'}}>
                <AddCurrSubDialog value="2" />
              </TableCell>
              </TableRow>
            </Table>
       

    </Box>
  </Card>
);
}
