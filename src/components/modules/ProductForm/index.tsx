import { useLogin } from "@api/auth";
import { ProductInput } from "@api/products";
import { RHFTextField, UploadImage } from "@components/core";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  CircularProgress,
  Grid2,
  Stack,
  Typography,
} from "@mui/material";
import { useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";

type ProductForm = ProductInput;

export const ProductForm = () => {
  const { mutate, isPending } = useLogin();

  const productSchema = useMemo(
    () =>
      yup.object({
        title: yup.string().required(),
        description: yup.string().required(),
        quantity: yup.number().required(),
        price: yup.number().required(),
        category: yup.string().required(),
        color: yup.string().required(),
        images: yup
          .array()
          .of(yup.mixed())
          .min(1, "Cần ít nhất một hình ảnh sản phẩm"),
        image_thumbnail: yup.mixed().required("Hình ảnh đại diện là bắt buộc"),
      }),
    []
  );

  const { control, handleSubmit } = useForm<ProductForm>({
    resolver: yupResolver(productSchema),
    defaultValues: {
      images: [],
      image_thumbnail: null,
    },
  });

  const onSubmit = handleSubmit((value) => {
    const formData = new FormData();
    Object.entries(value).forEach(([key, val]) => {
      if (key === "images") {
        (val as File[]).forEach((file, index) => {
          formData.append(`images[${index}]`, file);
        });
      } else if (key === "image_thumbnail") {
        formData.append("image_thumbnail", val as File);
      } else {
        formData.append(key, val as string | Blob);
      }
    });
    console.log("Form Data:", Object.fromEntries(formData));
  });

  return (
    <form onSubmit={onSubmit}>
      <Stack gap={2}>
        <Grid2 container spacing={2}>
          <Grid2 size={4}>
            <RHFTextField
              label="Tên sản phẩm"
              controlProps={{
                name: "title",
                control,
              }}
              textFieldProps={{
                fullWidth: true,
              }}
            />
          </Grid2>
          <Grid2 size={4}>
            <RHFTextField
              label="Mô tả sản phẩm"
              controlProps={{
                name: "description",
                control,
              }}
              textFieldProps={{
                fullWidth: true,
                multiline: true,
                rows: 3,
              }}
            />
          </Grid2>
          <Grid2 size={4}>
            <RHFTextField
              label="Số lượng"
              controlProps={{
                name: "quantity",
                control,
              }}
              textFieldProps={{
                type: "number",
                fullWidth: true,
              }}
            />
          </Grid2>
          <Grid2 size={4}>
            <RHFTextField
              label="Giá"
              controlProps={{
                name: "price",
                control,
              }}
              textFieldProps={{
                type: "number",
                fullWidth: true,
              }}
            />
          </Grid2>
          <Grid2 size={4}>
            <RHFTextField
              label="Màu sắc"
              controlProps={{
                name: "color",
                control,
              }}
              textFieldProps={{
                fullWidth: true,
              }}
            />
          </Grid2>
          <Grid2 size={4}>
            <RHFTextField
              label="Danh mục"
              controlProps={{
                name: "category",
                control,
              }}
              textFieldProps={{
                fullWidth: true,
              }}
            />
          </Grid2>
          <Grid2 size={6}>
            <Controller
              name="images"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <UploadImage
                  label="Hình ảnh sản phẩm"
                  onChange={(files) => field.onChange(files)}
                  error={!!error}
                  helperText={error?.message}
                  multiple
                />
              )}
            />
          </Grid2>
          <Grid2 size={6}>
            <Controller
              name="image_thumbnail"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <UploadImage
                  label="Hình ảnh đại diện"
                  onChange={(files) => field.onChange(files[0])}
                  error={!!error}
                  helperText={error?.message}
                />
              )}
            />
          </Grid2>
        </Grid2>
        <Button type="submit" variant="outlined" size="large">
          {isPending ? (
            <CircularProgress size={26} />
          ) : (
            <Typography fontWeight="600">Thêm sản phẩm</Typography>
          )}
        </Button>
      </Stack>
    </form>
  );
};
