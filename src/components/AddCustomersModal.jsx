import { useState } from "react";
import { GrClose } from "react-icons/gr";
import axiosClient from "../axios-client";
import Swal from "sweetalert2";
import { CiSearch } from "react-icons/ci";
import OrganizationInquiryModal from "./OrganizationInquiryModal";
import PropTypes from "prop-types";

const units = [
  { id: 0, name: "انتخاب ..." },
  { id: 1, name: "حقیقی" },
  { id: 2, name: "حقوقی" },
  { id: 3, name: "مشارکت مدنی" },
  { id: 4, name: "اتباع غیر ایرانی" },
];

export default function AddCustomersModal({
  isOpen,
  onClose,
  setRefresh,
  refresh,
}) {
  const [form, setForm] = useState({
    name: "",
    economic_code: "",
    postal_code: "",
    type: null,
    national_code: "",
    tel: "",
    branch_code: "",
    address: "",
    description: "",
    passport_number: "",
    last_name: "",
  });
  const [errors, setErrors] = useState({});
  const [orgInquiryModalOpen, setOrgInquiryModalOpen] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;
    let newErrors = { ...errors };

    if (name === "national_code") {
      if (newValue.length > 10) newValue = newValue.slice(0, 10);
      if (newValue.length > 0 && newValue.length < 10) {
        newErrors.national_code = "کد ملی باید ۱۰ رقم باشد";
      } else {
        delete newErrors.national_code;
      }
    }
    if (name === "branch_code") {
      if (newValue.length > 4) newValue = newValue.slice(0, 4);
      if (newValue.length > 0 && newValue.length < 4) {
        newErrors.branch_code = "کد مشتری باید ۴ رقم باشد";
      } else {
        delete newErrors.branch_code;
      }
    }
    if (name === "passport_number") {
      if (newValue.length > 9) newValue = newValue.slice(0, 9);
      if (newValue.length > 0 && newValue.length < 9) {
        newErrors.passport_number = "شماره پاسپورت باید ۹ رقم باشد";
      } else {
        delete newErrors.passport_number;
      }
    }
    if (name === "postal_code") {
      if (newValue.length > 10) newValue = newValue.slice(0, 10);
      if (newValue.length > 0 && newValue.length < 10) {
        newErrors.postal_code = "کدپستی باید ۱۰ رقم باشد";
      } else {
        delete newErrors.postal_code;
      }
    }
    if (["type"].includes(name)) {
      setForm((prev) => ({
        ...prev,
        [name]: newValue === "" ? null : Number(newValue),
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: newValue }));
    }
    setErrors(newErrors);
  };
  const handleSave = async (e) => {
    e.preventDefault();

    const res = await axiosClient.post(`/customers`, form);
    Swal.fire({
      toast: true,
      position: "top-start",
      icon: "success", // یا 'error'
      title: "مشتری با موفقیت اضافه شد",
      showConfirmButton: false,
      timer: 4000,
      timerProgressBar: true,
      customClass: {
        popup: "swal2-toast",
      },
    });
    setForm((prev) => ({
      ...prev,
      name: "",
      economic_code: "",
      postal_code: "",
      type: null,
      national_code: "",
      tel: "",
      branch_code: "",
      address: "",
      description: "",
      passport_number: "",
      last_name: "",
    }));

   
    setRefresh(!refresh);
    onClose();
  };

  const handleSelectFromOrganization = (customerData) => {
    // Populate form with selected customer data
    setForm((prev) => ({
      ...prev,
      name: customerData.name || "",
      economic_code: customerData.economic_identifier || "",
      national_code: customerData.national_code || "",
    }));
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur animate-fadeInStagger"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl rounded-2xl bg-[#23234a] border border-white/10 shadow-2xl relative animate-slideIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-3 border-b border-white/10 bg-[#0a0a22] rounded-t-2xl">
          <span className="text-white text-lg font-bold">مشتری جدید</span>
          <span
            className="btn-custom3 cursor-pointer"
            onClick={() => setOrgInquiryModalOpen(true)}
          >
            <span>
              <CiSearch />
            </span>
            <span className="text-[10px]"> استعلام از سازمان</span>
          </span>
          <span
            className="btn-custom3 cursor-pointer"
            onClick={() =>
              window.open(
                "https://tax.gov.ir/action/do/InquiryNationalID",
                "_blank"
              )
            }
          >
            <span>
              <CiSearch />
            </span>
            <span className="text-[10px]">
              {" "}
              استعلام وجود یا عدم وجود پرونده مالیاتی{" "}
            </span>
          </span>
          <button onClick={onClose} className="text-white/80 hover:text-white">
            <GrClose />
          </button>
        </div>
        {/* Form */}
        <form
          className="px-6 py-6 grid grid-cols-1 md:grid-cols-2 gap-4"
          onSubmit={handleSave}
        >
          <div>
            <label className="block mb-1 text-white text-sm"> نوع مشتری</label>
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="w-full rounded-xl bg-gray-800/70 text-white/90 border border-white/10 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/20"
            >
              {units.map((u) => (
                <option
                  key={u.id}
                  value={u.id}
                  className={u.id === 0 ? "text-red-500" : ""}
                >
                  {u.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-1 text-white text-sm">نام</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full rounded-xl bg-gray-800/70 text-white/90 border border-white/10 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/20"
            />
          </div>
          <div>
            <label className="block mb-1 text-white text-sm">
              نام خانوادگی
            </label>
            <input
              name="last_name"
              value={form.last_name}
              onChange={handleChange}
              className="w-full rounded-xl bg-gray-800/70 text-white/90 border border-white/10 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/20"
            />
          </div>
          <div>
            <label className="block mb-1 text-white text-sm">کد اقتصادی</label>
            <input
              name="economic_code"
              value={form.economic_code}
              onChange={handleChange}
              className="w-full rounded-xl bg-gray-800/70 text-white/90 border border-white/10 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/20"
            />
          </div>
          <div>
            <label className="block mb-1 text-white text-sm">کدپستی</label>
            <input
              name="postal_code"
              value={form.postal_code}
              onChange={handleChange}
              maxLength={10}
              className={`w-full rounded-xl bg-gray-800/70 text-white/90 border border-white/10 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/20 ${
                errors.postal_code ? "border-red-500" : ""
              }`}
            />
            {errors.postal_code && (
              <span className="text-xs text-red-500 mt-1 block">
                {errors.postal_code}
              </span>
            )}
          </div>
          {/* <div>
            <label className="block mb-1 text-white text-sm">
              شماره پاسپورت
            </label>
            <input
              name="passport_number"
              value={form.passport_number}
              onChange={handleChange}
              maxLength={9}
              className={`w-full rounded-xl bg-gray-800/70 text-white/90 border border-white/10 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/20 ${
                errors.passport_number ? "border-red-500" : ""
              }`}
            />
            {errors.passport_number && (
              <span className="text-xs text-red-500 mt-1 block">
                {errors.passport_number}
              </span>
            )}
          </div> */}
          <div>
            <label className="block mb-1 text-white text-sm">کدملی/شناسه</label>
            <input
              name="national_code"
              value={form.national_code}
              onChange={handleChange}
              type="number"
              maxLength={10}
              className={`w-full rounded-xl bg-gray-800/70 text-white/90 border border-white/10 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/20 ${
                errors.national_code ? "border-red-500" : ""
              }`}
            />
            {errors.national_code && (
              <span className="text-xs text-red-500 mt-1 block">
                {errors.national_code}
              </span>
            )}
          </div>
          <div>
            <label className="block mb-1 text-white text-sm">شماره تماس</label>
            <input
              name="tel"
              value={form.tel}
              onChange={handleChange}
              className="w-full rounded-xl bg-gray-800/70 text-white/90 border border-white/10 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/20"
            />
          </div>
          <div>
            <label className="block mb-1 text-white text-sm">کدمشتری</label>
            <input
              name="branch_code"
              value={form.branch_code}
              onChange={handleChange}
              type="number"
              maxLength={4}
              className={`w-full rounded-xl bg-gray-800/70 text-white/90 border border-white/10 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/20 ${
                errors.branch_code ? "border-red-500" : ""
              }`}
            />
            {errors.branch_code && (
              <span className="text-xs text-red-500 mt-1 block">
                {errors.branch_code}
              </span>
            )}
          </div>

          <span className="block  text-white text-sm">آدرس</span>
          <div className="md:col-span-2 flex items-center justify-end gap-2">
            <input
              name="address"
              value={form.address}
              onChange={handleChange}
              type="text"
              className="w-full rounded-xl bg-gray-800/70 text-white/90 border border-white/10 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/20"
            />
          </div>
          <div className="md:col-span-2 flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 rounded-xl border border-white/10 text-white/80 bg-red-500 w-1/2 hover:bg-red-600 transition-all"
            >
              انصراف
            </button>
            <button
              type="submit"
              className="btn-custom4"
            >
              ذخیره
            </button>
          </div>
        </form>
      </div>

      {/* Organization Inquiry Modal */}
      <OrganizationInquiryModal
        isOpen={orgInquiryModalOpen}
        onClose={() => setOrgInquiryModalOpen(false)}
        onSelectCustomer={handleSelectFromOrganization}
      />
    </div>
  );
}

AddCustomersModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  setRefresh: PropTypes.func.isRequired,
  refresh: PropTypes.bool.isRequired,
};
