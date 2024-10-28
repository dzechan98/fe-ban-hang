import {
  OrderResponse,
  UpdateStatusOrderParams,
  useCancelOrder,
  useOrders,
  useUpdateStatusOrder,
} from "@api/order";
import { Page, Table } from "@components/core";
import { Button, Chip, Stack, Tooltip, Typography } from "@mui/material";
import { ColDef, ICellRendererParams } from "ag-grid-community";
import { useSearchParams } from "react-router-dom";
import { useMemo } from "react";
import dayjs from "dayjs";
import { getError } from "@utils/getError";
import { toast } from "react-toastify";

const styleCenter = {
  display: "flex",
  alignItems: "center",
};

const paymentStatusMessages: Record<
  string,
  {
    label: string;
    color: "success" | "warning";
  }
> = {
  pending: {
    label: "Đang chờ thanh toán",
    color: "warning",
  },
  paid: {
    label: "Đã thanh toán",
    color: "success",
  },
};

const paymentStatusRenderer = ({
  value,
}: ICellRendererParams<OrderResponse>) => {
  console.log(value);
  const status =
    paymentStatusMessages[value] || paymentStatusMessages["pending"];
  return <Chip label={status.label} color={status.color} />;
};

const statusMessages: Record<
  string,
  {
    label: string;
    color: "warning" | "info" | "success" | "error";
  }
> = {
  pending: {
    label: "Chờ duyệt",
    color: "warning",
  },
  shipped: {
    label: "Đang giao hàng",
    color: "info",
  },
  delivered: {
    label: "Đã giao thành công",
    color: "success",
  },
  canceled: {
    label: "Đã hủy",
    color: "error",
  },
};

const statusRenderer = ({ value }: ICellRendererParams<OrderResponse>) => {
  const status = statusMessages[value] || statusMessages["pending"];
  return <Chip label={status.label} color={status.color} />;
};

const getOrderActions = (
  data: OrderResponse,
  onCancelOrder: (orderId: string) => void,
  onUpdateStatusOrder: ({ orderId, status }: UpdateStatusOrderParams) => void
) => {
  switch (data.status) {
    case "pending":
      return (
        <>
          <Tooltip title="Xác nhận giao hàng đơn này">
            <Button
              color="info"
              size="small"
              variant="contained"
              onClick={() =>
                onUpdateStatusOrder({ orderId: data._id, status: "shipped" })
              }
            >
              Xác nhận
            </Button>
          </Tooltip>
          <Tooltip title="Hủy đơn hàng">
            <Button
              color="error"
              size="small"
              variant="outlined"
              onClick={() => onCancelOrder(data._id)}
            >
              Hủy đơn
            </Button>
          </Tooltip>
        </>
      );
    default:
      return null;
  }
};

const getColumns = (
  onCancelOrder: (orderId: string) => void,
  onUpdateStatusOrder: ({ orderId, status }: UpdateStatusOrderParams) => void
) => {
  return [
    {
      headerName: "Mã đơn",
      field: "_id",
      cellStyle: styleCenter,
    },
    {
      headerName: "Ngày đặt",
      valueGetter: ({ data }) =>
        data && dayjs(data.createdAt).format("DD/MM/YYYY"),
      cellStyle: styleCenter,
    },
    {
      headerName: "Tên người dùng",
      valueGetter: ({ data }) => data && data.user.name,
      cellStyle: styleCenter,
    },
    {
      headerName: "Sản phẩm",
      valueGetter: ({ data }) => data && data.items.length,
      cellStyle: styleCenter,
    },
    {
      headerName: "Tổng giá",
      valueGetter: ({ data }) =>
        data && data.totalPrice.toLocaleString("vi-VN"),
      cellStyle: styleCenter,
    },
    {
      headerName: "Trạng thái",
      field: "status",
      cellRenderer: statusRenderer,
      cellStyle: styleCenter,
    },
    {
      headerName: "Phương thức thanh toán",
      cellRenderer: ({ data }: ICellRendererParams<OrderResponse>) => (
        <Chip
          color={
            data?.paymentMethod === "bank_transfer" ? "default" : "primary"
          }
          label={
            data?.paymentStatus === "bank_transfer"
              ? "Thanh toán online"
              : "Thanh toán khi nhận hàng"
          }
        />
      ),
      minWidth: 250,
      cellStyle: styleCenter,
    },
    {
      headerName: "Trạng thái thanh toán",
      field: "paymentStatus",
      cellRenderer: paymentStatusRenderer,
      cellStyle: styleCenter,
    },
    {
      headerName: "Hành động",
      cellClass: "no-border",
      cellStyle: styleCenter,
      cellRenderer: ({ data }: ICellRendererParams<OrderResponse>) =>
        data && (
          <Stack direction="row" spacing={1}>
            {getOrderActions(data, onCancelOrder, onUpdateStatusOrder)}
          </Stack>
        ),
      sortable: false,
    },
  ] as ColDef<OrderResponse>[];
};

export const OrderPage = () => {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page") ?? 1);
  const limit = Number(searchParams.get("limit") ?? 10);
  const { data, isLoading, isFetching } = useOrders(page, limit);
  const queryKey = ["orders", page, limit];

  const updateStatusOrderMutation = useUpdateStatusOrder({ queryKey });
  const cancelOrderMutation = useCancelOrder({ queryKey });

  const handleCancelOrder = async (orderId: string) => {
    try {
      await cancelOrderMutation.mutateAsync(orderId);
    } catch (error) {
      toast.error(getError(error));
    }
  };

  const handleUpdateStatusOrder = async ({
    orderId,
    status,
  }: UpdateStatusOrderParams) => {
    try {
      await updateStatusOrderMutation.mutateAsync({ orderId, status });
    } catch (error) {
      toast.error(getError(error));
    }
  };

  const columnDefs = useMemo(
    () => getColumns(handleCancelOrder, handleUpdateStatusOrder),
    []
  );

  const totalPage = useMemo(() => {
    if (data) {
      return Math.ceil(data?.count / limit);
    }
  }, [limit, data]);

  return (
    <Page title="Danh sách đơn hàng">
      <Typography color="primary.main" fontSize="24px" mt={1}>
        Danh sách đơn hàng
      </Typography>
      <Table
        rowData={data?.results ?? []}
        columnDefs={columnDefs}
        page={page}
        limit={limit}
        totalPage={totalPage}
        loading={isLoading || isFetching}
      />
    </Page>
  );
};
