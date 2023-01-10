import React, {useEffect, useState} from "react";
import { Box, useTheme } from "@mui/material";
import Header from "components/Header";
import {useTranslation} from "react-i18next";
import DataTable from "components/DataTable";



const Users = () => {

  //Calling t and i18n method from useTranslation hook 
  const { t, i18n } = useTranslation();

  const theme = useTheme();

 const [users, setUsers] = useState([]);
  
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(json => setUsers(json)) 
  }, []);

  const columns = [
    {field: 'id', headerName: 'ID de Usuario', flex: 0.3},
    {field: 'name', headerName: 'Nombre', flex: 0.5},
    {field: 'email', headerName: 'Email', flex: 0.5},
    //Para nested values
    {
      field: 'company', headerName: 'Nombre de compañía', flex: 0.7,
      valueGetter: (users) => users.row.company.name
    },
  ]

  return (
    <Box >
      <Header title="USUARIOS" subtitle="Lista de Usuarios" />      
      <DataTable
        rows={users}
        columns={columns}
        loading={!users.length}
        
      />
    </Box>
  );
}

export default Users;
