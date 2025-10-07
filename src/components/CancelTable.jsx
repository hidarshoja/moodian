import { FaEye, FaEdit, FaTrash, FaCheck, FaTimes } from "react-icons/fa";
import { convertToPersianDate } from "../utils/change-date";
import Spinner from "../utils/Spinner";

export default function CancelTable({
  records,
  onView,
  onEdit,
  onDelete,
  onApprove,
  onReject,
  loading
}) {
  return (
    <div className="overflow-x-auto nice-scrollbar rounded-2xl border border-white/10 bg-white/5 relative">
        {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/60 z-20">
                <Spinner />
              </div>
            )}
      <table  className={`min-w-full text-white ${
          loading ? "opacity-30 pointer-events-none" : ""
        }`}>
        <thead>
          <tr className="text-white/80 text-sm bg-[#181f3a]">
            <th className="text-right px-4 py-3 whitespace-nowrap">ردیف</th>
            <th className="text-right px-4 py-3 whitespace-nowrap">
              نام مشتری
            </th>
            <th className="text-right px-4 py-3 whitespace-nowrap">
            نوع صورتحساب
            </th>
            <th className="text-right px-4 py-3 whitespace-nowrap">
              موضوع صورتحساب
            </th>
            <th className="text-right px-4 py-3 whitespace-nowrap">
              الگوی صورتحساب
            </th>
            <th className="text-right px-4 py-3 whitespace-nowrap">
             روش تسویه
            </th>
            <th className="text-right px-4 py-3 whitespace-nowrap">وضعیت</th>
            <th className="text-right px-4 py-3 whitespace-nowrap">
              تاریخ درخواست
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
                {record?.customer?.name}{" "}    {record?.customer?.last_name}
              </td>
              <td className="px-4 py-3 text-white/90 text-sm whitespace-nowrap">
                {record?.inty_label}
              </td>
              <td className="px-4 py-3 text-white/90 text-sm whitespace-nowrap">
                {record?.ins_label}
              </td>
              <td className="px-4 py-3 text-white/90 text-sm whitespace-nowrap">
                {record?.inp_label} 
              </td>
              <td className="px-4 py-3 text-white/90 text-sm truncate max-w-[200px]">
                {record?.setm_label}
              </td>
              <td className="px-4 py-3 text-white/90 text-sm whitespace-nowrap">
                <span
                  className="px-4 py-3 text-white/90 text-sm whitespace-nowrap"
                >
                  {record.status_label }
                </span>
              </td>
              <td className="px-4 py-3 text-white/90 text-sm whitespace-nowrap">
                {convertToPersianDate(record.indati2m)}
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
                  {record.status === "در انتظار تایید" && (
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
                  {/* <button
                    onClick={() => onEdit && onEdit(record)}
                    className="p-1 text-yellow-400 hover:text-yellow-300 transition-colors"
                    title="ویرایش"
                  >
                    <FaEdit className="w-4 h-4" />
                  </button> */}
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
