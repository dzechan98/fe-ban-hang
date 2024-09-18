import { Box, Skeleton, Stack } from "@mui/material";

export const ProductLoading = () => {
  return (
    <Box
      width="100%"
      border={1}
      borderColor="#ccc"
      sx={{
        cursor: "pointer",
        "&:hover": {
          borderColor: "primary.main",
        },
      }}
    >
      <Skeleton variant="rectangular" width="100%" height={188} />
      <Box padding={1} bgcolor="white">
        <Skeleton />
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Skeleton width="25%" />
          <Skeleton width="25%" />
        </Stack>
      </Box>
    </Box>
  );
};
