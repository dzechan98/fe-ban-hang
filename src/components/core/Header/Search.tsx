import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import { ROUTES } from "@router/constants";

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
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");

  const handleSearch = () => {
    if (keyword.trim().length > 0) {
      navigate(`${ROUTES.search}?keyword=${keyword}`);
    }
  };

  return (
    <CustomSearch>
      <Box sx={{ cursor: "pointer" }} onClick={handleSearch}>
        <SearchIcon />
      </Box>

      <InputBase
        sx={{ color: "inherit", width: "100%" }}
        placeholder="Tìm kiếm sản phẩm"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
    </CustomSearch>
  );
};
