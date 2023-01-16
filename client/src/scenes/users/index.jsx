import React, {useEffect, useState} from "react";
import { Box, Button, useTheme } from "@mui/material";
import Header from "components/Header";
import {useTranslation} from "react-i18next";
import DataTable from "components/DataTable";
import FlexBetween from "components/FlexBetween";
import TableRowCreationButton from "components/TableRowCreationButton";
import EditUserModal from "components/EditUserModal";
import { PanoramaSharp } from "@mui/icons-material";




const Users = () => {
  //modal edicion
  const [openEdit, setOpenEdit] = useState(false);
  const openEditModal = ()=>{
    setOpenEdit(true);
  }
  const closeEditModal = ()=>{
    setOpenEdit(false);
  }
  //modal edicion

  const { t, i18n } = useTranslation();

  const theme = useTheme();

 const [users, setUsers] = useState([]);
  
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(json => setUsers(json)) 
  }, []);

  

  const columns = [
    {field: 'id', headerName: 'ID de Usuario', flex: 0.5},
    {field: 'name', headerName: 'Nombre', flex: 1},
    {field: 'email', headerName: 'Email', flex: 1},
    //Para nested values
    {
      field: 'company', headerName: 'Nombre de compañía', flex: 1,
      valueGetter: (users) => users.row.company.name
    }
   ];

  return (
    <Box >
      <FlexBetween sx={{alignItems:'flex-end'}}>
        <Header title="USUARIOS" subtitle="Lista de Usuarios" />      
        <TableRowCreationButton buttonMessage='Crear nuevo usuario' innerMessage='JSX de Creacion' />
      </FlexBetween>
      <DataTable
        rows={users}
        columns={columns}
        loading={!users.length}
        editModalOpen={openEditModal}
        editModal={
          <EditUserModal
          openEdit={openEdit}
          closeEditModal={closeEditModal}
          confirmText= 'Guardar cambios'
          rejectText= 'Cancelar'
          headerText= 'Editar usuario'
          >
          </EditUserModal>
        }
        
        
      />
    </Box>
  );
}

export default Users;
