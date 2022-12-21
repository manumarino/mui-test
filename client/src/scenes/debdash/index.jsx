import React from 'react';
import {
  Box,
  useTheme
} from "@mui/material";
import useScript from 'hooks/useScript';
import { useEffect } from 'react';
import { init } from 'create-react-app/createReactApp';
import HAniS from "../../hanis_min.js";




const Dashboard = () => {
  useScript('../../hanis_min.js');

  const hanis_setup = {
    basename: "https://repo2.smn.gob.ar/archivos/imasd/vmsr/radar/RMA2_240_ZH_CMAX_??.png",
      num_frames : "12",
      base_starting_number : "1",
      window_size : "935,945",
      dwell : "200",
      pause : "1000"
      
  };
  
  useEffect(() => {
    HAniS.setup( 
      [basename = "https://repo2.smn.gob.ar/archivos/imasd/vmsr/radar/RMA2_240_ZH_CMAX_??.png",
      num_frames = "12",
      base_starting_number = "1",
      window_size = "935,945",
      dwell = "200",
      pause = "1000"]
      , "handiv")
  } , []);
  
  return (
    <Box sx={{m: "2rem"}}>

      <Box id="handiv" sx={{width: "800px"}} >

      </Box>
      
    </Box>
  );
}

export default Dashboard;


