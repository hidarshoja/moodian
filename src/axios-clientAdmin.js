import axios from "axios";
import { navigate } from "./utils/navigation";

const axiosClientAdmin = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api/v1/admin`,
});

axiosClientAdmin.interceptors.request.use((config) => {
  const token = localStorage.getItem("ACCESS_TOKEN");
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axiosClientAdmin.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { response } = error;
    if (response.status === 401) {
      localStorage.removeItem("ACCESS_TOKEN");
      navigate("/auth/login");
    } else if (response.status === 404) {
      //Show not found
    } else if (response.status === 403) {
      localStorage.removeItem("ACCESS_TOKEN");
      navigate("/auth/login");
    }

    throw error;
  }
);

export default axiosClientAdmin;
