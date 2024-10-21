import { createContext, useContext } from "react";
import {
  useGetCart,
  useAddCart,
  useDecrementCart,
  useDeleteCart,
  useClearCart,
  ProductCart,
  CartResponse,
  useIncrementCart,
} from "@api/cart";
import { useAuth } from "@contexts/UserContext";
import { Outlet } from "react-router-dom";
import { toast } from "react-toastify";
import { getError } from "@utils/getError";

interface CartContextType {
  cart?: CartResponse;
  addItemToCart: (item: ProductCart) => void;
  incrementItemInCart: (productId: string) => void;
  decrementItemInCart: (productId: string) => void;
  removeItemFromCart: (productId: string) => void;
  clearUserCart: () => void;
}

const CartContext = createContext<CartContextType>({} as CartContextType);

export const CartProvider = () => {
  const { user } = useAuth();
  const queryKey = ["cart", user?._id];
  const { data: cartData } = useGetCart(user?._id);
  const addCart = useAddCart({ queryKey });
  const decrementCart = useDecrementCart({ queryKey });
  const incrementCart = useIncrementCart({ queryKey });
  const deleteCart = useDeleteCart({ queryKey });
  const clearCart = useClearCart({ queryKey });

  const addItemToCart = async (item: ProductCart) => {
    try {
      await addCart.mutateAsync(item);
    } catch (error) {
      toast.error(getError(error));
    }
  };

  const decrementItemInCart = async (productId: string) => {
    try {
      await decrementCart.mutateAsync(productId);
    } catch (error) {
      toast.error(getError(error));
    }
  };

  const incrementItemInCart = async (productId: string) => {
    try {
      await incrementCart.mutateAsync(productId);
    } catch (error) {
      toast.error(getError(error));
    }
  };

  const removeItemFromCart = async (productId: string) => {
    try {
      await deleteCart.mutateAsync(productId);
    } catch (error) {
      toast.error(getError(error));
    }
  };

  const clearUserCart = async () => {
    try {
      await clearCart.mutateAsync();
    } catch (error) {
      console.log(error);
      toast.error(getError(error));
    }
  };

  const value = {
    cart: cartData,
    addItemToCart,
    incrementItemInCart,
    decrementItemInCart,
    removeItemFromCart,
    clearUserCart,
  };

  return (
    <CartContext.Provider value={value}>
      <Outlet />
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
