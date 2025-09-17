import { useState } from "react";
import { FiTrash2, FiEdit2 } from "react-icons/fi";
import axios from "axios";
import {
  CustomToastContainer,
  showSuccessToast,
  showErrorToast,
} from "./CustomToast";

const units = [
  { id: 0, name: "انتخاب ..." },
  { id: 1, name: "حقیقی" },
  { id: 2, name: 'حقوقی' },
  { id: 3, name: "مشارکت مدنی" },
  { id: 4, name: "اتباع غیر ایرانی" },
 
];

export default function CustomersTable({dataTable ,setDataTable}) {
 

 
  const [row, setRow] = useState({
    address :"",
    branch_code: "",
    description : "",
    economic_code : "",
    id: "",
    last_name: "",
    name: "",
    national_code: "",
    passport_number:"",
    postal_code: "",
    tel: "",
    type: "انتخاب ...",
    
  });

  // sync کردن inputها با dataTable هنگام وارد کردن کد
  const handleCodeChange = (e) => {
    const name = e.target.value;
    setRow((prev) => ({ ...prev, name }));
    const found = dataTable.find((item) => item.name === name);
    console.log(`found`, found);
    if (found) {
      setRow({ ...found });
    } else {
      setRow((prev) => ({
        ...prev,
        address :"",
    branch_code: "",
    description : "",
    economic_code : "",
    id: "",
    last_name: "",
    national_code: "",
    passport_number:"",
    postal_code: "",
    tel: "",
    type: "انتخاب ...",
      }));
    }
  };

  // ویرایش مقدار هر فیلد
  const handleFieldChange = (field, value) => {
    setRow((prev) => ({ ...prev, [field]: value }));
    setDataTable((prev) =>
      prev.map((item) =>
        item.name === row.name ? { ...item, [field]: value } : item
      )
    );
  };

  // حذف ردیف با کد فعلی
  const handleDelete = () => {
    setDataTable((prev) => prev.filter((item) => item.name !== row.name));
    setRow({
      name: "",
      code: "",
      unit: "انتخاب ...",
      nationalCode: "",
      postCode: "",
      phone: "",
      userCode: "",
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
console.log(`row`, row);
  return (
    <div className="overflow-x-auto nice-scrollbar rounded-2xl border border-white/10 bg-white/5 mt-8">
      <CustomToastContainer />
      <table className="min-w-full text-white">
        <thead>
          <tr className="text-white/80 text-xs bg-[#181f3a]">
            <th className="p-2">نام</th>
            <th className="p-2">نوع</th>
            <th className="p-2">کد اقتصادی</th>
            <th className="p-2">کدملی/شناسه/فراگیر</th>
            <th className="p-2">کدپستی</th>
            <th className="p-2">تلفن</th>
            <th className="p-2">کدمشتری در سامانه مشتری</th>
            <th className="p-2">عملیات</th>
          </tr>
        </thead>
        <tbody>
          {/* ردیف افزودن/ویرایش */}
          <tr className="bg-white/10">
            <td className="px-2 py-1">
              <input
                className="w-full rounded bg-white/20 text-xs text-right px-2 py-1 outline-none"
                value={row.name}
                onChange={handleCodeChange}
              />
            </td>
          
            <td className="px-2 py-1">
  <select
    className="w-[90px] rounded bg-gray-500 text-xs text-right px-2 py-1 outline-none"
    value={row.type}
    onChange={(e) => handleFieldChange("type", Number(e.target.value))}
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
                value={row.economic_code}
                onChange={(e) => handleFieldChange("economic_code", e.target.value)}
              />
            </td>
            <td className="px-2 py-1">
              <input
                className="w-full rounded bg-white/20 text-xs text-right px-2 py-1 outline-none"
                value={row.national_code}
                onChange={(e) =>
                  handleFieldChange("national_code", e.target.value)
                }
              />
            </td>
            <td className="px-2 py-1">
              <input
                className="w-full rounded bg-white/20 text-xs text-right px-2 py-1 outline-none"
                value={row.postal_code}
                onChange={(e) => handleFieldChange("postal_code", e.target.value)}
              />
            </td>
            <td className="px-2 py-1">
              <input
                className="w-full rounded bg-white/20 text-xs text-right px-2 py-1 outline-none"
                value={row.tel}
                onChange={(e) =>
                  handleFieldChange("tel", e.target.value)
                }
              />
            </td>
            <td className="px-2 py-1">
              <input
                className="w-full rounded bg-white/20 text-xs text-right px-2 py-1 outline-none"
                value={row.branch_code}
                onChange={(e) => handleFieldChange("branch_code", e.target.value)}
              />
            </td>
          
            <td className="px-2 py-1 text-center">
              <div className="flex items-center justify-center gap-2">
                <button
                  className="p-1 rounded hover:bg-red-500/20 text-red-500"
                  onClick={handleDelete}
                  disabled={
                    !row.name ||
                    !dataTable.find((item) => item.name === row.name)
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
          {dataTable.map((item) => {
          const unitName = units.find((u) => u.id === item.type)?.name || "-";

  return (
    <tr key={item.id} className="bg-white/5">
      <td className="px-2 py-1">{item?.name} - {item?.last_name}</td>
      <td className="px-2 py-1 text-center">{unitName}</td>
      <td className="px-2 py-1 text-center">{item?.economic_code || "-"}</td>
      <td className="px-2 py-1 text-center">{item?.national_code || "-"}</td>
      <td className="px-2 py-1 text-center">{item?.postal_code || "-"}</td>
      <td className="px-2 py-1 text-center">{item?.tel || "-"}</td>
      <td className="px-2 py-1 text-center">{item?.branch_code || "-"}</td>
      <td className="px-2 py-1 text-center">
        {/* دکمه‌های حذف و ویرایش */}
      </td>
    </tr>
  );
})}
        </tbody>
      </table>
    </div>
  );
}
