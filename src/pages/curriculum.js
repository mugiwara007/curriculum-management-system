import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { CurriculumListResults } from '../components/curriculum/curriculum-list-results';
import { CurriculumListToolbar } from '../components/curriculum/curriculum-list-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';
// import { customers } from '../__mocks__/customers';
import { db } from 'src/firebase/firebase-auth';
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from 'react';

const Curriculum = () => {
  const [curriculum, setCurriculum] = useState([])

  useEffect(async() => {
    const curriculumns = query(collection(db, "curriculumns"));
    const unsubscribe = onSnapshot(curriculumns , (querySnapshot) => {
      const temp = [];
      querySnapshot.forEach((doc) => {
        temp.push(doc.data());
      });
      setCurriculum(temp)
    });
  }, [])
  
  return(
  <>
    <Head>
      <title>
        Departments | Material Kit
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
        <CurriculumListToolbar />
        <Box sx={{ mt: 3 }}>
          <CurriculumListResults customers={curriculum} />
        </Box>
      </Container>
    </Box>
  </>
  )
}
Curriculum.getLayout = (page) => (
    <DashboardLayout>
      {page}
    </DashboardLayout>
);

export default Curriculum;
