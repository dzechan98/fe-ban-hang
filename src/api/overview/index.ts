import { useQuery } from "@tanstack/react-query";
import instance from "../instance";
import { ListResponse } from "@api/type";

export interface OverviewProduct {
  _id: string;
  title: string;
  sold: number;
  price: number;
}

export interface OverviewResponse {
  totalOrders: number;
  totalUsers: number;
  totalRevenue: number;
  topProducts: ListResponse<OverviewProduct>;
}

const URL = "/overview";

export const useOverview = (page: number, limit: number) => {
  return useQuery({
    queryKey: ["overview", page, limit],
    queryFn: async () => {
      const { data } = await instance.get<OverviewResponse>(URL, {
        params: {
          page,
          limit,
        },
      });

      return data;
    },
  });
};
