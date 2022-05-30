import { useState, useRef, useEffect } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TextField,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  Button,
} from '@mui/material';
import Stack from '@mui/material/Stack';
import { getInitials } from '../../utils/get-initials';
import ReportIcon from '@mui/icons-material/Report';
import ReactPDF from '@react-pdf/renderer';
import NativeSelect from '@mui/material/NativeSelect';
import EditIcon from '@mui/icons-material/Edit';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import PrintIcon from '@mui/icons-material/Print';
import Dialog from '@mui/material/Dialog';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { useFormik } from 'formik';
import { useReactToPrint } from "react-to-print";
import DialogTitle from '@mui/material/DialogTitle';
import * as React from 'react';
import { subAuth } from '../data-handling/subject-crud';
import { useAuth } from 'src/contexts/AuthContext';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import ArchiveIcon from '@mui/icons-material/Archive';
import { getCurriculumID, setCurriculumID } from '../create-curriculum/curriculum-model';
import { useRouter } from 'next/router';
import { db } from 'src/firebase/firebase-auth';
import { doc, updateDoc, getDocs, setDoc } from "firebase/firestore";
import { getUserLevel } from '../userModel';
import { setVersion } from "src/components/create-curriculum/curriculum-model"
import { collection, query, where, onSnapshot } from "firebase/firestore"

export default function UpdateModal(props) 
{
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(props.data)
  const [DeptCode, setDeptCode] = React.useState();

  const handleClickOpen = () => 
  {
    setOpen(true);
  };

  const handleClose = () => 
  {
    setOpen(false);
  };

  const handleChange = (SelectChangeEvent) => 
  {
    setDeptCode(event.target.value);
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
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle display="flex" justifyContent="center" >Update Subject</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              label="Curriculum Code" 
              variant="outlined" 
              margin="normal"
              type="text"
              value={data.currCode}
              />

            <TextField
            fullWidth
            label="CMO" 
            variant="outlined" 
            margin="normal"
            type="text"
            value={data.cmo}
            />

            <TextField
            fullWidth
            label="Version" 
            variant="outlined" 
            margin="normal"
            type="text"
            value={data.currVersion}
            />
            
            <FormControl sx={{ m: "auto", mt: 1, width: 1}}>
              <InputLabel id="demo-simple-select-autowidth-label">Department Code</InputLabel>
              <Select
                value={DeptCode}
                onChange={handleChange}
                fullWidth
                label="Department Code"
              >
                <MenuItem value=""><em>None</em></MenuItem>
                <MenuItem value={10}>BSIT</MenuItem>
                <MenuItem value={21}>BSIS</MenuItem>
              </Select>
            </FormControl>

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
              onClick={()=>{
                console.log(data)
              }}>
                Done
              </Button>
            </Box>
          </DialogActions>
      </Dialog>
    </div>
  );
}

export function ArchiveModal(props) 
{
  const [open, setOpen] = useState(false);
  const handleDeleteClickOpen = () => 
  {
    setOpen(true);
  };

  const handleDeleteClose = () => 
  {
    setOpen(false);
  };

  return (
    <div style={{display : 'inline-block'}} >
      <Button
        color="info"
        startIcon={(<ArchiveIcon fontSize="small" />)}
        variant="outlined"
        sx={{ mr: 1 }}
        onClick={handleDeleteClickOpen} >
          Archive
      </Button>
      <Dialog open={open}
      onClose={handleDeleteClose}
      >
        <DialogTitle display="flex" justifyContent="center" >Confirm Archive</DialogTitle>
          <DialogContent>
            <p>Are you sure you want to archive this?</p>
          </DialogContent>

          <DialogActions>
            <Box>
              <Button
                color="primary"
                onClick={handleDeleteClose}>Cancel
              </Button> 
            </Box>

            <Box p={2}>
              <Button
                color="primary"
                variant='contained'
                type="submit"
                onClick={handleDeleteClose}>
                  Confirm
              </Button>
          </Box>
          </DialogActions>
      </Dialog>
    </div>
  );
}

export function DownloadPDF(props)
{
  console.log("LOOP")
  const componentRef = useRef();

  /******QUERIES*******/
  //1st YEAR
  const [first_year, setFirstYear] = React.useState([])
  const first_year_query = query(collection(db, "curriculumns",props.id,"first_year"));
  //2nd YEAR
  const [second_year, setSecondYear] = React.useState([])
  const second_year_query = query(collection(db, "curriculumns",props.id,"second_year"));
  //3rd YEAR
  const [third_year, setThirdYear] = React.useState([])
  const third_year_query = query(collection(db, "curriculumns",props.id,"third_year"));
  //4th YEAR
  const [fourth_year, setFourthYear] = React.useState([])
  const fourth_year_query = query(collection(db, "curriculumns",props.id,"fourth_year"));



  /******YEAR LEVELS******/
  //1st YR
  const [subjects1Y1S, setSubjects1Y1S] = useState([]);
  const [subjects1Y2S, setSubjects1Y2S] = useState([]);

  //2nd YR
  const [subjects2Y1S, setSubjects2Y1S] = useState([]);
  const [subjects2Y2S, setSubjects2Y2S] = useState([]);

  //3rd YR
  const [subjects3Y1S, setSubjects3Y1S] = useState([]);
  const [subjects3Y2S, setSubjects3Y2S] = useState([]);

  //4th YR
  const [subjects4Y1S, setSubjects4Y1S] = useState([]);
  const [subjects4Y2S, setSubjects4Y2S] = useState([]);



  /*****SUBJECT INFORMATIONS*******/
  //1st YR 1st SEM SUB INFO
  const [totalLec1, setTotalLec1] = useState(0);
  const [totalLab1, setTotalLab1] = useState(0);
  const [totalUnit1, setTotalUnit1] = useState(0);
  const [totalHr1, setTotalHr1] = useState(0);
  //1st YR 2nd SEM SUB INFO
  const [totalLec2, setTotalLec2] = useState(0);
  const [totalLab2, setTotalLab2] = useState(0);
  const [totalUnit2, setTotalUnit2] = useState(0);
  const [totalHr2, setTotalHr2] = useState(0);

  //2nd YR 1st SEM SUB INFO
  const [totalLec2y1s, setTotalLec2y1s] = useState(0);
  const [totalLab2y1s, setTotalLab2y1s] = useState(0);
  const [totalUnit2y1s, setTotalUnit2y1s] = useState(0);
  const [totalHr2y1s, setTotalHr2y1s] = useState(0);
  //2nd YR 2nd SEM SUB INFO
  const [totalLec2y2s, setTotalLec2y2s] = useState(0);
  const [totalLab2y2s, setTotalLab2y2s] = useState(0);
  const [totalUnit2y2s, setTotalUnit2y2s] = useState(0);
  const [totalHr2y2s, setTotalHr2y2s] = useState(0);

  //3rd YR 1st SEM SUB INFO
  const [totalLec3y1s, setTotalLec3y1s] = useState(0);
  const [totalLab3y1s, setTotalLab3y1s] = useState(0);
  const [totalUnit3y1s, setTotalUnit3y1s] = useState(0);
  const [totalHr3y1s, setTotalHr3y1s] = useState(0);
  //3rd YR 2nd SEM SUB INFO
  const [totalLec3y2s, setTotalLec3y2s] = useState(0);
  const [totalLab3y2s, setTotalLab3y2s] = useState(0);
  const [totalUnit3y2s, setTotalUnit3y2s] = useState(0);
  const [totalHr3y2s, setTotalHr3y2s] = useState(0);

  //4th YR 1st SEM SUB INFO
  const [totalLec4y1s, setTotalLec4y1s] = useState(0);
  const [totalLab4y1s, setTotalLab4y1s] = useState(0);
  const [totalUnit4y1s, setTotalUnit4y1s] = useState(0);
  const [totalHr4y1s, setTotalHr4y1s] = useState(0);
  //4th YR 2nd SEM SUB INFO
  const [totalLec4y2s, setTotalLec4y2s] = useState(0);
  const [totalLab4y2s, setTotalLab4y2s] = useState(0);
  const [totalUnit4y2s, setTotalUnit4y2s] = useState(0);
  const [totalHr4y2s, setTotalHr4y2s] = useState(0);



  /*****FUNCTIONS*******/
  //1st YEAR 1st SEM FUNCTION
  const allCurrSub1 = async () =>
  {
    let version;
    const currID = props.id;
    const sbjct =[]
    const qry = query(collection(db, "curriculumns", currID, 'versions'));
    const querySnapshot1 = await getDocs(qry);

    querySnapshot1.forEach((doc) => 
    {
      sbjct.push({ ...doc.data(), id: doc.id });
    });

    version = sbjct.length.toString()

    const sub1Ref = collection(db, "curriculumns", currID, 'versions', version, "first_year");
    const q = query(sub1Ref, where("curr_sem", '==' ,1));

    let tLec1 = 0
    let tLab1 = 0
    let tUnit1 = 0
    let tHrPw1 = 0

    const unsubscribe = onSnapshot(q, (querySnapshot) => 
    {
      const subs1 = [];
      querySnapshot.forEach((doc) => {
          subs1.push({ ...doc.data(), id: doc.id });
      });
        setSubjects1Y1S(subs1)

        tLec1 = 0
        tLab1 = 0
        tUnit1 = 0
        tHrPw1 = 0
        
         subs1.map((currSub) => tLec1 += Number(currSub.sub_lec));
         subs1.map((currSub) => tLab1 += Number(currSub.sub_lab));
         subs1.map((currSub) => tUnit1 += Number(currSub.total_units));
         subs1.map((currSub) => tHrPw1 += Number(currSub.hour_pw));

         setTotalLec1(tLec1)
         setTotalLab1(tLab1)
         setTotalUnit1(tUnit1)
         setTotalHr1(tHrPw1)
    });
  }

  useEffect(() => 
  {
    allCurrSub1()
  }, [props.id]);

  //1st YEAR 2nd SEM FUNCTION
  const allCurrSub2 = async () =>
  {
    let version;
    const currID = props.id;
    const sbjct =[]
    const qry = query(collection(db, "curriculumns", currID, 'versions'));
    const querySnapshot1 = await getDocs(qry);

    querySnapshot1.forEach((doc) => 
    {
      sbjct.push({ ...doc.data(), id: doc.id });
    });

    version = sbjct.length.toString()


    const sub2Ref = collection(db, "curriculumns", currID, 'versions', version, "first_year");
    const q2 = query(sub2Ref, where("curr_sem", '==' ,2));

    let tLec2 = 0
    let tLab2 = 0
    let tUnit2 = 0
    let tHrPw2 = 0

    const unsubscribe2 = onSnapshot(q2, (querySnapshot) => 
    {
      const subs1 = [];
      querySnapshot.forEach((doc) => {
          subs1.push({ ...doc.data(), id: doc.id });
      });
        setSubjects1Y2S(subs1)

        tLec2 = 0
        tLab2 = 0
        tUnit2 = 0
        tHrPw2 = 0
        
         subs1.map((currSub) => tLec2 += Number(currSub.sub_lec));
         subs1.map((currSub) => tLab2 += Number(currSub.sub_lab));
         subs1.map((currSub) => tUnit2 += Number(currSub.total_units));
         subs1.map((currSub) => tHrPw2 += Number(currSub.hour_pw));

         setTotalLec2(tLec2)
         setTotalLab2(tLab2)
         setTotalUnit2(tUnit2)
         setTotalHr2(tHrPw2)
    });
  }

  useEffect(() => 
  {
    allCurrSub2()
  }, [props.id]);

  //2nd YEAR 1st SEM FUNCTION
  const allCurrSub2Y1S = async () =>
  {
    let version;
    const currID = props.id;
    const sbjct =[]
    const qry = query(collection(db, "curriculumns", currID, 'versions'));
    const querySnapshot1 = await getDocs(qry);

    querySnapshot1.forEach((doc) => 
    {
      sbjct.push({ ...doc.data(), id: doc.id });
    });

    version = sbjct.length.toString()

    const sub1Ref = collection(db, "curriculumns", currID, 'versions', version, "second_year");
    const q = query(sub1Ref, where("curr_sem", '==' ,1));

    let tLec1 = 0
    let tLab1 = 0
    let tUnit1 = 0
    let tHrPw1 = 0

    const unsubscribe = onSnapshot(q, (querySnapshot) => 
    {
      const subs1 = [];
      querySnapshot.forEach((doc) => {
          subs1.push({ ...doc.data(), id: doc.id });
      });
        setSubjects2Y1S(subs1)

        tLec1 = 0
        tLab1 = 0
        tUnit1 = 0
        tHrPw1 = 0
        
         subs1.map((currSub) => tLec1 += Number(currSub.sub_lec));
         subs1.map((currSub) => tLab1 += Number(currSub.sub_lab));
         subs1.map((currSub) => tUnit1 += Number(currSub.total_units));
         subs1.map((currSub) => tHrPw1 += Number(currSub.hour_pw));

         setTotalLec2y1s(tLec1)
         setTotalLab2y1s(tLab1)
         setTotalUnit2y1s(tUnit1)
         setTotalHr2y1s(tHrPw1)
    });
  }

  useEffect(() => 
  {
    allCurrSub2Y1S()
  }, [props.id]);

  //2nd YEAR 2nd SEM FUNCTION
  const allCurrSub2Y2S = async () =>
  {
    let version;
    const currID = props.id;
    const sbjct =[]
    const qry = query(collection(db, "curriculumns", currID, 'versions'));
    const querySnapshot1 = await getDocs(qry);

    querySnapshot1.forEach((doc) => 
    {
      sbjct.push({ ...doc.data(), id: doc.id });
    });

    version = sbjct.length.toString()


    const sub2Ref = collection(db, "curriculumns", currID, 'versions', version, "second_year");
    const q2 = query(sub2Ref, where("curr_sem", '==' ,2));

    let tLec2 = 0
    let tLab2 = 0
    let tUnit2 = 0
    let tHrPw2 = 0

    const unsubscribe2 = onSnapshot(q2, (querySnapshot) => 
    {
      const subs1 = [];
      querySnapshot.forEach((doc) => {
          subs1.push({ ...doc.data(), id: doc.id });
      });
        setSubjects2Y2S(subs1)

        tLec2 = 0
        tLab2 = 0
        tUnit2 = 0
        tHrPw2 = 0
        
         subs1.map((currSub) => tLec2 += Number(currSub.sub_lec));
         subs1.map((currSub) => tLab2 += Number(currSub.sub_lab));
         subs1.map((currSub) => tUnit2 += Number(currSub.total_units));
         subs1.map((currSub) => tHrPw2 += Number(currSub.hour_pw));

         setTotalLec2y2s(tLec2)
         setTotalLab2y2s(tLab2)
         setTotalUnit2y2s(tUnit2)
         setTotalHr2y2s(tHrPw2)
    });
  }

  useEffect(() => 
  {
    allCurrSub2Y2S()
  }, [props.id]);

  //3rd YEAR 1st SEM FUNCTION
  const allCurrSub3Y1S = async () =>
  {
    let version;
    const currID = props.id;
    const sbjct =[]
    const qry = query(collection(db, "curriculumns", currID, 'versions'));
    const querySnapshot1 = await getDocs(qry);

    querySnapshot1.forEach((doc) => 
    {
      sbjct.push({ ...doc.data(), id: doc.id });
    });

    version = sbjct.length.toString()

    const sub1Ref = collection(db, "curriculumns", currID, 'versions', version, "third_year");
    const q = query(sub1Ref, where("curr_sem", '==' ,1));

    let tLec1 = 0
    let tLab1 = 0
    let tUnit1 = 0
    let tHrPw1 = 0

    const unsubscribe = onSnapshot(q, (querySnapshot) => 
    {
      const subs1 = [];
      querySnapshot.forEach((doc) => {
          subs1.push({ ...doc.data(), id: doc.id });
      });
        setSubjects3Y1S(subs1)

        tLec1 = 0
        tLab1 = 0
        tUnit1 = 0
        tHrPw1 = 0
        
         subs1.map((currSub) => tLec1 += Number(currSub.sub_lec));
         subs1.map((currSub) => tLab1 += Number(currSub.sub_lab));
         subs1.map((currSub) => tUnit1 += Number(currSub.total_units));
         subs1.map((currSub) => tHrPw1 += Number(currSub.hour_pw));

         setTotalLec3y1s(tLec1)
         setTotalLab3y1s(tLab1)
         setTotalUnit3y1s(tUnit1)
         setTotalHr3y1s(tHrPw1)
    });
  }

  useEffect(() => 
  {
    allCurrSub3Y1S()
  }, [props.id]);

  //3rd YEAR 2nd SEM FUNCTION
  const allCurrSub3Y2S = async () =>
  {
    let version;
    const currID = props.id;
    const sbjct =[]
    const qry = query(collection(db, "curriculumns", currID, 'versions'));
    const querySnapshot1 = await getDocs(qry);

    querySnapshot1.forEach((doc) => 
    {
      sbjct.push({ ...doc.data(), id: doc.id });
    });

    version = sbjct.length.toString()


    const sub2Ref = collection(db, "curriculumns", currID, 'versions', version, "third_year");
    const q2 = query(sub2Ref, where("curr_sem", '==' ,2));

    let tLec2 = 0
    let tLab2 = 0
    let tUnit2 = 0
    let tHrPw2 = 0

    const unsubscribe2 = onSnapshot(q2, (querySnapshot) => 
    {
      const subs1 = [];
      querySnapshot.forEach((doc) => {
          subs1.push({ ...doc.data(), id: doc.id });
      });
        setSubjects3Y2S(subs1)

        tLec2 = 0
        tLab2 = 0
        tUnit2 = 0
        tHrPw2 = 0
        
         subs1.map((currSub) => tLec2 += Number(currSub.sub_lec));
         subs1.map((currSub) => tLab2 += Number(currSub.sub_lab));
         subs1.map((currSub) => tUnit2 += Number(currSub.total_units));
         subs1.map((currSub) => tHrPw2 += Number(currSub.hour_pw));

         setTotalLec3y2s(tLec2)
         setTotalLab3y2s(tLab2)
         setTotalUnit3y2s(tUnit2)
         setTotalHr3y2s(tHrPw2)
    });
  }

  useEffect(() => 
  {
    allCurrSub3Y2S()
  }, [props.id]);

  //4th YEAR 1st SEM FUNCTION
  const allCurrSub4Y1S = async () =>
  {
    let version;
    const currID = props.id;
    const sbjct =[]
    const qry = query(collection(db, "curriculumns", currID, 'versions'));
    const querySnapshot1 = await getDocs(qry);

    querySnapshot1.forEach((doc) => 
    {
      sbjct.push({ ...doc.data(), id: doc.id });
    });

    version = sbjct.length.toString()

    const sub1Ref = collection(db, "curriculumns", currID, 'versions', version, "fourth_year");
    const q = query(sub1Ref, where("curr_sem", '==' ,1));

    let tLec1 = 0
    let tLab1 = 0
    let tUnit1 = 0
    let tHrPw1 = 0

    const unsubscribe = onSnapshot(q, (querySnapshot) => 
    {
      const subs1 = [];
      querySnapshot.forEach((doc) => {
          subs1.push({ ...doc.data(), id: doc.id });
      });
        setSubjects4Y1S(subs1)

        tLec1 = 0
        tLab1 = 0
        tUnit1 = 0
        tHrPw1 = 0
        
         subs1.map((currSub) => tLec1 += Number(currSub.sub_lec));
         subs1.map((currSub) => tLab1 += Number(currSub.sub_lab));
         subs1.map((currSub) => tUnit1 += Number(currSub.total_units));
         subs1.map((currSub) => tHrPw1 += Number(currSub.hour_pw));

         setTotalLec4y1s(tLec1)
         setTotalLab4y1s(tLab1)
         setTotalUnit4y1s(tUnit1)
         setTotalHr4y1s(tHrPw1)
    });
  }

  useEffect(() => 
  {
    allCurrSub4Y1S()
  }, [props.id]);

  //4th YEAR 2nd SEM FUNCTION
  const allCurrSub4Y2S = async () =>
  {
    let version;
    const currID = props.id;
    const sbjct =[]
    const qry = query(collection(db, "curriculumns", currID, 'versions'));
    const querySnapshot1 = await getDocs(qry);

    querySnapshot1.forEach((doc) => 
    {
      sbjct.push({ ...doc.data(), id: doc.id });
    });

    version = sbjct.length.toString()


    const sub2Ref = collection(db, "curriculumns", currID, 'versions', version, "fourth_year");
    const q2 = query(sub2Ref, where("curr_sem", '==' ,2));

    let tLec2 = 0
    let tLab2 = 0
    let tUnit2 = 0
    let tHrPw2 = 0

    const unsubscribe2 = onSnapshot(q2, (querySnapshot) => 
    {
      const subs1 = [];
      querySnapshot.forEach((doc) => {
          subs1.push({ ...doc.data(), id: doc.id });
      });
        setSubjects4Y2S(subs1)

        tLec2 = 0
        tLab2 = 0
        tUnit2 = 0
        tHrPw2 = 0
        
         subs1.map((currSub) => tLec2 += Number(currSub.sub_lec));
         subs1.map((currSub) => tLab2 += Number(currSub.sub_lab));
         subs1.map((currSub) => tUnit2 += Number(currSub.total_units));
         subs1.map((currSub) => tHrPw2 += Number(currSub.hour_pw));

         setTotalLec4y2s(tLec2)
         setTotalLab4y2s(tLab2)
         setTotalUnit4y2s(tUnit2)
         setTotalHr4y2s(tHrPw2)
    });
  }

  useEffect(() => 
  {
    allCurrSub4Y2S()
  }, [props.id]);




  /******PUSH******/
  // //1st YEAR
  // const unsubscribe1 = onSnapshot(first_year_query, (querySnapshot) => 
  // {
  //   const temp = [];
  //   querySnapshot.forEach((doc) => {
  //       temp.push(doc.data());
  //   });
  //   setFirstYear(temp)
  // });
  // // //2nd YEAR
  // const unsubscribe2 = onSnapshot(second_year_query, (querySnapshot) => 
  // {
  //   const temp = [];
  //   querySnapshot.forEach((doc) => {
  //       temp.push(doc.data());
  //   });
  //   setSecondYear(temp)
  // });
  // // //3rd YEAR
  // const unsubscribe3 = onSnapshot(third_year_query, (querySnapshot) => 
  // {
  //   const temp = [];
  //   querySnapshot.forEach((doc) => {
  //       temp.push(doc.data());
  //   });
  //   setThirdYear(temp)
  // });
  // // //4th YEAR
  // const unsubscribe4 = onSnapshot(fourth_year_query, (querySnapshot) => 
  // {
  //   const temp = [];
  //   querySnapshot.forEach((doc) => {
  //       temp.push(doc.data());
  //   });
  //   setFourthYear(temp)
  // });

  const downloadPDFButton = useReactToPrint
  ({
    content: () => componentRef.current,
  });

  return (
    <div style={{display : 'inline-block'}} >
      <Button
        color="info"
        startIcon={(<PrintIcon fontSize="small" />)}
        variant="outlined"
        sx={{ mr: 1 }}
        onClick={downloadPDFButton} >
          Generate Report
      </Button>

      <Box sx={{display:'none'}}>
        <Box ref={componentRef}>
        <Card {...props}>
        <Box>
        <TableHead>
                <TableCell  sx={{width:'20%', backgroundColor:'#ffffff'}}>
                </TableCell>
              </TableHead>
              <Stack 
                direction="row" 
                display="flex"
                justifyContent="center"
                alignItems="center">
                <Avatar sx={{ width: 90, height: 90, marginRight: 18}} src="https://firebasestorage.googleapis.com/v0/b/curmasys.appspot.com/o/PDFLogos%2FBSU.png?alt=media&token=f9e6706c-344b-473b-b426-cf826e2d6d1d" />

                <Typography sx={{textAlign: 'center', alignSelf: 'center', marginTop: -2, fontWeight: 'bold', marginBottom: -5}} variant="subtitle1" gutterBottom component="div" fullWidth>
                  Republic of the Philippines
                  <Typography sx={{textAlign: 'center', alignSelf: 'center', marginTop: -1, fontWeight: 'bold'}} variant="subtitle1" gutterBottom component="div" fullWidth>
                    Bulacan State University   
                    <Typography sx={{textAlign: 'center', alignSelf: 'center', marginTop: -1}}  variant="overline" display="block" gutterBottom>
                      City of Malolos, Bulacan
                      <Typography sx={{textAlign: 'center', alignSelf: 'center', marginTop: -2}}  variant="overline" display="block" gutterBottom>
                        Tel/Fax (044) 791-0153
                      </Typography>
                    </Typography>
                  </Typography>
                </Typography>

                <Avatar sx={{ width: 90, height: 90, marginLeft: 18}} src="https://firebasestorage.googleapis.com/v0/b/curmasys.appspot.com/o/PDFLogos%2FCICT.png?alt=media&token=d0a28c1c-d802-4975-8a98-8f3aeedfefa9" />
              </Stack>
                <Typography sx={{textAlign: 'center', alignSelf: 'center', marginBottom: -0.5, fontWeight: 'bold'}} variant="subtitle1" gutterBottom component="div" fullWidth>
                College of Information and Communications Technology
                </Typography>
      <Divider variant="middle" sx={{marginTop: 0.5, marginBottom: 2.5, borderBottomWidth: 2.3, borderColor:'black'}}/>
                <Typography sx={{textAlign: 'center', alignSelf: 'center', marginBottom: -1, fontWeight: 'bold'}} variant="subtitle1" gutterBottom component="div" fullWidth>
                BACHELOR OF SCIENCE IN INFORMATION SYSTEMS
                </Typography>
                <Typography sx={{textAlign: 'center', alignSelf: 'center', marginBottom: 3.5}}variant="overline" display="block" gutterBottom>
                  (Based on CMO No. 25 s 2015)
                </Typography>

    {/******* FIRST YEAR *******/}
                <Typography sx={{textAlign: 'center', alignSelf: 'center', marginBottom: -1}} variant="subtitle2" gutterBottom component="div" fullWidth>
                FIRST YEAR
                </Typography>
              <TableCell>
              <p><b>First Semester</b></p>
              </TableCell>
    <Divider />
    
    {/*First Table Header*/}
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
     
     {subjects1Y1S.map((subject1) => (
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
                  <TableCell sx={{fontWeight: 'bold', backgroundColor:'#F8ECD1'}}>
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

  {/*Second Semester TextFields*/}  
     
     {subjects1Y2S.map((subject2) => (
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
  {/* FIRST YEAR END */}
  
  <Typography sx={{textAlign: 'center', alignSelf: 'center', marginTop: 5}} variant="subtitle2" gutterBottom component="div" fullWidth>
  --------------------------------------------------PAGE BREAK--------------------------------------------------
                </Typography>

  {/******* SECOND YEAR *******/}
  <Typography sx={{textAlign: 'center', alignSelf: 'center', marginBottom: -1}} variant="subtitle2" gutterBottom component="div" fullWidth>
                SECOND YEAR
                </Typography>
              <TableCell>
              <p><b>First Semester</b></p>
              </TableCell>
    <Divider />
    
    {/*First Table Header*/}
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
     
     {subjects2Y1S.map((subject1) => (
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
              <b>{ totalLec2y1s.toFixed(1) }</b>
              </TableCell>
              <TableCell sx={{textAlign:'center', backgroundColor:'#D0C9C0'}}>
              <b>{ totalLab2y1s.toFixed(1) }</b>
              </TableCell>
              <TableCell sx={{textAlign:'center', backgroundColor:'#D0C9C0'}}>
              <b>{ totalUnit2y1s.toFixed(1) }</b>
              </TableCell>
              <TableCell sx={{textAlign:'center', backgroundColor:'#D0C9C0'}}>
              <b>{ totalHr2y1s.toFixed(1) }</b>
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

  {/*Second Semester TextFields*/}  
     
     {subjects2Y2S.map((subject2) => (
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
              <b>{ totalLec2y2s.toFixed(1) }</b>
              </TableCell>
              <TableCell sx={{textAlign:'center', backgroundColor:'#D0C9C0'}}>
              <b>{ totalLab2y2s.toFixed(1) }</b>
              </TableCell>
              <TableCell sx={{textAlign:'center', backgroundColor:'#D0C9C0'}}>
              <b>{ totalUnit2y2s.toFixed(1) }</b>
              </TableCell>
              <TableCell sx={{textAlign:'center', backgroundColor:'#D0C9C0'}}>
              <b>{ totalHr2y2s.toFixed(1) }</b>
              </TableCell>
              <TableCell sx={{backgroundColor:'#D0C9C0'}}>
              </TableCell>
              <TableCell sx={{backgroundColor:'#D0C9C0'}}>
              </TableCell>
            </Table>
  {/* SECOND YEAR END */}

  <Typography sx={{textAlign: 'center', alignSelf: 'center', marginTop: 5}} variant="subtitle2" gutterBottom component="div" fullWidth>
  --------------------------------------------------PAGE BREAK--------------------------------------------------
                </Typography>

  {/******* THIRD YEAR *******/}
  <Typography sx={{textAlign: 'center', alignSelf: 'center', marginBottom: -1}} variant="subtitle2" gutterBottom component="div" fullWidth>
                THIRD YEAR
                </Typography>
              <TableCell>
              <p><b>First Semester</b></p>
              </TableCell>
    <Divider />
    
    {/*First Table Header*/}
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
     
     {subjects3Y1S.map((subject1) => (
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
              <b>{ totalLec3y1s.toFixed(1) }</b>
              </TableCell>
              <TableCell sx={{textAlign:'center', backgroundColor:'#D0C9C0'}}>
              <b>{ totalLab3y1s.toFixed(1) }</b>
              </TableCell>
              <TableCell sx={{textAlign:'center', backgroundColor:'#D0C9C0'}}>
              <b>{ totalUnit3y1s.toFixed(1) }</b>
              </TableCell>
              <TableCell sx={{textAlign:'center', backgroundColor:'#D0C9C0'}}>
              <b>{ totalHr3y1s.toFixed(1) }</b>
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

  {/*Second Semester TextFields*/}  
     
     {subjects3Y2S.map((subject2) => (
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
              <b>{ totalLec3y2s.toFixed(1) }</b>
              </TableCell>
              <TableCell sx={{textAlign:'center', backgroundColor:'#D0C9C0'}}>
              <b>{ totalLab3y2s.toFixed(1) }</b>
              </TableCell>
              <TableCell sx={{textAlign:'center', backgroundColor:'#D0C9C0'}}>
              <b>{ totalUnit3y2s.toFixed(1) }</b>
              </TableCell>
              <TableCell sx={{textAlign:'center', backgroundColor:'#D0C9C0'}}>
              <b>{ totalHr3y2s.toFixed(1) }</b>
              </TableCell>
              <TableCell sx={{backgroundColor:'#D0C9C0'}}>
              </TableCell>
              <TableCell sx={{backgroundColor:'#D0C9C0'}}>
              </TableCell>
            </Table>
  {/* THIRD YEAR END */}

  <Typography sx={{textAlign: 'center', alignSelf: 'center', marginTop: 5}} variant="subtitle2" gutterBottom component="div" fullWidth>
                --------------------------------------------------PAGE BREAK--------------------------------------------------
                </Typography>

  {/******* FOURTH YEAR *******/}
  <Typography sx={{textAlign: 'center', alignSelf: 'center', marginBottom: -1}} variant="subtitle2" gutterBottom component="div" fullWidth>
                FOURTH YEAR
                </Typography>
              <TableCell>
              <p><b>First Semester</b></p>
              </TableCell>
    <Divider />
    
    {/*First Table Header*/}
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
     
     {subjects4Y1S.map((subject1) => (
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
              <b>{ totalLec4y1s.toFixed(1) }</b>
              </TableCell>
              <TableCell sx={{textAlign:'center', backgroundColor:'#D0C9C0'}}>
              <b>{ totalLab4y1s.toFixed(1) }</b>
              </TableCell>
              <TableCell sx={{textAlign:'center', backgroundColor:'#D0C9C0'}}>
              <b>{ totalUnit4y1s.toFixed(1) }</b>
              </TableCell>
              <TableCell sx={{textAlign:'center', backgroundColor:'#D0C9C0'}}>
              <b>{ totalHr4y1s.toFixed(1) }</b>
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

  {/*Second Semester TextFields*/}  
     
     {subjects4Y2S.map((subject2) => (
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
              <b>{ totalLec4y2s.toFixed(1) }</b>
              </TableCell>
              <TableCell sx={{textAlign:'center', backgroundColor:'#D0C9C0'}}>
              <b>{ totalLab4y2s.toFixed(1) }</b>
              </TableCell>
              <TableCell sx={{textAlign:'center', backgroundColor:'#D0C9C0'}}>
              <b>{ totalUnit4y2s.toFixed(1) }</b>
              </TableCell>
              <TableCell sx={{textAlign:'center', backgroundColor:'#D0C9C0'}}>
              <b>{ totalHr4y2s.toFixed(1) }</b>
              </TableCell>
              <TableCell sx={{backgroundColor:'#D0C9C0'}}>
              </TableCell>
              <TableCell sx={{backgroundColor:'#D0C9C0'}}>
              </TableCell>
            </Table>
  {/* FOURTH YEAR END */}

            </Box>
          </Card>
        </Box>
      </Box>
    </div>
  );
}

export const CurriculumListResults = ({ customers, ...rest }) => {
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const { setCurrVersion } = useAuth()
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const router = useRouter()

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const sendData = async (id) => {
    setCurriculumID(id)
    const q = query(collection(db, "curriculumns", id, 'versions'));
    const subs= [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      subs.push({ ...doc.data(), id: doc.id });
    });
    const sub_size = subs.length
    setCurrVersion(sub_size.toString())
    setVersion(sub_size.toString())
    router.push('/create-curriculum')
  }

  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Curriculum Code
                </TableCell>
                <TableCell>
                  CMO
                </TableCell>
                <TableCell>
                  Version
                </TableCell>
                <TableCell>
                  Date Created
                </TableCell>
                <TableCell>
                  Date Approved
                </TableCell>
                <TableCell>
                  Department Code
                </TableCell>
                <TableCell>
                  Username
                </TableCell>
                <TableCell>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customers.slice(0, limit).map((customer) => (
                <TableRow
                  hover
                  key={customer.id}
                  selected={selectedCustomerIds.indexOf(customer.id) !== -1}
                >
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >
                      {customer.currCode}
                    </Box>
                  </TableCell>
                  <TableCell>
                  {customer.cmo}
                  </TableCell>
                  <TableCell>
                  {customer.currVersion}
                  </TableCell>
                  <TableCell>
                  {customer.dateCreated}
                  </TableCell>
                  <TableCell>
                  {customer.dateApproved}
                  </TableCell>
                  <TableCell>
                  {customer.depCode}
                    </TableCell>
                    <TableCell>
                    {customer.username}
                    </TableCell>
                  <TableCell>
                    {getUserLevel() == 2 && customer.accepted != true?
                    <Button
                    variant="outlined"
                    sx={{marginRight: 1}}
                    disabled={customer.on_review == true ? true : false}
                    onClick={async()=>{
                      const washingtonRef = doc(db, "curriculumns", customer.id);
                      const current_date =  new Date()
                      await updateDoc(washingtonRef, {
                        on_review: true
                      }).then(()=>{
                        alert('Wait for the dean approval.')
                      });
                      
                      const users_notif = query(collection(db, "users"), where("userlevel", "==", 3));
                      const unsubscribe = onSnapshot(users_notif, (querySnapshot) => {
                        querySnapshot.forEach((docSnaps) => {
                          const dean_doc = doc(db, "users",  docSnaps.id);
                          const dean_notif = collection(dean_doc, "notifications")

                          setDoc(doc(dean_notif, Date.parse(current_date).toString()), {
                            message: "You receive curriculum review sent by " + localStorage.getItem('email') + ".",
                            on_read: false,
                            date:((current_date.getMonth()+1) + "/" + current_date.getDate() + "/" + current_date.getFullYear()),
                            notif_id: Date.parse(current_date).toString(),
                          });
                        });
                      });
                    }}
                    >
                    {customer.on_review == true ? "On Review" : "Submit Curriculum"}
                    </Button>
                    :
                    <>
                    {customer.on_review == true ?
                    <>
                    <Button
                    sx={{background:'#0275d8', color:'white', marginRight: 1}}
                    onClick={async()=>{
                      const washingtonRef = doc(db, "curriculumns", customer.id);
                      const current_date =  new Date()

                      const dean_doc = doc(db, "users",  customer.user_id);
                      const dean_notif = collection(dean_doc, "notifications")

                      await updateDoc(washingtonRef, {
                        accepted: true,
                        on_review: false,
                        dateApproved:((current_date.getMonth()+1) + "/" + current_date.getDate() + "/" + current_date.getFullYear())
                      }).then(()=>{
                        alert('Successfully Accepted.')
                      });

                      await setDoc(doc(dean_notif, Date.parse(current_date).toString()), {
                          message: "Your curriculum with curriculum code " + customer.currCode +" is accepted.",
                          on_read: false,
                          date:((current_date.getMonth()+1) + "/" + current_date.getDate() + "/" + current_date.getFullYear()),
                          notif_id: Date.parse(current_date).toString(),
                      });
                    }}
                    >
                      Accept
                    </Button>
                    <Button
                    sx={{background:'#d9534f', color:'white', marginRight: 1}}
                    onClick={async()=>{
                      const washingtonRef = doc(db, "curriculumns", customer.id);
                      const current_date =  new Date()
                      await updateDoc(washingtonRef, {
                        on_review: false
                      }).then(()=>{
                        alert('The requested curriculum was rejected.')
                      });
                      
                      const dean_doc = doc(db, "users",  customer.user_id);
                      const dean_notif = collection(dean_doc, "notifications")

                      await setDoc(doc(dean_notif, Date.parse(current_date).toString()), {
                        message: "Your curriculum with curriculum code " + customer.currCode +" is rejected.",
                        on_read: false,
                        date:((current_date.getMonth()+1) + "/" + current_date.getDate() + "/" + current_date.getFullYear()),
                        notif_id: Date.parse(current_date).toString(),
                    });

                    }}
                    >
                      Reject
                    </Button>
                    </>
                    :
                    <></>
                    }
                    </>
                    }
                    {getUserLevel() == 2 ?
                    <UpdateModal
                    data={customer}
                    >
                      {/* UPDATE */}
                    </UpdateModal>
                    :
                    <></>
                    }
                    <Button
                      startIcon={(<EditIcon fontSize="small" />)}
                      variant="outlined"
                      sx={{ mr: 1 }}
                      onClick={() => 
                      sendData(customer.id)
                      } >
                        View
                    </Button>
                    <ArchiveModal>
                      {/* ARCHIVE */}
                    </ArchiveModal>
                    {customer.accepted == true ? 
                    <DownloadPDF
                    id={customer.id}
                    >
                      {/* PDF */}
                    </DownloadPDF>
                    :
                    <></>
                    }
                </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={customers.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

CurriculumListResults.propTypes = {
  customers: PropTypes.array.isRequired
};
