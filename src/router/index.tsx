import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ROUTES } from "./constants";
import { AuthRoute } from "./AuthRoute.tsx";
import {
  HomePage,
  LoginPage,
  CategoryPage,
  RegisterPage,
  UsersPage,
  ProductsPage,
} from "../pages";
import { DefaultLayout } from "@layouts/DefaultLayout";
import { AdminLayout } from "@layouts/AdminLayout";
import AuthProvider from "@contexts/UserContext";
import { UserRoute } from "@router/UserRoute.tsx";

const useAppRouter = () => {
  return createBrowserRouter([
    {
      element: <AuthProvider />,
      children: [
        {
          element: <UserRoute />,
          children: [
            {
              element: <DefaultLayout />,
              children: [{ path: ROUTES.home, element: <HomePage /> }],
            },
          ],
        },
        {
          element: <AuthRoute />,
          children: [
            { path: ROUTES.login, element: <LoginPage /> },
            { path: ROUTES.register, element: <RegisterPage /> },
          ],
        },
        {
          element: <AdminLayout />,
          children: [
            {
              element: <AuthRoute />,
              children: [
                { path: ROUTES.home, element: <UsersPage /> },
                {
                  path: ROUTES.categories.root,
                  children: [{ index: true, element: <CategoryPage /> }],
                },
                {
                  path: ROUTES.products.root,
                  children: [{ index: true, element: <ProductsPage /> }],
                },
              ],
            },
          ],
        },
      ],
    },
  ]);
};

export const Router: React.FC = () => {
  const appRouter = useAppRouter();

  return <RouterProvider router={appRouter} />;
};
