import { AddressResponse, useAddresses } from "@api/address";
import React, { useState } from "react";
import { View } from "./view";
import { AddressForm } from "./address-form";

interface AddressesProps {
  defaultAddress: AddressResponse;
  setAddress: React.Dispatch<React.SetStateAction<AddressResponse>>;
  onClose?: () => void;
}

export const Addresses: React.FC<AddressesProps> = ({
  defaultAddress,
  setAddress,
  onClose,
}) => {
  const { data: addresses } = useAddresses();

  const [type, setType] = useState<"edit" | "add" | "view">("view");
  const [addressId, setAddressId] = useState("");
  const [selectedAddress, setSelectedAddress] = useState(defaultAddress);

  const handleTypeView = () => {
    setType("view");
  };

  const handleTypeEdit = (id: string) => {
    setType("edit");
    setAddressId(id);
  };

  const handleTypeAdd = () => {
    setType("add");
  };

  const handleConfirm = () => {
    setAddress(selectedAddress);
    onClose?.();
  };

  const render = () => {
    switch (type) {
      case "view":
        return (
          <View
            addresses={addresses?.results ?? []}
            selectedAddress={selectedAddress}
            setSelectedAddress={setSelectedAddress}
            onTypeEdit={handleTypeEdit}
            onTypeAdd={handleTypeAdd}
            onClose={onClose}
            onConfirm={handleConfirm}
          />
        );
      case "add":
        return <AddressForm type="add" onTypeView={handleTypeView} />;
      case "edit":
        return (
          <AddressForm
            type="edit"
            addressId={addressId}
            onTypeView={handleTypeView}
          />
        );

      default:
        return (
          <View
            addresses={addresses?.results ?? []}
            selectedAddress={selectedAddress}
            setSelectedAddress={setSelectedAddress}
            onTypeEdit={handleTypeEdit}
            onTypeAdd={handleTypeAdd}
            onClose={onClose}
            onConfirm={handleConfirm}
          />
        );
    }
  };

  return render();
};
