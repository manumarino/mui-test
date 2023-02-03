import * as Yup from "yup";

export const mobileValidationSchema = Yup.object({
  urlMobile: Yup.string().url("La URL no es valida").required("URL de Mobile es requerido"),
  surveyCompany: Yup.object({ id: Yup.string().required("Compañía de encuestas es requerido") }),
  userMobile: Yup.string().required("Usuario es requerido"),
  passwordMobile: Yup.string()
  .min(8, "Contraseña debe contener al menos 8 caracteres")
  .matches(/\w/, "Contraseña debe contener al menos una letra")
  .matches(/\d/, "Contraseña debe contener al menos un numero")
  .required("Contraseña de Mobile es requerido"),
  tokenMobile: Yup.string().required("Token de Mobile es requerido"),
});