import React, {useEffect, useState} from "react";
import { Box, Button, useTheme } from "@mui/material";
import Header from "components/Header";
import {useTranslation} from "react-i18next";
import DataTable from "components/DataTable";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SecurityIcon from '@mui/icons-material/Security';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import FlexBetween from "components/FlexBetween";
import AddBoxIcon from '@mui/icons-material/AddBox';
import { GridActionsCellItem } from "@mui/x-data-grid";
import DebModal from "components/DebModal";

//API edit
const apiCallEdit = (data)=> {
  return new Promise((resolve, reject)=>{
    setTimeout(()=> {
      resolve("Data de la api: " + data);
    }, 3000)
  });
  }
//API edit

//API create
const apiCallCreate = (data)=> {
  return new Promise((resolve, reject)=>{
    setTimeout(()=> {
      resolve("Data de la api: " + data);
    }, 3000)
  });
  }
//API create


const Users = () => {
//modal edicion
const [openEdit, setOpenEdit] = useState(false);
const openEditModal = ()=>{
  setOpenEdit(true);
}
const closeEditModal = ()=>{
  setOpenEdit(false);
}
const handleConfirmEdit = ()=> {
  return apiCallEdit('algo').then((response) => {
    alert("Recibimos esta response: " + response);
    // y talvez queremos cerrar el modal
    //closeModal();
  })
}
const handleRejectEdit = ()=> {
  // hacemos cosas cuando se aprieta rechazar
  alert("rechazaste el modal")
  // pero esta vez no lo cerramos
}
//modal edicion

//modal creacion
const [openCreate, setOpenCreate] = useState(false);
const openCreateModal = ()=>{
  setOpenCreate(true);
}
const closeCreateModal = ()=>{
  setOpenCreate(false);
}
const handleConfirmCreate = ()=> {
  return apiCallCreate('algo').then((response) => {
    alert("Recibimos esta response: " + response);
    // y talvez queremos cerrar el modal
    //closeModal();
  })
}
const handleRejectCreate = ()=> {
  // hacemos cosas cuando se aprieta rechazar
  alert("rechazaste el modal")
  // pero esta vez no lo cerramos
}
//modal creacion

//

  const { t, i18n } = useTranslation();

  const theme = useTheme();

 const [users, setUsers] = useState([]);
  
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(json => setUsers(json)) 
  }, []);

  

  const columns = [
    {field: 'id', headerName: 'ID de Usuario', flex: 1},
    {field: 'name', headerName: 'Nombre', flex: 1},
    {field: 'email', headerName: 'Email', flex: 1},
    //Para nested values
    {
      field: 'company', headerName: 'Nombre de compañía', flex: 1,
      valueGetter: (users) => users.row.company.name
    },
    {
      field: 'actions',
      type: 'actions',
      getActions: (params) => [
        <>
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Editar"
          title='Editar'
          onClick={openEditModal}
        />
        <DebModal
        open={openEdit}
        onClose={closeEditModal}
        onConfirm={handleConfirmEdit}
        onReject={handleRejectEdit}
        onResponse={closeEditModal}
        >JSX de Edicion</DebModal>
        </>,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Borrar"
          showInMenu
        />,
        <GridActionsCellItem
          icon={<FileCopyIcon />}
          label="Duplicar"
          showInMenu
        />,
      ],
    }
          
   ];

  return (
    <Box >
      <FlexBetween sx={{alignItems:'flex-end'}}>
        <Header title="USUARIOS" subtitle="Lista de Usuarios" />      
        <Button sx={{gap:'0.5rem'}}
          variant='contained'
          color='secondary'
          size='small'
          onClick={openCreateModal}
          >
            <AddBoxIcon/>
            Crear nuevo usuario
        </Button>
        <DebModal
        open={openCreate}
        onClose={closeCreateModal}
        onConfirm={handleConfirmCreate}
        onReject={handleRejectCreate}
        onResponse={closeCreateModal}
        >JSX de Creacion</DebModal>
      </FlexBetween>
      <DataTable
        rows={users}
        columns={columns}
        loading={!users.length}
        
      />
    </Box>
  );
}

export default Users;
