import * as React from 'react';
import Button from '@mui/material/Button';
import { useSnackbar } from 'notistack';
import { Box } from '@mui/material';
import { Form, Formik } from 'formik';
import { DebFormMultiSelect } from 'components/DebFormComponents';


const MobileConnection = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleClick = () => {
      enqueueSnackbar('I love hooks');
  };

  return (
    <>
      <Button onClick={handleClick}>Show snackbar</Button>
      <Formik
      initialValues={{tags: []}}
      >
        <Form>
          <DebFormMultiSelect
          name={"tags"}
          label="etiquetas"
          selectOptions={[{value: "1", label: "Etiqueta 1"}, {value: "2", label: "Etiqueta 2"}]}
          />
        </Form>
      </Formik>
    </>
  );
}

export default MobileConnection;


