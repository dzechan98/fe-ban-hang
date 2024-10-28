import { Page } from "@components/core";
import {
  Box,
  Button,
  Dialog,
  Divider,
  FormControlLabel,
  Grid2,
  Radio,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useLocation, useNavigate } from "react-router-dom";
import { ProductSelected } from "@api/cart";
import React, { useEffect, useMemo, useState } from "react";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { Addresses } from "@components/modules";
import { usePopover } from "@hooks/usePopover";
import { AddressResponse, useAddressDefault } from "@api/address";
import dayjs from "dayjs";
import { OrderInput, useCreateOrder } from "@api/order";
import { toast } from "react-toastify";
import { getError } from "@utils/getError";
import CircularProgress from "@mui/material/CircularProgress";
import { ROUTES } from "@router/constants";

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

const paymentOptions = [
  {
    id: "1",
    name: "Thanh toán khi nhận hàng",
    value: "cash_on_delivery",
  },
  {
    id: "2",
    name: "Chuyển khoản",
    value: "bank_transfer",
  },
];

const columns = [
  { title: "Đơn Giá", size: 2, textEnd: false },
  { title: "Số Lượng", size: 1.5, textEnd: true },
  { title: "Thành tiền", size: 2, textEnd: true },
];

const formattedDate = (deliveryTime: string) => {
  const [p1, p2] = deliveryTime.split("-").map(Number);
  const today = dayjs();
  const date1 = today.add(p1, "day");
  const date2 = today.add(p2, "day");

  const formattedDate1 = date1.format("DD [tháng] MM");
  const formattedDate2 = date2.format("DD [tháng] MM");

  return `${formattedDate1} - ${formattedDate2}`;
};

export const CheckoutPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const products: ProductSelected[] = location.state?.products || [];
  const createOrderMutation = useCreateOrder({ queryKey: ["cart"] });
  const { data } = useAddressDefault();
  const addressesPopover = usePopover("addresses");

  const totalPrice = useMemo(() => {
    return products.reduce((occ, cur) => occ + cur.price * cur.quantity, 0);
  }, []);

  const [shippingMethod, setShippingMethod] = useState(shippingOptions[0]);
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(paymentOptions[0]);

  const [address, setAddress] = useState<AddressResponse>(
    {} as AddressResponse
  );

  const handleCreateOrder = async (event: React.MouseEvent<HTMLElement>) => {
    if (!address._id) {
      addressesPopover.handleOpen(event);
      return;
    }

    setLoading(true);
    try {
      const newOrder: OrderInput = {
        items: products.map(({ checked: _, ...product }) => product),
        shippingAddress: address,
        totalPrice: totalPrice + shippingMethod.fee,
        paymentMethod: paymentMethod.value,
      };

      const res = await createOrderMutation.mutateAsync(newOrder);
      navigate(ROUTES.orderSuccess, {
        state: {
          id: res._id,
          timeShipping: shippingMethod.deliveryTime,
        },
      });
    } catch (error) {
      toast.error(getError(error));
    } finally {
      setLoading(false);
    }
  };

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
      {address._id && (
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
      )}
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
                      <Typography variant="body2" color="text.secondary">
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
      <Box bgcolor="white" mb={2}>
        <Box px={2} py={4}>
          <Stack direction="row" alignItems="center" gap={4}>
            <Typography fontSize="18px">Đơn vị vận chuyển</Typography>
            <Stack direction="row" alignItems="center" gap={2}>
              {shippingOptions.map((shipping) => (
                <FormControlLabel
                  key={shipping.id}
                  control={
                    <Radio
                      size="small"
                      checked={shipping === shippingMethod}
                      onChange={() => setShippingMethod(shipping)}
                    />
                  }
                  label={shipping.name}
                />
              ))}
            </Stack>
          </Stack>
          <Stack direction="row" alignItems="center" gap={4}>
            <Typography variant="body2">{shippingMethod.name}</Typography>
            <Typography variant="body2">
              Phí vận chuyển: ₫{shippingMethod.fee.toLocaleString("vi-VN")}
            </Typography>
            <Stack direction="row" alignItems="center" gap={0.5}>
              <LocalShippingIcon color="primary" />
              <Typography variant="body2" color="primary">
                Đảm bảo nhận hàng từ{" "}
                {formattedDate(shippingMethod.deliveryTime)}
              </Typography>
            </Stack>
          </Stack>
        </Box>
        <Divider />
        <Stack direction="row" alignItems="center" gap={2} px={2} py={4}>
          <Typography fontSize="18px">Phương thức thanh toán</Typography>
          {paymentOptions.map((payment) => (
            <FormControlLabel
              key={payment.id}
              control={
                <Radio
                  size="small"
                  checked={paymentMethod === payment}
                  onChange={() => setPaymentMethod(payment)}
                />
              }
              label={payment.name}
            />
          ))}
        </Stack>
      </Box>
      <Box bgcolor="white">
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
              ₫{totalPrice.toLocaleString("vi-VN")}
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
              ₫{shippingMethod.fee.toLocaleString("vi-VN")}
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
              ₫{(totalPrice + shippingMethod.fee).toLocaleString("vi-VN")}
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
          color="white"
        >
          <Stack direction="row" gap={0.5}>
            <Typography variant="body2" color="text.secondary">
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
            onClick={handleCreateOrder}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Đặt hàng"
            )}
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
