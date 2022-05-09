import React, { useEffect, useState } from 'react'
import { Box, Button, Divider, Drawer, Typography, useMediaQuery } from '@mui/material';
import { NavItem } from './nav-item';
import { useAuth } from 'src/contexts/AuthContext';

export default function NavItemRender(props){

  let { userLevel } = useAuth()
  let admin = false
  let dean =false;
  let chairPerson = false;
  
  // useEffect(() => {
  //   if (userLevel == 1){
  //     admin=true
  //     dean=false
  //     chairPerson=false
  //   } else if(userLevel == 2) {
  //     admin=false
  //     dean=true
  //     chairPerson=false
  //   } else if(userLevel == 2) {
  //     admin=false
  //     dean=false
  //     chairPerson=true
  //   } 
  //   alert("UseEffect: "+userLevel)
  // }, [userLevel])

    return (
    <Box sx={{ flexGrow: 1 }}>

      {/* {admin ? <AdminSideBar items = {props.items} /> : <p></p>}
      {dean ? <DeanSideBar items = {props.items} /> : <p></p>}
      {chairPerson ? <ChairPersonSideBar items = {props.items} /> : <p></p>} */}

{props.items.map((item) => (
        <NavItem
        key={item.title}
        icon={item.icon}
        href={item.href}
        title={item.title}
      />
      
      ))}

      </Box>
    );
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