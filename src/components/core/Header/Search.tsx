import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";

const CustomSearch = styled("div")(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  display: "flex",
  alignItems: "center",
  gap: 1,
  padding: theme.spacing(0.5, 2),
}));

export const Search = () => {
  return (
    <CustomSearch>
      <SearchIcon />
      <InputBase
        sx={{ color: "inherit", width: "100%" }}
        placeholder="Tìm kiếm sản phẩm"
      />
    </CustomSearch>
  );
};
