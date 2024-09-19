import { Control, Controller, FieldValues, Path } from "react-hook-form";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  SelectProps,
} from "@mui/material";

interface Option {
  value: string;
  label: string;
}

interface RHFSelectProps<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>;
  label: string;
  control: Control<TFieldValues>;
  options: Option[];
  selectProps?: Omit<SelectProps, "name" | "value">;
}

export const RHFSelect = <TFieldValues extends FieldValues>({
  name,
  label,
  control,
  options,
  selectProps,
}: RHFSelectProps<TFieldValues>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value = "" }, fieldState: { error } }) => (
        <FormControl fullWidth error={!!error}>
          <InputLabel id={`${name}-label`}>{label}</InputLabel>
          <Select
            labelId={`${name}-label`}
            value={value}
            onChange={(e) => {
              onChange(e);
            }}
            label={label}
            {...selectProps}
          >
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          {error && <FormHelperText>{error.message}</FormHelperText>}
        </FormControl>
      )}
    />
  );
};
