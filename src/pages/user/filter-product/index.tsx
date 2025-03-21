import { useListCategories } from "@api/categories";
import { MenuSort, Navigate, Option, Page } from "@components/core";
import {
  Box,
  Divider,
  ListItemIcon,
  MenuItem,
  MenuList,
  Stack,
  Typography,
} from "@mui/material";
import { capitalizeWords } from "@utils/capitalizeWords";
import { useLocation, useParams } from "react-router-dom";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { useMemo, useState } from "react";
import { useListProducts } from "@api/products";
import { ListProducts } from "@components/modules";

const getPathCategory = ({ _id, slug }: { _id: string; slug: string }) => {
  return `/filter/${slug}.${_id}`;
};

export const FilterProductPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const decodedPathname = decodeURIComponent(location.pathname);
  const { categoryId, title } = useMemo(() => {
    const categoryId = id?.split(".")[1];
    const title = id?.split(".")[0].split("-").join(" ");

    return { categoryId, title };
  }, [id]);

  const { data: listCategories } = useListCategories({});

  const [page, setPage] = useState(1);
  const [sortOption, setSortOption] = useState<Option>();

  const { data: listProducts, isLoading } = useListProducts({
    listCategories: categoryId,
    page,
    limit: 8,
    sortBy: sortOption?.value.split(" ")[0],
    sortOrder: sortOption?.value.split(" ")[1],
  });

  return (
    <>
      <Page title={`Mua sắm sản phẩm ${capitalizeWords(title as string)}`}>
        <Stack direction="row" gap={2}>
          <Stack minWidth={200}>
            <Stack direction="row" gap={2} marginBottom={2}>
              <FormatListBulletedIcon sx={{ color: "black" }} />
              <Typography fontWeight="bold">Tất Cả Danh Mục</Typography>
            </Stack>
            <Divider />
            <MenuList>
              {listCategories?.results &&
                listCategories?.results.map(({ _id, slug, title }) => (
                  <Navigate key={_id} to={getPathCategory({ _id, slug })}>
                    <MenuItem
                      disableGutters
                      disableRipple
                      disableTouchRipple
                      sx={{
                        "&:hover": {
                          background: "none",
                        },
                      }}
                    >
                      <ListItemIcon sx={{ marginRight: -1.5 }}>
                        {decodedPathname.includes(
                          getPathCategory({ _id, slug })
                        ) && <ArrowRightIcon color="primary" />}
                      </ListItemIcon>
                      <Typography
                        variant="body2"
                        sx={{
                          "&:hover": {
                            color: "primary.main",
                          },
                        }}
                      >
                        {capitalizeWords(title)}
                      </Typography>
                    </MenuItem>
                  </Navigate>
                ))}
            </MenuList>
          </Stack>
          <Box width="100%">
            <MenuSort sortOption={sortOption} setSortOption={setSortOption} />
            <ListProducts
              page={page}
              setPage={setPage}
              isLoading={isLoading}
              size={3}
              listProducts={listProducts}
            />
          </Box>
        </Stack>
      </Page>
    </>
  );
};
