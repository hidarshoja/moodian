import axios from "axios";
import { navigate } from "./utils/navigation";
import Swal from "sweetalert2";

const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api/v1`,
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("ACCESS_TOKEN");
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axiosClient.interceptors.response.use(
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
      Swal.fire({
        toast: true,
        position: "top-start",
        icon: "error",
        title: "عدم دسترسی",
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: true,
      });
    }

    throw error;
  }
);

export default axiosClient;
