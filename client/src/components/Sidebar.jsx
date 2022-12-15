import React from 'react';
import {
    Box,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typhography,
    Typography,
    useTheme
} from "@mui/material";
import {
    SettingsOutlined,
    ChevronLeft,
    ChevronRightOutlined,
    HomeOutlined,
    ShoppingCartOutlined,
    Groups2Outlined,
    ReceiptLongOutlined,
    PublicOutlined,
    PointOfSaleOutlined,
    TodayOutlined,
    CalendarMonthOutlined,
    AdminPanelSettingsOutlined,
    TrendingUpOutlined,
    PieChartOutlined,
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
        text: "DebDash",
        icon: <HomeOutlined/>,
        path: "debdash"
    },
    {
        text: "Compañìas",
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
    isSidebarOpen,
    setIsSidebarOpen,
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
    <Box component="nav">
        {isSidebarOpen && (
            <Drawer 
                open={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
                variant="persistent"
                anchor="left"
                sx={{
                    width: drawerWidth,
                    "& .MuiDrawer-paper": {
                        color:theme.palette.primary[900],
                        backgroundColor: theme.palette.primary[500],
                        boxSizing: "border-box",
                        borderWidth: isNonMobile ? 0 : "2px",
                        width: drawerWidth
                    }
                }}
            >
                <Box width="100%">
                <Box m="1.5rem 2rem 2rem 2rem">
                    <FlexBetween color={theme.palette.secondary[200]} display="flex" alignItems="center">
                        <Box 
                        component="img"
                        alt="profile"
                        src={require('../img/logo.svg').default}
                        width="100%"
                        sx={{objectFit: "cover"}} /> 
                        
                        {!isNonMobile && (
                            <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                                <ChevronLeft />
                            </IconButton>
                        )}
                    </FlexBetween>
                </Box>
                <List>
                    {navItems.map(({text, icon, path}) => {
                        /*
                        if(!icon) {
                            return (
                                <Typography key={text} sx={{m:"2.25rem 0 1rem 2rem"}}>
                                    {text}
                                </Typography>
                            );
                        }
                        */
                        const lcText = text.toLowerCase();

                        return (
                            <ListItem key={text} disablePadding>
                                <ListItemButton onClick={() => {
                                    navigate(`/${path}`); 
                                    setActive(path);
                                    }}
                                    sx={{
                                        backgroundColor: active === path ? theme.palette.secondary[700] : "transparent",
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
        )}
    </Box>
  );
}

export default Sidebar;

