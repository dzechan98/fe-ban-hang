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
  EditProfilePage,
  FilterProductPage,
  SearchPage,
  CartPage,
  CheckoutPage,
  PurchasePage,
  OrderSuccessPage,
  OrderPage,
  DashboardPage,
} from "../pages";
import { DefaultLayout } from "@layouts/DefaultLayout";
import { AdminLayout } from "@layouts/AdminLayout";
import { PrivateRoute } from "@router/PrivateRoute.tsx";
import { AuthProvider } from "@contexts/UserContext.tsx";
import AccountLayout from "@layouts/AccountLayout";
import { CartProvider } from "@contexts/CartContext";

const useAppRouter = () => {
  return createBrowserRouter([
    {
      element: <AuthProvider />,
      children: [
        {
          element: <CartProvider />,
          children: [
            {
              element: <DefaultLayout />,
              children: [
                { path: ROUTES.home, element: <HomePage /> },
                { path: ROUTES.productDetail, element: <ProductDetailPage /> },
                { path: ROUTES.filterProduct, element: <FilterProductPage /> },
                { path: ROUTES.search, element: <SearchPage /> },
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
                        {
                          path: ROUTES.account.profile,
                          element: <ProfilePage />,
                        },
                        {
                          path: ROUTES.account.editProfile,
                          element: <EditProfilePage />,
                        },
                        {
                          path: ROUTES.account.purchase,
                          element: <PurchasePage />,
                        },
                      ],
                    },
                    { element: <CartPage />, path: ROUTES.cart },
                    { element: <CheckoutPage />, path: ROUTES.checkout },
                    {
                      element: <OrderSuccessPage />,
                      path: ROUTES.orderSuccess,
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
                    { path: ROUTES.dashboard, element: <DashboardPage /> },
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
                    { path: ROUTES.orders, element: <OrderPage /> },
                  ],
                },
              ],
            },
            { path: ROUTES.login, element: <LoginPage /> },
            { path: ROUTES.register, element: <RegisterPage /> },
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
