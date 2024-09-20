import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import instance from "../instance";
import { ListResponse, QueryContext } from "@api/type";

export interface CategoryInput {
  title: string;
  image_url: string;
}

export interface CategoryResponse {
  _id: string;
  title: string;
  slug: string;
  image_url: string;
  createdAt: string;
  updateAt: string;
}

export interface EditCategoryParams {
  id: string;
  input: Partial<CategoryInput>;
}

const URL = "/categories";

export const useGetCategory = (id?: string) => {
  return useQuery({
    queryKey: ["categories", id],
    queryFn: async () => {
      const { data } = await instance.get<CategoryResponse>(`${URL}/${id}`);

      return data;
    },
    enabled: !!id,
  });
};

export const useListCategories = ({
  page = 1,
  limit = 100,
}: {
  page?: number;
  limit?: number;
}) => {
  return useQuery({
    queryKey: ["listCategories", page, limit],
    queryFn: async () => {
      const { data } = await instance.get<ListResponse<CategoryResponse>>(URL, {
        params: {
          page,
          limit,
        },
      });

      return data;
    },
  });
};

export const useAddCategory = () => {
  return useMutation({
    mutationFn: async (input: CategoryInput) => {
      const response = await instance.post<CategoryResponse>(URL, input);

      return response.data;
    },
  });
};

export const useEditCategory = ({ queryKey }: Partial<QueryContext> = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, input }: EditCategoryParams) => {
      const { data } = await instance.put<CategoryResponse>(
        `${URL}/${id}`,
        input
      );

      return data;
    },
    onSuccess: () => {
      if (queryKey) {
        queryClient.invalidateQueries({ queryKey });
      }
    },
  });
};

export const useDeleteCategory = ({ queryKey }: Partial<QueryContext> = {}) => {
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
