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
  filterPrice?: Option;
  setFilterPrice: React.Dispatch<React.SetStateAction<Option | undefined>>;
}

const menuFilterPrice: Option[] = [
  {
    label: "Thấp đến cao",
    value: "asc",
  },
  {
    label: "Cao đến thấp",
    value: "desc",
  },
];

export const MenuSort: React.FC<MenuSortProps> = ({
  filterPrice,
  setFilterPrice,
}) => {
  const pricePopover = usePopover("price");

  return (
    <Stack bgcolor="#ededed" direction="row" gap={2} alignItems="center" p={2}>
      <Typography fontSize="14px">Sắp xếp theo</Typography>
      <Button variant="contained" size="small">
        Mới nhất
      </Button>
      <Button variant="outlined" size="small">
        Bán chạy
      </Button>
      <Button
        endIcon={<KeyboardArrowDownIcon />}
        variant="outlined"
        size="small"
        color="error"
        onClick={pricePopover.handleOpen}
      >
        {filterPrice ? `Giá : ${filterPrice.label}` : "Giá"}
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
          {menuFilterPrice.map((item, index) => (
            <MenuItem
              key={index}
              onClick={() => {
                pricePopover.handleClose();
                setFilterPrice?.(item);
              }}
            >
              <Typography fontSize="14px">{`Giá: ${item.label}`}</Typography>
              {item.label === filterPrice?.label && (
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
