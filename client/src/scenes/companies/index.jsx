import React, { useState } from "react";
import { Box, Button, Stack, useMediaQuery } from "@mui/material";
import { useGetProductsQuery } from "state/api";
import Header from "components/Header";
import DebFormModal from "components/DebFormModal";
import { DebFormCheckbox, DebFormTextInput, formBuilder } from "components/DebFormComponents";
import DataTable from "components/DataTable";

function Companies() {
  const [modalState, setModalState] = useState(false);


  const handleSubmit = (values) => {
    console.log(values);
  };

  const openModal = () => {
    setModalState(true);
  };

  const closeModal = () => {
    setModalState(false);
  };
  return (
    <Box>
      <Header title="COMPAÑÍAS" subtitle="Listado de compañías" />

      <Button variant="contained" onClick={openModal}>
        Crear Compañía2
      </Button>
      <DebFormModal
        open={modalState}
        onClose={closeModal}
        onReject={closeModal}
        initialValues={{
          name: "",
          direccion: "",
          estado: "",
          capcha: false,
        }}
        onSubmit= {handleSubmit}
        >
        <Stack spacing={2}>
          <DebFormTextInput label={"Nombre"} name={"name"} />
          <DebFormTextInput label={"Dirección"} name={"direccion"} />
          <DebFormTextInput label={"Estado"} name={"estado"} />
          <DebFormCheckbox label={"usar capcha"} name={"capcha"}/>
        </Stack>
      </DebFormModal>
      <DataTable></DataTable>
    </Box>
  );
}

export default Companies;
