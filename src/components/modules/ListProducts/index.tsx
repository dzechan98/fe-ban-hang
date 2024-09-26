import { useListProducts } from "@api/products";
import { Product, ProductLoading } from "@components/core";
import { Button, Grid2, Stack } from "@mui/material";
import { useEffect, useState } from "react";

interface ListProductsProps {
  limit?: number;
  category?: string;
  id?: string;
}
export const ListProducts = ({
  limit = 12,
  category,
  id,
}: ListProductsProps) => {
  const [index, setIndex] = useState(1);
  const { data, isLoading } = useListProducts({
    page: index,
    limit,
    category,
    id,
  });
  const [listProducts, setListProducts] = useState(data);

  useEffect(() => {
    if (data) {
      setListProducts((prev) => {
        if (prev && index === 1) return prev;

        return {
          count: data.count,
          results: [...(listProducts?.results || []), ...data.results],
        };
      });
    }
  }, [data]);

  return (
    <Stack alignItems="center" gap={2} width="100%">
      <Grid2 container spacing={0.75} width="100%">
        {listProducts?.results &&
          listProducts.results.map((product) => (
            <Grid2 size={2} key={product._id}>
              <Product
                _id={product._id}
                title={product.title}
                price={product.price}
                sold={product.sold}
                image_thumbnail={product.image_thumbnail}
              />
            </Grid2>
          ))}
        {isLoading &&
          Array.from(new Array(12)).map((_, index) => (
            <Grid2 size={2} key={index}>
              <ProductLoading />
            </Grid2>
          ))}
      </Grid2>
      {listProducts?.count && (
        <Button
          variant="outlined"
          disabled={index >= Math.ceil(listProducts?.count / 12)}
          sx={{
            minWidth: 300,
          }}
          onClick={() => setIndex(index + 1)}
        >
          Xem Thêm
        </Button>
      )}
    </Stack>
  );
};
