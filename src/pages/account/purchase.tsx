import {
  Status,
  UpdateStatusOrderParams,
  useCancelOrder,
  useOrdersByMe,
  useUpdateStatusOrder,
} from "@api/order";
import { ConfirmDialog, Page } from "@components/core";
import { useAuth } from "@contexts/UserContext";
import { useDisclosure } from "@hooks/useDisclosure";
import {
  Box,
  Button,
  Chip,
  ChipProps,
  Divider,
  Grid2,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import { getError } from "@utils/getError";
import { useState } from "react";
import { toast } from "react-toastify";

const StyledBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(2),
  backgroundColor: "white",
}));

const mappingStatusOrder = (
  status: Status
): { color: ChipProps["color"]; label: string } => {
  switch (status) {
    case "pending":
      return {
        color: "primary",
        label: "Chờ duyệt",
      };
    case "shipped":
      return {
        color: "secondary",
        label: "Đang vận chuyển",
      };
    case "canceled":
      return {
        color: "error",
        label: "Đã hủy",
      };
    case "delivered":
      return {
        color: "success",
        label: "Đã nhận hàng",
      };
    default:
      return {
        color: "default",
        label: "Không xác định",
      };
  }
};

export const PurchasePage = () => {
  const { user } = useAuth();
  const { data } = useOrdersByMe(user?._id);
  const queryKey = ["ordersUser", user?._id];
  const cancelOrderMutation = useCancelOrder({ queryKey });
  const updateStatusOrderMutation = useUpdateStatusOrder({ queryKey });

  const cancelOrderDisclosure = useDisclosure({});
  const [orderId, setOrderId] = useState("");

  const handleConfirmCancelOrder = async () => {
    try {
      await cancelOrderMutation.mutateAsync(orderId);
      toast.success("Hủy đơn hàng thành công");
    } catch (error) {
      toast.error(getError(error));
    } finally {
      setOrderId("");
      cancelOrderDisclosure.onClose();
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

  const handleOpenDialog = (orderId: string) => {
    setOrderId(orderId);
    cancelOrderDisclosure.onOpen();
  };

  const handleCloseDialog = () => {
    setOrderId("");
    cancelOrderDisclosure.onClose();
  };

  return (
    <Page title="VStore">
      {data &&
        data.map((order) => (
          <StyledBox key={order._id}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography>Mã đơn hàng: #{order.orderCode}</Typography>
              <Chip {...mappingStatusOrder(order.status as Status)} />
            </Stack>
            {order.items.map((product) => (
              <Grid2
                container
                width="100%"
                key={product.productId}
                alignItems="center"
              >
                <Grid2 size={8}>
                  <Stack direction="row" alignItems="center" gap={2} py={2}>
                    <Box
                      component="img"
                      src={product.image_thumbnail}
                      alt={product.title}
                      sx={{
                        width: 64,
                        height: 64,
                        objectFit: "cover",
                        borderRadius: 1,
                      }}
                    />
                    <Box>
                      <Typography
                        variant="body2"
                        fontWeight="medium"
                        sx={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          display: "-webkit-box",
                          WebkitLineClamp: "2",
                          WebkitBoxOrient: "vertical",
                          fontSize: "14px",
                          mb: 0.25,
                        }}
                      >
                        {product.title}
                      </Typography>
                      {product.color && (
                        <Typography variant="body2" color="text.secondary">
                          Màu: {product.color}
                        </Typography>
                      )}
                      <Typography variant="body2">
                        x{product.quantity}
                      </Typography>
                    </Box>
                  </Stack>
                </Grid2>
                <Grid2 size={4}>
                  <Typography variant="body2" color="primary" textAlign="end">
                    ₫{product.price.toLocaleString("vi-VN")}
                  </Typography>
                </Grid2>
              </Grid2>
            ))}
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              pb={2}
            >
              <Typography variant="body2">Phí vận chuyển</Typography>
              <Typography color="primary" variant="body2" align="right">
                ₫{order.shippingFee.toLocaleString("vi-VN")}
              </Typography>
            </Stack>
            <Divider />
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              pt={2}
              color="white"
            >
              {order.status === "pending" && (
                <Button
                  color="error"
                  size="small"
                  variant="contained"
                  onClick={() => handleOpenDialog(order._id)}
                >
                  Hủy
                </Button>
              )}
              {order.status === "shipped" && (
                <Button
                  color="warning"
                  size="small"
                  variant="contained"
                  sx={{
                    minWidth: 250,
                  }}
                  onClick={() =>
                    handleUpdateStatusOrder({
                      orderId: order._id,
                      status: "delivered",
                    })
                  }
                >
                  Xác nhận đã nhận được hàng
                </Button>
              )}
              <Typography variant="body2" textAlign="end" width="100%">
                Thành tiền:{" "}
                <Typography
                  component="span"
                  fontSize="18px"
                  fontWeight="bold"
                  color="primary"
                >
                  ₫
                  {(order.totalPrice + order.shippingFee).toLocaleString(
                    "vi-VN"
                  )}
                </Typography>
              </Typography>
            </Stack>
          </StyledBox>
        ))}
      <ConfirmDialog
        title="Xác nhận hủy đơn hàng"
        description="Bạn có chắc chắn muốn hủy đơn hàng này không? Hành động này không thể hoàn tác."
        open={cancelOrderDisclosure.isOpen}
        onClose={handleCloseDialog}
        onConfirm={handleConfirmCancelOrder}
      />
    </Page>
  );
};
