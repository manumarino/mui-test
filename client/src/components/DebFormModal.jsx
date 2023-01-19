import React, { useRef, useState } from "react";
import DebModal from "./DebModal";
import { Formik, Form } from "formik";
import { Stack } from "@mui/material";
import {
  DebFormSelect,
  DebFormTextInput,
  formBuilder,
} from "./DebFormComponents";
import { useEffect } from "react";

export default function DebFormModal({
  formConfig,
  formikProps,
  children,
  initialValues,
  onSubmit,
  ...props
}) {
  const formRef = useRef();
  const handleConfirm = () => {
    if (formRef.current) {
      return formRef.current.submitForm();
    }
  };

  const [innerFormikProps, setInnerFormikProps] = useState({});

  useEffect(() => {
    if (props.onConfirm)
      console.warn("[DebFromModal] Do not override onConfirm function");
  }, [props.onConfirm]);

  useEffect(() => {
    // si tengo formConfig, creo y le paso initialValues del form config.
    let formConfigInitialValues = {};
    if (Array.isArray(formConfig?.fields)) {
      formConfig.fields.forEach((field) => {
        formConfigInitialValues[field.name] = field.initialValue;
      });
    }
    let tempFormikProps = {
      onSubmit: onSubmit || formConfig.onSubmit || formikProps.onSubmit,
      initialValues:
        initialValues || formConfigInitialValues || formikProps.initialValue,
      ...formikProps,
    };
    // si no tengo formConfig le paso los props a formik como vienen
    if (typeof formikProps === "object" && !formConfig) {
    }
    setInnerFormikProps(tempFormikProps);

    console.log(innerFormikProps);
  }, [initialValues, formikProps, formConfig, onSubmit]);

  return (
    <DebModal onConfirm={handleConfirm} {...props}>
      <Formik innerRef={formRef} {...innerFormikProps}>
        <Form>
          {formConfig && (
            <Stack spacing={2}>{formBuilder(formConfig.fields)}</Stack>
          )}
          {children}
        </Form> 
      </Formik>
    </DebModal>
  );
}
