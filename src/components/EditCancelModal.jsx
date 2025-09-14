import { useState, useEffect } from "react";
import { GrClose } from "react-icons/gr";
import { FaEdit, FaSave, FaTimes } from "react-icons/fa";

const statusOptions = [
  { value: "در انتظار تایید", label: "در انتظار تایید" },
  { value: "تایید شده", label: "تایید شده" },
  { value: "رد شده", label: "رد شده" },
];

const cancelReasons = [
  "خطا در محاسبه مالیات",
  "درخواست مشتری",
  "تکرار فاکتور",
  "خطا در اطلاعات مشتری",
  "خطا در محاسبه قیمت",
  "سایر موارد",
];

export default function EditCancelModal({ isOpen, onClose, record, onSave }) {
  const [form, setForm] = useState({
    customerName: "",
    invoiceCode: "",
    invoiceDate: "",
    amount: "",
    cancelReason: "",
    status: "در انتظار تایید",
    requestDate: "",
  });

  useEffect(() => {
    if (record) {
      setForm({
        customerName: record.customerName || "",
        invoiceCode: record.invoiceCode || "",
        invoiceDate: record.invoiceDate || "",
        amount: record.amount || "",
        cancelReason: record.cancelReason || "",
        status: record.status || "در انتظار تایید",
        requestDate: record.requestDate || "",
      });
    }
  }, [record]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur animate-fadeInStagger"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl max-h-[90vh] rounded-2xl bg-[#23234a] border border-white/10 shadow-2xl relative animate-slideIn flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#0a0a22] rounded-t-2xl">
          <div className="flex items-center gap-3">
            <FaEdit className="text-yellow-400 w-5 h-5" />
            <span className="text-white text-lg font-bold">
              ویرایش درخواست ابطال
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white transition-colors"
          >
            <GrClose className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="px-6 py-4 flex-1 overflow-y-auto nice-scrollbar"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Customer Information */}
            <div className="space-y-3">
              <h3 className="text-white text-base font-semibold mb-3">
                اطلاعات مشتری
              </h3>

              <div>
                <label className="block mb-2 text-white text-sm">
                  نام مشتری
                </label>
                <input
                  name="customerName"
                  value={form.customerName}
                  onChange={handleChange}
                  className="w-full rounded-xl bg-gray-800/70 text-white/90 border border-white/10 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-white/20"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 text-white text-sm">
                  کد فاکتور
                </label>
                <input
                  name="invoiceCode"
                  value={form.invoiceCode}
                  onChange={handleChange}
                  className="w-full rounded-xl bg-gray-800/70 text-white/90 border border-white/10 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-white/20 font-mono"
                  required
                />
              </div>
            </div>

            {/* Invoice Information */}
            <div className="space-y-3">
              <h3 className="text-white text-base font-semibold mb-3">
                اطلاعات فاکتور
              </h3>

              <div>
                <label className="block mb-2 text-white text-sm">
                  تاریخ فاکتور
                </label>
                <input
                  name="invoiceDate"
                  value={form.invoiceDate}
                  onChange={handleChange}
                  className="w-full rounded-xl bg-gray-800/70 text-white/90 border border-white/10 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-white/20"
                  placeholder="1403/01/15"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 text-white text-sm">
                  مبلغ فاکتور (ریال)
                </label>
                <input
                  name="amount"
                  type="number"
                  value={form.amount}
                  onChange={handleChange}
                  className="w-full rounded-xl bg-gray-800/70 text-white/90 border border-white/10 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-white/20"
                  required
                />
              </div>
            </div>

            {/* Cancellation Details */}
            <div className="md:col-span-2 space-y-3">
              <h3 className="text-white text-base font-semibold mb-3">
                جزئیات ابطال
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 text-white text-sm">
                    دلیل ابطال
                  </label>
                  <select
                    name="cancelReason"
                    value={form.cancelReason}
                    onChange={handleChange}
                    className="w-full rounded-xl bg-gray-800/70 text-white/90 border border-white/10 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-white/20"
                    required
                  >
                    <option value="" className="bg-gray-800 text-white">
                      انتخاب دلیل ابطال
                    </option>
                    {cancelReasons.map((reason) => (
                      <option
                        key={reason}
                        value={reason}
                        className="bg-gray-800 text-white"
                      >
                        {reason}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block mb-2 text-white text-sm">وضعیت</label>
                  <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    className="w-full rounded-xl bg-gray-800/70 text-white/90 border border-white/10 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-white/20"
                    required
                  >
                    {statusOptions.map((option) => (
                      <option
                        key={option.value}
                        value={option.value}
                        className="bg-gray-800 text-white"
                      >
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block mb-2 text-white text-sm">
                  تاریخ درخواست
                </label>
                <input
                  name="requestDate"
                  value={form.requestDate}
                  onChange={handleChange}
                  className="w-full rounded-xl bg-gray-800/70 text-white/90 border border-white/10 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-white/20"
                  placeholder="1403/01/20"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 text-white text-sm">
                  توضیحات اضافی (اختیاری)
                </label>
                <textarea
                  name="additionalNotes"
                  value={form.additionalNotes || ""}
                  onChange={handleChange}
                  rows={2}
                  className="w-full rounded-xl bg-gray-800/70 text-white/90 border border-white/10 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-white/20 resize-none"
                  placeholder="توضیحات اضافی در مورد درخواست ابطال..."
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-white/10 flex-shrink-0">
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-2 rounded-xl border border-white/10 text-white/80 bg-purple-700 hover:bg-purple-800 transition-all flex items-center gap-2"
            >
              <FaTimes className="w-4 h-4" />
              انصراف
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-xl bg-pink-300 text-[#23234a] font-bold hover:bg-pink-400 transition-all flex items-center gap-2"
            >
              <FaSave className="w-4 h-4" />
              ذخیره تغییرات
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
