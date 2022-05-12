import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon, Typography, getAccordionActionsUtilityClass
} from '@mui/material';
import { Search as SearchIcon } from '../../icons/search';
import { Upload as UploadIcon } from '../../icons/upload';
import { Download as DownloadIcon } from '../../icons/download';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import ArchiveIcon from '@mui/icons-material/Archive';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useFormik } from 'formik';
import { userAuth } from '../data-handling/user-crud';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useAuth } from 'src/contexts/AuthContext';
import * as Yup from 'yup';
import { getArchivelist, getUserLevel, setArchivelist } from '../userModel';
import { db } from 'src/firebase/firebase-auth';
import { doc, updateDoc } from "firebase/firestore";

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import Link from '@mui/material/Link';
export default function FormDialog() {

  const [open, setOpen] = React.useState(false);
  const { addUser } = userAuth()
  const [userLevel, setUserLevel] = React.useState(getUserLevel())

  

  const formik = useFormik({
    initialValues:
    {
      Email: '',
      Name: '',
      Password: '',
      Usercode: '',
      Username: '',
      Userlevel: '3',
    },
    validationSchema: Yup.object({
      Email: Yup
      .string()
      .max(100)
      .required
      (
        'Email is required'
      ),
      Name: Yup
      .string()
      .max(100)
      .required
      (
        'Name is required'
      ),
      Password: Yup
      .string()
      .max(64)
      .required
      (
        'Password is required'
      ),
      Usercode: Yup
      .string()
      .max(11)
      .required
      (
        'Usercode is required'
      ),
      Username: Yup
      .string()
      .max(32)
      .required
      (
        'Username is required'
      ),
      // Userlevel: Yup
      // .number()
      // .max(50)
      // .required
      // (
      //   'User level is required'
      // )
    }),
    onSubmit: () => {
      addUser(
        formik.values.Email,
        formik.values.Name,
        formik.values.Password,
        formik.values.Usercode,
        formik.values.Username,
        userLevel,
      )
    }
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={{display : 'inline-block'}} >
      <Button
          color="primary"
          variant="contained"
          startIcon={(<AddIcon fontSize="small" />)}
          onClick={handleClickOpen}
        >
          Add Users
        </Button>
      <Dialog open={open}
      onClose={handleClose}>
        <DialogTitle
        display="flex"
        justifyContent="center" 
        >Add User</DialogTitle>
        <form onSubmit={formik.handleSubmit}>
        <DialogContent>
              <TextField
              error={Boolean(formik.touched.Email && formik.errors.Email)}
              fullWidth
              helperText={formik.touched.Email && formik.errors.Email}
              label="Email Address"
              margin="normal"
              name="Email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.Email}
              variant="outlined"
              />

              <TextField
              error={Boolean(formik.touched.Name && formik.errors.Name)}
              fullWidth
              helperText={formik.touched.Name && formik.errors.Name}
              label="Name"
              margin="normal"
              name="Name"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.Name}
              variant="outlined"
              />

              <TextField
              error={Boolean(formik.touched.Password && formik.errors.Password)}
              fullWidth
              helperText={formik.touched.Password && formik.errors.Password}
              label="Password"
              margin="normal"
              name="Password"
              type="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.Password}
              variant="outlined"
              />


              <TextField
              error={Boolean(formik.touched.Usercode && formik.errors.Usercode)}
              fullWidth
              helperText={formik.touched.Usercode && formik.errors.Usercode}
              label="Usercode"
              margin="normal"
              name="Usercode"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.Usercode}
              variant="outlined"
              />

              <TextField
              error={Boolean(formik.touched.Username && formik.errors.Username)}
              fullWidth
              helperText={formik.touched.Username && formik.errors.Username}
              label="Username"
              margin="normal"
              name="Username"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.Username}
              variant="outlined"
              />

              {/* <TextField
              error={Boolean(formik.touched.Userlevel && formik.errors.Userlevel)}
              fullWidth
              helperText={formik.touched.Userlevel && formik.errors.Userlevel}
              label="User level"
              margin="normal"
              name="Userlevel"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.Userlevel}
              variant="outlined"
              /> */}
              <FormControl sx={{marginLeft:1, marginTop:2}}>
                <FormLabel id="demo-radio-buttons-group-label">User Level</FormLabel>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="2"
                  name="radio-buttons-group"
                  onChange={(event)=>{
                    setUserLevel(event.target.value)
                  }}
                  >
                    <FormControlLabel value="2" control={<Radio />} label="Department Chair" />
                    <FormControlLabel value="3" control={<Radio />} label="Dean" />
                </RadioGroup>
              </FormControl>
        </DialogContent>

        <DialogActions>
          <Box>
            <Button
            color="primary"
            onClick={handleClose}>Cancel
            </Button>
          </Box>
          <Box p={2}>
            <Button
            color="primary"
            variant='contained'
            type="submit"
            onClick={handleClose}
            >
              Done
            </Button>
          </Box>
        </DialogActions>
        </form>
      </Dialog>
      </div>
  );
}

  function SimpleDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    if(getArchivelist() == null || getArchivelist() == '' || getArchivelist().length < 1){
      alert('Please select item/s first.')
    }
    else{
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleArchived = () =>{
    getArchivelist().map(async(data)=>{
      const user = doc(db, "users", data);
      await updateDoc(user, {
        archive: true
      });
    })
    setOpen(false);
    setArchivelist('')
  }

  return (
    <div style={{display : 'inline-block'}} >
        <Button
          startIcon={(<ArchiveIcon fontSize="small" />)}
          sx={{ mr: 1 }}
          onClick={handleClickOpen}
        >
          Archive
        </Button>
      <Dialog open={open}
      onClose={handleClose}
      >
        <DialogTitle
        display="flex"
        justifyContent="center" >Archive Data</DialogTitle>

        <DialogContent>
          <Box>
            Are you sure you want to Archive this data?
          </Box>
        </DialogContent>

        <DialogActions>
          <Box>
            <Button
            color="primary"
            onClick={handleClose}>Cancel
            </Button>
          </Box>
          <Box pr={1}>
            <Button
             style={{
              borderRadius: 10,
              backgroundColor: "#FF0000",
              padding: "5px 10px",
              fontSize: "13px"
              }}
            color="primary"
            variant='contained'
            onClick={handleArchived}>Comfirm
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
      </div>
  );
}

export const CustomerListToolbar = (props) => {
  const router = useRouter();
  return(
  <Box {...props}>
    <Box
      sx={{
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        m: -1
      }}
    >
      <Typography
        sx={{ m: 1 }}
        variant="h4"
      >
        Users
      </Typography>
      <Box sx={{ m: 1 }}>
        {/* <Button
          startIcon={(<ArchiveIcon fontSize="small" />)}
          sx={{ mr: 1 }}
        >
          Archive
        </Button> */}
        <SimpleDialog>
        </SimpleDialog>
        <FormDialog>
        </FormDialog>
      </Box>
    </Box>
    <Box sx={{ mt: 3 }}>
      <Card>
        <CardContent>
          <Box sx={{ maxWidth: 500 }}>
            <TextField
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SvgIcon
                      color="action"
                      fontSize="small"
                    >
                      <SearchIcon />
                    </SvgIcon>
                  </InputAdornment>
                )
              }}
              placeholder="Search customer"
              variant="outlined"
            />
            <Link onClick={()=>{router.push('/user_archive')}} sx={{marginTop:'auto', cursor:'pointer'}}>User Archive List</Link>
          </Box>
        </CardContent>
      </Card>
    </Box>
  </Box>
  )
};
