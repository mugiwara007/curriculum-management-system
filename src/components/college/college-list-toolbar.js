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
import { useAuth } from 'src/contexts/AuthContext'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { collAuth } from '../data-handling/college-crud';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import * as Yup from 'yup';
import * as React from 'react';
import { ref, uploadBytes, getStorage, listAll, getDownloadURL } from 'firebase/storage'
import {v4} from 'uuid'
import { AltRoute } from '@mui/icons-material';
import { storage, db } from 'src/firebase/firebase-auth';
import { collection, addDoc, doc, updateDoc } from "firebase/firestore"; 
import { getArchivelist, setArchivelist, setArchiveDisable } from '../userModel';
import Link from '@mui/material/Link';



export default function FormDialog() {
  const [open, setOpen] = React.useState(false);
  const [imageUpload, setImageUpload] = React.useState(null);
  const [imagesList, setimageList] = React.useState([]);
  const [image, setImage] = React.useState(null)
  const { currentUser } = useAuth()
  const { addCollege } = collAuth()
  const imageListRef = ref(storage, "CollegeLogos/")
  const uploadImage = () => 
  {
    const imageRef = ref(storage, "CollegeLogos/" +  "CICT/" + imageUpload.name + v4());

    uploadBytes(imageRef, imageUpload).then((snapshot) => 
    {
      getDownloadURL(snapshot.ref).then(url => {
        setImage(url)
        img = url
      })
    })
  };

  React.useEffect(() => 
  {
    listAll(imageListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setimageList((prev) => [...prev, url]);
        });
      });
      console.log(response)
    });
  }, []);

  const formik = useFormik({
    initialValues:
    {
      cCode: '',
      cDesc: '',
      cLogo: ''
    },
    validationSchema: Yup.object({
      cCode: Yup
        .string()
        .max(11)
        .required(
          'College Code is required'),
      cDesc: Yup
        .string()
        .max(255)
        .required(
          'College Description is required'),
      cLogo: Yup
        .string()
        .max(11)
        .required(
          'College Logo is required')
    }),

    onSubmit: async() => 
    {
      // if (currentUser)
      // {
      //   addCollege(
      //     formik.values.cCode,
      //     formik.values.cDesc,
      //     formik.values.cLogo,
      //   )

      //   formik.setSubmitting(false)
      // }

      
    }
  });
  

  const addCollegeFunc = async() =>{
    const imageRef = ref(storage, "CollegeLogos/" +  "CICT/" + imageUpload.name + v4());
    var img = ''
    uploadBytes(imageRef, imageUpload).then((snapshot) => 
    {
      getDownloadURL(snapshot.ref).then(async(url)=> {
        const docRef = await addDoc(collection(db, "colleges"), {
          coll_code: formik.values.cCode,
          coll_desc: formik.values.cDesc,
          coll_logo: url,
          archive:false
        });
        setOpen(false);
      })
    })
  }
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function showLogo()
  {
    imagesList.map((url) => {
      // eslint-disable-next-line react/jsx-key
      return <img src={url}/>;
    })
  };

  return (
    <div style={{display : 'inline-block'}} >
      <Button
          color="primary"
          variant="contained"
          startIcon={(<AddIcon fontSize="small" />)}
          onClick={handleClickOpen}
        >
          Add college
        </Button>
      <Dialog open={open}
      onClose={handleClose}>
        <DialogTitle
        display="flex"
        justifyContent="center"
        >Add College</DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent>
            <TextField
                error={Boolean(formik.touched.cCode && formik.errors.cCode)}
                fullWidth
                helperText={formik.touched.cCode && formik.errors.cCode}
                label="College Code"
                margin="normal"
                name="cCode"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.cCode}
                variant="outlined"
              />

              <TextField
                error={Boolean(formik.touched.cDesc && formik.errors.cDesc)}
                fullWidth
                helperText={formik.touched.cDesc && formik.errors.cDesc}
                label="College Description"
                margin="normal"
                name="cDesc"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.cDesc}
                variant="outlined"
              />
              <TextField
                // error={Boolean(formik.touched.cLogo && formik.errors.cLogo)}
                // helperText={formik.touched.cLogo && formik.errors.cLogo}
                // margin="normal"
                // name="cLogo"
                // accept=".jpg, .png, .jpeg"
                // onBlur={formik.handleBlur}
                // onChange={formik.handleChange}
                // value={formik.values.cLogo}
                // variant="outlined"
                fullWidth
                type="file"
                onChange={(event) => {
                  setImageUpload(event.target.files[0])
                }
                }
              />
                {/* {imagesList.map((url) => {return <img src={url}/>;})} */}
                {/* {showLogo()} */}
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
                    disabled={formik.isSubmitting}
                    type="submit"
                    onClick={addCollegeFunc}>Done
                  </Button>
              </Box>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  ); 
  // export {imagesList, setimageList};
}

// export function showLogo()
// {
//   imagesList.map((url) => {
//     return <img src={url}/>;
//   })
// }

// export { imageFunction };


function SimpleDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    if(getArchivelist() == null || getArchivelist() == '' || getArchivelist().length < 1){
      alert('Please select item/s first.')
    }
    else{
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleArchived = () =>{
    getArchivelist().map(async(data)=>{
      const user = doc(db, "colleges", data);
      await updateDoc(user, {
        archive: true
      });
    })
    setOpen(false);
    setArchivelist('')
  }

  return (
    <div style={{display : 'inline-block'}} >
        <Button
          startIcon={(<ArchiveIcon fontSize="small" />)}
          sx={{ mr: 1 }}
          onClick={handleClickOpen}
        >
          Archive
        </Button>
      <Dialog open={open}
      onClose={handleClose}
      >
        <DialogTitle
        display="flex"
        justifyContent="center" >Archive Data</DialogTitle>

        <DialogContent>
          <Box>
            Are you sure you want to Archive this data?
          </Box>
        </DialogContent>

        <DialogActions>
          <Box>
            <Button
            color="primary"
            onClick={handleClose}>Cancel
            </Button>
          </Box>
          <Box pr={1}>
            <Button
             style={{
              borderRadius: 10,
              backgroundColor: "#FF0000",
              padding: "5px 10px",
              fontSize: "13px"
              }}
            color="primary"
            variant='contained'
            onClick={handleArchived }>Comfirm
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
      </div>
  );
}


export const CollegeListToolbar = (props) => {
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
        College
      </Typography>
      <Box sx={{ m: 1 }}>
        <SimpleDialog>
        </SimpleDialog>
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
            <Link onClick={()=>{router.push('/college_archive')}} sx={{marginTop:'auto', cursor:'pointer'}}>College Archive List</Link>
          </Box>
        </CardContent>
      </Card>
    </Box>
  </Box>)
};





