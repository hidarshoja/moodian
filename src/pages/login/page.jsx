

import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { changeId } from "../../features/user/userSlice";


export default function Login() {

   const user_id = useSelector(state => state.user.id)
   const dispatch = useDispatch()

   const handleLoginAndChangeId = () => {
    
    dispatch(changeId(20));
    handleLogin();
  };

  const handleLogin = async () => {
    try {
      
      const emailInput = document.getElementById('email');
      const passwordInput = document.getElementById('password');
      const rememberMeCheckbox = document.getElementById('remember-me');

      const emailValue = emailInput.value;
      const passwordValue = passwordInput.value;
      const rememberMeValue = rememberMeCheckbox.checked;

      const postData = {
        email: emailValue,
        password: passwordValue,
        rememberMe: rememberMeValue,
       
      };

    
      const response = await axios.post('https://jsonplaceholder.typicode.com/posts', postData);

   
      console.log('Response from server:', response.data);
    } catch (error) {
      
      console.error('Error:', error);
    }
  };

  return (
   
       <div className="flex min-h-full flex-1 w-full h-screen">
        <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24 w-1/2" dir='rtl'>
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div className='w-full flex flex-col items-center justify-center'>
             
              <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-color2">
              به حساب خود وارد شوید
              </h2>
              <p className="mt-2 text-sm leading-6 text-color2">
                ثبت نام نکرده اید؟
                <Link to="/auth/register" className="font-semibold text-color4 hover:text-indigo-500">
                یک دوره آزمایشی رایگان 14 روزه را شروع کنید
                </Link>
              </p>
            </div>

            <div className="mt-10">
              <div>
                <form action="#" method="POST" className="space-y-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-color2">
                      ایمیل
                    </label>
                    <div className="mt-2">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        dir='ltr'
                        autoComplete="email"
                        required
                        className="block w-full rounded-md border-0 pl-3 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-color2">
                     پسورد
                    </label>
                    <div className="mt-2">
                      <input
                        id="password"
                        name="password"
                        type="password"
                        dir='ltr'
                        autoComplete="current-password"
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
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <label htmlFor="remember-me" className="mr-3 block text-sm leading-6 text-color2">
                        مرا به خاطر بسپار
                      </label>
                    </div>

                    <div className="text-sm leading-6">
                      <Link to="/" className="font-semibold text-color2 hover:text-indigo-500">
                        رمز عبور خود را فراموش کرده اید؟
                      </Link>
                    </div>
                  </div>

                  <div>
                    <button
                      type="button"
                      // onClick={handleLogin}
                      onClick={handleLoginAndChangeId}
                      className="flex w-full justify-center rounded-md bg-color2 px-3 py-1.5 text-sm font-semibold leading-6 text-color3 shadow-sm hover:bg-yellow-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      ورود
                    </button>
                     {/* <button onClick={()=>dispatch(changeId(20))}>change</button> */}
        {/* {user_id} */}
                  </div>
                </form>
              </div>

              <div className="mt-10">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="w-full border-t border-gray-200" />
                  </div>
                  <div className="relative flex justify-center text-sm font-medium leading-6">
                    <span className="bg-white px-6 text-gray-900"></span>
                  </div>
                </div>

              
              </div>
            </div>
          </div>
        </div>
        <div className="relative hidden  flex-1 lg:block w-1/2 bg-white">
          <div className='w-[70%] flex items-center justify-center'>
          <img
            className="absolute left-1/4 inset-0 h-full   w-[70%]"
            src="/img/login.svg"
            alt=""
          />
          </div>
        </div>
      </div>
    
  )
}
