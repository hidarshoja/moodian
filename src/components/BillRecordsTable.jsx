import Spinner from "../utils/Spinner";
import PropTypes from "prop-types";
import { useState } from "react";
import BillDetailsModal from "./BillDetailsModal";
import { convertToPersianDate } from "../utils/change-date";

export default function BillRecordsTable({
  records,
  loading,
  selectedCustomerId,
  setSelectedCustomerId,
}) {
  const [openDetail, setOpenDetail] = useState(null);

  // فیلتر کردن رکوردهایی که customer_id آنها null است
  const filteredRecords = Array.isArray(records)
    ? records.filter((r) => r.customer_id !== null)
    : [];

  return (
    <div className="overflow-x-auto nice-scrollbar rounded-2xl border border-white/10 bg-white/5 relative">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/60 z-20">
          <Spinner />
        </div>
      )}
      <table
        className={`min-w-full text-white ${
          loading ? "opacity-30 pointer-events-none" : ""
        }`}
      >
        <thead>
          <tr className="text-white/80 text-sm">
            <th className="text-right px-4 py-3 whitespace-nowrap">
              #
            </th>
            <th className="text-right px-4 py-3 whitespace-nowrap">
            سرویس دهنده
            </th>
            <th className="text-right px-4 py-3 whitespace-nowrap">
            واریز/برداشت
            </th>
            <th className="text-right px-4 py-3 whitespace-nowrap">
            بانک
            </th>
            <th className="text-right px-4 py-3 whitespace-nowrap">
            مبلغ
            </th>
            <th className="text-right px-4 py-3 whitespace-nowrap">تاریخ</th>
            <th className="text-right px-4 py-3 whitespace-nowrap">وضعیت</th>
            <th className="text-right px-4 py-3 whitespace-nowrap">کدپیگیری</th>
          </tr>
        </thead>
        <tbody>
          {filteredRecords.length === 0 && (
            <tr>
              <td
                colSpan={9}
                className="px-4 py-6 text-center text-white/60 text-sm"
              >
                موردی ثبت نشده است.
              </td>
            </tr>
          )}
          {filteredRecords?.length > 0 &&
            filteredRecords?.map((r, i) => (
              <tr
                key={i}
                className={`odd:bg-white/5 even:bg-white/10 border-t border-white/5 ${
                  selectedCustomerId === r.id ? "klickBtnTD" : ""
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenDetail(r);
                  setSelectedCustomerId(r.id);
                }}
                style={{ cursor: "pointer" }}
              >
                <td
                  className="px-4 py-3 text-white/90 text-sm whitespace-nowrap cursor-pointer  hover:text-blue-300"
              
                >
                  {r?.id}
                </td>
                <td className="px-4 py-3 text-white/90 text-sm whitespace-nowrap">
                  {r?.provider_label}
                </td>
                <td
  className={`px-4 py-3 text-sm whitespace-nowrap ${
    r?.coefficient === 1 ? "text-green-500" : "text-red-500"
  }`}
>
  {r?.coefficient === 1 ? "واریز" : "برداشت"}
</td>
                <td className="px-4 py-3 text-white/90 text-sm whitespace-nowrap">
                  {r?.bank_label}
                </td>
                <td className="px-4 py-3 text-white/90 text-sm truncate max-w-[200px]">
                  {new Intl.NumberFormat("fa-IR").format(
                    r?.amount
                  )}
                </td>
                <td className="px-4 py-3 text-white/90 text-sm truncate max-w-[200px]">
                  {convertToPersianDate(r?.date)}
                </td>
                <td className="px-4 py-3 text-white/90 text-sm truncate max-w-[200px]">{r?.status_label}  </td>
                <td className="px-4 py-3 text-white/90 text-sm truncate max-w-[200px]">{r?.tracking_code}</td>
              </tr>
            ))}
        </tbody>
      </table>
      {openDetail && (
        <BillDetailsModal
          isOpen={!!openDetail}
          record={openDetail}
          onClose={() => setOpenDetail(null)}
        />
      )}
    </div>
  );
}

BillRecordsTable.propTypes = {
  records: PropTypes.array.isRequired,
  loading: PropTypes.bool,
  selectedCustomerId: PropTypes.number,
  setSelectedCustomerId: PropTypes.func,
  setSelectedCustomer: PropTypes.func,
};
