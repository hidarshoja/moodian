import { useState } from "react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { FaTimes } from "react-icons/fa";

export default function AddCancelModal({ isOpen, onClose, onSave }) {
  const [taxReferenceNumber, setTaxReferenceNumber] = useState("");
  const [issuanceDate, setIssuanceDate] = useState(new Date());

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taxReferenceNumber.trim() && issuanceDate) {
      onSave({
        taxReferenceNumber: taxReferenceNumber.trim(),
        issuanceDate: issuanceDate,
      });
      // Reset form
      setTaxReferenceNumber("");
      setIssuanceDate(new Date());
      onClose();
    }
  };

  const handleCancel = () => {
    setTaxReferenceNumber("");
    setIssuanceDate(new Date());
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur animate-fadeInStagger">
      <div className="w-full max-w-2xl rounded-2xl bg-[#23234a] border border-white/10 shadow-2xl relative animate-slideIn max-h-[85vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#0a0a22] rounded-t-2xl flex-shrink-0">
          <h2 className="text-lg font-semibold text-white">
            ابطال فاکتور فروشهای ارسال شده ی خارج از تجربه
          </h2>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-300 transition-colors"
          >
            <FaTimes className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-4">
            {/* Tax Reference Number Input */}
            <div>
              <label className="block text-sm font-medium text-gray-100 mb-2">
                شماره منحصر بفرد مالیاتی مرجع
              </label>
              <input
                type="text"
                value={taxReferenceNumber}
                onChange={(e) => setTaxReferenceNumber(e.target.value)}
                className="w-full bg-gray-800/70 text-white/90 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="شماره منحصر بفرد مالیاتی مرجع را وارد کنید"
                required
              />
            </div>

            {/* Issuance Date Input */}
            <div>
              <label className="block text-sm font-medium text-gray-100 mb-2">
                تاریخ صدور
              </label>
              <DatePicker
                calendar={persian}
                locale={persian_fa}
                value={issuanceDate}
                onChange={setIssuanceDate}
                calendarPosition="bottom-right"
                inputClass="w-full bg-gray-800/70 text-white/90 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                format="YYYY/MM/DD HH:mm:ss"
                required
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-6">
            <button
              type="button"
              onClick={handleCancel}
              className="flex-1 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors"
            >
              انصراف
            </button>
            <button
              type="submit"
              className="btn-custom4"
            >
              ابطال
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
