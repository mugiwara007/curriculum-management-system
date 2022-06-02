import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Container, Grid, Link, TextField, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Facebook as FacebookIcon } from '../icons/facebook';
import { Google as GoogleIcon } from '../icons/google';
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail  } from "firebase/auth";
import { useAuth } from 'src/contexts/AuthContext';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import * as React from 'react';
import { setEmail, setUserLevel } from 'src/components/userModel';
import { db, auth } from 'src/firebase/firebase-auth';
import { doc, getDoc } from "firebase/firestore";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

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

const Alert = React.forwardRef(function Alert(props, ref) 
{
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function FormDialog() {
  const [open, setOpen] = React.useState(false);
  const [openSB, setOpenSB] = React.useState(false);
  const [openSBF, setOpenSBF] = React.useState(false);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: ''
    },
    validationSchema: Yup.object({
      email: Yup
      .string()
      .max(100)
      .required
      (
        'Email is required'
      ),
    }),
    onSubmit: async() => {
    }
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setOpenSB(false);
  };

  const handleCloseSB = () => {
    setOpenSB(false);
    setOpenSBF(false);
  };

  const handlePasswordReset = async (values, actions) => {
    const auth = getAuth();
    sendPasswordResetEmail(auth, formik.values.email)
      .then(() => {
        console.log('Password reset email sent successfully');
        setOpenSB(true);
        // return(
        //   <div>
        //     <Stack spacing={2} sx={{ width: '100%' }}>
        //       <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        //         <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
        //         This is a warning message!
        //         </Alert>
        //       </Snackbar>
            
        //     <Alert severity="error">This is an error message!</Alert>
        //     <Alert severity="warning">This is a warning message!</Alert>
        //     <Alert severity="info">This is an information message!</Alert>
        //     <Alert severity="success">This is a success message!</Alert>
        //     </Stack>
        //   </div>
        // );
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        console.log("ERROROOROOR");
        setOpenSBF(true);
      });
  }

  React.useEffect(() => {
    if (localStorage.getItem('accessToken') !== null) {
      router.push('/dashboard')
    } else {
      router.push('/')
    }
  }, [])
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
            onChange={formik.handleChange}
            value={formik.values.email}
            name="email"
          />
        </DialogContent>
        <Stack spacing={2} sx={{ width: '100%' }}>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button color="primary"
           variant="contained"
          onClick={handlePasswordReset}>Send Password Reset</Button>
        </DialogActions>
              <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} open={openSB} autoHideDuration={6000} onClose={handleCloseSB}>
                <Alert onClose={handleCloseSB} severity="success" sx={{ width: '100%' }}>
                Password reset email sent successfully
                </Alert>
              </Snackbar>
              <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} open={openSBF} autoHideDuration={6000} onClose={handleCloseSB}>
                <Alert onClose={handleCloseSB} severity="error" sx={{ width: '100%' }}>
                Password reset failed
                </Alert>
              </Snackbar>
            {/* <Alert severity="error">This is an error message!</Alert>
            <Alert severity="warning">This is a warning message!</Alert>
            <Alert severity="info">This is an information message!</Alert>
            <Alert severity="success">This is a success message!</Alert> */}
        </Stack>
      </Dialog>
    </div>
  );
}

const Login = () => {
  const [open, setOpen] = React.useState(false);
  const { currentUser } = useAuth()
  const { login } = useAuth()
  const router = useRouter();
  const [authOpen, setAuthOpen] = React.useState(false);

  const handleLogClose = () => {
    setAuthOpen(false);
  };

  function handleSessionControlLogin(){
    //Do your logic here...
    signInWithEmailAndPassword(auth, formik.values.email, formik.values.password)
      .then(async(userCredential) => {
        // Signed in 
        const user = userCredential.user;
        const user_data = doc(db, "users", user.uid);
        const docSnap = await getDoc(user_data);

        if (docSnap.exists()) {
          if(!docSnap.data().archive)
          {
            setUserLevel(docSnap.data().userlevel)
            setEmail(formik.values.email)
            localStorage.setItem('email', formik.values.email)
            localStorage.setItem('fullName', docSnap.data().name)
            localStorage.setItem('username', docSnap.data().username)
            localStorage.setItem('user_id', user.uid)
            localStorage.setItem('accessToken', user.accessToken)
            if(formik.values.email == 'curriculum.management.2022@gmail.com'){
              localStorage.setItem('userLevel',1)
            }
            else{
              localStorage.setItem('userLevel',docSnap.data().userlevel)
            }
            router.push('/dashboard')
          }
          else{
            alert("This account is disabled. Try to contact admin.");
          }
        } else {
          // doc.data() will be undefined in this case
          alert("No such document!");
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setAuthOpen(true)
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
            <div>
            <Stack spacing={2} sx={{ width: '100%', float: 'right' }}>
            <Snackbar anchorOrigin={{ vertical:'bottom', horizontal:'right' }} open={authOpen} autoHideDuration={6000} onClose={handleLogClose}>
              <Alert onClose={handleLogClose} severity="error" sx={{ width: '100%' }}>
                Invalid email / password!
              </Alert>
            </Snackbar>
            </Stack>
            </div>
            {/* <Dialog open={authOpen}
            onClose={handleLogClose}
            >

            <DialogTitle
            display="flex"
            justifyContent="center" >Login Failed</DialogTitle>

            <DialogContent>
            <p>Invalid email or password.</p>
            </DialogContent>

            <DialogActions>
            <Box p={2}>
              <Button
                color="info"
                variant='contained'
                disabled={!authOpen}
                type="submit"
                onClick={handleLogClose}
              >
                OK
            </Button>
          </Box>
        </DialogActions>
      </Dialog> */}
      </Box>
    </>
  );
};

export default Login;
