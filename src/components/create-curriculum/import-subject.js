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
  import Dialog from '@mui/material/Dialog';
  import PerfectScrollbar from 'react-perfect-scrollbar';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import React, { Component, useState, useEffect } from 'react';
import { useAuth } from 'src/contexts/AuthContext';
import { deleteDoc, getDocs, collection, doc, getDoc, onSnapshot, query, addDoc,where } from 'firebase/firestore';
import { db } from 'src/firebase/firebase-auth'
import { auth } from 'src/firebase/firebase-auth';
import { AltRoute } from '@mui/icons-material';

export const ImportDialog = (props) =>{
const { currentUser } = useAuth()
  const [selectedSubjectIds, setSelectedSubjectIds] = useState([]);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(0);
  const subjectsCollectionRef = collection(db, "subjects");
  const [currSubjects, setCurrSubjects] = useState([]);
  const [indexValue, setIndexValue] = useState(0)
  const [limitValue, setLimitValue] = useState(limit)
  const [open, setOpen] = useState(false);
  const semester= props.semester;
  const [subID, setSubID] = useState()

  function allSub(){
    const q = query(collection(db, "subjects"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const subs = [];
    querySnapshot.forEach((doc) => {
        subs.push({ ...doc.data(), id: doc.id });
    });
       setCurrSubjects(subs)
    });
  }

  useEffect(() => {
    allSub()
  }, []);

  const addSubCurr = async (subID) => {
    if (subID){
        auth.onAuthStateChanged(async user => {
            if (user) {
                const currSubRef = collection(db, "curriculumns", "ps9MYwDR6ubdupS6P7TT", "first_year");
                const docRef = doc(db, "subjects", subID);
                const docSnap = await getDoc(docRef);
                addDoc(currSubRef, {
                    sub_code: docSnap.data().sub_code,
                    sub_desc: docSnap.data().sub_desc,
                    sub_lec: docSnap.data().sub_lec,
                    sub_lab: docSnap.data().sub_lab,
                    sub_preReq: docSnap.data().sub_preReq,
                    sub_coReq: docSnap.data().sub_coReq,
                    curr_sem: props.value
                });
                } else {
                // User is signed out
                // ...
                }
        });
        handleClose();
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLimitChange = (event) => {
    
    setLimitValue(event.target.value)
    setIndexValue(0)
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    if(page > newPage){
      setIndexValue(indexValue- limit)
      setLimitValue(limitValue- limit)
    }else{
      setIndexValue(indexValue+ limit)
      setLimitValue(limitValue+ limit)
    }
    
    setPage(newPage);
    console.log(page)
  };

  const handleChange = (event) => {
    setSubID(event.target.value)
  }

  const handleSubmit = (event) => {
    if(subID){
        alert("SHEESH")
        addSubCurr(subID);
    } else{
        alert("ARAY")
        handleChange();
    }
    
    event.preventDefault();
  }

  return (
    <div style={{display : 'inline-block'}} >
    <Button
      variant="outlined"
      sx={{ mr: 1 }}
      onClick={handleClickOpen} >
        Import Subject
    </Button>
    <Dialog open={open}
    onClose={handleClose}
    maxWidth="1000"
    >
      <DialogTitle
      display="flex"
      justifyContent="center" >Import Subject</DialogTitle>

    <DialogContent>
    <Card>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>
                  Subject Code
                </TableCell>
                <TableCell>
                  Description
                </TableCell>
                <TableCell sx={{textAlign:'center'}}>
                  LEC Units
                </TableCell>
                <TableCell sx={{textAlign:'center'}}>
                  LAB Units
                </TableCell>
                <TableCell>
                  Pre-Requisite
                </TableCell>
                <TableCell>
                  Co-Requisite
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentUser && currSubjects.slice(indexValue, limitValue).map((subject) => (
                <TableRow
                  hover
                  key={subject.id}
                  selected={selectedSubjectIds.indexOf(subject.id) !== -1}
                >
                  <TableCell>
                    <input type="radio" value={subject.id} name="subject" checked={subID === subject.id} onChange={handleChange} />
                    </TableCell>
                  <TableCell sx={{pl: 3}}>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {subject.sub_code}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell sx={{pl: 3}}>
                    {subject.sub_desc}
                  </TableCell>
                  <TableCell sx={{textAlign:'center'}}>
                    {subject.sub_lec}
                  </TableCell>
                  <TableCell sx={{textAlign:'center'}}>
                    {subject.sub_lab}
                  </TableCell>
                  <TableCell sx={{pl: 3}}>
                    {subject.sub_preReq}
                  </TableCell>
                  <TableCell sx={{pl: 3}}>
                    {subject.sub_coReq}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={currentUser && currSubjects.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={5}
      />
    </Card>
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
            onClick={() => addSubCurr(subID)}>
              Import
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
      </div>
  );
}
