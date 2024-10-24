import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import instance from "../instance";
import { QueryContext } from "@api/type";
import { ProductCart } from "@api/cart";
import { AddressResponse } from "@api/address";

export type Status = "pending" | "success" | "cancel";
export interface OrderInput {
  items: ProductCart[];
  totalPrice: number;
  paymentMethod?: string;
  status?: Status;
  paymentStatus?: string;
  shippingAddress: AddressResponse;
}

export interface OrderResponse extends OrderInput {
  _id: string;
  orderDate: string;
  userId: string;
  shippedDate: string;
  deliveredDate: string;
  canceledDate: string;
  createdAt: string;
  updateAt: string;
}

export interface EditAddressParams {
  id: string;
  input: Partial<OrderInput>;
}

const URL = "/orders";

export const useCreateOrder = ({ queryKey }: Partial<QueryContext> = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: OrderInput) => {
      const response = await instance.post<OrderResponse>(URL, input);

      return response.data;
    },
    onSuccess: async () => {
      if (queryKey) {
        await queryClient.invalidateQueries({ queryKey });
      }
    },
  });
};

export const useOrdersByMe = (userId?: string) => {
  return useQuery({
    queryKey: ["orders", userId],
    queryFn: async () => {
      const { data } = await instance.get<OrderResponse[]>(URL);

      return data;
    },
    enabled: !!userId,
  });
};
