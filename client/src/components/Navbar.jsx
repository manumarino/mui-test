import React, { useState } from 'react';
import {
     LightModeOutlined,
     DarkModeOutlined,
     SettingsOutlined,
     ArrowDropDownOutlined,
     ChevronLeft,
     Language
 } from '@mui/icons-material';
 import MenuIcon from '@mui/icons-material/Menu';
 import FlexBetween from "components/FlexBetween";
 import { useDispatch } from 'react-redux';
 import { setMode } from 'state';
 import { Toolbar, useTheme, IconButton, Button, Box, Menu, MenuItem, styled } from '@mui/material';
 import MuiAppBar from '@mui/material/AppBar';
 import {useTranslation} from "react-i18next";
import LanguageSelector from './LanguageSelector';
 

const Navbar = ({
    
    user,
    open,
    setOpen,
    drawerWidth,
}) => {
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();
    const theme = useTheme();

    const [anchorEl, setAnchorEl] = useState(null);
    const isOpen = Boolean(anchorEl);
    const id = isOpen ? 'simple-popover' : undefined;
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
            <LanguageSelector/>
        </FlexBetween>
    </ToolbarB>
  </AppBar>
  );
}

export default Navbar;
