import { useState } from "react";
import { GrClose } from "react-icons/gr";
import { CiSearch } from "react-icons/ci";
import PropTypes from "prop-types";
import axiosClient from "../axios-client";
import Swal from "sweetalert2";

export default function OrganizationInquiryModal({
  isOpen,
  onClose,
  onSelectCustomer,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchCompleted, setIsSearchCompleted] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    economic_identifier: "",
    national_code: "",
    status: "",
  });

  if (!isOpen) return null;

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      Swal.fire({
        title: "خطا",
        text: "لطفاً شناسه اقتصادی را وارد کنید",
        icon: "error",
        confirmButtonText: "باشه",
      });
      return;
    }

    setIsSearching(true);
    try {
      const response = await axiosClient.get(
        `/tax/economic-code-information?economic_code=${searchTerm.trim()}`
      );

      if (response.data.message === "موفقیت آمیز") {
        // Show success message
        await Swal.fire({
          title: "موفقیت",
          text: "درخواست با موفقیت انجام شد",
          icon: "success",
          confirmButtonText: "باشه",
        });

        // Auto-fill form with response data
        setFormData({
          name: response.data.data.nameTrade,
          economic_identifier: searchTerm.trim(),
          national_code: response.data.data.nationalId,
          status: response.data.data.taxpayerStatus,
        });

        // Mark search as completed to disable inputs
        setIsSearchCompleted(true);
      }
    } catch (error) {
      console.error("Search error:", error);
      Swal.fire({
        title: "خطا",
        text: "کد اقتصادی یافت نشد",
        icon: "error",
        confirmButtonText: "باشه",
      });
    } finally {
      setIsSearching(false);
    }
  };

  const handleSelect = () => {
    // Log the form data
    console.log("Selected customer data:", formData);

    // Call the callback function if provided
    if (onSelectCustomer) {
      onSelectCustomer(formData);
    }

    // Reset form and close modal
    setFormData({
      name: "",
      economic_identifier: "",
      national_code: "",
      status: "",
    });
    setSearchTerm("");
    setIsSearchCompleted(false);
    onClose();
  };

  const handleCancel = () => {
    // Reset form and close modal
    setFormData({
      name: "",
      economic_identifier: "",
      national_code: "",
      status: "",
    });
    setSearchTerm("");
    setIsSearchCompleted(false);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center  backdrop-blur animate-fadeInStagger"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-[#23234a] rounded-2xl shadow-2xl relative animate-slideIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#1A2035] text-white px-6 py-4 rounded-t-2xl flex items-center justify-between">
          <h2 className="text-lg font-bold">مشتری جدید</h2>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white text-xl"
          >
            <GrClose />
          </button>
        </div>

        {/* Search Section */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-center gap-2">
          <div className="w-5/6">
            <input
              type="text"
              placeholder="شناسه اقتصادی را وارد کنید و دکمه جستجو را کلیک کنید..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              disabled={isSearchCompleted}
              className="w-full rounded-xl bg-gray-800/70 text-white/90 border border-white/10 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
              dir="rtl"
            />
           
          </div>
          <div className="w-1/6">
            
          <button
              onClick={handleSearch}
              disabled={isSearching || isSearchCompleted}
              className="btn-custom6"
            >
              <CiSearch className="w-6 h-6  text-white hover:text-green-600" />
            </button>
          </div>
        </div>

        {/* Form Fields */}
        <div className="px-6 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* نام (Name) */}
            <div>
              <label className="block mb-2 text-gray-100 text-sm font-medium">
                نام
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                disabled={true} 
                className="w-full rounded-xl bg-gray-800/70 text-white/90 border border-white/10 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
                dir="rtl"
              />
            </div>

            {/* شناسه اقتصادی (Economic Identifier) */}
            <div>
              <label className="block mb-2 text-gray-100 text-sm font-medium">
                شناسه اقتصادی
              </label>
              <input
                type="text"
                name="economic_identifier"
                value={formData.economic_identifier}
                disabled={true} 
                className="w-full rounded-xl bg-gray-800/70 text-white/90 border border-white/10 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
                dir="rtl"
              />
            </div>

            {/* کد ملی (National Code) */}
            <div>
              <label className="block mb-2 text-gray-100 text-sm font-medium">
                کد ملی
              </label>
              <input
                type="text"
                name="national_code"
                value={formData.national_code}
                disabled={true} 
                className="w-full rounded-xl bg-gray-800/70 text-white/90 border border-white/10 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
                dir="rtl"
              />
            </div>

            {/* وضعیت (Status) */}
            <div>
              <label className="block mb-2 text-gray-100 text-sm font-medium">
                وضعیت
              </label>
              <input
                type="text"
                name="status"
                value={formData.status}
                disabled={true} 
                className="w-full rounded-xl bg-gray-800/70 text-white/90 border border-white/10 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
                dir="rtl"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="px-6 py-4 border-t border-gray-200 flex justify-center gap-4">
          <button
            onClick={handleCancel}
            className="px-8 py-3 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors w-1/2"
          >
            انصراف
          </button>
          <button onClick={handleSelect} className="btn-custom4">
            انتخاب
          </button>
        </div>
      </div>
    </div>
  );
}

OrganizationInquiryModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSelectCustomer: PropTypes.func,
};
