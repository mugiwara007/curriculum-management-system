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
import { collection, Firestore, getDocs, onSnapshot, query, doc, updateDoc, where } from '@firebase/firestore';
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
import * as Yup from 'yup';
import { getArchivelist, setArchivelist, setArchiveDisable } from '../userModel';

export default function FormDialog(props) {
  const [open, setOpen] = React.useState(false);
  var id = props.id

  const formik = useFormik({
    initialValues: {
      Department_Code: props.Department_Code,
      Description: props.Description,
      College_Code: props.College_Code,
    },
    validationSchema: Yup.object({
      Department_Code: Yup
      .string()
      .max(100)
      .required
      (
        'Department Code is required'
      ),
      Description: Yup
      .string()
      .max(100)
      .required
      (
        'Description is required'
      ),
      College_Code: Yup
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


  const updateDepartment = async () =>{
    const updateDepartment = {
      dept_code: formik.values.Department_Code,
      dept_desc: formik.values.Description,
      colld_code: formik.values.College_Code,
    }
    const washingtonRef = doc(db, "departments", id);
    await updateDoc(washingtonRef,updateDepartment)
    handleClose()
  }

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
                error={Boolean(formik.touched.Department_Code && formik.errors.Department_Code)}
                fullWidth
                helperText={formik.touched.Department_Code && formik.errors.Department_Code}
                label="Department Code"
                margin="dense"
                name={"Department_Code"}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.Department_Code}
                // id="depCode"
                // type="text"
                variant="outlined"
              />

              <TextField
                required
                margin="dense"
                id="description"
                label="Description"
                type="text"
                fullWidth
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.Description}
                name={"Description"}
              />

              <TextField
                required
                margin="dense"
                id="colCode"
                label="College Code"
                type="text"
                fullWidth
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.College_Code}
                name={"College_Code"}
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
              type="submit"
              onClick={updateDepartment}>Done
              </Button>
            </Box>
        </DialogActions>
      </Dialog>
      </div>
  );
}


export const DepartmentListResults = () => {
  const [selectedDeptIds, setSelectedDeptIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [depts, setDepts] = useState([]);
  const [colleges, setColleges] = useState([]);
  const deptCollectionRef = collection(db, "departments");
  const [indexValue, setIndexValue] = useState(0)
  const [limitValue, setLimitValue] = useState(limit)
  const [customers, setCustomers] = useState([])
  const [checkAll, setCheckAll] = useState(false)

  function allDept()
  {
    const q = query(collection(db, "departments"), where("archive", "==", false));
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
    setCheckAll(!checkAll)
    var newSelected = []
    if(event.target.checked){
      depts.map((data)=>{
        newSelected.push(data.id)
      })
      setSelectedDeptIds(newSelected)
      setArchivelist(newSelected)
    }
    else{
      setSelectedDeptIds([])
      setArchivelist('')
    }
  };

  const handleSelectOne = (event, id) => {
    if(event.target.checked){
    const selectedIndex = selectedDeptIds.indexOf(id);
    let newSelectedCustomerIds = [];

    if (selectedIndex === -1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedDeptIds, id);
    } else if (selectedIndex === 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedDeptIds.slice(1));
    } else if (selectedIndex === selectedCustomerIds.length - 1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedDeptIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedDeptIds.slice(0, selectedIndex),
        selectedDeptIds.slice(selectedIndex + 1)
      );
    }

    setSelectedDeptIds(newSelectedCustomerIds);
    setArchivelist(newSelectedCustomerIds)
  }
  else{
    setSelectedDeptIds([]);
    setArchivelist('')
  }
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Card>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table style={{overflow: 'auto', display: 'block'}}>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={checkAll}
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
                    <FormDialog
                    id = {dept.id}
                    Department_Code = {dept.dept_code}
                    Description = {dept.dept_desc}
                    College_Code = {dept.colld_code}
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

DepartmentListResults.propTypes = {
  customers: PropTypes.array.isRequired
};
