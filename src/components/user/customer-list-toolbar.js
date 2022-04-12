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
import ArchiveIcon from '@mui/icons-material/Archive';
import { Modal } from '@mui/material';
import React from 'react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: "5px 10px 10px #9E9E9E",
  borderRadius: "30px",
  p: 4,
};

export const CustomerListToolbar = (props) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return(
  <div>
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
          Users
        </Typography>
        <Box sx={{ m: 1 }}>
          <Button
            startIcon={(<EditIcon fontSize="small" />)}
            sx={{ mr: 1 }}
          >
            Update
          </Button>
          <Button
            startIcon={(<ArchiveIcon fontSize="small" />)}
            sx={{ mr: 1 }}
          >
            Archive
          </Button>
            
          <Button
            onClick={handleOpen}
            color="primary"
            variant="contained"
            startIcon={(<AddIcon fontSize="small" />)}
          >
            Add Users
          </Button>
          <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2" marginBottom="5px">
                Create a User
              </Typography>
              <TextField id="standard-basic" label="First Name" variant="standard" />
              <TextField id="standard-basic" label="Last Name" variant="standard" />
              <TextField id="standard-basic" label="Email" variant="standard" />
              <Typography id="modal-modal-description" marginBottom="10px" sx={{ mt: 2 }}>
                Duis mollis, est non commodo luctus
              </Typography>
              <Button variant="contained">CONFIRM</Button>
            </Box>
          </Modal>
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
  </div>
  );}
