import React from 'react';
import {
    Box,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    useTheme
} from "@mui/material";
import {
    ChevronLeft,
    ChevronRightOutlined,
    Store,
    HistoryEdu,
    PeopleAlt,
    MobileFriendly,
    Apartment
} from "@mui/icons-material";
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import FlexBetween from './FlexBetween';


const navItems = [
    
    {
        text: "Compañías",
        icon: <Apartment/>,
        path: "companies"
    },
    {
        text: "Sucursales",
        icon: <Store/>,
        path: "branches"
    },
    {
        text: "Licencias",
        icon: <HistoryEdu/>,
        path: "licences"
    },
    {
        text: "Usuarios",
        icon: <PeopleAlt/>,
        path: "users"
    },
    {
        text: "Conexión con Mobile",
        icon: <MobileFriendly/>,
        path: "mobile-connection"
    }
]

const Sidebar = ({
    user,
    drawerWidth,
    open,
    setOpen,
    isNonMobile
}) => {
    const {pathname} = useLocation();
    const [active, setActive] = useState("");
    const navigate = useNavigate();
    const theme = useTheme();

    useEffect(() => {
        setActive(pathname.substring(1));
    }, [pathname])

  return (
    <Drawer 
        sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            bgcolor: theme.palette.primary[500],
            borderWidth: 0,
            },
        }}
        variant="persistent"
        anchor="left"
        open={!open}
    >
        
        <Box width="100%">
        <Box m="1.5rem 2rem 2rem 2rem">
            <FlexBetween color={theme.palette.secondary[200]} display="flex" alignItems="center">
                <Box 
                    component="img"
                    alt="profile"
                    src={require('../img/logo.svg').default}
                    width="100%"
                    sx={{objectFit: "cover"}}
                    style={{cursor:'pointer'}}
                    onClick={() => {
                        navigate(`/debdash`);                            
                        }}
                /> 
                
                {!isNonMobile && (
                    <IconButton onClick={() => setOpen(!open)}>
                        <ChevronLeft />
                    </IconButton>
                )}
            </FlexBetween>
        </Box>
        <List>
            {navItems.map(({text, icon, path}) => {
                
                return (
                    <ListItem key={text} disablePadding>
                        <ListItemButton onClick={() => {
                            navigate(`/${path}`); 
                            setActive(path);
                            }}
                            sx={{
                                backgroundColor: active === path ? theme.palette.primary[700] : "transparent",
                                color: active === path 
                                ? theme.palette.secondary[200]
                                : theme.palette.primary[900],
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    ml: "1rem",
                                    color: active === path 
                                    ? theme.palette.secondary[200]
                                    : theme.palette.primary[900],
                                }}
                            >
                                {icon}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                            {active === path && (
                                <ChevronRightOutlined sx={{ml: "auto"}} />
                            )}
                        </ListItemButton>
                    </ListItem>
                );
            })}
        </List>
        </Box>


    </Drawer>

  );
}

export default Sidebar;

