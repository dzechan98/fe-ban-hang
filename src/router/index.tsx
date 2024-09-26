import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ROUTES } from "./constants";
import {
  HomePage,
  LoginPage,
  CategoriesPage,
  RegisterPage,
  UsersPage,
  ProductsPage,
  ProductDetailPage,
  CreateProductPage,
  EditProductPage,
  CreateCategoryPage,
  EditCategoryPage,
  CreateUserPage,
  EditUserPage,
  ProfilePage,
} from "../pages";
import { DefaultLayout } from "@layouts/DefaultLayout";
import { AdminLayout } from "@layouts/AdminLayout";
import { PrivateRoute } from "@router/PrivateRoute.tsx";
import { AuthProvider } from "@contexts/UserContext.tsx";
import AccountLayout from "@layouts/AccoutLayout";

const useAppRouter = () => {
  return createBrowserRouter([
    {
      element: <AuthProvider />,
      children: [
        {
          element: <DefaultLayout />,
          children: [
            { path: ROUTES.home, element: <HomePage /> },
            { path: ROUTES.productDetail, element: <ProductDetailPage /> },
          ],
        },
        {
          element: <PrivateRoute />,
          children: [
            {
              element: <DefaultLayout />,
              children: [
                {
                  element: <AccountLayout />,
                  children: [
                    { path: ROUTES.account.profile, element: <ProfilePage /> },
                  ],
                },
              ],
            },
          ],
        },
        {
          element: <PrivateRoute adminRoute />,
          children: [
            {
              element: <AdminLayout />,
              children: [
                {
                  path: ROUTES.categories.root,
                  children: [
                    { index: true, element: <CategoriesPage /> },
                    {
                      path: ROUTES.categories.new,
                      element: <CreateCategoryPage />,
                    },
                    {
                      path: ROUTES.categories.edit,
                      element: <EditCategoryPage />,
                    },
                  ],
                },
                {
                  path: ROUTES.products.root,
                  children: [
                    { index: true, element: <ProductsPage /> },
                    {
                      path: ROUTES.products.new,
                      element: <CreateProductPage />,
                    },
                    {
                      path: ROUTES.products.edit,
                      element: <EditProductPage />,
                    },
                  ],
                },
                {
                  path: ROUTES.users.root,
                  children: [
                    { index: true, element: <UsersPage /> },
                    {
                      path: ROUTES.users.new,
                      element: <CreateUserPage />,
                    },
                    {
                      path: ROUTES.users.edit,
                      element: <EditUserPage />,
                    },
                  ],
                },
              ],
            },
          ],
        },
        { path: ROUTES.login, element: <LoginPage /> },
        { path: ROUTES.register, element: <RegisterPage /> },
      ],
    },
  ]);
};

export const Router: React.FC = () => {
  const appRouter = useAppRouter();

  return <RouterProvider router={appRouter} />;
};
