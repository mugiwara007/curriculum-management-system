import { useState, useRef } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
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
import Stack from '@mui/material/Stack';
import { getInitials } from '../../utils/get-initials';
import ReportIcon from '@mui/icons-material/Report';
import ReactPDF from '@react-pdf/renderer';
import NativeSelect from '@mui/material/NativeSelect';
import EditIcon from '@mui/icons-material/Edit';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import PrintIcon from '@mui/icons-material/Print';
import Dialog from '@mui/material/Dialog';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { useFormik } from 'formik';
import { useReactToPrint } from "react-to-print";
import DialogTitle from '@mui/material/DialogTitle';
import * as React from 'react';
import { subAuth } from '../data-handling/subject-crud';
import { useAuth } from 'src/contexts/AuthContext';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import ArchiveIcon from '@mui/icons-material/Archive';

export default function UpdateModal(props) 
{
  const [open, setOpen] = useState(false);
  const [DeptCode, setDeptCode] = React.useState();

  const handleClickOpen = () => 
  {
    setOpen(true);
  };

  const handleClose = () => 
  {
    setOpen(false);
  };

  const handleChange = (SelectChangeEvent) => 
  {
    setDeptCode(event.target.value);
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
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle display="flex" justifyContent="center" >Update Subject</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              label="Curriculum Code" 
              variant="outlined" 
              margin="normal"
              type="text"
              />

            <TextField
            fullWidth
            label="CMO" 
            variant="outlined" 
            margin="normal"
            type="text"
            />

            <TextField
            fullWidth
            label="Version" 
            variant="outlined" 
            margin="normal"
            type="text"
            />
            
            <FormControl sx={{ m: "auto", mt: 1, width: 1}}>
              <InputLabel id="demo-simple-select-autowidth-label">Department Code</InputLabel>
              <Select
                value={DeptCode}
                onChange={handleChange}
                fullWidth
                label="Department Code"
              >
                <MenuItem value=""><em>None</em></MenuItem>
                <MenuItem value={10}>BSIT</MenuItem>
                <MenuItem value={21}>BSIS</MenuItem>
              </Select>
            </FormControl>

            <TextField
            fullWidth
            label="Username" 
            variant="outlined" 
            margin="normal"
            type="text"
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
              onClick={handleClose}>
                Done
              </Button>
            </Box>
          </DialogActions>
      </Dialog>
    </div>
  );
}

export function ArchiveModal(props) 
{
  const [open, setOpen] = useState(false);

  const handleDeleteClickOpen = () => 
  {
    setOpen(true);
  };

  const handleDeleteClose = () => 
  {
    setOpen(false);
  };

  return (
    <div style={{display : 'inline-block'}} >
      <Button
        color="info"
        startIcon={(<ArchiveIcon fontSize="small" />)}
        variant="outlined"
        sx={{ mr: 1 }}
        onClick={handleDeleteClickOpen} >
          Archive
      </Button>
      <Dialog open={open}
      onClose={handleDeleteClose}
      >
        <DialogTitle display="flex" justifyContent="center" >Confirm Archive</DialogTitle>
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
                color="primary"
                variant='contained'
                type="submit"
                onClick={handleDeleteClose}>
                  Confirm
              </Button>
          </Box>
          </DialogActions>
      </Dialog>
    </div>
  );
}

export function DownloadPDF(props)
{
  const componentRef = useRef();

  const downloadPDFButton = useReactToPrint
  ({
    content: () => componentRef.current,
  });

  return (
    <div style={{display : 'inline-block'}} >
      <Button
        color="info"
        startIcon={(<PrintIcon fontSize="small" />)}
        variant="outlined"
        sx={{ mr: 1 }}
        onClick={downloadPDFButton} >
          Generate Report
      </Button>

      <Box sx={{display:'none'}}>
        <Box ref={componentRef}>
        <Card {...props}>
        <Box>
        <TableHead>
                <TableCell  sx={{width:'20%', backgroundColor:'#ffffff'}}>
                </TableCell>
              </TableHead>
              <Stack 
                direction="row" 
                display="flex"
                justifyContent="center"
                alignItems="center">
                <Avatar sx={{ width: 90, height: 90, marginRight: 18}} src="https://firebasestorage.googleapis.com/v0/b/curmasys.appspot.com/o/PDFLogos%2FBSU.png?alt=media&token=f9e6706c-344b-473b-b426-cf826e2d6d1d" />

                <Typography sx={{textAlign: 'center', alignSelf: 'center', marginTop: -2, fontWeight: 'bold', marginBottom: -5}} variant="subtitle1" gutterBottom component="div" fullWidth>
                  Republic of the Philippines
                  <Typography sx={{textAlign: 'center', alignSelf: 'center', marginTop: -1, fontWeight: 'bold'}} variant="subtitle1" gutterBottom component="div" fullWidth>
                    Bulacan State University   
                    <Typography sx={{textAlign: 'center', alignSelf: 'center', marginTop: -1}}  variant="overline" display="block" gutterBottom>
                      City of Malolos, Bulacan
                      <Typography sx={{textAlign: 'center', alignSelf: 'center', marginTop: -2}}  variant="overline" display="block" gutterBottom>
                        Tel/Fax (044) 791-0153
                      </Typography>
                    </Typography>
                  </Typography>
                </Typography>

                <Avatar sx={{ width: 90, height: 90, marginLeft: 18}} src="https://firebasestorage.googleapis.com/v0/b/curmasys.appspot.com/o/PDFLogos%2FCICT.png?alt=media&token=d0a28c1c-d802-4975-8a98-8f3aeedfefa9" />
              </Stack>
                <Typography sx={{textAlign: 'center', alignSelf: 'center', marginBottom: -0.5, fontWeight: 'bold'}} variant="subtitle1" gutterBottom component="div" fullWidth>
                College of Information and Communications Technology
                </Typography>
      <Divider variant="middle" sx={{marginBottom: 2.5}}/>
                <Typography sx={{textAlign: 'center', alignSelf: 'center', marginBottom: -1, fontWeight: 'bold'}} variant="subtitle1" gutterBottom component="div" fullWidth>
                BACHELOR OF SCIENCE IN INFORMATION SYSTEMS
                </Typography>
                <Typography sx={{textAlign: 'center', alignSelf: 'center', marginBottom: 3.5}}variant="overline" display="block" gutterBottom>
                  (Based on CMO No. 25 s 2015)
                </Typography>
                <Typography sx={{textAlign: 'center', alignSelf: 'center', marginBottom: -1}} variant="subtitle2" gutterBottom component="div" fullWidth>
                FIRST YEAR
                </Typography>
              <TableCell>
              <p><b>First Semester</b></p>
              </TableCell>
      <Divider />
    
    {/*First Semester Header*/}
            <Table>
              <TableBody>
                  <TableCell sx={{fontWeight: 'bold', backgroundColor:'#F8ECD1' }}>
                    COURSE CODE
                  </TableCell>
                  <TableCell sx={{fontWeight: 'bold', backgroundColor:'#F8ECD1'}}>
                    DESCRIPTIVE TITLE
                  </TableCell>
                  <TableCell sx={{fontWeight: 'bold', textAlign:'center', backgroundColor:'#F8ECD1'}}>
                    LEC UNITS
                  </TableCell>
                  <TableCell sx={{fontWeight: 'bold', textAlign:'center', backgroundColor:'#F8ECD1'}}>
                    LAB UNITS
                  </TableCell>
                  <TableCell sx={{fontWeight: 'bold', textAlign:'center', backgroundColor:'#F8ECD1'}}>
                    TOTAL UNITS
                  </TableCell>
                  <TableCell sx={{fontWeight: 'bold', textAlign:'center', backgroundColor:'#F8ECD1'}}>
                    HOURS PER WEEK
                  </TableCell>
                  <TableCell sx={{fontWeight: 'bold', backgroundColor:'#F8ECD1'}}>
                    PRE-REQ
                  </TableCell>
                  <TableCell sx={{fontWeight: 'bold', backgroundColor:'#F8ECD1'}}>
                    CO-REQ
                  </TableCell>
                  </TableBody>

                         {/*First Semester TextFields*/}  
                  <TableRow
                    hover
                  >
                  <TableCell sx={{pl: 3}}>
                    IT402
                  </TableCell>
                  <TableCell sx={{pl: 3}}>
                    WMAD
                  </TableCell>
                  <TableCell sx={{textAlign:'center'}}>
                    2.0
                  </TableCell>
                  <TableCell sx={{textAlign:'center'}}>
                    3.0
                  </TableCell>
                  <TableCell sx={{textAlign:'center'}}>
                    3.0
                  </TableCell>
                  <TableCell sx={{textAlign:'center'}}>
                    3.0
                  </TableCell>
                  <TableCell sx={{pl: 1}}>
                    OOP 2
                  </TableCell>
                  <TableCell sx={{pl: 3}}>
                    N/A
                  </TableCell>
                </TableRow>
              <TableCell sx={{backgroundColor:'#D0C9C0'}}>
              </TableCell>
              <TableCell sx={{textAlign:'center', backgroundColor:'#D0C9C0'}}>
              <b>TOTAL:</b>
              </TableCell>
              <TableCell sx={{textAlign:'center', backgroundColor:'#D0C9C0'}}>
              <b>3.0</b>
              </TableCell>
              <TableCell sx={{textAlign:'center', backgroundColor:'#D0C9C0'}}>
              <b>3.0</b>
              </TableCell>
              <TableCell sx={{textAlign:'center', backgroundColor:'#D0C9C0'}}>
              <b>1.0</b>
              </TableCell>
              <TableCell sx={{textAlign:'center', backgroundColor:'#D0C9C0'}}>
              <b>3.0</b>
              </TableCell>
              <TableCell sx={{backgroundColor:'#D0C9C0'}}>
              </TableCell>
              <TableCell sx={{backgroundColor:'#D0C9C0'}}>
              </TableCell>
            </Table>
            <Table>
              <TableRow>
              </TableRow>
            </Table>

 {/*Second Semester Headings*/}

           <Divider />
            <TableCell>
              <p><b>Second Semester</b></p>
              </TableCell>
              <Divider />
              <Table>
                <TableBody>
                  <TableCell sx={{fontWeight: 'bold', backgroundColor:'#F8ECD1' }}>
                    COURSE CODE
                  </TableCell>
                  <TableCell sx={{fontWeight: 'bold', backgroundColor:'#F8ECD1'}}>
                    DESCRIPTIVE TITLE
                  </TableCell>
                  <TableCell sx={{fontWeight: 'bold', textAlign:'center', backgroundColor:'#F8ECD1'}}>
                    LEC UNITS
                  </TableCell>
                  <TableCell sx={{fontWeight: 'bold', textAlign:'center', backgroundColor:'#F8ECD1'}}>
                    LAB UNITS
                  </TableCell>
                  <TableCell sx={{fontWeight: 'bold', textAlign:'center', backgroundColor:'#F8ECD1'}}>
                    TOTAL UNITS
                  </TableCell>
                  <TableCell sx={{fontWeight: 'bold', textAlign:'center', backgroundColor:'#F8ECD1'}}>
                    HOURS PER WEEK
                  </TableCell>
                  <TableCell sx={{fontWeight: 'bold', backgroundColor:'#F8ECD1'}}>
                    PRE-REQ
                  </TableCell>
                  <TableCell sx={{fontWeight: 'bold', backgroundColor:'#F8ECD1'}}>
                    CO-REQ
                  </TableCell>
                  </TableBody>

  {/*First Semester TextFields*/} 
                <TableRow
                  hover
                >
                  <TableCell sx={{pl: 3}}>
                    IT101
                  </TableCell>
                  <TableCell sx={{pl: 3}}>
                    Ethics
                  </TableCell>
                  <TableCell sx={{textAlign:'center'}}>
                    2.0
                  </TableCell>
                  <TableCell sx={{textAlign:'center'}}>
                    3.0
                  </TableCell>
                  <TableCell sx={{textAlign:'center'}}>
                    1.0
                  </TableCell>
                  <TableCell sx={{textAlign:'center'}}>
                    3.0
                  </TableCell>
                  <TableCell sx={{pl: 1}}>
                    ROTC
                  </TableCell>
                  <TableCell sx={{pl: 3}}>
                    N/A
                  </TableCell>
                </TableRow>

              <TableCell sx={{backgroundColor:'#D0C9C0'}}>
              </TableCell>
              <TableCell sx={{textAlign:'center', backgroundColor:'#D0C9C0'}}>
              <b>TOTAL:</b>
              </TableCell>
              <TableCell sx={{textAlign:'center', backgroundColor:'#D0C9C0'}}>
              <b>2.0</b>
              </TableCell>
              <TableCell sx={{textAlign:'center', backgroundColor:'#D0C9C0'}}>
              <b>2.0</b>
              </TableCell>
              <TableCell sx={{textAlign:'center', backgroundColor:'#D0C9C0'}}>
              <b>2.0</b>
              </TableCell>
              <TableCell sx={{textAlign:'center', backgroundColor:'#D0C9C0'}}>
              <b>2.0</b>
              </TableCell>
              <TableCell sx={{backgroundColor:'#D0C9C0'}}>
              </TableCell>
              <TableCell sx={{backgroundColor:'#D0C9C0'}}>
              </TableCell>
            </Table>
            </Box>
          </Card>
        </Box>
      </Box>
    </div>
  );
}

export const CurriculumListResults = ({ customers, ...rest }) => {
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

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
                    checked={selectedCustomerIds.length === customers.length}
                    color="primary"
                    indeterminate={
                      selectedCustomerIds.length > 0
                      && selectedCustomerIds.length < customers.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>
                  Curriculum Code
                </TableCell>
                <TableCell>
                  CMO
                </TableCell>
                <TableCell>
                  Version
                </TableCell>
                <TableCell>
                  Date Created
                </TableCell>
                <TableCell>
                  Date Approved
                </TableCell>
                <TableCell>
                  Department Code
                </TableCell>
                <TableCell>
                  Username
                </TableCell>
                <TableCell>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customers.slice(0, limit).map((customer) => (
                <TableRow
                  hover
                  key={customer.id}
                  selected={selectedCustomerIds.indexOf(customer.id) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedCustomerIds.indexOf(customer.id) !== -1}
                      onChange={(event) => handleSelectOne(event, customer.id)}
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
                      </Avatar>
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {customer.name}
                      </Typography> */}
                      Curriculum Code
                    </Box>
                  </TableCell>
                  <TableCell>
                   CMO
                  </TableCell>
                  <TableCell>
                   Version
                  </TableCell>
                  <TableCell>
                  {format(customer.createdAt, 'dd/MM/yyyy')}
                  </TableCell>
                  <TableCell>
                  {format(customer.createdAt, 'dd/MM/yyyy')}
                  </TableCell>
                  <TableCell>
                    Department Code
                    </TableCell>
                    <TableCell>
                     Username
                    </TableCell>
                  <TableCell>
                    <UpdateModal>
                      {/* UPDATE */}
                    </UpdateModal>
                    <ArchiveModal>
                      {/* ARCHIVE */}
                    </ArchiveModal>
                    <DownloadPDF>
                      {/* PDF */}
                    </DownloadPDF>
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

CurriculumListResults.propTypes = {
  customers: PropTypes.array.isRequired
};
