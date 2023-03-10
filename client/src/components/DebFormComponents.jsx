import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  ListItemText,
  FormHelperText,
} from "@mui/material";
import { useField, useFormikContext } from "formik";
import React, { useEffect } from "react";
import { DatePicker } from '@mui/x-date-pickers/DatePicker'

export function DebFormTextInput({ label, ...props }) {
  const [field, meta, helper] = useField(props);

  return (
    <TextField
      id={`deb-form-text-input-${props.name}`}
      sx={{ width: "100%" }}
      variant="outlined"
      label={label}
      {...field}
      {...props}
      error={meta.touched && meta.error ? true : false}
      helperText={meta.touched && meta.error ? meta.error : " "}
    />
  );
}


export function DebFormCheckbox({ label, ...props }) {
  const [field, meta] = useField(props);
  return (
    <FormGroup>
      <FormControlLabel
        control={<Checkbox {...field} {...props} />}
        label={label}
      />
    </FormGroup>
  );
}


export function DebFormSelect({ label, selectOptions, ...props }) {
  const [field, meta] = useField(props);
  const error = meta.touched && meta.error ? true : false;
  return (
    <FormControl fullWidth>
      <InputLabel error={error}>{label}</InputLabel>
      <Select id={`deb-from-select-${props.name}`} label={label} {...field} {...props} error={error}>
        {selectOptions.map((option) => {
          return (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          );
        })}
      </Select>
      <FormHelperText error={error}>
        {meta.touched && meta.error ? meta.error : " "}
      </FormHelperText>
    </FormControl>
  );
}

export function DebFormMultiSelect({
  label,
  selectOptions,
  maxHeight,
  width,
  ...props
}) {
  const [field, meta] = useField(props);
  const error = meta.touched && meta.error ? true : false;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: maxHeight || 224,
        width: width || 250,
      },
    },
  };

  return (
    <div>
      <FormControl fullWidth>
        <InputLabel>{label}</InputLabel>
        <Select
          label={label}
          id={`deb-from-multi-select-${props.name}`}
          multiple
          input={<OutlinedInput label={label} />}
          renderValue={(selected) => {
            return selected
              .map((elem) => {
                const opt = selectOptions.filter(
                  (option) => option.value === elem
                );
                return opt.length > 0 ? opt[0].label : "";
              })
              .join(", ");
          }}
          MenuProps={MenuProps}
          {...field}
          {...props}
          error={error}>
          {selectOptions?.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              <Checkbox checked={field.value.includes(option.value)} />
              <ListItemText primary={option.label} />
            </MenuItem>
          ))}
        </Select>
        <FormHelperText error={error}>
          {meta.touched && meta.error ? meta.error : " "}
        </FormHelperText>
      </FormControl>
    </div>
  );
}

export function DebDatePickerInput({ label, ...props }) {
  const {setFieldValue} = useFormikContext();
  const [field, meta] = useField(props);
  const error = meta.touched && meta.error ? true : false;
  return (
    <FormControl>
      <DatePicker
            label={label}
            {...field}
            {...props}
            renderInput={(params) => <TextField {...params} />}
            selected={(field.value && new Date(field.value)) || null}
            onChange={val => {
              setFieldValue(field.name, val);
            }}
            error={error}
            
        />
        <FormHelperText error={error}>
          {meta.touched && meta.error ? meta.error : " "}
        </FormHelperText>
      </FormControl>
    
  );
}

/**
 * Listener de cambios para Formik o DebFormModal
 * El Busca el contexto de Formik y le pasa values a onChange
 */

export const DebFormListener = ({ otraCosa }) => {
  const { values } = useFormikContext();
  useEffect(() => {
    otraCosa(values);
  }, [values, otraCosa]);
  return null;
};

export function formBuilder(fields) {
  return (
    <>
      {fields.map((field) => {
        switch (field.type) {
          case "text":
            return (
              <DebFormTextInput
                key={field.name}
                label={field.label}
                name={field.name}
              />
            );
            break;
          case "checkbox":
            return (
              <DebFormCheckbox
                key={field.name}
                label={field.label}
                name={field.name}
              />
            );
            break;
          case "select":
            return (
              <DebFormSelect
                key={field.name}
                label={field.label}
                name={field.name}
                selectOptions={field.selectOptions}
              />
            );
            break;
          case "multiSelect":
            return (
              <DebFormMultiSelect
                key={field.name}
                label={field.label}
                name={field.name}
                selectOptions={field.selectOptions}
              />
            );
            case "datePicker":
            return (
              <DebDatePickerInput
                key={field.name}
                label={field.label}
                name={field.name}
                select={field.value}
              />
            );
            break;
          default:
            break;
        }
      })}
    </>
  );
}

// const MyTextInput = ({ label, ...props }) => {
//   // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
//   // which we can spread on <input>. We can use field meta to show an error
//   // message if the field is invalid and it has been touched (i.e. visited)
//   const [field, meta] = useField(props);
//   return (
//     <>
//       <label htmlFor={props.id || props.name}>{label}</label>
//       <input className="text-input" {...field} {...props} />
//       {meta.touched && meta.error ? (
//         <div className="error">{meta.error}</div>
//       ) : null}
//     </>
//   );