import React from 'react';
import { ChevronLeft } from '@mui/icons-material';
 import MenuIcon from '@mui/icons-material/Menu';
 import FlexBetween from "components/FlexBetween";
 import { Toolbar, IconButton, styled } from '@mui/material';
 import MuiAppBar from '@mui/material/AppBar';
import MenuNav from './MenuNav';
 

const Navbar = ({
    open,
    setOpen,
    drawerWidth,
}) => {
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
        <MenuNav/>
    </ToolbarB>
  </AppBar>
  );
}

export default Navbar;
