
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
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';


export const CurriculumListToolbar = (props) => (
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
        Curriculum
      </Typography>
      <Box sx={{ m: 1 }}>
        <Button
          startIcon={(<SaveIcon fontSize="small" />)}
          sx={{ mr: 1 }}
        >
          Save
        </Button>
        <Button
          startIcon={(<EditIcon fontSize="small" />)}
          sx={{ mr: 1 }}
        >
          Edit
        </Button>
        <Button
          startIcon={(<PrintIcon fontSize="small" />)}
          sx={{ mr: 1 }}
        >
          Print
        </Button>
        <Button
          color="primary"
          variant="contained"
          startIcon={(<AddIcon fontSize="small" />)}
        >
          Add curriculum
        </Button>
      </Box>
    </Box>
    <Box sx={{ mt: 3 }}>
      <Card>
        <CardContent>
          <Box sx={{ maxWidth: 500 }}>
            <TextField
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SvgIcon
                      color="action"
                      fontSize="small"
                    >
                      <SearchIcon />
                    </SvgIcon>
                  </InputAdornment>
                )
              }}
              placeholder="Search customer"
              variant="outlined"
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  </Box>
);
