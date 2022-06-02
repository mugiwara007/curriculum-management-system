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
import { collection, onSnapshot, query, deleteDoc, addDoc, doc } from 'firebase/firestore';
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

  const retrieveSub = async () => {
    const subjectDoc = collection(db, "subjects");
    const archiveCollectionRef = doc(db, "archived_subjects", props.sub_id);
      addDoc(subjectDoc, {
        sub_code: props.sub_code,
        sub_desc: props.sub_desc,
        sub_lec: props.sub_lec,
        sub_lab: props.sub_lab,
        sub_preReq: props.sub_preReq,
        sub_coReq: props.sub_coReq,
        sub_user: props.sub_user,
        sub_kac: props.sub_kac,
        sub_classCode: props.sub_classCode
      });
      await deleteDoc(archiveCollectionRef);
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
              onClick={() => retrieveSub()}>
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
    const q = query(collection(db, "archived_subjects"));
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
          <Table style={{overflow: 'auto', display: 'block'}}>
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
                        {archSub.sub_code}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {archSub.sub_desc}
                  </TableCell>
                  <TableCell>
                    {archSub.sub_lec}
                  </TableCell>
                  <TableCell>
                    {archSub.sub_lab}
                  </TableCell>
                  <TableCell>
                    {archSub.sub_preReq}
                  </TableCell>
                  <TableCell>
                    {archSub.sub_coReq}
                  </TableCell>
                  <TableCell>
                    {archSub.sub_user}
                  </TableCell>
                  <TableCell>
                    {archSub.sub_kac}
                  </TableCell>
                  <TableCell>
                    {archSub.sub_classCode}
                  </TableCell>
                  <TableCell>
                    <RetrieveFormDialog
                      sub_id={archSub.id}
                      sub_code={archSub.sub_code}
                      sub_desc={archSub.sub_desc}
                      sub_lec={archSub.sub_lec}
                      sub_lab={archSub.sub_lab}
                      sub_preReq={archSub.sub_preReq}
                      sub_coReq={archSub.sub_coReq}
                      sub_user={archSub.sub_user}
                      sub_kac={archSub.sub_kac}
                      sub_classCode={archSub.sub_classCode}>
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
