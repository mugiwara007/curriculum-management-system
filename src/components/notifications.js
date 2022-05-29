import Head from 'next/head';
import { Box, Container, Grid, Pagination } from '@mui/material';
import { products } from '../__mocks__/notifications';
import { NotificationsListToolbar } from './notifications/product-list-toolbar';
import { ProductCard } from './notifications/product-card';
import { DashboardLayout } from './dashboard-layout';
import { useEffect, useState } from 'react';
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from 'src/firebase/firebase-auth';


const Notifications = () => {

  const [notif, setNotif] = useState([])
  useEffect(() => {
    const q = query(collection(db, "users", localStorage.getItem('user_id'), "notifications"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const temp = [];
      querySnapshot.forEach((doc) => {
          temp.push(doc.data());
      });
      setNotif(temp)
    });
  }, [])
  
  return(
  <>
    <Head>
      <title>
        All Notifications
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth={false}>
        {/* <NotificationsListToolbar /> */}
        <Box sx={{ pt: 3 }}>
          <Grid
            container
            spacing={3}
          >
            {/* {products.map((product) => (
              <Grid
                item
                key={product.id}
                lg={4}
                md={6}
                xs={12}
              >
                <ProductCard product={product} />
              </Grid>
            ))} */}
            <Grid
                item
                lg={12}
                md={12}
                xs={12}
              >
                <ProductCard data={notif}/>
              </Grid>
          </Grid>
        </Box>
        {/* <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pt: 3
          }}
        >
          <Pagination
            color="primary"
            count={3}
            size="small"
          />
        </Box> */}
      </Container>
    </Box>
  </>
)
};

Notifications.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Notifications;
