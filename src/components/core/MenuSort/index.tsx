import {
  Button,
  ListItemIcon,
  MenuItem,
  MenuList,
  Popover,
  Stack,
  Typography,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CheckIcon from "@mui/icons-material/Check";
import { usePopover } from "@hooks/usePopover";
import React from "react";

export interface Option {
  label: string;
  value: string;
}

interface MenuSortProps {
  sortOption?: Option;
  setSortOption: React.Dispatch<React.SetStateAction<Option | undefined>>;
}

const menuSort: Option[] = [
  { label: "Mới nhất", value: "createdAt desc" },
  { label: "Bán chạy", value: "sold desc" },
  {
    label: "Thấp đến cao",
    value: "price asc",
  },
  {
    label: "Cao đến thấp",
    value: "price desc",
  },
];

export const MenuSort: React.FC<MenuSortProps> = ({
  sortOption = menuSort[0],
  setSortOption,
}) => {
  const pricePopover = usePopover("price");

  return (
    <Stack bgcolor="#ededed" direction="row" gap={2} alignItems="center" p={2}>
      <Typography variant="body2">Sắp xếp theo</Typography>
      {menuSort.slice(0, 2).map((i, index) => (
        <Button
          key={index}
          size="small"
          variant={sortOption.label === i.label ? "contained" : "outlined"}
          onClick={() => setSortOption(i)}
        >
          {i.label}
        </Button>
      ))}
      <Button
        endIcon={<KeyboardArrowDownIcon />}
        variant="outlined"
        size="small"
        color="error"
        onClick={pricePopover.handleOpen}
      >
        {menuSort.slice(2, 4).some((i) => i === sortOption)
          ? `Giá : ${sortOption.label}`
          : "Giá"}
      </Button>
      <Popover
        open={pricePopover.open}
        anchorEl={pricePopover.anchorEl}
        onClose={pricePopover.handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <MenuList>
          {menuSort.slice(2, 4).map((item, index) => (
            <MenuItem
              key={index}
              onClick={() => {
                pricePopover.handleClose();
                setSortOption?.(item);
              }}
            >
              <Typography variant="body2">{`Giá: ${item.label}`}</Typography>
              {item.label === sortOption?.label && (
                <ListItemIcon
                  sx={{
                    marginLeft: 2,
                  }}
                >
                  <CheckIcon fontSize="small" />
                </ListItemIcon>
              )}
            </MenuItem>
          ))}
        </MenuList>
      </Popover>
    </Stack>
  );
};
