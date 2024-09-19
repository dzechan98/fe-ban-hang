import { Page } from "@components/core";
import { ProductForm } from "@components/modules";
import { Typography } from "@mui/material";

export const CreateProductPage = () => {
  return (
    <Page title="Thêm sản phẩm">
      <Typography color="primary.main" fontSize="24px" marginBottom={2}>
        Thêm sản phẩm
      </Typography>
      <ProductForm />
    </Page>
  );
};
