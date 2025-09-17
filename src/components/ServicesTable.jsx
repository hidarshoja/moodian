import { useState } from "react";
import { FiTrash2, FiEdit2 } from "react-icons/fi";
import axiosClient from "../axios-client";
import Swal from 'sweetalert2';


import { CustomToastContainer} from "./CustomToast";

const units = [
  { id: 0, name: "انتخاب ..." },
  { id: 1, name: "لنگه" },
  { id: 2, name: 'عدل' },
  { id: 3, name: "جعبه" },
  { id: 4, name: "توپ" },
  { id: 5, name: "ست" },
  { id: 6, name: "دست" },
  { id: 7, name: "کارتن" },
  { id: 8, name: "عدد" },
  { id: 9, name: "بسته" },
  { id: 10, name: "پاکت" },
];

export default function ServicesTable({ dataTable, setDataTable , setRefresh , refresh }) {

  const [editedFields, setEditedFields] = useState({});
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
  
    // مقدار اولیه را پیدا کن
    const original = dataTable.find((item) => item.sstid === row.sstid);
    if (original && original[field] !== value) {
      setEditedFields((prev) => ({ ...prev, [field]: value }));
    } else {
      // اگر مقدار به حالت اولیه برگشت، از editedFields حذف کن
      setEditedFields((prev) => {
        const updated = { ...prev };
        delete updated[field];
        return updated;
      });
    }
  };

  // حذف ردیف با کد فعلی
  const handleDelete = async (row) => {
    try {
      const res = await axiosClient.delete(`/products/${row.id}`);
      console.log(`Delete response:`, res);

      setRefresh(!refresh);
      Swal.fire({
        toast: true,
        position: 'top-start', 
        icon: 'success', // یا 'error'
        title: 'محصول با موفقیت حذف شد',
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: true,
        customClass: {
          popup: 'swal2-toast'
        }
      });
      setRow(prev => ({
        ...prev,
        sstid: "",
        title: "",
        unit_id: "انتخاب ...",
        vra: "",
        odt: "",
        odr: "",
        olt: "",
        olr: "",
      }));
    
    } catch (error) {
      console.log(`error`, error);
      Swal.fire({
        toast: true,
        position: 'top-start',
        icon: 'error',
        title: 'خطا در حذف محصول',
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: true,
        customClass: {
          popup: 'swal2-toast'
        }
      });
    }
   
   
  };

  // ارسال داده به API تستی هنگام ویرایش
  // const handleEdit = async () => {
  //   console.log("ارسال داده ویرایش:", row);
  //   // try {
      
  //   //   const response = await axios.post(
  //   //     "https://jsonplaceholder.typicode.com/posts",
  //   //     row
  //   //   );
  //   //   showSuccessToast("ویرایش با موفقیت انجام شد!");
  //   //   console.log("پاسخ سرور:", response.data);
  //   // } catch (error) {
  //   //   showErrorToast("خطا در ارسال داده!");
  //   //   console.error(error);
  //   // }
  // };

  const handleEdit = async () => {
    if (row.sstid && Object.keys(editedFields).length > 0) {
      const payload = { id: row.id , title :row.title,sstid :row.sstid , ...editedFields };
      console.log("مقادیر تغییر یافته:", payload);
      const { data } = await axiosClient.put(
        `/products/${payload.id}`,
        payload);
    } else {
      console.log("هیچ تغییری انجام نشده است.");
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
            <tr key={item.id} className="bg-white/5">
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
     
    </div>
  );
}
