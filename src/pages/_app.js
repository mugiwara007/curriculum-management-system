import Head from 'next/head';
import { CacheProvider } from '@emotion/react';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { createEmotionCache } from '../utils/create-emotion-cache';
import { theme } from '../theme';
import { BrowserRouter as Router } from 'react-router-dom';
import { Switch } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { SubjectProvider } from 'src/components/data-handling/subject-crud';
import { UserProvider } from 'src/components/data-handling/user-crud';
import { AuthProvider } from 'src/contexts/AuthContext';
// import Login from './index';
// import Account from './account';
// import Colleges from './colleges';
// import Curriculum from './curriculum';
// import Customers from './customers';
// import Departments from './departments';
// import Dashboard from '.';
// import Notifications from './notifications';
// import Settings from './settings';
// import Subjects from './subjects';
// import PrivateRoute from 'src/routes/PrivateRoute';
import PageAuth from 'src/routes/PageAuth';

const clientSideEmotionCache = createEmotionCache();

const App = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const getLayout = Component.getLayout ?? ((page) => page);
  
  return (
      <AuthProvider>
          <SubjectProvider>
            <UserProvider>
              <CacheProvider value={emotionCache}>
                <Head>
                  <title>
                    Material Kit Pro
                  </title>
                  <meta
                    name="viewport"
                    content="initial-scale=1, width=device-width"
                  />
                </Head>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <ThemeProvider theme={theme}>
                    <CssBaseline />
                    {getLayout(<Component {...pageProps} />)}
                    {/* <PageAuth /> */}
                  </ThemeProvider>
                </LocalizationProvider>
              </CacheProvider>
            </UserProvider>
          </SubjectProvider>
      </AuthProvider>
  );
};
export default App;
