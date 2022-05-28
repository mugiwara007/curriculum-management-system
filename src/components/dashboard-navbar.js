import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { AppBar, Avatar, Badge, Box, IconButton, Modal, Toolbar, Tooltip } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Bell as BellIcon } from '../icons/bell';
import { UserCircle as UserCircleIcon } from '../icons/user-circle';
import { Users as UsersIcon } from '../icons/users';
import { NotificationDiv } from 'src/components/NotificationList';
import { useEffect, useState } from 'react';
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from 'src/firebase/firebase-auth';
import { display } from '@mui/system';

const style = {
  width: '100%',
  maxWidth: 360,
  bgcolor: 'background.paper',
};

const DashboardNavbarRoot = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3]
}));

export const DashboardNavbar = (props) => {
  const { onSidebarOpen, ...other } = props;
  let [visibility,setVisibility] = useState('none');
  let [badgeNumber, setBadgeNumber] = useState(0)
  const [notif, setNotif] = useState([])

  const handleClick = () => {
    if(visibility == 'none'){
      setVisibility(visibility = 'visible');
    }else{
      setVisibility(visibility = 'none')
    }

  }

  useEffect(() => {
    const q = query(collection(db, "users", localStorage.getItem('user_id'), "notifications"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const temp = [];
      let ctr = 0;
      querySnapshot.forEach((doc) => {
          temp.push(doc.data());
          if(doc.data().on_read == false)
          {
            ctr += 1
          }
          
      });
      setNotif(temp)
      setBadgeNumber(ctr)
    });
  }, [])
  

  return (
    <>
    <NotificationDiv visibility = {visibility} data={notif} />
      <DashboardNavbarRoot
        sx={{
          left: {
            lg: 280
          },
          width: {
            lg: 'calc(100% - 280px)'
          }
        }}
        {...other}>
        <Toolbar
          disableGutters
          sx={{
            minHeight: 64,
            left: 0,
            px: 2
          }}
        >
          <IconButton
            onClick={onSidebarOpen}
            sx={{
              display: {
                xs: 'inline-flex',
                lg: 'none'
              }
            }}
          >
            <MenuIcon fontSize="small" />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
        
          <Tooltip title="Notifications">
            <IconButton sx={{ ml: 1 }}>
              <Badge
                badgeContent={badgeNumber}
                color="primary"
              >
                <BellIcon onClick={handleClick} 
                fontSize="small" />
                
              </Badge>
            </IconButton>
          </Tooltip>
          {/* <Avatar
            sx={{
              height: 40,
              width: 40,
              ml: 1
            }}
            src="/static/images/avatars/avatar_1.png"
          >
            <UserCircleIcon fontSize="small" />
          </Avatar> */}
        </Toolbar>
      </DashboardNavbarRoot>
    </>
  );
};

DashboardNavbar.propTypes = {
  onSidebarOpen: PropTypes.func
};
