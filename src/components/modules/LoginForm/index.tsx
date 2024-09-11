import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Stack } from "@mui/material";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { RHFTextField, VisiblePassword } from "@components/core";
import { useLogin } from "@api/auth";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@router/constants";
import { usePasswordVisibility } from "@hooks/usePasswordVisible";
import { toast } from "react-toastify";
import { getError } from "@utils/getError";

interface LoginFormState {
  email: string;
  password: string;
}

export const LoginForm = () => {
  const { mutate } = useLogin();
  const navigate = useNavigate();
  const passwordVisible = usePasswordVisibility();

  const loginFormSchema = useMemo(
    () =>
      yup.object({
        email: yup.string().email().required(),
        password: yup.string().required().min(8),
      }),
    []
  );

  const { control, handleSubmit } = useForm<LoginFormState>({
    resolver: yupResolver(loginFormSchema),
  });

  const onSubmit = handleSubmit((value) => {
    const { email, password } = value;
    mutate(
      { email, password },
      {
        onSuccess: () => {
          navigate(ROUTES.home);
        },
        onError: (error) => {
          toast.error(getError(error));
        },
      }
    );
  });

  return (
    <form onSubmit={onSubmit} style={{ width: "100%" }}>
      <Stack spacing={1}>
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
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        ></Stack>
        <Button type="submit" variant="outlined" size="large">
          Đăng nhập
        </Button>
      </Stack>
    </form>
  );
};
