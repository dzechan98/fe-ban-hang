import { Box, Button, Divider, Radio, Stack, Typography } from "@mui/material";
import React from "react";
import AddIcon from "@mui/icons-material/Add";
import { AddressResponse } from "@api/address";

interface ViewProps {
  addresses: AddressResponse[];
  selectedAddress: AddressResponse;
  setSelectedAddress: React.Dispatch<React.SetStateAction<AddressResponse>>;
  onTypeEdit: (addressId: string) => void;
  onTypeAdd: () => void;
  onClose?: () => void;
  onConfirm: () => void;
}

export const View: React.FC<ViewProps> = ({
  addresses = [],
  selectedAddress,
  setSelectedAddress,
  onTypeEdit,
  onTypeAdd,
  onClose,
  onConfirm,
}) => {
  return (
    <Box minWidth="40vw">
      <Box p={2}>
        <Typography>Địa chỉ của tôi</Typography>
      </Box>
      <Divider />
      <Box
        pt={2}
        px={2}
        minHeight="60vh"
        display="flex"
        flexDirection="column"
        gap={2}
      >
        {addresses.map((address, index) => (
          <Box key={address._id}>
            <Stack
              direction="row"
              alignItems="flex-start"
              justifyContent="space-between"
            >
              <Stack direction="row" alignItems="flex-start" gap={1}>
                <Radio
                  sx={{
                    p: 0,
                  }}
                  checked={selectedAddress._id === address._id}
                  onChange={() => setSelectedAddress(address)}
                />
                <Box>
                  <Typography>
                    {address.name} - {address.phone}
                  </Typography>
                  <Typography color="text.secondary" variant="body2">
                    {address.street}
                  </Typography>
                  <Typography
                    color="text.secondary"
                    variant="body2"
                  >{`${address.ward}, ${address.district}, ${address.city}`}</Typography>
                  {address.isDefault && (
                    <Button
                      variant="outlined"
                      size="small"
                      sx={{
                        width: 70,
                        height: 24,
                        p: 0,
                        borderRadius: "2px",
                      }}
                    >
                      Mặc định
                    </Button>
                  )}
                </Box>
              </Stack>
              <Button size="small" onClick={() => onTypeEdit(address._id)}>
                Cập nhật
              </Button>
            </Stack>
            {index !== addresses.length - 1 && (
              <Box mt={2}>
                <Divider />
              </Box>
            )}
          </Box>
        ))}
        <Button
          sx={{
            width: "200px",
          }}
          color="inherit"
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={onTypeAdd}
        >
          Thêm địa chỉ mới
        </Button>
      </Box>
      <Divider />
      <Box
        p={2}
        display="flex"
        justifyContent="flex-end"
        gap={2}
        color="text.secondary"
      >
        <Button color="inherit" variant="outlined" onClick={onClose}>
          Hủy
        </Button>
        <Button variant="contained" onClick={onConfirm}>
          Xác nhận
        </Button>
      </Box>
    </Box>
  );
};
