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
// import { FormDialog } from 'src/components/college/college-list-toolbar';
import { deleteDoc, getDocs, collection, doc, onSnapshot, query } from '@firebase/firestore';
import imageFunc from 'src/components/college/college-list-toolbar';

export default function FormDialog() {
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

             <TextField
                required
                autoFocus
                margin="dense"
                id="colCode"
                label="College Code"
                type="text"
                fullWidth
                variant="outlined"
              />

              <TextField
                required
                autoFocus
                margin="dense"
                id="description"
                label="Description"
                type="text"
                fullWidth
                variant="outlined"
              />

              <TextField
                required
                autoFocus
                margin="dense"
                id="logo"
                label="Logo"
                type="blob"
                fullWidth
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
                onClick={handleClose}>Done
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
    const q = query(collection(db, "colleges"));
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
    let newSelectedCustomerIds;

    if (event.target.checked) {
      newSelectedCustomerIds = customers.map((customer) => customer.id);
    } else {
      newSelectedCustomerIds = [];
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedCustomerIds.indexOf(id);
    let newSelectedCustomerIds = [];

    if (selectedIndex === -1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds, id);
    } else if (selectedIndex === 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(1));
    } else if (selectedIndex === selectedCustomerIds.length - 1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(0, selectedIndex),
        selectedCustomerIds.slice(selectedIndex + 1)
      );
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
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
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedCollegeIds.length === customers.length}
                    color="primary"
                    indeterminate={
                      selectedCollegeIds.length > 0
                      && selectedCollegeIds.length < customers.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>
                  College Code
                </TableCell>
                <TableCell>
                  Description
                </TableCell>
                <TableCell>
                  Logo
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
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedCollegeIds.indexOf(college.id) !== -1}
                      onChange={(event) => handleSelectOne(event, college.id)}
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
                    {/* {college.coll_logo} */}
                    {/* <img src="https://placekitten.com/200/300" width="90" height="90"/> */}
                    {/* <img src={url}/> */}
                    {/* {imageList.map((url) => {
                      return <img src="url"/>;
                    })} */}

                    {imagesList.map((url) => {return <img src={url} width="90" height="90"/>;})}
                  </TableCell>
                  <TableCell>
                   <FormDialog>
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
