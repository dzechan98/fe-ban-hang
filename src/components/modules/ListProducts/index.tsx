import { ProductResponse } from "@api/products";
import { ListResponse } from "@api/type";
import { Product, ProductLoading } from "@components/core";
import { Button, Grid2, Pagination, Stack, Typography } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useNavigate } from "react-router-dom";

interface ListProductsProps {
  isLoading: boolean;
  listProducts?: ListResponse<ProductResponse>;
  page?: number;
  setPage?: React.Dispatch<React.SetStateAction<number>>;
  title?: string;
  size?: number;
  limit?: number;
}

export const ListProducts: React.FC<ListProductsProps> = ({
  isLoading,
  listProducts,
  page,
  setPage,
  title,
  size = 3,
  limit = 8,
}) => {
  const navigate = useNavigate();
  const handleChangePage = (
    _event: React.ChangeEvent<unknown>,
    pageNumber: number
  ) => {
    setPage?.(pageNumber);
  };

  return (
    <Stack marginTop={2}>
      {!isLoading && !listProducts?.results.length && (
        <Typography variant="body2">Không có sản phẩm nào </Typography>
      )}
      {title && listProducts?.results && (
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mb={1}
        >
          <Typography color="#777" marginY={2}>
            {title}
          </Typography>
          <Button
            endIcon={<ArrowForwardIosIcon />}
            sx={{
              color: "#777",
            }}
            onClick={() =>
              navigate(
                `/filter/${listProducts.results[0].category.slug}.${listProducts.results[0].category._id}`
              )
            }
          >
            Tất cả
          </Button>
        </Stack>
      )}
      {listProducts?.results && listProducts.results.length > 0 && (
        <>
          <Grid2 container spacing={0.75} width="100%">
            {listProducts.results.map((product) => (
              <Grid2 size={size} key={product._id}>
                <Product
                  _id={product._id}
                  title={product.title}
                  price={product.price}
                  sold={product.sold}
                  image_thumbnail={product.image_thumbnail}
                />
              </Grid2>
            ))}
          </Grid2>
          {page && (
            <Stack alignItems="center" marginTop={2}>
              <Pagination
                count={Math.ceil(listProducts.count / limit)}
                variant="outlined"
                shape="rounded"
                color="primary"
                onChange={handleChangePage}
                defaultPage={page}
              />
            </Stack>
          )}
        </>
      )}
      {isLoading && (
        <Grid2 container spacing={0.75} width="100%">
          {Array.from(new Array(limit)).map((_, index) => (
            <Grid2 size={size} key={index}>
              <ProductLoading />
            </Grid2>
          ))}
        </Grid2>
      )}
    </Stack>
  );
};
