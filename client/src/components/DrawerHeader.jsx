import { styled } from '@mui/system';
import React from 'react'

const Header = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
    [theme.breakpoints.down('xl')]: {
      minHeight: "45px"
    },
    backgroundColor: "red"
  }));

function DrawerHeader() {
  return (
    <Header />    
  )
}

export default DrawerHeader
