import React, {useState} from 'react';
import {useTranslation} from "react-i18next";
import {Button, Menu, MenuItem, useTheme} from '@mui/material';
import {
    ArrowDropDownOutlined,
    Language
} from '@mui/icons-material';

function LanguageSelector() {

    const { t, i18n } = useTranslation();
    const theme = useTheme();
    const [anchorEl, setAnchorEl] = useState(null);
    const isOpen = Boolean(anchorEl);
    const id = isOpen ? 'simple-popover' : undefined;
    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);



  return (
    <>
        <Button onClick={handleClick}
            aria-describedby={id} 
            variant="contained"
            sx={{
                display: "flex", 
                justifyContent: "space-between", 
                alignItems: "center", 
                textTransform: "none", 
                gap: "0.7rem",
                background: "none",
                boxShadow: "none",
                border: 1,
                borderRadius: "0.4rem",
                borderColor: theme.palette.secondary[200]
            }}
            >
            <Language
            sx={{color: theme.palette.secondary[200]}} />
            <ArrowDropDownOutlined 
            sx={{color: theme.palette.secondary[200]}} />
        </Button>
        <Menu id={id} anchorEl={anchorEl} open={isOpen} onClose={handleClose} anchorOrigin={{vertical:"bottom", horizontal:"right"}}>
            <MenuItem onClick={() => i18n.changeLanguage("es")} sx={{fontSize:"0.8rem"}}>{t("LANGUAGES.SPANISH")}</MenuItem>
            <MenuItem onClick={() => i18n.changeLanguage("en")} sx={{fontSize:"0.8rem"}}>{t("LANGUAGES.ENGLISH")}</MenuItem>
        </Menu>        
    </>
  )
}

export default LanguageSelector
