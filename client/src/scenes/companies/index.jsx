import React, { useState } from "react";
import { Box, Button, Stack, useMediaQuery } from "@mui/material";
import { useGetProductsQuery } from "state/api";
import Header from "components/Header";
import DebFormModal from "components/DebFormModal";
import { DebFormCheckbox, DebFormTextInput, formBuilder } from "components/DebFormComponents";

function Companies() {
  const [modalState, setModalState] = useState(false);
  const [modal2State, setModal2State] = useState(false);
  const openModal = () => {
    setModalState(true);
  };
  const closeModal = () => {
    setModalState(false);
  };
  const formConfig = {
    onSubmit: (values) => {
      console.log(values);
      closeModal();
    },
    fields: [
      {
        name: "name",
        label: "NOMBRE",
        type: "text",
        initialValue: "",
      },
      {
        name: "direccion",
        label: "DRI",
        type: "text",
        initialValue: "",
      },
      {
        name: "estado",
        label: "EST",
        type: "text",
        initialValue: "",
      },
      {
        name: "capcha",
        label: "usarCapcha",
        type: "checkbox",
        initialValue: false,
      },
      {
        name: "idioma",
        label: "Idioma",
        type: "select",
        initialValue: "",
        selectOptions: [
          {label: "Ingles", value: "en"},
          {label: "Espanol", value: "es"},
        ]
      },
    ],
  };

  const handleSubmit = (values) => {
    console.log(values);
  };

  const openModal2 = () => {
    setModal2State(true);
  };

  const closeModal2 = () => {
    setModal2State(false);
  };
  return (
    <Box>
      <Header title="COMPAÑÍAS" subtitle="Listado de compañías" />
      <Button variant="contained" onClick={openModal}>
        Crear Compañía
      </Button>
      <DebFormModal
        open={modalState}
        onClose={closeModal}
        onReject={closeModal}
        formConfig={formConfig}>
      </DebFormModal>
      <Button variant="contained" onClick={openModal2}>
        Crear Compañía2
      </Button>
      <DebFormModal
        open={modal2State}
        onClose={closeModal2}
        onReject={closeModal2}
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
    </Box>
  );
}

export default Companies;
