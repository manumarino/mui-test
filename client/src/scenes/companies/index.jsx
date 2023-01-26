import React, { useState, useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
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


const newCompanyValues = {
  name: "",
  logo: "",
  dominio: "",
  extension: "",
  debqUrl: "",
  debqUser: "",
  debqPassword: "",
  timeZone: "",
};

function Companies() {
  const [modalState, setModalState] = useState(false);
  const [modalInitialValues, setModalInitialValues] =
    useState(newCompanyValues);
  const [companies, setCompanies] = useState([]);

  const getCompanies = async () => {
    setCompanies(await company.getAll());
  };

  useEffect(() => {
    getCompanies();
  }, []);

  const handleSubmit = async (values) => {
    try {
      if (values.id) {
        //estamos editando
        const res = await company.update(values);
        alert("compania Editada");
      } else {
        const res = await company.create(values);
        alert("compania Creada");
      }
      closeModal();
      getCompanies();
    } catch (error) {
      alert("Ocurrió un error al crear la compañía: " + error.message);
    }
  };

  const openModal = () => {
    setModalState(true);
  };

  const closeModal = () => {
    setModalState(false);
    setModalInitialValues(newCompanyValues);
  };

  const handleEdit = (company) => {
    setModalInitialValues(company);
    openModal();
  };
  const handleCreateCompany = () => {
    setModalInitialValues(newCompanyValues);
    openModal();
  };
  const handleDelete = async (selectedCompany) => {
    try {
      const res = await company.delete(selectedCompany.id);
      alert("Se elimino la compañía " + selectedCompany.name);
      getCompanies();
    } catch (error) {
      alert("ocurrió un error eliminando la compañía: " + error.message);
    }
  };
  return (
    <Box>
      <Header title="COMPAÑÍAS" subtitle="Lista de compañías" />
      <DataTable
        loading={!companies.length}
        rows={companies}
        autoHeight
        columns={[
          { field: "id", headerName: "ID", flex: 0.5 },
          { field: "name", headerName: "Nombre", flex: 1 },
          { field: "dominio", headerName: "Dominio", flex: 1 },
          { field: "extension", headerName: "Extension", flex: 1 },
        ]}
        rowActions={[
          {
            label: "Editar Agus",
            icon: <EditIcon></EditIcon>,
            action: handleEdit,
          },
          {
            label: "Eliminar",
            icon: <DeleteIcon></DeleteIcon>,
            action: handleDelete,
            showInMenu: true,
          },
        ]}
        headerActions={[
          {
            label: "Crear Compañía",
            action: handleCreateCompany,
          },
        ]}
      />

      {/* MODAL DE CREACIÓN / EDICIÓN DE COMPAÑÍA */}
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
          modalInitialValues?.id ? "Editar Compañía" : "Crear Compañía"
        }>
        <Stack spacing={2}>
          <DebFormTextInput label={"Nombre"} name={"name"} />
          <DebFormTextInput label={"Logo"} name={"logo"} />
          <DebFormTextInput label={"Domino"} name={"dominio"} />
          <DebFormTextInput label={"Extension"} name={"extension"} />
          <DebFormTextInput
            label={"URL de Conexión con debQ"}
            name={"debqUrl"}
          />
          <DebFormTextInput label={"Usuario de debQ"} name={"debqUser"} />
          <DebFormTextInput
            label={"Contraseña de debQ"}
            name={"debqPassword"}
          />
          <DebFormTextInput label={"Zona horaria"} name={"timeZone"} />
        </Stack>
      </DebFormModal>
    </Box>
  );
}

export default Companies;