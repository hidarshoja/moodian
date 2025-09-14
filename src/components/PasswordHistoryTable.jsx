import {
  FaEye,
  FaTrash,
  FaClock,
  FaUser,
  FaShieldAlt,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

export default function PasswordHistoryTable({
  records,
  onView,

  onDelete,
}) {
  const getStatusColor = (status) => {
    switch (status) {
      case "موفق":
        return "bg-green-500/20 text-green-400";
      case "ناموفق":
        return "bg-red-500/20 text-red-400";
      case "در انتظار تایید":
        return "bg-yellow-500/20 text-yellow-400";
      case "رد شده":
        return "bg-red-500/20 text-red-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "موفق":
        return <FaCheckCircle className="w-4 h-4 text-green-400" />;
      case "ناموفق":
        return <FaTimesCircle className="w-4 h-4 text-red-400" />;
      case "در انتظار تایید":
        return <FaClock className="w-4 h-4 text-yellow-400" />;
      case "رد شده":
        return <FaTimesCircle className="w-4 h-4 text-red-400" />;
      default:
        return <FaClock className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <div className="overflow-x-auto nice-scrollbar rounded-2xl border border-white/10 bg-white/5">
      <table className="min-w-full">
        <thead>
          <tr className="text-white/80 text-sm bg-[#181f3a]">
            <th className="text-right px-4 py-3 whitespace-nowrap">ردیف</th>
            <th className="text-right px-4 py-3 whitespace-nowrap">
              نام کاربری
            </th>
            <th className="text-right px-4 py-3 whitespace-nowrap">
              دلیل تغییر
            </th>
            <th className="text-right px-4 py-3 whitespace-nowrap">وضعیت</th>
            <th className="text-right px-4 py-3 whitespace-nowrap">
              تاریخ درخواست
            </th>
            <th className="text-right px-4 py-3 whitespace-nowrap">
              تاریخ تغییر
            </th>
            <th className="text-right px-4 py-3 whitespace-nowrap">IP آدرس</th>
            <th className="text-right px-4 py-3 whitespace-nowrap">عملیات</th>
          </tr>
        </thead>
        <tbody>
          {records.length === 0 && (
            <tr>
              <td
                colSpan={8}
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
                <div className="flex items-center gap-2">
                  <FaUser className="text-blue-400 w-4 h-4" />
                  {record.username}
                </div>
              </td>
              <td className="px-4 py-3 text-white/90 text-sm truncate max-w-[200px]">
                {record.reason}
              </td>
              <td className="px-4 py-3 text-white/90 text-sm whitespace-nowrap">
                <div className="flex items-center gap-2">
                  {getStatusIcon(record.status)}
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      record.status
                    )}`}
                  >
                    {record.status}
                  </span>
                </div>
              </td>
              <td className="px-4 py-3 text-white/90 text-sm whitespace-nowrap">
                <div className="flex items-center gap-2">
                  <FaClock className="text-yellow-400 w-4 h-4" />
                  {record.requestDate}
                </div>
              </td>
              <td className="px-4 py-3 text-white/90 text-sm whitespace-nowrap">
                <div className="flex items-center gap-2">
                  <FaShieldAlt className="text-green-400 w-4 h-4" />
                  {record.changeDate || "-"}
                </div>
              </td>
              <td className="px-4 py-3 text-white/90 text-sm whitespace-nowrap font-mono">
                {record.ipAddress}
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
