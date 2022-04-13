
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

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import * as React from 'react';

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={{display : 'inline-block'}} >
      <Button
          color="primary"
          variant="contained"
          startIcon={(<AddIcon fontSize="small" />)}
          onClick={handleClickOpen}
        >
          Add curriculum
        </Button>
      <Dialog open={open}
      onClose={handleClose}>
        <DialogTitle
        display="flex"
        justifyContent="center"
        >Add Curriculum</DialogTitle>
        <DialogContent>

              <TextField
                required
                autoFocus
                margin="dense"
                id="currCode"
                label="Curriculum Code"
                type="text"
                fullWidth
                variant="outlined"
              />

              <TextField
                required
                autoFocus
                margin="dense"
                id="cmo"
                label="CMO"
                type="text"
                fullWidth
                variant="outlined"
              />

              <TextField
                required
                autoFocus
                margin="dense"
                id="version"
                label="Version"
                type="number"
                fullWidth
                variant="outlined"
              />

              <TextField
                required
                autoFocus
                margin="dense"
                id="version"
                label="Version"
                type="date"
                fullWidth
                variant="outlined"
              />

              <TextField
                required
                autoFocus
                margin="dense"
                id="version"
                label="Version"
                type="date"
                fullWidth
                variant="outlined"
              />

              <TextField
                required
                autoFocus
                margin="dense"
                id="depCode"
                label="Department Code"
                type="text"
                fullWidth
                variant="outlined"
              />

              <TextField
                required
                autoFocus
                margin="dense"
                id="userName"
                label="Username"
                type="text"
                fullWidth
                variant="outlined"
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
                onClick={handleClose}>Done
              </Button>
          </Box>
        </DialogActions>
      </Dialog>
      </div>
  );
}

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
        <FormDialog>
        </FormDialog>
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
