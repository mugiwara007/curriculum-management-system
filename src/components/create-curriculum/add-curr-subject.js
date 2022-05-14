import {
    Box,
    TextField,
    Button
  } from '@mui/material';
  import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import React from 'react';
import { useAuth } from 'src/contexts/AuthContext';
import { getDocs, collection, doc, getDoc, onSnapshot, query, addDoc, where } from 'firebase/firestore';
import { db } from 'src/firebase/firebase-auth'
import { auth } from 'src/firebase/firebase-auth';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import AddIcon from '@mui/icons-material/Add';

export const AddCurrSubDialog = (props) => {
    const { currentUser } = useAuth()
    const [open, setOpen] = React.useState(false);
  
    const formik = useFormik({
      initialValues: {
        sCode: '',
        sDesc: '',
        sLec: '',
        sLab: '',
        sTotalUn: '',
        sHours: '',
        sPreReq: '',
        sCoReq: ''
      },
      validationSchema: Yup.object({
        sCode: Yup
          .string()
          .max(255)
          .required(
            'Subject code is required'),
        sDesc: Yup
          .string()
          .max(255)
          .required(
            'Subject description is required'),
        sLec: Yup
          .number()
          .typeError("Input must be a number")
          .max(99999999999, "LEC Units must be below 12 digits.")
          .required(
            'LEC units is required'),
        sLab: Yup
          .number("Input must be a number")
          .typeError("Input must be a number")
          .max(99999999999, "LAB Units must be below 12 digits")
          .required(
            'LAB units is required'),
        sTotalUn: Yup
          .number()
          .max(99999999999)
          .required(
            'Total units units is required'),
        sHours: Yup
          .number()
          .max(99999999999)
          .required(
            'Hours per week units is required'),
        sPreReq: Yup
          .string()
          .max(255)
          .required(
            'Pre-requisite is required'),
        sCoReq: Yup
          .string()
          .max(255)
          .required(
            'Pre-requisite is required')
      }),
      onSubmit: () => {
        if (currentUser){
          addCurrSubject(
            formik.values.sCode,
            formik.values.sDesc,
            formik.values.sLec,
            formik.values.sLab,
            formik.values.sTotalUn,
            formik.values.sHours,
            formik.values.sPreReq,
            formik.values.sCoReq
          )
          formik.setSubmitting(false)
        }
      }
    });
  
    const addCurrSubject = async (newSubCode,newSubDesc,newSubLec,newSubLab,newTotalUnits,newHrPW,
      newSubPreReq,newSubCoReq) =>{
        auth.onAuthStateChanged(async user => {
          if (user) {
            const currSubRef = collection(db, "curriculumns", "ps9MYwDR6ubdupS6P7TT", "first_year");
            addDoc(currSubRef, {
                sub_code: newSubCode,
                sub_desc: newSubDesc,
                sub_lec: newSubLec,
                sub_lab: newSubLab,
                total_units: newTotalUnits,
                hour_pw: newHrPW,
                sub_preReq: newSubPreReq,
                sub_coReq: newSubCoReq,
                curr_sem: Number(props.value)
            });
            } else {
                // User is signed out
                // ...
            }
        });
        handleClose();
    };
  
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
            Add Subject
          </Button>
        <Dialog open={open}
          onClose={handleClose}>
          <DialogTitle
          display="flex"
          justifyContent="center"
          >Add Subject to Curriculum</DialogTitle>
          <form onSubmit={formik.handleSubmit}>
          <DialogContent>
  
               <TextField
                  error={Boolean(formik.touched.sCode && formik.errors.sCode)}
                  fullWidth
                  helperText={formik.touched.sCode && formik.errors.sCode}
                  label="Subject Code"
                  margin="normal"
                  name="sCode"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.sCode}
                  variant="outlined"
                />
  
                <TextField
                  error={Boolean(formik.touched.sDesc && formik.errors.sDesc)}
                  fullWidth
                  helperText={formik.touched.sDesc && formik.errors.sDesc}
                  label="Subject Description"
                  margin="normal"
                  name="sDesc"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.sDesc}
                  variant="outlined"
                />
  
  
                <TextField
                  error={Boolean(formik.touched.sLec && formik.errors.sLec)}
                  fullWidth
                  helperText={formik.touched.sLec && formik.errors.sLec}
                  label="LEC Units"
                  margin="normal"
                  name="sLec"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.sLec}
                  variant="outlined"
                />
  
                <TextField
                  error={Boolean(formik.touched.sLab && formik.errors.sLab)}
                  fullWidth
                  helperText={formik.touched.sLab && formik.errors.sLab}
                  label="LAB Units"
                  margin="normal"
                  name="sLab"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.sLab}
                  variant="outlined"
                />
  
                <TextField
                  error={Boolean(formik.touched.sTotalUn && formik.errors.sTotalUn)}
                  fullWidth
                  helperText={formik.touched.sTotalUn && formik.errors.sTotalUn}
                  label='Total Units'
                  margin="normal"
                  name="sTotalUn"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.sTotalUn}
                  variant="outlined"
                />
  
                <TextField
                  error={Boolean(formik.touched.sHours && formik.errors.sHours)}
                  fullWidth
                  helperText={formik.touched.sHours && formik.errors.sHours}
                  label='Hours Per Week'
                  margin="normal"
                  name="sHours"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.sHours}
                  variant="outlined"
                />
  
                <TextField
                  error={Boolean(formik.touched.sPreReq && formik.errors.sPreReq)}
                  fullWidth
                  helperText={formik.touched.sPreReq && formik.errors.sPreReq}
                  label="Pre-Requisite"
                  margin="normal"
                  name="sPreReq"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.sPreReq}
                  variant="outlined"
                />
  
                <TextField
                  error={Boolean(formik.touched.sCoReq && formik.errors.sCoReq)}
                  fullWidth
                  helperText={formik.touched.sCoReq && formik.errors.sCoReq}
                  label="Co-Requisite"
                  margin="normal"
                  name="sCoReq"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.sCoReq}
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