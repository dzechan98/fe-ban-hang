import { Page, Quantity } from "@components/core";
import { useCart } from "@contexts/CartContext";
import { Box, Checkbox, Typography, Button, Grid2, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const StyledBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  borderRadius: "6px",
  backgroundColor: "white",
}));

const columns = [
  { title: "Đơn Giá", size: 2 },
  { title: "Số Lượng", size: 1.5 },
  { title: "Số Tiền", size: 2 },
  { title: "Thao tác", size: 2 },
];

export const CartPage = () => {
  const { cart, incrementItemInCart, decrementItemInCart, removeItemFromCart } =
    useCart();
  const navigate = useNavigate();

  const handleDeleteCart = (id: string) => {
    removeItemFromCart(id);
  };

  return (
    <Page title="Giỏ hàng">
      <StyledBox>
        <Grid2 container spacing={2} alignItems="center">
          <Grid2 size={4.5}>
            <Stack direction="row" alignItems="center">
              <Checkbox />
              <Typography variant="subtitle2" color="text.secondary">
                Sản Phẩm
              </Typography>
            </Stack>
          </Grid2>
          {columns.map((column) => (
            <Grid2 size={column.size} key={column.title}>
              <Typography
                variant="subtitle2"
                textAlign="center"
                color="text.secondary"
              >
                {column.title}
              </Typography>
            </Grid2>
          ))}
        </Grid2>
      </StyledBox>
      {(!cart || !cart.items || cart.items.length === 0) && (
        <Typography textAlign="center" my={3}>
          Không có sản phẩm nào trong giỏ hàng
        </Typography>
      )}
      {cart?.items.map((product) => (
        <StyledBox key={product.productId}>
          <Grid2 container spacing={0.75} alignItems="center">
            <Grid2 size={4.5}>
              <Stack direction="row" alignItems="center" gap={0.25}>
                <Checkbox />
                <Stack
                  direction="row"
                  alignItems="center"
                  gap={0.5}
                  sx={{
                    cursor: "pointer",
                  }}
                  onClick={() => navigate(`/products/${product.productId}`)}
                >
                  <Box
                    component="img"
                    src={product.image_thumbnail}
                    alt="Product"
                    sx={{
                      width: 64,
                      height: 64,
                      objectFit: "cover",
                      borderRadius: 1,
                      mr: 2,
                    }}
                  />
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
                    }}
                  >
                    {product.title}
                  </Typography>
                </Stack>
              </Stack>
            </Grid2>
            <Grid2 size={2}>
              <Typography
                variant="body2"
                fontWeight="medium"
                textAlign="center"
              >
                {`₫${product.price.toLocaleString("vi-VN")}`}
              </Typography>
            </Grid2>
            <Grid2 size={1.5}>
              <Quantity
                count={product.quantity}
                onIncrement={() => incrementItemInCart(product.productId)}
                onDecrement={() => decrementItemInCart(product.productId)}
              />
            </Grid2>
            <Grid2 size={2}>
              <Typography variant="body2" color="primary" textAlign="center">
                {`₫${(product.quantity * product.price).toLocaleString(
                  "vi-VN"
                )}`}
              </Typography>
            </Grid2>
            <Grid2 size={2} justifyContent="center" display="flex">
              <Button
                color="error"
                size="small"
                onClick={() => handleDeleteCart(product.productId)}
              >
                Xóa
              </Button>
            </Grid2>
          </Grid2>
        </StyledBox>
      ))}
      <Box
        position="sticky"
        bottom={0}
        width="100%"
        bgcolor="white"
        p={2}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        zIndex={1000}
        sx={{
          boxShadow: "0 -2px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Stack direction="row" alignItems="center">
          <Checkbox />
          <Typography variant="body2" sx={{ mr: 2 }}>
            Chọn Tất Cả ({cart?.items?.length || 0})
          </Typography>
          <Button size="small" sx={{ mr: 1 }}>
            Xóa
          </Button>
        </Stack>
        <Box display="flex" alignItems="center" gap={2}>
          <Box>
            <Typography variant="body2">
              Tổng thanh toán ({cart?.items?.length || 0} Sản phẩm):{" "}
              <span> ₫0</span>
            </Typography>
            {/* <Typography variant="h6" color="error.main" fontWeight="bold">
              ₫0
            </Typography> */}
          </Box>
          <Button variant="contained" color="error">
            Mua Hàng
          </Button>
        </Box>
      </Box>
    </Page>
  );
};
