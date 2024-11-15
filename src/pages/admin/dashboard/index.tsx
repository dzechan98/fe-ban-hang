import { Page } from "@components/core";
import { Box, Grid2, Typography, Card, CardContent } from "@mui/material";
import {
  AttachMoney,
  TrendingUp,
  ShoppingCart,
  People,
} from "@mui/icons-material";
import { Table } from "@components/core";
import React, { useMemo } from "react";
import { OverviewProduct, useOverview } from "@api/overview";
import { useSearchParams } from "react-router-dom";
import { ColDef, ICellRendererParams } from "ag-grid-community";
import { capitalizeWords } from "@utils/capitalizeWords";

interface OverviewCardProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
}

const OverviewCard = ({ icon, title, value }: OverviewCardProps) => {
  return (
    <Card>
      <CardContent>
        <Box display="flex" alignItems="center">
          {icon}
          <Box ml={2}>
            <Typography color="textSecondary" gutterBottom>
              {title}
            </Typography>
            <Typography variant="h5" component="div">
              {value}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

const getColumns = () => {
  return [
    {
      headerName: "Sản phẩm",
      flex: 1,
      wrapText: true,
      cellRenderer: ({ data }: ICellRendererParams<OverviewProduct>) =>
        data && (
          <Typography variant="body2">{capitalizeWords(data.title)}</Typography>
        ),
    },
    {
      headerName: "Giá",
      width: 200,
      valueGetter: ({ data }) =>
        data && `₫${data.price.toLocaleString("vi-VN")}`,
    },
    {
      headerName: "Số lượng bán",
      width: 200,
      field: "sold",
    },
    {
      headerName: "Doanh thu",
      width: 200,
      valueGetter: ({ data }) =>
        data && `₫${(data.price * data.sold).toLocaleString("vi-VN")}`,
    },
  ] as ColDef<OverviewProduct>[];
};

export const DashboardPage = () => {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page") ?? 1);
  const limit = Number(searchParams.get("limit") ?? 10);

  const { data, isLoading, isFetching } = useOverview(page, limit);
  console.log(data);
  const columnDefs = useMemo(() => getColumns(), []);

  const totalPage = useMemo(() => {
    if (data) {
      return Math.ceil(data.topProducts.count / limit);
    }
  }, [limit, data]);

  return (
    <Page title="Bảng điều khiển">
      {data && (
        <Grid2 container spacing={3}>
          <Grid2 size={6}>
            <OverviewCard
              icon={<AttachMoney fontSize="large" color="primary" />}
              title="Tổng Doanh thu"
              value={`${data.totalRevenue.toLocaleString("vi-VN")}₫`}
            />
          </Grid2>
          <Grid2 size={6}>
            <OverviewCard
              icon={<TrendingUp fontSize="large" color="secondary" />}
              title="Lợi nhuận"
              value="45,678 "
            />
          </Grid2>
          <Grid2 size={6}>
            <OverviewCard
              icon={<ShoppingCart fontSize="large" color="error" />}
              title="Đơn hàng đã giao"
              value={data.totalOrders}
            />
          </Grid2>
          <Grid2 size={6}>
            <OverviewCard
              icon={<People fontSize="large" color="success" />}
              title="Khách hàng"
              value={data.totalUsers}
            />
          </Grid2>
        </Grid2>
      )}
      <Typography variant="h6" my={2}>
        Chi tiết Doanh thu theo Sản phẩm
      </Typography>
      <Table
        rowData={data?.topProducts.results ?? []}
        columnDefs={columnDefs}
        page={page}
        limit={limit}
        totalPage={totalPage}
        loading={isLoading || isFetching}
      />
    </Page>
  );
};
