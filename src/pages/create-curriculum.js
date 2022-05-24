import Head from 'next/head';
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
import { collection, query, onSnapshot } from "firebase/firestore";
import { getCurriculumID } from 'src/components/create-curriculum/curriculum-model';
import { CreateComments } from 'src/components/create-curriculum/comments';
import { getUserLevel } from 'src/components/userModel';

const Dashboard = () => {
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
          <Button
            startIcon={(<HistoryIcon fontSize="small" />)}
            sx={{ mr: 1 }}
          >
            Apply Version
          </Button>
          {/* <Button
            color="primary"
            variant="contained"
            startIcon={(<SaveIcon fontSize="small" />)}
          >
            Save
          </Button> */}
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
            <CreateTables subjects1={subjects1} subjects2={subjects2} setSubjects1={setSubjects1} setSubjects2={setSubjects2}/>
          </Grid>
          <Grid
            item
            lg={4}
            md={12}
            xl={3}
            xs={12}
          >
            {getUserLevel() == 3 ?
            <Comments sx={{ height: '100%' }} />
            :
            <></> 
            }
          </Grid>
          <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}
          >
            {getUserLevel() == 3 ?
            <CreateComments sx={{ height: '100%' }} />
            :
            <></> 
            }
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
