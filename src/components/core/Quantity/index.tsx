import { Box, Stack } from "@mui/material";
import React from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const styleBox = {
  bgcolor: "white",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  color: "inherit",
};

interface QuantityProps {
  count: number;
  setCount?: React.Dispatch<React.SetStateAction<number>>;
  onIncrement?: () => void;
  onDecrement?: () => void;
}

export const Quantity = ({
  count,
  setCount,
  onDecrement,
  onIncrement,
}: QuantityProps) => {
  const handleIncrement = () => {
    setCount?.((prev) => prev + 1);
    onIncrement?.();
  };

  const handleDecrement = () => {
    setCount?.((prev) => (prev > 1 ? prev - 1 : 1));
    onDecrement?.();
  };

  return (
    <Stack
      direction="row"
      bgcolor="#f5f5f5"
      height={32}
      sx={{
        border: "1px solid #f5f5f5",
        gap: "1px",
        color: "#757575",
      }}
    >
      <Box width={32} onClick={handleDecrement} sx={{ ...styleBox }}>
        <RemoveIcon fontSize="small" />
      </Box>
      <Box minWidth={50} sx={{ ...styleBox, cursor: "default" }} flexGrow={1}>
        {count}
      </Box>
      <Box width={32} onClick={handleIncrement} sx={{ ...styleBox }}>
        <AddIcon fontSize="small" />
      </Box>
    </Stack>
  );
};
