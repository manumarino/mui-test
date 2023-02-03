import React, { useState, useEffect } from "react";
import { Box, Stack, Tooltip } from "@mui/material";
import Header from "components/Header";
import DebFormModal from "components/DebFormModal";
import { DebFormSelect, DebFormTextInput } from "components/DebFormComponents";
import DataTable from "components/DataTable";
import { branch } from "services/branches";
import AddBoxIcon from '@mui/icons-material/AddBox';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSnackbar } from 'notistack';
import { timeZones } from "constants/timeZones";

import { company } from "services/companies";


const newBranchValues = {
  name: "",
  direccion: "",
  estado: "",
  pais: "",
  latitude: "",
  longitude: "",
  timeZone: "",
  company: {
    id: "",
  },
  
};


const Branches = () => {
  const [modalState, setModalState] = useState(false);
  const [modalInitialValues, setModalInitialValues] =
    useState(newBranchValues);
  const [branches, setBranches] = useState([]);
  const [companies, setCompanies] = useState([]);

  const getBranches = async () => {
    setBranches(await branch.getAll());
  };
  const getCompanies = async () => {
    setCompanies(await company.getAll());
  };

  useEffect(() => {
    getBranches();
    getCompanies();
  }, []);

  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (values) => {
    try {
      if (values.id) {
        //estamos editando
        const res = await branch.update(values);
        enqueueSnackbar('Sucursal editada', { 
          preventDuplicate: true, 
          variant: 'success'
      });
      } else {
        const res = await branch.create(values);
        enqueueSnackbar('Sucursal creada', { 
          preventDuplicate: true, 
          variant: 'success'
      });
      }
      closeModal();
      getBranches();
    } catch (error) {
      if(values.id){
        enqueueSnackbar("Ocurrió un error al editar la sucursal", { 
          preventDuplicate: true, 
          variant: 'error'
      });
      console.log("Ocurrió un error al editar la sucursal: " + error.message);
      } else {
        enqueueSnackbar("Ocurrió un error al crear la sucursal", { 
          preventDuplicate: true, 
          variant: 'error'
      });
      console.log("Ocurrió un error al crear la sucursal: " + error.message);
      }
    }
  };

  const openModal = () => {
    setModalState(true);
  };

  const closeModal = () => {
    setModalState(false);
    setModalInitialValues(newBranchValues);
  };

  const handleEdit = (branch) => {
    setModalInitialValues(branch);
    openModal();
  };
  const handleCreateBranch = () => {
    setModalInitialValues(newBranchValues);
    openModal();
  };
  const handleDelete = async (selectedBranch) => {
    try {
      const res = await branch.delete(selectedBranch.id);
      enqueueSnackbar(("Se eliminó la sucursal" + selectedBranch.name), { 
        preventDuplicate: true, 
        variant: 'success'
    });
      getBranches();
    } catch (error) {
      enqueueSnackbar("Ocurrió un error eliminando la sucursal", { 
        preventDuplicate: true, 
        variant: 'error'
    } );
      console.log(("Ocurrió un error eliminando la sucursal: " + error.message))
    }
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 0.1 },
    { field: "name", headerName: "Nombre", flex: 0.7, headerAlign: 'center', align: 'center',
    renderCell: (params) => (
      <Tooltip title={params.value} arrow>
           <span className="table-cell-trucate">{params.value}</span>
      </Tooltip>
  )  },
    { field: "direccion", headerName: "Dirección", flex: 1, headerAlign: 'center', align: 'left',
    renderCell: (params) => (
      <Tooltip title={params.value} arrow>
           <span className="table-cell-trucate">{params.value}</span>
      </Tooltip>
  )  },
    { field: "estado", headerName: "Estado", flex: 0.9, headerAlign: 'center', align: 'center',
    renderCell: (params) => (
      <Tooltip title={params.value} arrow>
           <span className="table-cell-trucate">{params.value}</span>
      </Tooltip>
  )  },
    { field: "pais", headerName: "País", flex: 0.8, headerAlign: 'center', align: 'center',
    renderCell: (params) => (
      <Tooltip title={params.value} arrow>
           <span className="table-cell-trucate">{params.value}</span>
      </Tooltip>
  )  },
    { field: "latitude", headerName: "Latitud", flex: 0.5, headerAlign: 'center', align: 'center'  },
    { field: "longitude", headerName: "Longitud", flex: 0.5, headerAlign: 'center', align: 'center'  },
    { field: "timeZone", headerName: "Zona Horaria (GMT)", flex: 1, headerAlign: 'center', align: 'center',
    renderCell: (params) => {
      return ("GMT"+params.value);
    }, },
    { field: "company.id", headerName: "ID de Compañía", flex: 1, headerAlign: 'center', align: 'center' ,  
    renderCell: (params) => {
      return params.row.company.name;
    }, },
  ];

  return (
    <Box>
      <Header title="SUCURSALES" subtitle="Lista de Sucursales" />
      <DataTable
        loading={!branches.length}
        rows={branches}
        columns={columns}
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
            label: "Crear Sucursal",
            icon: <AddBoxIcon/>,
            action: handleCreateBranch,
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
          modalInitialValues?.id ? "Editar Sucursal" : "Crear Sucursal"
        }>
        <Stack spacing={2}>
          <DebFormTextInput label={"Nombre"} name={"name"} />
          <DebFormTextInput label={"Dirección"} name={"direccion"} />
          <DebFormTextInput label={"Estado"} name={"estado"} />
          <DebFormTextInput label={"País"} name={"pais"} />
          <DebFormTextInput label={"Latitud"} name={"latitude"} />
          <DebFormTextInput label={"Longitud"} name={"longitude"} />
          <DebFormSelect label={"Zona horaria"} name={"timeZone"} selectOptions={timeZones} />
          <DebFormSelect
            label={"Compañía"}
            name={"company.id"}
            selectOptions={companies.map((company) => 
              {return {
                value: company.id,
                label: company.name
              }})}
            />
          
        </Stack>
      </DebFormModal>
    </Box>
  );
}


export default Branches;
