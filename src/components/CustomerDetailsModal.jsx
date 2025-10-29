import { GrClose } from "react-icons/gr";
import {
  FaUser,
  FaIdCard,
  FaPhone,
  FaAddressCard,
  FaBuilding,
  FaCalendarCheck,
  FaHashtag,
} from "react-icons/fa";
import {
  convertToPersianDate,
  extractTimeFromDate,
} from "../utils/change-date";

export default function CustomerDetailsModal({ isOpen, onClose, record }) {
  if (!isOpen || !record) return null;

  const { customer, user, ...row } = record;

  const visibleFields = [
    { label: "کد یکتای رکورد", value: row.id, icon: <FaHashtag /> },
    { label: "شناسه مشتری", value: row.customer_id, icon: <FaUser /> },
    { label: "کد اقتصادی خریدار", value: row.tins, icon: <FaIdCard /> },
    {
      label: "شماره سریال دستگاه",
      value: row.serial_number,
      icon: <FaIdCard />,
    },
    { label: "شماره مرجع", value: row.reference_number, icon: <FaHashtag /> },
    {
      label: "تاریخ ثبت",
      value: row.created_at ? convertToPersianDate(row.created_at) : null,
      icon: <FaCalendarCheck />,
    },
    {
      label: "آخرین بروزرسانی",
      value: row.updated_at ? convertToPersianDate(row.updated_at) : null,
      icon: <FaCalendarCheck />,
    },
    { label: "شناسه مالیاتی", value: row.taxid, icon: <FaBuilding /> },
    {
      label: "کد ملی/شناسه",
      value: customer?.national_code,
      icon: <FaIdCard />,
    },
    { label: "نام", value: customer?.name, icon: <FaUser /> },
    { label: "نام خانوادگی", value: customer?.last_name, icon: <FaUser /> },
    { label: "کد پستی", value: customer?.postal_code, icon: <FaAddressCard /> },
    {
      label: "نوع",
      value: customer?.type !== null ? customer.type : null,
      icon: <FaUser />,
    },
    { label: "وضعیت رکورد", value: row.status_label, icon: <FaAddressCard /> },
    { label: "نوع صورتحساب", value: row.inty_label, icon: <FaAddressCard /> },
    { label: "نوع فروش", value: row.inp_label, icon: <FaAddressCard /> },
    { label: "شناسه کاربری", value: row.user_id, icon: <FaUser /> },
    { label: "شماره تماس", value: customer?.tel, icon: <FaPhone /> },
    { label: "آدرس", value: customer?.address, icon: <FaAddressCard /> },
    { label: "توضیحات", value: customer?.description, icon: <FaAddressCard /> },
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
            <FaUser className="text-blue-400 w-5 h-5" />
            <span className="text-white text-lg font-bold">جزئیات مشتری</span>
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
