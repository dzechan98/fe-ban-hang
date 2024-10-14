import { MenuSort, Option, Page } from "@components/core";
import {
  Box,
  Checkbox,
  FormControlLabel,
  Stack,
  Typography,
} from "@mui/material";
import { useSearchParams } from "react-router-dom";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { useListCategories } from "@api/categories";
import { capitalizeWords } from "@utils/capitalizeWords";
import { useEffect, useState } from "react";
import { ListProducts1 } from "@components/modules";
import { useListProducts } from "@api/products";

interface CheckboxOption extends Option {
  checked: boolean;
}

export const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const { data: listCategories } = useListCategories({});
  const [filterPrice, setFilterPrice] = useState<Option>();
  const [listCategoriesSearch, setListCategoriesSearch] =
    useState<CheckboxOption[]>();
  const [page, setPage] = useState(1);

  const { data: listProducts, isLoading } = useListProducts({
    page,
    limit: 8,
    sortPrice: filterPrice?.value,
    title: searchParams.get("keyword") as string,
  });

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setListCategoriesSearch(
      listCategoriesSearch?.map((item) =>
        item.value === event.target.name
          ? { ...item, checked: event.target.checked }
          : item
      )
    );
  };

  console.log(listCategoriesSearch);

  useEffect(() => {
    if (listCategories) {
      setListCategoriesSearch(
        listCategories.results.map((category) => ({
          label: capitalizeWords(category.title),
          value: category._id,
          checked: false,
        }))
      );
    }
  }, [listCategories]);

  return (
    <Page title={`123`}>
      <Stack direction="row" gap={2}>
        <Stack minWidth={200}>
          <Stack direction="row" gap={2} marginBottom={2}>
            <FilterAltOutlinedIcon sx={{ color: "black" }} />
            <Typography fontWeight="bold">Bộ lọc tìm kiếm</Typography>
          </Stack>
          <Box>
            {listCategoriesSearch &&
              listCategoriesSearch.map((option) => (
                <Stack key={option.value}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        size="small"
                        onChange={onChange}
                        name={option.value}
                        checked={option.checked}
                      />
                    }
                    label={option.label}
                    sx={{
                      "& .MuiFormControlLabel-label": {
                        fontSize: "14px",
                      },
                    }}
                  />
                </Stack>
              ))}
          </Box>
        </Stack>
        <Box width="100%">
          <Typography mb={2}>
            Kết quả tìm kiếm cho từ khóa '
            <Typography variant="overline" color="primary" fontWeight="bold">
              {searchParams.get("keyword")}
            </Typography>
            '
          </Typography>
          <MenuSort filterPrice={filterPrice} setFilterPrice={setFilterPrice} />
          <ListProducts1
            page={page}
            setPage={setPage}
            isLoading={isLoading}
            listProducts={listProducts}
          />
        </Box>
      </Stack>
    </Page>
  );
};
