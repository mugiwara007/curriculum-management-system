import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { CurriculumListResults } from '../components/curriculum/curriculum-list-results';
import { CurriculumListToolbar } from '../components/curriculum/curriculum-list-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';
import { customers } from '../__mocks__/customers';

const Curriculum = () => (
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
          <CurriculumListResults customers={customers} />
        </Box>
      </Container>
    </Box>
  </>
);
Curriculum.getLayout = (page) => (
    <DashboardLayout>
      {page}
    </DashboardLayout>
);

export default Curriculum;
