import { useState } from "react";
import { GrClose } from "react-icons/gr";
import axiosClient from "../axios-client";
const units = [
  { id: 0, name: "انتخاب ..." },
  { id: 1, name: "متر" },
  { id: 2, name: "کیلوگرم" },
  { id: 3, name: "گرم" },
  { id: 4, name: "جعبه" },
  { id: 5, name: "دست" },
  { id: 6, name: "کارتن" },
  { id: 7, name: "میلیمتر" },
  { id: 8, name: "عدد" },
];

export default function AddServiceModal({ isOpen, onClose }) {
  const [form, setForm] = useState({
    title: "",
    sstid: "",
    unit_id: null,
    vra: "",
    odt: "",
    odr: null,
    olt: "",
    olr: null,
    sstt:""
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (["odr", "olr", "unit_id"].includes(name)) {
      setForm((prev) => ({ ...prev, [name]: value === "" ? null : Number(value) }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    console.log("مقادیر فرم:", form);
    const res = await axiosClient.post(`/products`, form);
    console.log(`res`, res);
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
          <span className="text-white text-lg font-bold">کالا/خدمت جدید</span>
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
            <label className="block mb-1 text-white text-sm">
              نام کالا/خدمت
            </label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full rounded-xl bg-gray-800/70 text-white/90 border border-white/10 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/20"
            />
          </div>
          <div>
            <label className="block mb-1 text-white text-sm">شناسه</label>
            <input
              name="sstid"
              value={form.sstid}
              onChange={handleChange}
              maxLength={13}
              minLength={13}
              className="w-full rounded-xl bg-gray-800/70 text-white/90 border border-white/10 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/20"
            />
          </div>
          {/* <div>
            <label className="block mb-1 text-white text-sm">
              کد کالا در سامانه مشتری
            </label>
            <input
              name="customCode"
              value={form.customCode}
              onChange={handleChange}
              className="w-full rounded-xl bg-gray-800/70 text-white/90 border border-white/10 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/20"
            />
          </div> */}
          <div>
            <label className="block mb-1 text-white text-sm">واحد سنجش</label>
            <select
              name="unit_id"
              value={form.unit_id}
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
            <label className="block mb-1 text-white text-sm">
              نرخ ارزش افزوده
            </label>
            <input
              name="vra"
              value={form.vra}
              onChange={handleChange}
              type="number"
              className="w-full rounded-xl bg-gray-800/70 text-white/90 border border-white/10 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/20"
            />
          </div>
          <div>
            <label className="block mb-1 text-white text-sm">
              موضوع سایر مالیات و عوارض
            </label>
            <input
              name="odt"
              value={form.odt}
              onChange={handleChange}
              className="w-full rounded-xl bg-gray-800/70 text-white/90 border border-white/10 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/20"
            />
          </div>
          <div>
            <label className="block mb-1 text-white text-sm">
              نرخ سایر مالیات و عوارض
            </label>
            <input
              name="odr"
              value={form.odr}
              onChange={handleChange}
              type="number"
              className="w-full rounded-xl bg-gray-800/70 text-white/90 border border-white/10 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/20"
            />
          </div>
          <div>
            <label className="block mb-1 text-white text-sm">
              موضوع سایر وجوه قانونی
            </label>
            <input
              name="olt"
              value={form.olt}
              onChange={handleChange}
              className="w-full rounded-xl bg-gray-800/70 text-white/90 border border-white/10 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/20"
            />
          </div>
          <div>
            <label className="block mb-1 text-white text-sm">
              نرخ سایر وجوه قانونی
            </label>
            <input
              name="olr"
              value={form.olr}
              onChange={handleChange}
              type="number"
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
