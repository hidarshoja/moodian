import { GrClose } from "react-icons/gr";
import {
  FaMoneyCheckAlt,
  FaExchangeAlt,
  FaListAlt,
  FaIdCard,
} from "react-icons/fa";


export default function SettlementDetailsModal({ isOpen, onClose, record }) {
  if (!isOpen || !record) return null;

  const { customer, user, ...row } = record;
  const visibleFields = [
    { label: "وضعیت ارسال", value: row.title, icon: <FaExchangeAlt /> },
    { label: "وضعیت ", value: row.status, icon: <FaListAlt /> },
    { label: "فاکتور برگشتی", value: row.returned_invoice, icon: <FaListAlt /> },
    { label: "فاکتور اصلاحی", value: row.corrective_invoice, icon: <FaIdCard /> },
    { label: "فاکتور اصلی", value: row?.original_invoice, icon: <FaIdCard /> },
    { label: "فاکتور ابطالی", value: row?.cancellation_invoice, icon: <FaIdCard /> },
  ];

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
            <FaMoneyCheckAlt className="text-blue-400 w-5 h-5" />
            <span className="text-white text-lg font-bold">جزئیات تسویه</span>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {visibleFields
              .filter(
                (f) =>
                  f.value !== null && f.value !== undefined && f.value !== ""
              )
              .map((field, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 bg-white/5 rounded-lg"
                >
                  <span className="flex items-center gap-2 text-white/70 text-sm">
                    {field.icon}
                    {field.label}:
                  </span>
                  <span className="text-white font-medium text-left" dir="auto">
                    {field.value}
                  </span>
                </div>
              ))}
          </div>
        </div>
        {/* Actions */}
        <div className="flex items-center justify-end gap-3 px-6 pb-6 pt-4 border-t border-white/10">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-xl border border-white/10 text-white/80 bg-purple-700 hover:bg-purple-800 transition-all"
          >
            بستن
          </button>
        </div>
      </div>
    </div>
  );
}
