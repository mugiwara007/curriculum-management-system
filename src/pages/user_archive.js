import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { ArchivesListResults } from '../components/archives/user-archive-result';
import { ArchivesListToolbar } from '../components/archives/user-archives-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';
import { customers } from '../__mocks__/customers';
import { ArchiveProvider } from '../components/archives/archives-list-toolbar';

const User_Archives = () => (
  
  <>
    <Head>
      <title>
        Archives
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
      <ArchivesListToolbar />
        <Box sx={{ mt: 3 }}>
          <ArchivesListResults customers={customers} />
        </Box>
      </Container>
    </Box>
  </>
);
User_Archives.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default User_Archives;
