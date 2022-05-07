import Head from 'next/head';
import { Box, Container, Grid, Typography, Button } from '@mui/material';
import Divider from '@mui/material/Divider';
import { CreateTables } from '../components/create-curriculum/create-tables';
import { HistoryLog } from '../components/create-curriculum/create-history';
import { DashboardLayout } from '../components/dashboard-layout';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {  withAuth } from '../routes/withAuth'
import NextLink from 'next/link';

const Dashboard = () => (
  <>
    <Head>
      <title>
        Create Curriculum
      </title>
    </Head>

    <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          mt: 2,
  
        }}
      >
        <Typography
          sx={{ m: 1 }}
          variant="h4"
        >
         Create Curriculum
        </Typography>
        <Box sx={{ m: 1 }}>
            <NextLink
          href="/curriculum"
          passHref
          >
          <Button
            startIcon={(<ArrowBackIcon fontSize="small" />)}
            sx={{ mr: 1 }}
          >
            Cancel
          </Button>
          </NextLink>
          <Button
            color="primary"
            variant="contained"
            startIcon={(<SaveIcon fontSize="small" />)}
          >
            Save
          </Button>
        </Box>
      </Box>
 
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth={false}>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={4}
            md={12}
            xl={3}
            xs={12}
          >
            <HistoryLog sx={{ height: '100%' }} />
          </Grid>
          <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}
          >
            <CreateTables />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);

Dashboard.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Dashboard;
