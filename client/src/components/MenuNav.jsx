import React, { useState } from "react";
import {useTranslation} from "react-i18next";
import {
  LightModeOutlined,
  DarkModeOutlined,
  ArrowDropDownOutlined,
  Language,
  Person,
  Logout,
} from "@mui/icons-material";
import FlexBetween from "components/FlexBetween";
import { useDispatch } from "react-redux";
import { setMode } from "state";
import {
  useTheme,
  Button,
  Box,
  Menu,
  MenuItem,
  Typography,
  ListItemIcon,
  ListItemText,
  MenuList,
  Divider,
  Avatar,
} from "@mui/material";



function MenuNav() {

    const { t, i18n } = useTranslation();
    const theme = useTheme();
    const [anchorEl, setAnchorEl] = useState(null);
    const isOpen = Boolean(anchorEl);
    const id = isOpen ? 'simple-popover' : undefined;
    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);
    const dispatch = useDispatch();

    const [showLangs, setShowLangs] = useState(false);

    const user = {
        name: "Maryam",
        lastName: " Burgess",
        profile: "Company Administrator",
        id: 1,
    };
    
    const availableLangs = [
        {
        key: "es",
        label: t("LANGUAGES.SPANISH"),
        },
        {
        key: "en",
        label: t("LANGUAGES.ENGLISH"),
        },
    ];

    const handleLogout = () => {
        console.log("handle logout");
        handleClose();
    };

    return (
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
                <ListItemText>{t("LANGUAGE")}</ListItemText>
              </MenuItem>
              {showLangs && (
                <MenuList
                sx={{color: theme.palette.secondary[200]}}>
                  {availableLangs.map((lang) => (
                    <MenuItem
                      key={lang.key}
                      onClick={() => i18n.changeLanguage(lang.key)}
                      sx={{fontSize:"0.75rem"}}>
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
  )
}

export default MenuNav
