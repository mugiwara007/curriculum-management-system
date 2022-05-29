import Head from 'next/head';
import { Box, Container, Grid, Typography } from '@mui/material';
import { AccountProfile } from './account/account-profile';
import { AccountProfileDetails } from './account/account-profile-details';
import { AccountEmail } from './account/account-email';
import { AccountPassword } from './account/account-password';
import { DashboardLayout } from './dashboard-layout';

const Account = () => (
  <>
    <Head>
      <title>
        Account | Material Kit
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth="lg">
        <Typography
          sx={{ mb: 3 }}
          variant="h4"
        >
          Account
        </Typography>
        <Grid
          container
          spacing={3}
        >
          {/* <Grid
            item
            lg={40}
            md={6}
            xs={12}
          >
            <AccountProfile />
          </Grid> */}
          <Grid
            item
            lg={5}
            md={6}
            xs={12}
          >
            <AccountProfileDetails />
          </Grid>
          <Grid
            item
            lg={3}
            md={6}
            xs={12}
          >
            <AccountPassword />
          </Grid>
          <Grid
            item
            lg={4}
            md={6}
            xs={12}
          >
            <AccountEmail />
          </Grid>
          
        </Grid>
      </Container>
    </Box>
  </>
);

Account.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

export default Account;
