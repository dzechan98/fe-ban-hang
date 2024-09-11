import instance from "@api/instance";
import { useQuery } from "@tanstack/react-query";

interface UserResponse {
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

export const useGetMe = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const { data } = await instance.get<UserResponse>(URL);

      return data;
    },
  });
};
