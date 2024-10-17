import { Page } from "@components/core";
import { ListCategories, LoadMoreProduct } from "@components/modules";
import { Box, Stack, Typography } from "@mui/material";

export const HomePage = () => {
  return (
    <Page title="Trang chủ">
      <ListCategories />
      <Stack alignItems="center" gap={2} marginY={2}>
        <Box
          paddingY={2}
          bgcolor="white"
          borderBottom={3}
          borderColor="primary.main"
          width="100%"
        >
          <Typography textAlign="center" color="primary" fontWeight={600}>
            GỢI Ý CHO BẠN
          </Typography>
        </Box>
        <LoadMoreProduct />
      </Stack>
    </Page>
  );
};
