import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import instance from "../instance";
import { QueryContext } from "@api/type";

export interface ProductCart {
  productId: string;
  color?: string;
  price: number;
  quantity: number;
  image_thumbnail: string;
  title: string;
}

export interface CartInput {
  userId: string;
  items: ProductCart[];
}

export type ProductSelected = ProductCart & { checked: boolean };

export interface CartResponse extends CartInput {
  _id: string;
  createdAt: string;
  updateAt: string;
}

const URL = "/cart";

export const useGetCart = (userId?: string) => {
  return useQuery({
    queryKey: ["cart", userId],
    queryFn: async () => {
      const { data } = await instance.get<CartResponse>(URL);

      return data;
    },
    enabled: !!userId,
  });
};

export const useAddCart = ({ queryKey }: Partial<QueryContext> = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: ProductCart) => {
      const response = await instance.post<CartResponse>(URL, input);

      return response.data;
    },
    onSuccess: async () => {
      if (queryKey) {
        await queryClient.invalidateQueries({ queryKey });
      }
    },
  });
};

export const useIncrementCart = ({ queryKey }: Partial<QueryContext> = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (productId: string) => {
      const { data } = await instance.put<CartResponse>(`${URL}/${productId}`);

      return data;
    },
    onSuccess: async () => {
      if (queryKey) {
        await queryClient.invalidateQueries({ queryKey });
      }
    },
  });
};

export const useDecrementCart = ({ queryKey }: Partial<QueryContext> = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (productId: string) => {
      const { data } = await instance.delete<CartResponse>(
        `${URL}/${productId}`
      );

      return data;
    },
    onSuccess: async () => {
      if (queryKey) {
        await queryClient.invalidateQueries({ queryKey });
      }
    },
  });
};

export const useDeleteCart = ({ queryKey }: Partial<QueryContext> = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (productId: string) => {
      const { data } = await instance.delete(`${URL}/remove/${productId}`);

      return data;
    },
    onSuccess: async () => {
      if (queryKey) {
        await queryClient.invalidateQueries({ queryKey });
      }
    },
  });
};

export const useClearCart = ({ queryKey }: Partial<QueryContext> = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const { data } = await instance.delete(`${URL}/clear`);

      return data;
    },
    onSuccess: async () => {
      if (queryKey) {
        await queryClient.invalidateQueries({ queryKey });
      }
    },
  });
};
