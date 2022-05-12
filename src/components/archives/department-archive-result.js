import { useState, useEffect } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import {
  Avatar,
  Box,
  Card,
  Button,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material';
import { getInitials } from '../../utils/get-initials';
import { useAuth } from 'src/contexts/AuthContext';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { collection, onSnapshot, query, deleteDoc, addDoc, doc, where, updateDoc } from 'firebase/firestore';
import { db } from 'src/firebase/firebase-auth';
import { getArchiveVal } from '../userModel';

export function RetrieveFormDialog(props) {
  const [open, setOpen] = useState(false);
  
  
  const handleDeleteClickOpen = () => {
    setOpen(true);
  };

  const handleDeleteClose = () => {
    setOpen(false);
  };

  const retrieveUser = async () => {
    const userRef = doc(db, "departments", props.id);
    await updateDoc(userRef, {
        archive: false
      });
  }

  return (
    <div style={{display : 'inline-block'}} >
      <Button
        color="info"
        variant="outlined"
        sx={{ mr: 1 }}
        onClick={handleDeleteClickOpen} >
          Retrieve
      </Button>
      <Dialog open={open}
      onClose={handleDeleteClose}
      >

        <DialogTitle
        display="flex"
        justifyContent="center" >Confirm Archive</DialogTitle>

          <DialogContent>
           <p>Are you sure you want to archive this?</p>
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
              color="info"
              variant='contained'
              disabled={!open}
              type="submit"
              onClick={() => retrieveUser()}
            >
              Confirm
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
      </div>
  );
}

export const ArchivesListResults = ({ customers, ...rest }) => {
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const { currentUser } = useAuth();
  const [archivedSubs, setArchivedSubs] = useState([]);
  const [indexValue, setIndexValue] = useState(0)
  const [limitValue, setLimitValue] = useState(limit)
  const [archiveValue, setArchiveValue] = useState(getArchiveVal())

  function allArchSub(){
    const q = query(collection(db, "departments"), where('archive', "==", true));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const arch_subs = [];
    querySnapshot.forEach((doc) => {
        arch_subs.push({ ...doc.data(), id: doc.id });
    });
       setArchivedSubs(arch_subs)
    });
  }

  useEffect(() => {
    allArchSub()
    setArchiveValue(getArchiveVal())
  }, [archiveValue]);

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
    console.log(page)
  };

  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                {/* <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedCustomerIds.length === customers.length}
                    color="primary"
                    indeterminate={
                      selectedCustomerIds.length > 0
                      && selectedCustomerIds.length < customers.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell> */}
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
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentUser && archivedSubs.slice(indexValue, limitValue).map((archSub) => (
                <TableRow
                  hover
                  key={archSub.id}
                   //selected={selectedArchSubIds.indexOf(archSub.id) !== -1}
                >
                  {/* <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedSubjectIds.indexOf(subject.id) !== -1}
                      onChange={(event) => handleSelectOne(event, subject.id)}
                      value="true"
                    />
                  </TableCell> */}
                  {/* <TableCell>
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
                        {archSub.sub_code}
                      </Typography>
                    </Box>
                  </TableCell> */}
                  <TableCell>
                    {archSub.dept_code}
                  </TableCell>
                  <TableCell>
                    {archSub.dept_desc}
                  </TableCell>
                  <TableCell>
                    {archSub.colld_code}
                  </TableCell>
                  <TableCell>
                    <RetrieveFormDialog
                        id={archSub.id}
                      >
                    </RetrieveFormDialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={currentUser && archivedSubs.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};
