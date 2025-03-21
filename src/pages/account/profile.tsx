import { UserResponse } from "@api/users";
import { Page } from "@components/core";
import { useAuth } from "@contexts/UserContext";
import { Button, Divider, Stack, Typography } from "@mui/material";
import { ROUTES } from "@router/constants";
import dayjs from "dayjs";
import React from "react";
import { useNavigate } from "react-router-dom";

const infoUser = (user?: UserResponse | null) => {
  return [
    {
      label: "Tên",
      value: user?.name,
    },
    {
      label: "Email",
      value: user?.email,
    },
    {
      label: "Số điện thoại",
      value: user?.phone,
    },
    {
      label: "Ngày sinh",
      value: user?.birthday ? dayjs(user?.birthday).format("DD/MM/YYYY") : "",
    },
    {
      label: "Giới tính",
      value: user?.gender,
    },
  ];
};

export const ProfilePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <Page title="Hồ sơ của tôi" bgcolor="white" p={3}>
      <Typography fontWeight="600" fontSize="18px">
        Hồ sơ của tôi
      </Typography>
      <Typography fontSize="12px" marginBottom={0.5}>
        Quản lý thông tin hồ sơ để bảo mật tài khoản
      </Typography>
      <Divider />
      <Stack marginTop={2} gap={3}>
        {infoUser(user).map((item, index) => (
          <React.Fragment key={index}>
            {
              <Stack direction="row" gap={3}>
                <Typography width={160} color="#555555cc" variant="body2">
                  {item.label}
                </Typography>
                <Typography variant="body2">{item.value}</Typography>
              </Stack>
            }
          </React.Fragment>
        ))}
        <Stack direction="row" justifyContent="flex-end">
          <Button
            variant="contained"
            onClick={() => navigate(ROUTES.account.editProfile)}
            sx={{
              maxWidth: 200,
            }}
          >
            Sửa
          </Button>
        </Stack>
      </Stack>
    </Page>
  );
};
