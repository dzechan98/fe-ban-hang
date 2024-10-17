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
      borderColor="#ccc"
      sx={{
        cursor: "pointer",
        "&:hover": {
          borderColor: "primary.main",
          transform: "translateY(-1px)",
          transition: "all ease 0.3s",
        },
      }}
      onClick={() => navigate(`/products/${_id}`)}
    >
      <CardMedia sx={{ height: 188 }} image={image_thumbnail} title={title} />
      <Box padding={1} bgcolor="white">
        <Typography
          fontSize="14px"
          marginBottom={0.5}
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
          <Typography color="primary" fontSize="14px">
            {`₫${price.toLocaleString("vi-VN")}`}
          </Typography>
          <Typography fontSize="12px">{`Đã bán : ${sold}`}</Typography>
        </Stack>
      </Box>
    </Box>
  );
};
