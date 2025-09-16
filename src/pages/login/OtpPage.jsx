import { createRef, useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { errorMessage, successMessage } from "../../utils/Toastiy";
import { ToastContainer } from "react-toastify";
import { addUser } from "../../features/user/userSlice";

export default function OtpPage() {
  const otpRef = createRef();
  const [isLoading, setIsLoading] = useState(false);

  const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!state) {
      navigate("/login");
      return;
    }
  }, [state, navigate]);

  const handleOtp = async (e) => {
    e.preventDefault();
    const payload = {
      mobile: +state.mobile,
      password: +state.password,
      otp: +otpRef.current.value,
    };
    setIsLoading(true);
    try {
      const response = await axios.post(
        "https://pars-hesabdar.liara.run/api/v1/auth/login",
        payload
      );
      // Save token and user, then navigate
      dispatch(addUser(response.data.data.user));
      localStorage.setItem("USER", JSON.stringify(response.data.data.user));
      localStorage.setItem("ACCESS_TOKEN", response.data.data.token);
      successMessage(response.data.message);
      navigate("/");
    } catch (error) {
      console.log(error);
      if (error.response.status === 422) {
        errorMessage("کد ورود اشتباه است");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="rounded-lg w-[320px] md:w-[500px] mx-auto mt-10 py-10 bg-gray-300 px-6 shadow-2xl">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-52 w-auto"
              src="/img/otp.svg"
              alt="Your Company"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              خوش آمدید کد تایید را وارد کنید
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={handleOtp}>
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="otp"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    کد تایید
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="otp"
                    name="otp"
                    type="text"
                    dir="ltr"
                    required
                    ref={otpRef}
                    className="block w-full rounded-md border-0 py-2 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm  leading-6 text-white shadow-sm hover:bg-green-500 disabled:bg-green-300"
                  disabled={isLoading}
                >
                  {isLoading ? "در حال ارسال ..." : " تایید کد"}
                </button>
              </div>
            </form>
          </div>
        </div>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>
    </>
  );
}
