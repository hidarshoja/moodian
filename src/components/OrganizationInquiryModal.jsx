import { useState } from "react";
import { GrClose } from "react-icons/gr";
import { CiSearch } from "react-icons/ci";
import PropTypes from "prop-types";

export default function OrganizationInquiryModal({
  isOpen,
  onClose,
  onSelectCustomer,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    economic_identifier: "",
    national_code: "",
    status: "",
  });

  if (!isOpen) return null;

  const handleSearch = () => {
    // TODO: Implement search functionality
    console.log("Searching for:", searchTerm);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="relative">
            <input
              type="text"
              placeholder="جستجو..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl bg-gray-800/70 text-white/90 border border-white/10 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/20"
              dir="rtl"
            />
            <button
              onClick={handleSearch}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <CiSearch className="w-5 h-5" />
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
                onChange={handleInputChange}
                className="w-full rounded-xl bg-gray-800/70 text-white/90 border border-white/10 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/20"
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
                onChange={handleInputChange}
                className="w-full rounded-xl bg-gray-800/70 text-white/90 border border-white/10 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/20"
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
                onChange={handleInputChange}
                maxLength={10}
                className="w-full rounded-xl bg-gray-800/70 text-white/90 border border-white/10 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/20"
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
                onChange={handleInputChange}
                className="w-full rounded-xl bg-gray-800/70 text-white/90 border border-white/10 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/20"
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
          <button
            onClick={handleSelect}
            className="btn-custom4"
          >
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
