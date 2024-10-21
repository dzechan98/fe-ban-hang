import { ProductSelected } from "@api/cart";
import { ConfirmDialog, Page, Quantity } from "@components/core";
import { useCart } from "@contexts/CartContext";
import { useDisclosure } from "@hooks/useDisclosure";
import {
  Box,
  Checkbox,
  Typography,
  Button,
  Grid2,
  Stack,
  FormControlLabel,
  styled,
} from "@mui/material";
import { ROUTES } from "@router/constants";
import { useEffect, useMemo, useState } from "react";
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
  const {
    cart,
    incrementItemInCart,
    decrementItemInCart,
    removeItemFromCart,
    clearUserCart,
  } = useCart();
  const navigate = useNavigate();
  const deleteAllProductsDisclosure = useDisclosure({});

  const [selectedAll, setSelectedAll] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<ProductSelected[]>(
    []
  );

  const isAllSelected = useMemo(() => {
    console.log(1);
    return (
      selectedProducts.filter((product) => product.checked).length ===
      cart?.items.length
    );
  }, [selectedProducts, cart]);

  const countProduct = useMemo(() => {
    return selectedProducts.filter((product) => product.checked).length;
  }, [selectedProducts]);

  const totalPrice = useMemo(() => {
    return selectedProducts
      .filter((product) => product.checked)
      .reduce((occ, cur) => occ + cur.price * cur.quantity, 0);
  }, [selectedProducts]);

  const handleSelectedAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedAll(event.target.checked);
    setSelectedProducts(
      selectedProducts.map((product) => ({
        ...product,
        checked: event.target.checked,
      }))
    );
  };

  const handleListProductsSelected = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSelectedProducts(
      selectedProducts?.map((item) =>
        item.productId === event.target.name
          ? { ...item, checked: event.target.checked }
          : item
      )
    );
  };

  const handleDeleteCart = (id: string) => {
    removeItemFromCart(id);
  };

  const handleConfirmDeleteAllProducts = async () => {
    await clearUserCart();
    deleteAllProductsDisclosure.onClose();
  };

  const handleCheckout = () => {
    navigate(ROUTES.checkout, {
      state: {
        products: selectedProducts.filter((product) => product.checked),
      },
    });
  };

  useEffect(() => {
    setSelectedAll(isAllSelected);
  }, [isAllSelected]);

  useEffect(() => {
    if (cart) {
      setSelectedProducts(
        cart.items.map((item) => ({ ...item, checked: false }))
      );
    }
  }, [cart]);

  return (
    <Page title="Giỏ hàng">
      <StyledBox>
        <Grid2 container spacing={2} alignItems="center">
          <Grid2 size={4.5}>
            <FormControlLabel
              control={
                <Checkbox
                  disabled={selectedProducts.length === 0}
                  onChange={handleSelectedAll}
                  checked={selectedAll}
                />
              }
              label="Sản Phẩm"
              sx={{
                px: 1,
                "& .MuiFormControlLabel-label": {
                  fontSize: "14px",
                },
              }}
            />
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
        <Box
          height={250}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Typography my={3}>Không có sản phẩm nào trong giỏ hàng</Typography>
        </Box>
      )}
      {selectedProducts?.map((product) => (
        <StyledBox key={product.productId}>
          <Grid2 container spacing={0.75} alignItems="center">
            <Grid2 size={4.5}>
              <Stack direction="row" alignItems="center" gap={0.25}>
                <Checkbox
                  name={product.productId}
                  onChange={handleListProductsSelected}
                  checked={product.checked}
                />
                <Stack
                  direction="row"
                  alignItems="center"
                  gap={2}
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
                        mb: 0.25,
                      }}
                    >
                      {product.title}
                    </Typography>
                    {product.color && (
                      <Typography variant="body2">
                        Màu: {product.color}
                      </Typography>
                    )}
                  </Box>
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
          <FormControlLabel
            control={
              <Checkbox
                disabled={selectedProducts.length === 0}
                onChange={handleSelectedAll}
                checked={selectedAll}
              />
            }
            label={`Chọn Tất Cả (${cart?.items?.length || 0})`}
            sx={{
              px: 1,
              "& .MuiFormControlLabel-label": {
                fontSize: "14px",
              },
            }}
          />
          <Button
            size="small"
            sx={{ mr: 1 }}
            disabled={!selectedAll || selectedProducts.length === 0}
            onClick={deleteAllProductsDisclosure.onOpen}
          >
            Xóa
          </Button>
        </Stack>
        <Box display="flex" alignItems="center" gap={2}>
          <Box>
            <Typography variant="body2">
              Tổng thanh toán ({countProduct} Sản phẩm):{" "}
            </Typography>
            <Typography variant="h6" color="primary" fontWeight="bold">
              ₫{totalPrice.toLocaleString("vi-VN")}
            </Typography>
          </Box>
          <Button
            variant="contained"
            color="error"
            disabled={
              selectedProducts.filter((product) => product.checked).length === 0
            }
            onClick={handleCheckout}
          >
            Mua Hàng
          </Button>
        </Box>
      </Box>
      <ConfirmDialog
        title="Xác nhận xóa"
        description="Bạn có chắc chắn muốn xóa tất cả sản phẩm trong giỏ hàng không? Hành động này không thể hoàn tác."
        open={deleteAllProductsDisclosure.isOpen}
        onClose={deleteAllProductsDisclosure.onClose}
        onConfirm={handleConfirmDeleteAllProducts}
      />
    </Page>
  );
};
