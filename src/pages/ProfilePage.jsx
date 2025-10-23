import { useEffect, useState } from "react";
import KeySettingsModal from "../components/KeySettingsModal";
import { errorMessage, successMessage } from "../utils/Toastiy";
import { ToastContainer } from "react-toastify";
import axiosClient from "../axios-client";
import { GoKey } from "react-icons/go";
import { convertToPersianDate } from "../utils/change-date";

export default function ProfilePage() {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isKeyModalOpen, setIsKeyModalOpen] = useState(false);
  const [keyModalData, setKeyModalData] = useState({
    id: "",
    moadian_username: "",
    tins: "",
    moadian_private_key: null,
    moadian_certificate: null,
  });

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const response = await axiosClient.get("/profile");
      setProfileData(response.data);
      setKeyModalData({
        id: response.data.id,
        moadian_username: response.data.moadian_username || "",
        tins: response.data.tins || "",
        moadian_private_key: null,
        moadian_certificate: null,
      });
    } catch (error) {
      console.error("Error fetching profile:", error);
      errorMessage("خطا در دریافت اطلاعات پروفایل");
    } finally {
      setLoading(false);
    }
  };

  const openKeySettings = () => {
    if (profileData) {
      setKeyModalData({
        id: profileData.id,
        moadian_username: profileData.moadian_username || "",
        tins: profileData.tins || "",
        moadian_private_key: null,
        moadian_certificate: null,
      });
      setIsKeyModalOpen(true);
    }
  };

  const closeKeySettings = () => {
    setIsKeyModalOpen(false);
  };

  const handleKeyModalTextChange = (e) => {
    const { name, value } = e.target;
    setKeyModalData((prev) => ({ ...prev, [name]: value }));
  };

  const handleKeyModalFileChange = (e) => {
    const { name, files } = e.target;
    const file = files && files[0] ? files[0] : null;
    setKeyModalData((prev) => ({ ...prev, [name]: file }));
  };

  const handleSaveKeySettings = async () => {
    const formData = new FormData();
    formData.append("id", keyModalData.id);
    formData.append("tins", keyModalData.tins);
    formData.append("moadian_username", keyModalData.moadian_username);

    if (keyModalData.moadian_private_key instanceof File) {
      formData.append("moadian_private_key", keyModalData.moadian_private_key);
    }
    if (keyModalData.moadian_certificate instanceof File) {
      formData.append("moadian_certificate", keyModalData.moadian_certificate);
    }

    try {
      const { data } = await axiosClient.put(
        `/admin/users/${keyModalData.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      successMessage("تنظیمات کلید با موفقیت ذخیره شد");
      setIsKeyModalOpen(false);
      // Refresh profile data
      fetchProfile();
    } catch (error) {
      errorMessage("خطا در ذخیره تنظیمات کلید");
      setIsKeyModalOpen(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="text-white text-xl">در حال بارگذاری...</div>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="text-white text-xl">خطا در دریافت اطلاعات</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Header */}
      <div className="w-full border-b border-white/10 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-white text-2xl font-bold">پروفایل کاربر</h1>
            <p className="text-white/60 text-sm mt-1">
              اطلاعات شخصی و تنظیمات کاربر
            </p>
          </div>
          <button
            onClick={openKeySettings}
            className="p-3 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20 hover:bg-blue-500/15 flex items-center gap-2"
          >
            <GoKey className="w-5 h-5" />
            <span className="text-sm">تنظیمات کلید</span>
          </button>
        </div>
      </div>

      {/* Profile Information */}
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-white text-xl font-semibold mb-6">
              اطلاعات شخصی
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* ID */}
              <div>
                <label className="block mb-2 text-white text-sm">
                  شناسه کاربری
                </label>
                <input
                  type="text"
                  value={profileData.id || ""}
                  readOnly
                  className="w-full rounded-xl bg-gray-800/70 text-white/90 border border-white/10 px-4 py-3 focus:outline-none cursor-not-allowed"
                />
              </div>

              {/* Name */}
              <div>
                <label className="block mb-2 text-white text-sm">نام</label>
                <input
                  type="text"
                  value={profileData.name || ""}
                  readOnly
                  className="w-full rounded-xl bg-gray-800/70 text-white/90 border border-white/10 px-4 py-3 focus:outline-none cursor-not-allowed"
                />
              </div>

              {/* Last Name */}
              <div>
                <label className="block mb-2 text-white text-sm">
                  نام خانوادگی
                </label>
                <input
                  type="text"
                  value={profileData.last_name || ""}
                  readOnly
                  className="w-full rounded-xl bg-gray-800/70 text-white/90 border border-white/10 px-4 py-3 focus:outline-none cursor-not-allowed"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block mb-2 text-white text-sm">ایمیل</label>
                <input
                  type="email"
                  value={profileData.email || ""}
                  readOnly
                  className="w-full rounded-xl bg-gray-800/70 text-white/90 border border-white/10 px-4 py-3 focus:outline-none cursor-not-allowed"
                />
              </div>

              {/* Mobile */}
              <div>
                <label className="block mb-2 text-white text-sm">
                  شماره موبایل
                </label>
                <input
                  type="text"
                  value={profileData.mobile || ""}
                  readOnly
                  className="w-full rounded-xl bg-gray-800/70 text-white/90 border border-white/10 px-4 py-3 focus:outline-none cursor-not-allowed"
                />
              </div>

              {/* TINS */}
              <div>
                <label className="block mb-2 text-white text-sm">
                  کد اقتصادی
                </label>
                <input
                  type="text"
                  value={profileData.tins || ""}
                  readOnly
                  className="w-full rounded-xl bg-gray-800/70 text-white/90 border border-white/10 px-4 py-3 focus:outline-none cursor-not-allowed"
                />
              </div>

              {/* Status */}
              <div>
                <label className="block mb-2 text-white text-sm">وضعیت</label>
                <input
                  type="text"
                  value={profileData.status_label || ""}
                  readOnly
                  className="w-full rounded-xl bg-gray-800/70 text-white/90 border border-white/10 px-4 py-3 focus:outline-none cursor-not-allowed"
                />
              </div>

              {/* Created At */}
              <div>
                <label className="block mb-2 text-white text-sm">
                  تاریخ ایجاد
                </label>
                <input
                  type="text"
                  value={convertToPersianDate(profileData.created_at) || ""}
                  readOnly
                  className="w-full rounded-xl bg-gray-800/70 text-white/90 border border-white/10 px-4 py-3 focus:outline-none cursor-not-allowed"
                />
              </div>

              {/* Updated At */}
              <div>
                <label className="block mb-2 text-white text-sm">
                  آخرین بروزرسانی
                </label>
                <input
                  type="text"
                  value={convertToPersianDate(profileData.updated_at) || ""}
                  readOnly
                  className="w-full rounded-xl bg-gray-800/70 text-white/90 border border-white/10 px-4 py-3 focus:outline-none cursor-not-allowed"
                />
              </div>

              {/* SSTIDS */}
              <div>
                <label className="block mb-2 text-white text-sm">
                  شناسه‌های SST
                </label>
                <input
                  type="text"
                  value={
                    Array.isArray(profileData.sstids)
                      ? profileData.sstids.join(", ")
                      : profileData.sstids || ""
                  }
                  readOnly
                  className="w-full rounded-xl bg-gray-800/70 text-white/90 border border-white/10 px-4 py-3 focus:outline-none cursor-not-allowed"
                />
              </div>

              {/* Postal Code */}
              <div>
                <label className="block mb-2 text-white text-sm">کد پستی</label>
                <input
                  type="text"
                  value={profileData.postal_code || ""}
                  readOnly
                  className="w-full rounded-xl bg-gray-800/70 text-white/90 border border-white/10 px-4 py-3 focus:outline-none cursor-not-allowed"
                />
              </div>

              {/* Address */}
              <div>
                <label className="block mb-2 text-white text-sm">آدرس</label>
                <input
                  type="text"
                  value={profileData.address || ""}
                  readOnly
                  className="w-full rounded-xl bg-gray-800/70 text-white/90 border border-white/10 px-4 py-3 focus:outline-none cursor-not-allowed"
                />
              </div>

              {/* Moadian Username */}
              <div>
                <label className="block mb-2 text-white text-sm">
                  نام کاربری مودیان
                </label>
                <input
                  type="text"
                  value={profileData.moadian_username || ""}
                  readOnly
                  className="w-full rounded-xl bg-gray-800/70 text-white/90 border border-white/10 px-4 py-3 focus:outline-none cursor-not-allowed"
                />
              </div>
            </div>

            {/* Roles Section */}
            {profileData.roles && profileData.roles.length > 0 && (
              <div className="mt-8">
                <h3 className="text-white text-lg font-semibold mb-4">
                  نقش‌ها
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {profileData.roles.map((role, index) => (
                    <div
                      key={index}
                      className="rounded-lg border border-white/10 bg-white/5 p-4"
                    >
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block mb-1 text-white text-sm">
                            شناسه نقش
                          </label>
                          <input
                            type="text"
                            value={role.id || ""}
                            readOnly
                            className="w-full rounded-xl bg-gray-800/70 text-white/90 border border-white/10 px-3 py-2 focus:outline-none cursor-not-allowed text-sm"
                          />
                        </div>
                        <div>
                          <label className="block mb-1 text-white text-sm">
                            نام نقش
                          </label>
                          <input
                            type="text"
                            value={role.name || ""}
                            readOnly
                            className="w-full rounded-xl bg-gray-800/70 text-white/90 border border-white/10 px-3 py-2 focus:outline-none cursor-not-allowed text-sm"
                          />
                        </div>
                        <div>
                          <label className="block mb-1 text-white text-sm">
                            نوع محافظت
                          </label>
                          <input
                            type="text"
                            value={role.guard_name || ""}
                            readOnly
                            className="w-full rounded-xl bg-gray-800/70 text-white/90 border border-white/10 px-3 py-2 focus:outline-none cursor-not-allowed text-sm"
                          />
                        </div>
                        <div>
                          <label className="block mb-1 text-white text-sm">
                            تاریخ ایجاد
                          </label>
                          <input
                            type="text"
                            value={role.created_at || ""}
                            readOnly
                            className="w-full rounded-xl bg-gray-800/70 text-white/90 border border-white/10 px-3 py-2 focus:outline-none cursor-not-allowed text-sm"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Permissions Section */}
            {profileData.permissions && profileData.permissions.length > 0 && (
              <div className="mt-8">
                <h3 className="text-white text-lg font-semibold mb-4">
                  مجوزها
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {profileData.permissions.map((permission, index) => (
                    <div
                      key={index}
                      className="rounded-lg border border-white/10 bg-white/5 p-3"
                    >
                      <input
                        type="text"
                        value={permission.name || permission}
                        readOnly
                        className="w-full rounded-xl bg-gray-800/70 text-white/90 border border-white/10 px-3 py-2 focus:outline-none cursor-not-allowed text-sm"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Key Settings Modal */}
      <KeySettingsModal
        isOpen={isKeyModalOpen}
        data={keyModalData}
        onChangeText={handleKeyModalTextChange}
        onChangeFile={handleKeyModalFileChange}
        onSave={handleSaveKeySettings}
        onClose={closeKeySettings}
      />

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={true}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}
