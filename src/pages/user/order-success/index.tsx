import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  styled,
} from "@mui/material";
import {
  CheckCircle as CheckCircleIcon,
  LocalShipping as LocalShippingIcon,
  Inventory as InventoryIcon,
} from "@mui/icons-material";
import { Page } from "@components/core";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "@router/constants";

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 600,
  margin: "auto",
  marginTop: theme.spacing(4),
  padding: theme.spacing(3),
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  marginBottom: theme.spacing(2),
}));

const OrderDetail = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  justifyItems: "flex-start",
  marginBottom: theme.spacing(1),
}));

const StatusItem = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginBottom: theme.spacing(1),
  "& > svg": {
    marginRight: theme.spacing(1),
  },
}));

export const OrderSuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { orderCode, timeShipping, address } = location.state;

  return (
    <Page
      title="Đặt hàng thành công"
      sx={{
        minHeight: "100vh",
        backgroundColor: "grey.100",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <StyledCard>
        <CardContent>
          <IconWrapper>
            <CheckCircleIcon color="primary" sx={{ fontSize: 60 }} />
          </IconWrapper>
          <Typography variant="h5" component="h1" align="center" gutterBottom>
            Đặt hàng thành công!
          </Typography>
          <Typography
            variant="body1"
            align="center"
            color="text.secondary"
            mb={2}
          >
            Cảm ơn bạn đã mua hàng. Đơn đặt hàng của bạn đã được nhận và đang
            được đang được xử lý.
          </Typography>
          <OrderDetail>
            <Typography variant="body2" color="text.secondary">
              Mã đơn hàng:
            </Typography>
            <Typography variant="body2" fontWeight="bold">
              #{orderCode}
            </Typography>
          </OrderDetail>
          <OrderDetail>
            <Typography variant="body2" color="text.secondary">
              Vận chuyển đến:
            </Typography>
            <Typography variant="body2" fontWeight="bold">
              {address}
            </Typography>
          </OrderDetail>
          <StatusItem>
            <InventoryIcon color="action" fontSize="small" />
            <Typography variant="body2" color="text.secondary">
              Đơn hàng của bạn đang được chuẩn bị
            </Typography>
          </StatusItem>
          <StatusItem>
            <LocalShippingIcon color="action" fontSize="small" />
            <Typography variant="body2" color="text.secondary">
              Dự kiến giao hàng: {timeShipping} ngày làm việc
            </Typography>
          </StatusItem>
        </CardContent>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate(ROUTES.home)}
          >
            Tiếp tục mua sắm
          </Button>
        </Box>
      </StyledCard>
    </Page>
  );
};
