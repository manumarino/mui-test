import React, { useState } from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Button,
  Typography,
  Rating,
  useTheme,
  useMediaQuery,
  Stack,
  Divider,
} from "@mui/material";
import { useGetProductsQuery } from "state/api";
import Header from "components/Header";
import DebModal from "components/DebModal";
import { Form, Formik } from "formik";
import { DebFormTextInput } from "components/DebFormComponents";
import { reject } from "q";
import { createCompany } from "services/companies";
import { useRef } from "react";

function fakeApi(value) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(value);
    }, 2000);
  });
}

const Company = () => {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card
      sx={{
        backgroundImage: "none",
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.55rem",
      }}>
      <CardContent>
        <Typography
          sx={{ fontSize: 14 }}
          color={theme.palette.secondary[700]}
          gutterBottom>
          Compañía
        </Typography>
        <Typography variant="h5" component="div">
          Debmedia
        </Typography>
        <Typography sx={{ mb: "1.5rem" }} color={theme.palette.secondary[400]}>
          2022
        </Typography>
        <Rating value={5} readOnly />
        <Typography variant="body2">Diciembre</Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="primary"
          size="small"
          onClick={() => setIsExpanded(!isExpanded)}>
          See More
        </Button>
      </CardActions>
      <Collapse
        in={isExpanded}
        timeout="auto"
        unmountOnExit
        sx={{
          color: theme.palette.neutral[300],
        }}>
        <CardContent>
          <Typography>id: 01 </Typography>
          <Typography>Supply Left: x </Typography>
          <Typography>Yearly Sales This Year: x </Typography>
          <Typography>Yearly Units Sold This Year: x </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

function Companies() {
  const { data, isLoading } = useGetProductsQuery();
  const isNonMobile = useMediaQuery("(min-width: 1000px)");
  const [companyModalState, setCompanyModalState] = useState(false);
  const openCreateCompanyModal = () => setCompanyModalState(true);
  const closeCreateCompanyModal = () => setCompanyModalState(false);

  const formRef = useRef();
  const handleConfirm = () => {
    if(formRef.current){
      return formRef.current.submitForm();
    }
  };

  const handleFormSubmit = async (values, {setSubmitting}) => {
    console.log(values);
    try{
      const res = await createCompany(values);
      console.log("res", res);
      closeCreateCompanyModal()
    } catch (error){
      console.error("Error creating company: ", error);
      //deberiamos mostrar un toast o algo
    }
    setSubmitting(false);
    return "algo"
  };
  return (
    <Box sx={{ m: "2rem" }}>
      <Header title="COMPAÑÍAS" subtitle="Listado de compañías" />
      <Button variant="contained" onClick={openCreateCompanyModal}>
        Crear compania
      </Button>
      <DebModal
        headerText="Crear compañía"
        open={companyModalState}
        onClose={closeCreateCompanyModal}
        onReject={closeCreateCompanyModal}
        onConfirm={handleConfirm}>
        <Formik
          innerRef={formRef}
          initialValues={{
            name: "",
            logo: "",
            dominio: "",
            extension: "",
            debqUrl: "",
            debqUser: "",
            debqPassword: "",
            timeZone: "0",
            branchList: [],
          }}
          onSubmit={handleFormSubmit}>
          <Form>
            <Stack spacing={2}>
              <DebFormTextInput label={"Nombre"} name={"name"} />
              <DebFormTextInput label={"Logo"} name={"logo"} />
              <DebFormTextInput label={"Dominio"} name={"dominio"} />
              <DebFormTextInput label={"Extension"} name={"extension"} />
              <DebFormTextInput label={"URL del debQ"} name={"debqUrl"} />
              <DebFormTextInput
                label={"Contraseña del debQ"}
                name={"debqPassword"}
              />
              <DebFormTextInput label={"Zona horaria"} name={"timeZone"} />
            </Stack>
          </Form>
        </Formik>
      </DebModal>
      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
        justifyContent="space-between"
        rowGap="20px"
        columnGap="1.33%"
        sx={{ "& > div": { gridColumn: isNonMobile ? undefined : "span 4" } }}>
        <Company />
        <Company />
        <Company />
        <Company />
        <Company />
      </Box>
    </Box>
  );
}

export default Companies;
