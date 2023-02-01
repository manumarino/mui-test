import React, { useState, useEffect } from "react";
import { Box, Stack } from "@mui/material";
import Header from "components/Header";
import DebFormModal from "components/DebFormModal";
import { DebFormSelect, DebFormTextInput } from "components/DebFormComponents";
import DataTable from "components/DataTable";
import { company } from "services/companies";
import AddBoxIcon from '@mui/icons-material/AddBox';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSnackbar } from 'notistack';


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

  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (values) => {
    try {
      if (values.id) {
        //estamos editando
        const res = await company.update(values);
        enqueueSnackbar('Compañía editada', { 
          preventDuplicate: true, 
          variant: 'success'
      });
      } else {
        const res = await company.create(values);
        enqueueSnackbar('Compañía creada', { 
          preventDuplicate: true, 
          variant: 'success'
      });
      }
      closeModal();
      getCompanies();
    } catch (error) {
      if(values.id) {        
      enqueueSnackbar("Ocurrió un error al editar la compañía", { 
        preventDuplicate: true, 
        variant: 'error'
    });
      console.log("Ocurrió un error al editar la compañía: " + error.message);
      } else {        
      enqueueSnackbar("Ocurrió un error al crear la compañía", { 
        preventDuplicate: true, 
        variant: 'error'
    });
      console.log("Ocurrió un error al crear la compañía: " + error.message);
      }
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
      enqueueSnackbar(("Se eliminó la compañía" + selectedCompany.name), { 
        preventDuplicate: true, 
        variant: 'success'
    });
      getCompanies();
    } catch (error) {
      enqueueSnackbar("Ocurrió un error eliminando la compañía", { 
        preventDuplicate: true, 
        variant: 'error'
    } );
      console.log(("Ocurrió un error eliminando la compañía: " + error.message))
    }
  };
  return (
    <Box>
      <Header title="COMPAÑÍAS" subtitle="Lista de Compañías" />
      <DataTable
        loading={!companies.length}
        rows={companies}
        columns={[
          { field: "id", headerName: "ID", flex: 0.5 },
          { field: "name", headerName: "Nombre", flex: 1 },
          { field: "dominio", headerName: "Dominio", flex: 1 },
          { field: "extension", headerName: "Extension", flex: 1 },
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
            label: "Crear Compañía",
            icon: <AddBoxIcon/>,
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
          <DebFormSelect label={"Zona horaria"} name={"timeZone"} selectOptions={[
            {label: "GMT-12", value: "-12"},
            {label: "GMT-11", value: "-11"},
            {label: "GMT-10", value: "-10"},
            {label: "GMT-09", value: "-9"},
            {label: "GMT-08", value: "-8"},
            {label: "GMT-07", value: "-7"},
            {label: "GMT-06", value: "-6"},
            {label: "GMT-05", value: "-5"},
            {label: "GMT-04", value: "-4"},
            {label: "GMT-03", value: "-3"},
            {label: "GMT-02", value: "-2"},
            {label: "GMT-01", value: "-1"},
            {label: "GMT", value: "+0"},
            {label: "GMT+01", value: "+1"},
            {label: "GMT+02", value: "+2"},
            {label: "GMT+03", value: "+3"},
            {label: "GMT+04", value: "+4"},
            {label: "GMT+05", value: "+5"},
            {label: "GMT+06", value: "+6"},
            {label: "GMT+07", value: "+7"},
            {label: "GMT+08", value: "+8"},
            {label: "GMT+09", value: "+9"},
            {label: "GMT+10", value: "+10"},
            {label: "GMT+11", value: "+11"},
            {label: "GMT+12", value: "+12"},
          ]} />
        </Stack>
      </DebFormModal>
    </Box>
  );
}

export default Companies;