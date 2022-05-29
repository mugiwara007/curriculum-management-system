import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { ArchivesListResults } from './archives/archives-list-results';
import { ArchivesListToolbar } from './archives/archives-list-toolbar';
import { DashboardLayout } from './dashboard-layout';
import { customers } from '../__mocks__/customers';
import { ArchiveProvider } from './archives/archives-list-toolbar';

const Archives = () => (
  
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
Archives.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Archives;
