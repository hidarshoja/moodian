import { useState } from "react";
import { FiTrash2, FiEdit2 } from "react-icons/fi";
import axiosClient from "../axios-client";
import Swal from "sweetalert2";
import { CustomToastContainer } from "./CustomToast";
import EditServiceModal from "./EditServiceModal";
import PropTypes from "prop-types";

const units = [
  { id: 0, name: "انتخاب ..." },
  { id: 1, name: "لنگه" },
  { id: 2, name: "عدل" },
  { id: 3, name: "جعبه" },
  { id: 4, name: "توپ" },
  { id: 5, name: "ست" },
  { id: 6, name: "دست" },
  { id: 7, name: "کارتن" },
  { id: 8, name: "عدد" },
  { id: 9, name: "بسته" },
  { id: 10, name: "پاکت" },
];

function Spinner() {
  return (
    <div className="flex justify-center items-center w-full h-60">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-400"></div>
    </div>
  );
}

export default function ServicesTable({
  dataTable,
  setRefresh,
  refresh,
  loading,
}) {
  const [selectedRowId, setSelectedRowId] = useState(null);
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
  const [showEditModal, setShowEditModal] = useState(false);
  const [editRowData, setEditRowData] = useState(null);

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
      // setEditedFields((prev) => ({ ...prev, [field]: value })); // This line was removed
    } else {
      // اگر مقدار به حالت اولیه برگشت، از editedFields حذف کن
      // setEditedFields((prev) => { // This line was removed
      //   const updated = { ...prev };
      //   delete updated[field];
      //   return updated;
      // });
    }
  };

  // حذف ردیف با کد فعلی
  const handleDelete = async (row) => {
    try {
      const res = await axiosClient.delete(`/products/${row.id}`);
      

      setRefresh(!refresh);
      Swal.fire({
        toast: true,
        position: "top-start",
        icon: "success", // یا 'error'
        title: "محصول با موفقیت حذف شد",
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: true,
        customClass: {
          popup: "swal2-toast",
        },
      });
      setRow((prev) => ({
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
        position: "top-start",
        icon: "error",
        title: "خطا در حذف محصول",
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: true,
        customClass: {
          popup: "swal2-toast",
        },
      });
    }
  };

  // تغییر تابع ویرایش تا حاضر شدن با مقدار ورودی از مدال
  const handleEdit = async (editedData) => {
    const payload = editedData ? { ...editedData } : { id: row.id, ...row };
    if (payload.sstid) {
      try {
        await axiosClient.put(`/products/${payload.id}`, payload);
        setRefresh(!refresh);
        Swal.fire({
          toast: true,
          position: "top-start",
          icon: "success",
          title: "محصول با موفقیت ویرایش شد",
          showConfirmButton: false,
          timer: 4000,
          timerProgressBar: true,
          customClass: {
            popup: "swal2-toast",
          },
        });
        setShowEditModal(false);
        setEditRowData(null);
        setRow((prev) => ({
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
          position: "top-start",
          icon: "error",
          title: "خطا در ویرایش محصول",
          showConfirmButton: false,
          timer: 4000,
          timerProgressBar: true,
          customClass: {
            popup: "swal2-toast",
          },
        });
      }
    } else {
      Swal.fire({
        toast: true,
        position: "top-start",
        icon: "error",
        title: "از قسمت نام، نام محصول را وارد کنید!",
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
        
          {/* نمایش همه داده‌های جدول */}
          {dataTable.map((item) => (
            <tr
              key={item.id}
              onDoubleClick={() => handleRowDoubleClick(item)}
              className={`odd:bg-white/5 even:bg-white/10 border-t border-white/5 select-none cursor-pointer 
              ${selectedRowId === item.id ? "activeTr" : ""}`}
            >
              <td className="p-2 text-center">
               
                {item?.title ? item.title : "-"}
              </td>
              <td className="p-2">{item?.sstid ? item.sstid : "-"}</td>

              <td className="p-2 text-center">
                {item?.unit?.title ? item.unit.title : "-"}
              </td>
              <td className="p-2 text-center">{item?.vra ? item.vra : "-"}</td>
              <td className="p-2 text-center">{item?.odt ? item.odt : "-"}</td>
              <td className="p-2 text-center">{item?.odr ? item.odr : "-"}</td>
              <td className="p-2 text-center">{item?.olt ? item.olt : "-"}</td>
              <td className="p-2 text-center">{item?.olr ? item.olr : "-"}</td>
              <td className="p-2 text-center">{item?.olr ? item.olr : "-"}</td>
              <td className="p-2 text-center">
               {/* Delete icon */}
               <button
                  className="p-1 rounded hover:bg-red-500/20 text-red-500 mr-1"
                  title="حذف این ردیف"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(item);
                  }}
                >
                  <FiTrash2 className="w-4 h-4" />
                </button>
                {/* Edit icon */}
                <button
                  className="p-1 rounded hover:bg-blue-500/20 text-blue-500 mr-1"
                  title="ویرایش این ردیف"
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditRowData(item);
                    setShowEditModal(true);
                  }}
                >
                  <FiEdit2 className="w-4 h-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Edit Service Modal */}
      {showEditModal && (
        <EditServiceModal
          isOpen={showEditModal}
          initialData={editRowData}
          onClose={() => {
            setShowEditModal(false);
            setEditRowData(null);
          }}
          onEdit={handleEdit}
        />
      )}
    </div>
  );
}

// PropTypes
ServicesTable.propTypes = {
  dataTable: PropTypes.array.isRequired,
  setRefresh: PropTypes.func.isRequired,
  refresh: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
};
