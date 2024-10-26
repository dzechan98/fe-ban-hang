export const ROUTES = {
  home: "/",
  login: "/login",
  register: "/register",
  dashboard: "/admin/dashboard",
  forgotPassword: "/forgot-password",
  productDetail: "/products/:id",
  filterProduct: "/filter/:id",
  account: {
    profile: "/account/profile",
    editProfile: "/account/profile/edit",
    purchase: "/account/purchase",
  },
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
  cart: "/cart",
  checkout: "/checkout",
  search: "/search",
  orders: "/admin/orders",
  orderSuccess: "/order/success",
};
