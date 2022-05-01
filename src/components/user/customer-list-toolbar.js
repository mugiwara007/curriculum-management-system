import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon, Typography
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
import * as React from 'react';
import { useAuth } from 'src/contexts/AuthContext';
import * as Yup from 'yup';

export default function FormDialog() {

  const [open, setOpen] = React.useState(false);
  const { addUser } = userAuth()

  const formik = useFormik({
    initialValues:
    {
      Email: '',
      Name: '',
      Password: '',
      Usercode: '',
      Username: '',
      Userlevel: '',
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
      Userlevel: Yup
      .string()
      .max(32)
      .required
      (
        'User level is required'
      )
    }),
    onSubmit: () => {
      addUser(
        formik.values.Email,
        formik.values.Name,
        formik.values.Password,
        formik.values.Usercode,
        formik.values.Username,
        formik.values.Userlevel,
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
              label="Email"
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

              <TextField
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
              />
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
            disabled={formik.isSubmitting}
            type="submit"
            onClick={handleClose}>
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
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
            onClick={handleClose}>Comfirm
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
      </div>
  );
}

export const CustomerListToolbar = (props) => (
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
          </Box>
        </CardContent>
      </Card>
    </Box>
  </Box>
);
