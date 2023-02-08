import * as Yup from "yup";

export const userValidationSchema = Yup.object({
  name: Yup.string().required("Nombre es requerido"),
  email: Yup.string()
    .email("No es un e-mail válido")
    .required("Email es requerido"),
  password: Yup.string()
    .min(8, "Contraseña debe contener al menos 8 caracteres")
    .matches(/\w/, "Contraseña debe contener al menos una letra")
    .matches(/\d/, "Contraseña debe contener al menos un numero")
    .required("Contraseña es requerido"),
});
