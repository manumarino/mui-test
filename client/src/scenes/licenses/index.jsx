import React, { useState, useEffect } from "react";
import { Box, Stack } from "@mui/material";
import Header from "components/Header";
import DebFormModal from "components/DebFormModal";
import { DebFormCheckbox, DebFormSelect, DebFormTextInput } from "components/DebFormComponents";
import DataTable from "components/DataTable";
import { license } from "services/licenses";
import AddBoxIcon from '@mui/icons-material/AddBox';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSnackbar } from 'notistack';
import { company } from "services/companies";


const newLicenseValues = {
  system: "",
  expired_date: "",
  details: "",
  branchesList: [],
};

const Licenses = () => {

  const [modalState, setModalState] = useState(false);
  const [modalInitialValues, setModalInitialValues] =
    useState(newLicenseValues);
  const [licenses, setLicenses] = useState([]);
  const [companies, setCompanies] = useState([]);
  const getCompanies = async ()  => {
    setCompanies(await company.getAll());
  };

  const getLicenses = async () => {
    setLicenses(await license.getAll());
  };

  useEffect(() => {
    getLicenses();
  }, []);

  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (values) => {
    try {
      if (values.id) {
        //estamos editando
        const res = await license.update(values);
        enqueueSnackbar('Licencia editada', { 
          preventDuplicate: true, 
          variant: 'success'
      });
      } else {
        const res = await license.create(values);
        enqueueSnackbar('Licencia creada', { 
          preventDuplicate: true, 
          variant: 'success'
      });
      }
      closeModal();
      getLicenses();
    } catch (error) {
      if(values.id) {        
      enqueueSnackbar("Ocurrió un error al editar la licencia", { 
        preventDuplicate: true, 
        variant: 'error'
    });
      console.log("Ocurrió un error al editar la licencia: " + error.message);
      } else {        
      enqueueSnackbar("Ocurrió un error al crear la licencia", { 
        preventDuplicate: true, 
        variant: 'error'
    });
      console.log("Ocurrió un error al crear la licencia: " + error.message);
      }
    }
  };

  const openModal = () => {
    setModalState(true);
  };

  const closeModal = () => {
    setModalState(false);
    setModalInitialValues(newLicenseValues);
  };

  const handleEdit = (license) => {
    setModalInitialValues(license);
    openModal();
  };
  const handleCreateLicense = () => {
    setModalInitialValues(newLicenseValues);
    openModal();
  };
  const handleDelete = async (selectedLicense) => {
    try {
      const res = await license.delete(selectedLicense.id);
      enqueueSnackbar(("Se eliminó la licencia" + selectedLicense.system), { 
        preventDuplicate: true, 
        variant: 'success'
    });
      getLicenses();
    } catch (error) {
      enqueueSnackbar("Ocurrió un error eliminando la licencia", { 
        preventDuplicate: true, 
        variant: 'error'
    } );
      console.log(("Ocurrió un error eliminando la licencia: " + error.message))
    }
  };

  const sucursales1 = ["suc1", "suc2", "suc3"];
  const sucursales = [
    {
      id: 1,
      name: "Sucursal 1",
      localidad: "laloma1"
    },
    {
      id: 2,
      name: "Sucursal 2",
      localidad: "laloma2"
    },
    {
      id: 3,
      name: "Sucursal 3",
      localidad: "laloma3"
    },
  ];
  return (
    <Box>
      <Header title="LICENCIAS" subtitle="Lista de Licencias" />
      <DataTable
        loading={!licenses.length}
        rows={licenses}
        columns={[
          { field: "id", headerName: "ID", flex: 0.5 },
          { field: "system", headerName: "Sistema", flex: 1 },
          { field: "expired_date", headerName: "Fecha de Expiración", flex: 1 },
          { field: "details", headerName: "Detalles", flex: 1 },
          { field: "branchesList", headerName: "Lista de Sucursales", flex: 1 }
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
            label: "Crear Licencia",
            icon: <AddBoxIcon/>,
            action: handleCreateLicense,
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
          modalInitialValues?.id ? "Editar Licencia" : "Crear Licencia"
        }>
        <Stack spacing={2}>
          <DebFormSelect label={"Sistema"} name={"system"} selectOptions={[
            {label: "Citas", value: "APPOINTMENTS"},
            {label: "Mobile", value: "MOBILE"},
            {label: "Ecuestas", value: "SURVEY"},
          ]} />
          <DebFormTextInput label={"Fecha de expiración"} name={"expired_date"} />
          <DebFormTextInput label={"Detalles"} name={"details"} />
          <DebFormTextInput label={"Lista de Sucursales"} name={"branchesList"} />
          {sucursales.map((sucursal) => (
              <DebFormCheckbox label={sucursal.name} value={sucursal.id} name={"branchesList"} />
              ) )}
        </Stack>
      </DebFormModal>
    </Box>
  );
}



export default Licenses;
