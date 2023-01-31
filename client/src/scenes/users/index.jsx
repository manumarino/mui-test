import React, { useState, useEffect } from "react";
import { Box, Stack } from "@mui/material";
import Header from "components/Header";
import DebFormModal from "components/DebFormModal";
import { DebFormTextInput } from "components/DebFormComponents";
import DataTable from "components/DataTable";
import { user } from "services/users";
import AddBoxIcon from '@mui/icons-material/AddBox';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSnackbar } from 'notistack';

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
  
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (values) => {
    try {
      if (values.id) {
        //estamos editando
        const res = await user.update(values);
        enqueueSnackbar('Usuario editado', { 
          preventDuplicate: true, 
          variant: 'success'
      });
      } else {
        const res = await user.create(values);
        enqueueSnackbar('Usuario creado', { 
          preventDuplicate: true, 
          variant: 'success'
      });
      }
      closeModal();
      getUsers();
    } catch (error) {
      if(values.id) {        
      enqueueSnackbar("Ocurrió un error al editar el usuario", { 
        preventDuplicate: true, 
        variant: 'error'
    });
    console.log("Ocurrió un error al editar el usuario: " + error.message);
      } else {        
      enqueueSnackbar("Ocurrió un error al crear el usuario", { 
        preventDuplicate: true, 
        variant: 'error'
    });
    console.log("Ocurrió un error al crear el usuario: " + error.message);
      }
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
      enqueueSnackbar(("Se eliminó el usuario " + selectedUser.name), { 
        preventDuplicate: true, 
        variant: 'success'
    });
      getUsers();
    } catch (error) {
      enqueueSnackbar("Ocurrió un error eliminando el usuario", { 
        preventDuplicate: true, 
        variant: 'error'
    } );
      console.log(("Ocurrió un error eliminando el usuario: " + error.message))
    }
  };
  return (
    <Box>
        <Header title="USUARIOS" subtitle="Lista de Usuarios" />
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