import axios from "axios";

const getEndpoint = () => {
  return import.meta.env.VITE_API_URL;
};

const instance = axios.create({
  baseURL: getEndpoint(),
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    config.headers = config.headers ?? {};
    const accessToken = localStorage.getItem("accessToken") ?? "";
    config.headers.Authorization = `Bearer ${accessToken}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
