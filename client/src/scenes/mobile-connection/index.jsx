import React, { useState, useEffect } from "react";
import { Box, Stack, Tooltip } from "@mui/material";
import Header from "components/Header";
import DebFormModal from "components/DebFormModal";
import { DebFormSelect, DebFormTextInput } from "components/DebFormComponents";
import DataTable from "components/DataTable";
import { company as surveyCompany } from "services/companies";
import { mobileConnection } from "services/mobile-connection";
import AddBoxIcon from '@mui/icons-material/AddBox';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSnackbar } from 'notistack';
import { mobileValidationSchema } from "schemas/mobile";


const newMobileConnectionValues = {
  id: "",
  urlMobile: "",
  surveyCompany:  {    
    id: "",
  },
  userMobile: "",
  passwordMobile: "",
  tokenMobile: "",
}

const MobileConnections = () => {
const [modalState, setModalState] = useState(false);
  const [modalInitialValues, setModalInitialValues] = useState(newMobileConnectionValues);
  const [mobileConnections, setMobileConnections] = useState([]);
  const [companies, setCompanies] = useState([]);

  const getMobileConnections = async () => {
    setMobileConnections(await mobileConnection.getAll());
  };
  const getCompanies = async () => {
    setCompanies(await surveyCompany.getAll());
  };

  useEffect(() => {
    getMobileConnections();
    getCompanies();
    console.log(surveyCompany)
  }, []);

  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (values) => {
    try {
      if (values.id) {
        //estamos editando
        const res = await mobileConnection.update(values);
        enqueueSnackbar('Conexión editada', { 
          preventDuplicate: true, 
          variant: 'success'
      });
      } else {
        const res = await mobileConnection.create(values);
        enqueueSnackbar('Conexión creada', { 
          preventDuplicate: true, 
          variant: 'success'
      });
      }
      closeModal();
      getMobileConnections();
    } catch (error) {
      if(values.id) {        
      enqueueSnackbar("Ocurrió un error al editar la conexión", { 
        preventDuplicate: true, 
        variant: 'error'
    });
      console.log("Ocurrió un error al editar la conexión: " + error.message);
      } else {        
      enqueueSnackbar("Ocurrió un error al crear la conexión", { 
        preventDuplicate: true, 
        variant: 'error'
    });
      console.log("Ocurrió un error al crear la conexión: " + error.message);
      }
    }
  };

  const openModal = () => {
    setModalState(true);
  };

  const closeModal = () => {
    setModalState(false);
    setModalInitialValues(newMobileConnectionValues);
  };

  const handleEdit = (mobileConnection) => {
    setModalInitialValues(mobileConnection);
    openModal();
  };
  const handleCreateMobileConnection = () => {
    setModalInitialValues(newMobileConnectionValues);
    openModal();
  };
  const handleDelete = async (selectedMobileConnection) => {
    try {
      const res = await mobileConnection.delete(selectedMobileConnection.id);
      enqueueSnackbar(("Se eliminó la conexión con " + selectedMobileConnection.urlMobile), { 
        preventDuplicate: true, 
        variant: 'success'
    });
      getMobileConnections();
    } catch (error) {
      enqueueSnackbar("Ocurrió un error eliminando la conexión", { 
        preventDuplicate: true, 
        variant: 'error'
    } );
      console.log(("Ocurrió un error eliminando la conexión: " + error.message))
    }
  };
  return (
    <Box>
      <Header title="CONEXIONES MÓBILES" subtitle="Lista de Conexiones Móbiles" />
      <DataTable
        loading={!mobileConnections.length}
        rows={mobileConnections}
        columns={[
          { field: "id", headerName: "ID", flex: 0.1 },
          { field: "urlMobile", headerName: "URL de Mobile", flex: 0.7,
          renderCell: (params) => (
            <Tooltip title={params.value} arrow>
                 <span className="table-cell-trucate">{params.value}</span>
            </Tooltip>
        )   },
          { field: "surveyCompany.id", headerName: "Compañía de encuestas", flex: 0.7,
          renderCell: (params) => {
            return params.row.surveyCompany.name;
          }, },
          { field: "userMobile", headerName: "Usuario", flex: 0.7, 
          renderCell: (params) => (
            <Tooltip title={params.value} arrow>
                 <span className="table-cell-trucate">{params.value}</span>
            </Tooltip>
        )   },
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
            label: "Crear Conexión",
            icon: <AddBoxIcon/>,
            action: handleCreateMobileConnection,
          },
        ]}
      />

      {/* MODAL DE CREACIÓN / EDICIÓN DE CONEXIÓN MÓBIL */}
      <DebFormModal
        maxWidth="sm"
        fullWidth={true}
        open={modalState}
        onClose={closeModal}
        onReject={closeModal}
        initialValues={modalInitialValues}
        onSubmit={handleSubmit}
        formikProps={{ enableReinitialize: true , validationSchema: mobileValidationSchema }}
        headerText={
          modalInitialValues?.id ? "Editar Conexión" : "Crear Conexión"
        }>
        <Stack spacing={1}>
          <DebFormTextInput label={"URL Móbil"} name={"urlMobile"} />
          <DebFormSelect label={"Compañía de encuestas"} name={"surveyCompany.id"} 
           selectOptions={companies.map((surveyCompany) => 
            {return {
              value: surveyCompany.id,
              label: surveyCompany.name
            }})}
           />
          <DebFormTextInput label={"Usuario"} name={"userMobile"} />
          <DebFormTextInput
            label={"Contraseña de servicio Mobile"}
            name={"passwordMobile"}
          />
          <DebFormTextInput 
          label={"Token de servicio Mobile"} 
          name={"tokenMobile"} />         
        </Stack>
      </DebFormModal>
    </Box>
  );
}


export default MobileConnections;


