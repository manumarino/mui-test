import React, { useState } from 'react';
import {
     LightModeOutlined,
     DarkModeOutlined,
     Menu as MenuIcon,
     Search,
     SettingsOutlined,
     ArrowDropDownOutlined,
     ChevronLeft,
 } from '@mui/icons-material';
 import FlexBetween from "components/FlexBetween";
 import { useDispatch } from 'react-redux';
 import { setMode } from 'state';
 import profileImage from "../assets/profile.png";
 import { Toolbar, useTheme, IconButton, InputBase, Button, Box, Menu, MenuItem, Typography, styled } from '@mui/material';
 import MuiAppBar from '@mui/material/AppBar';

 

const Navbar = ({
    
    user,
    open,
    setOpen,
    drawerWidth,
}) => {
    const dispatch = useDispatch();
    const theme = useTheme();

    const [anchorEl, setAnchorEl] = useState(null);
    const isOpen = Boolean(anchorEl);
    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    const iconSlided = <IconButton 
                        style={{display: !open ? 'none' : 'flex'}}
                        onClick={() => setOpen(!open)}>
                            <MenuIcon sx={{fontSize: "1.3rem"}} />              
                        </IconButton>
    
    const iconNotSlided = <IconButton 
                            style={{display: open ? 'none' : 'flex'}}
                            onClick={() => setOpen(!open)}>
                                <ChevronLeft sx={{fontSize: "1.3rem"}} />              
                            </IconButton>

    const AppBar = styled(MuiAppBar, {
        shouldForwardProp: (prop) => prop !== 'open',
    })(({ theme, open }) => ({
        transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
        }),
        ...(!open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        })
    }));

    const ToolbarB = styled(Toolbar)(({theme}) => ({
        [theme.breakpoints.down('xl')]: {
            minHeight: "55px"
            } 
    }));
    

    

  return (
  <AppBar
        position="fixed"
        sx={{
            background: "none",
            boxShadow: "none",
        }}
        open={open}
  >
    <ToolbarB sx={{ justifyContent:"space-between" }}>
        {/* LEFT SIDE */}
        <FlexBetween gap="1.5rem">
            
            {iconSlided}
            {iconNotSlided}

            
        </FlexBetween>

        {/* RIGHT SIDE */}
        <FlexBetween gap="1.5rem">
            <IconButton onClick={() => dispatch(setMode())}>
                {theme.palette.mode === 'dark' ? (
                    <LightModeOutlined sx={{fontSize: "1.3rem"}} />
                ) : (
                    <DarkModeOutlined sx={{fontSize: "1.3rem"}} />
                )}
            </IconButton>
            <IconButton>
                <SettingsOutlined sx={{fontSize: "1.3rem"}} />
            </IconButton>

            <FlexBetween>
                <Button onClick={handleClick} sx={{
                    display: "flex", 
                    justifyContent: "space-between", 
                    alignItems: "center", 
                    textTransform: "none", 
                    gap: "1rem"}} >
                    
                    <Box
                            component="img"
                            alt="profile"
                            src={profileImage}
                            height="32px"
                            width="32px"
                            borderRadius="50%"
                            sx={{objectFit: "cover"}}
                    />
                    <Box textAlign="left">
                        <Typography fontWeight="bold" fontSize="0.85rem" sx={{color: theme.palette.secondary[100]}} >
                            {user.name}
                        </Typography>
                        <Typography  fontSize="0.75rem" sx={{color: theme.palette.secondary[100]}} >
                            {user.occupation}
                        </Typography>
                    </Box>
                    <ArrowDropDownOutlined 
                    sx={{color: theme.palette.secondary[200]}} />
                </Button>
                <Menu anchorEl={anchorEl} open={isOpen} onClose={handleClose} anchorOrigin={{vertical:"bottom", horizontal:"center"}}>
                    <MenuItem onClick={handleClose}>Log Out</MenuItem>
                </Menu>
            </FlexBetween>

        </FlexBetween>
    </ToolbarB>
  </AppBar>
  );
}

export default Navbar;
