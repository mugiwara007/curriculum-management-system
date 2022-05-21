import {
    Box,
    Card,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
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
import { getDocs, collection, doc, getDoc, onSnapshot, query, addDoc, where, setDoc, setDocs } from 'firebase/firestore';
import { db } from 'src/firebase/firebase-auth'
import { auth } from 'src/firebase/firebase-auth';
import AddIcon from '@mui/icons-material/Add';
import { getCurriculumID, getYearLevel } from './curriculum-model';

export const ImportDialog = (props) =>{
const { currentUser } = useAuth()
const curriculum_id = getCurriculumID();
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(0);
  const [currSubjects, setCurrSubjects] = useState([]);
  const [indexValue, setIndexValue] = useState(0)
  const [limitValue, setLimitValue] = useState(limit)
  const [open, setOpen] = useState(false);
  const [subID, setSubID] = useState()
  const [isChecked,setIsChecked]= useState()

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

  const importSubCurr = async (subID) => {
    if (subID){
        auth.onAuthStateChanged(async user => {
            if (user) {             
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
            }              
                // const currSubRef = collection(db, "curriculumns", curriculum_id, nyear);
            if (user) {                                         //collection id ng curriculum
                const currSubRef = collection(db, "curriculumns", curriculum_id, getYearLevel());
                const docRef = doc(db, "subjects", subID);
                const docSnap = await getDoc(docRef);
                addDoc(currSubRef, {
                    sub_code: docSnap.data().sub_code,
                    sub_desc: docSnap.data().sub_desc,
                    sub_lec: docSnap.data().sub_lec,
                    sub_lab: docSnap.data().sub_lab,
                    total_units: docSnap.data().total_units,
                    hour_pw: docSnap.data().hour_pw,
                    sub_preReq: docSnap.data().sub_preReq,
                    sub_coReq: docSnap.data().sub_coReq,
                    curr_sem: Number(props.value)
                });

                const curriculum_doc = doc(db,"curriculumns", getCurriculumID())
                const version_collection = collection(curriculum_doc,"versions")
                const querySnapshot = await getDocs(version_collection);
                var counter = 1
                querySnapshot.forEach((doc) => {
                  counter++
                });
                const version_data = {
                  sub_code: docSnap.data().sub_code,
                  sub_desc: docSnap.data().sub_desc,
                  sub_lec: docSnap.data().sub_lec,
                  sub_lab: docSnap.data().sub_lab,
                  total_units: docSnap.data().total_units,
                  hour_pw: docSnap.data().hour_pw,
                  sub_preReq: docSnap.data().sub_preReq,
                  sub_coReq: docSnap.data().sub_coReq,
                  curr_sem: Number(props.value)
                }
                if(counter > 2){
                    setDoc(doc(version_collection,counter.toString()),{version:counter.toString()}).then(async()=>{
                      const version_doc = doc(version_collection,counter.toString())
                      const old_version = counter - 1
                      const old_version_doc = doc(version_collection,old_version.toString())
                      const first_year_collection = collection(old_version_doc,"first_year")
                      const second_year_collection = collection(old_version_doc,"second_year")
                      const third_year_collection = collection(old_version_doc,"third_year")
                      const fourth_year_collection = collection(old_version_doc,"fourth_year")
                      const first_year_snap = await getDocs(first_year_collection)
                      const second_year_snap = await getDocs(second_year_collection)
                      const third_year_snap = await getDocs(third_year_collection)
                      const fourth_year_snap = await getDocs(fourth_year_collection)
                      const year_collection = collection(version_doc,getYearLevel())
                      first_year_snap.forEach((doc) =>{
                        addDoc(collection(version_doc,"first_year"), doc.data())
                      })
                      second_year_snap.forEach((doc) =>{
                        addDoc(collection(version_doc,"second_year"), doc.data())
                      })
                      third_year_snap.forEach((doc) =>{
                        addDoc(collection(version_doc,"third_year"), doc.data())
                      })
                      fourth_year_snap.forEach((doc) =>{
                        addDoc(collection(version_doc,"fourth_year"), doc.data())
                      })
                      addDoc(year_collection, version_data)

                    }).catch((e)=>{
                      alert(e)
                    })
                }
                else{
                  setDoc(doc(version_collection,counter.toString()),{version:counter.toString()}).then(()=>{
                    const version_doc = doc(version_collection,counter.toString())
                    const year_collection = collection(version_doc,getYearLevel())
                    addDoc(year_collection, version_data)
                  }).catch((e)=>{
                    alert(e)
                  })
                }


                } else {
                  
              }
        });

        
        handleClose();
    } else {
      alert("Please select a subject to import.");
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setIsChecked(null)
    setSubID(null)
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
      startIcon={(<AddIcon fontSize="small" />)}
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
                >
                  <TableCell>
                    <input type="radio" value={subject.id} name="subject" checked={isChecked} onChange={handleChange} />
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
        count={currentUser && Number(currSubjects.length)}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5]}
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
            onClick={() => importSubCurr(subID)}>
              Import
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
      </div>
  );
}
