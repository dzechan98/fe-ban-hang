import { QueryFunctionContext } from "@tanstack/react-query";

export interface ListResponse<T> {
  results: T[];
  count: number;
}

export type QueryKey = (string | number | undefined)[];

export type QueryContext = QueryFunctionContext<QueryKey>;
