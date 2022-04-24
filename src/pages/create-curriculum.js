import Head from 'next/head';
import { Box, Container, Grid } from '@mui/material';

import { CreateCurriculumListToolbar } from '../components/create-curriculum/create-curriculum-toolbar-history-tables';
import { DashboardLayout } from '../components/dashboard-layout';



const Create_Curriculum = () => (
  <>
    <Head>
      <title>
        Create Curriculum
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
        
      }}
    >
      <Container  maxWidth={false}>
        <CreateCurriculumListToolbar />
      </Container>
    </Box>
  </>
);
Create_Curriculum.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Create_Curriculum;
