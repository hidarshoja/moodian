import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { changeId } from "../../features/user/userSlice";

export default function Login() {
  const user_id = useSelector((state) => state.user.id);
  const dispatch = useDispatch();

  const handleLoginAndChangeId = () => {
    dispatch(changeId(20));
    handleLogin();
  };

  const handleLogin = async () => {
    try {
      const emailInput = document.getElementById("email");
      const passwordInput = document.getElementById("password");
      const rememberMeCheckbox = document.getElementById("remember-me");

      const emailValue = emailInput.value;
      const passwordValue = passwordInput.value;
      const rememberMeValue = rememberMeCheckbox.checked;

      const postData = {
        email: emailValue,
        password: passwordValue,
        rememberMe: rememberMeValue,
      };

      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/posts",
        postData
      );

      console.log("Response from server:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex min-h-full flex-1 w-full h-screen bg-gradient-to-tr from-green-100 via-white to-green-50">
      <div
        className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24 w-full max-w-2xl mx-auto"
        dir="rtl"
      >
        <div className="mx-auto w-full max-w-md lg:w-[520px] bg-white/90 rounded-2xl shadow-2xl p-3 border border-green-100">
          <div className="w-full flex flex-col items-center justify-center">
            <h2 className="mt-4 text-3xl font-extrabold leading-9 tracking-tight text-green-700 drop-shadow-sm">
              به حساب خود وارد شوید
            </h2>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              ثبت نام نکرده اید؟
              <Link
                to="/auth/register"
                className="font-semibold text-green-600 hover:text-green-800 transition-colors mr-1"
              >
                ثبت نام کنید
              </Link>
            </p>
          </div>

          <div className="mt-10">
            <div>
              <form action="#" method="POST" className="space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-green-700"
                  >
                    ایمیل
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      dir="ltr"
                      autoComplete="email"
                      required
                      className="block w-full rounded-lg border-0 pl-3 py-2 shadow-sm ring-1 ring-inset ring-green-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-400 sm:text-sm sm:leading-6 bg-green-50/50"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-green-700"
                  >
                    پسورد
                  </label>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      dir="ltr"
                      autoComplete="current-password"
                      required
                      className="block w-full rounded-lg border-0 py-2 pl-3 shadow-sm ring-1 ring-inset ring-green-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-400 sm:text-sm sm:leading-6 bg-green-50/50"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 rounded border-green-300 text-green-600 focus:ring-green-500"
                    />
                    <label
                      htmlFor="remember-me"
                      className="mr-3 block text-sm leading-6 text-green-700"
                    >
                      مرا به خاطر بسپار
                    </label>
                  </div>

                  <div className="text-sm leading-6">
                    <Link
                      to="/"
                      className="font-semibold text-green-600 hover:text-green-800 transition-colors"
                    >
                      رمز عبور خود را فراموش کرده اید؟
                    </Link>
                  </div>
                </div>

                <div>
                  <button
                    type="button"
                    onClick={handleLoginAndChangeId}
                    className="flex w-full justify-center rounded-lg bg-green-600 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-md hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 transition-all duration-200"
                  >
                    ورود
                  </button>
                </div>
              </form>
            </div>

            <div className="mt-10">
              <div className="relative">
                <div
                  className="absolute inset-0 flex items-center"
                  aria-hidden="true"
                >
                  <div className="w-full border-t border-green-200" />
                </div>
                <div className="relative flex justify-center text-sm font-medium leading-6">
                  <span className="bg-white px-6 text-green-700"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative hidden lg:block w-1/2 bg-gradient-to-tr from-green-200 via-white to-green-100">
        <div className="w-[70%] flex items-center justify-center h-full">
          <img
            className="absolute left-1/4 inset-0 h-full w-[100%] object-cover rounded-l-2xl shadow-xl"
            src="/login.jpg"
            alt="صفحه ورود"
          />
        </div>
      </div>
    </div>
  );
}
