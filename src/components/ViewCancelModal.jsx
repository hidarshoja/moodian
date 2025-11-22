import { GrClose } from "react-icons/gr";
import { convertToPersianDate } from "../utils/change-date";
import {
  FaEye,
  FaFileInvoice,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaExclamationTriangle,
  FaClock,
  FaUser,
} from "react-icons/fa";

export default function ViewCancelModal({ isOpen, onClose, record }) {
 
  if (!isOpen || !record) return null;



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
              مشاهده جزئیات ابطال
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
          {/* Status Badge */}
          <div className="mb-6 flex justify-center">
            <span
              className={`px-4 py-2 rounded-full text-sm font-medium`}
            >
              {record.status}
            </span>
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
                    {record?.customer?.name}{" "}    {record?.customer?.last_name}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <span className="text-white/70 text-sm"> نوع صورتحساب</span>
                  <span className="text-white font-medium font-mono">
                     {record?.inty_label}
                  </span>
                </div>
              </div>
            </div>

            {/* Invoice Information */}
            <div className="space-y-4">
              <h3 className="text-white text-lg font-semibold mb-4 flex items-center gap-2">
                <FaFileInvoice className="text-green-400" />
                اطلاعات فاکتور
              </h3>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <span className="text-white/70 text-sm">تاریخ فاکتور:</span>
                  <span className="text-white font-medium">
                    {record?.j_indatim}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <span className="text-white/70 text-sm">مبلغ فاکتور:</span>
                  <span className="text-white font-medium">
                    {record?.tadis.toLocaleString()} ریال
                  </span>
                </div>
              </div>
            </div>

            {/* Cancellation Details */}
            <div className="md:col-span-2 space-y-4">
              <h3 className="text-white text-lg font-semibold mb-4 flex items-center gap-2">
                <FaExclamationTriangle className="text-red-400" />
                جزئیات ابطال
              </h3>

              <div className="space-y-3">
                <div className="p-4 bg-white/5 rounded-lg">
                  <span className="text-white/70 text-sm block mb-2">
                    دلیل ابطال:
                  </span>
                  <p className="text-white text-sm leading-relaxed">
                    {record.cancelReason}
                  </p>
                </div>

                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <span className="text-white/70 text-sm flex items-center gap-2">
                    <FaClock className="text-yellow-400" />
                    تاریخ درخواست:
                  </span>
                  <span className="text-white font-medium">
                     {convertToPersianDate(record.indati2m)}
                  </span>
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
