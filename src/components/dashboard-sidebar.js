import { useEffect } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Box, Button, Divider, Drawer, Typography, useMediaQuery } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { ChartBar as ChartBarIcon } from '../icons/chart-bar';
import { Cog as CogIcon } from '../icons/cog';
import { Lock as LockIcon } from '../icons/lock';
import { Selector as SelectorIcon } from '../icons/selector';
import { ShoppingBag as ShoppingBagIcon } from '../icons/shopping-bag';
import { User as UserIcon } from '../icons/user';
import { UserAdd as UserAddIcon } from '../icons/user-add';
import { Users as UsersIcon } from '../icons/users';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ArchiveIcon from '@mui/icons-material/Archive';
import SchoolIcon from '@mui/icons-material/School';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import LogoutIcon from '@mui/icons-material/Logout';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { XCircle as XCircleIcon } from '../icons/x-circle';
import { Logo } from './logo';
import { NavItem } from './nav-item';
import { useAuth } from 'src/contexts/AuthContext';
import NavItemRender from './nav-side-map';

const items = [
  {
    href: '/dashboard',
    icon: (<ChartBarIcon fontSize="small" />),
    title: 'Dashboard'
  },
  {
    href: '/customers',
    icon: (<UsersIcon fontSize="small" />),
    title: 'Users'
  },
  {
    href: '/subjects',
    icon: (<MenuBookIcon fontSize="small" />),
    title: 'Subjects'
  },
  {
    href: '/departments',
    icon: (<HomeWorkIcon fontSize="small" />),
    title: 'Departments'
  },
  {
    href: '/colleges',
    icon: (<SchoolIcon fontSize="small" />),
    title: 'Colleges'
  },
  {
    href: '/curriculum',
    icon: (<LocalLibraryIcon fontSize="small" />),
    title: 'Curriculum'
  },
  {
    href: '/archives',
    icon: (<ArchiveIcon fontSize="small" />),
    title: 'Archives'
  },
  {
    href: '/notifications',
    icon: (<NotificationsActiveIcon fontSize="small" />),
    title: 'All Notification'
  },
  {
    href: '/account',
    icon: (<UserIcon fontSize="small" />),
    title: 'Account'
  },
  {
    href: '/settings',
    icon: (<CogIcon fontSize="small" />),
    title: 'Settings'
  }
];

export const DashboardSidebar = (props) => {
  const { open, onClose } = props;
  const router = useRouter();
  const { userLevel } = useAuth()
  const { signout } = useAuth()
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'), {
    defaultMatches: true,
    noSsr: false
  });

  useEffect(
    () => {
      if (!router.isReady) {
        return;
      }

      if (open) {
        onClose?.();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.asPath]
  );

  const content = (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}
      >
        <div>
          <Box sx={{ px: 2, my: 3, mx: 3 }}>
          <div>
          <Box sx={{ mx: 6 }}>
                <img
              alt="Bulsu Image"
              src="/static/images/bulsu logo png.png"
              loading="lazy"
              width="85%"
            />
            </Box>
                <Typography
                  color="inherit"
                  variant="subtitle1"
                >
                  Curriculum Management
                </Typography>
              </div>
            {/* <Box
              sx={{
                alignItems: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                px: 3,
                py: '11px',
                borderRadius: 1
              }}
            >
              <div>
                <Typography
                  color="inherit"
                  variant="subtitle1"
                >
                  Acme Inc
                </Typography>
                <Typography
                  color="neutral.400"
                  variant="body2"
                >
                  Your tier
                  {' '}
                  : Premium
                </Typography>
              </div>
              <SelectorIcon
                sx={{
                  color: 'neutral.500',
                  width: 14,
                  height: 14
                }}
              />
            </Box> */}
          </Box>
        </div>
        {/* <Divider
          sx={{
            borderColor: '#2D3748',
            my: 3
          }}
        /> */}
        <Box sx={{ flexGrow: 1 }}>
            {items.map((item) => (
            <NavItem
            key={item.title}
            icon={item.icon}
            href={item.href}
            title={item.title}
          />
          ))}
            {/* <NavItemRender items={items} /> */}
           <NavItem
              key="Sign Out"
              icon={(<LogoutIcon fontSize="small" />)}
              href="/"
              title="Sign Out"
              onClick={() => signout()}
            />
        </Box>
        <Divider sx={{ borderColor: '#2D3748' }} />
      </Box>
    </>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: 'neutral.900',
            color: '#FFFFFF',
            width: 280
          }
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: 'neutral.900',
          color: '#FFFFFF',
          width: 280
        }
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

DashboardSidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool
};
