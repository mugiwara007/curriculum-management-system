import PropTypes from 'prop-types';
import { Avatar, Box, Card, CardContent, Divider, Grid, Typography, CardActions, Button } from '@mui/material';
import { Clock as ClockIcon } from '../../icons/clock';
import { Download as DownloadIcon } from '../../icons/download';

import { doc, updateDoc, collection } from "firebase/firestore";
import { db } from 'src/firebase/firebase-auth';
export const ProductCard = (props) => (
  <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
 <CardContent>
       <Box
         sx={{
           justifyContent: 'center',
           pb: 3
         }}
       >
         {props.data && props.data.reverse().map((data, key)=>{
           return(
            <Card sx={{ width:'100%' }} key={key}>
              <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                {data.message}
                </Typography>

                <Typography sx={{ fontSize: 14, fontStyle:'italic' }} color="text.secondary" gutterBottom>
                {data.date}
                </Typography>
              </CardContent>
              <CardActions>
                {data.on_read == false ?<Button size="small"
                onClick={async()=>{
                  const notif = doc(db, "users", localStorage.getItem('user_id'));
                  const notif_collection = collection(notif, "notifications")

                  // Set the "capital" field of the city 'DC'
                  await updateDoc(doc(notif_collection, data.notif_id), {
                    on_read: true,
                  });
                }}
                >Mark as Read</Button> : <Button size="small" disabled={true}>Mark as Read</Button>}
              </CardActions>
            </Card>
           )
         })
        }
       </Box>
       <Typography
         align="center"
         color="textPrimary"
         gutterBottom
         variant="h5"
       >
       </Typography>
       <Typography
         align="center"
         color="textPrimary"
         variant="body1"
       >
       </Typography>
     </CardContent>
  </Card>
);
// export const ProductCard = ({ product, ...rest }) => (
//   <Card
//     sx={{
//       display: 'flex',
//       flexDirection: 'column',
//       height: '100%'
//     }}
//     {...rest}
//   >
//     <CardContent>
//       <Box
//         sx={{
//           display: 'flex',
//           justifyContent: 'center',
//           pb: 3
//         }}
//       >
//         <Avatar
//           alt="Product"
//           src={product.media}
//           variant="square"
//         />
//       </Box>
//       <Typography
//         align="center"
//         color="textPrimary"
//         gutterBottom
//         variant="h5"
//       >
//         {product.title}
//       </Typography>
//       <Typography
//         align="center"
//         color="textPrimary"
//         variant="body1"
//       >
//         {product.description}
//       </Typography>
//     </CardContent>
//     <Box sx={{ flexGrow: 1 }} />
//     <Divider />
//     <Box sx={{ p: 2 }}>
//       <Grid
//         container
//         spacing={2}
//         sx={{ justifyContent: 'space-between' }}
//       >
//         <Grid
//           item
//           sx={{
//             alignItems: 'center',
//             display: 'flex'
//           }}
//         >
//           <ClockIcon color="action" />
//           <Typography
//             color="textSecondary"
//             display="inline"
//             sx={{ pl: 1 }}
//             variant="body2"
//           >
//             Notification Received Date Here
//           </Typography>
//         </Grid>
//       </Grid>
//     </Box>
//   </Card>
// );

ProductCard.propTypes = {
  product: PropTypes.object.isRequired
};
