
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
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import NextLink from 'next/link';
import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Link from '@mui/material/Link';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { doc, setDoc } from "firebase/firestore";
import { db } from 'src/firebase/firebase-auth';
import { compareAsc } from 'date-fns';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import * as Yup from 'yup';

export default function AddCurriculumModal()
{
  const [open, setOpen] = React.useState(false);
  const [DeptCode, setDeptCode] = React.useState('BSIT');

  const handleClickOpen = () => 
  {
    setOpen(true);
  };

  const handleClose = () => 
  {
    setOpen(false);
  };

  const handleChange = (event) => 
  {
    setDeptCode(event.target.value);
  };

  const formik = useFormik({
    initialValues:
    {
      currCode: '',
      cmo: '',
      currVersion: '',
      deptCode: '',
      username: '',
    },
    validationSchema: Yup.object({
      currCode: Yup
        .string()
        .max(11)
        .required(
          'College Code is required'),
      cmo: Yup
        .string()
        .max(255)
        .required(
          'College Description is required'),
      currVersion: Yup
        .string()
        .max(11)
        .required(
          'College Logo is required'),
      deptCode: Yup
        .string()
        .max(255)
        .required(
          'College Description is required'),
      username: Yup
        .string()
        .max(11)
        .required(
          'College Logo is required')
      
    }),

    onSubmit: async() => 
    {
      // if (currentUser)
      // {
      //   addCollege(
      //     formik.values.cCode,
      //     formik.values.cDesc,
      //     formik.values.cLogo,
      //   )

      //   formik.setSubmitting(false)
      // }

      
    }
  });

  const addCurriculum = async(data) =>{
    const curr_id = Date.parse(new Date())
    await setDoc(doc(db, "curriculumns", curr_id.toString()), data);
    handleClose()
  }

  return (
    <div style={{display : 'inline-block'}} >
        <Button
          color="primary"
          variant="contained"
          startIcon={(<AddIcon fontSize="small" />)}
          onClick={handleClickOpen}
          >
            Add Curriculum
          </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle
          display="flex"
          justifyContent="center"
          >Add Curriculum</DialogTitle>
          <DialogContent>
            <TextField
            fullWidth
            label="Curriculum Code" 
            variant="outlined" 
            margin="normal"
            type="text"
            name="currCode"
            onChange={formik.handleChange}
            value={formik.values.currCode}
            />

            <TextField
            fullWidth
            label="CMO" 
            variant="outlined" 
            margin="normal"
            type="text"
            name="cmo"
            onChange={formik.handleChange}
            value={formik.values.cmo}
            />

            <TextField
            fullWidth
            label="Version" 
            variant="outlined" 
            margin="normal"
            type="text"
            name="currVersion"
            onChange={formik.handleChange}
            value={formik.values.currVersion}
            />
            
            <FormControl sx={{ m: "auto", mt: 1, width: 1}}>
              <InputLabel id="demo-simple-select-autowidth-label">Department Code</InputLabel>
              <Select
                value={DeptCode}
                onChange={(event)=>{
                  setDeptCode(event.target.value)
                }}
                fullWidth
                label="Department Code"
              >
                <MenuItem value={'BSIT'}>BSIT</MenuItem>
                <MenuItem value={'BSIS'}>BSIS</MenuItem>
              </Select>
            </FormControl>

            <TextField
            fullWidth
            label="Username" 
            variant="outlined" 
            margin="normal"
            type="text"
            name="username"
            onChange={formik.handleChange}
            value={formik.values.username}
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
                  onClick={()=>{
                    addCurriculum({currCode: formik.values.currCode,cmo:formik.values.cmo,currVersion:formik.values.currVersion,depCode:DeptCode,username:formik.values.username, dateCreated:Date.parse(new Date()).toString(), dateApproved:'--'})
                  }
                  }>
                    Done
                </Button>
              </Box>
          </DialogActions>
        </Dialog>
    </div>
  );
}

export const CurriculumListToolbar = (props) => 
{
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
        Curriculum
      </Typography>
      <Box sx={{ m: 1 }}>
        <AddCurriculumModal>
          {/* ADD CURRICULUM */}
        </AddCurriculumModal>
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
  </Box>)
};