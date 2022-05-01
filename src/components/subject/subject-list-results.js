import { useState, useEffect } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  CardContent,
  TextField,
  TableCell,
  InputAdornment,
  TableHead,
  TablePagination,
  TableRow,
  SvgIcon,
  Typography,
  Button,
} from '@mui/material';
import { getInitials } from '../../utils/get-initials';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { db } from 'src/firebase/firebase-auth'
import { deleteDoc, getDocs, collection, doc, onSnapshot, query } from 'firebase/firestore';
import * as Yup from 'yup';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { useFormik } from 'formik';
import DialogTitle from '@mui/material/DialogTitle';
import { subAuth } from '../data-handling/subject-crud';
import { useAuth } from 'src/contexts/AuthContext';


export default function FormDialog(props) {
  const { currentUser } = useAuth()
  const [open, setOpen] = useState(false);
  const { updateSubject } = subAuth()

  const formik = useFormik({
    initialValues: {
      sCode: props.sub_code,
      sDesc: props.sub_desc,
      sLec: props.sub_lec,
      sLab: props.sub_lab,
      sPreReq: props.sub_preReq,
      sCoReq: props.sub_coReq,
      sUser: props.sub_user,
      sKac: props.sub_kac,
      sClassCode: props.sub_classCode
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
        .max(99999999999)
        .required(
          'LEC units is required'),
      sLab: Yup
        .number()
        .max(99999999999)
        .required(
          'LAB units is required'),
      sPreReq: Yup
        .string()
        .max(255)
        .required(
          'Pre-requisite is required'),
      sCoReq: Yup
        .string()
        .max(255)
        .required(
          'Co-requisite is required'),
      sUser: Yup
        .string()
        .max(255)
        .required(
          'User is required'),
      sKac: Yup
        .string()
        .max(255)
        .required(
          'KAC is required'),
      sClassCode: Yup
        .string()
        .max(255)
        .required(
          'Class code is required')
    }),
    onSubmit: () => {
      if (currentUser){
      updateSubject(
        props.sub_id,
        formik.values.sCode,
        formik.values.sDesc,
        formik.values.sLec,
        formik.values.sLab,
        formik.values.sPreReq,
        formik.values.sCoReq,
        formik.values.sUser,
        formik.values.sKac,
        formik.values.sClassCode
      )
      }
      formik.setSubmitting(false)
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
        startIcon={(<EditIcon fontSize="small" />)}
        variant="outlined"
        sx={{ mr: 1 }}
        onClick={handleClickOpen} >
          Update
      </Button>
      <Dialog open={open}
      onClose={handleClose}
      >
        <form onSubmit={formik.handleSubmit}>
        <DialogTitle
        display="flex"
        justifyContent="center" >Update Subject</DialogTitle>

          <DialogContent>
                      
              <TextField
                error={Boolean(formik.touched.sCode && formik.errors.sCode)}
                fullWidth
                helperText={formik.touched.sCode && formik.errors.sCode}
                label='Subject Code'
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
                label='Subject Description'
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
                label='LEC Units'
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
                label='LAB Units'
                margin="normal"
                name="sLab"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.sLab}
                variant="outlined"
              />

              <TextField
                error={Boolean(formik.touched.sPreReq && formik.errors.sPreReq)}
                fullWidth
                helperText={formik.touched.sPreReq && formik.errors.sPreReq}
                label='Subject Pre-Requisite'
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
                label='Subject Co-Requisite'
                margin="normal"
                name="sCoReq"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.sCoReq}
                variant="outlined"
              />

              <TextField
                error={Boolean(formik.touched.sUser && formik.errors.sUser)}
                fullWidth
                helperText={formik.touched.sUser && formik.errors.sUser}
                label='Username'
                margin="normal"
                name="sUser"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.sUser}
                variant="outlined"
              />

              <TextField
                error={Boolean(formik.touched.sKac && formik.errors.sKac)}
                fullWidth
                helperText={formik.touched.sKac && formik.errors.sKac}
                label='KAC'
                margin="normal"
                name="sKac"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.sKac}
                variant="outlined"
              />

              <TextField
                error={Boolean(formik.touched.sClassCode && formik.errors.sClassCode)}
                fullWidth
                helperText={formik.touched.sClassCode && formik.errors.sClassCode}
                label='Class Code'
                margin="normal"
                name="sClassCode"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.sClassCode}
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

export function DeleteFormDialog(props) {
  const [open, setOpen] = useState(false);
  const { updateSubject } = subAuth()
  
  const handleDeleteClickOpen = () => {
    setOpen(true);
  };

  const handleDeleteClose = () => {
    setOpen(false);
  };

  function deleteSub(id){
    const subjectDoc = doc(db, "subjects", id);
    deleteDoc(subjectDoc);
  }

  return (
    <div style={{display : 'inline-block'}} >
      <Button
        color="error"
        startIcon={(<DeleteIcon fontSize="small" />)}
        variant="outlined"
        sx={{ mr: 1 }}
        onClick={handleDeleteClickOpen} >
          Delete
      </Button>
      <Dialog open={open}
      onClose={handleDeleteClose}
      >
        <DialogTitle
        display="flex"
        justifyContent="center" >Confirm Delete</DialogTitle>

          <DialogContent>
           <p>Are you sure you want to delete this?</p>
          </DialogContent>

          <DialogActions>
          <Box>
            <Button
              color="primary"
              onClick={handleDeleteClose}>Cancel
            </Button>
          </Box>
          <Box p={2}>
            <Button
              color="error"
              variant='contained'
              disabled={!open}
              type="submit"
              onClick={() => deleteSub(props.sub_id)}>
              Confirm
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
      </div>
  );
}

export const SubjectListResults = () => {
  const { currentUser } = useAuth()
  const [selectedSubjectIds, setSelectedSubjectIds] = useState([]);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(0);
  const subjectsCollectionRef = collection(db, "subjects");
  const [subjects, setSubjects] = useState([]);
  const [indexValue, setIndexValue] = useState(0)
  const [limitValue, setLimitValue] = useState(limit)

  function allSub(){
    const q = query(collection(db, "subjects"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const subs = [];
    querySnapshot.forEach((doc) => {
        subs.push({ ...doc.data(), id: doc.id });
    });
       setSubjects(subs)
    });
  }

  useEffect(() => {
    allSub()
  }, []);

  const handleSelectAll = (event) => {
    let newSelectedSubjectIds;

    if (event.target.checked) {
      newSelectedSubjectIds = subjects.map((subject) => subject.id);
    } else {
      newSelectedSubjectIds = [];
    }

    setSelectedSubjectIds(newSelectedSubjectIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedSubjectIds.indexOf(id);
    let newSelectedSubjectIds = [];

    if (selectedIndex === -1) {
      newSelectedSubjectIds = newSelectedSubjectIds.concat(selectedSubjectIds, id);
    } else if (selectedIndex === 0) {
      newSelectedSubjectIds = newSelectedSubjectIds.concat(selectedSubjectIds.slice(1));
    } else if (selectedIndex === selectedSubjectIds.length - 1) {
      newSelectedSubjectIds = newSelectedSubjectIds.concat(selectedSubjectIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedSubjectIds = newSelectedSubjectIds.concat(
        selectedSubjectIds.slice(0, selectedIndex),
        selectedSubjectIds.slice(selectedIndex + 1)
      );
    }

    setSelectedSubjectIds(newSelectedSubjectIds);
  };

  const handleLimitChange = (event) => {
    
    setLimitValue(event.target.value)
    setIndexValue(0)
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    if(page > newPage){
      setIndexValue(indexValue- limit)
      setLimitValue(limitValue- limit)
    }else{
      setIndexValue(indexValue+ limit)
      setLimitValue(limitValue+ limit)
    }
    
    setPage(newPage);
    console.log(page)
  };

  return (
    <Card>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedSubjectIds.length === subjects.length}
                    color="primary"
                    indeterminate={
                      selectedSubjectIds.length > 0
                      && selectedSubjectIds.length < subjects.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>
                  Subject Code
                </TableCell>
                <TableCell>
                  Description
                </TableCell>
                <TableCell>
                  LEC Units
                </TableCell>
                <TableCell>
                  LAB Units
                </TableCell>
                <TableCell>
                  Pre-Requisite
                </TableCell>
                <TableCell>
                  Co-Requisite
                </TableCell>
                <TableCell>
                  Username
                </TableCell>
                <TableCell>
                  KAC
                </TableCell>
                <TableCell>
                  Class Code
                </TableCell>
                <TableCell />
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {currentUser && subjects.slice(indexValue, limitValue).map((subject) => (
                <TableRow
                  hover
                  key={subject.id}
                  selected={selectedSubjectIds.indexOf(subject.id) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedSubjectIds.indexOf(subject.id) !== -1}
                      onChange={(event) => handleSelectOne(event, subject.id)}
                      value="true"
                    />
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >
                      {/* <Avatar
                        src={subject.avatarUrl}
                        sx={{ mr: 2 }}
                      >
                        {getInitials(subject.name)}
                      </Avatar> */}
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {subject.sub_code}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {subject.sub_desc}
                  </TableCell>
                  <TableCell>
                    {subject.sub_lec}
                  </TableCell>
                  <TableCell>
                    {subject.sub_lab}
                  </TableCell>
                  <TableCell>
                    {subject.sub_preReq}
                  </TableCell>
                  <TableCell>
                    {subject.sub_coReq}
                  </TableCell>
                  <TableCell>
                    {subject.sub_user}
                  </TableCell>
                  <TableCell>
                    {subject.sub_kac}
                  </TableCell>
                  <TableCell>
                    {subject.sub_classCode}
                  </TableCell>
                  <TableCell>
                    <FormDialog
                      sub_id={subject.id}
                      sub_code={subject.sub_code}
                      sub_desc={subject.sub_desc}
                      sub_lec={subject.sub_lec}
                      sub_lab={subject.sub_lab}
                      sub_preReq={subject.sub_preReq}
                      sub_coReq={subject.sub_coReq}
                      sub_user={subject.sub_user}
                      sub_kac={subject.sub_kac}
                      sub_classCode={subject.sub_classCode}>
                    </FormDialog>
                  </TableCell>
                  <TableCell>
                    <DeleteFormDialog
                      sub_id={subject.id}>
                    </DeleteFormDialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={currentUser && subjects.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};
