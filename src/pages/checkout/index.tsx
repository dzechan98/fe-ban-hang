import { Page } from "@components/core";
import {
  Box,
  Button,
  Dialog,
  Divider,
  Grid2,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useLocation } from "react-router-dom";
import { ProductSelected } from "@api/cart";
import React, { useEffect, useState } from "react";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { Addresses } from "@components/modules";
import { usePopover } from "@hooks/usePopover";
import { AddressResponse, useAddressDefault } from "@api/address";

const StyledBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(2),
  backgroundColor: "white",
}));

interface ShippingOption {
  id: string;
  name: string;
  fee: number;
  deliveryTime: string;
}

const shippingOptions: ShippingOption[] = [
  { id: "1", name: "Giao hàng tiết kiệm", fee: 30000, deliveryTime: "3-5" },
  { id: "2", name: "Giao hàng nhanh", fee: 50000, deliveryTime: "1-2" },
  { id: "3", name: "Viettel Post", fee: 40000, deliveryTime: "2-4" },
];

const columns = [
  { title: "Đơn Giá", size: 2, textEnd: false },
  { title: "Số Lượng", size: 1.5, textEnd: true },
  { title: "Thành tiền", size: 2, textEnd: true },
];

export const CheckoutPage = () => {
  const location = useLocation();
  const products: ProductSelected[] = location.state?.products || [];
  const { data } = useAddressDefault();
  const addressesPopover = usePopover("addresses");
  const [address, setAddress] = useState<AddressResponse>(
    {} as AddressResponse
  );

  useEffect(() => {
    if (address) {
      setAddress(address);
    }
  }, [address]);

  useEffect(() => {
    if (data) {
      setAddress(data);
    }
  }, [data]);

  return (
    <Page title="Thanh toán">
      <StyledBox>
        <Stack direction="row" alignItems="center" gap={0.25} mb={1}>
          <LocationOnIcon color="primary" />
          <Typography color="primary" fontSize="18px">
            Địa chỉ nhận hàng
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="center" gap={2}>
          <Typography fontWeight="bold">{`${address?.name} ${address?.phone}`}</Typography>
          <Typography>{`${address?.street}, ${address?.ward}, ${address?.district}, ${address?.city}`}</Typography>
          {address?.isDefault && (
            <Button
              variant="outlined"
              size="small"
              sx={{
                width: 50,
                height: 20,
                fontSize: "10px",
                p: 0,
                borderRadius: "2px",
              }}
            >
              Mặc định
            </Button>
          )}
          <Button size="small" onClick={addressesPopover.handleOpen}>
            Thay đổi
          </Button>
        </Stack>
      </StyledBox>
      <StyledBox>
        <Grid2 container spacing={3} alignItems="center">
          <Grid2 size={6.5}>
            <Typography>Sản phẩm</Typography>
          </Grid2>
          {columns.map((column) => (
            <Grid2 size={column.size} key={column.title}>
              <Typography
                variant="subtitle2"
                textAlign={column.textEnd ? "end" : "center"}
                color="text.secondary"
              >
                {column.title}
              </Typography>
            </Grid2>
          ))}
          {products.map((product) => (
            <React.Fragment key={product.productId}>
              <Grid2 size={6.5}>
                <Stack direction="row" alignItems="center" gap={2}>
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
                      <Typography fontSize="14px">
                        Màu: {product.color}
                      </Typography>
                    )}
                  </Box>
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
                <Typography textAlign="end" variant="body2">
                  {product.quantity}
                </Typography>
              </Grid2>
              <Grid2 size={2}>
                <Typography variant="body2" color="primary" textAlign="end">
                  {`₫${(product.quantity * product.price).toLocaleString(
                    "vi-VN"
                  )}`}
                </Typography>
              </Grid2>
            </React.Fragment>
          ))}
        </Grid2>
      </StyledBox>
      <Box bgcolor="white">
        <Stack direction="row" alignItems="center" gap={2} px={2} py={4}>
          <Typography fontSize="18px">Đơn vị vận chuyển</Typography>
          {shippingOptions.map((shipping) => (
            <Button
              key={shipping.id}
              color="primary"
              variant="outlined"
              sx={{
                height: "40px",
              }}
            >
              {shipping.name}
            </Button>
          ))}
        </Stack>
        <Divider />
        <Stack direction="row" alignItems="center" gap={6} px={2} py={4}>
          <Typography variant="body2">Viettel Post</Typography>
          <Typography variant="body2">Phí vận chuyển: ₫0 VNĐ</Typography>
          <Stack direction="row" alignItems="center" gap={0.5}>
            <LocalShippingIcon color="success" />
            <Typography variant="body2" color="success">
              Đảm bảo nhận hàng từ 23 tháng 10 - 25 tháng 10
            </Typography>
          </Stack>
        </Stack>
        <Divider />
        <Stack direction="row" alignItems="center" gap={2} px={2} py={4}>
          <Typography fontSize="18px">Phương thức thanh toán</Typography>
          {shippingOptions.map((shipping) => (
            <Button
              key={shipping.id}
              color="primary"
              variant="outlined"
              sx={{
                height: "40px",
              }}
            >
              {shipping.name}
            </Button>
          ))}
        </Stack>
        <Divider />
        <Stack direction="row" alignItems="center" gap={6} px={2} py={4}>
          <Typography variant="body2">Thanh toán khi nhận hàng</Typography>
        </Stack>
        <Divider />
        <Stack alignItems="flex-end" gap={2} px={2} py={4}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            width={300}
          >
            <Typography variant="body2" color="text.secondary">
              Tổng tiền hàng
            </Typography>
            <Typography variant="body2" color="text.secondary">
              đ41800
            </Typography>
          </Stack>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            width={300}
          >
            <Typography variant="body2" color="text.secondary">
              Phí vận chuyển
            </Typography>
            <Typography variant="body2" color="text.secondary">
              15555
            </Typography>
          </Stack>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            width={300}
          >
            <Typography variant="body2" color="text.secondary">
              Tổng thanh toán
            </Typography>
            <Typography color="primary" fontSize="24px">
              616đ
            </Typography>
          </Stack>
        </Stack>
        <Divider />
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          gap={6}
          px={2}
          py={4}
        >
          <Stack direction="row" gap={0.5}>
            <Typography variant="body2">
              Nhấn "Đặt hàng" đồng nghĩa với việc bạn đồng ý tuân theo
            </Typography>
            <Typography variant="body2" color="primary">
              Điều khoản VStore
            </Typography>
          </Stack>
          <Button
            variant="contained"
            sx={{
              width: 240,
            }}
          >
            Đặt hàng
          </Button>
        </Stack>
      </Box>
      <Dialog
        maxWidth="md"
        open={addressesPopover.open}
        onClose={addressesPopover.handleClose}
      >
        <Addresses
          defaultAddress={address}
          setAddress={setAddress}
          onClose={addressesPopover.handleClose}
        />
      </Dialog>
    </Page>
  );
};
