import { useEditUser, UserInput } from "@api/users";
import { RHFTextField, UploadImage } from "@components/core";
import { useAuth } from "@contexts/UserContext";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Grid2, Stack } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { getError } from "@utils/getError";
import { useEffect, useMemo, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import * as yup from "yup";
import dayjs from "dayjs";

export const UserForm = () => {
  const { user } = useAuth();
  const editUserMutation = useEditUser();
  const queryClient = useQueryClient();

  const [resetImages, setResetImage] = useState(false);

  const userSchema = useMemo(
    () =>
      yup.object({
        name: yup.string().required(),
        email: yup.string().required(),
        image: yup.string().required(),
        birthday: yup.string().required(),
        phone: yup.string(),
      }),
    []
  );

  const { control, handleSubmit, setValue } = useForm<UserInput>({
    resolver: yupResolver(userSchema),
  });

  const onSubmit = handleSubmit(async (value) => {
    if (user) {
      try {
        await editUserMutation.mutateAsync({ id: user._id, input: value });
        queryClient.invalidateQueries({ queryKey: ["me"] });
        toast.success("Cập nhật tài khoản thành công");
      } catch (error) {
        toast.error(getError(error));
      }
    }
  });

  useEffect(() => {
    if (user) {
      setValue("name", user.name);
      setValue("email", user.email);
      setValue("phone", user.phone);
      setValue("image", user.image);
      setValue("birthday", user.birthday);
      setResetImage(!resetImages);
    }
  }, [user, setValue]);

  return (
    <form onSubmit={onSubmit} style={{ marginTop: 30 }}>
      <Stack gap={2}>
        <Grid2 container spacing={2}>
          <Grid2 size={6}>
            <RHFTextField
              label="Tên tài khoản"
              controlProps={{
                name: "name",
                control,
              }}
              textFieldProps={{
                fullWidth: true,
              }}
            />
          </Grid2>
          <Grid2 size={6}>
            <RHFTextField
              label="Email"
              controlProps={{
                name: "email",
                control,
              }}
              textFieldProps={{
                fullWidth: true,
              }}
            />
          </Grid2>
          <Grid2 size={6}>
            <RHFTextField
              label="Số điện thoại"
              controlProps={{
                name: "phone",
                control,
              }}
              textFieldProps={{
                fullWidth: true,
              }}
            />
          </Grid2>
          <Grid2 size={6}>
            <Controller
              name="birthday"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <DatePicker
                  {...field}
                  label="Ngày sinh"
                  format="DD/MM/YYYY"
                  value={field.value ? dayjs(field.value) : null}
                  slotProps={{
                    textField: {
                      error: !!error,
                      helperText: error?.message,
                      fullWidth: true,
                    },
                  }}
                />
              )}
            />
          </Grid2>
          <Grid2 size={3}>
            <Controller
              name="image"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <UploadImage
                  label="Hình ảnh đại diện"
                  onChange={(url) => field.onChange(url)}
                  onRemove={(id) => field.onChange("")}
                  error={!!error}
                  helperText={error?.message}
                  type="circle"
                  reset={resetImages}
                  initialImage={user?.image}
                />
              )}
            />
          </Grid2>
        </Grid2>
        <Stack direction="row" justifyContent="flex-end">
          <Button type="submit" variant="outlined">
            Lưu
          </Button>
        </Stack>
      </Stack>
    </form>
  );
};
