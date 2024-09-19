import { Page } from "@components/core";
import { ProductForm } from "@components/modules";
import { Typography } from "@mui/material";

export const EditProductPage = () => {
  return (
    <Page title="Cập nhật sản phẩm">
      <Typography color="primary.main" fontSize="24px" marginBottom={2}>
        Cập nhật sản phẩm
      </Typography>
      <ProductForm />
    </Page>
  );
};
