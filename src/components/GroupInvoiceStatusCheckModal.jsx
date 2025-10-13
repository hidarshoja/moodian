import React, { useState } from "react";
import { MdClose } from "react-icons/md";

const GroupInvoiceStatusCheckModal = ({ isOpen, onClose }) => {
  const [autoDisplay, setAutoDisplay] = useState(false);
  const [selectedInvoices, setSelectedInvoices] = useState(new Set());

  // Sample data - replace with actual data from props or API
  const invoiceData = [
    {
      id: 1,
      status: "checked",
      invoiceType: "نوع اول",
      uniqueTaxId: "A3FN1Y04F8D00000000109",
      issueDate: "09:30:00 1404/07/12",
      subject: "اصلی",
      pattern: "الگوی اول (فروش)",
    },
    {
      id: 2,
      status: "checked",
      invoiceType: "نوع اول",
      uniqueTaxId: "A3FN1Y04F4200000000034",
      issueDate: "10:53:45 1404/04/30",
      subject: "اصلی",
      pattern: "الگوی سوم (طلا، جواهر و پلاتین)",
    },
    {
      id: 3,
      status: "unchecked",
      invoiceType: "نوع دوم",
      uniqueTaxId: "A3FN1Y04F8D00000000110",
      issueDate: "11:15:30 1404/07/13",
      subject: "اصلی",
      pattern: "الگوی دوم (فروش ارزی)",
    },
    {
      id: 4,
      status: "checked",
      invoiceType: "نوع اول",
      uniqueTaxId: "A3FN1Y04F8D00000000111",
      issueDate: "14:22:15 1404/07/14",
      subject: "اصلی",
      pattern: "الگوی اول (فروش)",
    },
    {
      id: 5,
      status: "unchecked",
      invoiceType: "نوع دوم",
      uniqueTaxId: "A3FN1Y04F8D00000000112",
      issueDate: "16:45:20 1404/07/15",
      subject: "اصلی",
      pattern: "الگوی سوم (طلا، جواهر و پلاتین)",
    },
    {
      id: 6,
      status: "checked",
      invoiceType: "نوع اول",
      uniqueTaxId: "A3FN1Y04F8D00000000113",
      issueDate: "08:30:10 1404/07/16",
      subject: "اصلی",
      pattern: "الگوی دوم (فروش ارزی)",
    },
  ];

  const handleCheckboxChange = (invoiceId) => {
    const newSelected = new Set(selectedInvoices);
    if (newSelected.has(invoiceId)) {
      newSelected.delete(invoiceId);
    } else {
      newSelected.add(invoiceId);
    }
    setSelectedInvoices(newSelected);
  };

  const handleSend = () => {
    console.log("Sending selected invoices:", Array.from(selectedInvoices));
    // Add your send logic here
    onClose();
  };

  const handleCancel = () => {
    setSelectedInvoices(new Set());
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur bg-black/50">
      <div
        className="w-[90%] max-w-6xl bg-white rounded-lg shadow-2xl relative flex flex-col max-h-[90vh]"
        dir="rtl"
      >
        {/* Header */}
        <div className="bg-[#1A2035] text-white px-6 py-4 rounded-t-lg flex items-center justify-between">
          <div className="flex-1 text-center">
            <h2 className="text-lg font-bold">
              چک وضعیت فاکتور فروش بصورت گروهی
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
          {/* Table Header */}
          <div className="bg-[#1A2035] text-white px-6 py-3 sticky top-0 z-10">
            <div className="grid grid-cols-6 gap-4 text-sm font-medium text-right">
              <div>وضعیت</div>
              <div>نوع فاکتور فروش</div>
              <div>شماره منحصر بفرد مالیاتی</div>
              <div>تاریخ صدور</div>
              <div>موضوع فاکتور فروش</div>
              <div>الگوی فاکتور فروش</div>
            </div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-gray-200">
            {invoiceData.map((invoice) => (
              <div
                key={invoice.id}
                className="grid grid-cols-6 gap-4 px-6 py-4 bg-pink-50 hover:bg-pink-100 transition-colors"
              >
                {/* Status Checkbox */}
                <div className="flex items-center justify-center">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedInvoices.has(invoice.id)}
                      onChange={() => handleCheckboxChange(invoice.id)}
                      className="w-5 h-5 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500 focus:ring-2"
                    />
                  </label>
                </div>

                {/* Invoice Type */}
                <div className="flex items-center text-right">
                  <span className="text-sm text-gray-900">
                    {invoice.invoiceType}
                  </span>
                </div>

                {/* Unique Tax ID */}
                <div className="flex items-center text-right">
                  <span className="text-sm text-gray-900 font-mono">
                    {invoice.uniqueTaxId}
                  </span>
                </div>

                {/* Issue Date */}
                <div className="flex items-center text-right">
                  <span className="text-sm text-gray-900">
                    {invoice.issueDate}
                  </span>
                </div>

                {/* Subject */}
                <div className="flex items-center text-right">
                  <span className="text-sm text-gray-900">
                    {invoice.subject}
                  </span>
                </div>

                {/* Pattern */}
                <div className="flex items-center text-right">
                  <span className="text-sm text-gray-900">
                    {invoice.pattern}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination Info */}
        <div className="px-6 py-2 bg-gray-50 border-t border-gray-200">
          <div className="text-sm text-gray-600">
            of {invoiceData.length} items {invoiceData.length}-1
          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#1A2035] text-white px-6 py-4 rounded-b-lg flex items-center justify-between">
          {/* Cancel Button */}
          <button
            onClick={handleCancel}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            انصراف
          </button>

          {/* Auto Display Toggle */}
          <div className="flex items-center gap-3">
            <span className="text-sm">نمایش بصورت اتوماتیک</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={autoDisplay}
                onChange={(e) => setAutoDisplay(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          {/* Send Button */}
          <button
            onClick={handleSend}
            className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            ارسال
          </button>
        </div>
      </div>
    </div>
  );
};

export default GroupInvoiceStatusCheckModal;
