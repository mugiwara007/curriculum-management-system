import Head from 'next/head';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, Container, Grid, Typography, Button } from '@mui/material';
import Divider from '@mui/material/Divider';
import { CreateTables } from '../components/create-curriculum/create-tables';
import { HistoryLog } from '../components/create-curriculum/create-history';
import { DashboardLayout } from '../components/dashboard-layout';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {  withAuth } from '../routes/withAuth'
import NextLink from 'next/link';
import { Comments } from 'src/components/create-curriculum/create-comments';
import HistoryIcon from '@mui/icons-material/History';
import { useEffect, useState } from 'react';
import { db } from 'src/firebase/firebase-auth';
import { getCurriculumID, getYearLevel, setVersion, getVersion } from 'src/components/create-curriculum/curriculum-model';
import { CreateComments } from 'src/components/create-curriculum/comments';
import { getUserLevel } from 'src/components/userModel';
import { getDocs, collection, doc, getDoc, onSnapshot, query, addDoc, where,setDoc, } from 'firebase/firestore';
import {useAuth} from 'src/contexts/AuthContext'

export const ApplyVersionDialog = (props) =>{
  const [open, setOpen] = useState(false);
  const { setCurrVersion } = useAuth()

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const applyVersion = async () => {
    const curriculum_id = getCurriculumID();
    const curriculum_doc = doc(db,"curriculumns", curriculum_id)
    const version_collection = collection(curriculum_doc,"versions")
    const tempCurriculum = collection(curriculum_doc,"temp_sub")
    const querySnapshot = await getDocs(version_collection);
              var counter = 1
              querySnapshot.forEach((doc) => {
                counter++
              });
                  setDoc(doc(version_collection,counter.toString()),{version:counter.toString()}).then(async()=>{
                    const version_doc = doc(version_collection,counter.toString())
                    const old_version_doc = doc(tempCurriculum,'temp')
                    const first_year_collection = collection(old_version_doc,"first_year")
                    const second_year_collection = collection(old_version_doc,"second_year")
                    const third_year_collection = collection(old_version_doc,"third_year")
                    const fourth_year_collection = collection(old_version_doc,"fourth_year")
                    const first_year_snap = await getDocs(first_year_collection)
                    const second_year_snap = await getDocs(second_year_collection)
                    const third_year_snap = await getDocs(third_year_collection)
                    const fourth_year_snap = await getDocs(fourth_year_collection)
                    const year_collection = collection(version_doc, getYearLevel())
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
                    setVersion(counter.toString())
                    setCurrVersion(Number(getVersion()))
                  }).catch((e)=>{
                    alert(e)
                  })
              handleClose();
  };


  return (
    <div style={{display : 'inline-block'}} >
      {localStorage.getItem('userLevel') == 2 ?
      <Button
          color="success"
          variant="contained"
          startIcon={(<HistoryIcon fontSize="small" />)}
          sx={{ mr: 1 }}
          onClick={handleClickOpen}
        >
          Apply Version
      </Button>
      :
      <></>
      }
      <Dialog open={open}
        onClose={handleClose}>
        <DialogTitle
        display="flex"
        justifyContent="center"
        >Add New Version</DialogTitle>
        <DialogContent>
        <p>Are you sure you want to save changes?</p>
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
              onClick={applyVersion}>
                Confirm
              </Button>
            </Box>
        </DialogActions>
      </Dialog>
      </div>
  );
}

const Dashboard = (props) => {
  const [tempVersion,setTempVersion] = useState([])
  const [subjects1, setSubjects1] = useState([]);
  const [subjects2, setSubjects2] = useState([]);

  useEffect(async() => {
    // const curriculum_doc = doc(db,"curriculumns", getCurriculumID())
    // const version_collection = collection(curriculum_doc,"versions")
    const q = query(collection(db,"curriculumns", getCurriculumID(),"versions"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const temp = [];
      querySnapshot.forEach((doc) => {
        console.log(doc.data())
          temp.push({id:doc.id,data:doc.data()});
      });
      setTempVersion(temp)
    })
  }, [])
  
  return(
  <>
    <Head>
      <title>
        Create Curriculum
      </title>
    </Head>

    <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          mt: 2,
  
        }}
      >
        <Typography
          sx={{ m: 1 }}
          variant="h4"
        >
         Create Curriculum
        </Typography>
        <Box sx={{ m: 1 }}>
            <NextLink
          href="/curriculum"
          passHref
          >
          <Button
            startIcon={(<ArrowBackIcon fontSize="small" />)}
            sx={{ mr: 1 }}
          >
            Back
          </Button>
          </NextLink>
          <ApplyVersionDialog />
        </Box>
      </Box>
 
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 2
      }}
    >
      <Container maxWidth={false}>
        <Grid
          container
          spacing={2}
        >
          <Grid
            item
            lg={4}
            md={12}
            xl={3}
            xs={12}
          >
            <HistoryLog sx={{ height: '100%' }} data={tempVersion} />
          </Grid>
          <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}
          >
            <CreateTables subjects1={subjects1} subjects2={subjects2} setSubjects1={setSubjects1} setSubjects2={setSubjects2} />
          </Grid>
          <Grid
            item
            lg={4}
            md={12}
            xl={3}
            xs={12}
          >
            <Comments sx={{ height: '100%' }} data={getCurriculumID()} />
          </Grid>
          <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}
          >
            <CreateComments sx={{ height: '100%' }} data={getCurriculumID()} />
          </Grid>


        </Grid>
      </Container>
    </Box>
  </>
  )
}

Dashboard.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Dashboard;
