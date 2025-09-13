import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const showSuccessToast = (message) => {
  toast.success(message, {
    position: "top-left",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    style: { direction: "rtl" },
    bodyStyle: { direction: "rtl" },
  });
};

export const showErrorToast = (message) => {
  toast.error(message, {
    position: "top-left",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    style: { direction: "rtl" },
    bodyStyle: { direction: "rtl" },
  });
};

export const showWarningToast = (message) => {
  toast.warn(message, {
    position: "top-left",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    style: { direction: "rtl" },
    bodyStyle: { direction: "rtl" },
  });
};

export const CustomToastContainer = () => (
  <ToastContainer rtl position="top-left" />
);
