import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import instance from "../instance";
import { ListResponse, QueryContext } from "@api/type";
import { CategoryResponse } from "@api/categories";

export interface ProductInput {
  title: string;
  description?: string;
  price: number;
  category: string;
  quantity: number;
  image_thumbnail: string;
  images: string[];
}

export interface ProductResponse extends Omit<ProductInput, "category"> {
  _id: string;
  category: CategoryResponse;
  sold: number;
  createdAt: string;
  updateAt: string;
}

export interface EditProductParams {
  id: string;
  input: Partial<ProductInput>;
}

const URL = "/products";

export const useGetProduct = (id?: string) => {
  return useQuery({
    queryKey: ["products", id],
    queryFn: async () => {
      const { data } = await instance.get<ProductResponse>(`${URL}/${id}`);

      return data;
    },
    enabled: !!id,
  });
};

export const useListProducts = ({
  id,
  page = 1,
  limit = 100,
  sortBy,
  sortOrder,
  title,
  listCategories,
}: {
  id?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: string;
  title?: string;
  listCategories?: string;
}) => {
  return useQuery({
    queryKey: [
      "listProducts",
      page,
      limit,
      id,
      sortBy,
      sortOrder,
      title,
      listCategories,
    ],
    queryFn: async () => {
      const { data } = await instance.get<ListResponse<ProductResponse>>(URL, {
        params: {
          id,
          page,
          limit,
          sortBy,
          sortOrder,
          title,
          listCategories,
        },
      });

      return data;
    },
  });
};

export const useAddProduct = () => {
  return useMutation({
    mutationFn: async (input: ProductInput) => {
      const response = await instance.post<ProductResponse>(URL, input);

      return response.data;
    },
  });
};

export const useEditProduct = ({ queryKey }: Partial<QueryContext> = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, input }: EditProductParams) => {
      const { data } = await instance.put<ProductResponse>(
        `${URL}/${id}`,
        input
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

export const useDeleteProduct = ({ queryKey }: Partial<QueryContext> = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await instance.delete(`${URL}/${id}`);

      return data;
    },
    onSuccess: async () => {
      if (queryKey) {
        await queryClient.invalidateQueries({ queryKey });
      }
    },
  });
};
