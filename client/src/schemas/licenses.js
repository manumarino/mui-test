import * as Yup from "yup";

export const licenseValidationSchema = Yup.object({
  system: Yup.string().required("Sistema es requerido"),
  expired_date: Yup.date("Fecha de expiración es requerido")
  .required("Fecha de expiración es requerido")
  .nullable("Fecha de expiración es requerido")
  .default("Fecha de expiración es requerido"),
  details: Yup.string().required("Detalles es requerido"),
  company: Yup.object({ id: Yup.string().required("Compañía es requerido") }),
  branchesList: Yup.array().of(Yup.number()).required("Lista de sucursales es requerido"),
});