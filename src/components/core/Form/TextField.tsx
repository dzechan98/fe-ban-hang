import { TextField, TextFieldProps } from "@mui/material";
import {
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";

export type RHFTextFieldProps<TField extends FieldValues> = {
  label?: string;
  variant?: TextFieldProps["variant"];
  textFieldProps?: TextFieldProps;
  controlProps: UseControllerProps<TField>;
};

export const RHFTextField = <TField extends FieldValues>({
  label,
  variant,
  textFieldProps,
  controlProps,
}: RHFTextFieldProps<TField>) => {
  const {
    field: { ref, value, onChange, ...restField },
    fieldState: { error },
  } = useController(controlProps);

  return (
    <TextField
      {...textFieldProps}
      {...restField}
      onChange={(e) => {
        onChange(e);
        textFieldProps?.onChange?.(e);
      }}
      variant={variant}
      sx={textFieldProps?.sx}
      value={value ?? ""}
      label={label}
      error={!!error}
      helperText={error?.message}
      inputRef={ref}
    />
  );
};
