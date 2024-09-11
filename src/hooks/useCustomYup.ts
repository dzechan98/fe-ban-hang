import * as yup from "yup";

export const useCustomYup = () => {
  yup.setLocale({
    mixed: {
      default: "Trường này không hợp lệ",
      required: "Trường này là bắt buộc",
    },
    string: {
      email: "Email không hợp lệ",
      max: "Trường này phải có tối đa ${max} ký tự",
      min: "Trường này phải có ít nhất ${min} ký tự",
    },
  });
};
