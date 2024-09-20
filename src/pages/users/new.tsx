import { Page } from "@components/core";
import { Typography } from "@mui/material";

export const CreateUserPage = () => {
  return (
    <Page title="Thêm tài khoản">
      <Typography color="primary.main" fontSize="24px" marginBottom={2}>
        Thêm tài khoản
      </Typography>
      {/* <ProductForm /> */}
    </Page>
  );
};
