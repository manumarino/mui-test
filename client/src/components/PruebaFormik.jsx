import React, {useState} from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';

function PruebaFormik(userID, userName, userEmail, userCompanyName) {
    const [formularioEnviado, cambiarFormularioEnviado] = useState(false);
    return (
      <>
        <Formik
        initialValues={{
          /*
            nombre: {userName},
          correo: {userEmail},
          nombreCompania: {userCompanyName}
          */
          nombre: 'Jorgito',
          correo: 'correo@correo.com',
          nombreCompania: 'Jorgito SRL'
        }}
        validate={(valores) => {
          let errores = {}
  
          //Validacion nombre
          if(!valores.nombre){
              errores.nombre = 'Por favor ingrese un nombre'
          } else if(!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.nombre)){
              errores.nombre = 'El nombre solo puede contener letras'
          }
  
          //Validacion correo
          if(!valores.correo){
              errores.correo = 'Por favor ingresa un correo electronico'
          } else if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(valores.correo)){
              errores.correo = 'El correo solo puede contener letras, numeros, etc.'
          }

          //Validacion nombre compañia
          //--
  
          return errores;
        }}
        onSubmit={(valores, {resetForm}) => {
          resetForm();
          console.log('Formulario enviado');
          alert(valores);
          cambiarFormularioEnviado(true);
          setTimeout(() => cambiarFormularioEnviado(false), 5000);
        }}
        >
  
        {( {errors} ) => (
          <Form className='formulario'>
              <div>
                  <label htmlFor="nombre">Nombre</label>
                  <Field
                    type='text'
                    id='nombre'
                    name='nombre'
                    placeholder='Jorgito'
                  />
                  <ErrorMessage name='nombre' component={() => (<div className='error'>{errors.name} </div>)}/>
              </div>
              <div>
                  <label htmlFor="correo">Correo</label>
                  <Field
                    type='text'
                    id='correo'
                    name='correo'
                    placeholder='correo@correo.com'
                  />
                  <ErrorMessage name='correo' component={() => (<div className='error'>{errors.correo} </div>)}/>
              </div>
              <div>
                  <label htmlFor="nombre">Nombre de compañía</label>
                  <Field
                    type='text'
                    id='nombreCompania'
                    name='nombreCompania'
                    placeholder='Jorgito SRL'
                  />
                  
              </div>
  
  
              <button type='submit' >Enviar</button>
              {formularioEnviado&& <p className='exito' >Formulario enviado con exito!</p> }
          </Form>
        )}
  
        </Formik>
      </>
    )
  }
  

export default PruebaFormik
