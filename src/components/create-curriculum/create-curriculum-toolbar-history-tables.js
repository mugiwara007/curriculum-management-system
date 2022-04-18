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
          <Box sx={{ minWidth: 710 }}>
            <Table>
              <TableHead>
                <TableRow>
                 
                <TableCell>
                    COURSE CODE
                  </TableCell>
                  <TableCell>
                    DESCRIPTIVE TITLE
                  </TableCell>
                  <TableCell>
                    LEC UNITS
                  </TableCell>
                  <TableCell>
                    LAB UNITS
                  </TableCell>
                  <TableCell>
                    TOTAL UNITS
                  </TableCell>
                  <TableCell>
                    HOURS PER WEEK
                  </TableCell>
                  <TableCell>
                    PRE-REQ
                  </TableCell>
                  <TableCell>
                    CO-REQ
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
      
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
               
            
                
              </TableBody>
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
            width:'50%',
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
  