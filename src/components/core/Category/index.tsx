import { Box, Stack, Typography } from "@mui/material";
import React from "react";

interface CategoryProps {
  title: string;
  imageURL: string;
}
export const Category = ({ title, imageURL }: CategoryProps) => {
  return (
    <Stack gap={0.5} alignItems="center">
      <img
        src={imageURL}
        alt={title}
        style={{
          height: "80px",
          width: "80px",
        }}
      />
      <Box minHeight="40px">
        <Typography>{title}</Typography>
      </Box>
    </Stack>
  );
};
