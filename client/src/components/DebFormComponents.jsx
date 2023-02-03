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
import { useField } from "formik";
import React from "react";

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
          renderValue={(selected) =>
            selected.map((elem) => elem.label).join(", ")
          }
          MenuProps={MenuProps}
          {...field}
          {...props}
          error={error}>
          {selectOptions?.map((option) => (
            <MenuItem key={option.value} value={option}>
              <Checkbox checked={field.value.includes(option)} />
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
