import { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function LogoDescriptionModal({ isOpen, onClose }) {
  const [description, setDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState("/img/ice-logo.svg"); // Default logo

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setLogoPreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    // Handle save functionality
    console.log("Description:", description);
    console.log("Selected file:", selectedFile);
    // Add your save logic here
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="w-full max-w-md rounded-2xl bg-[#23234a] border border-white/10 shadow-2xl overflow-hidden relative animate-slideIn">
        {/* Header */}
        <div className="bg-[#0a0a22] text-white px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <div className="flex items-center justify-between w-full">
            <h2 className="text-white text-lg font-semibold">
              لوگوی شرکت و توضیح ثابت داخل فاکتور فروش
            </h2>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-300 transition-colors"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           {/* Right Section - Logo */}
           <div className="flex flex-col items-center">
           <label className="block text-sm font-medium text-gray-100 mb-2">
                فرمت png و کمتر از 10 کیلوبایت
              </label>
              <div className="mb-4">
                <img
                  src={logoPreview}
                  alt="Company Logo"
                  className="w-32 h-32 object-contain bg-gray-400 rounded-lg border border-gray-300"
                />
              </div>
              <label className="cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <div className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors">
                  انتخاب فایل
                </div>
              </label>
            </div>
            {/* Left Section - Description */}
            <div>
              <label className="block text-sm font-medium text-gray-100 mb-2">
                توضیحات
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full h-32 px-3 py-2 border bg-gray-400 text-white border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="توضیحات خود را وارد کنید..."
              />
            </div>

            
          </div>
        </div>

        {/* Footer */}
        <div className=" px-6 py-4 rounded-b-lg flex justify-end gap-3">
          <button
            onClick={handleCancel}
            className="px-6 py-2 w-1/2 bg-red-500 text-gray-100 rounded-md hover:bg-red-700 transition-colors"
          >
            انصراف
          </button>
          <button
            onClick={handleSave}
            className="btn-custom4"
          >
            ذخیره
          </button>
        </div>
      </div>
    </div>
  );
}
