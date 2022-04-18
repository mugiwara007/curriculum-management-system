import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { CreateCurriculumListResults } from '../components/create-curriculum/create-curriculum-list-results';
import { CreateCurriculumListToolbar } from '../components/create-curriculum/create-curriculum-list-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';
import { customers } from '../__mocks__/customers';

const Create_Curriculum = () => (
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
        <CreateCurriculumListToolbar />
        <Box sx={{ mt: 3 }}>
          <CreateCurriculumListResults customers={customers} />
        </Box>
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
