import {
    Box,
    Button,
    Card,
    CardContent,
    TextField,
    InputAdornment,
    SvgIcon, Typography
  } from '@mui/material';
  import { Search as SearchIcon } from '../../icons/search';
  import { Upload as UploadIcon } from '../../icons/upload';
  import { Download as DownloadIcon } from '../../icons/download';
  import Tabs from '@mui/material/Tabs';
  import Tab from '@mui/material/Tab';
  import * as React from 'react';
  import { getArchiveVal, setArchiveVal } from '../userModel';
  import Link from '@mui/material/Link';
import { useRouter } from 'next/router';
  
//   export default function CenteredTabs() {
//     const [value, setValue] = React.useState(0);
  
//     const handleChange = (event, newValue) => {
//       setValue(newValue);
//       setArchiveVal(newValue);
//     };
  
//     return (
//       <Box sx={{ width: '100%',}}>
//         <Tabs value={value} onChange={handleChange} centered>
//           <Tab label="Archive Subject Records" />
//           <Tab label="Archive User Records" />
//           <Tab label="Archive College Records" />
//           <Tab label="Archive Department Records" />
//         </Tabs>
//       </Box>
//     );
//   }
  
  export const ArchivesListToolbar = (props) => {
    const router = useRouter();
    return(
    <Box {...props}>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          m: -1
        }}
      >
        <Typography
          sx={{ m: 1 }}
          variant="h4"
        >
          College Archives
        </Typography>
      </Box>
      <Box sx={{ mt: 3 }}>
      <Card>
        <CardContent>
          <Box sx={{ maxWidth: 500 }}>
            <Link onClick={()=>{router.push('/colleges')}} sx={{marginTop:'auto', cursor:'pointer'}}>College List</Link>
          </Box>
        </CardContent>
      </Card>
    </Box>
    </Box>
    )
  }
  
  
  
  