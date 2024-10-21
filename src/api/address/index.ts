import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import instance from "../instance";
import { ListResponse, QueryContext } from "@api/type";

export interface AddressInput {
  userId: string;
  name: string;
  phone: string;
  street: string;
  ward: string;
  district: string;
  city: string;
  isDefault?: boolean;
}

export interface AddressResponse extends AddressInput {
  _id: string;
  createdAt: string;
  updateAt: string;
}

export interface EditAddressParams {
  id: string;
  input: Partial<AddressInput>;
}

const URL = "/addresses";

export const useGetAddress = (addressId?: string) => {
  return useQuery({
    queryKey: ["addresses", addressId],
    queryFn: async () => {
      const { data } = await instance.get<AddressResponse>(
        `${URL}/${addressId}`
      );

      return data;
    },
    enabled: !!addressId,
  });
};

export const useAddressDefault = () => {
  return useQuery({
    queryKey: ["addressDefault"],
    queryFn: async () => {
      const { data } = await instance.get<AddressResponse>(`${URL}/default`);

      return data;
    },
  });
};

export const useAddresses = () => {
  return useQuery({
    queryKey: ["addresses"],
    queryFn: async () => {
      const { data } = await instance.get<ListResponse<AddressResponse>>(URL);

      return data;
    },
  });
};

export const useCreateAddress = ({ queryKey }: Partial<QueryContext> = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: AddressInput) => {
      const response = await instance.post<AddressResponse>(URL, input);

      return response.data;
    },
    onSuccess: async () => {
      if (queryKey) {
        await queryClient.invalidateQueries({ queryKey });
      }
    },
  });
};

export const useEditAddress = ({ queryKey }: Partial<QueryContext> = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, input }: EditAddressParams) => {
      const { data } = await instance.put<AddressResponse>(
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

export const useDeleteAddress = ({ queryKey }: Partial<QueryContext> = {}) => {
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
