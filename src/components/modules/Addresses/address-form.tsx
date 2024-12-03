import {
  AddressInput,
  useCreateAddress,
  useEditAddress,
  useGetAddress,
} from "@api/address";
import { RHFTextField } from "@components/core";
import { useAuth } from "@contexts/UserContext";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNotification } from "@hooks/useNotification";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid2,
  Stack,
  Typography,
} from "@mui/material";
import { getError } from "@utils/getError";
import React, { useEffect, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

interface AddressFormProps {
  type: "edit" | "add";
  addressId?: string;
  onTypeView?: () => void;
}

export const AddressForm: React.FC<AddressFormProps> = ({
  type,
  addressId,
  onTypeView,
}) => {
  const { error: errorNotification } = useNotification();
  const isAddMode = type === "add";
  const { user } = useAuth();
  const { data: address } = useGetAddress(addressId);
  const queryKey = ["addresses"];

  const createAddressMutation = useCreateAddress({ queryKey });
  const editAddressMutation = useEditAddress({ queryKey });

  const addressSchema = useMemo(
    () =>
      yup.object({
        name: yup.string().required(),
        phone: yup.string().required(),
        street: yup.string().required(),
        ward: yup.string().required(),
        district: yup.string().required(),
        city: yup.string().required(),
        isDefault: yup.boolean(),
      }),
    []
  );

  const { control, handleSubmit, setValue } = useForm<
    Omit<AddressInput, "userId">
  >({
    resolver: yupResolver(addressSchema),
  });

  const onSubmit = handleSubmit(async (value) => {
    if (!user) return;
    const body: AddressInput = { ...value, userId: user?._id };

    try {
      if (!addressId) {
        await createAddressMutation.mutateAsync(body);
        onTypeView?.();

        return;
      }
      await editAddressMutation.mutateAsync({ id: addressId, input: body });
      onTypeView?.();
    } catch (error) {
      errorNotification(getError(error), {
        autoHideDuration: 3000,
      });
    }
  });

  useEffect(() => {
    if (address) {
      setValue("name", address.name);
      setValue("phone", address.phone);
      setValue("street", address.street);
      setValue("ward", address.ward);
      setValue("district", address.district);
      setValue("city", address.city);
      setValue("isDefault", address.isDefault);
    }
  }, [address, setValue]);

  return (
    <Box p={3} maxWidth={600}>
      <Typography mb={2}>
        {isAddMode ? "Thêm địa chỉ" : "Cập nhật địa chỉ"}
      </Typography>
      <form onSubmit={onSubmit}>
        <Stack gap={2}>
          <Grid2 container spacing={2}>
            <Grid2 size={6}>
              <RHFTextField
                label="Họ và tên"
                controlProps={{
                  name: "name",
                  control,
                }}
                textFieldProps={{
                  fullWidth: true,
                  size: "small",
                }}
              />
            </Grid2>
            <Grid2 size={6}>
              <RHFTextField
                label="Số điên thoại"
                controlProps={{
                  name: "phone",
                  control,
                }}
                textFieldProps={{
                  fullWidth: true,
                  size: "small",
                }}
              />
            </Grid2>
            <Grid2 size={6}>
              <RHFTextField
                label="Phường/Xã"
                controlProps={{
                  name: "ward",
                  control,
                }}
                textFieldProps={{
                  fullWidth: true,
                  size: "small",
                }}
              />
            </Grid2>
            <Grid2 size={6}>
              <RHFTextField
                label="Quận/Huyện"
                controlProps={{
                  name: "district",
                  control,
                }}
                textFieldProps={{
                  fullWidth: true,
                  size: "small",
                }}
              />
            </Grid2>
            <Grid2 size={6}>
              <RHFTextField
                label="Thành phố/Tỉnh"
                controlProps={{
                  name: "city",
                  control,
                }}
                textFieldProps={{
                  fullWidth: true,
                  size: "small",
                }}
              />
            </Grid2>
            <Grid2 size={6}>
              <RHFTextField
                label="Địa chỉ cụ thể"
                controlProps={{
                  name: "street",
                  control,
                }}
                textFieldProps={{
                  fullWidth: true,
                  size: "small",
                }}
              />
            </Grid2>
            {!address?.isDefault && (
              <Grid2 size={12}>
                <Controller
                  control={control}
                  name="isDefault"
                  defaultValue={false}
                  render={({ field: { value, onChange } }) => (
                    <FormControlLabel
                      control={
                        <Checkbox
                          size="small"
                          checked={!!value}
                          onChange={(e) => onChange(e.target.checked)}
                        />
                      }
                      label="Đặt làm địa chỉ mặc định"
                    />
                  )}
                />
              </Grid2>
            )}
          </Grid2>
          <Stack direction="row" gap={2} justifyContent="flex-end">
            <Button onClick={onTypeView}>Trở lại</Button>
            <Button type="submit" variant="contained">
              {isAddMode ? "Hoàn thành" : "Cập nhật"}
            </Button>
          </Stack>
        </Stack>
      </form>
    </Box>
  );
};
