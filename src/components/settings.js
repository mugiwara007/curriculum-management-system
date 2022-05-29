import Head from 'next/head';
import { Box, Container, Typography } from '@mui/material';
import { DashboardLayout } from './dashboard-layout';
import { SettingsNotifications } from './settings/settings-notifications';
import { SettingsPersonal } from './settings/settings-personal';
import { SettingsUsername } from './settings/settings-username';
import { SettingsPassword } from './settings/settings-password';
import { SettingsEmail } from './settings/settings-change-email';


const Settings = () => (
  <>
    <Head>
      <title>
        Settings | Material Kit
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
          Settings
        </Typography>
        <SettingsNotifications />
        
      </Container>
    </Box>
  </>
);

Settings.getLayout = (page) => (
    <DashboardLayout>
      {page}
    </DashboardLayout>
);

export default Settings;
