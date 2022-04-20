import Head from 'next/head';
import { CacheProvider } from '@emotion/react';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { createEmotionCache } from '../utils/create-emotion-cache';
import { theme } from '../theme';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { SubjectProvider } from 'src/components/data-handling/subject-crud';
import { UserProvider } from 'src/components/data-handling/user-crud';
import { AuthProvider } from 'src/contexts/AuthContext';
// import Login from './login';
// import Register from './register';
// import Account from './account';
// import Colleges from './colleges';
// import Curriculum from './curriculum';
// import Customers from './customers';
// import Departments from './departments';
// import Dashboard from '.';
// import Products from './products';
// import Settings from './settings';
// import Subjects from './subjects';
// import PrivateRoute from 'src/routes/PrivateRoute';
//import AuthRoute from 'src/routes/AuthRoute';
import PageAuth from 'src/routes/PageAuth';

const clientSideEmotionCache = createEmotionCache();

const App = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
      <AuthProvider>
        <SubjectProvider>
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
            </ThemeProvider>
          </LocalizationProvider>
        </CacheProvider>
        </SubjectProvider>

        {/* <UserProvider>
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
            </ThemeProvider>
          </LocalizationProvider>
        </CacheProvider>
        </UserProvider> */}
      </AuthProvider>
  );
};
export default App;
