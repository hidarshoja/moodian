import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function RegisterPage() {
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Error state
  const [errors, setErrors] = useState({});

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // Validate password
  const validatePassword = (password) => {
    if (password.length < 8) {
      return "رمز عبور باید حداقل 8 کاراکتر باشد";
    }
    if (!/[a-zA-Z]/.test(password)) {
      return "رمز عبور باید شامل حروف باشد";
    }
    return "";
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    // First name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = "نام الزامی است";
    }

    // Last name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = "نام خانوادگی الزامی است";
    }

    // Mobile validation
    if (!formData.mobile.trim()) {
      newErrors.mobile = "شماره موبایل الزامی است";
    } else if (!/^09\d{9}$/.test(formData.mobile)) {
      newErrors.mobile = "شماره موبایل باید با 09 شروع شود و 11 رقم باشد";
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "ایمیل الزامی است";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "فرمت ایمیل صحیح نیست";
    }

    // Password validation
    const passwordError = validatePassword(formData.password);
    if (passwordError) {
      newErrors.password = passwordError;
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "تکرار رمز عبور الزامی است";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "رمز عبور و تکرار آن مطابقت ندارند";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const postData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        mobile: formData.mobile,
        email: formData.email,
        password: formData.password,
      };

      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/posts",
        postData
      );

      console.log("Registration response:", response.data);

   
      console.log("Registration data saved to localStorage");

      // Navigate to login page after successful registration
      navigate("/auth/login");
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <div className="flex min-h-full flex-1 w-full h-screen bg-gradient-to-tr from-green-100 via-white to-green-50">
      <div
        className="flex flex-1 flex-col justify-center px-4 py-8 sm:px-6 lg:flex-none lg:px-20  w-full max-w-2xl mx-auto"
        dir="rtl"
      >
        <div className="mx-auto w-full  lg:w-[580px]  bg-white/90 rounded-2xl shadow-2xl p-6 border border-green-100">
          <div className="w-full flex flex-col items-center justify-center">
            <h2 className="mt-4 text-3xl font-extrabold leading-9 tracking-tight text-green-700 drop-shadow-sm">
              ثبت نام
            </h2>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              قبلاً ثبت نام کرده اید؟
              <Link
                to="/auth/login"
                className="font-semibold text-green-600 hover:text-green-800 transition-colors mr-1"
              >
                وارد شوید
              </Link>
            </p>
          </div>

          <div className="mt-8">
            <div>
              <form onSubmit={handleRegister} className="space-y-4">
              <div className="flex w-full gap-1">
                  {/* First Name */}
                  <div className="w-1/2">
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium leading-6 text-green-700"
                  >
                    نام
                  </label>
                  <div className="mt-1">
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className={`block w-full rounded-lg border-0 py-2 px-3 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 bg-green-50/50 ${
                        errors.firstName
                          ? "ring-red-300 focus:ring-red-500"
                          : "ring-green-200 focus:ring-green-400"
                      }`}
                      placeholder="نام خود را وارد کنید"
                    />
                    {errors.firstName && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.firstName}
                      </p>
                    )}
                  </div>
                </div>

                {/* Last Name */}
                <div className="w-1/2">
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium leading-6 text-green-700"
                  >
                    نام خانوادگی
                  </label>
                  <div className="mt-1">
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className={`block w-full rounded-lg border-0 py-2 px-3 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 bg-green-50/50 ${
                        errors.lastName
                          ? "ring-red-300 focus:ring-red-500"
                          : "ring-green-200 focus:ring-green-400"
                      }`}
                      placeholder="نام خانوادگی خود را وارد کنید"
                    />
                    {errors.lastName && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.lastName}
                      </p>
                    )}
                  </div>
                </div>

              </div>
              <div className="w-full flex gap-1"> 
                {/* Mobile */}
                <div className="w-1/2">
                  <label
                    htmlFor="mobile"
                    className="block text-sm font-medium leading-6 text-green-700"
                  >
                    شماره موبایل
                  </label>
                  <div className="mt-1">
                    <input
                      id="mobile"
                      name="mobile"
                      type="tel"
                      value={formData.mobile}
                      onChange={handleInputChange}
                      required
                      className={`block w-full rounded-lg border-0 py-2 px-3 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 bg-green-50/50 ${
                        errors.mobile
                          ? "ring-red-300 focus:ring-red-500"
                          : "ring-green-200 focus:ring-green-400"
                      }`}
                      placeholder="09123456789"
                    />
                    {errors.mobile && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.mobile}
                      </p>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div className="w-1/2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-green-700"
                  >
                    ایمیل
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      dir="ltr"
                      autoComplete="email"
                      required
                      className={`block w-full rounded-lg border-0 py-2 px-3 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 bg-green-50/50 ${
                        errors.email
                          ? "ring-red-300 focus:ring-red-500"
                          : "ring-green-200 focus:ring-green-400"
                      }`}
                      placeholder="example@email.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>
              </div>
                

                {/* Password */}
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-green-700"
                  >
                    رمز عبور
                  </label>
                  <div className="mt-1">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      dir="ltr"
                      autoComplete="new-password"
                      required
                      className={`block w-full rounded-lg border-0 py-2 px-3 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 bg-green-50/50 ${
                        errors.password
                          ? "ring-red-300 focus:ring-red-500"
                          : "ring-green-200 focus:ring-green-400"
                      }`}
                      placeholder="حداقل 8 کاراکتر با حروف"
                    />
                    {errors.password && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.password}
                      </p>
                    )}
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium leading-6 text-green-700"
                  >
                    تکرار رمز عبور
                  </label>
                  <div className="mt-1">
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      dir="ltr"
                      autoComplete="new-password"
                      required
                      className={`block w-full rounded-lg border-0 py-2 px-3 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 bg-green-50/50 ${
                        errors.confirmPassword
                          ? "ring-red-300 focus:ring-red-500"
                          : "ring-green-200 focus:ring-green-400"
                      }`}
                      placeholder="رمز عبور را مجدداً وارد کنید"
                    />
                    {errors.confirmPassword && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-lg bg-green-600 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-md hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 transition-all duration-200"
                  >
                    ثبت نام
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
            src="/register.jpg"
            alt="صفحه ثبت نام"
          />
        </div>
      </div>
    </div>
  );
}
