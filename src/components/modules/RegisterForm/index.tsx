import { yupResolver } from "@hookform/resolvers/yup";
import { Button, CircularProgress, Stack, Typography } from "@mui/material";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { RHFTextField, VisiblePassword } from "@components/core";
import { RegisterInput, useRegister } from "@api/auth";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@router/constants";
import { usePasswordVisibility } from "@hooks/usePasswordVisible";
import { toast } from "react-toastify";
import { getError } from "@utils/getError";

export const RegisterForm = () => {
  const { mutate, isPending } = useRegister();
  const navigate = useNavigate();
  const passwordVisible = usePasswordVisibility();

  const registerFormSchema = useMemo(
    () =>
      yup.object({
        name: yup.string().required(),
        email: yup.string().email().required(),
        password: yup.string().required().min(8),
      }),
    []
  );

  const { control, handleSubmit } = useForm<RegisterInput>({
    resolver: yupResolver(registerFormSchema),
  });

  const onSubmit = handleSubmit((value) => {
    mutate(value, {
      onSuccess: () => {
        navigate(ROUTES.home);
      },
      onError: (error) => {
        toast.error(getError(error));
      },
    });
  });

  return (
    <form onSubmit={onSubmit} style={{ width: "100%" }}>
      <Stack spacing={2.5}>
        <RHFTextField
          label="Tên hiển thị"
          controlProps={{
            name: "name",
            control,
          }}
        />
        <RHFTextField
          label="Email"
          controlProps={{
            name: "email",
            control,
          }}
        />
        <RHFTextField
          textFieldProps={{
            type: passwordVisible.visible ? "text" : "password",
            InputProps: {
              endAdornment: (
                <VisiblePassword
                  visible={passwordVisible.visible}
                  onToggleVisible={passwordVisible.onTogglePasswordVisible}
                  controlProps={{
                    name: "password",
                    control,
                  }}
                />
              ),
            },
          }}
          label="Mật khẩu"
          controlProps={{
            name: "password",
            control,
          }}
        />
        <Button type="submit" variant="outlined" size="large">
          {isPending ? (
            <CircularProgress size={26} />
          ) : (
            <Typography fontWeight="600">Đăng ký</Typography>
          )}
        </Button>
      </Stack>
    </form>
  );
};
