import { Page } from "@components/core";
import { CategoryForm } from "@components/modules";
import { Typography } from "@mui/material";

export const CreateCategoryPage = () => {
  return (
    <Page title="Thêm danh mục">
      <Typography color="primary.main" fontSize="24px" marginBottom={2}>
        Thêm danh mục
      </Typography>
      <CategoryForm />
    </Page>
  );
};
