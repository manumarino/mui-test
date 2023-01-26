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
import { user } from "services/users";
import FlexBetween from "components/FlexBetween";
import { Add, HdrPlusOutlined } from "@mui/icons-material";
import AddBoxIcon from '@mui/icons-material/AddBox';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const newUserValues = {
  name: "",
  email: "",
  password: "",
};

function Users() {
  const [modalState, setModalState] = useState(false);
  const [modalInitialValues, setModalInitialValues] =
    useState(newUserValues);
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    setUsers(await user.getAll());
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleSubmit = async (values) => {
    try {
      if (values.id) {
        //estamos editando
        const res = await user.update(values);
        alert("Usuario editado");
      } else {
        const res = await user.create(values);
        alert("Usuario creado");
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

  const handleEdit = (company) => {
    setModalInitialValues(company);
    openModal();
  };
  const handleCreateUser = () => {
    setModalInitialValues(newUserValues);
    openModal();
  };
  const handleDelete = async (selectedUser) => {
    try {
      const res = await user.delete(selectedUser.id);
      alert("Se eliminó el usuario " + selectedUser.name);
      getUsers();
    } catch (error) {
      alert("Ocurrió un error eliminando el usuario: " + error.message);
    }
  };
  return (
    <Box>
        <Header title="USUARIOS" subtitle="Lista de usuarios" />
       <DataTable
        loading={!users.length}
        rows={users}
        columns={[
          { field: "id", headerName: "ID", flex: 0.5 },
          { field: "name", headerName: "Nombre", flex: 1 },
          { field: "email", headerName: "Email", flex: 1 },
        ]}
        rowActions={[
          {
            label: "Editar",
            icon: <EditIcon/>,
            action: handleEdit,
          },
          {
            label: "Eliminar",
            icon: <DeleteIcon/>,
            action: handleDelete,
            showInMenu: true,
          },
        ]}
        headerActions={[
          {
            label: "Crear usuario",
            icon: <AddBoxIcon/>,
            action: handleCreateUser,
          },
        ]}
      />

      {/* MODAL DE CREACIÓN / EDICIÓN DE USUARIO */}
      <DebFormModal
        maxWidth="sm"
        fullWidth={true}
        open={modalState}
        onClose={closeModal}
        onReject={closeModal}
        initialValues={modalInitialValues}
        onSubmit={handleSubmit}
        formikProps={{ enableReinitialize: true }}
        headerText={
          modalInitialValues?.id ? "Editar Usuario" : "Crear Usuario"
        }>
        <Stack spacing={2}>
          <DebFormTextInput label={"Nombre"} name={"name"} />
          <DebFormTextInput label={"Email"} name={"email"} />
          <DebFormTextInput label={"Contraseña"} name={"password"} />
        </Stack>
      </DebFormModal>
    </Box>
  );
}

export default Users;