import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ROUTES } from "./constants";
import {
  HomePage,
  LoginPage,
  CategoryPage,
  RegisterPage,
  UsersPage,
  ProductsPage,
  ProductDetailPage,
  CreateProductPage,
  EditProductPage,
} from "../pages";
import { DefaultLayout } from "@layouts/DefaultLayout";
import { AdminLayout } from "@layouts/AdminLayout";
import { PrivateRoute } from "@router/PrivateRoute.tsx";
import { AuthProvider } from "@contexts/UserContext.tsx";

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
          element: <PrivateRoute adminRoute />,
          children: [
            {
              element: <AdminLayout />,
              children: [
                {
                  path: ROUTES.categories.root,
                  children: [{ index: true, element: <CategoryPage /> }],
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
                { path: ROUTES.dashboard, element: <UsersPage /> },
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
