import React from 'react';
import {
  Box,
  useTheme
} from "@mui/material";
import EjemploModal from 'components/EjemploModal';



const Dashboard = () => {
  
  
  return (
    <Box sx={{m: "2rem"}}>

      
      <EjemploModal 
      elementoABorrar="EL MODAL"
      cuando="DESPUES"
      />
      
    </Box>
  );
}

export default Dashboard;


