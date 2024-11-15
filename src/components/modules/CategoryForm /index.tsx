import {
  CategoryInput,
  useAddCategory,
  useEditCategory,
  useGetCategory,
} from "@api/categories";
import { RHFTextField, UploadImage } from "@components/core";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Grid2, Stack } from "@mui/material";
import { ROUTES } from "@router/constants";
import { getError } from "@utils/getError";
import { useEffect, useMemo, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useMatch, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";

export const CategoryForm = () => {
  const isAddMode = Boolean(useMatch(ROUTES.categories.new));
  const { id } = useParams();

  const { data: category } = useGetCategory(id);

  const addCategoryMutation = useAddCategory();
  const editCategoryMutation = useEditCategory();

  const [resetImages, setResetImage] = useState(false);
  const navigate = useNavigate();

  const categorySchema = useMemo(
    () =>
      yup.object({
        title: yup.string().required(),
        image_url: yup.string().required("Hình ảnh là bắt buộc"),
      }),
    []
  );

  const { control, handleSubmit, reset, setValue } = useForm<CategoryInput>({
    resolver: yupResolver(categorySchema),
  });

  const onSubmit = handleSubmit(async (value) => {
    if (!id) {
      try {
        await addCategoryMutation.mutateAsync(value);
        toast.success("Thêm danh mục thành công");
        reset({
          title: "",
          image_url: "",
        });
        setResetImage(!resetImages);
      } catch (error) {
        toast.error(getError(error));
      }

      return;
    }

    try {
      await editCategoryMutation.mutateAsync({ id, input: value });
      toast.success("Cập nhật danh mục thành công");
      navigate(-1);
    } catch (error) {
      toast.error(getError(error));
    }
  });

  useEffect(() => {
    if (category) {
      setValue("title", category.title);
      setValue("image_url", category.image_url);

      setResetImage(!resetImages);
    }
  }, [category, setValue]);

  return (
    <form onSubmit={onSubmit}>
      <Stack gap={2}>
        <Grid2 container spacing={2}>
          <Grid2 size={12}>
            <RHFTextField
              label="Danh mục"
              controlProps={{
                name: "title",
                control,
              }}
              textFieldProps={{
                fullWidth: true,
              }}
            />
          </Grid2>
          <Grid2 size={3}>
            <Controller
              name="image_url"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <UploadImage
                  label="Hình ảnh"
                  onChange={(file) => field.onChange(file)}
                  error={!!error}
                  helperText={error?.message}
                  reset={resetImages}
                  initialImage={category?.image_url}
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
            {isAddMode ? "Thêm danh mục" : "Cập nhật danh mục"}
          </Button>
        </Stack>
      </Stack>
    </form>
  );
};
