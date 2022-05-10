import { useState, useEffect } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import {
  Avatar,
  Box,
  TextField,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  Button,
} from '@mui/material';
import { collection, Firestore, getDocs, onSnapshot, query, doc} from '@firebase/firestore';
import { getInitials } from '../../utils/get-initials';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { useFormik } from 'formik';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { deptAuth } from '../data-handling/department-crud';
import {db} from 'src/firebase/firebase-auth' 
import * as React from 'react';

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
        justifyContent="center">Update Data</DialogTitle>
        <DialogContent>

              <TextField
                required
                autoFocus
                margin="dense"
                id="depCode"
                label="Department Code"
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
                id="colCode"
                label="College Code"
                type="text"
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


export const DepartmentListResults = ({ customers, ...rest }) => {
  const [selectedDeptIds, setSelectedDeptIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [depts, setDepts] = useState([]);
  const [colleges, setColleges] = useState([]);
  const deptCollectionRef = collection(db, "departments");
  const [indexValue, setIndexValue] = useState(0)
  const [limitValue, setLimitValue] = useState(limit)

  function allDept()
  {
    const q = query(collection(db, "departments"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const deps = [];
      querySnapshot.forEach((doc) => {
        deps.push({ ...doc.data(), id: doc.id });
      });
      setDepts(deps)
      });
  }

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
    allDept()
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
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
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
                    checked={selectedDeptIds.length === customers.length}
                    color="primary"
                    indeterminate={
                      selectedDeptIds.length > 0
                      && selectedDeptIds.length < customers.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>
                  Department Code
                </TableCell>
                <TableCell>
                  Department Description
                </TableCell>
                <TableCell>
                  College Code
                </TableCell>
                <TableCell>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {depts.slice(0, limit).map((dept) => (
                <TableRow
                  hover
                  key={dept.id}
                  selected={selectedDeptIds.indexOf(dept.id) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedDeptIds.indexOf(dept.id) !== -1}
                      onChange={(event) => handleSelectOne(event, dept.id)}
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
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {dept.dept_code}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {dept.dept_desc}
                  </TableCell>
                  <TableCell>
                    {dept.colld_code}
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

DepartmentListResults.propTypes = {
  customers: PropTypes.array.isRequired
};
