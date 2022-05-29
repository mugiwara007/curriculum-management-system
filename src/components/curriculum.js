import Head from 'next/head';
import { Box, Container, decomposeColor } from '@mui/material';
import { CurriculumListResults } from './curriculum/curriculum-list-results';
import { CurriculumListToolbar } from './curriculum/curriculum-list-toolbar';
import { DashboardLayout } from './dashboard-layout';
// import { customers } from '../__mocks__/customers';
import { db } from 'src/firebase/firebase-auth';
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from 'react';
import { getEmail, getUserLevel } from 'src/components/userModel';

const Curriculum = () => {
  const [curriculum, setCurriculum] = useState([])

  useEffect(async() => {
    if(getUserLevel() == 2)
    {
      const curriculumns = query(collection(db, "curriculumns"), where('email', "==", localStorage.getItem('email')));
      const unsubscribe = onSnapshot(curriculumns , (querySnapshot) => {
        const temp = [];
        querySnapshot.forEach((doc) => {
          temp.push({
            id:doc.id,
            cmo:doc.data().cmo,
            currCode: doc.data().currCode,
            currVersion: doc.data().currVersion,
            dateApproved: doc.data().dateApproved,
            dateCreated: doc.data().dateCreated,
            depCode: doc.data().depCode,
            username: doc.data().username,
            on_review: doc.data().on_review,
            accepted:doc.data().accepted
          });
        });
        setCurriculum(temp)
      });
    }
    else{
      const curriculumns = query(collection(db, "curriculumns"), where('on_review', "==", true));
      const unsubscribe = onSnapshot(curriculumns , (querySnapshot) => {
        const temp = [];
        querySnapshot.forEach((doc) => {
          temp.push({
            id:doc.id,
            cmo:doc.data().cmo,
            currCode: doc.data().currCode,
            currVersion: doc.data().currVersion,
            dateApproved: doc.data().dateApproved,
            dateCreated: doc.data().dateCreated,
            depCode: doc.data().depCode,
            username: doc.data().username,
            on_review: doc.data().on_review,
            accepted:doc.data().accepted,
            user_id:doc.data().user_id
          });
        });
        setCurriculum(temp)
      });
    }
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
