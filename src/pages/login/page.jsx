import  { createRef, useEffect, useState } from 'react';
import { Link,  useNavigate } from 'react-router-dom';
import axiosClient from '../../axios-client';
import { errorMessage, successMessage } from '../../utils/Toastiy';
import { ToastContainer } from 'react-toastify';


export default function Login() {
  const [isLoading, setIsLoading] = useState(false)
  const phoneRef = createRef()
  const passwordRef = createRef()
  const rememberRef = createRef()
  const [timer, setTimer] = useState(0);
  const navigation = useNavigate();


  useEffect(() => {
    const storedStartTime = localStorage.getItem("startTime");
   
   const currentTime = Math.floor(Date.now() / 1000);
   const elapsedTime = currentTime - parseInt(storedStartTime, 10);
   if (elapsedTime < 60) {
     setTimer(60 - elapsedTime);
   }
 }, []);

 useEffect(() => {
   if (timer > 0) {
     const interval = setInterval(() => {
       setTimer((prevTimer) => prevTimer - 1);
     }, 1000);
     return () => clearInterval(interval);
   }
 }, [timer]);

  useEffect(() => {
    const token = localStorage.getItem('ACCESS_TOKEN')
    if (token) {
     navigation('/')
    }
  }, [])


  const handleLogin = async (e) => {
    // setTimer(60);
    const startTime = Math.floor(Date.now() / 1000);
    localStorage.setItem("startTime", startTime.toString());
    setTimer(60);
    e.preventDefault()
    setIsLoading(true)

    try {
      const payload = {
        mobile: phoneRef.current.value,
        password: passwordRef.current.value,
      }

      if (payload.mobile.length != 10) {
        errorMessage('شماره موبایل ده رقمی  را وارد کنید')
        return
      }
      const response = await axiosClient.post('/send-otp', {mobile : payload.mobile , password : payload.password})
      

      successMessage('کد 5 رقمی برای شما ارسال شد')
     
  
      setTimeout(()=>{
        setIsLoading(false)
        navigation('/auth/otp',{state: payload})
      },3100)

    } catch (error) {
      console.error(error);
      setIsLoading(false);
      if (error.response.status === 404) {
        errorMessage('کاربری یافت نشد')
      }
     
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
              <form onSubmit={handleLogin}  className="space-y-6">
              <div>
                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-color2">
                    شماره موبایل (بدون صفر)
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="phone"
                      type="number"
                      dir='ltr'
                      ref={phoneRef}
                      required
                      className="block w-full rounded-md border-0 pl-3 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                      dir='ltr'
                      autoComplete="current-password"
                      ref={passwordRef}
                      required
                      className="block w-full rounded-md border-0 py-1.5 pl-3 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      ref={rememberRef}
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
                     type="submit"
                    className={`flex w-full justify-center rounded-lg bg-green-600 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-md hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 transition-all duration-200${
                      timer > 0 ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    ورود
                    {timer > 0 && ` (${timer}s)`}
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
  );
}
