import React, { useState, useEffect } from "react";
import { Box, Button, Stack, useMediaQuery } from "@mui/material";
import { useGetProductsQuery } from "state/api";
import Header from "components/Header";
import DebFormModal from "components/DebFormModal";
import {
  DebFormCheckbox,
  DebFormTextInput,
  formBuilder,
} from "components/DebFormComponents";
import DataTable from "components/DataTable";
import { company } from "services/companies";
import FlexBetween from "components/FlexBetween";
import { Add, HdrPlusOutlined } from "@mui/icons-material";
import AddBoxIcon from '@mui/icons-material/AddBox';

const newUserValues = {
  firstName: "",
  lastName: "",
  id: "",
  email: "",
  Tyoe: "",
  debqUser: "",
  QPassword: "",
};

function Users() {
  const [modalState, setModalState] = useState(false);
  const [modalInitialValues, setModalInitialValues] =
    useState(newUserValues);
  const [user, setUsers] = useState([]);

  const getUsers = async () => {
    setUsers(await user.getAll());
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleSubmit = async (values) => {
    console.log(values);
    try {
      if (values.id) {
        const res = await user.update(values);
        alert("Usuario Editado");
      } else {
        const res = await user.create(values);
        alert("Usuario Creado");
      }
      closeModal();
      getUsers();
    } catch (error) {
      alert("Ocurrió un error al crear el usuario: " + error.message);
    }
  };

  const openModal = () => {
    setModalState(true);
  };

  const closeModal = () => {
    setModalState(false);
    setModalInitialValues(newUserValues);
  };

  const handleEdit = (user) => {
    console.log("edit", user);
    setModalInitialValues(user);
    openModal();
  };
  const handleCreateUser = () => {
    setModalInitialValues(newUserValues);
    openModal();
  };
  const handleDelete = async (selectedUser) => {
    try {
      const res = await user.delete(selectedUser.id);
      alert("Se eliminó el uauario " + selectedUser.name);
      getUsers();
    } catch (error) {
      alert("Ocurrió un error eliminando el usuario: " + error.message);
    }
  };
  return (
    <Box>
      <FlexBetween sx={{ alignItems: "flex-end" }}>
        <Header title="USUARIOS" subtitle="Lista de usuarios" />
        <Button sx={{gap:'0.5rem'}}
          variant='contained'
          color='secondary'
          size='small' onClick={handleCreateUser}>
          <AddBoxIcon/> Crear Usuario
        </Button>
      </FlexBetween>
      <DataTable
        loading={!user.length}
        rows={user}
        columns={[
          { field: "id", headerName: "ID", flex: 0.5 },
          { field: "firstName", headerName: "Nombre", flex: 1 },
          { field: "lastName", headerName: "Apellido", flex: 1 },
          { field: "email", headerName: "Email", flex: 1 },
          { field: "type", headerName: "Tipo de Usuario", flex: 1 },
        ]}
        editModalOpen={handleEdit}
        onDelete={handleDelete}></DataTable>

      {/* MODAL DE CREACIÓN / EDICIÓN DE USUARIOS */}
      <DebFormModal
        open={modalState}
        onClose={closeModal}
        onReject={closeModal}
        initialValues={modalInitialValues}
        onSubmit={handleSubmit}
        formikProps={{ enableReinitialize: true }}
        headerText={
          modalInitialValues?.id ? "Editar Usuario" : "Crear Usuario"
        }>
        <Stack gap={2}>
          <DebFormTextInput label={"ID"} name={"id"} />
          <DebFormTextInput label={"Nombre"} name={"fisrstName"} />
          <DebFormTextInput label={"Apellido"} name={"lastName"} />
          <DebFormTextInput label={"Email"} name={"email"} />
          <DebFormTextInput label={"Usuario de debQ"} name={"debUser"} />
          <DebFormTextInput
            label={"Contraseña del Usuario"}
            name={"userPassword"}
          />
          <DebFormTextInput label={"Tipo de Usuario"} name={"type"} />
        </Stack>
      </DebFormModal>
    </Box>
  );
}

export default Users;


/*
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
*/