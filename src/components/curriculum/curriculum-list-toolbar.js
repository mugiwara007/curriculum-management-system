
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
import { doc, setDoc, collection, getDocs, query, where, onSnapshot } from "firebase/firestore";
import { db } from 'src/firebase/firebase-auth';
import { compareAsc } from 'date-fns';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import * as Yup from 'yup';
import { useEffect } from 'react';
import { getEmail } from '../userModel';
import { auth } from 'src/firebase/firebase-auth'

export default function AddCurriculumModal()
{
  const usersCollectionRef = collection(db, "users");
  const [open, setOpen] = React.useState(false);
  const [DeptCode, setDeptCode] = React.useState([]);
  const [department, setDepartment] = React.useState([])

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
          'College Description is required')
      
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

  useEffect(() => {
    const q = query(collection(db, "departments"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const temp= [];
      querySnapshot.forEach((doc) => {
          temp.push(doc.data());
      });
      setDepartment(temp)
    });
  }, [])
  

  const addCurriculum = async(data) =>{
    const curr_id = Date.parse(new Date())
    const curriculum_doc = doc(db,"curriculumns", curr_id.toString())
    const version_collection = collection(curriculum_doc,"versions")
    await setDoc(curriculum_doc, data);
    await setDoc(doc(version_collection,data.currVersion.toString()),{
      version:data.currVersion.toString(),
    }).then(()=>{
      const version_doc = doc(version_collection,data.currVersion.toString())
      const first_year = collection(version_doc,"first_year")
      const second_year = collection(version_doc,"second_year")
      const third_year = collection(version_doc,"third_year")
      const fourth_year = collection(version_doc,"fourth_year")
      setDoc(doc(first_year,"no_data"),{
        message:"There is no subject yet in this version"
      })
      setDoc(doc(second_year,"no_data"),{
        message:"There is no subject yet in this version"
      })
      setDoc(doc(third_year ,"no_data"),{
        message:"There is no subject yet in this version"
      })
      setDoc(doc(fourth_year,"no_data"),{
        message:"There is no subject yet in this version"
      })
    })
    handleClose()
  }

  const handleData = async (currCode,cmo,deptCode) => {
    const current_date =  new Date()
    let newSubUser=""
    const email = getEmail();
    const userData = query(usersCollectionRef, where("email", "==", email));
    const querySnapshot = await getDocs(userData)
    await querySnapshot.forEach((doc) => {
      const data = doc.data()
      newSubUser=data.username
    });
                    
    addCurriculum({currCode: currCode,cmo:cmo,currVersion:1,depCode:deptCode,username:newSubUser, dateCreated:((current_date.getMonth()+1) + "/" + current_date.getDate() + "/" + current_date.getFullYear()), dateApproved:'--', email:getEmail(), on_review:false, accepted:false})
                    
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

            {/* <TextField
            fullWidth
            label="Version" 
            variant="outlined" 
            margin="normal"
            type="text"
            name="currVersion"
            onChange={formik.handleChange}
            value={formik.values.currVersion}
            /> */}
            
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
                {department.map((data, key)=>{
                  return(<MenuItem value={data.dept_code} key={key}>{data.dept_code}</MenuItem>)
                })}
              </Select>
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
                  onClick={() => handleData(formik.values.currCode,formik.values.cmo,DeptCode)}>
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