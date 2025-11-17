import { useMemo } from "react";
import PropTypes from "prop-types";
import { GrClose } from "react-icons/gr";
import {
  FaUniversity,
  FaCalendarAlt,
  FaMoneyBillAlt,
  FaAddressCard,
  FaBuilding,
} from "react-icons/fa";
import { BiMoneyWithdraw, BiWalletAlt } from "react-icons/bi";
import { AiOutlineBank } from "react-icons/ai";
import { IoDocumentTextOutline } from "react-icons/io5";
import { HiOutlineStatusOnline } from "react-icons/hi";
import { FiHash } from "react-icons/fi";
import { MdAccountBalanceWallet } from "react-icons/md";
import { convertToPersianDate } from "../utils/change-date";

export default function BillDetailsModal({ isOpen, onClose, record }) {
  const visibleFields = useMemo(() => {
    if (!record) return [];

    const row = record;
    const isDeposit = row.coefficient === 1;
    const transactionType = isDeposit ? "واریز" : "برداشت";

    const fields = [
      {
        label: "سرویس دهنده",
        value: row.provider_label,
        icon: <FaUniversity />,
      },
      {
        label: "واریز/برداشت",
        value: transactionType,
        icon: <BiMoneyWithdraw />,
        color: isDeposit ? "text-green-400" : "text-red-400",
      },
      { label: "بانک", value: row?.bank_label, icon: <AiOutlineBank /> },
      {
        label: "تاریخ تراکنش",
        value: convertToPersianDate(row?.date),
        icon: <FaCalendarAlt />,
      },
      {
        label: "مبلغ",
        value: Number(row.amount).toLocaleString(),
        icon: <FaMoneyBillAlt />,
      },
      {
        label: "توضیحات",
        value: row?.description,
        icon: <IoDocumentTextOutline />,
      },
      {
        label: "وضعیت",
        value: row?.status_label,
        icon: <HiOutlineStatusOnline />,
      },
      { label: "کدپیگیری", value: row?.tracking_code, icon: <FiHash /> },
      {
        label: "اکانت مبدا",
        value: row?.source_account,
        icon: <MdAccountBalanceWallet />,
      },
      {
        label: "اکانت مقصد",
        value: row?.destination_account,
        icon: <FaAddressCard />,
      },
      { label: "کدشعبه", value: row?.branch_code, icon: <FaBuilding /> },
      {
        label: "موجودی بعد از تراکنش",
        value: Number(row?.balance).toLocaleString(),
        icon: <BiWalletAlt />,
      },
    ];

    return fields.filter(
      (f) => f.value !== null && f.value !== undefined && f.value !== ""
    );
  }, [record]);

  if (!isOpen || !record) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur animate-fadeInStagger"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl rounded-2xl bg-[#23234a] border border-white/10 shadow-2xl relative animate-slideIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#0a0a22] rounded-t-2xl">
          <div className="flex items-center gap-3">
            <FaUniversity className="text-blue-400 w-5 h-5" />
            <span className="text-white text-lg font-bold">
              جزئیات صورتحساب
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {visibleFields.map((field, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 bg-white/5 rounded-lg"
              >
                <span className="flex items-center gap-2 text-white/70 text-sm">
                  {field.icon}
                  {field.label}:
                </span>
                <span
                  className={`font-medium text-left text-sm ${
                    field.color || "text-white"
                  }`}
                  dir="auto"
                >
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

BillDetailsModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  record: PropTypes.object,
};
