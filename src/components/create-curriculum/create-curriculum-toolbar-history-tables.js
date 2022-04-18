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
          <Box sx={{ minWidth: 720 }}>
            <Table>
              <TableHead>
                <TableRow>
                <TableCell  sx={{ minWidth: 150}}>
                <Box>
        <FormControl fullWidth>
        <InputLabel variant="standard" 
        htmlFor="uncontrolled-native">
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
                <TableCell>
    
                </TableCell>
                <TableCell>
                  
                </TableCell>
                <TableCell>
                </TableCell>
                
                <TableCell>
                </TableCell>
                <TableCell>
                </TableCell>
                <TableCell>
                </TableCell>
                <TableCell sx={{ minWidth: 76 }}>
                </TableCell>
                    
                </TableRow>
              </TableHead>

              <TableCell>
              <p><b>First Semester</b></p>
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
                  
                   <TableCell>
                   <TextField
                    id="standard-multiline-static"
                    label="Course Code"
                    multiline
                    defaultValue="Course Code"
                    variant="standard"
                    />
                    </TableCell>
                    <TextField
                    id="standard-multiline-static"
                    label="Descriptive Title"
                    multiline
                    defaultValue="Description"
                    variant="standard"
                    />
                    <TableCell>
                    <TextField
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
                     sx={{ minWidth: 50 }}
                     id="standard-multiline-static"
                     label="Pre-Req"
                     multiline
                     defaultValue="Pre-Req"
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
                   <TextField sx={{ minWidth: 95 }}
                    id="standard-multiline-static"
                    label="Course Code"
                    multiline
                    defaultValue="Course Code"
                    variant="standard"
                    />
                    </TableCell>
                    <TextField sx={{ minWidth: 76 }}
                    id="standard-multiline-static"
                    label="Descriptive Title"
                    multiline
                    defaultValue="Description"
                    variant="standard"
                    />
                    <TableCell>
                    <TextField
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
                     id="standard-multiline-static"
                     label="Pre-Req"
                     multiline
                     defaultValue="Pre-Req"
                     variant="standard"
                    />
                    </TableCell>
                    <TableCell>
                    <TextField id="standard-basic"
                     label="Co-Req"
                      variant="standard" />
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
  