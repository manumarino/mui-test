import React, { useState } from "react";
import {
  LightModeOutlined,
  DarkModeOutlined,
  Menu as MenuIcon,
  ArrowDropDownOutlined,
  Language,
  Person,
  Logout,
} from "@mui/icons-material";
import FlexBetween from "components/FlexBetween";
import { useDispatch } from "react-redux";
import { setMode } from "state";
import {
  AppBar,
  Toolbar,
  useTheme,
  IconButton,
  InputBase,
  Button,
  Box,
  Menu,
  MenuItem,
  Typography,
  Icon,
  ListItemIcon,
  ListItemText,
  MenuList,
  ListItem,
  Divider,
  Avatar,
} from "@mui/material";

const user = {
  name: "Maryam",
  lastName: " Burgess",
  profile: "Company Administrator",
  id: 1,
};

const availableLangs = [
  {
    key: "es",
    label: "Español",
  },
  {
    key: "en",
    label: "Ingles",
  },
  {
    key: "pt",
    label: "Portugués",
  },
];

function handleChangeLang(lang) {
  console.log("Handle change lang to: ", lang);
}

const Navbar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [showLangs, setShowLangs] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => {
    setAnchorEl(null);
    setShowLangs(false);
  };
  const handleLogout = () => {
    console.log("handle logout");
    handleClose();
  };

  return (
    <AppBar
      sx={{
        position: "static",
        background: "none",
        boxShadow: "none",
      }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* LEFT SIDE */}
        <FlexBetween gap="1.5rem">
          <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <MenuIcon />
          </IconButton>
        </FlexBetween>

        {/* RIGHT SIDE */}
        <FlexBetween gap="1.5rem">
          <FlexBetween>
            <Button
              onClick={handleClick}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                textTransform: "none",
                gap: "1rem",
              }}>
                <Avatar>
              <Person
                sx={{
                  fontSize: "25px",
                  color: theme.palette.primary[800],
                }}></Person>

                </Avatar>

              <Box textAlign="left">
                <Typography
                  fontWeight="bold"
                  fontSize="0.85rem"
                  sx={{ color: theme.palette.secondary[100] }}>
                  {user.name}
                </Typography>
                <Typography
                  fontSize="0.75rem"
                  sx={{ color: theme.palette.secondary[100] }}>
                  {user.profile}
                </Typography>
              </Box>
              <ArrowDropDownOutlined
                sx={{ color: theme.palette.secondary[200] }}
              />
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={isOpen}
              onClose={handleClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              disableScrollLock={true}>
              <MenuItem onClick={() => dispatch(setMode())}>
                <ListItemIcon>
                  {theme.palette.mode === "dark" ? (
                    <LightModeOutlined sx={{ fontSize: "25px" }} />
                  ) : (
                    <DarkModeOutlined sx={{ fontSize: "25px" }} />
                  )}
                </ListItemIcon>
                <ListItemText>
                  {theme.palette.mode === "dark" ? "Light Mode" : "Dark Mode"}
                </ListItemText>
              </MenuItem>
              <Divider></Divider>
              <MenuItem onClick={() => setShowLangs(!showLangs)}>
                <ListItemIcon>
                  <Language sx={{ fontSize: "25px" }}></Language>
                </ListItemIcon>
                <ListItemText>Idioma</ListItemText>
              </MenuItem>
              {showLangs && (
                <MenuList>
                  {availableLangs.map((lang) => (
                    <MenuItem
                      key={lang.key}
                      onClick={() => handleChangeLang(lang.key)}>
                      {lang.label}
                    </MenuItem>
                  ))}
                </MenuList>
              )}
              <Divider></Divider>
              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <Logout />
                </ListItemIcon>
                <ListItemText>Log Out</ListItemText>
              </MenuItem>
            </Menu>
          </FlexBetween>
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
