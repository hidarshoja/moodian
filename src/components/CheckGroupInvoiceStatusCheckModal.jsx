import { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";
import axiosClient from "../axios-client";
import { convertToPersianDate } from "../utils/change-date";
import Swal from "sweetalert2";

const CheckGroupInvoiceStatusCheckModal = ({ isOpen, onClose }) => {
  const [selectedInvoices, setSelectedInvoices] = useState(new Set());
  const [invoiceData, setInvoiceData] = useState([]);

  useEffect(() => {
    axiosClient.get("/invoices?f[status]=-80,-90,-10,0&f[type]=-1").then((response) => {
      setInvoiceData(response.data.data);
    });
  }, []);

  const handleCheckboxChange = (invoiceId) => {
    const newSelected = new Set(selectedInvoices);
    if (newSelected.has(invoiceId)) {
      newSelected.delete(invoiceId);
    } else {
      newSelected.add(invoiceId);
    }
    setSelectedInvoices(newSelected);
  };

  const handleSend = async () => {
    // تبدیل داده به فرمت مورد نظر
    let data = {
      ids: Array.from(selectedInvoices).map((item) => item.toString()),
    };

    try {
      const res = await axiosClient.post(`/invoices/send-to-moadian`, data);

      // Success message
      Swal.fire({
        toast: true,
        position: "top-start",
        icon: "success",
        title: res?.data?.message,
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: true,
        customClass: {
          popup: "swal2-toast",
        },
      });
      setSelectedInvoices(new Set());
      onClose();
    } catch (error) {
      console.error("خطا در اضافه کردن محصول:", error);

      // Extract error message from response
      let errorMessage = "خطا در اضافه کردن محصول";

      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.data?.errors) {
        // Handle validation errors
        const errors = error.response.data.errors;
        const errorMessages = Object.values(errors).flat();
        errorMessage = errorMessages.join("\n");
      } else if (error.message) {
        errorMessage = error.message;
      }

      // Show error message
      Swal.fire({
        toast: true,
        position: "top-start",
        icon: "error",
        title: errorMessage,
        showConfirmButton: false,
        timer: 5000,
        timerProgressBar: true,
        customClass: {
          popup: "swal2-toast",
        },
      });
    }
  };

  const handleCancel = () => {
    setSelectedInvoices(new Set());
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur bg-black/50">
      <div
        className="w-[90%] max-w-6xl bg-white rounded-lg shadow-2xl relative flex flex-col max-h-[90vh] overflow-y-auto"
        dir="rtl"
      >
        {/* Header */}
        <div className="bg-[#1A2035] text-white px-6 py-4 rounded-t-lg flex items-center justify-between">
          <div className="flex-1 text-center">
            <h2 className="text-base lg:text-lg font-bold">
              ارسال فاکتور فروش بصورت گروهی
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white p-1"
          >
            <MdClose className="w-6 h-6" />
          </button>
        </div>

        {/* Table Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Table Header - Desktop Only */}
          <div className="hidden md:block bg-[#1A2035] text-white px-6 py-3 sticky top-0 z-10">
            <div className="grid grid-cols-6 gap-4 text-sm font-medium text-right">
              <div>وضعیت</div>
              <div>نام مشتری</div>
              <div>شماره منحصر بفرد مالیاتی</div>
              <div>تاریخ صدور</div>
              <div>مبلغ</div>
              <div>الگوی فاکتور فروش</div>
            </div>
          </div>

          {/* Table Body */}
          <div className="bg-[#23234a]">
            {invoiceData.map((invoice, index) => (
              <div key={invoice.id}>
                {/* Mobile/Tablet Card View */}
                <div
                  className={`md:hidden mb-3 mx-4 mt-4 p-4 rounded-lg transition-colors ${
                    index % 2 === 0
                      ? "bg-gray-600 hover:bg-gray-700"
                      : "bg-gray-500 hover:bg-gray-600"
                  }`}
                >
                  <div className="space-y-2">
                    {/* Status Checkbox */}
                    <div className="flex justify-between items-center border-b border-white/20 pb-2">
                      <span className="text-xs text-white/70">وضعیت:</span>
                      <div className="flex items-center gap-2">
                        <label className="flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedInvoices.has(invoice.id)}
                            onChange={() => handleCheckboxChange(invoice.id)}
                            className="w-5 h-5 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500 focus:ring-2"
                          />
                        </label>
                        <span className="text-sm text-gray-100 font-medium">
                          {invoice.status_label}
                        </span>
                      </div>
                    </div>

                    {/* Customer Name */}
                    <div className="flex justify-between items-center border-b border-white/20 pb-2">
                      <span className="text-xs text-white/70">نام مشتری:</span>
                      <span className="text-sm text-gray-100 font-medium">
                        {invoice?.customer?.name} -{" "}
                        {invoice?.customer?.last_name}
                      </span>
                    </div>

                    {/* Unique Tax ID */}
                    <div className="flex justify-between items-center border-b border-white/20 pb-2">
                      <span className="text-xs text-white/70">
                        شماره منحصر بفرد مالیاتی:
                      </span>
                      <span className="text-sm text-gray-100 font-medium font-mono">
                        {invoice.taxid ? invoice.taxid : "-"}
                      </span>
                    </div>

                    {/* Issue Date */}
                    <div className="flex justify-between items-center border-b border-white/20 pb-2">
                      <span className="text-xs text-white/70">تاریخ صدور:</span>
                      <span className="text-sm text-gray-100 font-medium">
                        {convertToPersianDate(invoice.indatim)}
                      </span>
                    </div>

                    {/* Amount */}
                    <div className="flex justify-between items-center border-b border-white/20 pb-2">
                      <span className="text-xs text-white/70">مبلغ:</span>
                      <span className="text-sm text-gray-100 font-medium">
                        {Number(invoice.tadis).toLocaleString()}
                      </span>
                    </div>

                    {/* Pattern */}
                    <div className="flex justify-between items-center pb-2">
                      <span className="text-xs text-white/70">
                        الگوی فاکتور فروش:
                      </span>
                      <span className="text-sm text-gray-100 font-medium">
                        {invoice.ins_label}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Desktop Table View */}
                <div className="hidden md:grid grid-cols-6 gap-4 px-6 py-4 bg-[#23234a] hover:bg-[#3c3c7d] transition-colors">
                  {/* Status Checkbox */}
                  <div className="flex items-center justify-start gap-1">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedInvoices.has(invoice.id)}
                        onChange={() => handleCheckboxChange(invoice.id)}
                        className="w-5 h-5 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500 focus:ring-2"
                      />
                    </label>
                    <span className="text-sm text-gray-100">
                      {invoice.status_label}
                    </span>
                  </div>

                  {/* Invoice Type */}
                  <div className="flex items-center text-right">
                    <span className="text-sm text-gray-100">
                      {invoice?.customer?.name} - {invoice?.customer?.last_name}
                    </span>
                  </div>

                  {/* Unique Tax ID */}
                  <div className="flex items-center text-right">
                    <span className="text-sm text-gray-100 font-mono">
                      {invoice.taxid ? invoice.taxid : "-"}
                    </span>
                  </div>

                  {/* Issue Date */}
                  <div className="flex items-center text-right">
                    <span className="text-sm text-gray-100">
                      {convertToPersianDate(invoice.indatim)}
                    </span>
                  </div>

                  {/* Subject */}
                  <div className="flex items-center text-right">
                    <span className="text-sm text-gray-100">
                      {Number(invoice.tadis).toLocaleString()}
                    </span>
                  </div>

                  {/* Pattern */}
                  <div className="flex items-center text-right">
                    <span className="text-sm text-gray-100">
                      {invoice.ins_label}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#1A2035] text-white px-6 py-4 rounded-b-lg flex items-center justify-between">
          {/* Cancel Button */}
          <button
            onClick={handleCancel}
            className="bg-red-500 hover:bg-red-700 w-1/3 text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            انصراف
          </button>

          {/* Send Button */}
          <button onClick={handleSend} className="btn-custom5">
            ارسال
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckGroupInvoiceStatusCheckModal;
