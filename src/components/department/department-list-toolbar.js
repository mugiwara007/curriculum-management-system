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
import ArchiveIcon from '@mui/icons-material/Archive';
import { useAuth } from 'src/contexts/AuthContext'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { deptAuth } from '../data-handling/department-crud';
import * as React from 'react';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import * as Yup from 'yup';
import { getArchivelist, setArchivelist, getArchiveDisable } from '../userModel';

import Link from '@mui/material/Link';

import { db } from 'src/firebase/firebase-auth';
import { doc, updateDoc } from "firebase/firestore";

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);
  const { addDept } = deptAuth();

  const formik = useFormik ({
    initialValues:
    {
      dCode: '',
      dDesc: '',
      cdCode: ''
    },
    validationSchema: Yup.object({
      dCode: Yup
        .string()
        .max(11)
        .required(
          'Department code is required'),
      dDesc: Yup
        .string()
        .max(255)
        .required(
          'Department description is required'),
      cdCode: Yup
        .string()
        .max(11)
        .required(
          'College code is required')
    }),
    onSubmit: () => {
      addDept(
        formik.values.dCode,
        formik.values.dDesc,
        formik.values.cdCode
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
          Add department
        </Button>
      <Dialog open={open}
      onClose={handleClose}>
        <DialogTitle
        display="flex"
        justifyContent="center">Add Department</DialogTitle>
        <form onSubmit={formik.handleSubmit}>
        <DialogContent>

              <TextField
                error={Boolean(formik.touched.dCode && formik.errors.dCode)}
                fullWidth
                helperText={formik.touched.dCode && formik.errors.dCode}
                label="Department Code"
                margin="normal"
                name="dCode"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.dCode}
                variant="outlined"
              />

              <TextField
                error={Boolean(formik.touched.dDesc && formik.errors.dDesc)}
                fullWidth
                helperText={formik.touched.dDesc && formik.errors.dDesc}
                label="Department Description"
                margin="normal"
                name="dDesc"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.dDesc}
                variant="outlined"
              />

              <TextField
                error={Boolean(formik.touched.cdCode && formik.errors.cdCode)}
                fullWidth
                helperText={formik.touched.cdCode && formik.errors.cdCode}
                label="College Code"
                margin="normal"
                name="cdCode"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.cdCode}
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
              onClick={handleClose}
              disabled={formik.isSubmitting}
              type="submit">
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
  const [archiveDisable, setArchiveDisable] = React.useState(true)

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
      const user = doc(db, "departments", data);
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


export const DepartmentListToolbar = (props) => {
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
        Department
      </Typography>
      <Box sx={{ m: 1 }}>
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
            <Link onClick={()=>{router.push('/department_archive')}} sx={{marginTop:'auto', cursor:'pointer'}}>Department Archive List</Link>
          </Box>
        </CardContent>
      </Card>
    </Box>
  </Box>)
};
