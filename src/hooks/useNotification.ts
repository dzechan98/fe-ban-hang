import { OptionsWithExtraProps, useSnackbar } from "notistack";

export const useNotification = () => {
  const { enqueueSnackbar } = useSnackbar();

  const success = (
    message: string,
    options: OptionsWithExtraProps<"success">
  ) => {
    enqueueSnackbar(message, {
      ...options,
      variant: "success",
    });
  };

  const error = (message: string, options: OptionsWithExtraProps<"error">) => {
    enqueueSnackbar(message, {
      ...options,
      variant: "error",
    });
  };

  const info = (message: string, options: OptionsWithExtraProps<"info">) => {
    enqueueSnackbar(message, {
      ...options,
      variant: "info",
    });
  };

  const warning = (
    message: string,
    options: OptionsWithExtraProps<"warning">
  ) => {
    enqueueSnackbar(message, {
      ...options,
      variant: "warning",
    });
  };

  const normal = (
    message: string,
    options: OptionsWithExtraProps<"default">
  ) => {
    enqueueSnackbar(message, {
      ...options,
      variant: "default",
    });
  };

  return {
    success,
    error,
    info,
    warning,
    normal,
  };
};
