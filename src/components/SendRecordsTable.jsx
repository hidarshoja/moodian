import Spinner from "../utils/Spinner";
import PropTypes from "prop-types";
import { useState } from "react";
import SendStatusDetailsModal from "./SendStatusDetailsModal";

export default function SendRecordsTable({ records, loading , setStemId , setSelectedProductId , setSelectedCustomerId , setStatusId ,statusId , setStatusName }) {
  const [openDetail, setOpenDetail] = useState(null);

  // فیلتر کردن رکوردهایی که status آنها null است
  const filteredRecords = Array.isArray(records)
    ? records.filter((r) => r.status !== null)
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
              {" "}
              وضعیت ارسال{" "}
            </th>
            <th className="text-right px-4 py-3 whitespace-nowrap">
              فاکتور اصلی
            </th>
            <th className="text-right px-4 py-3 whitespace-nowrap">
              فاکتور اصلاحی
            </th>
            <th className="text-right px-4 py-3 whitespace-nowrap">
              فاکتور برگشتی
            </th>
            <th className="text-right px-4 py-3 whitespace-nowrap">
              فاکتور ابطالی
            </th>
            <th className="text-right px-4 py-3 whitespace-nowrap">خالص</th>
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
          {filteredRecords?.length > 0 && filteredRecords?.map((r, i) => (
              <tr
              key={i}
              className={`odd:bg-white/5 even:bg-white/10 border-t border-white/5 ${
                statusId === r.status
                  ? "klickBtnTD"
                  : ""
              }`}
              onClick={() => {
              // setStemId(null);
             //  setSelectedCustomerId(null); 
             //  setSelectedProductId(null);
               setStatusId(r.status); 
               setStatusName(r);        
             }}
              style={{ cursor: "pointer" }}
            >
              <td
                className="px-4 py-3 text-white/90 text-sm whitespace-nowrap cursor-pointer underline hover:text-blue-300"
                onClick={() => setOpenDetail(r)}
              >
                {r?.title}
              </td>
              <td className="px-4 py-3 text-white/90 text-sm whitespace-nowrap">
                {new Intl.NumberFormat('fa-IR').format(r?.original_invoice)}
              </td>
              <td className="px-4 py-3 text-white/90 text-sm whitespace-nowrap">
                {new Intl.NumberFormat('fa-IR').format(r?.corrective_invoice)}
              </td>
              <td className="px-4 py-3 text-white/90 text-sm whitespace-nowrap">
                {new Intl.NumberFormat('fa-IR').format(r?.returned_invoice)}
              </td>
              <td className="px-4 py-3 text-white/90 text-sm truncate max-w-[200px]">
                {new Intl.NumberFormat('fa-IR').format(r?.cancellation_invoice)}
              </td>
              <td className="px-4 py-3 text-white/90 text-sm truncate max-w-[200px]">
              {new Intl.NumberFormat('fa-IR').format(
                Number(r?.original_invoice) +
              Number(r?.corrective_invoice) +
               Number(r?.returned_invoice)
              )}
               </td>
            </tr>
          ))}
        </tbody>
      </table>
      {openDetail && (
        <SendStatusDetailsModal
          isOpen={!!openDetail}
          record={openDetail}
          onClose={() => setOpenDetail(null)}
        />
      )}
    </div>
  );
}

SendRecordsTable.propTypes = {
  records: PropTypes.array.isRequired,
  loading: PropTypes.bool,
  setStemId: PropTypes.func,
  setSelectedCustomerId : PropTypes.func,
  setSelectedProductId: PropTypes.func,
  statusId: PropTypes.number,
  setStatusId: PropTypes.func,
};
