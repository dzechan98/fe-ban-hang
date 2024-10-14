import instance from "@api/instance";
import { ListResponse, QueryContext } from "@api/type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export interface UserInput {
  name: string;
  birthday: string;
  image: string;
  gender: string;
  address: string;
  phone: string;
}

export interface UserResponse extends UserInput {
  _id: string;
  email: string;
  isAdmin: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface EditUserParams {
  id: string;
  input: Partial<UserInput>;
}

const URL = "/users";

export const useGetMe = (accessToken?: string | null) => {
  return useQuery({
    queryKey: ["me", accessToken],
    queryFn: async () => {
      const { data } = await instance.get<UserResponse>(`${URL}/profile/me`);

      return data;
    },
    enabled: !!accessToken,
  });
};

export const useGetUser = (id?: string) => {
  return useQuery({
    queryKey: ["users", id],
    queryFn: async () => {
      const { data } = await instance.get<UserResponse>(`${URL}/${id}`);

      return data;
    },
    enabled: !!id,
  });
};

export const useListUsers = ({
  page = 1,
  limit = 100,
}: {
  page?: number;
  limit?: number;
}) => {
  return useQuery({
    queryKey: ["listUsers", page, limit],
    queryFn: async () => {
      const { data } = await instance.get<ListResponse<UserResponse>>(URL, {
        params: {
          page,
          limit,
        },
      });

      return data;
    },
  });
};

export const useAddUser = () => {
  return useMutation({
    mutationFn: async (input: UserInput) => {
      const response = await instance.post<UserResponse>(URL, input);

      return response.data;
    },
  });
};

export const useEditUser = ({ queryKey }: Partial<QueryContext> = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, input }: EditUserParams) => {
      const { data } = await instance.put<UserResponse>(`${URL}/${id}`, input);

      return data;
    },
    onSuccess: () => {
      if (queryKey) {
        queryClient.invalidateQueries({ queryKey });
      }
    },
  });
};

export const useDeleteUser = ({ queryKey }: Partial<QueryContext> = {}) => {
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
