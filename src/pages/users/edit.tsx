import { Page } from "@components/core";
import { UserForm } from "@components/modules/UserForm";
import { Typography } from "@mui/material";

export const EditUserPage = () => {
  return (
    <Page title="Cập nhật tài khoản">
      <Typography color="primary.main" fontSize="24px" marginBottom={2}>
        Cập nhật tài khoản
      </Typography>
      <UserForm />
    </Page>
  );
};
