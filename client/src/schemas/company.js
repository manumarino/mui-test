import * as Yup from 'yup';

export const companyValidationSchema = Yup.object({
  name: Yup.string().required("Nombre es requerido"),
  logo: Yup.string().required("Logo es requerido"),
  dominio: Yup.string().required("Dominio es requerido."),
  extension: Yup.string().matches(/^((\.\w{2,})|(\.\w{3,}.\w{2,})|(\.\w{2,}))$/, "Extensión no es válida. Ejemplos: '.com', '.com.ar', '.ar', etc.").required("Extensión es requerido"),
  debqUrl: Yup.string().matches(/^((https?:\/\/)|(www.))(?:([a-zA-Z]+)|(\d+\.\d+.\d+.\d+)):\d{4}$/,"La URL no es válida. Debe comenzar con 'http://' o 'www'.").required("URL del debQ es requerido"),
  debqUser: Yup.string().required("Usuario del debQ es requerido"),
  debqPassword: Yup.string()
  .min(8, "Contraseña debe contener al menos 8 caracteres")
  .matches(/\w/, "Contraseña debe contener al menos una letra")
  .matches(/\d/, "Contraseña debe contener al menos un número")
  .required("Contraseña del debQ es requerido"),
  timeZone: Yup.string().required("Zona horaria es requerido"),
});
