import { Status, useOrdersByMe } from "@api/order";
import { Page } from "@components/core";
import { useAuth } from "@contexts/UserContext";
import {
  Box,
  Chip,
  ChipProps,
  Divider,
  Grid2,
  Stack,
  styled,
  Typography,
} from "@mui/material";

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
    case "success":
      return {
        color: "success",
        label: "Hoàn thành",
      };
    case "cancel":
      return {
        color: "error",
        label: "Đã hủy",
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

  console.log(data);
  return (
    <Page title="VStore">
      {data &&
        data.map((order) => (
          <StyledBox key={order._id}>
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
            <Divider />
            <Stack direction="row" justifyContent="space-between" pt={2}>
              <Chip {...mappingStatusOrder(order.status as Status)} />
              <Typography variant="body2">
                Thành tiền:{" "}
                <Typography
                  component="span"
                  fontSize="18px"
                  fontWeight="bold"
                  color="primary"
                >
                  ₫{order.totalPrice.toLocaleString("vi-VN")}
                </Typography>
              </Typography>
            </Stack>
          </StyledBox>
        ))}
    </Page>
  );
};
