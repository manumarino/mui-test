import * as Yup from "yup";

export const branchValidationSchema = Yup.object({
  name: Yup.string().required("Nombre es requerido"),
  direccion: Yup.string().required("Dirección es requerido"),
  estado: Yup.string().required("Estado es requerido"),
  pais: Yup.string().required("País es requerido"),
  latitude: Yup.string().matches(/^(\+|-)?(?:90(?:(?:\.0{1})?)|(?:[0-9]|[1-8][0-9])(?:(?:\.[0-9]{1})?))$/,"Latitud incorrecta. Debe incluirse un numero positivo o negativo con 1 decimal").required("Latitud es requerido"),
  longitude: Yup.string().matches(/^(\+|-)?(?:180(?:(?:\.0{1})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\.[0-9]{1})?))$/,"Longitud incorrecta. Debe incluirse un numero positivo o negativo con 1 decimal").required("Longitud requerido"),
  company: Yup.object({ id: Yup.string().required("Compañía es requerido") }),
  timeZone: Yup.string().required("Zona horaria es requerido"),
});
