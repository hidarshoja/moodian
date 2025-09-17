import { useState } from "react";
import { FiTrash2, FiEdit2 } from "react-icons/fi";
import axios from "axios";
import axiosClient from "../axios-client";
import { errorMessage, successMessage } from "../utils/Toastiy";
import { ToastContainer } from "react-toastify";
import {
  CustomToastContainer,
  showSuccessToast,
  showErrorToast,
} from "./CustomToast";

const units = [
  "انتخاب ...",
  "متر",
  "کیلوگرم",
  "گرم",
  "جعبه",
  "دست",
  "کارتن",
  "میلیمتر",
  "عدد",
];

export default function ServicesTable({ dataTable, setDataTable }) {
  console.log(`dataTable`, dataTable);

  const [row, setRow] = useState({
    sstid: "",
    title: "",
    unit_id: "انتخاب ...",
    vra: "",
    odt: "",
    odr: "",
    olt: "",
    olr: "",
  });

  // sync کردن inputها با dataTable هنگام وارد کردن کد
  const handleCodeChange = (e) => {
    const title = e.target.value;
    setRow((prev) => ({ ...prev, title }));
    const found = dataTable.find((item) => item.title === title);
    if (found) {
      setRow({ ...found });
    } else {
      setRow((prev) => ({
        ...prev,
        sstid: "",
        unit_id: "انتخاب ...",
        vra: "",
        odt: "",
        odr: "",
        olt: "",
        olr: "",
      }));
    }
  };

  // ویرایش مقدار هر فیلد
  const handleFieldChange = (field, value) => {
    setRow((prev) => ({ ...prev, [field]: value }));
    setDataTable((prev) =>
      prev.map((item) =>
        item.sstid === row.sstid ? { ...item, [field]: value } : item
      )
    );
  };

  // حذف ردیف با کد فعلی
  const handleDelete = async (row) => {
    console.log(`row`, row);
    
    try {
    

      const res = await axiosClient.delete(`/products/${row.id}`);
      console.log(`Delete response:`, res);

    

      successMessage("محصول با موفقیت حذف شد");
    } catch (error) {
      errorMessage("خطا در حذف محصول");
    }
    setDataTable((prev) => prev.filter((item) => item.title !== row.title));
    setRow({
      sstid: "",
      title: "",
      unit_id: "انتخاب ...",
      vra: "",
      odt: "",
      odr: "",
      olt: "",
      olr: "",
    });
  };

  // ارسال داده به API تستی هنگام ویرایش
  const handleEdit = async () => {
    try {
      console.log("ارسال داده ویرایش:", row);
      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/posts",
        row
      );
      showSuccessToast("ویرایش با موفقیت انجام شد!");
      console.log("پاسخ سرور:", response.data);
    } catch (error) {
      showErrorToast("خطا در ارسال داده!");
      console.error(error);
    }
  };

  return (
    <div className="overflow-x-auto nice-scrollbar rounded-2xl border border-white/10 bg-white/5 mt-8">
      <CustomToastContainer />
      <table className="min-w-full text-white">
        <thead>
          <tr className="text-white/80 text-xs bg-[#181f3a]">
            <th className="p-2">نام</th>
            <th className="p-2">شناسه</th>
            <th className="p-2">واحد</th>
            <th className="p-2">نرخ ارزش افزوده</th>
            <th className="p-2">مالیات و عوارض</th>
            <th className="p-2">نرخ سایر عوارض و مالیات</th>
            <th className="p-2">مقدار وجوه قانونی</th>
            <th className="p-2">نرخ سایر وجوه قانونی</th>
            <th className="p-2">کد کالا در سامانه مشتری</th>
            <th className="p-2">عملیات</th>
          </tr>
        </thead>
        <tbody>
          {/* ردیف افزودن/ویرایش */}
          <tr className="bg-white/10">
          <td className="px-2 py-1">
              <input
                className="w-full rounded bg-white/20 text-xs text-right px-2 py-1 outline-none"
                value={row.title}
                onChange={handleCodeChange}
                
              />
            </td>
            <td className="px-2 py-1">
              <input
                className="w-full rounded bg-white/20 text-xs text-right px-2 py-1 outline-none"
                value={row.sstid}
                onChange={(e) => handleFieldChange("title", e.target.value)}
              />
            </td>
          
            <td className="px-2 py-1">
              <select
                className="w-[90px] rounded bg-gray-500 text-xs text-right px-2 py-1 outline-none"
                value={row.unit_id}
                onChange={(e) => handleFieldChange("unit_id", e.target.value)}
              >
                {units.map((u, idx) => (
                  <option
                    key={u}
                    value={idx}
                    className={u === "انتخاب ..." ? "text-red-500" : ""}
                  >
                    {u}
                  </option>
                ))}
              </select>
            </td>
            <td className="px-2 py-1">
              <input
                className="w-full rounded bg-white/20 text-xs text-right px-2 py-1 outline-none"
                value={row.vra}
                onChange={(e) => handleFieldChange("vra", e.target.value)}
              />
            </td>
            <td className="px-2 py-1">
              <input
                className="w-full rounded bg-white/20 text-xs text-right px-2 py-1 outline-none"
                value={row.odt}
                onChange={(e) => handleFieldChange("odt", e.target.value)}
              />
            </td>
            <td className="px-2 py-1">
              <input
                className="w-full rounded bg-white/20 text-xs text-right px-2 py-1 outline-none"
                value={row.odr}
                onChange={(e) => handleFieldChange("odr", e.target.value)}
              />
            </td>
            <td className="px-2 py-1">
              <input
                className="w-full rounded bg-white/20 text-xs text-right px-2 py-1 outline-none"
                value={row.olt}
                onChange={(e) => handleFieldChange("olt", e.target.value)}
              />
            </td>
            <td className="px-2 py-1">
              <input
                className="w-full rounded bg-white/20 text-xs text-right px-2 py-1 outline-none"
                value={row.olr}
                onChange={(e) => handleFieldChange("olr", e.target.value)}
              />
            </td>
            <td className="px-2 py-1">
              <input
                className="w-full rounded bg-white/20 text-xs text-right px-2 py-1 outline-none"
                value={row.olr}
                onChange={(e) => handleFieldChange("olr", e.target.value)}
              />
            </td>
            <td className="px-2 py-1 text-center">
              <div className="flex items-center justify-center gap-2">
                <button
                  className="p-1 rounded hover:bg-red-500/20 text-red-500"
                  onClick={() => handleDelete(row)}
                 
                >
                  <FiTrash2 className="w-4 h-4" />
                </button>
                <button
                  className="p-1 rounded hover:bg-blue-500/20 text-blue-500"
                  onClick={handleEdit}
                >
                  <FiEdit2 className="w-4 h-4" />
                </button>
              </div>
            </td>
          </tr>
          {/* نمایش همه داده‌های جدول */}
          {dataTable.map((item, idx) => (
            <tr key={item.sstid} className="bg-white/5">
               <td className="px-2 py-1 text-center">
                {item?.title ? item.title : "-"}
              </td>
              <td className="px-2 py-1">{item?.sstid ? item.sstid : "-"}</td>
             
              <td className="px-2 py-1 text-center">
                {item?.unit?.title ? item.unit.title : "-"}
              </td>
              <td className="px-2 py-1 text-center">
                {item?.vra ? item.vra : "-"}
              </td>
              <td className="px-2 py-1 text-center">
                {item?.odt ? item.odt : "-"}
              </td>
              <td className="px-2 py-1 text-center">
                {item?.odr ? item.odr : "-"}
              </td>
              <td className="px-2 py-1 text-center">
                {item?.olt ? item.olt : "-"}
              </td>
              <td className="px-2 py-1 text-center">
                {item?.olr ? item.olr : "-"}
              </td>
              <td className="px-2 py-1 text-center">
                {item?.olr ? item.olr : "-"}
              </td>
              <td className="px-2 py-1 text-center">
                {/* دکمه‌های حذف و ویرایش برای هر ردیف (در صورت نیاز می‌توانید اضافه کنید) */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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
