import Spinner from "../utils/Spinner";
import { convertToPersianDate } from "../utils/change-date";
import { FiTrash2, FiEdit2 } from "react-icons/fi";
import axiosClient from "../axios-client";
import Swal from "sweetalert2";
import EditInvoiceModalNew from "./EditInvoiceModalNew";
import { useState } from "react";
import PropTypes from "prop-types";
import { TiDeleteOutline } from "react-icons/ti";
import { FaRegPlusSquare } from "react-icons/fa";
import { MdOutlineSlideshow } from "react-icons/md";
import { FaRegListAlt } from "react-icons/fa";
import { GrStatusGood } from "react-icons/gr";
import { FiEdit } from "react-icons/fi";
import { BsSendArrowUp } from "react-icons/bs";

export default function SendInvoicesTable({ records, loading, onRefresh }) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const handleDelete = async (row) => {
    try {
      const res = await axiosClient.delete(`/invoices/${row.id}`);
      console.log(`Delete response:`, res);

      //  setRefresh(!refresh);
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
      if (onRefresh) {
        onRefresh();
      }
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

  const handleEdit = (row) => {
    setSelectedInvoice(row);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedInvoice(null);
    // Refresh the data after closing modal
    if (onRefresh) {
      onRefresh();
    }
  };

  const handleSendToMoadian = async (row) => {
    try {
      const res = await axiosClient.post('/invoices/send-to-moadian', {
        ids: [row.id]
      });
      Swal.fire({
        toast: true,
        position: "top-start",
        icon: "success",
        title: "فاکتور با موفقیت به مودیان ارسال شد",
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: true,
        customClass: {
          popup: "swal2-toast",
        },
      });
      if (onRefresh) onRefresh();
    } catch (error) {
      Swal.fire({
        toast: true,
        position: "top-start",
        icon: "error",
        title: "خطا در ارسال فاکتور به مودیان",
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: true,
        customClass: {
          popup: "swal2-toast",
        },
      });
    }
  };

  const handleCancelInvoice = async (row) => {
    try {
      await axiosClient.post(`/invoices/${row.id}/cancel`, {
        send_to_moadian: false
      });
      Swal.fire({
        toast: true,
        position: "top-start",
        icon: "success",
        title: "ابطال فاکتور با موفقیت انجام شد",
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: true,
        customClass: {
          popup: "swal2-toast"
        }
      });
      if (onRefresh) onRefresh();
    } catch (error) {
      Swal.fire({
        toast: true,
        position: "top-start",
        icon: "error",
        title: "خطا در ابطال فاکتور",
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: true,
        customClass: {
          popup: "swal2-toast"
        }
      });
    }
  };

  return (
    <div className="overflow-x-auto nice-scrollbar rounded-2xl border border-white/10 bg-white/5 relative">
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
          <tr className="text-white/80 text-sm bg-[#181f3a]">
            <th className="text-right px-4 py-3 whitespace-nowrap"> وضعیت </th>
            <th className="text-right px-4 py-3 whitespace-nowrap">
              شماره منحصر به فرد مالیاتی
            </th>
            <th className="text-right px-4 py-3 whitespace-nowrap">مشتری</th>
            <th className="text-right px-4 py-3 whitespace-nowrap">
              تاریخ صدور
            </th>
            <th className="text-right px-4 py-3 whitespace-nowrap">مبلغ کل</th>
            <th className="text-right px-4 py-3 whitespace-nowrap">نوع</th>
            <th className="text-right px-4 py-3 whitespace-nowrap">عملیات</th>
          </tr>
        </thead>
        <tbody>
          {records.length === 0 && (
            <tr>
              <td
                colSpan={9}
                className="px-4 py-6 text-center text-white/60 text-sm"
              >
                موردی ثبت نشده است.
              </td>
            </tr>
          )}
          {records.map((r, i) => (
            <tr
              key={i}
              className="odd:bg-white/5 even:bg-white/10 border-t border-white/5"
            >
              <td className="px-4 py-3 text-white/90 text-sm whitespace-nowrap">
                {r?.status_label}
              </td>
              <td className="px-4 py-3 text-white/90 text-sm whitespace-nowrap">
                {r.taxid ? r.taxid : "-"}
              </td>
              <td className="px-4 py-3 text-white/90 text-sm whitespace-nowrap">
                {r?.customer?.name} {r?.customer?.last_name}
              </td>
              <td className="px-4 py-3 text-white/90 text-sm whitespace-nowrap">
                {convertToPersianDate(r.created_at)}
              </td>
              <td className="px-4 py-3 text-white/90 text-sm truncate max-w-[200px]">
                {r.tadis ? r.tadis : "-"}
              </td>
              <td className="px-4 py-3 text-white/90 text-sm truncate max-w-[240px]">
                {r.inty_label}
              </td>

              <td className="px-5 py-3 text-white/90 text-sm truncate max-w-[280px]">
                <div className="flex items-center justify-center gap-2">
                <div className="relative group">
                    <button
                      className="p-1 rounded hover:bg-blue-500/20 text-blue-500"
                      onClick={() => handleEdit(r)}
                    >
                      <FiEdit2 className="w-4 h-4" />
                    </button>
                    <div className="absolute right-full top-1/2 transform -translate-y-1/2 mr-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                      ویرایش
                    </div>
                  </div>
                  <div className="relative group">
                    <button
                      className="p-1 rounded hover:bg-red-500/20 text-red-500"
                      onClick={() => handleDelete(r)}
                    >
                      <TiDeleteOutline className="w-5 h-5" />
                    </button>
                    <div className="absolute left-full top-1/2 transform -translate-y-1/2 mr-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                      حذف
                    </div>
                  </div>
                  <div className="relative group">
                    <button
                      className="p-1 rounded hover:bg-green-500/20 text-green-500"
                      onClick={() => handleSendToMoadian(r)}
                    >
                      <BsSendArrowUp className="w-4 h-4" />
                    </button>
                    <div className="absolute left-full top-1/2 transform -translate-y-1/2 mr-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                      ارسال
                    </div>
                  </div>
                  <div className="relative group">
                    <button
                      className="p-1 rounded hover:bg-blue-500/20 text-blue-500"
                      onClick={() => handleCancelInvoice(r)}
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                    <div className="absolute left-full top-1/2 transform -translate-y-1/2 mr-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                      ابطال
                    </div>
                  </div>
                 
                  <div className="relative group">
                    <button
                      className="p-1 rounded hover:bg-blue-500/20 text-blue-500"
                      onClick={() => handleEdit(r)}
                    >
                      <GrStatusGood className="w-4 h-4" />
                    </button>
                    <div className="absolute left-full top-1/2 transform -translate-y-1/2 mr-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                      چک وضعیت
                    </div>
                  </div>
                 
                  <div className="relative group">
                    <button
                      className="p-1 rounded hover:bg-green-500/20 text-green-500"
                      onClick={() => handleEdit(r)}
                    >
                      <FaRegListAlt className="w-4 h-4" />
                    </button>
                    <div className="absolute left-full top-1/2 transform -translate-y-1/2 mr-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                      لیست خطاها
                    </div>
                  </div>
                  <div className="relative group">
                    <button
                      className="p-1 rounded hover:bg-red-500/20 text-red-500"
                      onClick={() => handleEdit(r)}
                    >
                      <FiEdit className="w-4 h-4" />
                    </button>
                    <div className="absolute left-full top-1/2 transform -translate-y-1/2 mr-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                      اصلاح
                    </div>
                  </div>
                  <div className="relative group">
                    <button
                      className="p-1 rounded hover:bg-green-500/20 text-green-500"
                      onClick={() => handleEdit(r)}
                    >
                      <MdOutlineSlideshow className="w-4 h-4" />
                    </button>
                    <div className="absolute left-full top-1/2 transform -translate-y-1/2 mr-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                      نمایش
                    </div>
                  </div>
                  <div className="relative group">
                    <button
                      className="p-1 rounded hover:bg-blue-500/20 text-blue-500"
                      onClick={() => handleEdit(r)}
                    >
                      <FaRegPlusSquare className="w-4 h-4" />
                    </button>
                    <div className="absolute left-full top-1/2 transform -translate-y-1/2 mr-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                      تکثیر
                    </div>
                  </div>
                  
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <EditInvoiceModalNew
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        invoiceData={selectedInvoice}
      />
    </div>
  );
}

SendInvoicesTable.propTypes = {
  records: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  onRefresh: PropTypes.func.isRequired,
};
