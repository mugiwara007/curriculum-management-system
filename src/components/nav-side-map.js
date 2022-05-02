import React, { useState } from 'react'
import { Box, Button, Divider, Drawer, Typography, useMediaQuery } from '@mui/material';
import { NavItem } from './nav-item';
import { useAuth } from 'src/contexts/AuthContext';

export default function NavItemRender(props){
    const { userLevel } = useAuth()
    const [admin, setAdmin] = useState(false);
    const [dean, setDean] = useState(false);
    const [chairPerson, setChairPerson] = useState(false);

    if (userLevel == 1){
        setAdmin(true)
        setDean(false)
        setChairPerson(false)
    } else if(userLevel == 2) {
        setAdmin(false)
        setDean(true)
        setChairPerson(false)
    } else if(userLevel == 2) {
        setAdmin(false)
        setDean(false)
        setChairPerson(true)
    } 

    return (
    <Box sx={{ flexGrow: 1 }}>
      {admin ? <AdminSideBar items = {props.items} /> : <p></p>}
      {dean ? <DeanSideBar items = {props.items} /> : <p></p>}
      {chairPerson ? <ChairPersonSideBar items = {props.items} /> : <p></p>}
      </Box>
    )
  }

  function AdminSideBar(props){
    {props.items.map((item) => (
        <NavItem
        key={item.title}
        icon={item.icon}
        href={item.href}
        title={item.title}
      />
      
      ))}
  }

  function DeanSideBar(props){
    {props.items.map((item) => (
        <NavItem
        key={item.title}
        icon={item.icon}
        href={item.href}
        title={item.title}
      />
      
      ))}
  }

  function ChairPersonSideBar(props){
    {props.items.map((item) => (
        <NavItem
        key={item.title}
        icon={item.icon}
        href={item.href}
        title={item.title}
      />
      
      ))}
  }