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
          Add department
        </Button>
      <Dialog open={open}
      onClose={handleClose}>
        <DialogTitle
        display="flex"
        justifyContent="center">Add Department</DialogTitle>
        <DialogContent>

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
                id="description"
                label="Description"
                type="text"
                fullWidth
                variant="outlined"
              />

              <TextField
                required
                autoFocus
                margin="dense"
                id="colCode"
                label="College Code"
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

export const DepartmentListToolbar = (props) => (
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
        Department
      </Typography>
      <Box sx={{ m: 1 }}>
        <Button
          startIcon={(<ArchiveIcon fontSize="small" />)}
          sx={{ mr: 1 }}
        >
          Archive
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
