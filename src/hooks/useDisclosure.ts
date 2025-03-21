import { useState } from "react";

interface Disclosure {
  initialState?: boolean;
}

export const useDisclosure = ({ initialState = false }: Disclosure) => {
  const [isOpen, setIsOpen] = useState(initialState);

  const onOpen = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  const onToggle = () => {
    setIsOpen(!isOpen);
  };

  return {
    isOpen,
    onOpen,
    onClose,
    onToggle,
  };
};
