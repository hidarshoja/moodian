import { useState } from "react";
import { FiTrash2, FiEdit2 } from "react-icons/fi";
import axios from "axios";
import {
  CustomToastContainer,
  showSuccessToast,
  showErrorToast,
} from "./CustomToast";

const units = [
  "انتخاب ...",
  "حقیقی",
  "حقوقی",
  "اتباع"
];

export default function ContractsTable({dataTable ,setDataTable}) {
 

 
  const [row, setRow] = useState({
    contractNumber: "",
    title: "",
    customer: "انتخاب ...",
   
    customCode: "",
  });


  const handleCodeChange = (e) => {
    const contractNumber = e.target.value;
    setRow((prev) => ({ ...prev, contractNumber }));
    const found = dataTable.find((item) => item.contractNumber === contractNumber);
    if (found) {
      setRow({ ...found });
    } else {
      setRow((prev) => ({
        ...prev,
        title: "",
        customer: "انتخاب ...",
       
        customCode: "",
      }));
    }
  };

  // ویرایش مقدار هر فیلد
  const handleFieldChange = (field, value) => {
    setRow((prev) => ({ ...prev, [field]: value }));
    // اگر کد وجود داشت، مقدار را در dataTable هم آپدیت کن
    setDataTable((prev) =>
      prev.map((item) =>
        item.contractNumber === row.contractNumber ? { ...item, [field]: value } : item
      )
    );
  };

  // حذف ردیف با کد فعلی
  const handleDelete = () => {
    setDataTable((prev) => prev.filter((item) => item.contractNumber !== row.contractNumber));
    setRow({
      contractNumber: "",
      title: "",
      customer: "انتخاب ...",
    
    });
  };

  // ارسال داده به API تستی هنگام ویرایش
  const handleEdit = async () => {
    try {
      
      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/posts",
        row
      );
      showSuccessToast("ویرایش با موفقیت انجام شد!");
     
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
            <th className="text-right p-2">شماره قرارداد پیمانکاری</th>
            <th className="text-right p-2">عنوان قرارداد</th>
            <th className="text-right p-2">مشتری</th>
         
            <th className="p-2">عملیات</th>
          </tr>
        </thead>
        <tbody>
          {/* ردیف افزودن/ویرایش */}
          <tr className="bg-white/10">
            <td className="px-2 py-1">
              <input
                className="w-full rounded bg-white/20 text-xs text-right px-2 py-1 outline-none"
                value={row.contractNumber}
                onChange={handleCodeChange}
              />
            </td>
            <td className="px-2 py-1">
              <input
                className="w-full rounded bg-white/20 text-xs text-right px-2 py-1 outline-none"
                value={row.title}
                onChange={(e) => handleFieldChange("title", e.target.value)}
              />
            </td>
            <td className="px-2 py-1">
              <select
                className="w-full rounded bg-gray-500 text-xs text-right px-2 py-1 outline-none"
                value={row.customer}
                onChange={(e) => handleFieldChange("customer", e.target.value)}
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
         
            <td className="px-2 py-1 text-center">
              <div className="flex items-center justify-center gap-2">
                <button
                  className="p-1 rounded hover:bg-red-500/20 text-red-500"
                  onClick={handleDelete}
                  disabled={
                    !row.contractNumber ||
                    !dataTable.find((item) => item.contractNumber === row.contractNumber)
                  }
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
            <tr key={item.contractNumber} className="bg-white/5">
              <td className="px-2 py-1">{item.contractNumber}</td>
              <td className="px-2 py-1">{item.title}</td>
              <td className="px-2 py-1">{units[item.customer]}</td>
              
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
