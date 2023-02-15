import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { TextField, Button } from "@mui/material";
import FlexBetween from './FlexBetween';
import api from "../services/api";
import {login} from "../services/login";
import {useNavigate} from "react-router-dom";
import {useSnackbar} from "notistack";

const validationSchema = yup.object({
    email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string('Enter your password')
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
});


function Login() {
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: validationSchema,

        onSubmit: async (values) => {

            try {
                login.getAccessToken(values)

                api.get('http://localhost:8080/')
                    .then(navigate('/debdash'))
            }catch (error){
                enqueueSnackbar('Ocurrió un error inesperado');
            }
        },
    })

    return (
        <FlexBetween>
            <form onSubmit={formik.handleSubmit} >
                <TextField
                    fullWidth
                    id="email"
                    name="email"
                    label="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    sx={{m:"10px"}}
                />
                <TextField
                    fullWidth
                    id="password"
                    name="password"
                    label="Contraseña"
                    type="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                    sx={{m:"10px"}}
                />
                <Button color="primary" variant="contained" fullWidth type="submit" sx={{m:"10px"}}>
                    Iniciar sesión
                </Button>
            </form>
        </FlexBetween>

    )
}

export default Login