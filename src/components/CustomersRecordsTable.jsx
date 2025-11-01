import Spinner from "../utils/Spinner";
import PropTypes from "prop-types";
import { useState } from "react";
import CustomerDetailsModal from "./CustomerDetailsModal";

export default function CustomersRecordsTable({ records, loading }) {
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
          <tr className="text-white/80 text-sm bg-[#181f3a]">
            <th className="text-right px-4 py-3 whitespace-nowrap">
              نام مشتری{" "}
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
              className="odd:bg-white/5 even:bg-white/10 border-t border-white/5"
            >
              <td
                className="px-4 py-3 text-white/90 text-sm whitespace-nowrap cursor-pointer underline hover:text-blue-300"
                onClick={() => setOpenDetail(r)}
              >
                {r?.customer?.name} {r?.customer?.last_name}
              </td>
              <td className="px-4 py-3 text-white/90 text-sm whitespace-nowrap">
                {r.inp === 1 ? r.ins_label : "-"}
              </td>
              <td className="px-4 py-3 text-white/90 text-sm whitespace-nowrap">
                {r.inp === 2 ? r.ins_label : "-"}
              </td>
              <td className="px-4 py-3 text-white/90 text-sm whitespace-nowrap">
                {r.inp === 3 ? r.ins_label : "-"}
              </td>
              <td className="px-4 py-3 text-white/90 text-sm truncate max-w-[200px]">
                {r.inp === 4 ? r.ins_label : "-"}
              </td>
              <td className="px-4 py-3 text-white/90 text-sm truncate max-w-[240px]">
                {r.asn}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {openDetail && (
        <CustomerDetailsModal
          isOpen={!!openDetail}
          record={openDetail}
          onClose={() => setOpenDetail(null)}
        />
      )}
    </div>
  );
}

CustomersRecordsTable.propTypes = {
  records: PropTypes.array.isRequired,
  loading: PropTypes.bool,
};
