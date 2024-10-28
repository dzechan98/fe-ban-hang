import { Page } from "@components/core";
import { CategoryForm } from "@components/modules";
import { Typography } from "@mui/material";

export const EditCategoryPage = () => {
  return (
    <Page title="Cập nhật danh mục">
      <Typography color="primary.main" fontSize="24px" marginBottom={2}>
        Cập nhật danh mục
      </Typography>
      <CategoryForm />
    </Page>
  );
};
