import { useState } from "react";

export const usePasswordVisibility = () => {
  const [visible, setVisible] = useState(false);

  const onTogglePasswordVisible = () => {
    setVisible(!visible);
  };

  return {
    visible,
    onTogglePasswordVisible,
  };
};
