import {
  FaEye,
  FaEdit,
  FaTrash,
  FaCheck,
  FaTimes,
  FaClock,
  FaUser,
} from "react-icons/fa";

export default function StatusTable({
  records,
  onView,
  onEdit,
  onDelete,
  onApprove,
  onReject,
}) {
  const getStatusColor = (status) => {
    switch (status) {
      case "تایید شده":
        return "bg-green-500/20 text-green-400";
      case "رد شده":
        return "bg-red-500/20 text-red-400";
      case "در انتظار تایید":
        return "bg-yellow-500/20 text-yellow-400";
      case "در حال بررسی":
        return "bg-blue-500/20 text-blue-400";
      case "تکمیل شده":
        return "bg-purple-500/20 text-purple-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  return (
    <div className="overflow-x-auto nice-scrollbar rounded-2xl border border-white/10 bg-white/5">
      <table className="min-w-full">
        <thead>
          <tr className="text-white/80 text-sm bg-[#181f3a]">
            <th className="text-right px-4 py-3 whitespace-nowrap">ردیف</th>
            <th className="text-right px-4 py-3 whitespace-nowrap">
              نام مشتری
            </th>
            <th className="text-right px-4 py-3 whitespace-nowrap">
              کد فاکتور
            </th>
            <th className="text-right px-4 py-3 whitespace-nowrap">
              وضعیت قبلی
            </th>
            <th className="text-right px-4 py-3 whitespace-nowrap">
              وضعیت جدید
            </th>
            <th className="text-right px-4 py-3 whitespace-nowrap">
              دلیل تغییر
            </th>
            <th className="text-right px-4 py-3 whitespace-nowrap">
              تاریخ درخواست
            </th>
            <th className="text-right px-4 py-3 whitespace-nowrap">
              تاریخ تغییر
            </th>
            <th className="text-right px-4 py-3 whitespace-nowrap">عملیات</th>
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
          {records.map((record, index) => (
            <tr
              key={index}
              className="odd:bg-white/5 even:bg-white/10 border-t border-white/5"
            >
              <td className="px-4 py-3 text-white/90 text-sm whitespace-nowrap">
                {index + 1}
              </td>
              <td className="px-4 py-3 text-white/90 text-sm whitespace-nowrap">
                {record.customerName}
              </td>
              <td className="px-4 py-3 text-white/90 text-sm whitespace-nowrap">
                {record.invoiceCode}
              </td>
              <td className="px-4 py-3 text-white/90 text-sm whitespace-nowrap">
                <span
                  className={`px-2 py-1 rounded-full text-xs ${getStatusColor(
                    record.previousStatus
                  )}`}
                >
                  {record.previousStatus}
                </span>
              </td>
              <td className="px-4 py-3 text-white/90 text-sm whitespace-nowrap">
                <span
                  className={`px-2 py-1 rounded-full text-xs ${getStatusColor(
                    record.newStatus
                  )}`}
                >
                  {record.newStatus}
                </span>
              </td>
              <td className="px-4 py-3 text-white/90 text-sm truncate max-w-[200px]">
                {record.changeReason}
              </td>
              <td className="px-4 py-3 text-white/90 text-sm whitespace-nowrap">
                {record.requestDate}
              </td>
              <td className="px-4 py-3 text-white/90 text-sm whitespace-nowrap">
                {record.changeDate || "-"}
              </td>
              <td className="px-4 py-3 text-white/90 text-sm whitespace-nowrap">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onView && onView(record)}
                    className="p-1 text-blue-400 hover:text-blue-300 transition-colors"
                    title="مشاهده"
                  >
                    <FaEye className="w-4 h-4" />
                  </button>
                  {record.newStatus === "در انتظار تایید" && (
                    <>
                      <button
                        onClick={() => onApprove && onApprove(record)}
                        className="p-1 text-green-400 hover:text-green-300 transition-colors"
                        title="تایید"
                      >
                        <FaCheck className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onReject && onReject(record)}
                        className="p-1 text-red-400 hover:text-red-300 transition-colors"
                        title="رد"
                      >
                        <FaTimes className="w-4 h-4" />
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => onEdit && onEdit(record)}
                    className="p-1 text-yellow-400 hover:text-yellow-300 transition-colors"
                    title="ویرایش"
                  >
                    <FaEdit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDelete && onDelete(record)}
                    className="p-1 text-red-400 hover:text-red-300 transition-colors"
                    title="حذف"
                  >
                    <FaTrash className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
