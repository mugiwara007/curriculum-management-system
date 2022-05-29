import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { CustomerListResults } from './user/customer-list-results';
import { CustomerListToolbar } from './user/customer-list-toolbar';
import { DashboardLayout } from './dashboard-layout';
import { customers } from '../__mocks__/customers';

const Customers = () => (
  <>
    <Head>
      <title>
        Users | Material Kit
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
        <CustomerListToolbar />
        <Box sx={{ mt: 3 }}>
          <CustomerListResults/>
        </Box>
      </Container>
    </Box>
  </>
);
Customers.getLayout = (page) => (
    <DashboardLayout>
      {page}
    </DashboardLayout>
);

export default Customers;
