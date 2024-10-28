import { Page } from "@components/core";
import { RegisterForm } from "@components/modules";
import { AuthLayout } from "@layouts/AuthLayout";

export const RegisterPage = () => {
  return (
    <Page title="Đăng ký">
      <AuthLayout isLogin={false}>
        <RegisterForm />
      </AuthLayout>
    </Page>
  );
};
