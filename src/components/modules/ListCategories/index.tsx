import { useListCategories } from "@api/categories";
import { Box, Typography, Grid2 } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const ListCategories = () => {
  const { data } = useListCategories({});
  const navigate = useNavigate();

  return (
    <Box sx={{ bgcolor: "white" }} p={2}>
      <Typography color="primary" fontWeight={600} mb={2}>
        THƯƠNG HIỆU
      </Typography>
      <Grid2 container spacing={1.5}>
        {data &&
          data.results.map((category) => (
            <Grid2 size={12 / 5} key={category._id}>
              <Box
                p={2}
                display="flex"
                alignItems="center"
                justifyContent="center"
                bgcolor="#f2f4f7"
                border={1}
                borderColor="transparent"
                sx={{
                  borderRadius: "6px",
                  cursor: "pointer",
                  transition: "0.3s all",
                  "&:hover": {
                    borderColor: "primary.main",
                  },
                }}
                onClick={() =>
                  navigate(`/filter/${category.slug}.${category._id}`)
                }
              >
                <Box
                  component="img"
                  src={category.image_url}
                  alt={category.title}
                  sx={{ height: 50 }}
                />
              </Box>
            </Grid2>
          ))}
      </Grid2>
      {/* <Grid2 container>
        {data &&
          data.results.slice(0, 20).map((category, index) => (
            <Grid2
              size={1.2}
              key={category._id}
              padding={1}
              sx={{
                cursor: "pointer",
                border: "1px solid rgba(0,0,0,0.05)",
                borderLeft: "none",
                borderRight: index == 9 ? "none" : "1px solid rgba(0,0,0,0.05)",
                borderTop: index > 9 ? "none" : "1px solid rgba(0,0,0,0.05)",
                borderBottom: index > 9 ? "none" : "1px solid rgba(0,0,0,0.05)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                rowGap: 0.5,
                "&:hover": {
                  borderColor: "rgba(0,0,0,0.12)",
                  boxShadow: "0 0 0.8125rem rgba(0,0,0,0.05)",
                  transition: "0.3s ease all",
                },
              }}
              onClick={() =>
                navigate(`/filter/${category.slug}.${category._id}`)
              }
            >
              <img
                src={category.image_url}
                alt={category.title}
                style={{
                  height: 20,
                }}
                loading="lazy"
              />
              <Box minHeight="40px">
                <Typography fontSize="14px" textAlign="center">
                  {capitalizeWords(category.title)}
                </Typography>
              </Box>
            </Grid2>
          ))}
      </Grid2> */}
    </Box>
  );
};
