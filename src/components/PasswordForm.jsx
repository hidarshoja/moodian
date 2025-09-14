import { useState } from "react";
import { FaEye, FaEyeSlash, FaLock, FaUser, FaShieldAlt } from "react-icons/fa";

export default function PasswordForm({ onSubmit, onCancel }) {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    reason: "",
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!form.currentPassword) {
      newErrors.currentPassword = "رمز عبور فعلی الزامی است";
    }

    if (!form.newPassword) {
      newErrors.newPassword = "رمز عبور جدید الزامی است";
    } else if (form.newPassword.length < 8) {
      newErrors.newPassword = "رمز عبور باید حداقل 8 کاراکتر باشد";
    }

    if (!form.confirmPassword) {
      newErrors.confirmPassword = "تکرار رمز عبور الزامی است";
    } else if (form.newPassword !== form.confirmPassword) {
      newErrors.confirmPassword = "رمز عبور و تکرار آن مطابقت ندارند";
    }

    if (!form.reason) {
      newErrors.reason = "دلیل تغییر رمز عبور الزامی است";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(form);
    }
  };

  const passwordReasons = [
    "تغییر دوره‌ای رمز عبور",
    "فراموشی رمز عبور",
    "امنیت حساب کاربری",
    "درخواست مدیر سیستم",
    "سایر موارد",
  ];

  return (
    <div className="w-full rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl transition-all p-6">
      <div className="flex items-center gap-3 mb-6">
        <FaShieldAlt className="text-blue-400 w-6 h-6" />
        <h2 className="text-white text-xl font-bold">تغییر رمز عبور</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col lg:flex-row gap-2">
          {/* Current Password */}
        <div className="w-full lg:w-1/2">
          <label className="block mb-2 text-white text-sm font-medium">
            رمز عبور فعلی
          </label>
          <div className="relative">
            <input
              type={showPasswords.current ? "text" : "password"}
              name="currentPassword"
              value={form.currentPassword}
              onChange={handleChange}
              className={`w-full rounded-xl bg-gray-800/70 text-white/90 border px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-white/20 ${
                errors.currentPassword ? "border-red-500" : "border-white/10"
              }`}
              placeholder="رمز عبور فعلی خود را وارد کنید"
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility("current")}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white transition-colors"
            >
              {showPasswords.current ? (
                <FaEyeSlash className="w-5 h-5" />
              ) : (
                <FaEye className="w-5 h-5" />
              )}
            </button>
          </div>
          {errors.currentPassword && (
            <p className="text-red-400 text-xs mt-1">
              {errors.currentPassword}
            </p>
          )}
        </div>

        {/* New Password */}
        <div className="w-full lg:w-1/2">
          <label className="block mb-2 text-white text-sm font-medium">
            رمز عبور جدید
          </label>
          <div className="relative">
            <input
              type={showPasswords.new ? "text" : "password"}
              name="newPassword"
              value={form.newPassword}
              onChange={handleChange}
              className={`w-full rounded-xl bg-gray-800/70 text-white/90 border px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-white/20 ${
                errors.newPassword ? "border-red-500" : "border-white/10"
              }`}
              placeholder="رمز عبور جدید خود را وارد کنید"
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility("new")}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white transition-colors"
            >
              {showPasswords.new ? (
                <FaEyeSlash className="w-5 h-5" />
              ) : (
                <FaEye className="w-5 h-5" />
              )}
            </button>
          </div>
          {errors.newPassword && (
            <p className="text-red-400 text-xs mt-1">{errors.newPassword}</p>
          )}
        </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-2">
        {/* Confirm Password */}
        <div className="w-full lg:w-1/2">
          <label className="block mb-2 text-white text-sm font-medium">
            تکرار رمز عبور جدید
          </label>
          <div className="relative">
            <input
              type={showPasswords.confirm ? "text" : "password"}
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              className={`w-full rounded-xl bg-gray-800/70 text-white/90 border px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-white/20 ${
                errors.confirmPassword ? "border-red-500" : "border-white/10"
              }`}
              placeholder="رمز عبور جدید را مجدداً وارد کنید"
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility("confirm")}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white transition-colors"
            >
              {showPasswords.confirm ? (
                <FaEyeSlash className="w-5 h-5" />
              ) : (
                <FaEye className="w-5 h-5" />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-red-400 text-xs mt-1">
              {errors.confirmPassword}
            </p>
          )}
        </div>

        {/* Reason */}
        <div className="w-full lg:w-1/2">
          <label className="block mb-2 text-white text-sm font-medium">
            دلیل تغییر رمز عبور
          </label>
          <select
            name="reason"
            value={form.reason}
            onChange={handleChange}
            className={`w-full rounded-xl bg-gray-800/70 text-white/90 border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/20 ${
              errors.reason ? "border-red-500" : "border-white/10"
            }`}
          >
            <option value="" className="bg-gray-800 text-white">
              انتخاب دلیل تغییر رمز عبور
            </option>
            {passwordReasons.map((reason) => (
              <option
                key={reason}
                value={reason}
                className="bg-gray-800 text-white"
              >
                {reason}
              </option>
            ))}
          </select>
          {errors.reason && (
            <p className="text-red-400 text-xs mt-1">{errors.reason}</p>
          )}
        </div>

        </div>

        {/* Password Requirements */}
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
          <h4 className="text-blue-400 text-sm font-medium mb-2">
            الزامات رمز عبور:
          </h4>
          <ul className="text-white/70 text-xs space-y-1">
            <li>• حداقل 8 کاراکتر</li>
            <li>• شامل حروف بزرگ و کوچک</li>
            <li>• شامل اعداد</li>
            <li>• شامل کاراکترهای خاص (!@#$%^&*)</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 rounded-xl border border-white/10 text-white/80 bg-purple-700 hover:bg-purple-800 transition-all"
          >
            انصراف
          </button>
          <button type="submit" className="btn-custom">
            تغییر رمز عبور
          </button>
        </div>
      </form>
    </div>
  );
}
