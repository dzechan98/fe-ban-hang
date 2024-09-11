import { Page } from "@components/core";
import { LoginForm } from "@components/modules";
import { Container, IconButton, Stack, Typography } from "@mui/material";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";

export const LoginPage = () => {
  return (
    <Page title="Đăng nhập">
      <Container
        maxWidth="sm"
        component={Stack}
        alignItems="center"
        justifyContent="center"
      >
        <Typography fontSize="24px" fontWeight="600">
          Đăng nhập
        </Typography>
        <IconButton>
          <PersonOutlineOutlinedIcon />
        </IconButton>
        <LoginForm />
      </Container>
    </Page>
  );
};
