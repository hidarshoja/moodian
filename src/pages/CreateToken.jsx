import { useState } from "react";
import axiosClient from "../axios-client";
import Swal from "sweetalert2";

export default function CreateToken() {
  const [message, setMessage] = useState("ایجاد توکن");
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);

  const createToken = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axiosClient.post(`/auth/tokens/create`);
      const successMessage = "  لطفا توکن را ذخیره کنید توکن با موفقیت ساخته شد";
      const newToken = res?.data?.data?.token || "";
      setMessage(successMessage);
      setToken(newToken);
      Swal.fire({
        toast: true,
        position: "top-start",
        icon: "success",
        title: successMessage,
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: true,
        customClass: {
          popup: "swal2-toast",
        },
      });
    } catch (err) {
      const errorMessage = err?.response?.data?.message || "خطا در ایجاد توکن";
      setMessage(errorMessage);
      setToken("");
      Swal.fire({
        toast: true,
        position: "top-start",
        icon: "error",
        title: errorMessage,
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: true,
        customClass: {
          popup: "swal2-toast",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!token) return;
    try {
      await navigator.clipboard.writeText(token);
      Swal.fire({
        toast: true,
        position: "top-start",
        icon: "success",
        title: "توکن کپی شد",
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true,
        customClass: { popup: "swal2-toast" },
      });
    } catch (_) {
      Swal.fire({
        toast: true,
        position: "top-start",
        icon: "error",
        title: "امکان کپی کردن وجود ندارد",
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true,
        customClass: { popup: "swal2-toast" },
      });
    }
  };

  const handleSaveToFile = () => {
    if (!token) return;
    const blob = new Blob([token], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "token.txt";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    Swal.fire({
      toast: true,
      position: "top-start",
      icon: "success",
      title: "فایل توکن ذخیره شد",
      showConfirmButton: false,
      timer: 2500,
      timerProgressBar: true,
      customClass: { popup: "swal2-toast" },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <div>
        <div className="w-full border-b border-white/10 p-6 flex items-center justify-between">
          <div>
            <h1 className="text-white text-2xl font-bold">{message}</h1>
            <p className="text-white/60 text-sm mt-1">نمای کلی ایجاد توکن</p>
          </div>
        </div>
      </div>
      <div className="w-full flex items-center justify-center p-6">
        <div className="w-full max-w-2xl bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur">
          <div className="flex flex-col gap-4">
            <input
              type="text"
              className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-white/40 border border-white/10 focus:outline-none"
              placeholder="توکن شما اینجا نمایش داده می‌شود"
              value={token}
              disabled
              readOnly
            />
            <div className="flex flex-wrap items-center gap-3 justify-center">
              <button
                onClick={createToken}
                disabled={loading}
                className="px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white disabled:opacity-60"
              >
                {loading ? "در حال ایجاد..." : "ارسال درخواست توکن"}
              </button>
              {token ? (
                <>
                  <button
                    onClick={handleCopy}
                    className="px-4 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white"
                  >
                    کپی توکن
                  </button>
                  <button
                    onClick={handleSaveToFile}
                    className="px-4 py-3 rounded-lg bg-sky-600 hover:bg-sky-500 text-white"
                  >
                   به صورت فایل  ذخیره توکن(txt)
                  </button>
                </>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
