import React, {useState} from 'react';
import {Box, CssBaseline, styled, useMediaQuery, useTheme} from "@mui/material";
import {Outlet} from "react-router-dom";
import { useSelector } from 'react-redux';
import Navbar from "components/Navbar";
import Sidebar from "components/Sidebar";
import DrawerHeader from 'components/DrawerHeader';

const drawerWidth = 250;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(!open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const Layout = () => {
  
    const theme = useTheme();
    const isNonMobile = useMediaQuery("(min-width: 600px");
    const [open, setOpen] = React.useState(false);

   

  return (
  <Box display={isNonMobile ? "flex" : "block" } width="100%" height="100%" backgroundColor={theme.palette.primary[800]}>
    
    <CssBaseline />
    <Navbar 
        open={open}
        setOpen={setOpen}
        drawerWidth={drawerWidth}
    />

    <Sidebar 
        isNonMobile={isNonMobile}
        open={open}
        setOpen={setOpen}
        drawerWidth={drawerWidth}
        
    />
    
    <Main open={open}>
      <DrawerHeader />
      <Outlet />
    </Main>
    
    
  </Box>
  );
}

export default Layout;
