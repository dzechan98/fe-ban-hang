import { Page } from "@components/core";
import { LoginForm } from "@components/modules";
import { AuthLayout } from "@layouts/AuthLayout";

export const LoginPage = () => {
  return (
    <Page title="Đăng nhập">
      <AuthLayout isLogin>
        <LoginForm />
      </AuthLayout>
    </Page>
  );
};
