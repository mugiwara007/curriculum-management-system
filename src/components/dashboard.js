import Head from 'next/head';
import { Box, Container, Grid } from '@mui/material';
import { TotalUsers } from './dashboard/total-users';
import { LatestOrders } from './dashboard/latest-orders';
import { LatestCurriculumGenerated } from './dashboard/latest-curriculum-generated';
import { Sales } from './dashboard/sales';
import { TotalDepartments } from './dashboard/total-departments';
import { TotalSubjects } from './dashboard/total-subjects';
import { TotalColleges } from './dashboard/total-colleges';
import { TotalCurriculumsGenerated } from './dashboard/total-curriculums-generated';
import { DashboardLayout } from './dashboard-layout';
import {  withAuth } from '../routes/withAuth'
import * as React from 'react'

import { db } from 'src/firebase/firebase-auth';
import { collection, query, where, onSnapshot } from "firebase/firestore";

const Dashboard = () => {
  const [userCount, setUserCount] = React.useState(0)
  const [subjectCount, setSubjectCount] = React.useState(0)
  const [departmentCount, setDepartmentCount] = React.useState(0)
  const [collegeCount, setCollegeCount] = React.useState(0)

  function userCounter(){
    const q = query(collection(db, "users"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      var count = 0;
      querySnapshot.forEach((doc) => {
          count++
      });
      setUserCount(count)
  });
  }
  function subjectCounter(){
    const q = query(collection(db, "subjects"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      var count = 0;
      querySnapshot.forEach((doc) => {
          count++
      });
      setSubjectCount(count)
  });
  }
  function departmentCounter(){
    const q = query(collection(db, "departments"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      var count = 0;
      querySnapshot.forEach((doc) => {
          count++
      });
      setDepartmentCount(count)
  });
  }
  function collegeCounter(){
    const q = query(collection(db, "colleges"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      var count = 0;
      querySnapshot.forEach((doc) => {
          count++
      });
      setCollegeCount(count)
  });
  }


  React.useEffect(() => {
    userCounter()
    subjectCounter()
    departmentCounter()
    collegeCounter()
  }, [])
  

  return(
  <>
    <Head>
      <title>
        Dashboard | Material Kit
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth={false}>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <TotalUsers count={userCount-1} />
          </Grid>
          <Grid
            item
            xl={3}
            lg={3}
            sm={6}
            xs={12}
          >
            <TotalSubjects count={subjectCount}/>
          </Grid>
          <Grid
            item
            xl={3}
            lg={3}
            sm={6}
            xs={12}
          >
            <TotalDepartments count={departmentCount}/>
          </Grid>
          <Grid
            item
            xl={3}
            lg={3}
            sm={6}
            xs={12}
          >
            <TotalColleges sx={{ height: '100%' }} count={collegeCount}/>
          </Grid>
          {/* <Grid
            item
            lg={12}
            md={12}
            xl={12}
            xs={12}
          >
            <Sales />
          </Grid> */}
          {/* <Grid
            item
            lg={4}
            md={6}
            xl={12}
            xs={12}
          >
            <TotalCurriculumsGenerated sx={{ height: '100%' }} />
          </Grid> */}
          <Grid
            item
            lg={12}
            md={12}
            xl={12}
            xs={12}
          >
            {/* <LatestCurriculumGenerated sx={{ height: '100%' }} /> */}
          </Grid>
          {/* <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}
          >
            <LatestOrders />
          </Grid> */}
        </Grid>
      </Container>
    </Box>
  </>)
}

Dashboard.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Dashboard;
