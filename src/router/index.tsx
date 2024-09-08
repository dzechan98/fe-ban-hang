import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ROUTES } from "./constants";
import { PrivateRoute } from "./private-route";
import { DefaultLayout } from "@layouts/DefaultLayout";
import {
  HomePage,
  LoginPage,
  CategoryPage,
  RegisterPage,
  UsersPage,
  ProductsPage,
} from "../pages";
import { AdminLayout } from "@layouts/AdminLayout";

const useAppRouter = () => {
  return createBrowserRouter([
    {
      element: <DefaultLayout />,
      children: [
        { path: ROUTES.login, element: <LoginPage /> },
        { path: ROUTES.register, element: <RegisterPage /> },
        { path: ROUTES.home, element: <HomePage /> },
      ],
    },
    {
      element: <AdminLayout />,
      children: [
        {
          element: <PrivateRoute />,
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
        { path: ROUTES.login, element: <LoginPage /> },
        { path: ROUTES.register, element: <RegisterPage /> },
        { path: ROUTES.home, element: <HomePage /> },
      ],
    },
  ]);
};

export const Router: React.FC = () => {
  const appRouter = useAppRouter();

  return <RouterProvider router={appRouter} />;
};
