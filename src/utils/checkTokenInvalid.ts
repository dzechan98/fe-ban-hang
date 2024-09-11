import { jwtDecode } from "jwt-decode";

export const checkTokenInvalid = (token: string) => {
  const decodedToken = jwtDecode(token);
  const currentTime = Date.now() / 1000;
  return Number(decodedToken.exp) >= currentTime;
};
