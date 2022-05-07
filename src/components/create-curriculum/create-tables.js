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
  
import ArrowRightIcon from '@mui/icons-material/ArrowRight';


export const CreateTables = (props) => (
  <Card {...props}>
        <Box>
        <TableHead>
                <TableCell  sx={{width:'40%' }}>
                </TableCell>
                <TableCell sx={{width:'40%'}}>
                    <Box>
                    <FormControl fullWidth>
                    <InputLabel variant="standard" 
                    htmlFor="uncontrolled-native"
                    >
                      Year Level
                    </InputLabel>
                    <NativeSelect
                    
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
                <TableCell sx={{width:'20%' }}>
                </TableCell>
                <TableCell sx={{width:'25%' }}>
                </TableCell>
              </TableHead>
              <TableCell>
              <p><b>First Semester</b></p>
              </TableCell>
  
    <Divider />
    
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

            <TableCell>
              <p><b>Second Semester</b></p>
              </TableCell>
              
              <TableBody>
              <TableCell sx={{fontWeight: 'bold' }}>
                    COURSE CODE
                  </TableCell>
                  <TableCell sx={{fontWeight: 'bold', pl: 7 }}>
                    DESCRIPTIVE TITLE
                  </TableCell>
                  
                  <TableCell sx={{fontWeight: 'bold', pl: 6 }}>
                    LEC UNITS
                  </TableCell>
                  <TableCell sx={{fontWeight: 'bold', pl: 5 }}>
                    LAB UNITS
                  </TableCell>
                  <TableCell sx={{fontWeight: 'bold', pl: 7}}>
                    TOTAL UNITS
                  </TableCell>
                  <TableCell sx={{fontWeight: 'bold', pr: 6 }}>
                    HOURS PER WEEK
                  </TableCell>
                  <TableCell sx={{fontWeight: 'bold', pr: 9 }}>
                    PRE-REQ
                  </TableCell>
                  <TableCell sx={{fontWeight: 'bold', pr: 7 }}>
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
  </Card>
);
