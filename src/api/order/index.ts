import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import instance from "../instance";
import { ListResponse, QueryContext } from "@api/type";
import { ProductCart } from "@api/cart";
import { AddressResponse } from "@api/address";
import { UserResponse } from "@api/users";

export type Status = "pending" | "shipped" | "delivered" | "canceled";

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
  user: UserResponse;
  shippedDate: string;
  deliveredDate: string;
  canceledDate: string;
  createdAt: string;
  updateAt: string;
}

export interface UpdateStatusOrderParams {
  orderId: string;
  status: Status;
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

export const useCancelOrder = ({ queryKey }: Partial<QueryContext> = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (orderId: string) => {
      const response = await instance.put<OrderResponse>(
        `${URL}/cancel-order`,
        { orderId }
      );

      return response.data;
    },
    onSuccess: async () => {
      if (queryKey) {
        await queryClient.invalidateQueries({ queryKey });
      }
    },
  });
};

export const useOrdersByMe = (user?: string) => {
  return useQuery({
    queryKey: ["ordersUser", user],
    queryFn: async () => {
      const { data } = await instance.get<OrderResponse[]>(`${URL}/user`);

      return data;
    },
    enabled: !!user,
  });
};

export const useOrders = (page?: number, limit?: number) => {
  return useQuery({
    queryKey: ["orders", page, limit],
    queryFn: async () => {
      const { data } = await instance.get<ListResponse<OrderResponse>>(URL, {
        params: { page, limit },
      });

      return data;
    },
    enabled: !!page || !!limit,
  });
};

export const useUpdateStatusOrder = ({
  queryKey,
}: Partial<QueryContext> = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ orderId, status }: UpdateStatusOrderParams) => {
      const response = await instance.put<OrderResponse>(`${URL}/${orderId}`, {
        status,
      });

      return response.data;
    },
    onSuccess: async () => {
      if (queryKey) {
        await queryClient.invalidateQueries({ queryKey });
      }
    },
  });
};
