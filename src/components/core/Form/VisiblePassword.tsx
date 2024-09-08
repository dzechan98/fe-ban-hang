import { IconButton, InputAdornment } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";

interface VisibilityPasswordProps<TField extends FieldValues> {
  visible: boolean;
  onToggleVisible: () => void;
  controlProps: UseControllerProps<TField>;
}

export const VisiblePassword = <TField extends FieldValues>({
  visible,
  onToggleVisible,
  controlProps,
}: VisibilityPasswordProps<TField>) => {
  const {
    fieldState: { error },
  } = useController(controlProps);

  return (
    <InputAdornment position="end">
      <IconButton
        onClick={onToggleVisible}
        onMouseDown={onToggleVisible}
        color={error ? "error" : "inherit"}
      >
        {!visible ? <VisibilityOff /> : <Visibility />}
      </IconButton>
    </InputAdornment>
  );
};
