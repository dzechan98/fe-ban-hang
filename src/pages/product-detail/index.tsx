import { useGetProduct } from "@api/products";
import { Page, Quantity, RouterLink } from "@components/core";
import { Box, Breadcrumbs, Button, Stack, Typography } from "@mui/material";
import { ROUTES } from "@router/constants";
import { capitalizeWords } from "@utils/capitalizeWords";
import { useNavigate, useParams } from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import { useState } from "react";
import { useAuth } from "@contexts/UserContext";
import { ListProducts, SlideImage } from "@components/modules";
import Parser from "html-react-parser";

export const ProductDetailPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { data, isLoading } = useGetProduct(id);

  const [count, setCount] = useState(1);

  const handleBuyNow = () => {
    if (user) {
      return;
    }
    navigate(ROUTES.login);
  };

  const handleAddCart = () => {
    if (user) {
      return;
    }
    navigate(ROUTES.login);
  };

  return (
    <>
      {data && (
        <Page title={capitalizeWords(data.title)}>
          <Stack gap={3}>
            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
              <RouterLink to={ROUTES.home} fontSize="14px">
                VStore
              </RouterLink>
              <RouterLink to={ROUTES.home} fontSize="14px">
                {capitalizeWords(data.category.title)}
              </RouterLink>
              <Typography fontSize="14px">
                {capitalizeWords(data.title)}
              </Typography>
            </Breadcrumbs>
            <Stack
              direction="row"
              bgcolor="white"
              padding={2}
              sx={{ borderRadius: "2px" }}
              gap={2}
            >
              <Stack width={450}>
                <SlideImage images={data.images} />
              </Stack>
              <Stack></Stack>
              <Stack flexGrow={1} gap={2}>
                <Typography fontSize="20px">
                  {capitalizeWords(data.title)}
                </Typography>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography
                    fontSize="24px"
                    color="primary"
                  >{`${data.price.toLocaleString("vi-VN")}đ`}</Typography>
                  <Typography
                    fontSize="14px"
                    color="#757575"
                  >{`${data.sold} đã bán`}</Typography>
                </Stack>
                <Stack direction="row" alignItems="center" gap={2}>
                  <Typography color="#757575" fontSize="14px" minWidth="100px">
                    Số lượng
                  </Typography>
                  <Quantity count={count} setCount={setCount} />
                  <Typography
                    color="#757575"
                    fontSize="14px"
                  >{`${data.quantity} sản phẩm có sẵn`}</Typography>
                </Stack>
                <Stack direction="row" gap={2}>
                  <Button
                    startIcon={<AddShoppingCartOutlinedIcon />}
                    variant="outlined"
                    sx={{
                      width: 250,
                      backgroundColor: "rgba(25,118,210,0.15)",
                    }}
                    onClick={handleAddCart}
                  >
                    Thêm Vào Giỏ Hàng
                  </Button>
                  <Button
                    variant="contained"
                    sx={{ width: 250 }}
                    onClick={handleBuyNow}
                  >
                    Mua Ngay
                  </Button>
                </Stack>
              </Stack>
            </Stack>
            {data.description && (
              <Stack bgcolor="white" padding={2} sx={{ borderRadius: "2px" }}>
                <Box p={2} bgcolor="#f5f5f5" width="100%">
                  <Typography>CHI TIẾT SẢN PHẨM</Typography>
                </Box>
                <Box p={2}>{Parser(data.description)}</Box>
              </Stack>
            )}
          </Stack>
          <Typography color="#777" marginY={2}>
            SẢN PHẨM LIÊN QUAN
          </Typography>
          <ListProducts category={data.category._id} id={data._id} />
        </Page>
      )}
      {isLoading && <Page title="Chi tiết sản phẩm">Loading...</Page>}
    </>
  );
};
