import { useListCategories } from "@api/categories";
import { Box, Typography, Grid2 } from "@mui/material";
import { capitalizeWords } from "@utils/capitalizeWords";

export const ListCategories = () => {
  const { data } = useListCategories({});

  return (
    <Box sx={{ bgcolor: "white" }}>
      <Box padding={2}>
        <Typography color="primary" fontWeight={600}>
          DANH MỤC
        </Typography>
      </Box>
      <Grid2 container>
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
            >
              <img
                src={category.image_url}
                alt={category.title}
                style={{
                  height: 84,
                  width: 84,
                  objectFit: "cover",
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
      </Grid2>
    </Box>
  );
};
