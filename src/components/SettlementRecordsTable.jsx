import Spinner from "../utils/Spinner";
import PropTypes from "prop-types";
import { useState } from "react";
import SettlementDetailsModal from "./SettlementDetailsModal";

export default function SettlementRecordsTable({ records, loading , stemId, setStemId , setSelectedCustomerId , setSelectedProductId , setStem }) {
  const [openDetail, setOpenDetail] = useState(null);
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
              روش تسویه{" "}
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
             className={`odd:bg-white/5 even:bg-white/10 border-t border-white/5 ${
              stemId === r.setm
                 ? "klickBtnTD"
                 : ""
             }`}
             onClick={() => {
              setStemId(r.setm);
              setStem(r.setm);
              setSelectedCustomerId(null); 
              setSelectedProductId(null);         
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
        <SettlementDetailsModal
          isOpen={!!openDetail}
          record={openDetail}
          onClose={() => setOpenDetail(null)}
        />
      )}
    </div>
  );
}

SettlementRecordsTable.propTypes = {
  records: PropTypes.array.isRequired,
  loading: PropTypes.bool,
  stemId: PropTypes.number,
  setStemId: PropTypes.func,
  setSelectedCustomerId : PropTypes.func,
  setSelectedProductId: PropTypes.func,
};
