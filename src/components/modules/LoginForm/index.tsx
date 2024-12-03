import { yupResolver } from "@hookform/resolvers/yup";
import { Button, CircularProgress, Stack, Typography } from "@mui/material";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { RHFTextField, VisiblePassword } from "@components/core";
import { LoginInput, useLogin } from "@api/auth";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@router/constants";
import { usePasswordVisibility } from "@hooks/usePasswordVisible";
import { getError } from "@utils/getError";
import { useNotification } from "@hooks/useNotification";

export const LoginForm = () => {
  const { error: errorNotification } = useNotification();
  const { mutate, isPending } = useLogin();
  const navigate = useNavigate();
  const passwordVisible = usePasswordVisibility();

  const loginFormSchema = useMemo(
    () =>
      yup.object({
        email: yup.string().email().required(),
        password: yup
          .string()
          .required()
          .min(8, "Mật khẩu mới phải chứa ít nhất 8 ký tự"),
      }),
    []
  );

  const { control, handleSubmit } = useForm<LoginInput>({
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
          const msg =
            getError(error) !== "Đã có lỗi xảy ra"
              ? "Tài khoản hoặc mật khẩu không chính xác"
              : "Đã có lỗi xảy ra";

          errorNotification(msg, { autoHideDuration: 3000 });
        },
      }
    );
  });

  return (
    <form onSubmit={onSubmit} style={{ width: "100%" }}>
      <Stack spacing={2.5}>
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
            <Typography fontWeight="600">Đăng nhập</Typography>
          )}
        </Button>
      </Stack>
    </form>
  );
};
