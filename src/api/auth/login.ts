import { useMutation } from "@tanstack/react-query";
import instance from "../instance";

export interface LoginInput {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

const URL = "/auth/login";

export const useLogin = () => {
  return useMutation({
    mutationFn: async (input: LoginInput) => {
      const response = await instance.post<LoginResponse>(URL, input);

      const { accessToken, refreshToken } = response.data;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      return response.data;
    },
  });
};
