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
import { doc, updateDoc, getDocs } from "firebase/firestore";
import { getUserLevel } from '../userModel';
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
  const componentRef = useRef();
  const [first_year, setFirstYear] = React.useState([])
  const first_year_query = query(collection(db, "curriculumns",props.id,"first_year"));

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

  //1st YR SUB INFO
  const [totalLec1, setTotalLec1] = useState(0);
  const [totalLab1, setTotalLab1] = useState(0);
  const [totalUnit1, setTotalUnit1] = useState(0);
  const [totalHr1, setTotalHr1] = useState(0);
  const [totalLec2, setTotalLec2] = useState(0);
  const [totalLab2, setTotalLab2] = useState(0);
  const [totalUnit2, setTotalUnit2] = useState(0);
  const [totalHr2, setTotalHr2] = useState(0);

  

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
        setSubjects1Y1S(sbjct)

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

    // const sub2Ref = collection(db, "curriculumns", currID, 'versions', version, "first_year");
    // const q2 = query(sub2Ref, where("curr_sem", '==' ,2));

    // let tLec2 = 0
    // let tLab2 = 0
    // let tUnit2 = 0
    // let tHrPw2 = 0

    // const unsubscribe2 = onSnapshot(q2, (querySnapshot) => 
    // {
    //   const subs1 = [];
    //   querySnapshot.forEach((doc) => {
    //       subs1.push({ ...doc.data(), id: doc.id });
    //   });
    //     setSubjects1Y2S(sbjct)

    //     tLec2 = 0
    //     tLab2 = 0
    //     tUnit2 = 0
    //     tHrPw2 = 0
        
    //      subs1.map((currSub) => tLec2 += Number(currSub.sub_lec));
    //      subs1.map((currSub) => tLab2 += Number(currSub.sub_lab));
    //      subs1.map((currSub) => tUnit2 += Number(currSub.total_units));
    //      subs1.map((currSub) => tHrPw2 += Number(currSub.hour_pw));

    //      setTotalLec2(tLec2)
    //      setTotalLab2(tLab2)
    //      setTotalUnit2(tUnit2)
    //      setTotalHr2(tHrPw2)
    // });
  }

  useEffect(() => 
  {
    allCurrSub1()
  }, [props.id]);

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
        setSubjects1Y2S(sbjct)

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


  const unsubscribe1 = onSnapshot(first_year_query, (querySnapshot) => 
  {
    const temp = [];
    querySnapshot.forEach((doc) => {
        temp.push(doc.data());
    });
    setFirstYear(temp)
  });

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
                <Typography sx={{textAlign: 'center', alignSelf: 'center', marginBottom: -1}} variant="subtitle2" gutterBottom component="div" fullWidth>
                FIRST YEAR
                </Typography>
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

            </Box>
          </Card>
        </Box>
      </Box>
    </div>
  );
}

export const CurriculumListResults = ({ customers, ...rest }) => {
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const router = useRouter()

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  function sendData(id) {
    setCurriculumID(id)
    router.push('/create-curriculum')
  }

  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                {/* <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedCustomerIds.length === customers.length}
                    color="primary"
                    indeterminate={
                      selectedCustomerIds.length > 0
                      && selectedCustomerIds.length < customers.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell> */}
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
                  {/* <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedCustomerIds.indexOf(customer.id) !== -1}
                      onChange={(event) => handleSelectOne(event, customer.id)}
                      value="true"
                    />
                  </TableCell> */}
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >
                      {/* <Avatar
                        src={customer.avatarUrl}
                        sx={{ mr: 2 }}
                      >
                        {getInitials(customer.name)}
                      </Avatar>
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {customer.name}
                      </Typography> */}
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
                      await updateDoc(washingtonRef, {
                        on_review: true
                      }).then(()=>{
                        alert('Wait for the dean approval.')
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
                      await updateDoc(washingtonRef, {
                        accepted: true,
                        on_review: false
                      }).then(()=>{
                        alert('Successfully Accepted.')
                      });
                    }}
                    >
                      Accept
                    </Button>
                    <Button
                    sx={{background:'#d9534f', color:'white', marginRight: 1}}
                    onClick={async()=>{
                      const washingtonRef = doc(db, "curriculumns", customer.id);
                      await updateDoc(washingtonRef, {
                        on_review: false
                      }).then(()=>{
                        alert('Successfully Rejected.')
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
