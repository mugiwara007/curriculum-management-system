import { useState, useEffect } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { 
  ref, 
  uploadBytes, 
  getStorage, 
  listAll, 
  getDownloadURL 
} from 'firebase/storage'
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TextField,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  Button,
} from '@mui/material';
import { getInitials } from '../../utils/get-initials';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { collAuth } from '../data-handling/college-crud';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useAuth } from 'src/contexts/AuthContext'
import { useFormik } from 'formik';
import * as React from 'react';
import { db } from 'src/firebase/firebase-auth'
import { storage } from 'src/firebase/firebase-auth';
import * as Yup from 'yup';
// import { FormDialog } from 'src/components/college/college-list-toolbar';
import { deleteDoc, getDocs, collection, doc, onSnapshot, query, updateDoc, where } from '@firebase/firestore';
import imageFunc from 'src/components/college/college-list-toolbar';

import { getArchivelist, setArchivelist, setArchiveDisable } from '../userModel';

export default function FormDialog(props) {
  const [open, setOpen] = React.useState(false);
  var id = props.id

  const formik = useFormik({
    initialValues: {
      college_code: props.college_code,
      college_description: props.college_description,
      college_logo: props.college_logo,
    },
    validationSchema: Yup.object({
      college_code: Yup
      .string()
      .max(100)
      .required
      (
        'Department Code is required'
      ),
      college_description: Yup
      .string()
      .max(100)
      .required
      (
        'Description is required'
      ),
      college_logo: Yup
      .string()
      .max(32)
      .required
      (
        'College Code is required'
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
  };

  const updateCollege = async() =>{
    const updateCollege = {
      coll_code: formik.values.college_code,
      coll_desc: formik.values.college_description,
      coll_logo: formik.values.college_logo,
    }
    const washingtonRef = doc(db, "colleges", id);
    await updateDoc(washingtonRef,updateCollege)
    handleClose()
  }
  return (
    <div style={{display : 'inline-block'}} >
        <Button
         startIcon={(<EditIcon fontSize="small" />)}
         variant="outlined"
         sx={{ mr: 1 }}
         onClick={handleClickOpen}>
         Update
        </Button>
      <Dialog open={open}
      onClose={handleClose}>
        <DialogTitle
        display="flex"
        justifyContent="center"
        >Update Data</DialogTitle>
        <DialogContent>

             <Avatar alt={formik.values.college_code} src={formik.values.college_logo} sx={{marginLeft:'auto', marginRight:'auto', width:200, height:200}}/>
             <TextField
                margin="dense"
                label="College Code"
                type="text"
                fullWidth
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.college_code}
                name="college_code"
              />

              <TextField
                margin="dense"
                label="Description"
                type="text"
                fullWidth
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.college_description}
                name="college_description"
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
                onClick={updateCollege}>Done
              </Button>
          </Box>
        </DialogActions>
      </Dialog>
      </div>
  );
}

export const CollegeListResults = ({ customers, ...rest }) => {
  const [selectedCollegeIds, setSelectedCollegeIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [colleges, setColleges] = useState([]);
  const [indexValue, setIndexValue] = useState(0)
  const [limitValue, setLimitValue] = useState(limit)

  const [checkAll, setCheckAll] = useState(false)

  const [imagesList, setimageList] = React.useState([]);
  const imageListRef = ref(storage, "CollegeLogos/")

  React.useEffect(() => 
  {
    listAll(imageListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setimageList((prev) => [...prev, url]);
        });
      });
      console.log(response)
    });
  }, []);

  function allColl()
  {
    const q = query(collection(db, "colleges"), where("archive", "==", false));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const subs = [];
      querySnapshot.forEach((doc) => {
          subs.push({ ...doc.data(), id: doc.id });
      });
         setColleges(subs)
      });
  }

  useEffect(() => {
    allColl()
  }, []);

  const handleSelectAll = (event) => {
    setCheckAll(!checkAll)
    var newSelected = []
    if(event.target.checked){
      colleges.map((data)=>{
        newSelected.push(data.id)
      })
      setSelectedCollegeIds(newSelected)
      setArchivelist(newSelected)
    }
    else{
      setSelectedCollegeIds([])
      setArchivelist('')
    }
  };

  const handleSelectOne = (event, id) => {
    if(event.target.checked){
      const selectedIndex = selectedCollegeIds.indexOf(id);
      let newSelectedCustomerIds = [];
  
      if (selectedIndex === -1) {
        newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCollegeIds, id);
      } else if (selectedIndex === 0) {
        newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCollegeIds.slice(1));
      } else if (selectedIndex === selectedCollegeIds.length - 1) {
        newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCollegeIds.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelectedCustomerIds = newSelectedCustomerIds.concat(
          selectedCollegeIds.slice(0, selectedIndex),
          selectedCollegeIds.slice(selectedIndex + 1)
        );
      }
  
      setSelectedCollegeIds(newSelectedCustomerIds);
      setArchivelist(newSelectedCustomerIds)
    }
    else{
      setSelectedCollegeIds([]);
      setArchivelist('')
    }
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
  };

  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Logo
                </TableCell>
                <TableCell>
                  College Code
                </TableCell>
                <TableCell>
                  Description
                </TableCell>
                <TableCell>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {colleges.slice(indexValue, limitValue).map((college) => (
                <TableRow
                  hover
                  key={college.id}
                  selected={selectedCollegeIds.indexOf(college.id) !== -1}
                >
                  <TableCell>
                    <Avatar alt={college.coll_code} src={college.coll_logo}  sx={{width:100, height:100}}/>
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >
                      {/* <Avatar
                        src={customer.avatarUrl}
                        sx={{ mr: 2 }}
                      >
                        {getInitials(customer.name)}
                      </Avatar> */}
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {college.coll_code}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {college.coll_desc}
                  </TableCell>
                  <TableCell>
                   <FormDialog
                   id={college.id}
                   college_code={college.coll_code}
                   college_description={college.coll_desc}
                   college_logo={college.coll_logo}
                   >
                   </FormDialog>
                </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={customers.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};
