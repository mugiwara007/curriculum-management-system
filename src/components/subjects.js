import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { SubjectListResults } from './subject/subject-list-results';
import { SubjectListToolbar } from './subject/subject-list-toolbar';
import { DashboardLayout } from './dashboard-layout';

const Subjects = () => (
  <>
    <Head>
      <title>
        Subjects | Material Kit
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
        <SubjectListToolbar />
        <Box sx={{ mt: 3 }}>
          <SubjectListResults />
        </Box>
      </Container>
    </Box>
  </>
);
Subjects.getLayout = (page) => (
    <DashboardLayout>
      {page}
    </DashboardLayout>
);

export default Subjects;
