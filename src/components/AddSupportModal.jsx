import { useState } from "react";
import { GrClose } from "react-icons/gr";

const units = [
 "انتخاب ...",
  "پشتیبانی",
  "فنی",
  "باشگاه مشتریان ",
  "مالیاتی",
  "ارتباط با ما",
];

export default function AddSupportModal({ isOpen, onClose }) {
  const [form, setForm] = useState({
    title: "",
    contractNumber: "",
    customCode: "",
    customer: "عدد",
   
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
          <span className="text-white text-lg font-bold"> تیکت جدید</span>
          <button onClick={onClose} className="text-white/80 hover:text-white">
            <GrClose />
          </button>
        </div>
        {/* Form */}
        <form
          className="px-6 py-6 flex flex-col w-full  gap-4"
          onSubmit={handleSave}
        >
          <div>
            <label className="block mb-1 text-white text-sm">
            عنوان 
            </label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full rounded-xl bg-gray-800/70 text-white/90 border border-white/10 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/20"
            />
          </div>
          <div>
            <label className="block mb-1 text-white text-sm">نوع تیکت</label>
            <select
              name="customer"
              value={form.customer}
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
            <label className="block mb-1 text-white text-sm">شماره  تماس</label>
            <input
              name="contractNumber"
              value={form.contractNumber}
              onChange={handleChange}
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
