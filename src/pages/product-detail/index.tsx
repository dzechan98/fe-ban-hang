import { useGetProduct, useListProducts } from "@api/products";
import { Page, Quantity, RouterLink } from "@components/core";
import { Box, Breadcrumbs, Button, Stack, Typography } from "@mui/material";
import { ROUTES } from "@router/constants";
import { capitalizeWords } from "@utils/capitalizeWords";
import { useNavigate, useParams } from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import { useEffect, useState } from "react";
import { useAuth } from "@contexts/UserContext";
import { ListProducts, SlideImage } from "@components/modules";
import Parser from "html-react-parser";
import { useCart } from "@contexts/CartContext";
import { ProductCart } from "@api/cart";
import { toast } from "react-toastify";

export const ProductDetailPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { addItemToCart } = useCart();
  const navigate = useNavigate();
  const { data, isLoading } = useGetProduct(id);

  const { data: listProducts, isLoading: isLoadingListProducts } =
    useListProducts({
      page: 1,
      limit: 6,
      category: data?.category._id,
      id: data?._id,
    });

  const [count, setCount] = useState(1);

  const handleBuyNow = () => {
    if (user && data) {
      if (data.quantity - data.sold >= count) {
        const { _id, image_thumbnail, price, title, color } = data;
        const product = {
          productId: _id,
          title,
          color,
          image_thumbnail,
          price,
          quantity: count,
          checked: true,
        };

        navigate(ROUTES.checkout, {
          state: {
            products: [product],
          },
        });
      } else {
        toast.error("Số lượng sản phẩm không đủ");
      }
      return;
    }

    navigate(ROUTES.login);
  };

  const handleAddCart = () => {
    if (user && data) {
      const { _id, image_thumbnail, price, title, color } = data;
      const product: ProductCart = {
        productId: _id,
        title,
        color,
        image_thumbnail,
        price,
        quantity: count,
      };
      addItemToCart(product);
      return;
    }
    navigate(ROUTES.login);
  };

  useEffect(() => {
    setCount(1);
  }, [data]);

  return (
    <>
      {data && (
        <Page title={capitalizeWords(data.title)}>
          <Stack gap={3}>
            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
              <RouterLink to={ROUTES.home} fontSize="14px">
                VStore
              </RouterLink>
              <RouterLink
                to={`/filter/${data.category.slug}.${data.category._id}`}
                fontSize="14px"
              >
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
                <SlideImage images={[data.image_thumbnail, ...data.images]} />
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
                  >{`₫${data.price.toLocaleString("vi-VN")}`}</Typography>
                  <Typography
                    fontSize="14px"
                    color="text.secondary"
                  >{`${data.sold} đã bán`}</Typography>
                </Stack>
                <Stack direction="row" alignItems="center" gap={2}>
                  <Typography
                    color="text.secondary"
                    fontSize="14px"
                    minWidth="100px"
                  >
                    Số lượng
                  </Typography>
                  <Quantity count={count} setCount={setCount} />
                  <Typography color="text.secondary" fontSize="14px">{`${
                    data.quantity - data.sold
                  } sản phẩm có sẵn`}</Typography>
                </Stack>
                {data.color && (
                  <Typography variant="body2" color="text.secondary">
                    Màu: {data.color}
                  </Typography>
                )}
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
          <ListProducts
            isLoading={isLoadingListProducts}
            listProducts={listProducts}
            title="SẢN PHẨM LIÊN QUAN"
            size={2}
          />
        </Page>
      )}
      {isLoading && <Page title="Chi tiết sản phẩm">Loading...</Page>}
    </>
  );
};
