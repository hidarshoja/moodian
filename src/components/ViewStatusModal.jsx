import { GrClose } from "react-icons/gr";
import {
  FaEye,
  FaFileInvoice,
  FaClock,
  FaUser,
  FaExchangeAlt,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

export default function ViewStatusModal({ isOpen, onClose, record }) {
  if (!isOpen || !record) return null;

  const getStatusColor = (status) => {
    switch (status) {
      case "تایید شده":
        return "text-green-400 bg-green-500/20";
      case "رد شده":
        return "text-red-400 bg-red-500/20";
      case "در انتظار تایید":
        return "text-yellow-400 bg-yellow-500/20";
      case "در حال بررسی":
        return "text-blue-400 bg-blue-500/20";
      case "تکمیل شده":
        return "text-purple-400 bg-purple-500/20";
      default:
        return "text-gray-400 bg-gray-500/20";
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur animate-fadeInStagger"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl rounded-2xl bg-[#23234a] border border-white/10 shadow-2xl relative animate-slideIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#0a0a22] rounded-t-2xl">
          <div className="flex items-center gap-3">
            <FaEye className="text-blue-400 w-5 h-5" />
            <span className="text-white text-lg font-bold">
              مشاهده جزئیات تغییر وضعیت
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white transition-colors"
          >
            <GrClose className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-6">
          {/* Status Change Badge */}
          <div className="mb-6 flex justify-center">
            <div className="flex items-center gap-3">
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                  record.previousStatus
                )}`}
              >
                {record.previousStatus}
              </span>
              <FaExchangeAlt className="text-white/60 w-4 h-4" />
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                  record.newStatus
                )}`}
              >
                {record.newStatus}
              </span>
            </div>
          </div>

          {/* Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Customer Information */}
            <div className="space-y-4">
              <h3 className="text-white text-lg font-semibold mb-4 flex items-center gap-2">
                <FaUser className="text-blue-400" />
                اطلاعات مشتری
              </h3>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <span className="text-white/70 text-sm">نام مشتری:</span>
                  <span className="text-white font-medium">
                    {record.customerName}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <span className="text-white/70 text-sm">کد فاکتور:</span>
                  <span className="text-white font-medium font-mono">
                    {record.invoiceCode}
                  </span>
                </div>
              </div>
            </div>

            {/* Status Information */}
            <div className="space-y-4">
              <h3 className="text-white text-lg font-semibold mb-4 flex items-center gap-2">
                <FaExchangeAlt className="text-green-400" />
                اطلاعات تغییر وضعیت
              </h3>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <span className="text-white/70 text-sm">وضعیت قبلی:</span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      record.previousStatus
                    )}`}
                  >
                    {record.previousStatus}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <span className="text-white/70 text-sm">وضعیت جدید:</span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      record.newStatus
                    )}`}
                  >
                    {record.newStatus}
                  </span>
                </div>
              </div>
            </div>

            {/* Change Details */}
            <div className="md:col-span-2 space-y-4">
              <h3 className="text-white text-lg font-semibold mb-4 flex items-center gap-2">
                <FaClock className="text-yellow-400" />
                جزئیات تغییر
              </h3>

              <div className="space-y-3">
                <div className="p-4 bg-white/5 rounded-lg">
                  <span className="text-white/70 text-sm block mb-2">
                    دلیل تغییر:
                  </span>
                  <p className="text-white text-sm leading-relaxed">
                    {record.changeReason}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <span className="text-white/70 text-sm flex items-center gap-2">
                      <FaClock className="text-yellow-400" />
                      تاریخ درخواست:
                    </span>
                    <span className="text-white font-medium">
                      {record.requestDate}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <span className="text-white/70 text-sm flex items-center gap-2">
                      <FaCheckCircle className="text-green-400" />
                      تاریخ تغییر:
                    </span>
                    <span className="text-white font-medium">
                      {record.changeDate || "هنوز تغییر نکرده"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 mt-8 pt-6 border-t border-white/10">
            <button
              onClick={onClose}
              className="px-6 py-2 rounded-xl border border-white/10 text-white/80 bg-purple-700 hover:bg-purple-800 transition-all"
            >
              بستن
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
