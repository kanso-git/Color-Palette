import { useField, FieldAttributes } from "formik";
import React from "react";
import TextField from "@material-ui/core/TextField";

type MaterialFieldProps = {
  label: string;
  placeHolder: string;
} & FieldAttributes<{}>;

const MaterialField: React.FC<MaterialFieldProps> = ({
  label,
  placeHolder,
  className,
  ...props
}) => {
  const [field, meta] = useField<{}>(props);

  return (
    <TextField
      className={className}
      error={!!meta.error && meta.touched}
      id="standard-error-helper-text"
      variant="filled"
      label={label}
      margin="normal"
      defaultValue={placeHolder}
      helperText={meta.error && meta.touched && meta.error}
      {...field}
    />
  );
};
export default MaterialField;
