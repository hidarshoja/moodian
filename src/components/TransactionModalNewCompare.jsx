import PropTypes from "prop-types";
import { convertToPersianDate } from "../utils/change-date";

function Spinner() {
  return (
    <div className="flex justify-center items-center w-full h-60">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-400"></div>
    </div>
  );
}

export default function TransactionModalNewCompare({ transaction, onClose, loading }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur animate-fadeInStagger">
      <div
        className="w-full max-w-2xl flex flex-col rounded-2xl bg-[#23234a] border border-white/10 shadow-2xl relative animate-slideIn max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#0a0a22] rounded-t-2xl flex-shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-white text-lg font-bold">لیست فاکتور</span>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white transition-colors"
          >
            X
          </button>
        </div>
        <div className="nice-scrollbar rounded-b-2xl border border-white/10 bg-white/5 relative flex-1 overflow-y-auto min-h-0">
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/60 z-20 rounded-b-2xl">
              <Spinner />
            </div>
          )}

          {/* Desktop Table View */}
          <div
            className={`hidden md:block overflow-x-auto ${
              loading ? "opacity-30 pointer-events-none" : ""
            }`}
          >
            <table className="min-w-full text-white">
              <thead>
                <tr className="text-white/80 text-sm bg-[#181f3a]">
                  <th className="text-right px-4 py-3 whitespace-nowrap">#</th>
                  <th className="text-right px-4 py-3 whitespace-nowrap">
                    {" "}
                    نوع{" "}
                  </th>
                  <th className="text-right px-4 py-3 whitespace-nowrap">
                    تاریخ تراکنش{" "}
                  </th>
                  <th className="text-right px-4 py-3 whitespace-nowrap">
                    کد پیگیری{" "}
                  </th>
                  <th className="text-right px-4 py-3 whitespace-nowrap">
                    {" "}
                    taxid{" "}
                  </th>
                  <th className="text-center px-4 py-3 whitespace-nowrap">
                    وضعیت
                  </th>
                  <th className="text-center px-4 py-3 whitespace-nowrap">
                    مبلغ{" "}
                  </th>
                </tr>
              </thead>
              <tbody>
                {(!transaction || transaction?.length === 0) && (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-4 py-6 text-center text-white/60 text-sm"
                    >
                      موردی ثبت نشده است.
                    </td>
                  </tr>
                )}
                {transaction?.map((r, i) => (
                  <tr
                    key={r.id ?? i}
                    className="odd:bg-white/5 even:bg-white/10 border-t border-white/5"
                  >
                    <td className="px-4 py-3 text-white/90 text-sm whitespace-nowrap">
                      {r?.id}
                    </td>
                    <td className="px-4 py-3 text-white/90 text-sm whitespace-nowrap">
                      {r?.inp_label}
                    </td>
                    <td className="px-4 py-3 text-white/90 text-sm whitespace-nowrap">
                      {convertToPersianDate(r?.created_at)}
                    </td>
                    <td className="px-4 py-3 text-white/90 text-sm whitespace-nowrap">
                      {r?.serial_number}
                    </td>
                    <td className="px-4 py-3 text-white/90 text-sm whitespace-nowrap">
                      {r?.taxid}
                    </td>
                    <td className="px-4 py-3 text-white/90 text-sm whitespace-nowrap">
                      {r?.status_label}
                    </td>
                    <td className="px-4 py-3 text-white/90 text-sm whitespace-nowrap">
                      {new Intl.NumberFormat("fa-IR").format(r?.tadis)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile/Tablet Card View */}
          <div
            className={`md:hidden space-y-3 p-3 ${
              loading ? "opacity-30 pointer-events-none" : ""
            }`}
          >
            {(!transaction || transaction?.length === 0) && (
              <div className="px-4 py-6 text-center text-white/60 text-sm">
                موردی ثبت نشده است.
              </div>
            )}
            {transaction?.map((r, i) => (
              <div
                key={r.id ?? i}
                className={`rounded-lg p-4 text-white ${
                  i % 2 === 0
                    ? "bg-gray-600 hover:bg-gray-700"
                    : "bg-gray-500 hover:bg-gray-600"
                } transition-colors`}
              >
                <div className="space-y-2">
                  <div className="flex justify-between items-center border-b border-white/20 pb-2">
                    <span className="text-xs text-white/70">#:</span>
                    <span className="text-sm font-medium text-white/90">
                      {r?.id}
                    </span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/20 pb-2">
                    <span className="text-xs text-white/70">نوع:</span>
                    <span className="text-sm font-medium text-white/90">
                      {r?.inp_label}
                    </span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/20 pb-2">
                    <span className="text-xs text-white/70">تاریخ تراکنش:</span>
                    <span className="text-sm font-medium text-white/90">
                      {convertToPersianDate(r?.created_at)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/20 pb-2">
                    <span className="text-xs text-white/70">کد پیگیری:</span>
                    <span className="text-sm font-medium text-white/90">
                      {r?.serial_number}
                    </span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/20 pb-2">
                    <span className="text-xs text-white/70">taxid:</span>
                    <span className="text-sm font-medium text-white/90">
                      {r?.taxid}
                    </span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/20 pb-2">
                    <span className="text-xs text-white/70">وضعیت:</span>
                    <span className="text-sm font-medium text-white/90">
                      {r?.status_label}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pb-2">
                    <span className="text-xs text-white/70">مبلغ:</span>
                    <span className="text-sm font-medium text-white/90">
                      {new Intl.NumberFormat("fa-IR").format(r?.tadis)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* <Pagination
            meta={meta}
            pageCount={pageCount}
            setPageCount={setPageCount}
            setLoading={setLoading}
          /> */}
        </div>
      </div>
    </div>
  );
}

TransactionModalNewCompare.propTypes = {
  transaction: PropTypes.array,
  onClose: PropTypes.func,
  loading: PropTypes.bool,
};
