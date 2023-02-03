import * as Yup from "yup";

export const branchValidationSchema = Yup.object({
  name: Yup.string().required("Nombre es requerido"),
  direccion: Yup.string().required("Dirección es requerido"),
  estado: Yup.string().required("Estado es requerido"),
  pais: Yup.string().required("País es requerido"),
  latitude: Yup.string().required("Latitud es requerido"),
  longitude: Yup.string().required("Longitud requerido"),
  company: Yup.object({ id: Yup.string().required("Compañía es requerido") }),
  timeZone: Yup.string().required("Zona horaria es requerido"),
});
