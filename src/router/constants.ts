export const ROUTES = {
  home: "/",
  login: "/login",
  register: "/register",
  dashboard: "/admin/dashboard",
  forgotPassword: "/forgot-password",
  profile: "/profile",
  productDetail: "/products/:id",
  users: {
    root: "/admin/users",
    new: "/admin/users/new",
    edit: "/admin/users/:id",
  },
  categories: {
    root: "/admin/categories",
    new: "/admin/categories/new",
    edit: "/admin/categories/:id",
  },
  products: {
    root: "/admin/products",
    new: "/admin/products/new",
    edit: "/admin/products/:id",
  },
  orders: "/orders",
};
