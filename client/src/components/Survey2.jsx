import React from 'react';
import {Formik, Form} from 'formik';
import * as Yup from 'yup';
import makeStyles from '@mui/styles/makeStyles';
import {
    Container,
    Grid
} from '@mui/material'

const INITIAL_FORM_STATE = {

};

const FORM_VALIDATION = Yup.object().shape({})

function Survey2() {
  return (
    <Formik
      initialValues={{
        ...INITIAL_FORM_STATE
      }}
      validationSchema={FORM_VALIDATION}
      onSubmit={values => {
        console.log(values);
      }}
    >
      <Form>

      </Form>
      
    </Formik>
  )
}

export default Survey2
