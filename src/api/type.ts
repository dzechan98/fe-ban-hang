import { QueryFunctionContext } from "@tanstack/react-query";

export interface ListResponse<T> {
  results: T[];
  count: number;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

export type QueryKey = (string | number | undefined)[];

export type QueryContext = QueryFunctionContext<QueryKey>;
