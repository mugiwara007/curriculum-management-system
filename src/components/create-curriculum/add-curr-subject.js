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
import { getDocs, collection, doc, getDoc, onSnapshot, query, addDoc, where,setDoc, } from 'firebase/firestore';
import { db } from 'src/firebase/firebase-auth'
import { auth } from 'src/firebase/firebase-auth';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import AddIcon from '@mui/icons-material/Add';
import { getCurriculumID, getVersion } from './curriculum-model';
import { getYearLevel } from './curriculum-model';

export const AddCurrSubDialog = (props) => {
    const { currentUser } = useAuth()
    const [open, setOpen] = React.useState(false);
    const curriculum_id = getCurriculumID()
    const updateVersion = async(docSnap) =>{
      const curriculum_doc = doc(db,"curriculumns", getCurriculumID())
                const version_collection = collection(curriculum_doc,"versions")
                const querySnapshot = await getDocs(version_collection);
                var counter = 1
                querySnapshot.forEach((doc) => {
                  counter++
                });
                const version_data = {
                  sub_code: docSnap.data.sub_code,
                  sub_desc: docSnap.data.sub_desc,
                  sub_lec: docSnap.data.sub_lec,
                  sub_lab: docSnap.data.sub_lab,
                  total_units: docSnap.data.total_units,
                  hour_pw: docSnap.data.hour_pw,
                  sub_preReq: docSnap.data.sub_preReq,
                  sub_coReq: docSnap.data.sub_coReq,
                  curr_sem: docSnap.data.curr_sem
                }
                if(counter > 2){
                    setDoc(doc(version_collection,counter.toString()),{version:counter.toString()}).then(async()=>{
                      const version_doc = doc(version_collection,counter.toString())
                      const old_version = counter - 1
                      const old_version_doc = doc(version_collection,old_version.toString())
                      const first_year_collection = collection(old_version_doc,"first_year")
                      const second_year_collection = collection(old_version_doc,"second_year")
                      const third_year_collection = collection(old_version_doc,"third_year")
                      const fourth_year_collection = collection(old_version_doc,"fourth_year")
                      const first_year_snap = await getDocs(first_year_collection)
                      const second_year_snap = await getDocs(second_year_collection)
                      const third_year_snap = await getDocs(third_year_collection)
                      const fourth_year_snap = await getDocs(fourth_year_collection)
                      const year_collection = collection(version_doc,getYearLevel())
                      first_year_snap.forEach((doc) =>{
                        addDoc(collection(version_doc,"first_year"), doc.data())
                      })
                      second_year_snap.forEach((doc) =>{
                        addDoc(collection(version_doc,"second_year"), doc.data())
                      })
                      third_year_snap.forEach((doc) =>{
                        addDoc(collection(version_doc,"third_year"), doc.data())
                      })
                      fourth_year_snap.forEach((doc) =>{
                        addDoc(collection(version_doc,"fourth_year"), doc.data())
                      })
                      addDoc(year_collection, version_data)

                    }).catch((e)=>{
                      alert(e)
                    })
                }
                else{
                  setDoc(doc(version_collection,counter.toString()),{version:counter.toString()}).then(()=>{
                    const version_doc = doc(version_collection,counter.toString())
                    const year_collection = collection(version_doc,getYearLevel())
                    addDoc(year_collection, version_data)
                  }).catch((e)=>{
                    alert(e)
                  })
                }
    }
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
          updateVersion({data:{
            sub_code:formik.values.sCode,
            sub_desc:formik.values.sDesc,
            sub_lec:formik.values.sLec,
            sub_lab:formik.values.sLab,
            total_units:formik.values.sTotalUn,
            hour_pw:formik.values.sHours,
            sub_preReq:formik.values.sPreReq,
            sub_coReq:formik.values.sCoReq,
            curr_sem:Number(props.value)
          }})

          formik.setSubmitting(false)
        }
      }
    });
  
    const addCurrSubject = async (newSubCode,newSubDesc,newSubLec,newSubLab,newTotalUnits,newHrPW,
      newSubPreReq,newSubCoReq) =>{
        auth.onAuthStateChanged(async user => {
          if (user) {                                       //collection id ng curriculums
            const currSubRef = collection(db, "curriculumns", curriculum_id, getYearLevel());
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