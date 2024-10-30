import { Box, capitalize, CardMedia, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface ProductProps {
  _id: string;
  title: string;
  price: number;
  sold: number;
  image_thumbnail: string;
}

export const Product = ({
  _id,
  title,
  price,
  sold,
  image_thumbnail,
}: ProductProps) => {
  const navigate = useNavigate();

  return (
    <Box
      border={1}
      bgcolor="white"
      borderColor="#ccc"
      sx={{
        cursor: "pointer",
        borderRadius: "6px",
        "&:hover": {
          borderColor: "primary.main",
          transform: "translateY(-1px)",
          transition: "all ease 0.3s",
        },
      }}
      padding={1.5}
      onClick={() => navigate(`/products/${_id}`)}
    >
      <CardMedia
        sx={{ aspectRatio: "1.5", width: "100%" }}
        image={image_thumbnail}
        title={title}
      />
      <Box>
        <Typography
          variant="body2"
          marginY={1}
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: "2",
            WebkitBoxOrient: "vertical",
            minHeight: "40px",
          }}
        >
          {capitalize(title)}
        </Typography>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography color="primary" variant="body2">
            {`₫${price.toLocaleString("vi-VN")}`}
          </Typography>
          <Typography fontSize="12px">{`Đã bán : ${sold}`}</Typography>
        </Stack>
      </Box>
    </Box>
  );
};
