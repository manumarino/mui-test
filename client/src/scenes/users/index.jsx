import React from "react";
import { Box, useTheme } from "@mui/material";
import { useGetCustomersQuery } from "state/api";
import Header from "components/Header";
import { DataGrid } from "@mui/x-data-grid";



const Users = () => {
  
  const theme = useTheme();
  const { data, isLoading } = useGetCustomersQuery();
  console.log("data", data);
  

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 0.3,
    },
    {
      field: "name",
      headerName: "Nombre",
      flex: 0.5,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "phoneNumber",
      headerName: "Teléfono",
      flex: 0.5,
      renderCell: (params) => {
        return params.value.replace(/^(\d{2})(\d{4})(\d{4})/, "($1)$2-$3");
      },
    },
    {
      field: "country",
      headerName: "Nacionalidad",
      flex: 0.6,
    },
    {
      field: "occupation",
      headerName: "Profesión",
      flex: 0.6,
    },
    {
      field: "role",
      headerName: "Rol",
      flex: 0.7,
    },
  ];
  
  return (
    <Box >
      <Header title="USUARIOS" subtitle="Lista de Usuarios" />
      <Box
        mt="1rem"
        height="70vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <DataGrid
        
          loading={isLoading || !data}
          getRowId={(row) => row._id}
          rows={data || []}
          columns={columns}
          
        />
      </Box>
    </Box>
  );
}

export default Users;
