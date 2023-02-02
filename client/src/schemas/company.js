import * as Yup from 'yup';

export const companyValidationSchema = Yup.object({
  name: Yup.string().required("Nombre es requerido"),
  logo: Yup.string().required("Logo es requerido"),
  dominio: Yup.string().required("Dominio es requerido"),
  extension: Yup.string().matches(/^\.\w{2,}$/, "Extensión no es valida").required("Extensión es requerido"),
  debqUrl: Yup.string().url("La URL no es valida").required("URL del debQ es requerido"),
  debqUser: Yup.string().required("Usuario del debQ es requerido"),
  debqPassword: Yup.string().required("Contraseña del debQ es requerido"),
  timeZone: Yup.string().required("Zona horaria es requerido"),
});
