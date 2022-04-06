import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { CollegeListResults } from '../components/college/college-list-results';
import { CollegeListToolbar } from '../components/college/college-list-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';
import { customers } from '../__mocks__/customers';

const Colleges = () => (
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
        <CollegeListToolbar />
        <Box sx={{ mt: 3 }}>
          <CollegeListResults customers={customers} />
        </Box>
      </Container>
    </Box>
  </>
);
Colleges.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Colleges;
