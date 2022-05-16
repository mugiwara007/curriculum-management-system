import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Container, Grid, Link, TextField, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Facebook as FacebookIcon } from '../icons/facebook';
import { Google as GoogleIcon } from '../icons/google';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useAuth } from 'src/contexts/AuthContext';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import * as React from 'react';
import { setUserLevel } from 'src/components/userModel';
import { db, auth } from 'src/firebase/firebase-auth';
import { doc, getDoc } from "firebase/firestore";


const bgImagePath =
"/static/images/soar_bulsu_2019.jpg"

const styles = {
  loginContainer: {
      backgroundImage: `url(${"/static/images/CurMaFINAL.png"})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      position: "absolute",
      top: "0px",
      left: "0px",
      width: "65%",
      height: "100%",
  }
};

export function FormDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={{display : 'inline-block'}}>
      <Link
        to="/"
        variant="subtitle2"
        underline="hover"
        sx={{
          cursor: 'pointer'
        }}
        onClick={handleClickOpen}
      >
        Click Here
      </Link>
      <Dialog open={open} 
      onClose={handleClose}>
        <DialogTitle
        display="flex"
        justifyContent="center"
        >Password Reset</DialogTitle>
        <DialogContent>
          <DialogContentText>
           To Receive a Password Reset Email, Please Type Your Registered Email Address Below.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button color="primary"
           variant="contained"
          onClick={handleClose}>Send Password Reset</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const Login = () => {
  const { currentUser } = useAuth()
  const { login } = useAuth()
  const router = useRouter();

  function handleSessionControlLogin(){
    //Do your logic here...
    signInWithEmailAndPassword(auth, formik.values.email, formik.values.password)
      .then(async(userCredential) => {
        // Signed in 
        const user = userCredential.user;
        const user_data = doc(db, "users", user.uid);
        const docSnap = await getDoc(user_data);

        if (docSnap.exists()) {
          setUserLevel(docSnap.data().userlevel)
          router.push('/dashboard')
        } else {
          // doc.data() will be undefined in this case
          alert("No such document!");
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage)
      });
      // login(formik.values.email, formik.values.password);
      formik.setSubmitting(false)

  }

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup
        .string()
        .email(
          'Must be a valid email')
        .max(255)
        .required(
          'Email is required'),
      password: Yup
        .string()
        .max(255)
        .required(
          'Password is required')
    }),
    onSubmit: () => {
      handleSessionControlLogin()
    }
  });

  return (
    <>
      <Head>
        <title>CurMaSys</title>
      </Head>
      <Box 
      sx = {{ 
        mr: '10px',
        display: { xs: 'none', sm: 'none',  md: 'none', lg: 'block', xl: 'block' }
        }}
      style={styles.loginContainer} />
      <Box
        component="main"
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexGrow: 1,
          minHeight: '100%',
        }}
      >
            {/* <Container
            sx = {{ 
              mr: '10px',
              display: { xs: 'none', sm: 'none',  md: 'none', lg: 'block', xl: 'block' }
              }}
            >
                <img
                  alt="Bulsu Bg Image"
                  src="/static/images/curmasysFinal.jpg"
                  loading="lazy"
                  width="174%"
                />
            </Container> */}
            <Container maxWidth="xs"
            sx = {{ 
              border: 0, 
              borderRadius: '5%', 
              padding: '2%',
              mr: { xs: '0%', sm: '21%',  md: '30%', lg: '2%', xl: '7%'  },
              backgroundColor: '#FFFFFF',
              width: { xs: '100%', sm: '100%',  md: '100%', lg: '32%', xl: '100%' }
              }}>
              {/* <NextLink
                href="/"
                passHref
              >
                <Button
                  component="a"
                  startIcon={<ArrowBackIcon fontSize="small" />}
                >
                  Dashboard
                </Button>
              </NextLink> */}
              <form onSubmit={formik.handleSubmit}>
                <Box sx={{ my: 3 }}>
                  <Typography
                    color="textPrimary"
                    variant="h4"
                  >
                    Sign in
                  </Typography>
                </Box>
                {/* <Grid
                  container
                  spacing={3}
                >
                  <Grid
                    item
                    xs={12}
                    md={6}
                  >
                    <Button
                      color="info"
                      fullWidth
                      startIcon={<FacebookIcon />}
                      onClick={formik.handleSubmit}
                      size="large"
                      variant="contained"
                    >
                      Login with Facebook
                    </Button>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={6}
                  >
                    <Button
                      fullWidth
                      color="error"
                      startIcon={<GoogleIcon />}
                      onClick={formik.handleSubmit}
                      size="large"
                      variant="contained"
                    >
                      Login with Google
                    </Button>
                  </Grid>
                </Grid> */}
                {/* <Box
                  sx={{
                    pb: 1,
                    pt: 3
                  }}
                >
                  <Typography
                    align="center"
                    color="textSecondary"
                    variant="body1"
                  >
                    or login with email address
                  </Typography>
                </Box> */}
                <TextField
                  error={Boolean(formik.touched.email && formik.errors.email)}
                  fullWidth
                  helperText={formik.touched.email && formik.errors.email}
                  label="Email Address"
                  margin="normal"
                  name="email"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="email"
                  value={formik.values.email}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(formik.touched.password && formik.errors.password)}
                  fullWidth
                  helperText={formik.touched.password && formik.errors.password}
                  label="Password"
                  margin="normal"
                  name="password"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="password"
                  value={formik.values.password}
                  variant="outlined"
                />
                <Box sx={{ py: 2 }}>
                  <Button
                    color="primary"
                    disabled={formik.isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Sign In Now
                  </Button>
                </Box>
                <Typography
                  color="textSecondary"
                  variant="body2"
                >
                Forgot Password?
                  {' '}
                  <FormDialog></FormDialog>
                </Typography>
              </form>
            </Container>
      </Box>
    </>
  );
};

export default Login;
