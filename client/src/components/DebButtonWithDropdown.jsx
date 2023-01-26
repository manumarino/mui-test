import * as React from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import { ListItemIcon, ListItemText } from "@mui/material";


export default function DebButtonWithDropdown({buttons, ...props}) {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);


  const handleMenuItemClick = (action) => {
    action();
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  return (
    <React.Fragment>
      <ButtonGroup
        {...props}
        variant="contained"
        ref={anchorRef}
        aria-label="split button">
        {buttons
          ?.filter((elem) => !elem.showInMenu)
          .map((elem) => {
            return (
              <Button key={elem.label} onClick={elem.action}>
                {elem.icon}{elem.label}
              </Button>
            );
          })}
        {buttons?.filter(elem => elem.showInMenu).length > 0 && <Button
          size="small"
          aria-controls={open ? "split-button-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-label="select merge strategy"
          aria-haspopup="menu"
          onClick={handleToggle}>
          <ArrowDropDownIcon />
        </Button>}
      </ButtonGroup>
      <Popper
        sx={{
          zIndex: 1,
        }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        placement="bottom-end"
        >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}>
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu" autoFocusItem>
                  {buttons
                    ?.filter((elem) => elem.showInMenu)
                    .map((elem) => {
                      return (
                        <MenuItem key={elem.label} onClick={() => handleMenuItemClick(elem.action)}>
                          {elem.icon && <ListItemIcon>
                            {elem.icon}
                          </ListItemIcon>}
                          <ListItemText>
                            {elem.label}
                          </ListItemText>
                        </MenuItem>
                      );
                    })}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </React.Fragment>
  );
}
