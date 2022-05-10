import Head from 'next/head';
import { Box, Container, Grid } from '@mui/material';
import { TotalUsers } from '../components/dashboard/total-users';
import { LatestOrders } from '../components/dashboard/latest-orders';
import { LatestCurriculumGenerated } from '../components/dashboard/latest-curriculum-generated';
import { Sales } from '../components/dashboard/sales';
import { TotalDepartments } from '../components/dashboard/total-departments';
import { TotalSubjects } from '../components/dashboard/total-subjects';
import { TotalColleges } from '../components/dashboard/total-colleges';
import { TotalCurriculumsGenerated } from '../components/dashboard/total-curriculums-generated';
import { DashboardLayout } from '../components/dashboard-layout';
import {  withAuth } from '../routes/withAuth'

const Dashboard = () => (
  <>
    <Head>
      <title>
        Dashboard | Material Kit
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
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <TotalUsers />
          </Grid>
          <Grid
            item
            xl={3}
            lg={3}
            sm={6}
            xs={12}
          >
            <TotalSubjects />
          </Grid>
          <Grid
            item
            xl={3}
            lg={3}
            sm={6}
            xs={12}
          >
            <TotalDepartments />
          </Grid>
          <Grid
            item
            xl={3}
            lg={3}
            sm={6}
            xs={12}
          >
            <TotalColleges sx={{ height: '100%' }} />
          </Grid>
          {/* <Grid
            item
            lg={12}
            md={12}
            xl={12}
            xs={12}
          >
            <Sales />
          </Grid> */}
          {/* <Grid
            item
            lg={4}
            md={6}
            xl={12}
            xs={12}
          >
            <TotalCurriculumsGenerated sx={{ height: '100%' }} />
          </Grid> */}
          <Grid
            item
            lg={12}
            md={12}
            xl={12}
            xs={12}
          >
            <LatestCurriculumGenerated sx={{ height: '100%' }} />
          </Grid>
          {/* <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}
          >
            <LatestOrders />
          </Grid> */}
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
