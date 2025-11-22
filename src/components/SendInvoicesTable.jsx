import Spinner from "../utils/Spinner";
import { convertToPersianDate } from "../utils/change-date";
import { FiTrash2, FiEdit2 } from "react-icons/fi";
import axiosClient from "../axios-client";
import Swal from "sweetalert2";
import EditInvoiceModalNew from "./EditInvoiceModalNew";
import EditInvoiceModalShow from "./EditInvoiceModalShow";
import { useState } from "react";
import PropTypes from "prop-types";
import { TiDeleteOutline } from "react-icons/ti";
import { FaRegPlusSquare } from "react-icons/fa";
import { MdOutlineSlideshow } from "react-icons/md";
import { FaRegListAlt } from "react-icons/fa";
import { GrStatusGood } from "react-icons/gr";
import { FiEdit } from "react-icons/fi";
import { BsSendArrowUp } from "react-icons/bs";
import ErrorListModal from "./ErrorListModal";
import EditInvoiceModalNew2 from "./EditInvoiceModalNew2";

export default function SendInvoicesTable({
  records,
  loading,
  onRefresh,
  onClose2,
  customers,
  products,
}) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isEditModalOpen2, setIsEditModalOpen2] = useState(false);
  const [isEditModalOpen3, setIsEditModalOpen3] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [isInvoice, setIsInvoice] = useState(null);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [errorList, setErrorList] = useState([]);

  const handleDelete = async (row) => {
    try {
      const res = await axiosClient.delete(`/invoices/${row.id}`);

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

  const handleEdit = (row, name) => {
    setSelectedInvoice(row);
    setIsEditModalOpen(true);
    setIsInvoice(name);
  };

  const handleShow = (row, name) => {
    setSelectedInvoice(row);
    setIsEditModalOpen2(true);
    setIsInvoice(name);
  };

  const handleClone = (row) => {
    setSelectedInvoice(row); // فاکتور انتخابی
    setIsInvoice("clone"); // یا می‌توانی false یا مقدار مناسب برای isEditing بگذاری
    setIsEditModalOpen3(true);
  };

  const closeAllModals = () => {
    setIsEditModalOpen(false);
    setIsEditModalOpen2(false);
    setIsEditModalOpen3(false); // مهم!
    setSelectedInvoice(null);
    if (onRefresh) onRefresh();
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setIsEditModalOpen2(false);
    setSelectedInvoice(null);
    // Refresh the data after closing modal
    if (onRefresh) {
      onRefresh();
    }
  };

  const handleSendToMoadian = async (row) => {
    try {
      const res = await axiosClient.post("/invoices/send-to-moadian", {
        ids: [row.id],
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
      const errorMessage =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        "خطا در ارسال فاکتور به مودیان";
      Swal.fire({
        toast: true,
        position: "top-start",
        icon: "error",
        title: errorMessage,
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
        send_to_moadian: false,
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
          popup: "swal2-toast",
        },
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
          popup: "swal2-toast",
        },
      });
    }
  };

  const handleCheckStatus = async (row) => {
    try {
      const referenceNumber = row?.reference_number;
      if (!referenceNumber) {
        Swal.fire({
          icon: "error",
          title: "رفرنس نامبر وجود ندارد.",
          toast: true,
          position: "top-start",
          showConfirmButton: false,
          timer: 4000,
          timerProgressBar: true,
          customClass: { popup: "swal2-toast" },
        });
        return;
      }
      const response = await axiosClient.post("/invoices/check-from-moadian", {
        reference_numbers: [referenceNumber],
      });
      

      // فرمت کردن اطلاعات response برای نمایش در Swal
      const responseData = response.data?.[0];
   
      if (responseData) {
        let htmlContent = `
          <div dir="rtl" style="text-align: right; font-family: 'IRANSans', sans-serif;">
            <div style="margin-bottom: 15px;">
              <strong>رفرنس نامبر:</strong> ${
                responseData.referenceNumber || "-"
              }<br/>
              <strong>وضعیت:</strong> ${responseData.status || "-"}<br/>
              <strong>نتیجه:</strong> ${
                responseData.data?.success ? "موفق" : "ناموفق"
              }
            </div>
        `;

        // نمایش خطاها
        if (responseData.data?.error && responseData.data.error.length > 0) {
          htmlContent += `<div style="margin-top: 15px; padding: 10px; background-color: #fee2e2; border-radius: 5px;">
            <strong style="color: #dc2626;">خطاها:</strong><ul style="margin: 5px 0; padding-right: 20px; color: #dc2626;">`;
          responseData.data.error.forEach((err) => {
            htmlContent += `<li style="margin: 5px 0;">کد: ${err.code} - ${err.message}</li>`;
          });
          htmlContent += `</ul></div>`;
        }

        // نمایش هشدارها
        if (
          responseData.data?.warning &&
          responseData.data.warning.length > 0
        ) {
          htmlContent += `<div style="margin-top: 15px; padding: 10px; background-color: #fef3c7; border-radius: 5px;">
            <strong style="color: #d97706;">هشدارها:</strong><ul style="margin: 5px 0; padding-right: 20px; color: #d97706;">`;
          responseData.data.warning.forEach((warn) => {
            htmlContent += `<li style="margin: 5px 0;">${warn.code || ""} - ${
              warn.message || ""
            }</li>`;
          });
          htmlContent += `</ul></div>`;
        }

        htmlContent += `</div>`;

        Swal.fire({
          icon: responseData.data?.success ? "success" : "error",
          title: "نتیجه چک وضعیت",
          html: htmlContent,
          showConfirmButton: true,
          confirmButtonText: "تأیید",
          confirmButtonColor: "#2563eb",
          background: "#111827",
          color: "#e5e7eb",
          width: "600px",
        });
      } else {
        Swal.fire({
          icon: "info",
          title: "درخواست چک وضعیت ارسال شد.",
          text: "اطلاعاتی در response موجود نیست.",
          showConfirmButton: true,
          confirmButtonText: "تأیید",
          confirmButtonColor: "#2563eb",
          background: "#111827",
          color: "#e5e7eb",
        });
      }

      if (onRefresh) onRefresh();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "خطا در ارسال چک وضعیت",
        toast: true,
        position: "top-start",
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: true,
        customClass: { popup: "swal2-toast" },
      });
    }
  };

  const handleShowErrors = (row) => {
    const errors = row?.error?.error || [];
    setErrorList(errors);
    setIsErrorModalOpen(true);
  };

  const getStatusColor = (status) => {
    if (status === -90) return "text-yellow-400"; // زرد
    if (status === -80 || status === -10) return "text-red-400"; // قرمز
    if (status === 10 || status === 20 || status === 0) return "text-white"; // سفید
    if (status === 100) return "text-green-400"; // سبز
    return "text-gray-300"; // رنگ پیش‌فرض برای مقادیر دیگر
  };

  return (
    <div
      className="overflow-x-auto nice-scrollbar rounded-2xl border border-white/10 bg-white/5 relative"
      style={{ position: "relative", overflowX: "auto", overflowY: "visible" }}
    >
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/60 z-20">
          <Spinner />
        </div>
      )}
      {/* Overlay برای پوشاندن محتوای زیر ستون عملیات */}
      <div
        style={{
          position: "sticky",
          left: 0,
          top: 0,
          bottom: 0,
          width: "200px",
          pointerEvents: "none",
          zIndex: 9,
          background:
            "linear-gradient(to right, transparent 0%, rgba(24, 31, 58, 0.5) 30%, rgba(24, 31, 58, 0.95) 70%, rgba(24, 31, 58, 1) 100%)",
        }}
      />
      <table
        className={`min-w-full text-white ${
          loading ? "opacity-30 pointer-events-none" : ""
        }`}
        style={{ tableLayout: "auto", position: "relative" }}
      >
        <thead>
          <tr className="text-white/80 text-sm bg-[#181f3a]">
          <th className="text-right px-4 py-3 whitespace-nowrap">#</th>
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
            <th className="text-right px-4 py-3 whitespace-nowrap">موضوع</th>
            <th className="text-right px-4 py-3 whitespace-nowrap"></th>
            <th className="text-right px-4 py-3 whitespace-nowrap"></th>
            <th className="text-right px-4 py-3 whitespace-nowrap"></th>
            <th
              className="text-center px-2 py-3 whitespace-nowrap border-r border-white/10 relative"
              style={{
                position: "sticky",
                left: 0,
                backgroundColor: "#181f3a",
                zIndex: 10,
                minWidth: "70px",
                boxShadow: "10px 0 20px rgba(24, 31, 58, 1)",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  right: "-60px",
                  top: 0,
                  bottom: 0,
                  width: "60px",
                  background: "#181f3a",
                  pointerEvents: "none",
                  zIndex: 11,
                }}
              />
              عملیات
            </th>
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
              className={`odd:bg-white/5 even:bg-white/10 border-t border-white/5 ${getStatusColor(
                r.status
              )}`}
            >
              <td className="px-4 py-3  text-sm whitespace-nowrap">
                {r?.id}
              </td>
              <td className="px-4 py-3  text-sm whitespace-nowrap">
                {r?.status_label}
              </td>
              <td className="px-4 py-3  text-sm whitespace-nowrap">
                {r.taxid ? r.taxid : "-"}
              </td>
              <td className="px-4 py-3  text-sm whitespace-nowrap">
                {r?.customer?.name} {r?.customer?.last_name}
              </td>
              <td className="px-4 py-3  text-sm whitespace-nowrap">
                {convertToPersianDate(r.indatim)}
              </td>
              <td className="px-4 py-3  text-sm truncate max-w-[200px]">
                {r.tadis ? Number(r.tadis).toLocaleString() : "-"}
              </td>
              <td className="px-4 py-3  text-sm truncate max-w-[240px]">
                {r.inty_label}
              </td>
              <td className="px-4 py-3  text-sm truncate max-w-[240px]">
                {r.ins_label}
              </td>
              <td className="px-4 py-3  text-sm truncate max-w-[240px]">
              
              </td>
              <td className="px-4 py-3  text-sm truncate max-w-[240px]">
              
              </td>
              <td className="px-4 py-3  text-sm truncate max-w-[240px]">  </td>
              <td
                className="px-2 py-3 text-sm border-r border-white/5 relative"
                style={{
                  position: "sticky",
                  left: 0,
                  zIndex: 10,
                  minWidth: "160px",
                  backgroundColor:
                    i % 2 === 0 ? "rgb(27, 33, 60)" : "rgb(30, 35, 62)",
                  boxShadow: "10px 0 20px rgba(0, 0, 0, 0.5)",
                }}
              >
             
                <div className="grid grid-cols-4 sm:gap-4 lg:gap-1 justify-items-center">
                  {r.can_update === true && (
                    <>
                      <div className="relative group">
                        <button
                          className="p-1 rounded hover:bg-blue-500/20 text-blue-500"
                          onClick={() => handleEdit(r, "edit")}
                        >
                          <FiEdit2 className="w-4 h-4" />
                        </button>
                        <div className="absolute right-full top-1/2 transform -translate-y-1/2 mr-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                          ویرایش
                        </div>
                      </div>
                    </>
                  )}

                  {r.can_delete === true && (
                    <>
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
                    </>
                  )}

                  {(r.status === 0 ||
                    r.status === -10 ||
                    r.status === -80 ||
                    r.status === -90) && (
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
                  )}
                  {r.can_cancel === true && (
                    <>
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
                    </>
                  )}
                  {r.taxid !== null && (
                    <div className="relative group">
                      <button
                        className="p-1 rounded hover:bg-blue-500/20 text-blue-500"
                        onClick={() => handleCheckStatus(r)}
                      >
                        <GrStatusGood className="w-4 h-4" />
                      </button>
                      <div className="absolute left-full top-1/2 transform -translate-y-1/2 mr-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                        چک وضعیت
                      </div>
                    </div>
                  )}
                  {(r.status == -10 || r.status == -80 || r.status == -90) && (
                    <div className="relative group">
                      <button
                        className="p-1 rounded hover:bg-green-500/20 text-green-500"
                        onClick={() => handleShowErrors(r)}
                      >
                        <FaRegListAlt className="w-4 h-4" />
                      </button>
                      <div className="absolute left-full top-1/2 transform -translate-y-1/2 mr-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                        لیست خطاها
                      </div>
                    </div>
                  )}
                  {r.can_correction === true && (
                    <>
                      <div className="relative group">
                        <button
                          className="p-1 rounded hover:bg-red-500/20 text-red-500"
                          onClick={() => handleEdit(r, "correction")}
                        >
                          <FiEdit className="w-4 h-4" />
                        </button>
                        <div className="absolute left-full top-1/2 transform -translate-y-1/2 mr-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                          اصلاح
                        </div>
                      </div>
                    </>
                  )}
                  <div className="relative group">
                    <button
                      className="p-1 rounded hover:bg-green-500/20 text-green-500"
                      onClick={() => handleShow(r)}
                    >
                      <MdOutlineSlideshow className="w-4 h-4" />
                    </button>
                    <div className="absolute left-full top-1/2 transform -translate-y-1/2 mr-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                      نمایش
                    </div>
                  </div>
                  <div className="relative group">
                    <button
                      className="p-1 rounded hover:bg-green-500/20 text-green-500"
                      onClick={() => handleClone(r)}
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
        isEditing={isInvoice}
        onRefresh={onRefresh}
        onClose2={onClose2}
        customers={customers}
        products={products}
      />

      {/* EditInvoiceModalShow */}
      <EditInvoiceModalShow
        isOpen={isEditModalOpen2}
        onClose={closeEditModal}
        invoiceData={selectedInvoice}
        isEditing={isInvoice}
        customers={customers}
        products={products}
      />

      <ErrorListModal
        isOpen={isErrorModalOpen}
        onClose={() => setIsErrorModalOpen(false)}
        errors={errorList}
      />

      <EditInvoiceModalNew2
        isOpen={isEditModalOpen3}
        onClose={closeAllModals}
        invoiceData={selectedInvoice}
        isEditing={isInvoice}
        onRefresh={onRefresh}
        onClose2={closeAllModals}
        customers={customers}
        products={products}
      />
    </div>
  );
}

SendInvoicesTable.propTypes = {
  records: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  onRefresh: PropTypes.func.isRequired,
  onClose2: PropTypes.func.isRequired,
  customers: PropTypes.array.isRequired,
  products: PropTypes.array.isRequired,
};
