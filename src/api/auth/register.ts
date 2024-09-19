import { useMutation } from "@tanstack/react-query";
import instance from "../instance";
import { AuthResponse } from "@api/type";

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

const URL = "/auth/register";

export const useRegister = () => {
  return useMutation({
    mutationFn: async (input: RegisterInput) => {
      const response = await instance.post<AuthResponse>(URL, input);

      const { accessToken, refreshToken } = response.data;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      return response.data;
    },
  });
};
