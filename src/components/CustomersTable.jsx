import { useState } from "react";
import { FiTrash2, FiEdit2 } from "react-icons/fi";
import { CustomToastContainer } from "./CustomToast";
import axiosClient from "../axios-client";
import Swal from "sweetalert2";
import PropTypes from "prop-types";

const units = [
  { id: 0, name: "انتخاب ..." },
  { id: 1, name: "حقیقی" },
  { id: 2, name: "حقوقی" },
  { id: 3, name: "مشارکت مدنی" },
  { id: 4, name: "اتباع غیر ایرانی" },
];

// Spinner component
function Spinner() {
  return (
    <div className="flex justify-center items-center w-full h-60">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-400"></div>
    </div>
  );
}

export default function CustomersTable({
  dataTable,
  setRefresh,
  refresh,
  loading = false,
  onRequestEditCustomer,
}) {
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [row, setRow] = useState({
    address: "",
    branch_code: "",
    description: "",
    economic_code: "",
    id: "",
    last_name: "",
    name: "",
    national_code: "",
    passport_number: "",
    postal_code: "",
    tel: "",
    type: "انتخاب ...",
  });

 

  // حذف ردیف با کد فعلی
  const handleDelete = async (row) => {
    try {
      const res = await axiosClient.delete(`/customers/${row.id}`);
    

      setRefresh(!refresh);
      Swal.fire({
        toast: true,
        position: "top-start",
        icon: "success", // یا 'error'
        title: "کاربر با موفقیت حذف شد",
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: true,
        customClass: {
          popup: "swal2-toast",
        },
      });
      setRow((prev) => ({
        ...prev,
        name: "",
        address: "",
        branch_code: "",
        description: "",
        economic_code: "",
        id: "",
        last_name: "",
        national_code: "",
        passport_number: "",
        postal_code: "",
        tel: "",
        type: "انتخاب ...",
      }));
    } catch (error) {
      console.log(`error`, error);
      Swal.fire({
        toast: true,
        position: "top-start",
        icon: "error",
        title: "خطا در حذف کاربر",
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: true,
        customClass: {
          popup: "swal2-toast",
        },
      });
    }
  };

 

  const handleRowDoubleClick = (item) => {
    setRow({ ...item });
    setSelectedRowId(item.id);
  };

  return (
    <div className="overflow-x-auto nice-scrollbar rounded-2xl border border-white/10 bg-white/5 mt-8 relative">
      <CustomToastContainer />
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/60 z-20">
          <Spinner />
        </div>
      )}
      <table
        className={`min-w-full text-white ${
          loading ? "opacity-30 pointer-events-none" : ""
        }`}
      >
        <thead>
          <tr className="text-white/80 text-xs bg-[#181f3a]">
            <th className="text-right px-4 py-3 whitespace-nowrap"></th>
            <th className="p-2">#</th>
            <th className="p-2">نام</th>
            <th className="p-2">نوع</th>
            <th className="p-2">کد اقتصادی</th>
            <th className="p-2">کدملی/شناسه/فراگیر</th>
            <th className="p-2">کدپستی</th>
            <th className="p-2">تلفن</th>
            <th className="p-2">کدمشتری در سامانه مشتری</th>
            <th className="text-right px-4 py-3 whitespace-nowrap"></th>
            <th className="text-right px-4 py-3 whitespace-nowrap"></th>
            <th className="text-center px-2 py-3 whitespace-nowrap border-r border-white/10 relative"
               style={{
                position: "sticky",
                left: 0,
                backgroundColor: "#181f3a",
                zIndex: 10,
                minWidth: "70px",
                boxShadow: "10px 0 20px rgba(24, 31, 58, 1)",
              }}>عملیات</th>
          </tr>
        </thead>
        <tbody>
         
          {/* نمایش همه داده‌های جدول */}
          {dataTable.map((item) => {
            const unitName = units.find((u) => u.id === item.type)?.name || "-";

            return (
              <tr
                key={item.id}
                onDoubleClick={() => handleRowDoubleClick(item)}
                className={`odd:bg-white/5 even:bg-white/10 border-t border-white/5 select-none cursor-pointer 
              ${selectedRowId === item.id ? "activeTr" : ""}`}
              >
                <td className="p-2 text-center"></td>
                <td className="p-2 text-center">{item?.id}</td>
                <td className="p-2 text-center text-sm truncate min-w-[200px] max-w-[240px]">
                  {item?.name}&nbsp;&nbsp;{item?.last_name}
                </td>
                <td className="p-2  text-center">{unitName}</td>
                <td className="p-2  text-center">
                  {item?.economic_code || "-"}
                </td>
                <td className="p-2  text-center">
                  {item?.national_code || "-"}
                </td>
                <td className="p-2  text-center">{item?.postal_code || "-"}</td>
                <td className="p-2  text-center">{item?.tel || "-"}</td>
                <td className="p-2  text-center">{item?.branch_code || "-"}</td>
                <td className="p-2  text-center"></td>
                <td className="p-2  text-center"></td>
                <td 
                 className="px-2 py-3 text-sm border-r border-white/5 relative flex items-center justify-center"
                 style={{
                   position: "sticky",
                   left: 0,
                   zIndex: 10,
                   minWidth: "160px",
                   backgroundColor: "rgb(27, 33, 60)",
                   boxShadow: "10px 0 20px rgba(0, 0, 0, 0.5)",
                 }}>
                  <button
                    className="p-1 rounded hover:bg-blue-500/20 text-blue-500 mx-1"
                    title="ویرایش"
                    onClick={(e) => {
                      e.stopPropagation();
                      onRequestEditCustomer && onRequestEditCustomer(item);
                    }}
                  >
                    <FiEdit2 className="w-4 h-4" />
                  </button>
                  <button
                    className="p-1 rounded hover:bg-red-500/20 text-red-500 mx-1"
                    title="حذف"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(item);
                    }}
                  >
                    <FiTrash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

CustomersTable.propTypes = {
  dataTable: PropTypes.array.isRequired,
  setRefresh: PropTypes.func,
  refresh: PropTypes.bool,
  loading: PropTypes.bool,
  onRequestEditCustomer: PropTypes.func,
};
