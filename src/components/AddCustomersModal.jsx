import { useState } from "react";
import { GrClose } from "react-icons/gr";

const units = [
  "انتخاب ...",
  "حقیقی",
  "حقوقی",
  "مشارکت مدنی",
  "اتباع"
];

export default function AddCustomersModal({ isOpen, onClose }) {
  const [form, setForm] = useState({
    name: "",
    code: "",
    postCode: "",
    typeCustomer: "عدد",
    nationalCode: "",
    phone: "",
    userCode: "",
    legalSubject: "",
    address: "",
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    console.log("مقادیر فرم:", form);
    onClose();
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
              name="typeCustomer"
              value={form.typeCustomer}
              onChange={handleChange}
              className="w-full rounded-xl bg-gray-800/70 text-white/90 border border-white/10 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/20"
            >
              {units.map((u) => (
                <option
                  key={u}
                  value={u}
                  className={u === "انتخاب ..." ? "text-red-500" : ""}
                >
                  {u}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-1 text-white text-sm">
       نام مشتری
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full rounded-xl bg-gray-800/70 text-white/90 border border-white/10 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/20"
            />
          </div>
          <div>
            <label className="block mb-1 text-white text-sm">شناسه</label>
            <input
              name="code"
              value={form.code}
              onChange={handleChange}
              className="w-full rounded-xl bg-gray-800/70 text-white/90 border border-white/10 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/20"
            />
          </div>
          <div>
            <label className="block mb-1 text-white text-sm">
              کدپستی
            </label>
            <input
              name="postCode"
              value={form.postCode}
              onChange={handleChange}
              className="w-full rounded-xl bg-gray-800/70 text-white/90 border border-white/10 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/20"
            />
          </div>
       
          <div>
            <label className="block mb-1 text-white text-sm">
             کدملی/شناسه
            </label>
            <input
              name="nationalCode"
              value={form.nationalCode}
              onChange={handleChange}
              type="number"
              className="w-full rounded-xl bg-gray-800/70 text-white/90 border border-white/10 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/20"
            />
          </div>
          <div>
            <label className="block mb-1 text-white text-sm">
              شماره تماس
            </label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full rounded-xl bg-gray-800/70 text-white/90 border border-white/10 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/20"
            />
          </div>
          <div>
            <label className="block mb-1 text-white text-sm">
             کدمشتری
            </label>
            <input
              name="userCode"
              value={form.userCode}
              onChange={handleChange}
              type="number"
              className="w-full rounded-xl bg-gray-800/70 text-white/90 border border-white/10 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/20"
            />
          </div>
          <div>
            <label className="block mb-1 text-white text-sm">
            کد اقتصادی
            </label>
            <input
              name="legalSubject"
              value={form.legalSubject}
              onChange={handleChange}
              className="w-full rounded-xl bg-gray-800/70 text-white/90 border border-white/10 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/20"
            />
          </div>
            <span className="block  text-white text-sm">
            آدرس
            </span>
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
              className="px-6 py-2 rounded-xl border border-white/10 text-white/80 bg-purple-700 hover:bg-purple-800 transition-all"
            >
              انصراف
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-xl bg-pink-300 text-[#23234a] font-bold hover:bg-pink-400 transition-all"
            >
              ذخیره
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
