import instance from "@api/instance";
import { useQuery } from "@tanstack/react-query";

export interface UserResponse {
  _id: string;
  email: string;
  isAdmin: boolean;
  name?: string;
  image?: string;
  phone?: string;
  createdAt: string;
  updatedAt: string;
}

const URL = "/users/profile/me";

export const useGetMe = (accessToken?: string | null) => {
  return useQuery({
    queryKey: ["me", accessToken],
    queryFn: async () => {
      const { data } = await instance.get<UserResponse>(URL);

      return data;
    },
    enabled: !!accessToken,
  });
};
