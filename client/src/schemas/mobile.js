import * as Yup from "yup";

export const mobileValidationSchema = Yup.object({
  urlMobile: Yup.string().matches(/^((https?:\/\/)|(www.))(?:([a-zA-Z]+)|(\d+\.\d+.\d+.\d+)):\d{4}$/,"La URL no es válida. Debe comenzar con 'http://' o 'www'.").required("URL Mobile es requerido"),
  surveyCompany: Yup.object({ id: Yup.string().required("Compañía de encuestas es requerido") }),
  userMobile: Yup.string().required("Usuario es requerido"),
  passwordMobile: Yup.string()
  .min(8, "Contraseña debe contener al menos 8 caracteres")
  .matches(/\w/, "Contraseña debe contener al menos una letra")
  .matches(/\d/, "Contraseña debe contener al menos un número")
  .required("Contraseña de Mobile es requerido"),
  tokenMobile: Yup.string().required("Token de Mobile es requerido"),
});