import axios from "axios";

export const getError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const message = error.response?.data.message;
    return message;
  }

  return "Đã có lỗi xảy ra";
};
