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
  TableCell,
  TableHead,
  TextField,
  TablePagination,
  TableRow,
  Typography,
  Button,
} from '@mui/material';
import { getInitials } from '../../utils/get-initials';
import EditIcon from '@mui/icons-material/Edit';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import * as React from 'react';
import { collection, Firestore, getDocs, onSnapshot, query, doc, where} from '@firebase/firestore';
import {db} from 'src/firebase/firebase-auth' 
import { useFormik } from 'formik';
import { userAuth } from '../data-handling/user-crud';
import * as Yup from 'yup';
import { setArchivelist } from '../userModel';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function FormDialog(props) {
  const [open, setOpen] = useState(false);
  const { updateUser } = userAuth()

  const [userLevel, setUserLevel] = React.useState(props.userlevel)

  const formik = useFormik({
    initialValues: {
      Email: props.email,
      Name: props.name,
      Password: props.password,
      Usercode: props.usercode,
      Username: props.username,
      Userlevel: props.userlevel
    },
    validationSchema: Yup.object({
      Email: Yup
      .string()
      .max(100)
      .required
      (
        'Email is required'
      ),
      Name: Yup
      .string()
      .max(100)
      .required
      (
        'Name is required'
      ),
      Password: Yup
      .string()
      .max(64)
      .required
      (
        'Password is required'
      ),
      Usercode: Yup
      .string()
      .max(11)
      .required
      (
        'Usercode is required'
      ),
      Username: Yup
      .string()
      .max(32)
      .required
      (
        'Username is required'
      )
    }),
    onSubmit: () => {
      updateUser(
        props.user_id,
        formik.values.Email,
        formik.values.Name,
        formik.values.Password,
        formik.values.Usercode,
        formik.values.Username,
        parseInt(userLevel)
      )
      formik.setSubmitting(false)
    }
  });

  const handleClickOpen = () => {
    setOpen(true);
    // const docSnap = await getDoc(usersCollectionRef);
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
      onClose={handleClose}
      >
        <form onSubmit={formik.handleSubmit}>
        <DialogTitle
        display="flex"
        justifyContent="center" >Update Data</DialogTitle>

        <DialogContent>
              <TextField
              error={Boolean(formik.touched.Email && formik.errors.Email)}
              fullWidth
              helperText={formik.touched.Email && formik.errors.Email}
              label='Email Address'
              margin="normal"
              name="Email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.Email}
              variant="outlined"
              />

              <TextField
              error={Boolean(formik.touched.Name && formik.errors.Name)}
              fullWidth
              helperText={formik.touched.Name && formik.errors.Name}
              label='Name'
              margin="normal"
              name="Name"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.Name}
              variant="outlined"
              />

              <TextField
              error={Boolean(formik.touched.Password && formik.errors.Password)}
              fullWidth
              helperText={formik.touched.Password && formik.errors.Password}
              label='Password'
              margin="normal"
              name="Password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.Password}
              variant="outlined"
              />

              <TextField
              error={Boolean(formik.touched.Usercode && formik.errors.Usercode)}
              fullWidth
              helperText={formik.touched.Usercode && formik.errors.Usercode}
              label='Usercode'
              margin="normal"
              name="Usercode"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.Usercode}
              variant="outlined"
              />

              <TextField
              error={Boolean(formik.touched.Username && formik.errors.Username)}
              fullWidth
              helperText={formik.touched.Username && formik.errors.Username}
              label='Username'
              margin="normal"
              name="Username"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.Username}
              variant="outlined"
              />
              <FormControl sx={{marginLeft:1, marginTop:2}}>
                <FormLabel id="demo-radio-buttons-group-label">User Level</FormLabel>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue={formik.values.Userlevel.toString()}
                  name="radio-buttons-group"
                  onChange={(event)=>{
                    setUserLevel(event.target.value)
                    formik.values.Userlevel = parseInt(event.target.value)
                  }}
                  >
                    <FormControlLabel value="2" control={<Radio />} label="Department Chair" />
                    <FormControlLabel value="3" control={<Radio />} label="Dean" />
                </RadioGroup>
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
            type="submit"
            onClick={handleClose}>Done
            </Button>
          </Box>
        </DialogActions>
        </form>
      </Dialog>
      </div>
  );
}

export const CustomerListResults = () => {
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users");
  const [indexValue, setIndexValue] = useState(0)
  const [limitValue, setLimitValue] = useState(limit)

  function allUsers()
  {
    const q = query(collection(db, "users"), where("userlevel", ">", 1));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const userr = [];
      querySnapshot.forEach((doc) => {
        if(!doc.data().archive)
        {
          userr.push({ ...doc.data(), id: doc.id });
        }
      });
         setUsers(userr)
      });
  }

  useEffect(() => 
  {
    allUsers()
  }, []);

  const handleSelectAll = (event) => {
    let newSelectedCustomerIds;

    if (event.target.checked) {
      newSelectedCustomerIds = users.map((user) => user.id);
    } else {
      newSelectedCustomerIds = [];
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
    setArchivelist(newSelectedCustomerIds)
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedCustomerIds.indexOf(id);
    let newSelectedCustomerIds = [];

    if (selectedIndex === -1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds, id);
      console.log("select one")
    } else if (selectedIndex === 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(1));
      console.log("unselect one")
    } else if (selectedIndex === selectedCustomerIds.length - 1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(0, selectedIndex),
        selectedCustomerIds.slice(selectedIndex + 1)
      );
    }
    setSelectedCustomerIds(newSelectedCustomerIds);
    setArchivelist(newSelectedCustomerIds)
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
    <Card>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedCustomerIds.length === users.length}
                    color="primary"
                    indeterminate={
                      selectedCustomerIds.length > 0
                      && selectedCustomerIds.length < users.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>
                  Username
                </TableCell>
                <TableCell>
                  Email
                </TableCell>
                <TableCell>
                  Name
                </TableCell>
                <TableCell>
                  User Code
                </TableCell>
                <TableCell>
                  User Level
                </TableCell>
                <TableCell>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.slice(indexValue, limitValue).map((user) => (
                <TableRow
                  hover
                  key={user.id}
                  selected={selectedCustomerIds.indexOf(user.id) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedCustomerIds.indexOf(user.id) !== -1}
                      onChange={(event) => handleSelectOne(event, user.id)}
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
                        {user.username}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {user.email}
                  </TableCell>
                  <TableCell>
                    {user.name}
                  </TableCell>
                  <TableCell>
                    {user.usercode}
                  </TableCell>
                  <TableCell>
                    {user.userlevel}
                  </TableCell>
                  <TableCell>
                     <FormDialog
                       user_id={user.id}
                       email={user.email}
                       name={user.name}
                       password={user.password}
                       usercode={user.usercode}
                       username={user.username}
                       userlevel={user.userlevel}>
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
        count={users.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};
