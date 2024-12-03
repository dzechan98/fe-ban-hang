import { ChangePasswordInput, useChangePassword } from "@api/auth";
import { Page, RHFTextField, VisiblePassword } from "@components/core";
import { useAuth } from "@contexts/UserContext";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNotification } from "@hooks/useNotification";
import { usePasswordVisibility } from "@hooks/usePasswordVisible";
import { Box, Button, Grid2, Stack, Typography } from "@mui/material";
import { getError } from "@utils/getError";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

export const ChangePasswordPage = () => {
  const { success, error: errorNotification } = useNotification();
  const { user } = useAuth();
  const changePasswordSchema = useMemo(
    () =>
      yup.object({
        newPassword: yup
          .string()
          .required()
          .min(8, "Mật khẩu mới phải chứa ít nhất 8 ký tự"),
        confirmNewPassword: yup
          .string()
          .required()
          .oneOf([yup.ref("newPassword")], "Mật khẩu xác nhận không khớp."),
      }),
    []
  );

  const changePasswordMutation = useChangePassword();
  const newPasswordVisible = usePasswordVisibility();
  const confirmNewPasswordVisible = usePasswordVisibility();

  const { control, handleSubmit, reset } = useForm<ChangePasswordInput>({
    resolver: yupResolver(changePasswordSchema),
  });

  const onSubmit = handleSubmit(async (value) => {
    try {
      await changePasswordMutation.mutateAsync({
        input: value,
        userId: String(user?._id),
      });
      reset();
      success("Đổi mật khẩu thành công", { autoHideDuration: 3000 });
    } catch (error) {
      errorNotification(getError(error), { autoHideDuration: 3000 });
    }
  });

  return (
    <Page title="Đổi mật khẩu">
      <Box
        p={3}
        display="flex"
        justifyContent="center"
        flexDirection="column"
        bgcolor="white"
      >
        <Typography mb={2} fontSize="18px" fontWeight="bold">
          Đổi mật khẩu
        </Typography>
        <form onSubmit={onSubmit}>
          <Stack gap={2}>
            <Grid2 container spacing={2}>
              <Grid2 size={6}>
                <RHFTextField
                  textFieldProps={{
                    fullWidth: true,
                    size: "small",
                    type: newPasswordVisible.visible ? "text" : "password",
                    InputProps: {
                      endAdornment: (
                        <VisiblePassword
                          visible={newPasswordVisible.visible}
                          onToggleVisible={
                            newPasswordVisible.onTogglePasswordVisible
                          }
                          controlProps={{
                            name: "newPassword",
                            control,
                          }}
                        />
                      ),
                    },
                  }}
                  label="Mật khẩu mới"
                  controlProps={{
                    name: "newPassword",
                    control,
                  }}
                />
              </Grid2>
              <Grid2 size={6}>
                <RHFTextField
                  textFieldProps={{
                    fullWidth: true,
                    size: "small",
                    type: confirmNewPasswordVisible.visible
                      ? "text"
                      : "password",
                    InputProps: {
                      endAdornment: (
                        <VisiblePassword
                          visible={confirmNewPasswordVisible.visible}
                          onToggleVisible={
                            confirmNewPasswordVisible.onTogglePasswordVisible
                          }
                          controlProps={{
                            name: "confirmNewPassword",
                            control,
                          }}
                        />
                      ),
                    },
                  }}
                  label="Xác nhận mật khẩu mới"
                  controlProps={{
                    name: "confirmNewPassword",
                    control,
                  }}
                />
              </Grid2>
            </Grid2>
            <Stack direction="row" justifyContent="flex-end">
              <Button type="submit" variant="contained">
                Xác nhận
              </Button>
            </Stack>
          </Stack>
        </form>
      </Box>
    </Page>
  );
};
