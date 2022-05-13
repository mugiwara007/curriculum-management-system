
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
import NextLink from 'next/link';
import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Link from '@mui/material/Link';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function FormDialog()
{
  const [open, setOpen] = React.useState(false);
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
          color="primary"
          variant="contained"
          startIcon={(<AddIcon fontSize="small" />)}
          onClick={handleClickOpen}
          >
            Add Curriculum
          </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle
          display="flex"
          justifyContent="center"
          >Add Curriculum</DialogTitle>
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
                  onClick={handleClose}>
                    Done
                </Button>
              </Box>
          </DialogActions>
        </Dialog>
    </div>
  );
}

export const CurriculumListToolbar = (props) => 
{
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
        Curriculum
      </Typography>
      <Box sx={{ m: 1 }}>
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
  </Box>)
};