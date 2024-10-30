import { useCart } from "@contexts/CartContext";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface CartPreviewProps {
  onClosePopup?: () => void;
}

export const CartPreview: React.FC<CartPreviewProps> = ({ onClosePopup }) => {
  const { cart } = useCart();
  const navigate = useNavigate();

  return (
    <Box width={600} bgcolor="white" border={1} borderColor="#ccc">
      <Typography color="#ccc" variant="body2" p={2}>
        Sản Phẩm Mới Thêm
      </Typography>
      {cart?.items.slice(0, 5).map((product) => (
        <Stack
          key={product.productId}
          direction="row"
          alignItems="flex-start"
          gap={2}
          p={2}
          sx={{
            "&:hover": {
              bgcolor: "#f5f5f5",
            },
            cursor: "pointer",
          }}
          onClick={() => {
            navigate(`products/${product.productId}`);
            onClosePopup?.();
          }}
        >
          <img
            src={product.image_thumbnail}
            alt={product.title}
            style={{
              height: 50,
              width: 50,
              objectFit: "cover",
            }}
          />
          <Box>
            <Typography
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: "1",
                WebkitBoxOrient: "vertical",
                fontSize: "14px",
              }}
            >
              {product.title}
            </Typography>
            <Typography fontSize="12px">{`Số lượng: ${product.quantity}`}</Typography>
          </Box>
          <Typography color="primary" variant="body2">
            {`₫${product.price.toLocaleString("vi-VN")}`}
          </Typography>
        </Stack>
      ))}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        p={2}
      >
        <Typography fontSize="12px">
          {`${cart?.items.length} Thêm Hàng Vào Giỏ`}
        </Typography>
        <Button
          variant="contained"
          size="small"
          onClick={() => navigate("/cart")}
        >
          Xem giỏ hàng
        </Button>
      </Stack>
    </Box>
  );
};
