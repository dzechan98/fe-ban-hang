import { useMutation } from "@tanstack/react-query";
import instance from "../instance";
import { AuthResponse } from "@api/type";

export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

export interface ChangePasswordInput {
  newPassword: string;
  confirmNewPassword: string;
}

const URL = "/auth";

export const useLogin = () => {
  return useMutation({
    mutationFn: async (input: LoginInput) => {
      const response = await instance.post<AuthResponse>(`${URL}/login`, input);

      const { accessToken, refreshToken } = response.data;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      return response.data;
    },
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: async (input: RegisterInput) => {
      const response = await instance.post<AuthResponse>(
        `${URL}/register`,
        input
      );

      const { accessToken, refreshToken } = response.data;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      return response.data;
    },
  });
};

export const useChangePassword = () => {
  return useMutation({
    mutationFn: async ({
      input,
      userId,
    }: {
      input: ChangePasswordInput;
      userId: string;
    }) => {
      const { data } = await instance.put(`${URL}/change-password`, input, {
        params: {
          userId,
        },
      });

      return data;
    },
  });
};
