import { useMutation } from "@tanstack/react-query";
import instance from "../instance";
import { AuthResponse } from "@api/type";

export interface LoginInput {
  email: string;
  password: string;
}

const URL = "/auth/login";

export const useLogin = () => {
  return useMutation({
    mutationFn: async (input: LoginInput) => {
      const response = await instance.post<AuthResponse>(URL, input);

      const { accessToken, refreshToken } = response.data;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      return response.data;
    },
  });
};
