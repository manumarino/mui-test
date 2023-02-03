import React, { useState, useEffect } from "react";
import { Box, Stack, TextField, Tooltip } from "@mui/material";
import Header from "components/Header";
import DebFormModal from "components/DebFormModal";
import { DebDatePickerInput, DebFormMultiSelect, DebFormSelect, DebFormTextInput } from "components/DebFormComponents";
import DataTable from "components/DataTable";
import { license } from "services/licenses";
import AddBoxIcon from '@mui/icons-material/AddBox';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSnackbar } from 'notistack';
import { company } from "services/companies";
import { branch } from "services/branches";
import {format} from 'date-fns';
import { licenseValidationSchema } from "schemas/licenses";

const newLicenseValues = {
  system: "",
  expired_date: "",
  details: "",
  company: {
    id: "",
  },
  branchesList: [],
};

const Licenses = () => {

  const [modalState, setModalState] = useState(false);
  const [modalInitialValues, setModalInitialValues] = useState(newLicenseValues);

  const [licenses, setLicenses] = useState([]);
  const getLicenses = async () => {
    setLicenses(await license.getAll());
  };

  const [companies, setCompanies] = useState([]);
    const getCompanies = async ()  => {
    setCompanies(await company.getAll());
  };

   const [branches, setBranches] = useState([]);
    const getBranches = async ()  => {
    setBranches(await branch.getAll());
  };


  useEffect(() => {
    getLicenses();
    getCompanies();
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

  return (
    <Box>
      <Header title="LICENCIAS" subtitle="Lista de Licencias" />
      <DataTable
        loading={!licenses.length}
        rows={licenses}
        columns={[
          { field: "id", headerName: "ID", flex: 0.1 },
          { field: "company.id", headerName: "ID de Compañía", flex: 1, headerAlign: 'center', align: 'center' ,  
          renderCell: (params) => {
            return params.row.company.name;
          }, },         
          { field: "system", headerName: "Sistema", flex: 1, headerAlign: 'center', align: 'center',
          renderCell: (params) => (
            <Tooltip title={params.value} arrow>
                 <span className="table-cell-trucate">{params.value}</span>
            </Tooltip>
        )   },
          { field: "expired_date", headerName: "Fecha de Expiración",
          renderCell: params => 
          format(new Date(params.value), "dd/MM/yyyy"),
           flex: 1, headerAlign: 'center', align: 'center'},
          { field: "details", headerName: "Detalles", flex: 1, headerAlign: 'center', align: 'center',
          renderCell: (params) => (
            <Tooltip title={params.value} arrow>
                 <span className="table-cell-trucate">{params.value}</span>
            </Tooltip>
        )   },
          { field: "branchesList", headerName: "Lista de Sucursales", flex: 1,  headerAlign: 'center', align: 'center',
          renderCell: (params) => (
            <Tooltip title={params.value} arrow>
                 <span className="table-cell-trucate">{params.value}</span>
            </Tooltip>
        )    }
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
        formikProps={{ enableReinitialize: true, validationSchema: licenseValidationSchema }}
        headerText={
          modalInitialValues?.id ? "Editar Licencia" : "Crear Licencia"
        }>
        <Stack spacing={1}>
        <DebFormSelect
            label={"Compañía"}
            name={"company.id"}
            selectOptions={companies.map((company) => 
              {return {
                value: company.id,
                label: company.name
              }})}
            />
          <DebFormSelect label={"Sistema"} name={"system"} selectOptions={[
            {label: "Citas", value: "APPOINTMENTS"},
            {label: "Mobile", value: "MOBILE"},
            {label: "Ecuestas", value: "SURVEY"},
          ]} />
          <DebFormTextInput label={"Detalles"} name={"details"} />
          <DebDatePickerInput label={"Fecha de expiración"} name={"expired_date"} />
          
        </Stack>
      </DebFormModal>
    </Box>
  );
}



export default Licenses;
