import React, { useState, useEffect } from "react";
import { Box, Stack } from "@mui/material";
import Header from "components/Header";
import DebFormModal from "components/DebFormModal";
import { DebFormSelect, DebFormTextInput } from "components/DebFormComponents";
import DataTable from "components/DataTable";
import { branch } from "services/branches";
import AddBoxIcon from '@mui/icons-material/AddBox';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSnackbar } from 'notistack';


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

  const getBranches = async () => {
    setBranches(await branch.getAll());
  };

  useEffect(() => {
    getBranches();
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
  return (
    <Box>
      <Header title="SUCURSALES" subtitle="Lista de Sucursales" />
      <DataTable
        loading={!branches.length}
        rows={branches}
        columns={[
          { field: "id", headerName: "ID", flex: 0.5 },
          { field: "name", headerName: "Nombre", flex: 1 },
          { field: "direccion", headerName: "Dirección", flex: 1 },
          { field: "estado", headerName: "Estado", flex: 1 },
          { field: "pais", headerName: "País", flex: 1 },
          { field: "latitude", headerName: "Latitud", flex: 1 },
          { field: "longitude", headerName: "Longitud", flex: 1 },
          { field: "timeZone", headerName: "Zona Horaria (GMT)", flex: 1 },
          { field: "company.id", headerName: "ID de Compañía", 
          renderCell: (params) => {
            return params.row.company.id;
          },
          flex: 1 },
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
          <DebFormTextInput label={"Id de Compañía"} name={"company.id"} />
          
        </Stack>
      </DebFormModal>
    </Box>
  );
}


export default Branches;
