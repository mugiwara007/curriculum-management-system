import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { DepartmentListResults } from './department/department-list-results';
import { DepartmentListToolbar } from './department/department-list-toolbar';
import { DashboardLayout } from './dashboard-layout';
import { customers } from '../__mocks__/customers';

const Departments = () => (
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
        <DepartmentListToolbar />
        <Box sx={{ mt: 3 }}>
          <DepartmentListResults />
        </Box>
      </Container>
    </Box>
  </>
);
Departments.getLayout = (page) => (
    <DashboardLayout>
      {page}
    </DashboardLayout>
);

export default Departments;
