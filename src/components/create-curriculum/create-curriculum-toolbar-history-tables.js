import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Button,
  CardContent,
  
} from '@mui/material';
import PerfectScrollbar from 'react-perfect-scrollbar';
  import SaveIcon from '@mui/icons-material/Save';
  import ArrowBackIcon from '@mui/icons-material/ArrowBack';
  import List from '@mui/material/List';
  import ListItem from '@mui/material/ListItem';
  import ListItemText from '@mui/material/ListItemText';
  import Divider from '@mui/material/Divider';
  import TextField from '@mui/material/TextField';
import { TocTwoTone } from '@mui/icons-material';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import React, { Component } from 'react';

  const style = {
    width: '100%',
    maxWidth: 360,
    bgcolor: 'background.paper',
  };
  const maintext = {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  }
  const summary = {
    color: 'black',
    fontSize: 15,
    width: '100',

  }
  const when = {
    color: 'black',
    fontSize: 13,
    width: '100',
  }

  

  function HistoryLog() {
    return (
      <List sx={style} 
      component="nav"
       aria-label="mailbox folders">
        <ListItem button>
          <ListItemText 
           disableTypography
           style={maintext}
           primary="History"/>
        </ListItem>
        <Divider />
        <ListItem button 
        divider>
          <ListItemText 
          disableTypography
          style={summary}
          primary="I added a comment"
          secondary={<div style={when}>User - added 4 days ago</div>}
          />
        </ListItem>
        <ListItem button>
          <ListItemText 
          disableTypography
          style={summary}
          primary="I added a comment"
          secondary={<div style={when}>User - added 4 days ago</div>} />
        </ListItem>
        <Divider light />
        <ListItem button>
          <ListItemText 
          disableTypography
          style={summary}
          primary="I added a comment"
          secondary={<div style={when}>User - added 4 days ago</div>} />
        </ListItem>
        <ListItem button>
          <ListItemText 
          disableTypography
          style={summary}
          primary="I added a comment"
          secondary={<div style={when}>User - added 4 days ago</div>} />
        </ListItem>
        <ListItem button>
          <ListItemText 
          disableTypography
          style={summary}
          primary="I added a comment"
          secondary={<div style={when}>User - added 4 days ago</div>} />
        </ListItem>
      
      </List>
    );
  }

  function CreateTables(){
    
    return (
      <Card>
        <PerfectScrollbar>
          <Box sx={{ minWidth: 720}}>
              <TableHead>
                <TableCell>
                </TableCell>
                <TableCell>
               </TableCell>
                <TableCell >
                </TableCell>
                <TableCell>
                    <Box>
                    <FormControl fullWidth>
                    <InputLabel variant="standard" 
                    htmlFor="uncontrolled-native"
                    >
                      Year Level
                    </InputLabel>
                    <NativeSelect
                    sx={{ width: 135}}
                      defaultValue={30}
                      inputProps={{
                        name: 'year',
                        id: 'uncontrolled-native',
                      }}
                    >
                      <option value={10}>First Year</option>
                      <option value={20}>Second Year</option>
                      <option value={30}>Third Year</option>
                      <option value={30}>Fourth Year</option>
                    </NativeSelect>
                  </FormControl>
                  </Box>
                </TableCell>     
                <TableCell>
                </TableCell>
                <TableCell>
                </TableCell>
                <TableCell>
                </TableCell>
                <TableCell>
                </TableCell>
              </TableHead>
              <TableCell>
              <p><b>First Semester</b></p>
              </TableCell>

 {/*First Semester Header*/}
              <TableBody>
              <TableCell sx={{fontWeight: 'bold' }}>
                    COURSE CODE
                  </TableCell>
                  <TableCell sx={{fontWeight: 'bold', pl: 7 }}>
                    DESCRIPTIVE TITLE
                  </TableCell>
                  
                  <TableCell sx={{fontWeight: 'bold', pl: 9 }}>
                    LEC UNITS
                  </TableCell>
                  <TableCell sx={{fontWeight: 'bold', pl: 7 }}>
                    LAB UNITS
                  </TableCell>
                  <TableCell sx={{fontWeight: 'bold', pr: 5}}>
                    TOTAL UNITS
                  </TableCell>
                  <TableCell sx={{fontWeight: 'bold', pr: 8 }}>
                    HOURS PER WEEK
                  </TableCell>
                  <TableCell sx={{fontWeight: 'bold', pr: 9 }}>
                    PRE-REQ
                  </TableCell>
                  <TableCell sx={{fontWeight: 'bold', pr: 7 }}>
                    CO-REQ
                  </TableCell>
                  </TableBody>

  {/*First Semester TextFields*/}  

                  
                   
                   <Table label =" Line1">
            <TableCell>
                   <TextField sx={{ minWidth: 95 }}
                    id="standard-multiline-static"
                    label="Course Code"
                    multiline
                    
                    variant="standard"
                    />
                    </TableCell>
                    <TextField sx={{ minWidth: 105 }}
                    id="standard-multiline-static"
                    label="Descriptive Title"
                    multiline
                    
                    variant="standard"
                    />
                    <TableCell>
                    <TextField
                    sx={{ minWidth: 5,
                    left:8
                    }}
                      fullWidth
                     id="standard-number"
                     label="Lec Units"
                     type="number"
                     InputLabelProps={{
                     shrink: true,
                     
                     }}
                     variant="standard"
                      />
                    </TableCell>
                    <TableCell >
                    <TextField
                    sx={{ 
                    maxWidth:1,
                     
                    }}
            
                     id="standard-number"
                     label="Lab Units"
                     type="number"
                     InputLabelProps={{
                     shrink: true,
                    
                 
                     }}
                     variant="standard"
                      />
                    </TableCell>
                    <TextField
                     sx={{ width: 73, left:5 }}
                     id="standard-number"
                     label="Total Units"
                     type="number"
                     InputLabelProps={{
                     shrink: true,
                     }}
                     variant="standard"
                      />
                    <TableCell>
                    <TextField
                     sx={{ 
                       minWidth: 13,
                       left:5
                     }}
                     id="standard-number"
                     label="HPW"
                     type="number"
                     InputLabelProps={{
                     shrink: true,
                     }}
                     variant="standard"
                      />
                    </TableCell>
                    <TableCell>
                    <TextField
                    sx={{ minWidth: 15 }}
                     id="standard-multiline-static"
                     label="Pre-Req"
                     multiline
                     
                     variant="standard"
                    />
                    </TableCell>
                    <TableCell>
                    <TextField id="standard-basic"
                     label="Co-Req"
                      variant="standard" />
                    </TableCell> 
                </Table>

            <Table label =" Line2">
            <TableCell>
                   <TextField sx={{ minWidth: 95 }}
                    id="standard-multiline-static"
                    label="Course Code"
                    multiline
                    
                    variant="standard"
                    />
                    </TableCell>
                    <TextField sx={{ minWidth: 105 }}
                    id="standard-multiline-static"
                    label="Descriptive Title"
                    multiline
                    
                    variant="standard"
                    />
                    <TableCell>
                    <TextField
                    sx={{ minWidth: 5,
                    left:8
                    }}
                      fullWidth
                     id="standard-number"
                     label="Lec Units"
                     type="number"
                     InputLabelProps={{
                     shrink: true,
                     
                     }}
                     variant="standard"
                      />
                    </TableCell>
                    <TableCell >
                    <TextField
                    sx={{ 
                    maxWidth:1,
                     
                    }}
            
                     id="standard-number"
                     label="Lab Units"
                     type="number"
                     InputLabelProps={{
                     shrink: true,
                    
                 
                     }}
                     variant="standard"
                      />
                    </TableCell>
                    <TextField
                     sx={{ width: 73, left:5 }}
                     id="standard-number"
                     label="Total Units"
                     type="number"
                     InputLabelProps={{
                     shrink: true,
                     }}
                     variant="standard"
                      />
                    <TableCell>
                    <TextField
                     sx={{ 
                       minWidth: 13,
                       left:5
                     }}
                     id="standard-number"
                     label="HPW"
                     type="number"
                     InputLabelProps={{
                     shrink: true,
                     }}
                     variant="standard"
                      />
                    </TableCell>
                    <TableCell>
                    <TextField
                    sx={{ minWidth: 15 }}
                     id="standard-multiline-static"
                     label="Pre-Req"
                     multiline
                     
                     variant="standard"
                    />
                    </TableCell>
                    <TableCell>
                    <TextField id="standard-basic"
                     label="Co-Req"
                      variant="standard" />
                    </TableCell> 
                </Table>

                   <Table label =" Line3">
                   <TableCell>
                   <TextField sx={{ minWidth: 95 }}
                    id="standard-multiline-static"
                    label="Course Code"
                    multiline
                    
                    variant="standard"
                    />
                    </TableCell>
                    <TextField sx={{ minWidth: 105 }}
                    id="standard-multiline-static"
                    label="Descriptive Title"
                    multiline
                    
                    variant="standard"
                    />
                    <TableCell>
                    <TextField
                    sx={{ minWidth: 5,
                    left:8
                    }}
                      fullWidth
                     id="standard-number"
                     label="Lec Units"
                     type="number"
                     InputLabelProps={{
                     shrink: true,
                     
                     }}
                     variant="standard"
                      />
                    </TableCell>
                    <TableCell>
                    <TextField
                    sx={{ 
  
                      left: 3,
                      }}
                     id="standard-number"
                     label="Lab Units"
                     type="number"
                     InputLabelProps={{
                     shrink: true,
                    
                     }}
                     variant="standard"
                      />
                    </TableCell>
                    <TextField
                     sx={{ width: 73, left:5 }}
                     id="standard-number"
                     label="Total Units"
                     type="number"
                     InputLabelProps={{
                     shrink: true,
                     }}
                     variant="standard"
                      />
                    <TableCell>
                    <TextField
                     sx={{ 
                       minWidth: 13,
                       left:5
                     }}
                     id="standard-number"
                     label="HPW"
                     type="number"
                     InputLabelProps={{
                     shrink: true,
                     }}
                     variant="standard"
                      />
                    </TableCell>
                    <TableCell>
                    <TextField
                    sx={{ minWidth: 15 }}
                     id="standard-multiline-static"
                     label="Pre-Req"
                     multiline
                     variant="standard"
                    />
                    </TableCell>
                    <TableCell>
                    <TextField id="standard-basic"
                     label="Co-Req"
                      variant="standard" />
                    </TableCell> 
            </Table>

              <Table label =" Line4">
                   <TableCell>
                   <TextField sx={{ minWidth: 95 }}
                    id="standard-multiline-static"
                    label="Course Code"
                    multiline
                    
                    variant="standard"
                    />
                    </TableCell>
                    <TextField sx={{ minWidth: 105 }}
                    id="standard-multiline-static"
                    label="Descriptive Title"
                    multiline
                    
                    variant="standard"
                    />
                    <TableCell>
                    <TextField
                    sx={{ minWidth: 5,
                    left:8
                    }}
                      fullWidth
                     id="standard-number"
                     label="Lec Units"
                     type="number"
                     InputLabelProps={{
                     shrink: true,
                     
                     }}
                     variant="standard"
                      />
                    </TableCell>
                    <TableCell>
                    <TextField
                    sx={{ 
  
                      left: 3,
                      }}
                     id="standard-number"
                     label="Lab Units"
                     type="number"
                     InputLabelProps={{
                     shrink: true,
                    
                     }}
                     variant="standard"
                      />
                    </TableCell>
                    <TextField
                     sx={{ width: 73, left:5 }}
                     id="standard-number"
                     label="Total Units"
                     type="number"
                     InputLabelProps={{
                     shrink: true,
                     }}
                     variant="standard"
                      />
                    <TableCell>
                    <TextField
                     sx={{ 
                       minWidth: 13,
                       left:5
                     }}
                     id="standard-number"
                     label="HPW"
                     type="number"
                     InputLabelProps={{
                     shrink: true,
                     }}
                     variant="standard"
                      />
                    </TableCell>
                    <TableCell>
                    <TextField
                    sx={{ minWidth: 15 }}
                     id="standard-multiline-static"
                     label="Pre-Req"
                     multiline
                     variant="standard"
                    />
                    </TableCell>
                    <TableCell>
                    <TextField id="standard-basic"
                     label="Co-Req"
                      variant="standard" />
                    </TableCell> 
            </Table>
                        
            <Table label =" Line5">
                   <TableCell>
                   <TextField sx={{ minWidth: 95 }}
                    id="standard-multiline-static"
                    label="Course Code"
                    multiline
                    
                    variant="standard"
                    />
                    </TableCell>
                    <TextField sx={{ minWidth: 105 }}
                    id="standard-multiline-static"
                    label="Descriptive Title"
                    multiline
                    
                    variant="standard"
                    />
                    <TableCell>
                    <TextField
                    sx={{ minWidth: 5,
                    left:8
                    }}
                      fullWidth
                     id="standard-number"
                     label="Lec Units"
                     type="number"
                     InputLabelProps={{
                     shrink: true,
                     
                     }}
                     variant="standard"
                      />
                    </TableCell>
                    <TableCell>
                    <TextField
                    sx={{ 
  
                      left: 3,
                      }}
                     id="standard-number"
                     label="Lab Units"
                     type="number"
                     InputLabelProps={{
                     shrink: true,
                    
                     }}
                     variant="standard"
                      />
                    </TableCell>
                    <TextField
                     sx={{ width: 73, left:5 }}
                     id="standard-number"
                     label="Total Units"
                     type="number"
                     InputLabelProps={{
                     shrink: true,
                     }}
                     variant="standard"
                      />
                    <TableCell>
                    <TextField
                     sx={{ 
                       minWidth: 13,
                       left:5
                     }}
                     id="standard-number"
                     label="HPW"
                     type="number"
                     InputLabelProps={{
                     shrink: true,
                     }}
                     variant="standard"
                      />
                    </TableCell>
                    <TableCell>
                    <TextField
                    sx={{ minWidth: 15 }}
                     id="standard-multiline-static"
                     label="Pre-Req"
                     multiline
                     variant="standard"
                    />
                    </TableCell>
                    <TableCell>
                    <TextField id="standard-basic"
                     label="Co-Req"
                      variant="standard" />
                    </TableCell> 
            </Table>

            <Table label =" Line6">
                   <TableCell>
                   <TextField sx={{ minWidth: 95 }}
                    id="standard-multiline-static"
                    label="Course Code"
                    multiline
                    
                    variant="standard"
                    />
                    </TableCell>
                    <TextField sx={{ minWidth: 105 }}
                    id="standard-multiline-static"
                    label="Descriptive Title"
                    multiline
                    
                    variant="standard"
                    />
                    <TableCell>
                    <TextField
                    sx={{ minWidth: 5,
                    left:8
                    }}
                      fullWidth
                     id="standard-number"
                     label="Lec Units"
                     type="number"
                     InputLabelProps={{
                     shrink: true,
                     
                     }}
                     variant="standard"
                      />
                    </TableCell>
                    <TableCell>
                    <TextField
                    sx={{ 
  
                      left: 3,
                      }}
                     id="standard-number"
                     label="Lab Units"
                     type="number"
                     InputLabelProps={{
                     shrink: true,
                    
                     }}
                     variant="standard"
                      />
                    </TableCell>
                    <TextField
                     sx={{ width: 73, left:5 }}
                     id="standard-number"
                     label="Total Units"
                     type="number"
                     InputLabelProps={{
                     shrink: true,
                     }}
                     variant="standard"
                      />
                    <TableCell>
                    <TextField
                     sx={{ 
                       minWidth: 13,
                       left:5
                     }}
                     id="standard-number"
                     label="HPW"
                     type="number"
                     InputLabelProps={{
                     shrink: true,
                     }}
                     variant="standard"
                      />
                    </TableCell>
                    <TableCell>
                    <TextField
                    sx={{ minWidth: 15 }}
                     id="standard-multiline-static"
                     label="Pre-Req"
                     multiline
                     variant="standard"
                    />
                    </TableCell>
                    <TableCell>
                    <TextField id="standard-basic"
                     label="Co-Req"
                      variant="standard" />
                    </TableCell> 
            </Table>

            <Table label =" Line7">
                   <TableCell>
                   <TextField sx={{ minWidth: 95 }}
                    id="standard-multiline-static"
                    label="Course Code"
                    multiline
                    
                    variant="standard"
                    />
                    </TableCell>
                    <TextField sx={{ minWidth: 105 }}
                    id="standard-multiline-static"
                    label="Descriptive Title"
                    multiline
                    
                    variant="standard"
                    />
                    <TableCell>
                    <TextField
                    sx={{ minWidth: 5,
                    left:8
                    }}
                      fullWidth
                     id="standard-number"
                     label="Lec Units"
                     type="number"
                     InputLabelProps={{
                     shrink: true,
                     
                     }}
                     variant="standard"
                      />
                    </TableCell>
                    <TableCell>
                    <TextField
                    sx={{ 
  
                      left: 3,
                      }}
                     id="standard-number"
                     label="Lab Units"
                     type="number"
                     InputLabelProps={{
                     shrink: true,
                    
                     }}
                     variant="standard"
                      />
                    </TableCell>
                    <TextField
                     sx={{ width: 73, left:5 }}
                     id="standard-number"
                     label="Total Units"
                     type="number"
                     InputLabelProps={{
                     shrink: true,
                     }}
                     variant="standard"
                      />
                    <TableCell>
                    <TextField
                     sx={{ 
                       minWidth: 13,
                       left:5
                     }}
                     id="standard-number"
                     label="HPW"
                     type="number"
                     InputLabelProps={{
                     shrink: true,
                     }}
                     variant="standard"
                      />
                    </TableCell>
                    <TableCell>
                    <TextField
                    sx={{ minWidth: 15 }}
                     id="standard-multiline-static"
                     label="Pre-Req"
                     multiline
                     variant="standard"
                    />
                    </TableCell>
                    <TableCell>
                    <TextField id="standard-basic"
                     label="Co-Req"
                      variant="standard" />
                    </TableCell> 
            </Table>

            <Table label =" Line8">
                   <TableCell>
                   <TextField sx={{ minWidth: 95 }}
                    id="standard-multiline-static"
                    label="Course Code"
                    multiline
                    
                    variant="standard"
                    />
                    </TableCell>
                    <TextField sx={{ minWidth: 105 }}
                    id="standard-multiline-static"
                    label="Descriptive Title"
                    multiline
                    
                    variant="standard"
                    />
                    <TableCell>
                    <TextField
                    sx={{ minWidth: 5,
                    left:8
                    }}
                      fullWidth
                     id="standard-number"
                     label="Lec Units"
                     type="number"
                     InputLabelProps={{
                     shrink: true,
                     
                     }}
                     variant="standard"
                      />
                    </TableCell>
                    <TableCell>
                    <TextField
                    sx={{ 
  
                      left: 3,
                      }}
                     id="standard-number"
                     label="Lab Units"
                     type="number"
                     InputLabelProps={{
                     shrink: true,
                    
                     }}
                     variant="standard"
                      />
                    </TableCell>
                    <TextField
                     sx={{ width: 73, left:5 }}
                     id="standard-number"
                     label="Total Units"
                     type="number"
                     InputLabelProps={{
                     shrink: true,
                     }}
                     variant="standard"
                      />
                    <TableCell>
                    <TextField
                     sx={{ 
                       minWidth: 13,
                       left:5
                     }}
                     id="standard-number"
                     label="HPW"
                     type="number"
                     InputLabelProps={{
                     shrink: true,
                     }}
                     variant="standard"
                      />
                    </TableCell>
                    <TableCell>
                    <TextField
                    sx={{ minWidth: 15 }}
                     id="standard-multiline-static"
                     label="Pre-Req"
                     multiline
                     variant="standard"
                    />
                    </TableCell>
                    <TableCell>
                    <TextField id="standard-basic"
                     label="Co-Req"
                      variant="standard" />
                    </TableCell> 
            </Table>

            <Table>
              <TableCell>
              </TableCell>
              <TableCell>
              </TableCell>
              <TableCell>
             
              </TableCell>
              <TableCell>
              <b>TOTAL:</b>
              </TableCell>
              <TableCell id='TotalLecUnits'
              sx={{textAlign:'left'}}
              >
              <b>0</b>
              </TableCell>

              <TableCell id='TotalLabUnits'
              sx={{textAlign:'left'}}
              >
              <b>0</b>
              </TableCell>
              <TableCell id='TotalUnits'
              sx={{textAlign:'left'}}
              >
              <b>0</b>
              </TableCell>
              <TableCell id='TotalHPW'
              sx={{textAlign:'left',
              
            }}
              >
              <b>0</b>
              </TableCell>
              <TableCell>
  
              </TableCell>
              <TableCell>
  
              </TableCell>
              <TableCell>
              </TableCell>
            </Table>

 {/*Second Semester Headings*/}

            <TableCell sx={{width: 154}}>
              <p><b>Second Semester</b></p>
              </TableCell>
              
              <TableBody>
              <TableCell sx={{fontWeight: 'bold',}}>
                    COURSE CODE
                  </TableCell>
                  <TableCell sx={{fontWeight: 'bold',}}>
                    DESCRIPTIVE TITLE
                  </TableCell>
                  <TableCell sx={{fontWeight: 'bold',}}>
                    LEC UNITS
                  </TableCell>
                  <TableCell sx={{fontWeight: 'bold',}}>
                    LAB UNITS
                  </TableCell>
                  <TableCell sx={{fontWeight: 'bold',}}>
                    TOTAL UNITS
                  </TableCell>
                  <TableCell sx={{fontWeight: 'bold',}}>
                    HOURS PER WEEK
                  </TableCell>
                  <TableCell sx={{fontWeight: 'bold',}}>
                    PRE-REQ
                  </TableCell>
                  <TableCell sx={{fontWeight: 'bold',}}>
                    CO-REQ
                  </TableCell>
                  </TableBody>

 {/*Second Semester TextField*/}

                  <Table label =" Line1">
                  <TableCell>
                   <TextField sx={{ minWidth: 95 }}
                    id="standard-multiline-static"
                    label="Course Code"
                    multiline
                    
                    variant="standard"
                    />
                    </TableCell>
                    <TextField sx={{ minWidth: 105 }}
                    id="standard-multiline-static"
                    label="Descriptive Title"
                    multiline
                    
                    variant="standard"
                    />
                    <TableCell>
                    <TextField
                    sx={{ minWidth: 5,
                    left:8
                    }}
                      fullWidth
                     id="standard-number"
                     label="Lec Units"
                     type="number"
                     InputLabelProps={{
                     shrink: true,
                     
                     }}
                     variant="standard"
                      />
                    </TableCell>
                    <TableCell >
                    <TextField
                    sx={{ 
                    maxWidth:1,
                     
                    }}
            
                     id="standard-number"
                     label="Lab Units"
                     type="number"
                     InputLabelProps={{
                     shrink: true,
                    
                 
                     }}
                     variant="standard"
                      />
                    </TableCell>
                    <TextField
                     sx={{ width: 73, left:5 }}
                     id="standard-number"
                     label="Total Units"
                     type="number"
                     InputLabelProps={{
                     shrink: true,
                     }}
                     variant="standard"
                      />
                    <TableCell>
                    <TextField
                     sx={{ 
                       minWidth: 13,
                       left:5
                     }}
                     id="standard-number"
                     label="HPW"
                     type="number"
                     InputLabelProps={{
                     shrink: true,
                     }}
                     variant="standard"
                      />
                    </TableCell>
                    <TableCell>
                    <TextField
                    sx={{ minWidth: 15 }}
                     id="standard-multiline-static"
                     label="Pre-Req"
                     multiline
                     
                     variant="standard"
                    />
                    </TableCell>
                    <TableCell>
                    <TextField id="standard-basic"
                     label="Co-Req"
                      variant="standard" />
                    </TableCell> 
                </Table>

                    <Table label =" Line2">
            <TableCell>
                   <TextField sx={{ minWidth: 95 }}
                    id="standard-multiline-static"
                    label="Course Code"
                    multiline
                    
                    variant="standard"
                    />
                    </TableCell>
                    <TextField sx={{ minWidth: 105 }}
                    id="standard-multiline-static"
                    label="Descriptive Title"
                    multiline
                    
                    variant="standard"
                    />
                    <TableCell>
                    <TextField
                    sx={{ minWidth: 5,
                    left:8
                    }}
                      fullWidth
                     id="standard-number"
                     label="Lec Units"
                     type="number"
                     InputLabelProps={{
                     shrink: true,
                     
                     }}
                     variant="standard"
                      />
                    </TableCell>
                    <TableCell >
                    <TextField
                    sx={{ 
                    maxWidth:1,
                     
                    }}
            
                     id="standard-number"
                     label="Lab Units"
                     type="number"
                     InputLabelProps={{
                     shrink: true,
                    
                 
                     }}
                     variant="standard"
                      />
                    </TableCell>
                    <TextField
                     sx={{ width: 73, left:5 }}
                     id="standard-number"
                     label="Total Units"
                     type="number"
                     InputLabelProps={{
                     shrink: true,
                     }}
                     variant="standard"
                      />
                    <TableCell>
                    <TextField
                     sx={{ 
                       minWidth: 13,
                       left:5
                     }}
                     id="standard-number"
                     label="HPW"
                     type="number"
                     InputLabelProps={{
                     shrink: true,
                     }}
                     variant="standard"
                      />
                    </TableCell>
                    <TableCell>
                    <TextField
                    sx={{ minWidth: 15 }}
                     id="standard-multiline-static"
                     label="Pre-Req"
                     multiline
                     
                     variant="standard"
                    />
                    </TableCell>
                    <TableCell>
                    <TextField id="standard-basic"
                     label="Co-Req"
                      variant="standard" />
                    </TableCell> 
                </Table>

                   <Table label =" Line3">
                   <TableCell>
                   <TextField sx={{ minWidth: 95 }}
                    id="standard-multiline-static"
                    label="Course Code"
                    multiline
                    
                    variant="standard"
                    />
                    </TableCell>
                    <TextField sx={{ minWidth: 105 }}
                    id="standard-multiline-static"
                    label="Descriptive Title"
                    multiline
                    
                    variant="standard"
                    />
                    <TableCell>
                    <TextField
                    sx={{ minWidth: 5,
                    left:8
                    }}
                      fullWidth
                     id="standard-number"
                     label="Lec Units"
                     type="number"
                     InputLabelProps={{
                     shrink: true,
                     
                     }}
                     variant="standard"
                      />
                    </TableCell>
                    <TableCell>
                    <TextField
                    sx={{ 
  
                      left: 3,
                      }}
                     id="standard-number"
                     label="Lab Units"
                     type="number"
                     InputLabelProps={{
                     shrink: true,
                    
                     }}
                     variant="standard"
                      />
                    </TableCell>
                    <TextField
                     sx={{ width: 73, left:5 }}
                     id="standard-number"
                     label="Total Units"
                     type="number"
                     InputLabelProps={{
                     shrink: true,
                     }}
                     variant="standard"
                      />
                    <TableCell>
                    <TextField
                     sx={{ 
                       minWidth: 13,
                       left:5
                     }}
                     id="standard-number"
                     label="HPW"
                     type="number"
                     InputLabelProps={{
                     shrink: true,
                     }}
                     variant="standard"
                      />
                    </TableCell>
                    <TableCell>
                    <TextField
                    sx={{ minWidth: 15 }}
                     id="standard-multiline-static"
                     label="Pre-Req"
                     multiline
                     variant="standard"
                    />
                    </TableCell>
                    <TableCell>
                    <TextField id="standard-basic"
                     label="Co-Req"
                      variant="standard" />
                    </TableCell> 
            </Table>

              <Table label =" Line4">
                   <TableCell>
                   <TextField sx={{ minWidth: 95 }}
                    id="standard-multiline-static"
                    label="Course Code"
                    multiline
                    
                    variant="standard"
                    />
                    </TableCell>
                    <TextField sx={{ minWidth: 105 }}
                    id="standard-multiline-static"
                    label="Descriptive Title"
                    multiline
                    
                    variant="standard"
                    />
                    <TableCell>
                    <TextField
                    sx={{ minWidth: 5,
                    left:8
                    }}
                      fullWidth
                     id="standard-number"
                     label="Lec Units"
                     type="number"
                     InputLabelProps={{
                     shrink: true,
                     
                     }}
                     variant="standard"
                      />
                    </TableCell>
                    <TableCell>
                    <TextField
                    sx={{ 
  
                      left: 3,
                      }}
                     id="standard-number"
                     label="Lab Units"
                     type="number"
                     InputLabelProps={{
                     shrink: true,
                    
                     }}
                     variant="standard"
                      />
                    </TableCell>
                    <TextField
                     sx={{ width: 73, left:5 }}
                     id="standard-number"
                     label="Total Units"
                     type="number"
                     InputLabelProps={{
                     shrink: true,
                     }}
                     variant="standard"
                      />
                    <TableCell>
                    <TextField
                     sx={{ 
                       minWidth: 13,
                       left:5
                     }}
                     id="standard-number"
                     label="HPW"
                     type="number"
                     InputLabelProps={{
                     shrink: true,
                     }}
                     variant="standard"
                      />
                    </TableCell>
                    <TableCell>
                    <TextField
                    sx={{ minWidth: 15 }}
                     id="standard-multiline-static"
                     label="Pre-Req"
                     multiline
                     variant="standard"
                    />
                    </TableCell>
                    <TableCell>
                    <TextField id="standard-basic"
                     label="Co-Req"
                      variant="standard" />
                    </TableCell> 
            </Table>
                        
            <Table label =" Line5">
                   <TableCell>
                   <TextField sx={{ minWidth: 95 }}
                    id="standard-multiline-static"
                    label="Course Code"
                    multiline
                    
                    variant="standard"
                    />
                    </TableCell>
                    <TextField sx={{ minWidth: 105 }}
                    id="standard-multiline-static"
                    label="Descriptive Title"
                    multiline
                    
                    variant="standard"
                    />
                    <TableCell>
                    <TextField
                    sx={{ minWidth: 5,
                    left:8
                    }}
                      fullWidth
                     id="standard-number"
                     label="Lec Units"
                     type="number"
                     InputLabelProps={{
                     shrink: true,
                     
                     }}
                     variant="standard"
                      />
                    </TableCell>
                    <TableCell>
                    <TextField
                    sx={{ 
  
                      left: 3,
                      }}
                     id="standard-number"
                     label="Lab Units"
                     type="number"
                     InputLabelProps={{
                     shrink: true,
                    
                     }}
                     variant="standard"
                      />
                    </TableCell>
                    <TextField
                     sx={{ width: 73, left:5 }}
                     id="standard-number"
                     label="Total Units"
                     type="number"
                     InputLabelProps={{
                     shrink: true,
                     }}
                     variant="standard"
                      />
                    <TableCell>
                    <TextField
                     sx={{ 
                       minWidth: 13,
                       left:5
                     }}
                     id="standard-number"
                     label="HPW"
                     type="number"
                     InputLabelProps={{
                     shrink: true,
                     }}
                     variant="standard"
                      />
                    </TableCell>
                    <TableCell>
                    <TextField
                    sx={{ minWidth: 15 }}
                     id="standard-multiline-static"
                     label="Pre-Req"
                     multiline
                     variant="standard"
                    />
                    </TableCell>
                    <TableCell>
                    <TextField id="standard-basic"
                     label="Co-Req"
                      variant="standard" />
                    </TableCell> 
            </Table>

            <Table label =" Line6">
                   <TableCell>
                   <TextField sx={{ minWidth: 95 }}
                    id="standard-multiline-static"
                    label="Course Code"
                    multiline
                    
                    variant="standard"
                    />
                    </TableCell>
                    <TextField sx={{ minWidth: 105 }}
                    id="standard-multiline-static"
                    label="Descriptive Title"
                    multiline
                    
                    variant="standard"
                    />
                    <TableCell>
                    <TextField
                    sx={{ minWidth: 5,
                    left:8
                    }}
                      fullWidth
                     id="standard-number"
                     label="Lec Units"
                     type="number"
                     InputLabelProps={{
                     shrink: true,
                     
                     }}
                     variant="standard"
                      />
                    </TableCell>
                    <TableCell>
                    <TextField
                    sx={{ 
  
                      left: 3,
                      }}
                     id="standard-number"
                     label="Lab Units"
                     type="number"
                     InputLabelProps={{
                     shrink: true,
                    
                     }}
                     variant="standard"
                      />
                    </TableCell>
                    <TextField
                     sx={{ width: 73, left:5 }}
                     id="standard-number"
                     label="Total Units"
                     type="number"
                     InputLabelProps={{
                     shrink: true,
                     }}
                     variant="standard"
                      />
                    <TableCell>
                    <TextField
                     sx={{ 
                       minWidth: 13,
                       left:5
                     }}
                     id="standard-number"
                     label="HPW"
                     type="number"
                     InputLabelProps={{
                     shrink: true,
                     }}
                     variant="standard"
                      />
                    </TableCell>
                    <TableCell>
                    <TextField
                    sx={{ minWidth: 15 }}
                     id="standard-multiline-static"
                     label="Pre-Req"
                     multiline
                     variant="standard"
                    />
                    </TableCell>
                    <TableCell>
                    <TextField id="standard-basic"
                     label="Co-Req"
                      variant="standard" />
                    </TableCell> 
            </Table>

            <Table label =" Line7">
                   <TableCell>
                   <TextField sx={{ minWidth: 95 }}
                    id="standard-multiline-static"
                    label="Course Code"
                    multiline
                    
                    variant="standard"
                    />
                    </TableCell>
                    <TextField sx={{ minWidth: 105 }}
                    id="standard-multiline-static"
                    label="Descriptive Title"
                    multiline
                    
                    variant="standard"
                    />
                    <TableCell>
                    <TextField
                    sx={{ minWidth: 5,
                    left:8
                    }}
                      fullWidth
                     id="standard-number"
                     label="Lec Units"
                     type="number"
                     InputLabelProps={{
                     shrink: true,
                     
                     }}
                     variant="standard"
                      />
                    </TableCell>
                    <TableCell>
                    <TextField
                    sx={{ 
  
                      left: 3,
                      }}
                     id="standard-number"
                     label="Lab Units"
                     type="number"
                     InputLabelProps={{
                     shrink: true,
                    
                     }}
                     variant="standard"
                      />
                    </TableCell>
                    <TextField
                     sx={{ width: 73, left:5 }}
                     id="standard-number"
                     label="Total Units"
                     type="number"
                     InputLabelProps={{
                     shrink: true,
                     }}
                     variant="standard"
                      />
                    <TableCell>
                    <TextField
                     sx={{ 
                       minWidth: 13,
                       left:5
                     }}
                     id="standard-number"
                     label="HPW"
                     type="number"
                     InputLabelProps={{
                     shrink: true,
                     }}
                     variant="standard"
                      />
                    </TableCell>
                    <TableCell>
                    <TextField
                    sx={{ minWidth: 15 }}
                     id="standard-multiline-static"
                     label="Pre-Req"
                     multiline
                     variant="standard"
                    />
                    </TableCell>
                    <TableCell>
                    <TextField id="standard-basic"
                     label="Co-Req"
                      variant="standard" />
                    </TableCell> 
            </Table>

            <Table label =" Line8">
                   <TableCell>
                   <TextField sx={{ minWidth: 95 }}
                    id="standard-multiline-static"
                    label="Course Code"
                    multiline
                    
                    variant="standard"
                    />
                    </TableCell>
                    <TextField sx={{ minWidth: 105 }}
                    id="standard-multiline-static"
                    label="Descriptive Title"
                    multiline
                    
                    variant="standard"
                    />
                    <TableCell>
                    <TextField
                    sx={{ minWidth: 5,
                    left:8
                    }}
                      fullWidth
                     id="standard-number"
                     label="Lec Units"
                     type="number"
                     InputLabelProps={{
                     shrink: true,
                     
                     }}
                     variant="standard"
                      />
                    </TableCell>
                    <TableCell>
                    <TextField
                    sx={{ 
  
                      left: 3,
                      }}
                     id="standard-number"
                     label="Lab Units"
                     type="number"
                     InputLabelProps={{
                     shrink: true,
                    
                     }}
                     variant="standard"
                      />
                    </TableCell>
                    <TextField
                     sx={{ width: 73, left:5 }}
                     id="standard-number"
                     label="Total Units"
                     type="number"
                     InputLabelProps={{
                     shrink: true,
                     }}
                     variant="standard"
                      />
                    <TableCell>
                    <TextField
                     sx={{ 
                       minWidth: 13,
                       left:5
                     }}
                     id="standard-number"
                     label="HPW"
                     type="number"
                     InputLabelProps={{
                     shrink: true,
                     }}
                     variant="standard"
                      />
                    </TableCell>
                    <TableCell>
                    <TextField
                    sx={{ minWidth: 15 }}
                     id="standard-multiline-static"
                     label="Pre-Req"
                     multiline
                     variant="standard"
                    />
                    </TableCell>
                    <TableCell>
                    <TextField id="standard-basic"
                     label="Co-Req"
                      variant="standard" />
                    </TableCell> 
            </Table>

            <Table>
              <TableCell>
              </TableCell>
              <TableCell>
              </TableCell>
              <TableCell>
             
              </TableCell>
              <TableCell>
              <b>TOTAL:</b>
              </TableCell>
              <TableCell id='TotalLecUnits'
              sx={{textAlign:'left'}}
              >
              <b>0</b>
              </TableCell>

              <TableCell id='TotalLabUnits'
              sx={{textAlign:'left'}}
              >
              <b>0</b>
              </TableCell>
              <TableCell id='TotalUnits'
              sx={{textAlign:'left'}}
              >
              <b>0</b>
              </TableCell>
              <TableCell id='TotalHPW'
              sx={{textAlign:'left',
              
            }}
              >
              <b>0</b>
              </TableCell>
              <TableCell>
  
              </TableCell>
              <TableCell>
  
              </TableCell>
              <TableCell>
              </TableCell>
            </Table>

                    

                  
            
          </Box>
        </PerfectScrollbar>
      </Card>
      
    );
  }
  export const CreateCurriculumListToolbar = (props) => (
    <Box {...props}>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          m: -1,
  
        }}
      >
        <Typography
          sx={{ m: 1 }}
          variant="h4"
        >
         Create Curriculum
        </Typography>
        <Box sx={{ m: 1 }}>
          <Button
            startIcon={(<ArrowBackIcon fontSize="small" />)}
            sx={{ mr: 1 }}
          >
            Cancel
          </Button>
          <Button
            color="primary"
            variant="contained"
            startIcon={(<SaveIcon fontSize="small" />)}
          >
            Save
          </Button>
        </Box>
      </Box>
      <Box sx={{
         mt: 3 
         }}>
           
        <Card sx={{
          flexDirection: 'row',
          display: 'flex',
          p:1,
          m:1,

        }}>
  
          <CardContent
          sx={{
            width:'100%',
          }}
          >
            <Box sx={{ 
              width: '100%', 
              backgroundColor: 'light gray',
              border: 'black',
              height: '100%',
              borderRadius: 1,
              border: '1px solid #D3D3D3',
              
              }}>
                <HistoryLog/>
            </Box>
          </CardContent>
          <CardContent>
          <Box sx={{ 
              width: '100%', 
              backgroundColor: 'light gray',
              border: 'black',
              height: '100%',
              borderRadius: 1,
              border: '1px solid #D3D3D3',
              
             
              }}>
            <CreateTables/> 
            </Box>
      
          </CardContent>
          
        
        </Card>
      </Box>
    </Box>
  );
  