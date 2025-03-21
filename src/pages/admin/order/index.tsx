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
import { useNotification } from "@hooks/useNotification";

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

    case "shipped":
      return (
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
      field: "orderCode",
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
        data && `₫${data.totalPrice.toLocaleString("vi-VN")}`,
      cellStyle: styleCenter,
    },
    {
      headerName: "Ngày giao hàng",
      valueGetter: ({ data }) =>
        data?.shippedDate && dayjs(data.shippedDate).format("DD/MM/YYYY"),
      cellStyle: styleCenter,
    },
    {
      headerName: "Ngày nhận hàng",
      valueGetter: ({ data }) =>
        data?.deliveredDate && dayjs(data.deliveredDate).format("DD/MM/YYYY"),
      cellStyle: styleCenter,
    },
    {
      headerName: "Địa chỉ",
      width: 300,
      valueGetter: ({ data }) =>
        data &&
        `${data.shippingAddress.street}, ${data.shippingAddress.ward}, ${data.shippingAddress.district}, ${data.shippingAddress.city}`,
      cellStyle: styleCenter,
    },
    {
      headerName: "Trạng thái",
      cellRenderer: ({ data }: ICellRendererParams<OrderResponse>) =>
        data && (
          <Chip
            label={statusMessages[data.status || "pending"].label}
            color={statusMessages[data.status || "pending"].color}
          />
        ),
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
      cellRenderer: ({ data }: ICellRendererParams<OrderResponse>) =>
        data && data.status !== "canceled" ? (
          <Chip
            label={paymentStatusMessages[data.paymentStatus || "pending"].label}
            color={paymentStatusMessages[data.paymentStatus || "pending"].color}
          />
        ) : (
          ""
        ),
      cellStyle: styleCenter,
    },
    {
      headerName: "Thao tác",
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
  const { error: errorNotification } = useNotification();
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
      errorNotification(getError(error), { autoHideDuration: 3000 });
    }
  };

  const handleUpdateStatusOrder = async ({
    orderId,
    status,
  }: UpdateStatusOrderParams) => {
    try {
      await updateStatusOrderMutation.mutateAsync({ orderId, status });
    } catch (error) {
      errorNotification(getError(error), { autoHideDuration: 3000 });
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
      <Typography color="primary.main" fontSize="24px" my={1}>
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
