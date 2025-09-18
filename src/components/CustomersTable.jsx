import { useState } from "react";
import { FiTrash2, FiEdit2 } from "react-icons/fi";
import { CustomToastContainer} from "./CustomToast";
import axiosClient from "../axios-client";
import Swal from 'sweetalert2';

const units = [
  { id: 0, name: "انتخاب ..." },
  { id: 1, name: "حقیقی" },
  { id: 2, name: 'حقوقی' },
  { id: 3, name: "مشارکت مدنی" },
  { id: 4, name: "اتباع غیر ایرانی" },
 
];

export default function CustomersTable({dataTable ,setDataTable , setRefresh , refresh}) {
 
  const [editedFields, setEditedFields] = useState({});
 const [selectedRowId, setSelectedRowId] = useState(null);
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
      const res = await axiosClient.delete(`/customers/${row.id}`);
      console.log(`Delete response:`, res);

      setRefresh(!refresh);
      Swal.fire({
        toast: true,
        position: 'top-start', 
        icon: 'success', // یا 'error'
        title: 'کاربر با موفقیت حذف شد',
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: true,
        customClass: {
          popup: 'swal2-toast'
        }
      });
      setRow(prev => ({
        ...prev,
        name :"",
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
    
    } catch (error) {
      console.log(`error`, error);
      Swal.fire({
        toast: true,
        position: 'top-start',
        icon: 'error',
        title: 'خطا در حذف کاربر',
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
  const handleEdit = async () => {
    
    if (row.id) {
      try {
      const payload = { id: row.id, ...row };
      const { data } = await axiosClient.put(
        `/customers/${payload.id}`,
        payload
      );
      setRefresh(!refresh);
      Swal.fire({
        toast: true,
        position: 'top-start', 
        icon: 'success', // یا 'error'
        title: 'کاربر با موفقیت ویرایش شد',
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: true,
        customClass: {
          popup: 'swal2-toast'
        }
      });
      setRow(prev => ({
        ...prev,
        name :"",
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
    } catch (error) {
      console.log(`error`, error);
      Swal.fire({
        toast: true,
        position: 'top-start',
        icon: 'error',
        title: 'خطا در ویرایش کاربر',
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: true,
        customClass: {
          popup: 'swal2-toast'
        }
      });
    }
    } else {
  
      Swal.fire({
        toast: true,
        position: 'top-start',
        icon: 'error',
        title: 'از قسمت نام، نام کاربر را وارد کنید!',
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: true,
        customClass: {
          popup: 'swal2-toast'
        }
      });
    }
  };

  const handleRowDoubleClick = (item) => {
  setRow({ ...item });
  setSelectedRowId(item.id);
};

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
          {dataTable.map((item) => {
          const unitName = units.find((u) => u.id === item.type)?.name || "-";

  return (
    <tr key={item.id}
     onDoubleClick={() => handleRowDoubleClick(item)}
      className={`odd:bg-white/5 even:bg-white/10 border-t border-white/5 select-none cursor-pointer 
              ${selectedRowId === item.id ? 'activeTr' : ''}`}
    >
      <td className="p-2 ">{item?.name}&nbsp;&nbsp;{item?.last_name}</td>
      <td className="p-2  text-center">{unitName}</td>
      <td className="p-2  text-center">{item?.economic_code || "-"}</td>
      <td className="p-2  text-center">{item?.national_code || "-"}</td>
      <td className="p-2  text-center">{item?.postal_code || "-"}</td>
      <td className="p-2  text-center">{item?.tel || "-"}</td>
      <td className="p-2  text-center">{item?.branch_code || "-"}</td>
      <td className="p-2  text-center">
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
