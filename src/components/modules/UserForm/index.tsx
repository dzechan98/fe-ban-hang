import { CategoryResponse, useListCategories } from "@api/categories";
import {
  ProductInput,
  useAddProduct,
  useEditProduct,
  useGetProduct,
} from "@api/users";
import { RHFSelect, RHFTextField, UploadImage } from "@components/core";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Grid2, Stack } from "@mui/material";
import { ROUTES } from "@router/constants";
import { getError } from "@utils/getError";
import { useEffect, useMemo, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useMatch, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";

export const UserForm = () => {
  const isAddMode = Boolean(useMatch(ROUTES.users.new));
  const { id } = useParams();

  const { data: product } = useGetProduct(id);
  const { data: listCategories } = useListCategories({});

  const addProductMutation = useAddProduct();
  const editProductMutation = useEditProduct();

  const [resetImages, setResetImage] = useState(false);
  const navigate = useNavigate();

  const productSchema = useMemo(
    () =>
      yup.object({
        title: yup.string().required(),
        description: yup.string().required(),
        quantity: yup
          .number()
          .required()
          .min(0, "Số lượng của sản phẩm không thể âm"),
        price: yup.number().required().min(0, "Giá của sản phẩm không thể âm"),
        category: yup.string().required(),
        color: yup.string().required(),
        images: yup
          .array()
          .of(yup.string().required("URL hình ảnh không hợp lệ"))
          .min(1, "Cần ít nhất một hình ảnh sản phẩm")
          .max(6, "Tối đa là 6 hình ảnh sản phẩm")
          .default([]),
        image_thumbnail: yup.string().required("Hình ảnh đại diện là bắt buộc"),
      }),
    []
  );

  const { control, handleSubmit, reset, setValue } = useForm<ProductInput>({
    resolver: yupResolver(productSchema),
  });

  const onSubmit = handleSubmit(async (value) => {
    console.log(value);

    if (!id) {
      try {
        await addProductMutation.mutateAsync(value);
        toast.success("Thêm sản phẩm thành công");
        reset({
          title: "",
          description: "",
          color: "",
          price: undefined,
          quantity: undefined,
          category: "",
          image_thumbnail: "",
          images: [],
        });
        setResetImage(!resetImages);
      } catch (error) {
        toast.error(getError(error));
      }

      return;
    }

    try {
      await editProductMutation.mutateAsync({ id, input: value });
      toast.success("Cập nhật sản phẩm thành công");
      navigate(-1);
    } catch (error) {
      toast.error(getError(error));
    }
  });

  useEffect(() => {
    if (product) {
      setValue("title", product.title);
      setValue("description", product.description);
      setValue("color", product.color);
      setValue("price", product.price);
      setValue("image_thumbnail", product.image_thumbnail);
      setValue("quantity", product.quantity);
      setValue("images", product.images);
      setValue("category", product.category._id);
      setResetImage(!resetImages);
    }
  }, [product, setValue]);

  return (
    <form onSubmit={onSubmit}>
      <Stack gap={2}>
        <Grid2 container spacing={2}>
          <Grid2 size={12}>
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
          <Grid2 size={6}>
            <RHFSelect
              name="category"
              label="Danh mục"
              control={control}
              options={categoryOptions(listCategories?.results ?? [])}
            />
          </Grid2>
          <Grid2 size={6}>
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
          <Grid2 size={6}>
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
          <Grid2 size={6}>
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
          <Grid2 size={12}>
            <RHFTextField
              label="Mô tả sản phẩm"
              controlProps={{
                name: "description",
                control,
              }}
              textFieldProps={{
                fullWidth: true,
                multiline: true,
                rows: 4,
              }}
            />
          </Grid2>
          <Grid2 size={4}>
            <Controller
              name="image_thumbnail"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <UploadImage
                  label="Hình ảnh đại diện"
                  onChange={(files) => field.onChange(files[0])}
                  error={!!error}
                  helperText={error?.message}
                  reset={resetImages}
                  initialImages={
                    product?.image_thumbnail ? [product.image_thumbnail] : []
                  }
                />
              )}
            />
          </Grid2>
          <Grid2 size={8}>
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
                  reset={resetImages}
                  initialImages={product?.images ?? []}
                />
              )}
            />
          </Grid2>
        </Grid2>
        <Stack direction="row" gap={2} justifyContent="flex-end">
          <Button variant="outlined" color="error" onClick={() => navigate(-1)}>
            Quay lại
          </Button>
          <Button type="submit" variant="outlined">
            {isAddMode ? "Thêm sản phẩm" : "Cập nhật sản phẩm"}
          </Button>
        </Stack>
      </Stack>
    </form>
  );
};
