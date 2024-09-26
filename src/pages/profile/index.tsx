import { Page } from "@components/core";
import { UserForm } from "@components/modules";
import { Divider, Typography } from "@mui/material";

export const ProfilePage = () => {
  return (
    <Page title="Hồ sơ của tôi">
      <Typography fontWeight="600" fontSize="18px">
        Hồ sơ của tôi
      </Typography>
      <Typography fontSize="12px" marginBottom={0.5}>
        Quản lý thông tin hồ sơ để bảo mật tài khoản
      </Typography>
      <Divider />
      <UserForm />
    </Page>
  );
};
