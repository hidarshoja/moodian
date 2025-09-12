import { GoKey } from "react-icons/go";

export default function ProfileRecordsTable({
  records,
  onDelete,
  onEdit,
  onOpenKeySettings,
}) {
  return (
    <div className="overflow-x-auto nice-scrollbar rounded-2xl border border-white/10 bg-white/5">
      <table className="min-w-full">
        <thead>
          <tr className="text-white/80 text-sm bg-white/10">
            <th className="text-right px-4 py-3 whitespace-nowrap">نام مودی</th>
            <th className="text-right px-4 py-3 whitespace-nowrap">
              نام حافظه مالیاتی
            </th>
            <th className="text-right px-4 py-3 whitespace-nowrap">
              کد حافظه مالیاتی
            </th>
            <th className="text-right px-4 py-3 whitespace-nowrap">
              کد اقتصادی مودی
            </th>
            <th className="text-right px-4 py-3 whitespace-nowrap">
              کلید خصوصی
            </th>
            <th className="text-right px-4 py-3 whitespace-nowrap">آدرس</th>
            <th className="text-right px-4 py-3 whitespace-nowrap">کد پستی</th>
            <th className="text-right px-4 py-3 whitespace-nowrap">تلفن</th>
            <th className="text-center px-4 py-3 whitespace-nowrap">اقدامات</th>
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
          {records.map((r, i) => (
            <tr
              key={i}
              className="odd:bg-white/5 even:bg-white/10 border-t border-white/5"
            >
              <td className="px-4 py-3 text-white/90 text-sm whitespace-nowrap">
                {r.taxpayerName}
              </td>
              <td className="px-4 py-3 text-white/90 text-sm whitespace-nowrap">
                {r.taxMemoryName}
              </td>
              <td className="px-4 py-3 text-white/90 text-sm whitespace-nowrap">
                {r.taxMemoryCode}
              </td>
              <td className="px-4 py-3 text-white/90 text-sm whitespace-nowrap">
                {r.taxpayerEconomicCode}
              </td>
              <td className="px-4 py-3 text-white/90 text-sm truncate max-w-[200px]">
                {r.privateKey}
              </td>
              <td className="px-4 py-3 text-white/90 text-sm truncate max-w-[240px]">
                {r.address}
              </td>
              <td className="px-4 py-3 text-white/90 text-sm whitespace-nowrap">
                {r.postalCode}
              </td>
              <td className="px-4 py-3 text-white/90 text-sm whitespace-nowrap">
                {r.phone}
              </td>
              <td className="px-2 py-2">
                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={() => onDelete?.(i)}
                    title="حذف"
                    className="p-2 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/15"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5"
                    >
                      <path d="M9 3a1 1 0 0 0-1 1v1H5.5a1 1 0 1 0 0 2H6v12a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V7h.5a1 1 0 1 0 0-2H16V4a1 1 0 0 0-1-1H9Zm2 4a1 1 0 1 0-2 0v10a1 1 0 1 0 2 0V7Zm4 0a1 1 0 1 0-2 0v10a1 1 0 1 0 2 0V7Z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => onEdit?.(i)}
                    title="ویرایش"
                    className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 hover:bg-amber-500/15"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5"
                    >
                      <path d="M18.375 2.625a3.182 3.182 0 0 1 4.5 4.5L8.81 21.19a3 3 0 0 1-1.27.75l-4.09 1.17a1 1 0 0 1-1.24-1.24l1.17-4.09a3 3 0 0 1 .75-1.27L18.375 2.625Zm-2.12 2.12-12.02 12.02a1 1 0 0 0-.25.42l-.65 2.28 2.28-.65a1 1 0 0 0 .42-.25l12.02-12.02-1.75-1.8Z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => onOpenKeySettings?.(i)}
                    title="کلید"
                    className="p-2 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20 hover:bg-blue-500/15"
                  >
                    <GoKey className="w-5 h-5" />
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
